'use client';

import { Canvas } from "@react-three/fiber";
import { Grid, OrbitControls } from '@react-three/drei';
import { PropsWithChildren, Suspense } from "react";

export function ModulePreviewScene({ children }: PropsWithChildren) {
    return (
        <>
            <Canvas camera={{ position: [0, 2, 4.5], fov: 40 }} shadows>
                <ambientLight intensity={0.7} />
                <directionalLight color="white" position={[1, 1, 1]} intensity={4} />
                <Suspense fallback={null}>
                    <Grid
                        position={[0, -1.01, 0]}
                        args={[10, 10]}
                        infiniteGrid
                        cellSize={0.4}
                        sectionSize={2}
                        cellThickness={0.5}
                        fadeDistance={10}
                        sectionColor="#777" />
                    {children}
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
