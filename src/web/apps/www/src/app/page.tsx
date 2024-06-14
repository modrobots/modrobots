'use client';

import { Canvas } from "@react-three/fiber";
import { useLoader } from '@react-three/fiber'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { FunctionComponent, PropsWithChildren, ReactNode, Suspense, useEffect, useState } from "react";
import { Center, Environment, OrbitControls, ContactShadows } from '@react-three/drei'
import { ScrolledLine } from "../components/shared/ScrolledLine";
import SectionPrinciples from "./SectionPrinciples";

function HolderModel({ version }: { version: number }) {
  const jointModel = useLoader(STLLoader, `/3d/Preview Holder v${version}.stl`);
  return (
    <Center top>
      <group scale={[0.02, 0.02, 0.02]} position={[0, 4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh castShadow>
          <primitive object={jointModel} />
          <meshStandardMaterial metalness={1} roughness={1} />
        </mesh>
      </group>
    </Center>
  )
}

function HolderPreview({ version }: { version: number }) {
  return (
    <group position={[0, -0.5, 0]}>
      <Suspense fallback={null}>
        <HolderModel version={version} />
      </Suspense>
      <ContactShadows resolution={512} position={[0, -0.1, 0]} opacity={0.5} blur={2} scale={10} />
    </group>
  );
}

function JointModel({ version }: { version: number }) {
  const jointModel = useLoader(STLLoader, `/3d/Preview Joint v${version}.stl`);
  return (
    <Center top>
      <group scale={[0.02, 0.02, 0.02]} position={[0, 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh castShadow>
          <primitive object={jointModel} />
          <meshStandardMaterial metalness={1} roughness={1} />
        </mesh>
      </group>
    </Center>
  )
}

function JointPreview({ version }: { version: number }) {
  return (
    <group position={[0, -0.9, 0]}>
      <Suspense fallback={null}>
        <JointModel version={version} />
      </Suspense>
      <ContactShadows resolution={512} position={[0, -0.1, 0]} opacity={0.5} blur={2} scale={10} />
    </group>
  );
}

function ModulePreview({ model }: { model: ReactNode }) {
  return (
    <>
      <Canvas camera={{ position: [0, 0, 4.5], fov: 40 }} shadows>
        <ambientLight intensity={0.5} />
        <directionalLight color="white" position={[1, 1, 1]} intensity={4} />
        <Suspense fallback={null}>
          {model}
          <Environment preset="sunset" backgroundBlurriness={1} />
        </Suspense>
        <OrbitControls autoRotate autoRotateSpeed={1} enablePan={false} enableZoom={false} />
      </Canvas>
    </>
  )
}

function ModuleEmptyBackground() {
  return (
    <svg className="pointer-events-none size-full absolute inset-0">
      <pattern id="pattern-heroundefined" x="0" y="0" width="21.5" height="21.5" patternUnits="userSpaceOnUse" patternTransform="translate(-0.5,-0.5)">
        <circle cx="0.5" cy="0.5" r="0.5" fill="#91919a" />
      </pattern>
      <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-heroundefined)" />
    </svg>
  );
}

function ModuleCard({ label, version, children }: PropsWithChildren<{ label: string, version: number }>) {
  return (
    <div className="aspect-square rounded-3xl overflow-clip group hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors relative">
      {Boolean(version) && children}
      <div className="absolute bottom-4 right-4 border-r px-4 py-2 border-black group-hover:dark:border-black group-hover:border-white dark:border-white">
        <div className="font-light uppercase">{label}</div>
        <div className="opacity-40 text-xs text-right">v{version}</div>
      </div>
      {!version && (
        <div className="absolute inset-0">
          <ModuleEmptyBackground />
          <div className="flex items-center justify-center h-full opacity-60 uppercase font-mono">
            Coming Soon
          </div>
        </div>
      )}
    </div>
  );
}

const modulePreviews: Record<string, FunctionComponent<{ version: number }> | null> = {
  joint: JointPreview,
  holder: HolderPreview
};

const modules = [
  { id: 'joint', label: "Joint", version: 44, categories: ['Motion'] },
  { id: 'wheel', label: "Wheel", version: 0, categories: ['Motion'] },
  { id: 'foot', label: "Foot", version: 0, categories: ['Motion'] },
  { id: 'gripper-flex', label: "Flex Gripper", version: 0, categories: ['Manipulation'] },
  { id: 'gripper-vacuum', label: "Vacuum Gripper", version: 0, categories: ['Manipulation'] },
  { id: 'brain', label: "Brain", version: 0, categories: ['Control'] },
  { id: 'skeleton', label: "Skeleton", version: 0, categories: ['Perception'] },
  { id: 'vacuum-foot', label: "Vacuum Foot", version: 0, categories: ['Motion'] },
  { id: 'distance-sensor', label: "Distance Sensor", version: 0, categories: ['Perception'] },
  { id: 'sticky-mount', label: "Sticky Mount", version: 0, categories: ['Attachment'] },
  { id: 'holder', label: "Holder", version: 1, categories: ['Attachment'] },
  { id: 'locker', label: "Locker", version: 0, categories: ['Attachment'] },
];

const categories = [
  'Control',
  'Motion',
  'Manipulation',
  'Perception',
  'Attachment'
]

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
          {categories.map((category) => (
            <div key={category} className="flex flex-col gap-4 px-4 md:px-12 w-full">
              <h3 className="text-xl uppercase font-mono">{category}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {modules.filter(({ categories }) => categories.includes(category)).map(({ id, label, version }) => {
                  const Preview = modulePreviews[id] ?? (() => null);
                  return (
                    <ModuleCard key={label} label={label} version={version}>
                      <ModulePreview model={<Preview version={version} />} />
                    </ModuleCard>
                  );
                })}
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

