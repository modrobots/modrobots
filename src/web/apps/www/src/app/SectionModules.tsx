import { modules, modulesCategories } from "../data/data";
import { ModulePreview } from "./ModulePreview";
import { ModuleCard } from "./ModuleCard";
import { Row } from "@signalco/ui-primitives/Row";
import { Typography } from "@signalco/ui-primitives/Typography";
import { Stack } from "@signalco/ui-primitives/Stack";

export function SectionModules() {
    return (
        <section>
            <Row alignItems="stretch">
                <div className="rounded-tr-xl rounded-br-xl bg-black text-white dark:text-black dark:bg-white  p-4 px-2">
                    <Typography level="h2" uppercase className="text-sm  [writing-mode:vertical-lr] rotate-180">
                        modules
                    </Typography>
                </div>
                <Stack spacing={6}>
                    {modulesCategories.map((category) => (
                        <div key={category} className="flex flex-col gap-4 px-4 md:px-12 w-full">
                            <Typography level="h3" uppercase>{category}</Typography>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {modules.filter(({ categories }) => categories.includes(category)).map(({ id, label, version }) => (
                                    <ModuleCard key={id} id={id} label={label} version={version}>
                                        <ModulePreview id={id} version={version} />
                                    </ModuleCard>
                                ))}
                            </div>
                        </div>
                    ))}
                </Stack>
            </Row>
        </section>
    );
}
