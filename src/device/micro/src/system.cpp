#include "system.h"

boolean System::m_reboot = false;
long System::m_reboot_request_millis = 0;

void System::reboot()
{
    System::m_reboot = true;
    System::m_reboot_request_millis = millis();
}

void System::loop()
{
    if (System::m_reboot && millis() - System::m_reboot_request_millis > 2000)
    {
        Serial.printf("Rebooting...\n");
        ESP.restart();
        System::m_reboot = false;
    }
}