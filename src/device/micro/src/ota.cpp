#include "ota.h"

OTA::OTA()
{
}

void OTA::setup(WebServer &server)
{
    // TODO: Auth

    server.on("/ota/start", HTTP_GET, [&]()
              {
      // TODO: Verify auth

      // Get header x-ota-mode value, if present
      boolean isFileSystem = false;
      // Get mode from arg
      if (server.hasArg("mode")) {
        String argValue = server.arg("mode");
        if (argValue == "fs") {
          Serial.printf("OTA Mode: Filesystem\n");
          isFileSystem = true;
        } else {
          Serial.printf("OTA Mode: Firmware\n");
          isFileSystem = false;
        }
      }

      // Get file MD5 hash from arg
      if (server.hasArg("hash")) {
        auto hash = server.arg("hash");
        Serial.printf(String("MD5: "+hash+"\n").c_str());
        if (!Update.setMD5(hash.c_str())) {
          Serial.printf("ERROR: MD5 hash not valid\n");
          return server.send(400, "text/plain", "MD5 parameter invalid");
        }
      }

        // Serial output must be active to see the callback serial prints
        Serial.setDebugOutput(true);

      // TODO: Pre-OTA update callback

        // Start update process
        if (!Update.begin(UPDATE_SIZE_UNKNOWN, isFileSystem ? U_SPIFFS : U_FLASH)) {
          Serial.printf("Failed to start update process\n");
          // Save error to string
          StreamString str;
          Update.printError(str);
          m_update_error_str = str.c_str();
          m_update_error_str += "\n";
          Serial.printf(m_update_error_str.c_str());
        }

      return server.send((Update.hasError()) ? 400 : 200, "text/plain", (Update.hasError()) ? m_update_error_str.c_str() : "OK"); });

    server.on("/ota/upload", HTTP_POST, [&]()
              {
      // TODO: Auth
      
      // TODO: Post-OTA update callback
      //   if (postUpdateCallback != NULL) postUpdateCallback(!Update.hasError());

      server.sendHeader("Connection", "close");
      server.send((Update.hasError()) ? 400 : 200, "text/plain", (Update.hasError()) ? m_update_error_str.c_str() : "OK");
      
      // Set reboot flag
      if (!Update.hasError()) {
          System::reboot();
      } }, [&]()
              {
      // Actual OTA Download
      auto upload = server.upload();
      if (upload.status == UPLOAD_FILE_START) {
        // TODO: Check authentication
        Serial.printf("Update Received: %s\n", upload.filename.c_str());
        m_current_progress_size = 0;
      } else if (upload.status == UPLOAD_FILE_WRITE) {
          if (Update.write(upload.buf, upload.currentSize) != upload.currentSize) {
              Update.printError(Serial);
          }

          m_current_progress_size += upload.currentSize;
          // TODO: Progress update callback
          // if (progressUpdateCallback != NULL) progressUpdateCallback(m_current_progress_size, upload.totalSize);
      } else if (upload.status == UPLOAD_FILE_END) {
          if (Update.end(true)) {
              Serial.printf(String("Update Success: "+String(upload.totalSize)+"\n").c_str());
          } else {
              Serial.printf("[!] Update Failed\n");
              // Store error to string
              StreamString str;
              Update.printError(str);
              m_update_error_str = str.c_str();
              m_update_error_str += "\n";
              Serial.printf(m_update_error_str.c_str());
          }

            Serial.setDebugOutput(false);
      } else {
        Serial.printf(String("Update Failed Unexpectedly (likely broken connection): status="+String(upload.status)+"\n").c_str());
      } });
}