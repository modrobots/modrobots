'use client';

import { useLoader } from '@react-three/fiber'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { Suspense } from "react";
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

export function HolderPreview({ version }: { version: number }) {
    return (
        <group position={[0, -0.5, 0]}>
            <Suspense fallback={null}>
                <HolderModel version={version} />
            </Suspense>
            <ContactShadows resolution={512} position={[0, -0.1, 0]} opacity={0.5} blur={2} scale={10} />
        </group>
    );
}

function BrainModel({ version }: { version: number }) {
    const jointModel = useLoader(STLLoader, `/3d/Preview Brain v${version}.stl`);
    return (
        <Center top>
            <group scale={[modelScale * 0.7, modelScale * 0.7, modelScale * 0.7]} position={[0, 0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <mesh castShadow>
                    <primitive object={jointModel} />
                    <meshStandardMaterial metalness={1} roughness={1} />
                </mesh>
            </group>
        </Center>
    )
}

export function BrainPreview({ version }: { version: number }) {
    return (
        <group position={[0, -0.9, 0]}>
            <Suspense fallback={null}>
                <BrainModel version={version} />
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

export function JointPreview({ version }: { version: number }) {
    return (
        <group position={[0, -0.9, 0]}>
            <Suspense fallback={null}>
                <JointModel version={version} />
            </Suspense>
            <ContactShadows resolution={512} position={[0, -0.1, 0]} opacity={0.5} blur={2} scale={10} />
        </group>
    );
}
