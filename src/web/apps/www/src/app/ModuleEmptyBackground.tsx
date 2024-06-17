export function ModuleEmptyBackground() {
    return (
        <svg className="pointer-events-none size-full absolute inset-0">
            <pattern id="pattern-heroundefined" x="0" y="0" width="21.5" height="21.5" patternUnits="userSpaceOnUse" patternTransform="translate(-0.5,-0.5)">
                <circle cx="0.5" cy="0.5" r="0.5" fill="#91919a" />
            </pattern>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-heroundefined)" />
        </svg>
    );
}
