#ifndef _MODMICRO_BOOTSTRAPPER_H
#define _MODMICRO_BOOTSTRAPPER_H

#include <Arduino.h>
#include <WiFi.h>
#include "esp_now.h"
#include <WiFiClient.h>
#include <WebServer.h>
#include <Update.h>
#include <Preferences.h>
#include "StreamString.h"
#include "SPIFFS.h"
#include "ota.h"

class Bootstrapper
{
public:
    Bootstrapper();

    void setupSpiffs();
    void setupWifi();
    void setupEspNow(esp_now_recv_cb_t receiveCallback, esp_now_send_cb_t sentCallback);
    void setupWebServer();
    void setupOta();

    void loop();

public:
    WebServer m_webServer;

private:
    void tryConnectToWifi();
    void setupWifiApSta();
    boolean setupWifiSta();

    void loopWebServer();
    void loopOta();

private:
    System m_system;
    OTA m_ota;

    // WebServer
    boolean m_webServerStarted = false;

    // OTA
    String m_update_error_str = "";
    long m_current_progress_size = 0;

    // Preferences
    Preferences m_preferences;
};

#endif