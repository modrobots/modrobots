'use client';

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from '@react-three/drei';
import { useLoader } from '@react-three/fiber'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { FunctionComponent, Suspense } from "react";
import { Center, ContactShadows } from '@react-three/drei'

const modelScale = 0.02;

function HolderModel({ version }: { version: number }) {
    const jointModel = useLoader(STLLoader, `/3d/Preview Holder v${version}.stl`);
    return (
        <Center top>
            <group scale={[modelScale, modelScale, modelScale]} position={[0, 4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
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
            <group scale={[modelScale, modelScale, modelScale]} position={[0, 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
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

const modulePreviewComponents: Record<string, FunctionComponent<{ version: number }> | null> = {
    joint: JointPreview,
    holder: HolderPreview
};

export function ModulePreview({ id, version }: { id: string, version: number }) {
    const model = modulePreviewComponents[id]?.({ version });
    return (
        <>
            <Canvas camera={{ position: [0, 2, 4.5], fov: 40 }} shadows>
                <ambientLight intensity={0.5} />
                <directionalLight color="white" position={[1, 1, 1]} intensity={4} />
                <Suspense fallback={null}>
                    {model}
                    <Environment preset="sunset" backgroundBlurriness={1} />
                </Suspense>
                <OrbitControls
                    autoRotate
                    autoRotateSpeed={1}
                    enablePan={false}
                    enableZoom={false} target={[0, 0, 0]} />
            </Canvas>
        </>
    );
}
