'use client';

import { ScrolledLine } from "../components/shared/ScrolledLine";
import SectionPrinciples from "./SectionPrinciples";
import { modules, modulesCategories } from "../data/data";
import Link from "next/link";
import { ModulePreview } from "./ModulePreview";
import { ModuleEmptyBackground } from './ModuleEmptyBackground';
import { PropsWithChildren, useEffect, useState } from "react";

function ModuleCard({ id, label, version, children }: PropsWithChildren<{ id: string, label: string, version: number }>) {
  return (
    <div className="aspect-square rounded-3xl overflow-clip group hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors relative">
      {Boolean(version) && children}
      {!version && (
        <div className="absolute inset-0">
          <ModuleEmptyBackground />
          <div className="flex items-center justify-center h-full opacity-60 uppercase font-mono">
            Coming Soon
          </div>
        </div>
      )}
      <Link href={`/modules/${id}`}>
        <div className="absolute bottom-4 right-4 border-r px-4 py-2 border-black group-hover:dark:border-black group-hover:border-white dark:border-white">
          <div className="font-light uppercase">{label}</div>
          <div className="opacity-40 text-xs text-right">v{version}</div>
        </div>
      </Link>
    </div>
  );
}

function CoverBackground() {
  return (
    <svg className="pointer-events-none size-full absolute inset-0">
      <pattern id="pattern-heroundefined" x="0" y="0" width="21.5" height="21.5" patternUnits="userSpaceOnUse" patternTransform="translate(-0.5,-0.5)">
        <circle cx="0.5" cy="0.5" r="0.5" fill="#91919a" />
      </pattern>
      <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-heroundefined)" />
    </svg>
  );
}

function SectionCover() {
  const lines = ['modable', 'modular', 'modifiable']
  const [lineIndex, setLineIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setLineIndex((lineIndex + 1) % lines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [lineIndex, lines.length]);

  return (
    <section className="px-6 py-24 md:px-24 flex gap-4 flex-col relative">
      <CoverBackground />
      <div className="relative">
        <h1 className="uppercase text-5xl">mod<br />robots</h1>
        <ScrolledLine className="uppercase text-5xl absolute left-0 top-0 opacity-40" aria-hidden="true"><span className="opacity-0">mod</span>{lines[lineIndex]?.substring(3)}</ScrolledLine>
      </div>
      <p className="text-xl opacity-80">Robots you make, not just assemble.</p>
    </section>
  );
}

function SectionModules() {
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

export default function Home() {
  return (
    <main className="flex flex-col">
      <SectionCover />
      <SectionPrinciples />
      <SectionModules />
    </main>
  );
}

