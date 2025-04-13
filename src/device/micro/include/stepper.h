#ifndef _MODMICRO_STEPPER_H
#define _MODMICRO_STEPPER_H

#include <Arduino.h>
#include <AccelStepper.h>

#define stepper_pin GPIO_NUM_0

class Stepper
{
public:
    void setup(gpio_num_t pin1, gpio_num_t pin2, gpio_num_t pin3, gpio_num_t pin4);
    void loop(unsigned long delta);

    void moveTo(long position);

private:
    AccelStepper *m_stepper;
};

#endif