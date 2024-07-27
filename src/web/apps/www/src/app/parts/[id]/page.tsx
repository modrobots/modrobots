import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "../../../components/shared/Table";
import { parts } from "../../../data/data";
import { Card, CardHeader, CardOverflow, CardTitle } from "@signalco/ui-primitives/Card";
import { Typography } from "@signalco/ui-primitives/Typography";
import { slug } from "@signalco/js";
import { notFound } from "next/navigation";

export default function ModulePage({ params }: { params: { id: string } }) {
    const { id } = params;
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
                        <TableHead>
                            <TableRow>
                                <TableHeadCell>URL</TableHeadCell>
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
                </CardOverflow>
            </Card>
        </div>
    );
}