import { PropsWithChildren } from "react";
import { CoverBackground } from "./CoverBackground";
import { Typography } from "@signalco/ui-primitives/Typography";

export function SectionHeader({ children, subHeader }: PropsWithChildren<{ subHeader?: string; }>) {
    return (
        <section className="px-6 py-24 md:px-24 flex gap-4 flex-col relative">
            <CoverBackground />
            <Typography level="h1" className="relative uppercase">
                {children}
            </Typography>
            {subHeader && <Typography className="text-xl opacity-80">{subHeader}</Typography>}
        </section>
    );
}
