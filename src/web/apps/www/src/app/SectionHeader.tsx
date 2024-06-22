import { PropsWithChildren } from "react";
import { CoverBackground } from "./CoverBackground";

export function SectionHeader({ children, subHeader }: PropsWithChildren<{ subHeader?: string; }>) {
    return (
        <section className="px-6 py-24 md:px-24 flex gap-4 flex-col relative">
            <CoverBackground />
            <h1 className="relative uppercase text-5xl">
                {children}
            </h1>
            {subHeader && <p className="text-xl opacity-80">{subHeader}</p>}
        </section>
    );
}
