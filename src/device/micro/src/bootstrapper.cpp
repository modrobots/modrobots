#include "Bootstrapper.h"
#include <system.h>

Bootstrapper::Bootstrapper() : m_webServer{80}
{
}

void Bootstrapper::setupWifiApSta()
{
  // Set ESP32 in STA mode to begin with
  WiFi.mode(WIFI_MODE_APSTA);
  WiFi.disconnect();
  Serial.println("WIFI AP&STA Mode");

  // Set WIFI SSID and Password
  auto apSsid = "MODRobots micro";
  WiFi.softAP(apSsid, "password");
  Serial.print("AP SSID: ");
  Serial.println(apSsid);

  // Print IP address
  Serial.print("AP IP Address: ");
  Serial.println(WiFi.softAPIP());
}

boolean Bootstrapper::setupWifiSta()
{
  String ssid = m_preferences.isKey("ssid") ? m_preferences.getString("ssid", "") : "";
  String password = m_preferences.isKey("wifipassword") ? m_preferences.getString("wifipassword", "") : "";
  if (!ssid.length())
  {
    return false;
  }

  WiFi.mode(WIFI_MODE_STA);
  WiFi.disconnect();
  Serial.println("WIFI STA Mode");

  auto status = WiFi.begin(ssid.c_str(), password.c_str());
  byte retries = 0;
  Serial.println("Connecting to WiFi...");
  boolean ledOn = false;
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(1000);
    Serial.print(".");
    ledOn = !ledOn;
    digitalWrite(8, ledOn);
    if (retries++ > 30)
    {
      Serial.println("Failed to connect to WiFi");
      return false;
    }
  }
  Serial.println();

  Serial.println("Connected to the WiFi network");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());

  return true;
}

void Bootstrapper::tryConnectToWifi()
{
  if (!setupWifiSta())
  {
    setupWifiApSta();
  }
}

void Bootstrapper::setupWifi()
{
  m_preferences.begin("modmicro");

  tryConnectToWifi();

  // Print MAC address
  Serial.print("MAC Address: ");
  Serial.println(WiFi.macAddress());
}

void Bootstrapper::setupEspNow(esp_now_recv_cb_t receiveCallback, esp_now_send_cb_t sentCallback)
{
  // Initialize ESP-NOW
  if (esp_now_init() != ESP_OK)
  {
    Serial.println("ESP-NOW Init Failed");
    return;
  }

  Serial.println("ESP-NOW Init Success");
  esp_now_register_recv_cb(receiveCallback);
  esp_now_register_send_cb(sentCallback);
}

void Bootstrapper::setupSpiffs()
{
  // Initialize SPIFFS
  if (!SPIFFS.begin(true))
  {
    Serial.println("An Error has occurred while mounting SPIFFS");
    return;
  }
}

void Bootstrapper::setupWebServer()
{
  m_webServer.enableCORS(true);
  m_webServer.enableCrossOrigin(true);

  m_webServer.on("/", HTTP_GET, [&]()
                 {
    auto indexFile = SPIFFS.open("/index.html", "r");
    m_webServer.streamFile(indexFile, "text/html");
    indexFile.close(); });

  m_webServer.on("/settings/wifi/form", HTTP_POST, [&]()
                 {
      // Save the SSID and Password to preferences
      auto numberOfArgs = m_webServer.args();
      if (numberOfArgs != 2)
      {
        m_webServer.send(400, "text/plain", "Invalid number of arguments: " + String(numberOfArgs) + ". Expected: 2");
        return;
      }

      auto ssid = m_webServer.arg("ssid");
      auto password = m_webServer.arg("password");
      Serial.printf("New WiFi settings - SSID: %s, Password: %s\n", ssid.c_str(), password.c_str());

      m_preferences.putString("ssid", ssid);
      m_preferences.putString("wifipassword", password);
      m_webServer.sendHeader("Location", "/",true);
      m_webServer.send(302, "text/plain", ""); 
      
      System::reboot(); });
}

void Bootstrapper::loop()
{
  m_system.loop();
  loopWebServer();
}

void Bootstrapper::loopWebServer()
{
  if (!m_webServerStarted)
  {
    m_webServer.begin();
    m_webServerStarted = true;
  }

  m_webServer.handleClient();
}

void Bootstrapper::setupOta()
{
  m_ota.setup(m_webServer);
}
