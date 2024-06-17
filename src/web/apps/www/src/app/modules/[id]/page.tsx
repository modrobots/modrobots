import { modules, parts } from "../../../data/data";
import { ModulePreview } from "../../ModulePreview";

export default function ModulePage({ params }: { params: { id: string } }) {
    const { id } = params;
    const mod = modules.find((module) => module.id === id);
    if (!mod) {
        return <div>Module not found</div>;
    }

    return (
        <div>
            <h1>{mod.label}</h1>
            <div className="size-72 rounded-3xl bg-white">
                <ModulePreview id={id} version={mod.version} />
            </div>
            <h2>Parts</h2>
            <table>
                <thead>
                    <tr>
                        <th>Part</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {mod.parts ? mod.parts.map((modulePart) => {
                        const part = parts.find(p => p.id === modulePart.partId);
                        return (
                            <tr key={modulePart.partId}>
                                <td><a href={`/parts/${part?.id}`}>{part?.label ?? 'Undocumented part ' + modulePart.partId}</a></td>
                                <td>{modulePart.quantity}</td>
                                <td>€{(part?.sources?.at(0)?.prices?.at(0)?.pricePerItem ?? 0) * modulePart.quantity}</td>
                            </tr>
                        );
                    }) : (
                        <tr><td colSpan={3}>No parts</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}