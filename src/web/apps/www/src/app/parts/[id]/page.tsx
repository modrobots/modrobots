import Link from "next/link";
import { parts } from "../../../data/data";
import { Card, CardHeader, CardOverflow, CardTitle } from "@signalco/ui-primitives/Card";
import { Typography } from "@signalco/ui-primitives/Typography";
import { slug } from "@signalco/js";
import { notFound } from "next/navigation";
import { Table } from "@signalco/ui-primitives/Table";
import { Stack } from "@signalco/ui-primitives/Stack";
import { Row } from "@signalco/ui-primitives/Row";
import { Chip } from "@signalco/ui-primitives/Chip";
import { PartPreview } from "./PartPreview";
import { PartCard } from "./PartCard";

function SourcesTableCard({ part }: { part: typeof parts[number] }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Sources</CardTitle>
            </CardHeader>
            <CardOverflow>
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.Head>URL</Table.Head>
                            <Table.Head>Price per unit</Table.Head>
                            <Table.Head>Min. order qt</Table.Head>
                            <Table.Head>Order price</Table.Head>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {part.sources ? part.sources.map((partSource) => {
                            return (
                                <Table.Row key={partSource.url}>
                                    <Table.Cell><Link href={partSource.url} target="_blank" referrerPolicy="no-referrer">{partSource.url}</Link></Table.Cell>
                                    <Table.Cell>€{partSource.prices[0]?.pricePerItem}</Table.Cell>
                                    <Table.Cell>{partSource.prices[0]?.numberOfItems ?? '-'}</Table.Cell>
                                    <Table.Cell>€{((partSource.prices[0]?.numberOfItems ?? 0) * (partSource.prices[0]?.pricePerItem ?? 0)).toFixed(2)}</Table.Cell>
                                </Table.Row>
                            );
                        }) : (
                            <Table.Row>
                                <Table.Cell colSpan={4}>No sources</Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
            </CardOverflow>
        </Card>
    )
}

export default async function ModulePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const part = parts.find((part) => part.id === id);
    if (!part) {
        notFound();
    }

    const version = part.versions?.at(0);
    const modelUrl = version?.modelUrl;
    const modelTranslate = version?.modelTranslate;
    const modelRotation = version?.modelRotation;
    const modelScale = version?.modelScale;

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
                </Stack>
            </Row>
            {part.sources && <SourcesTableCard part={part} />}
        </div>
    );
}