import { FC } from "react";
import { ModulePreviewScene } from "./ModulePreviewScene";
import { BrainPreview, HolderPreview, JointPreview, Joint360Preview } from "../components/modules/previews/JointModel";

const modulePreviewComponents: Record<string, FC<{ version: number }> | null> = {
    joint: JointPreview,
    joint360: Joint360Preview,
    holder: HolderPreview,
    brain: BrainPreview
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
