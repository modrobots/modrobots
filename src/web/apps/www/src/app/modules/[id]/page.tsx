import Link from "next/link";
import { parts } from "../../../data/data";
import { ModulePreview } from "../../ModulePreview";
import { Card, CardHeader, CardOverflow, CardTitle } from "@signalco/ui-primitives/Card";
import { Chip } from "@signalco/ui-primitives/Chip";
import { ModuleCard } from "../../ModuleCard";
import { Stack } from "@signalco/ui-primitives/Stack";
import { Typography } from "@signalco/ui-primitives/Typography";
import { Row } from "@signalco/ui-primitives/Row";
import { Table } from "@signalco/ui-primitives/Table";
import { orderBy } from "@signalco/js";
import { Suspense } from "react";

export default async function ModulePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const mod = parts.find((part) => part.id === id);
    if (!mod) {
        return <div>Module not found</div>;
    }

    const lastVersion = orderBy(mod.versions ?? [], (a, b) => a.version - b.version).at(0);
    const partsTotal = lastVersion?.parts?.reduce((total, modulePart) => {
        const part = parts.find(p => p.id === modulePart.partId);
        return total + (orderBy(part?.sources?.at(0)?.prices ?? [], (a, b) => a.updatedAt.getTime() - b.updatedAt.getTime()).at(0)?.pricePerItem ?? 0) * modulePart.quantity;
    }, 0);

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
            <Card>
                <CardHeader>
                    <CardTitle>Parts list</CardTitle>
                </CardHeader>
                <CardOverflow>
                    <Table>
                        <Table.Header>
                            <Table.Row>
                                <Table.Head>Name</Table.Head>
                                <Table.Head>Quantity</Table.Head>
                                <Table.Head>Price</Table.Head>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {lastVersion?.parts ? lastVersion.parts.map((modulePart) => {
                                const part = parts.find(p => p.id === modulePart.partId);
                                const partPrice = part?.sources
                                    ? orderBy(part?.sources?.at(0)?.prices ?? [], (a, b) => a.updatedAt.getTime() - b.updatedAt.getTime())?.at(0)?.pricePerItem ?? 0
                                    : (orderBy(part?.versions ?? [], (a, b) => a.version - b.version).at(0)?.printingDetails?.profiles?.at(0)?.weight ?? 0) * (25 / 1000);
                                return (
                                    <Table.Row key={modulePart.partId}>
                                        <Table.Cell><Link href={`/parts/${part?.id}`}>{part?.label ?? 'Undocumented part ' + modulePart.partId}</Link></Table.Cell>
                                        <Table.Cell>{modulePart.quantity}</Table.Cell>
                                        <Table.Cell>€{(partPrice * modulePart.quantity).toFixed(2)}</Table.Cell>
                                    </Table.Row>
                                );
                            }) : (
                                    <Table.Row>
                                        <Table.Cell colSpan={3}>No parts</Table.Cell>
                                    </Table.Row>
                            )}
                            <Table.Row>
                                <Table.Cell className="text-right font-bold" colSpan={2}>Total</Table.Cell>
                                <Table.Cell>€{partsTotal?.toFixed(2)}</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </CardOverflow>
            </Card>
        </Stack>
    );
}