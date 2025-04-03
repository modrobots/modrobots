import Link from "next/link";
import { PropsWithChildren } from "react";
import { Card } from "@signalco/ui-primitives/Card";
import { ModuleEmptyBackground } from "../../ModuleEmptyBackground";
import { cx } from "@signalco/ui-primitives/cx";

export function PartCard({ id, label, noPreview, children }: PropsWithChildren<{ id: string; label: string; noPreview?: boolean; }>) {
    return (
        <Card className={cx("aspect-square overflow-clip relative p-0", noPreview && "w-[300px]")}>
            {!noPreview && children}
            {noPreview && (
                <div className="absolute inset-0">
                    <ModuleEmptyBackground />
                    <div className="flex items-center justify-center h-full opacity-60 uppercase font-mono">
                        Preview not available
                    </div>
                </div>
            )}
            <Link href={`/parts/${id}`}>
                <div className="absolute bottom-4 right-4 border-r px-4 py-2">
                    <div className="uppercase text-right">{label}</div>
                </div>
            </Link>
        </Card>
    );
}
