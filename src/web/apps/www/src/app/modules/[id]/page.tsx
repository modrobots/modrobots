import Link from "next/link";
import { Card, CardTitle } from "../../../components/shared/Card";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "../../../components/shared/Table";
import { modules, parts } from "../../../data/data";
import { ModulePreview } from "../../ModulePreview";

export default function ModulePage({ params }: { params: { id: string } }) {
    const { id } = params;
    const mod = modules.find((module) => module.id === id);
    if (!mod) {
        return <div>Module not found</div>;
    }

    const partsTotal = mod.parts?.reduce((total, modulePart) => {
        const part = parts.find(p => p.id === modulePart.partId);
        return total + (part?.sources?.at(0)?.prices?.at(0)?.pricePerItem ?? 0) * modulePart.quantity;
    }, 0);

    return (
        <div className="flex flex-col gap-4 p-8">
            <div className="flex flex-row gap-4">
                <Card className="size-72 rounded-3xl bg-black dark:bg-white">
                    <ModulePreview id={id} version={mod.version} />
                </Card>
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl px-4 py-2">{mod.label}</h1>
                    <p className="p-4 text-pretty opacity-80">{mod.description}</p>
                    <div className="flex flex-row gap-2 px-4">
                        {mod.categories.map((category) => (
                            <span key={category} className="px-2 py-1 text-sm border border-neutral-700 rounded-full">{category}</span>
                        ))}
                    </div>
                </div>
            </div>
            <Card>
                <CardTitle>
                    <h2>Parts list</h2>
                </CardTitle>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeadCell>Name</TableHeadCell>
                            <TableHeadCell>Quantity</TableHeadCell>
                            <TableHeadCell>Price</TableHeadCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {mod.parts ? mod.parts.map((modulePart) => {
                            const part = parts.find(p => p.id === modulePart.partId);
                            return (
                                <TableRow key={modulePart.partId}>
                                    <TableCell><Link href={`/parts/${part?.id}`}>{part?.label ?? 'Undocumented part ' + modulePart.partId}</Link></TableCell>
                                    <TableCell>{modulePart.quantity}</TableCell>
                                    <TableCell>€{((part?.sources?.at(0)?.prices?.at(0)?.pricePerItem ?? 0) * modulePart.quantity).toFixed(2)}</TableCell>
                                </TableRow>
                            );
                        }) : (
                            <TableRow>
                                <TableCell colSpan={3}>No parts</TableCell>
                            </TableRow>
                        )}
                        <TableRow>
                            <TableCell className="text-right font-bold" colSpan={2}>Total</TableCell>
                            <TableCell>€{partsTotal?.toFixed(2)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
}