export const modules = [
    {
        id: 'joint', label: "Joint", version: 44, categories: ['Motion'],
        description: "A joint is a connection between two parts that allows them to move relative to each other. This joint is designed to be used in all robots.",
        parts: [
            { partId: 'esp32-c3-supermini-nologo-esp32c3fn4', quantity: 1 },
            { partId: 'screw-hex-socket-m3-6mm-black', quantity: 24 },
            { partId: 'servo-motor-mg995-allmetal', quantity: 1 },
            { partId: '40-pin-header-2-54mm', quantity: 1 },
            { partId: 'prototype-pcb-3x7-double-sided-white', quantity: 1 }
        ]
    },
    { id: 'wheel', label: "Wheel", version: 0, categories: ['Motion'] },
    { id: 'foot', label: "Foot", version: 0, categories: ['Motion'] },
    { id: 'gripper-flex', label: "Flex Gripper", version: 0, categories: ['Manipulation'] },
    { id: 'gripper-vacuum', label: "Vacuum Gripper", version: 0, categories: ['Manipulation'] },
    {
        id: 'brain',
        label: "Brain",
        version: 25,
        categories: ['Control'],
        parts: [
            { partId: 'esp32-c3-supermini-nologo-esp32c3fn4', quantity: 1 },
            { partId: 'tft-display-round-1-28inch-240x240-gc9a01-spi', quantity: 1 },
            { partId: 'audio-amplifier-max98357-i2s-3w-breakout', quantity: 1 },
            { partId: 'battery-charger-module-ups-18650-3a-5v', quantity: 1 },
            { partId: 'battery-lipo-3-7v-liitokala-18650-3400mah', quantity: 2 },
            { partId: 'push-button-switch-1712kd-17x12x9-5mm', quantity: 1 },
            { partId: '40-pin-header-2-54mm', quantity: 1 },
            { partId: 'prototype-pcb-3x7-double-sided-white', quantity: 1 }
        ]
    },
    { id: 'skeleton', label: "Skeleton", version: 0, categories: ['Perception'] },
    { id: 'vacuum-foot', label: "Vacuum Foot", version: 0, categories: ['Motion'] },
    { id: 'distance-sensor', label: "Distance Sensor", version: 0, categories: ['Perception'] },
    { id: 'sticky-mount', label: "Sticky Mount", version: 0, categories: ['Attachment'] },
    { id: 'holder', label: "Holder", version: 1, categories: ['Attachment'] },
    { id: 'locker', label: "Locker", version: 0, categories: ['Attachment'] },
];

export const modulesCategories = [
    'Control',
    'Motion',
    'Manipulation',
    'Perception',
    'Attachment'
]

export const parts = [
    {
        id: 'servo-motor-mg995-allmetal',
        label: 'MG995 Servo motor',
        tags: ['electronics'],
        sources: [
            {
                url: 'https://www.aliexpress.com/item/4000536728030.html',
                prices: [
                    {
                        numberOfItems: 4,
                        pricePerItem: 4.5475,
                        updatedAt: new Date(2024, 5, 15)
                    },
                    {
                        numberOfItems: 12,
                        pricePerItem: 3.93,
                        updatedAt: new Date(2024, 5, 15)
                    }
                ]
            }
        ]
    },
    {
        id: 'esp32-c3-supermini-nologo-esp32c3fn4',
        label: 'ESP32-C3 Supermini',
        tags: ['electronics', 'microcontroller'],
        sources: [
            {
                url: 'https://www.aliexpress.com/item/1005005967641936.html',
                prices: [
                    {
                        numberOfItems: 1,
                        pricePerItem: 3.35,
                        updatedAt: new Date(2024, 5, 15)
                    }
                ]
            }
        ]
    },
    {
        id: 'screw-hex-socket-m3-6mm-black',
        label: 'Screw Hex Socket M3 6mm Black',
        tags: ['mechanical'],
        sources: [
            {
                url: 'https://www.aliexpress.com/item/4001068956302.html',
                prices: [
                    {
                        numberOfItems: 50,
                        pricePerItem: 0.0504,
                        updatedAt: new Date(2024, 5, 15)
                    }
                ]
            }
        ]
    },
    {
        id: "prototype-pcb-3x7-double-sided-white",
        label: "Prototype PCB 3x7",
        tags: ["electronics"],
        sources: [
            {
                url: "https://www.aliexpress.com/item/1005007128724375.html",
                prices: [
                    {
                        numberOfItems: 5,
                        pricePerItem: 0.37,
                        updatedAt: new Date(2024, 5, 21)
                    },
                    {
                        numberOfItems: 10,
                        pricePerItem: 0.273,
                        updatedAt: new Date(2024, 5, 21)
                    }
                ]
            }
        ]
    },
    {
        id: "40-pin-header-2-54mm",
        label: "40 Pin Header 2.54mm",
        tags: ["electronics"],
        sources: [
            {
                url: "https://www.aliexpress.com/item/1005006186853439.html",
                prices: [
                    {
                        numberOfItems: 30,
                        pricePerItem: 0.093,
                        updatedAt: new Date(2024, 5, 21)
                    }
                ]
            }
        ]
    },
    {
        id: 'tft-display-round-1-28inch-240x240-gc9a01-spi',
        label: 'Round Display 1.28inch 240x240',
        tags: ['electronics'],
        sources: [
            {
                url: 'https://www.aliexpress.com/item/1005004482028005.html',
                prices: [
                    {
                        numberOfItems: 1,
                        pricePerItem: 3.77,
                        updatedAt: new Date(2024, 5, 21)
                    }
                ]
            }
        ]
    },
    {
        id: 'battery-lipo-3-7v-liitokala-18650-3400mah',
        label: 'LiPo Battery 3.7V 18650 3400mAh',
        tags: ['electronics'],
        sources: [
            {
                url: 'https://www.aliexpress.com/item/4001189659759.html',
                prices: [
                    {
                        numberOfItems: 1,
                        pricePerItem: 5.73,
                        updatedAt: new Date(2024, 5, 21)
                    },
                    {
                        numberOfItems: 2,
                        pricePerItem: 5.015,
                        updatedAt: new Date(2024, 5, 21)
                    }
                ]
            }
        ]
    },
    {
        id: 'push-button-switch-1712kd-17x12x9-5mm',
        label: 'Push Button Switch',
        tags: ['electronics'],
        sources: [
            {
                url: 'https://www.aliexpress.com/item/4001125180492.html',
                prices: [
                    {
                        numberOfItems: 10,
                        pricePerItem: 0.157,
                        updatedAt: new Date(2024, 5, 21)
                    }
                ]
            }
        ]
    },
    {
        id: 'battery-charger-module-ups-18650-3a-5v',
        label: 'Battery Charge Module/UPS 18650',
        tags: ['electronics'],
        sources: [
            {
                url: 'https://www.aliexpress.com/item/1005005245619513.html',
                prices: [
                    {
                        numberOfItems: 1,
                        pricePerItem: 6.05,
                        updatedAt: new Date(2024, 5, 21)
                    }
                ]
            }
        ]
    },
    {
        id: 'audio-amplifier-max98357-i2s-3w-breakout',
        label: 'Audio Amplifier MAX98357',
        tags: ['electronics'],
        sources: [
            {
                url: 'https://www.aliexpress.com/item/1005005985389931.html',
                prices: [
                    {
                        numberOfItems: 1,
                        pricePerItem: 1.57,
                        updatedAt: new Date(2024, 5, 21)
                    }
                ]
            }
        ]
    }
];