export default function SectionPrinciples() {
    return (
        <section className="pb-44 pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center">
                    <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Principles</h2>
                </div>
                <div className="mt-10">
                    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        <li className="col-span-1 flex flex-row items-start text-left sm:text-center">
                            <GithubIcon className="mr-4 h-12 w-12 shrink-0" />
                            <div>
                                <h3 className="text-gray-300 text-sm font-medium">Open-source</h3>
                                <p className="text-gray-400 text-sm text-balance">
                                    Our code is freely available for everyone to use, modify, and contribute to.
                                </p>
                            </div>
                        </li>
                        <li className="col-span-1 flex flex-row items-start text-left sm:text-center">
                            <CpuIcon className="mr-4 h-12 w-12 shrink-0" />
                            <div>
                                <h3 className="text-gray-300 text-sm font-medium">Open-source hardware</h3>
                                <p className="text-gray-400 text-sm text-balance">
                                    Our hardware designs are openly shared, allowing for customization and innovation.
                                </p>
                            </div>
                        </li>
                        <li className="col-span-1 flex flex-row items-start text-left sm:text-center">
                            <PencilIcon className="mr-4 h-12 w-12 shrink-0" />
                            <div>
                                <h3 className="text-gray-300 text-sm font-medium">Open-design</h3>
                                <p className="text-gray-400 text-sm text-balance">
                                    Our design files are available for anyone to explore, adapt, and build upon.
                                </p>
                            </div>
                        </li>
                        <li className="col-span-1 flex flex-row items-start text-left sm:text-center">
                            <FlashlightIcon className="mr-4 h-12 w-12 shrink-0" />
                            <div>
                                <h3 className="text-gray-300 text-sm font-medium">Easy to assemble</h3>
                                <p className="text-gray-400 text-sm text-balance">
                                    Our products are designed with simplicity in mind, making them straightforward to put together.
                                </p>
                            </div>
                        </li>
                        <li className="col-span-1 flex flex-row items-start text-left sm:text-center">
                            <WrenchIcon className="mr-4 h-12 w-12 shrink-0" />
                            <div>
                                <h3 className="text-gray-300 text-sm font-medium">DIY</h3>
                                <p className="text-gray-400 text-sm text-balance">
                                    We encourage users to get hands-on and customize their own creations.
                                </p>
                            </div>
                        </li>
                        <li className="col-span-1 flex flex-row items-start text-left sm:text-center">
                            <Scale3dIcon className="mr-4 h-12 w-12 shrink-0" />
                            <div>
                                <h3 className="text-gray-300 text-sm font-medium">3D Printer Friendly</h3>
                                <p className="text-gray-400 text-sm text-balance">
                                    Our products are designed to be accessible and usable worldwide, connecting people globally.
                                </p>
                            </div>
                        </li>
                        <li className="col-span-1 flex flex-row items-start text-left sm:text-center">
                            <CodeIcon className="mr-4 h-12 w-12 shrink-0" />
                            <div>
                                <h3 className="text-gray-300 text-sm font-medium">Hackable</h3>
                                <p className="text-gray-400 text-sm text-balance">
                                    Our products are designed to be modified and extended by the community.
                                </p>
                            </div>
                        </li>
                        <li className="col-span-1 flex flex-row items-start text-left sm:text-center">
                            <CloudLightningIcon className="mr-4 h-12 w-12 shrink-0" />
                            <div>
                                <h3 className="text-gray-300 text-sm font-medium">Community driven</h3>
                                <p className="text-gray-400 text-sm text-balance">
                                    We believe in the power of collaboration and value the input of our passionate community.
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    )
}

function CloudLightningIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973" />
            <path d="m13 12-3 5h4l-3 5" />
        </svg>
    )
}


function CodeIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
        </svg>
    )
}


function CpuIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="16" height="16" x="4" y="4" rx="2" />
            <rect width="6" height="6" x="9" y="9" rx="1" />
            <path d="M15 2v2" />
            <path d="M15 20v2" />
            <path d="M2 15h2" />
            <path d="M2 9h2" />
            <path d="M20 15h2" />
            <path d="M20 9h2" />
            <path d="M9 2v2" />
            <path d="M9 20v2" />
        </svg>
    )
}


function FlashlightIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M18 6c0 2-2 2-2 4v10a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V10c0-2-2-2-2-4V2h12z" />
            <line x1="6" x2="18" y1="6" y2="6" />
            <line x1="12" x2="12" y1="12" y2="12" />
        </svg>
    )
}


function GithubIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
    )
}


function PencilIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
            <path d="m15 5 4 4" />
        </svg>
    )
}


function Scale3dIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="19" cy="19" r="2" />
            <circle cx="5" cy="5" r="2" />
            <path d="M5 7v12h12" />
            <path d="m5 19 6-6" />
        </svg>
    )
}


function WrenchIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
    )
}