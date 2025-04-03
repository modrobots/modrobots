import { orderBy } from "@signalco/js";
import { Card, CardHeader, CardTitle, CardOverflow } from "@signalco/ui-primitives/Card";
import { PartVersionPartType, parts } from "../data/data";
import { Table } from "@signalco/ui-primitives/Table";
import Link from "next/link";

export function PartsTableCard({ parts: versionParts }: { parts: PartVersionPartType[] }) {
    const partsTotal = versionParts.reduce((total, modulePart) => {
        const part = parts.find(p => p.id === modulePart.partId);
        return total + (orderBy(part?.sources?.at(0)?.prices ?? [], (a, b) => a.updatedAt.getTime() - b.updatedAt.getTime()).at(0)?.pricePerItem ?? 0) * modulePart.quantity;
    }, 0);

    return (
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
                        {versionParts ? versionParts.map((modulePart) => {
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
    )
}
