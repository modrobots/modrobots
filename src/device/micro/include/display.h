#ifndef _MODMICRO_DISPLAY_H
#define _MODMICRO_DISPLAY_H

#include <Arduino_GFX_Library.h>
#include "eye.h"

class Display
{
public:
    void setup();
    void loop();

private:
    Arduino_DataBus *m_bus;
    Arduino_GFX *m_gfx;
    Arduino_Canvas *m_canvas;
    Eye m_eye;

private:
    byte m_frameTime = 33;
    unsigned long m_lastMillis = 0;
};

#endif