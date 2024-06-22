import { modules, modulesCategories } from "../data/data";
import { ModulePreview } from "./ModulePreview";
import { ModuleCard } from "./ModuleCard";

export function SectionModules() {
    return (
        <section className="w-full">
            <div className="flex flex-row">
                <h2 className="text-sm uppercase rounded-tr-xl rounded-br-xl bg-black text-white dark:text-black dark:bg-white [writing-mode:vertical-lr] border border-l-transparent p-4 px-2">
                    <span className="opacity-60">modules</span>
                </h2>
                <div className="flex flex-col gap-12 w-full">
                    {modulesCategories.map((category) => (
                        <div key={category} className="flex flex-col gap-4 px-4 md:px-12 w-full">
                            <h3 className="text-xl uppercase font-mono">{category}</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {modules.filter(({ categories }) => categories.includes(category)).map(({ id, label, version }) => (
                                    <ModuleCard key={id} id={id} label={label} version={version}>
                                        <ModulePreview id={id} version={version} />
                                    </ModuleCard>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
