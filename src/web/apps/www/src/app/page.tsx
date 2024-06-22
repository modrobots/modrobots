'use client';

import SectionPrinciples from "./SectionPrinciples";
import { SectionCover } from "./SectionCover";
import { SectionModules } from "./SectionModules";

export default function Home() {
  return (
    <main className="flex flex-col">
      <SectionCover />
      <SectionPrinciples />
      <SectionModules />
    </main>
  );
}

