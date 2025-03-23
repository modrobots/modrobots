'use client';

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from '@react-three/drei';
import { PropsWithChildren, Suspense } from "react";

export function ModulePreviewScene({ children }: PropsWithChildren) {
    return (
        <>
            <Canvas camera={{ position: [0, 2, 4.5], fov: 40 }} shadows>
                <ambientLight intensity={0.5} />
                <directionalLight color="white" position={[1, 1, 1]} intensity={4} />
                <Suspense fallback={null}>
                    {children}
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
