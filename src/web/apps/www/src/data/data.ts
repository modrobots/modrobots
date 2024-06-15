export const modules = [
    { id: 'joint', label: "Joint", version: 44, categories: ['Motion'] },
    { id: 'wheel', label: "Wheel", version: 0, categories: ['Motion'] },
    { id: 'foot', label: "Foot", version: 0, categories: ['Motion'] },
    { id: 'gripper-flex', label: "Flex Gripper", version: 0, categories: ['Manipulation'] },
    { id: 'gripper-vacuum', label: "Vacuum Gripper", version: 0, categories: ['Manipulation'] },
    { id: 'brain', label: "Brain", version: 0, categories: ['Control'] },
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
        label: 'Servi motor MG995 (all metal)',
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
        label: 'ESP32-C3 Supermini (No Logo)',
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
        id: 'esp32-c6-wroom-1-n8',
        label: 'ESP32-C6 WROOM N8',
        tags: ['electronics', 'microcontroller'],
        sources: [
            {
                url: 'https://www.aliexpress.com/item/1005006335163110.html',
                price: [
                    {
                        numberOfItems: 1,
                        pricePerItem: 7.11,
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
    }
];