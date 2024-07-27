import React from "react";
import { Card, CardOverflow } from "@signalco/ui-primitives/Card";
import { parts } from "../../data/data";
import { PartsTable } from "../PartsTable";
import { SectionHeader } from "../SectionHeader";
import { Stack } from "@signalco/ui-primitives/Stack";
import { Container } from "@signalco/ui-primitives/Container";

export default function PartsPage() {
    return (
        <Stack spacing={8}>
            <SectionHeader subHeader="All parts used for modules and accessories in one place">Parts</SectionHeader>
            <Container>
                <Card>
                    <CardOverflow>
                        <PartsTable parts={parts} />
                    </CardOverflow>
                </Card>
            </Container>
        </Stack>
    );
}