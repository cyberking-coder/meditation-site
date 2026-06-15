"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { asset } from "@/lib/asset";

const MODEL_URL = asset("/models/mediator.gltf");

export default function Meditator({
  progressRef,
}: {
  progressRef: RefObject<number>;
}) {
  const { scene } = useGLTF(MODEL_URL);
  const groupRef = useRef<THREE.Group>(null);

  // Clone so repeated mounts / fast-refresh don't mutate the cached scene.
  const model = useMemo(() => scene.clone(true), [scene]);

  // Apply the ethereal standard material and normalise size/position.
  useEffect(() => {
    const ethereal = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#C8CDD8"),
      roughness: 0.3,
      metalness: 0.4,
      // Faint inner light so the bloom pass gives the figure a glowing aura.
      emissive: new THREE.Color("#7c5bd6"),
      emissiveIntensity: 0.35,
    });

    model.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = ethereal;
        mesh.castShadow = false;
        mesh.receiveShadow = false;
      }
    });

    // Center the model and scale it to a consistent on-screen height.
    const box = new THREE.Box3().setFromObject(model);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    const targetHeight = 3.6;
    const scale = size.y > 0 ? targetHeight / size.y : 1;
    model.scale.setScalar(scale);

    // Recompute center after scaling and recenter at origin.
    model.position.set(
      -center.x * scale,
      -center.y * scale,
      -center.z * scale
    );
  }, [model]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    // Gentle float: 0.2 units amplitude, ~3s loop.
    groupRef.current.position.y = Math.sin(t * ((Math.PI * 2) / 3)) * 0.2;
    // Barely-there sway, nudged by scroll progress.
    const p = progressRef.current ?? 0;
    groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.08 + p * 0.4;
  });

  return (
    <group ref={groupRef} position={[0, 0.2, 0]}>
      <primitive object={model} />
    </group>
  );
}

useGLTF.preload(MODEL_URL);
