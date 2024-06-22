#include "display.h"

void Display::setup()
{
    m_bus = new Arduino_HWSPI(10, 2);
    m_gfx = new Arduino_GC9A01(m_bus, 0, 0, true);
    m_canvas = new Arduino_Canvas(240, 240, m_gfx);

    m_canvas->begin();
    m_canvas->fillScreen(BLACK);
    m_canvas->flush();

    m_eye.setup(m_canvas);
}

void Display::loop()
{
    // Check if it's time for new frame
    auto delta = millis() - m_lastMillis;
    if (delta <= m_frameTime)
    {
        return;
    }
    m_lastMillis = millis();

    m_eye.loop(delta);

    // Measure the time it took to render the frame
    // to adjust the frame rate
    auto drawTime = millis() - m_lastMillis;
    if (drawTime > m_frameTime)
    {
        m_frameTime++;
    }
}