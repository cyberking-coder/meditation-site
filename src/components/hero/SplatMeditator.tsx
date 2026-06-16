"use client";

import { Splat } from "@react-three/drei";
import { asset } from "@/lib/asset";

/**
 * The meditator figure rendered from a 3D Gaussian Splat (converted from the
 * source .ply to drei's compact .splat format — see scripts/ply-to-splat.mjs).
 *
 * The splat is pre-centered and normalised to ~3.6 units, so it drops in at the
 * origin. `position`/`rotation` here are the only dials if it needs nudging or
 * flipping to face the camera.
 */
export default function SplatMeditator() {
  return (
    <Splat
      src={asset("/models/meditator.splat")}
      position={[0, 0.2, 0]}
      // Source splat faces sideways; yaw 90° so it faces the camera.
      rotation={[0, Math.PI / 2, 0]}
      toneMapped={false}
    />
  );
}
