'use client';

import { Canvas } from "@react-three/fiber";
import { useLoader } from '@react-three/fiber'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { FunctionComponent, PropsWithChildren, ReactNode, Suspense } from "react";
import { Center, Environment, OrbitControls, ContactShadows } from '@react-three/drei'

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
    <Canvas camera={{ position: [0, 0, 4.5], fov: 40 }} shadows>
      <ambientLight intensity={0.5} />
      <directionalLight color="white" position={[1, 1, 1]} intensity={4} />
      <Suspense fallback={null}>
        {model}
        <Environment preset="sunset" background backgroundBlurriness={1} />
      </Suspense>
      <OrbitControls autoRotate autoRotateSpeed={1} enablePan={false} enableZoom={false} minPolarAngle={Math.PI / 2.1} maxPolarAngle={Math.PI / 2.1} />
    </Canvas>
  )
}

function ModuleCard({ label, version, children }: PropsWithChildren<{ label: string, version: number }>) {
  return (
    <div className="aspect-square rounded-3xl bg-slate-400 relative overflow-clip">
      {children}
      <div className="absolute bottom-8 right-8 border-r px-4 py-2 border-black">
        <div className="font-light text-black uppercase">{label}</div>
        <div className="text-slate-700 text-xs text-right">v{version}</div>
      </div>
    </div>
  );
}

const modulePreviews: Record<string, FunctionComponent<{ version: number }> | null> = {
  joint: JointPreview,
  wheel: null,
};

const modules = [
  { id: 'joint', label: "Joint", version: 44 },
  { id: 'wheel', label: "Wheel", version: 0 },
  { id: 'foot', label: "Foot", version: 0 },
  { id: 'gripper', label: "Gripper", version: 0 },
  { id: 'brain', label: "Brain", version: 0 },
  { id: 'skeleton', label: "Skeleton", version: 0 },
  { id: 'vacuum-foot', label: "Vacuum Foot", version: 0 },
  { id: 'distance-sensor', label: "Distance Sensor", version: 0 },
  { id: 'sticky-mount', label: "Sticky Mount", version: 0 },
  { id: 'holder', label: "Holder", version: 0 },
  { id: 'locker', label: "Locker", version: 0 },
];

export default function Home() {
  return (
    <main className="flex min-h-screen justify-between p-8 md:p-24">
      <div className="flex flex-col gap-12">
        <h2 className="text-2xl uppercase font-light">Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {modules.map(({ id, label, version }) => {
            const Preview = modulePreviews[id] ?? (() => null);
            return (
              <ModuleCard key={label} label={label} version={version}>
                <ModulePreview model={<Preview version={version} />} />
              </ModuleCard>
            );
          })}
        </div>
      </div>
    </main>
  );
}

