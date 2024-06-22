import { SectionHeader } from "../SectionHeader";
import { SectionModules } from "../SectionModules";

export default function ModulesPage() {
    return (
        <div className="flex flex-col gap-8">
            <SectionHeader>
                Modules
            </SectionHeader>
            <SectionModules />
        </div>
    );
}