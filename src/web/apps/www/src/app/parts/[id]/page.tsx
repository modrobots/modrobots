import { parts } from "../../../data/data";
import { Typography } from "@signalco/ui-primitives/Typography";
import { orderBy, slug } from "@signalco/js";
import { notFound } from "next/navigation";
import { Stack } from "@signalco/ui-primitives/Stack";
import { Row } from "@signalco/ui-primitives/Row";
import { Chip } from "@signalco/ui-primitives/Chip";
import { PartPreview } from "./PartPreview";
import { PartCard } from "./PartCard";
import { Button } from "@signalco/ui-primitives/Button";
import { BoxIcon, DownloadIcon } from "lucide-react";
import { PartsTableCard } from "../../../components/PartsTableCard";
import { SourcesTableCard } from "../../../components/SourcesTableCard";

export default async function ModulePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const part = parts.find((part) => part.id === id);
    if (!part) {
        notFound();
    }

    const lastVersion = orderBy(part.versions ?? [], (a, b) => a.version - b.version).at(0);
    const modelUrl = lastVersion?.modelUrl;
    const modelTranslate = lastVersion?.modelTranslate;
    const modelRotation = lastVersion?.modelRotation;
    const modelScale = lastVersion?.modelScale;

    return (
        <div className="p-8 flex flex-col gap-8">
            <Row spacing={2} alignItems="start">
                <PartCard id={part.id} label={part.label} noPreview={!modelUrl}>
                    {modelUrl && <PartPreview modelUrl={modelUrl} modelScale={modelScale} modelTranslate={modelTranslate} modelRotation={modelRotation} />}
                </PartCard>
                <Stack spacing={2}>
                    <Typography level="h1" id={slug(part.label)}>{part.label}</Typography>
                    {part.description && <Typography secondary>{part.description}</Typography>}
                    <Row spacing={2}>
                        {part.tags.map((category) => (
                            <Chip key={category}>{category}</Chip>
                        ))}
                    </Row>
                    {lastVersion?.modelUrl && (
                        <Stack spacing={2}>
                            {/* TODO: Show print profiles */}
                            <Row spacing={2}>
                                <Button
                                    href={lastVersion?.modelUrl}
                                    variant="outlined"
                                    startDecorator={<BoxIcon className="size-5" />}
                                    endDecorator={<DownloadIcon className="size-5" />}
                                >
                                    Download 3MF
                                </Button>
                            </Row>
                        </Stack>
                    )}
                </Stack>
            </Row>
            {part.sources && <SourcesTableCard sources={part.sources} />}
            {lastVersion?.parts && <PartsTableCard parts={lastVersion.parts} />}
        </div>
    );
}