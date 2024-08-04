import { SVGProps } from "react"
export function Logo(props: { theme?: 'dark' | 'light' } & SVGProps<SVGSVGElement>) {
    const { theme } = props;
    const fill = props.fill ?? (theme === 'dark' ? "#000" : "#fff");
    const inverted = theme === 'dark' ? "#fff" : "#000";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            viewBox="0 0 32 32"
            fill="none"
            {...props}
        >
            <g>
                <g>
                    <rect width={32} height={32} />
                </g>
                <g>
                    <g>
                        <circle
                            cx={16}
                            cy={16}
                            r={16}
                            style={{ fill }} />
                        <g>
                            <g>
                                <defs>
                                    <clipPath id="b">
                                        <use href="#a" />
                                    </clipPath>
                                    <circle
                                        id="a"
                                        cx={16}
                                        cy={16}
                                        r={16}
                                        style={{
                                            fill: "none",
                                            strokeWidth: 2,
                                            stroke: inverted,
                                        }} />
                                </defs>
                                <use clipPath="url('#b')" href="#a" />
                            </g>
                        </g>
                    </g>
                    <g>
                        <g clipPath="url(#d)" mask="url(#c)">
                            <defs>
                                <clipPath id="d">
                                    <path d="M0 0h32v32H0" />
                                </clipPath>
                                <filter id="e">
                                    <feFlood floodColor="#fff" result="FloodResult" />
                                    <feComposite
                                        in="FloodResult"
                                        in2="SourceGraphic"
                                        operator="in"
                                        result="comp" />
                                </filter>
                                <mask
                                    id="c"
                                    width={32}
                                    height={32}
                                    x={0}
                                    y={0}
                                    maskUnits="userSpaceOnUse"
                                >
                                    <g filter="url(#e)">
                                        <circle
                                            cx={16}
                                            cy={16}
                                            r={16}
                                            style={{ fill: inverted }} />
                                    </g>
                                </mask>
                            </defs>
                            <rect
                                width={13}
                                height={13}
                                style={{ fill: inverted }} />
                            <rect
                                width={13}
                                height={13}
                                x={19}
                                y={19}
                                style={{ fill: inverted }} />
                        </g>
                        <circle
                            cx={16}
                            cy={16}
                            r={12}
                            style={{ fill }} />
                    </g>
                    <g>
                        <g clipPath="url(#g)" mask="url(#f)">
                            <defs>
                                <clipPath id="g">
                                    <path d="M4 4h24v24H4" />
                                </clipPath>
                                <filter id="h">
                                    <feFlood floodColor="#fff" result="FloodResult" />
                                    <feComposite
                                        in="FloodResult"
                                        in2="SourceGraphic"
                                        operator="in"
                                        result="comp" />
                                </filter>
                                <mask
                                    id="f"
                                    width={24}
                                    height={24}
                                    x={4}
                                    y={4}
                                    maskUnits="userSpaceOnUse"
                                >
                                    <g filter="url(#h)">
                                        <circle
                                            cx={16}
                                            cy={16}
                                            r={12}
                                            style={{ fill: inverted }} />
                                    </g>
                                </mask>
                            </defs>
                            <rect
                                width={9}
                                height={9}
                                x={19}
                                y={3}
                                style={{ fill: inverted }} />
                            <rect
                                width={9}
                                height={9}
                                x={4}
                                y={19}
                                style={{ fill: inverted }} />
                        </g>
                        <circle
                            cx={16}
                            cy={16}
                            r={10}
                            style={{ fill }} />
                    </g>
                    <g>
                        <circle
                            cx={12}
                            cy={16}
                            r={1}
                            style={{ fill: inverted }} />
                        <circle
                            cx={16}
                            cy={16}
                            r={1}
                            style={{ fill: inverted }} />
                        <circle
                            cx={20}
                            cy={16}
                            r={1}
                            style={{ fill: inverted }} />
                    </g>
                </g>
            </g>
        </svg>
    )
}
