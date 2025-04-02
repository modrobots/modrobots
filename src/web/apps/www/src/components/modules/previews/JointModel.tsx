'use client';

import { useLoader } from '@react-three/fiber'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { ThreeMFLoader } from 'three/examples/jsm/loaders/3MFLoader.js';
import { Suspense, useEffect, useRef } from "react";
import { Center, ContactShadows } from '@react-three/drei'
import { Box3, Group, Object3DEventMap, Vector3 } from 'three';
import { parts } from '../../../data/data';

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

const joint360PartInfos = [
    {
        model: {
            id: 'mr-joint360-base-mount-r',
            rotations: [
                [90, 0, -45]
            ]
        }
    },
    {
        model: {
            id: 'mr-joint360-base-mount-s',
            rotations: [
                [-90, 0, 90]
            ]
        }
    },
    {
        model: {
            id: 'mr-joint360-base-v2',
            positions: [
                [0, -23, 23],
                [0, -23, -23],
                [-23, 23, 0],
                [23, 23, 0]
            ],
            rotations: [
                [45, 0, 0],
                [135, 0, 0],
                [90, -135, 90],
                [90, 135, 90],
            ],
        },
        count: 4
    },
    {
        model: {
            id: 'mr-joint360-mount-28byj48',
            rotations: [
                [-90, 0, 90]
            ]
        }
    },
    {
        model: {
            id: 'mr-joint360-ring-v2',
            rotations: [
                [-90, 0, 90]
            ]
        }
    },
    {
        model: {
            id: 'mr-joint360-shell-v2',
            rotations: [
                [-90, 0, 0],
                [-90, 180, 90]
            ],
        },
        count: 2,
        // opacity: 0.3
    },
];

function Joint360Model({ version }: { version: number }) {
    const groupRef = useRef<Group<Object3DEventMap>>(null);
    const partModels = joint360PartInfos.map((part) => {
        const partModel = parts.find(p => p.id === part.model.id)?.versions?.at(0);
        if (!partModel) return null;
        return useLoader(ThreeMFLoader, partModel.url);
    });
    const scale = 1;
    useEffect(() => {
        if (!groupRef.current ||
            !partModels.every((partModel) => partModel)) {
            return;
        }
        groupRef.current.clear();
        for (let i = 0; i < joint360PartInfos.length; i++) {
            const part = joint360PartInfos[i];
            const partModel = partModels[i];
            if (!partModel) continue;
            const box = new Box3().setFromObject(partModel);
            const center = new Vector3();
            box.getCenter(center);
            partModel.position.sub(center);
            for (let j = 0; j < (part?.count ?? 1); j++) {
                const partModelClone = partModel.clone();
                partModelClone.scale.set(scale, scale, scale);
                partModelClone.rotation.set(
                    (part?.model.rotations?.at(j)?.at(0) ?? 0) * (Math.PI / 180),
                    (part?.model.rotations?.at(j)?.at(1) ?? 0) * (Math.PI / 180),
                    (part?.model.rotations?.at(j)?.at(2) ?? 0) * (Math.PI / 180)
                );
                partModelClone.position.set(
                    (part?.model.positions?.at(j)?.at(0) ?? 0) * scale,
                    (part?.model.positions?.at(j)?.at(1) ?? 0) * scale,
                    (part?.model.positions?.at(j)?.at(2) ?? 0) * scale
                );
                // if (part?.opacity) {
                //     partModelClone.traverse((child) => {
                //         if (child.isMesh) {
                //             child.material.opacity = part.opacity;
                //             child.material.transparent = true;
                //         }
                //     });
                // }
                groupRef.current.add(partModelClone);
            }
        }
    }, [groupRef, ...partModels, joint360PartInfos]);
    return (
        <Center top>
            <group ref={groupRef} position={[0, 1, 0]} scale={0.03} />
        </Center>
    )
}

export function Joint360Preview({ version }: { version: number }) {
    return (
        <group position={[0, -1, 0]}>
            <Suspense fallback={null}>
                <Joint360Model version={version} />
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
