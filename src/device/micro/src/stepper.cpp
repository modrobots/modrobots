#include "stepper.h"

void Stepper::setup(gpio_num_t pin1, gpio_num_t pin2, gpio_num_t pin3, gpio_num_t pin4)
{
    this->m_stepper = new AccelStepper(AccelStepper::HALF4WIRE, pin1, pin2, pin3, pin4);
    // this->m_stepper->setSpeed(600.0);
    this->m_stepper->setMaxSpeed(1200.0);
    this->m_stepper->setAcceleration(9999.0);
}

void Stepper::loop(unsigned long delta)
{
    auto start = millis();
    uint8_t steps = 0;
    while (this->m_stepper->run())
    {
        // Yield every 10ms (evaluate every 100 steps)
        steps++;
        if (steps > 100)
        {
            steps = 0;
            if (millis() - start > 10)
            {
                break;
            }
        }
    }
}

void Stepper::moveTo(long position)
{
    this->m_stepper->move(position);
}