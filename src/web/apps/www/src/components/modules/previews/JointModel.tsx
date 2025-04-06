'use client';

import { useLoader } from '@react-three/fiber'
import { ThreeMFLoader } from 'three/examples/jsm/loaders/3MFLoader.js';
import { Suspense, useEffect, useRef } from "react";
import { Center, ContactShadows } from '@react-three/drei'
import { Box3, Group, Mesh, Object3DEventMap, Vector3 } from 'three';
import { parts } from '../../../data/data';

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
        if (!partModel || !partModel.modelUrl) return null;
        return useLoader(ThreeMFLoader, partModel.modelUrl);
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
                // Loop through all children of the partModelClone and set castShadow and receiveShadow to true
                partModelClone.traverse((child) => {
                    if (child.type === 'Mesh') {
                        const meshChild = child as Mesh;
                        meshChild.geometry.computeVertexNormals();
                        meshChild.castShadow = true;
                        meshChild.receiveShadow = true;
                    }
                });
                partModelClone.castShadow = true;
                partModelClone.receiveShadow = true;

                // Center
                const box = new Box3().setFromObject(partModel);
                const center = new Vector3();
                box.getCenter(center);
                partModel.position.sub(center);

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
            <ContactShadows resolution={512} position={[0, -0.1, 0]} opacity={0.2} blur={5} scale={10} />
        </group>
    );
}
