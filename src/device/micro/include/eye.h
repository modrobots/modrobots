#ifndef _MODMICRO_EYE_H
#define _MODMICRO_EYE_H

#include <Arduino_GFX_Library.h>

class Eye
{
public:
    void setup(Arduino_Canvas *canvas);
    void loop(unsigned long delta);

private:
    Arduino_Canvas *m_canvas;
    int circlePosition = 0;
    int targetPosition = 0;
};

#endif