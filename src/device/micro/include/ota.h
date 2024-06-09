#ifndef _MODMICRO_OTA_H
#define _MODMICRO_OTA_H

#include <Arduino.h>
#include <WebServer.h>
#include <Update.h>
#include "StreamString.h"
#include "SPIFFS.h"
#include <system.h>

class OTA
{
public:
    OTA();

    void setup(WebServer &server);

private:
    String m_update_error_str = "";
    long m_current_progress_size = 0;
};

#endif