import Link from "next/link";
import { parts as partsData } from "../data/data";
import { orderBy } from "@signalco/js";
import { Table } from "@signalco/ui-primitives/Table";

export function PartsTable({ parts }: { parts: typeof partsData[0][]; }) {
    const orderedParts = orderBy(parts, (partA, partB) => partA.label.localeCompare(partB.label));
    return (
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.Head>Name</Table.Head>
                    <Table.Head>Price</Table.Head>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {orderedParts ? orderedParts.map((part) => {
                    return (
                        <Table.Row key={part.id}>
                            <Table.Cell><Link href={`/parts/${part?.id}`}>{part?.label ?? 'Undocumented part ' + part.id}</Link></Table.Cell>
                            <Table.Cell>€{(part?.sources?.at(0)?.prices?.at(0)?.pricePerItem ?? 0).toFixed(2)}</Table.Cell>
                        </Table.Row>
                    );
                }) : (
                        <Table.Row>
                            <Table.Cell colSpan={3}>No parts</Table.Cell>
                        </Table.Row>
                )}
            </Table.Body>
        </Table>
    );
}
