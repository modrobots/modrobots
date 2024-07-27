'use client';

import { useEffect, useState } from "react";
import { SectionHeader } from "./SectionHeader";
import { ScrolledLine } from "@signalco/ui-primitives/ScrolledLine";

export function SectionCover() {
    const lines = ['modable', 'modular', 'modifiable'];
    const [lineIndex, setLineIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setLineIndex((lineIndex + 1) % lines.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [lineIndex, lines.length]);

    return (
        <SectionHeader subHeader="Robots you make, not just assemble">
            <span>mod<br />robots</span>
            <ScrolledLine className="uppercase text-5xl absolute left-0 top-0 opacity-40" aria-hidden="true">
                <span className="opacity-0">mod</span>{lines[lineIndex]?.substring(3)}
            </ScrolledLine>
        </SectionHeader>
    );
}
