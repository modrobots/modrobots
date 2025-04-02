'use client';

import { Center, ContactShadows } from "@react-three/drei";
import { ModulePreviewScene } from "../../ModulePreviewScene";
import { Suspense, useEffect, useRef } from "react";
import { Box3, Group, Object3DEventMap, Vector3 } from "three";
import { useLoader } from '@react-three/fiber'
import { ThreeMFLoader } from 'three/examples/jsm/loaders/3MFLoader.js';

function PartModel({ modelUrl, modelRotation }: { modelUrl: string, modelRotation?: [number, number, number] }) {
    const groupRef = useRef<Group<Object3DEventMap>>(null);
    const modelGroup = useLoader(ThreeMFLoader, modelUrl);
    useEffect(() => {
        if (!groupRef.current || !modelGroup) return;
        groupRef.current.clear();
        modelGroup.rotation.set(
            (modelRotation?.at(0) ?? 0) * (Math.PI / 180),
            (modelRotation?.at(1) ?? 0) * (Math.PI / 180),
            (modelRotation?.at(2) ?? 0) * (Math.PI / 180)
        );
        const box = new Box3().setFromObject(modelGroup);
        const center = new Vector3();
        box.getCenter(center);
        modelGroup.position.sub(center);
        groupRef.current.add(modelGroup);
    }, [modelGroup, groupRef, modelRotation]);

    return (
        <Center top>
            <group ref={groupRef} position={[0, 1, 0]} scale={0.03} />
        </Center>
    );
}

export function PartPreview({ modelUrl, modelRotation }: { modelUrl: string, modelRotation?: [number, number, number] }) {
    return (
        <ModulePreviewScene>
            <group position={[0, -1, 0]}>
                <Suspense fallback={null}>
                    <PartModel modelUrl={modelUrl} modelRotation={modelRotation} />
                </Suspense>
                <ContactShadows resolution={512} position={[0, -0.1, 0]} opacity={0.5} blur={2} scale={10} />
            </group>
        </ModulePreviewScene>
    )
}