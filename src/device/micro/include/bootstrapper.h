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
#include "display.h"
#include "stepper.h"

#define STEPPER_1_PIN_1 GPIO_NUM_3
#define STEPPER_1_PIN_2 GPIO_NUM_1
#define STEPPER_1_PIN_3 GPIO_NUM_2
#define STEPPER_1_PIN_4 GPIO_NUM_0

class Bootstrapper
{
public:
    Bootstrapper();

    void setup(
        esp_now_recv_cb_t receiveCallback,
        esp_now_send_cb_t sentCallback);
    void loop();

public:
    WebServer m_webServer;

private:
    void setupSpiffs();
    void setupWifi();
    void setupEspNow(esp_now_recv_cb_t receiveCallback, esp_now_send_cb_t sentCallback);
    void setupWebServer();
    void setupOta();
    void setupDisplay();
    void setupStepper();

    void tryConnectToWifi();
    void setupWifiApSta();
    boolean setupWifiSta();

    void loopWebServer();

private:
    System m_system;
    OTA m_ota;
    Display m_display;
    Stepper m_stepper1;

    // WebServer
    boolean m_webServerStarted = false;

    // OTA
    String m_update_error_str = "";
    long m_current_progress_size = 0;

    // Preferences
    Preferences m_preferences;
};

#endif