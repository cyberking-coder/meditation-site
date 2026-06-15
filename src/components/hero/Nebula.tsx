"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CloudProps {
  position: [number, number, number];
  color: string;
  scale: number;
}

function Cloud({ position, color, scale }: CloudProps) {
  const ref = useRef<THREE.Mesh>(null);

  // Soft radial-gradient texture for a nebula puff.
  const texture = useMemo(() => {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const gradient = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2
    );
    gradient.addColorStop(0, "rgba(255,255,255,0.9)");
    gradient.addColorStop(0.4, "rgba(255,255,255,0.25)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z =
      Math.sin(state.clock.elapsedTime * 0.05 + position[0]) * 0.2;
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        map={texture}
        color={color}
        transparent
        opacity={0.35}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

export default function Nebula() {
  return (
    <group position={[0, 0, -18]}>
      <Cloud position={[-10, 6, 0]} color="#5b21b6" scale={20} />
      <Cloud position={[12, -4, -4]} color="#1e3a8a" scale={24} />
      <Cloud position={[2, 8, -8]} color="#7c3aed" scale={18} />
      <Cloud position={[-6, -8, -2]} color="#312e81" scale={22} />
    </group>
  );
}
