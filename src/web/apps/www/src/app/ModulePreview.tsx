'use client';

import { FC } from "react";
import { Joint360Preview } from "../components/modules/previews/JointModel";
import { ModulePreviewScene } from "./ModulePreviewScene";

const modulePreviewComponents: Record<string, FC<{ version: number }> | null> = {
    joint360: Joint360Preview,
};

export function ModulePreview({ id, version }: { id: string, version: number }) {
    const Model = modulePreviewComponents[id];
    // TODO: Add placeholder/fallback model
    if (!Model) return null;
    return (
        <ModulePreviewScene>
            <Model version={version} />
        </ModulePreviewScene>
    );
}
