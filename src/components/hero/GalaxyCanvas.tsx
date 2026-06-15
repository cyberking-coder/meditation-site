"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import Stars from "./Stars";
import Nebula from "./Nebula";
import Meditator from "./Meditator";

/** Eases the camera toward the pointer for a subtle parallax drift. */
function ParallaxRig() {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3(0, 0, 0));

  // useFrame is an imperative per-frame callback, not React render — mutating the
  // three.js camera here is the intended r3f idiom, so these render-purity rules
  // (which can't model three.js' mutable scene graph) don't apply.
  /* eslint-disable react-hooks/immutability */
  useFrame((state) => {
    const px = state.pointer.x * 0.6;
    const py = state.pointer.y * 0.4;
    camera.position.x += (px - camera.position.x) * 0.03;
    camera.position.y += (py + 0.2 - camera.position.y) * 0.03;
    camera.lookAt(target.current);
  });
  /* eslint-enable react-hooks/immutability */

  return null;
}

export default function GalaxyCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0.2, 6], fov: 55 }}
      dpr={[1, 2]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#030014"]} />
      <fog attach="fog" args={["#030014", 14, 50]} />
      <Suspense fallback={null}>
        <Stars />
        <Nebula />
        <Meditator />
      </Suspense>
      <ParallaxRig />

      {/* Bloom makes the figure's bright Fresnel outline radiate. */}
      <EffectComposer enableNormalPass={false}>
        <Bloom
          intensity={1.1}
          luminanceThreshold={0.22}
          luminanceSmoothing={0.9}
          radius={0.8}
          mipmapBlur
        />
      </EffectComposer>
    </Canvas>
  );
}
