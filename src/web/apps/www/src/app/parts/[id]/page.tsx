import Link from "next/link";
import { Card, CardTitle } from "../../../components/shared/Card";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "../../../components/shared/Table";
import { parts } from "../../../data/data";

export default function ModulePage({ params }: { params: { id: string } }) {
    const { id } = params;
    const part = parts.find((part) => part.id === id);
    if (!part) {
        return <div>Part not found</div>;
    }

    return (
        <div className="p-8 flex flex-col gap-8">
            <h1 className="text-xl">{part.label}</h1>
            <Card>
                <CardTitle>
                    <h2>Sources</h2>
                </CardTitle>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeadCell>Source</TableHeadCell>
                            <TableHeadCell>Price per unit</TableHeadCell>
                            <TableHeadCell>Min. order qt</TableHeadCell>
                            <TableHeadCell>Order price</TableHeadCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {part.sources ? part.sources.map((partSource) => {
                            return (
                                <TableRow key={partSource.url}>
                                    <TableCell><Link href={partSource.url} target="_blank" referrerPolicy="no-referrer">{partSource.url}</Link></TableCell>
                                    <TableCell>€{partSource.prices[0]?.pricePerItem}</TableCell>
                                    <TableCell>{partSource.prices[0]?.numberOfItems ?? '-'}</TableCell>
                                    <TableCell>€{(partSource.prices[0]?.numberOfItems ?? 0) * (partSource.prices[0]?.pricePerItem ?? 0)}</TableCell>
                                </TableRow>
                            );
                        }) : (
                            <TableRow>
                                <TableCell colSpan={4}>No sources</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
}