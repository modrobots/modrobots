import Link from "next/link";
import { parts as partsData } from "../data/data";
import { Table, TableHead, TableRow, TableHeadCell, TableBody, TableCell } from "../components/shared/Table";

export function PartsTable({ parts }: { parts: typeof partsData[0][]; }) {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableHeadCell>Name</TableHeadCell>
                    <TableHeadCell>Price</TableHeadCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {parts ? parts.map((part) => {
                    return (
                        <TableRow key={part.id}>
                            <TableCell><Link href={`/parts/${part?.id}`}>{part?.label ?? 'Undocumented part ' + part.id}</Link></TableCell>
                            <TableCell>€{(part?.sources?.at(0)?.prices?.at(0)?.pricePerItem ?? 0).toFixed(2)}</TableCell>
                        </TableRow>
                    );
                }) : (
                    <TableRow>
                        <TableCell colSpan={3}>No parts</TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
