'use client';

import { Canvas } from "@react-three/fiber";
import { Grid, OrbitControls } from '@react-three/drei';
import { PropsWithChildren } from "react";

export function ModulePreviewScene({ children }: PropsWithChildren) {
    return (
        <Canvas camera={{ position: [0, 2, 4.5], fov: 40, far: 1000 }} shadows linear frameloop="demand">
            <ambientLight intensity={2} />
            <directionalLight
                color="white"
                position={[1, 1, 1]}
                intensity={4}
                shadow-normalBias={0.1}
                shadow-mapSize={4 * 1024}
                castShadow />
            <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
                <planeGeometry args={[10, 10]} />
                <shadowMaterial opacity={0.5} />
            </mesh>
            <Grid
                position={[0, -1.01, 0]}
                args={[10, 10]}
                infiniteGrid
                cellSize={0.4}
                sectionSize={2}
                receiveShadow
                cellThickness={0.5}
                fadeDistance={10}
                sectionColor="#777" />
            {children}
            <OrbitControls
                autoRotate
                autoRotateSpeed={1}
                enablePan={false}
                enableZoom={false} target={[0, 0, 0]} />
        </Canvas>
    );
}
