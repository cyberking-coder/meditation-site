"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/* ------------------------------------------------------------------ *
 * Tweakable constants — all in CSS pixels / 0..1 amounts.
 * ------------------------------------------------------------------ */
const RADIUS = 150; // distortion radius around the cursor (px)
const INTENSITY = 1.0; // max glitch strength (0..1)
const CHROMATIC_ABERRATION = 1.0; // RGB channel-split amount
const DISPLACEMENT = 0.05; // horizontal warp / pixel-shift amount
const NOISE = 0.35; // static / grain amount
const SCANLINE = 3.0; // scanline band thickness (px)
const DECAY = 0.9; // glitch fade per frame when the cursor is still (0..1)
const GAIN = 0.14; // how fast movement charges the glitch
const TRAIL = 0.35; // cursor follow smoothing (1 = instant)
const BLEND_MODE = "exclusion"; // CSS mix-blend-mode used to distort the page
/* ------------------------------------------------------------------ */

const vertexShader = /* glsl */ `
  void main() {
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform vec2  uResolution;
  uniform vec2  uMouse;
  uniform float uTime;
  uniform float uIntensity;
  uniform float uRadius;
  uniform float uChromatic;
  uniform float uDisplace;
  uniform float uNoise;
  uniform float uScanline;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float vnoise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    float a = hash(i), b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0)), d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  void main() {
    vec2 frag = gl_FragCoord.xy;
    float dist = distance(frag, uMouse);

    // Radial falloff, scaled by the (decaying) glitch intensity.
    float fall = smoothstep(uRadius, 0.0, dist) * uIntensity;
    if (fall <= 0.001) discard;

    vec2 dir = (frag - uMouse) / max(uRadius, 1.0); // -1..1 within radius

    // Per-scanline horizontal jitter -> pixel-shift / sorting feel.
    float band = floor(frag.y / max(uScanline, 1.0));
    float jitter = (hash(vec2(band, floor(uTime * 18.0))) - 0.5) * 2.0;
    float warp = jitter * uDisplace * fall;

    float sx = frag.x / uResolution.x + warp;
    float seed = band + floor(uTime * 12.0) * 0.137;

    // Chromatic aberration: split the sampled streaks per channel.
    float ca = uChromatic * fall * (0.3 + length(dir));
    float r = vnoise(vec2((sx + ca * 0.012) * 80.0, seed));
    float g = vnoise(vec2( sx               * 80.0, seed));
    float b = vnoise(vec2((sx - ca * 0.012) * 80.0, seed));

    vec3 col = smoothstep(0.35, 0.95, vec3(r, g, b));

    // Noise / static.
    col += hash(frag * 0.5 + uTime * 80.0) * uNoise;

    col *= fall;
    gl_FragColor = vec4(col, fall);
  }
`;

export default function GlitchCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Skip on touch / no-hover devices and when reduced motion is requested.
    const noHover = window.matchMedia("(hover: none)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (noHover || reduced) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      premultipliedAlpha: false,
    });
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.Camera();

    const uniforms = {
      uResolution: { value: new THREE.Vector2() },
      uMouse: { value: new THREE.Vector2(-9999, -9999) },
      uTime: { value: 0 },
      uIntensity: { value: 0 },
      uRadius: { value: RADIUS },
      uChromatic: { value: CHROMATIC_ABERRATION },
      uDisplace: { value: DISPLACEMENT },
      uNoise: { value: NOISE },
      uScanline: { value: SCANLINE },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(quad);

    let pr = 1;
    const resize = () => {
      pr = Math.min(window.devicePixelRatio || 1, 2);
      renderer.setPixelRatio(pr);
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      uniforms.uResolution.value.set(
        window.innerWidth * pr,
        window.innerHeight * pr
      );
      uniforms.uRadius.value = RADIUS * pr;
    };
    resize();
    window.addEventListener("resize", resize);

    // Target (raw) and smoothed cursor position, in CSS pixels.
    const target = new THREE.Vector2(-9999, -9999);
    const smooth = new THREE.Vector2(-9999, -9999);
    let intensity = 0;
    let primed = false;

    const onMove = (e: PointerEvent) => {
      target.set(e.clientX, e.clientY);
      if (!primed) {
        smooth.copy(target);
        primed = true;
      }
      intensity = Math.min(INTENSITY, intensity + GAIN);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const clock = new THREE.Clock();
    let raf = 0;
    let cleared = false;

    const loop = () => {
      raf = requestAnimationFrame(loop);
      uniforms.uTime.value = clock.getElapsedTime();

      // Charge on movement, fade & recover smoothly when idle.
      intensity *= DECAY;
      smooth.lerp(target, TRAIL);

      if (intensity < 0.002 || !primed) {
        if (!cleared) {
          renderer.clear();
          cleared = true;
        }
        return;
      }
      cleared = false;

      uniforms.uIntensity.value = intensity;
      // Flip Y for gl_FragCoord (origin bottom-left) and convert to device px.
      uniforms.uMouse.value.set(
        smooth.x * pr,
        (window.innerHeight - smooth.y) * pr
      );
      renderer.render(scene, camera);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      material.dispose();
      quad.geometry.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 9999,
        pointerEvents: "none",
        mixBlendMode: BLEND_MODE as React.CSSProperties["mixBlendMode"],
      }}
    />
  );
}
