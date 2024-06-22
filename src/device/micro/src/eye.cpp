#include "eye.h"

void Eye::setup(Arduino_Canvas *canvas)
{
    m_canvas = canvas;
}

void Eye::loop(unsigned long delta)
{
    if (circlePosition < targetPosition)
    {
        circlePosition += 0.5 * delta;
        if (circlePosition > targetPosition)
            circlePosition = targetPosition;
    }
    else if (circlePosition > targetPosition)
    {
        circlePosition -= 0.5 * delta;
        if (circlePosition < targetPosition)
            circlePosition = targetPosition;
    }

    // Change position every 10 seconds
    (millis() / 10000) % 2 == 0
        ? targetPosition = m_canvas->width() / 2 - 50
        : targetPosition = m_canvas->width() / 2 + 50;

    m_canvas->fillScreen(BLACK);
    m_canvas->fillCircle(circlePosition, m_canvas->height() / 2, 50, WHITE);
    m_canvas->fillCircle(0, m_canvas->height(), m_canvas->height() / 1.5, BLACK);
    m_canvas->drawCircle(0, m_canvas->height(), m_canvas->height() / 1.5, WHITE);
    m_canvas->flush();
}