import Link from "next/link";
import { Card, CardHeader, CardOverflow, CardTitle } from "@signalco/ui-primitives/Card";
import { Table } from "@signalco/ui-primitives/Table";
import { PartSourceType } from "../data/data";

export function SourcesTableCard({ sources }: { sources: PartSourceType[] }) {
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
                        {sources.length ? sources.map((partSource) => {
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