import Link from "next/link";
import { ModuleEmptyBackground } from './ModuleEmptyBackground';
import { PropsWithChildren } from "react";

export function ModuleCard({ id, label, version, children }: PropsWithChildren<{ id: string; label: string; version: number; }>) {
    return (
        <div className="aspect-square rounded-3xl overflow-clip group hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors relative">
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
                <div className="absolute bottom-4 right-4 border-r px-4 py-2 border-black group-hover:dark:border-black group-hover:border-white dark:border-white">
                    <div className="font-light uppercase">{label}</div>
                    <div className="opacity-40 text-xs text-right">v{version}</div>
                </div>
            </Link>
        </div>
    );
}
