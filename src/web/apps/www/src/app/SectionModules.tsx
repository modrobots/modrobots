import { parts } from "../data/data";
import { ModulePreview } from "./ModulePreview";
import { ModuleCard } from "./ModuleCard";
import { Row } from "@signalco/ui-primitives/Row";
import { Typography } from "@signalco/ui-primitives/Typography";
import { Stack } from "@signalco/ui-primitives/Stack";
import { orderBy } from "@signalco/js";

export function SectionModules() {
    const moduleParts = parts.filter((part) => part.tags.includes("module"));
    const moduleCategories = Array.from(new Set(moduleParts.flatMap(({ tags }) => tags.filter((tag) => tag.startsWith("module-")).map((tag) => tag.replace("module-", "")))));
    const modulesCategories = moduleCategories.sort((a, b) => a.localeCompare(b));

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
                            <Typography level="h3" uppercase className="text-xl">{category}</Typography>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {moduleParts.filter(({ tags }) => tags.includes(`module-${category}`)).map(({ id, label, versions }) => {
                                    const latestVersion = orderBy(versions ?? [], (a, b) => a.version - b.version).at(0)?.version;
                                    return (
                                        <ModuleCard key={id} id={id} label={label} version={latestVersion}>
                                            <ModulePreview id={id} version={latestVersion ?? 0} />
                                        </ModuleCard>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </Stack>
            </Row>
        </section>
    );
}
