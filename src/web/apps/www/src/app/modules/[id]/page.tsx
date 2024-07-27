import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "../../../components/shared/Table";
import { modules, parts } from "../../../data/data";
import { ModulePreview } from "../../ModulePreview";
import { Card, CardHeader, CardOverflow, CardTitle } from "@signalco/ui-primitives/Card";
import { Chip } from "@signalco/ui-primitives/Chip";
import { ModuleCard } from "../../ModuleCard";
import { Stack } from "@signalco/ui-primitives/Stack";
import { Typography } from "@signalco/ui-primitives/Typography";
import { Row } from "@signalco/ui-primitives/Row";

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
                </CardOverflow>
            </Card>
        </Stack>
    );
}