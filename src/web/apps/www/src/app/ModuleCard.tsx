import Link from "next/link";
import { ModuleEmptyBackground } from './ModuleEmptyBackground';
import { PropsWithChildren } from "react";
import { Card } from "@signalco/ui-primitives/Card";

export function ModuleCard({ id, label, version, children }: PropsWithChildren<{ id: string; label: string; version?: number; }>) {
    return (
        <Card className="aspect-square overflow-clip relative">
            {Boolean(version) && children}
            {!version && (
                <div className="absolute inset-0">
                    <ModuleEmptyBackground />
                    <div className="flex items-center justify-center h-full opacity-60 uppercase font-mono">
                        Coming Soon
                    </div>
                </div>
            )}
            <Link href={`/modules/${id}`}>
                <div className="absolute bottom-4 right-4 border-r px-4 py-2">
                    <div className="uppercase">{label}</div>
                    <div className="opacity-40 text-xs text-right">v{version}</div>
                </div>
            </Link>
        </Card>
    );
}
