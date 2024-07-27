import React from "react";
import { Card } from "@signalco/ui-primitives/Card";
import { parts } from "../../data/data";
import { PartsTable } from "../PartsTable";
import { SectionHeader } from "../SectionHeader";

export default function PartsPage() {
    return (
        <div className="flex flex-col gap-8">
            <SectionHeader>
                Parts
            </SectionHeader>
            <Card className="m-4">
                <PartsTable parts={parts} />
            </Card>
        </div>
    );
}