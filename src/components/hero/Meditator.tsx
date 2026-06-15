"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { asset } from "@/lib/asset";

const MODEL_URL = asset("/models/mediator.gltf");

// Fresnel rim-glow: transparent + dark facing the camera (so the starfield shows
// through the body) and bright at the silhouette edges, which the bloom pass then
// makes radiate — a glowing outline of a meditating figure.
const vertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vViewDir = normalize(-mvPosition.xyz);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 glowColor;
  uniform float power;
  uniform float intensity;
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    float fresnel = pow(1.0 - abs(dot(normalize(vNormal), normalize(vViewDir))), power);
    vec3 color = glowColor * fresnel * intensity;
    float alpha = clamp(fresnel * 1.3, 0.0, 1.0);
    gl_FragColor = vec4(color, alpha);
  }
`;

export default function Meditator({
  progressRef,
}: {
  progressRef: RefObject<number>;
}) {
  const { scene } = useGLTF(MODEL_URL);
  const groupRef = useRef<THREE.Group>(null);

  // Clone so repeated mounts / fast-refresh don't mutate the cached scene.
  const model = useMemo(() => scene.clone(true), [scene]);

  const glowMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          glowColor: { value: new THREE.Color("#dff1ff") },
          power: { value: 3.0 },
          intensity: { value: 2.2 },
        },
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  // Apply the glow material and normalise size/position.
  useEffect(() => {
    model.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        // Fresnel needs vertex normals; compute them if the mesh lacks any.
        if (!mesh.geometry.getAttribute("normal")) {
          mesh.geometry.computeVertexNormals();
        }
        mesh.material = glowMaterial;
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
    model.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
  }, [model, glowMaterial]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    // Gentle float: 0.2 units amplitude, ~3s loop.
    groupRef.current.position.y = Math.sin(t * ((Math.PI * 2) / 3)) * 0.2;
    // Barely-there sway, nudged by scroll progress (kept small so the
    // silhouette stays front-facing).
    const p = progressRef.current ?? 0;
    groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.04 + p * 0.25;
  });

  return (
    <group ref={groupRef} position={[0, 0.2, 0]}>
      <primitive object={model} />
    </group>
  );
}

useGLTF.preload(MODEL_URL);
