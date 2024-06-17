import { parts } from "../../../data/data";

export default function ModulePage({ params }: { params: { id: string } }) {
    const { id } = params;
    const part = parts.find((part) => part.id === id);
    if (!part) {
        return <div>Part not found</div>;
    }

    return (
        <div>
            <h1>{part.label}</h1>
            <h2>Sources</h2>
            <table>
                <thead>
                    <tr>
                        <th>Source</th>
                        <th>Price per unit</th>
                        <th>Min. order qt</th>
                        <th>Order price</th>
                    </tr>
                </thead>
                <tbody>
                    {part.sources ? part.sources.map((partSource) => {
                        return (
                            <tr key={partSource.url}>
                                <td><a href={partSource.url} target="_blank" referrerPolicy="no-referrer">{partSource.url}</a></td>
                                <td>€{partSource.prices[0]?.pricePerItem}</td>
                                <td>{partSource.prices[0]?.numberOfItems ?? '-'}</td>
                                <td>€{(partSource.prices[0]?.numberOfItems ?? 0) * (partSource.prices[0]?.pricePerItem ?? 0)}</td>
                            </tr>
                        );
                    }) : (
                        <tr><td colSpan={4}>No sources</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}