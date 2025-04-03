import { parts } from "../../../data/data";
import { ModulePreview } from "../../ModulePreview";
import { Chip } from "@signalco/ui-primitives/Chip";
import { ModuleCard } from "../../ModuleCard";
import { Stack } from "@signalco/ui-primitives/Stack";
import { Typography } from "@signalco/ui-primitives/Typography";
import { Row } from "@signalco/ui-primitives/Row";
import { orderBy } from "@signalco/js";
import { Suspense } from "react";
import { PartsTableCard } from "../../../components/PartsTableCard";
import { SourcesTableCard } from "../../../components/SourcesTableCard";
import { notFound } from "next/navigation";

export default async function ModulePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const mod = parts.find((part) => part.id === id);
    if (!mod) {
        notFound();
    }

    const lastVersion = orderBy(mod.versions ?? [], (a, b) => a.version - b.version).at(0);

    return (
        <Stack spacing={2} className="p-8">
            <Row spacing={2} alignItems="start">
                <ModuleCard id={id} label={mod.label} version={lastVersion?.version}>
                    <Suspense>
                        <ModulePreview id={id} version={lastVersion?.version ?? 0} />
                    </Suspense>
                </ModuleCard>
                <Stack spacing={2}>
                    <Typography level="h1">{mod.label}</Typography>
                    {mod.description && <Typography secondary>{mod.description}</Typography>}
                    <Row spacing={2}>
                        {mod.tags.map((category) => (
                            <Chip key={category}>{category}</Chip>
                        ))}
                    </Row>
                </Stack>
            </Row>
            {mod.sources && <SourcesTableCard sources={mod.sources} />}
            {lastVersion?.parts && <PartsTableCard parts={lastVersion.parts} />}
        </Stack>
    );
}