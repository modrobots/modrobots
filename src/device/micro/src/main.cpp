#include <Arduino.h>
#include "bootstrapper.h"
#include <ArduinoJson.h>

#define STATUS_LED 8

bool ledOn = false;
Bootstrapper bootstrapper;

void formatMacAddress(const uint8_t *macAddr, char *buffer, int maxLength)
{
    snprintf(buffer, maxLength, "%02x:%02x:%02x:%02x:%02x:%02x", macAddr[0], macAddr[1], macAddr[2], macAddr[3], macAddr[4], macAddr[5]);
}

void receiveCallback(const uint8_t *macAddr, const uint8_t *data, int dataLen)
{
    // Only allow a maximum of 250 characters in the message + a null terminating byte
    char buffer[ESP_NOW_MAX_DATA_LEN + 1];
    int msgLen = min(ESP_NOW_MAX_DATA_LEN, dataLen);
    strncpy(buffer, (const char *)data, msgLen);

    // Make sure we are null terminated
    buffer[msgLen] = 0;

    // Format the MAC address
    char macStr[18];
    formatMacAddress(macAddr, macStr, 18);

    // Send Debug log message to the serial port
    Serial.printf("Received message from: %s - %s\n", macStr, buffer);

    // Check switch status
    if (strcmp("on", buffer) == 0)
    {
        ledOn = true;
    }
    else
    {
        ledOn = false;
    }
    digitalWrite(STATUS_LED, ledOn);
}

void sentCallback(const uint8_t *macAddr, esp_now_send_status_t status)
{
    char macStr[18];
    formatMacAddress(macAddr, macStr, 18);
    Serial.print("Last Packet Sent to: ");
    Serial.println(macStr);
    Serial.print("Last Packet Send Status: ");
    Serial.println(status == ESP_NOW_SEND_SUCCESS ? "Delivery Success" : "Delivery Fail");
}

void broadcast(const String &message)
{
    // Broadcast a message to every device in range
    uint8_t broadcastAddress[] = {0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF};
    esp_now_peer_info_t peerInfo = {};
    memcpy(&peerInfo.peer_addr, broadcastAddress, 6);
    if (!esp_now_is_peer_exist(broadcastAddress))
    {
        esp_now_add_peer(&peerInfo);
    }

    // Send message
    esp_err_t result = esp_now_send(broadcastAddress, (const uint8_t *)message.c_str(), message.length());
    if (result == ESP_OK)
        return;

    // Print error results to serial monitor
    if (result == ESP_ERR_ESPNOW_NOT_INIT)
    {
        Serial.println("ESP-NOW not Init.");
    }
    else if (result == ESP_ERR_ESPNOW_ARG)
    {
        Serial.println("Invalid Argument");
    }
    else if (result == ESP_ERR_ESPNOW_INTERNAL)
    {
        Serial.println("Internal Error");
    }
    else if (result == ESP_ERR_ESPNOW_NO_MEM)
    {
        Serial.println("ESP_ERR_ESPNOW_NO_MEM");
    }
    else if (result == ESP_ERR_ESPNOW_NOT_FOUND)
    {
        Serial.println("Peer not found.");
    }
    else
    {
        Serial.println("Unknown error");
    }
}

bool initial = true;

#define DATA_REFRESH_INTERVAL 1000
long lastDataReadMs = 0;
float coreTemperature = 0.0;
esp_chip_info_t *chip_info = nullptr;
uint32_t availableHeap = 0;
uint32_t freeHeap = 0;
unsigned long lastMicros = 0;
long loopTime = 0;

void readData()
{
    // Skip reading data if not enough time has passed
    if (millis() - lastDataReadMs < DATA_REFRESH_INTERVAL)
    {
        return;
    }
    lastDataReadMs = millis();

    // Read chip info
    if (availableHeap == 0)
    {
        chip_info = (esp_chip_info_t *)malloc(sizeof(esp_chip_info_t));
        esp_chip_info(chip_info);
        availableHeap = ESP.getHeapSize();
    }

    freeHeap = ESP.getFreeHeap();

    coreTemperature = temperatureRead();
}

void setup()
{
    Serial.begin(115200);
    delay(3000);

    bootstrapper.setupSpiffs();
    bootstrapper.setupWifi();
    bootstrapper.setupWebServer();
    bootstrapper.setupEspNow(receiveCallback, sentCallback);
    bootstrapper.setupOta();

    bootstrapper.m_webServer.on("/data", HTTP_GET, []()
                                {
        JsonDocument doc;
        doc["freeHeap"] = freeHeap;
        doc["availableHeap"] = availableHeap;
        doc["chipTemperature"] = coreTemperature;

        // Chip model as string
        switch (chip_info->model)
        {
        case CHIP_ESP32:
            doc["chipModel"] = "ESP32";
            break;
        case CHIP_ESP32S2:
            doc["chipModel"] = "ESP32S2";
            break;
        case CHIP_ESP32S3:
            doc["chipModel"] = "ESP32S3";
            break;
        case CHIP_ESP32C3:
            doc["chipModel"] = "ESP32C3";
            break;
        case CHIP_ESP32H2:
            doc["chipModel"] = "ESP32H2";
            break;
        default:
            doc["chipModel"] = "Unknown";
            break;
        }

        doc["chipRevision"] = chip_info->revision;

        // List of CHIP_FEATURE_X flags as string array
        doc["chipFeatures"] = JsonArray();
        if (chip_info->features & CHIP_FEATURE_EMB_FLASH)
            doc["chipFeatures"].add("EMB_FLASH");
        if (chip_info->features & CHIP_FEATURE_WIFI_BGN)
            doc["chipFeatures"].add("WIFI_BGN");
        if (chip_info->features & CHIP_FEATURE_BLE)
            doc["chipFeatures"].add("BLE");
        if (chip_info->features & CHIP_FEATURE_BT)
            doc["chipFeatures"].add("BT");
        if (chip_info->features & CHIP_FEATURE_IEEE802154)
            doc["chipFeatures"].add("IEEE802154");
        if (chip_info->features & CHIP_FEATURE_EMB_PSRAM)
            doc["chipFeatures"].add("EMB_PSRAM");

        doc["loopTimeMicros"] = loopTime;

        String message;
        serializeJson(doc, message);

        bootstrapper.m_webServer.send(200, "application/json", message); });

    // LED Output
    pinMode(STATUS_LED, OUTPUT);
}

void loop()
{
    unsigned long currentMicros = micros();
    loopTime = currentMicros - lastMicros;
    lastMicros = currentMicros;

    if (initial)
    {
        broadcast("discovery-modrobots");
        initial = false;
    }

    bootstrapper.loop();

    readData();
}