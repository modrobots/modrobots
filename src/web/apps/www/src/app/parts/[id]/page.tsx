import Link from "next/link";
import { parts } from "../../../data/data";
import { Card, CardHeader, CardOverflow, CardTitle } from "@signalco/ui-primitives/Card";
import { Typography } from "@signalco/ui-primitives/Typography";
import { slug } from "@signalco/js";
import { notFound } from "next/navigation";
import { Table } from "@signalco/ui-primitives/Table";

export default async function ModulePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const part = parts.find((part) => part.id === id);
    if (!part) {
        notFound();
    }

    return (
        <div className="p-8 flex flex-col gap-8">
            <Typography level="h1" id={slug(part.label)}>{part.label}</Typography>
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
                                        <Table.Cell>€{(partSource.prices[0]?.numberOfItems ?? 0) * (partSource.prices[0]?.pricePerItem ?? 0)}</Table.Cell>
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
        </div>
    );
}