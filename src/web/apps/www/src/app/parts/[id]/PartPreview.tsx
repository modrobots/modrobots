'use client';

import { Center, ContactShadows } from "@react-three/drei";
import { ModulePreviewScene } from "../../ModulePreviewScene";
import { Suspense, useEffect, useRef } from "react";
import { Box3, Group, Mesh, Object3DEventMap, Vector3 } from "three";
import { useLoader } from '@react-three/fiber'
import { ThreeMFLoader } from 'three/examples/jsm/loaders/3MFLoader.js';

function PartModel({ modelUrl, modelScale, modelRotation }: { modelUrl: string, modelScale?: number, modelRotation?: [number, number, number] }) {
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
        modelGroup.traverse((child) => {
            if (child.type === "Mesh") {
                const mesh = child as Mesh;
                mesh.geometry.computeVertexNormals();
                mesh.castShadow = true;
                mesh.receiveShadow = true;
            }
        });
        groupRef.current.add(modelGroup);
    }, [modelGroup, groupRef, modelRotation]);

    return (
        <Center top>
            <group ref={groupRef} position={[0, 1, 0]} scale={modelScale ?? 0.03} />
        </Center>
    );
}

export function PartPreview({ modelUrl, modelScale, modelTranslate, modelRotation }: { modelUrl: string, modelScale?: number, modelTranslate?: [number, number, number], modelRotation?: [number, number, number] }) {
    return (
        <ModulePreviewScene>
            <group position={[modelTranslate?.at(0) ?? 0, -1 + (modelTranslate?.at(1) ?? 0), modelTranslate?.at(2) ?? 0]}>
                <Suspense fallback={null}>
                    <PartModel modelUrl={modelUrl} modelScale={modelScale} modelRotation={modelRotation} />
                </Suspense>
                <ContactShadows resolution={512} position={[0, -0.1, 0]} opacity={0.2} blur={5} scale={10} />
            </group>
        </ModulePreviewScene>
    )
}