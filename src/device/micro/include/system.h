#ifndef _MODMICRO_SYSTEM_H
#define _MODMICRO_SYSTEM_H

#include <Arduino.h>

class System
{
public:
    static void reboot();
    void loop();

private:
    static boolean m_reboot;
    static long m_reboot_request_millis;
};

#endif