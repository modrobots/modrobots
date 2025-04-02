import Link from "next/link";
import { modules, parts } from "../../../data/data";
import { ModulePreview } from "../../ModulePreview";
import { Card, CardHeader, CardOverflow, CardTitle } from "@signalco/ui-primitives/Card";
import { Chip } from "@signalco/ui-primitives/Chip";
import { ModuleCard } from "../../ModuleCard";
import { Stack } from "@signalco/ui-primitives/Stack";
import { Typography } from "@signalco/ui-primitives/Typography";
import { Row } from "@signalco/ui-primitives/Row";
import { Table } from "@signalco/ui-primitives/Table";

export default async function ModulePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const mod = modules.find((module) => module.id === id);
    if (!mod) {
        return <div>Module not found</div>;
    }

    const partsTotal = mod.parts?.reduce((total, modulePart) => {
        const part = parts.find(p => p.id === modulePart.partId);
        return total + (part?.sources?.at(0)?.prices?.at(0)?.pricePerItem ?? 0) * modulePart.quantity;
    }, 0);

    return (
        <Stack spacing={2} className="p-8">
            <Row spacing={2} alignItems="start">
                <ModuleCard id={id} label={mod.label} version={mod.version}>
                    <ModulePreview id={id} version={mod.version} />
                </ModuleCard>
                <Stack spacing={2}>
                    <Typography level="h1">{mod.label}</Typography>
                    {mod.description && <Typography secondary>{mod.description}</Typography>}
                    <Row spacing={2}>
                        {mod.categories.map((category) => (
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
                            {mod.parts ? mod.parts.map((modulePart) => {
                                const part = parts.find(p => p.id === modulePart.partId);
                                const partPrice = part?.sources
                                    ? part?.sources?.at(0)?.prices?.at(0)?.pricePerItem ?? 0
                                    : (part?.versions?.at(0)?.printingDetails?.profiles?.at(0)?.weight ?? 0) * (25 / 1000);
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