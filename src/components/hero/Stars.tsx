"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const STAR_COUNT = 20000;

// Nebula palette to match the cosmic background: white, blue, cyan, magenta,
// purple-pink.
const PALETTE = [
  new THREE.Color("#ffffff"),
  new THREE.Color("#bcd4ff"),
  new THREE.Color("#7fe3ff"),
  new THREE.Color("#ff8ad8"),
  new THREE.Color("#c98bff"),
];

// Deterministic pseudo-random in [0,1) — pure (no Math.random), so it is safe to
// call during render and produces identical results on server and client.
function rand(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453123;
  return x - Math.floor(x);
}

function generateStars() {
  const positions = new Float32Array(STAR_COUNT * 3);
  const colors = new Float32Array(STAR_COUNT * 3);

  for (let i = 0; i < STAR_COUNT; i++) {
    // Distribute in a thick spherical shell around the camera.
    const radius = 12 + rand(i + 1) * 40;
    const theta = rand(i + 2) * Math.PI * 2;
    const phi = Math.acos(2 * rand(i + 3) - 1);

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);

    const c = PALETTE[Math.floor(rand(i + 4) * PALETTE.length)];
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }
  return { positions, colors };
}

export default function Stars() {
  const pointsRef = useRef<THREE.Points>(null);
  const { positions, colors } = useMemo(() => generateStars(), []);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    // Slow rotation + gentle drift.
    pointsRef.current.rotation.y += delta * 0.015;
    pointsRef.current.rotation.x += delta * 0.004;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
