// One-off: convert an INRIA-format 3D Gaussian Splat .ply into the compact
// 32-byte-per-splat .splat format that @react-three/drei's <Splat> renders.
// Bakes centering + uniform scale into the output so it sits at the origin at a
// known on-screen height, matching where the old model lived.
import { readFileSync, writeFileSync } from "node:fs";

const SRC = "model-src/meditator.ply";
const OUT = "public/models/meditator.splat";
const TARGET_SIZE = 3.6; // largest extent in world units (old model height)
const SH_C0 = 0.28209479177387814;

const buf = readFileSync(SRC);

// --- parse ASCII header ---
const headerEnd = buf.indexOf("end_header\n") + "end_header\n".length;
const header = buf.toString("ascii", 0, headerEnd);
const lines = header.split("\n");

let count = 0;
const props = [];
for (const line of lines) {
  if (line.startsWith("element vertex")) count = parseInt(line.split(/\s+/)[2], 10);
  else if (line.startsWith("property float")) props.push(line.split(/\s+/)[2]);
}
const stride = props.length * 4; // all float32 here
const idx = (name) => props.indexOf(name);
const oX = idx("x"), oY = idx("y"), oZ = idx("z");
const oFdc = [idx("f_dc_0"), idx("f_dc_1"), idx("f_dc_2")];
const oOp = idx("opacity");
const oScale = [idx("scale_0"), idx("scale_1"), idx("scale_2")];
const oRot = [idx("rot_0"), idx("rot_1"), idx("rot_2"), idx("rot_3")];

console.log(`vertices=${count} stride=${stride}B props=[${props.join(",")}]`);

const readF = (i, o) => buf.readFloatLE(headerEnd + i * stride + o * 4);

// --- pass 1: bounding box ---
const min = [Infinity, Infinity, Infinity];
const max = [-Infinity, -Infinity, -Infinity];
for (let i = 0; i < count; i++) {
  const p = [readF(i, oX), readF(i, oY), readF(i, oZ)];
  for (let a = 0; a < 3; a++) {
    if (p[a] < min[a]) min[a] = p[a];
    if (p[a] > max[a]) max[a] = p[a];
  }
}
const center = min.map((m, a) => (m + max[a]) / 2);
const extent = max.map((m, a) => m - min[a]);
const f = TARGET_SIZE / Math.max(...extent);
console.log(`bbox extent=[${extent.map((e) => e.toFixed(2))}] center=[${center.map((c) => c.toFixed(2))}] scale=${f.toFixed(4)}`);

// --- pass 2: build splat rows (with importance for sorted progressive load) ---
const sigmoid = (x) => 1 / (1 + Math.exp(-x));
const order = new Array(count);
const importance = new Float32Array(count);
for (let i = 0; i < count; i++) {
  const sx = Math.exp(readF(i, oScale[0]));
  const sy = Math.exp(readF(i, oScale[1]));
  const sz = Math.exp(readF(i, oScale[2]));
  importance[i] = sigmoid(readF(i, oOp)) * sx * sy * sz;
  order[i] = i;
}
order.sort((a, b) => importance[b] - importance[a]);

const out = Buffer.alloc(count * 32);
for (let n = 0; n < count; n++) {
  const i = order[n];
  const base = n * 32;

  // position (centered + scaled)
  out.writeFloatLE((readF(i, oX) - center[0]) * f, base + 0);
  out.writeFloatLE((readF(i, oY) - center[1]) * f, base + 4);
  out.writeFloatLE((readF(i, oZ) - center[2]) * f, base + 8);

  // scale (exp, scaled to match)
  out.writeFloatLE(Math.exp(readF(i, oScale[0])) * f, base + 12);
  out.writeFloatLE(Math.exp(readF(i, oScale[1])) * f, base + 16);
  out.writeFloatLE(Math.exp(readF(i, oScale[2])) * f, base + 20);

  // color rgba (SH DC -> rgb, sigmoid opacity -> a)
  for (let c = 0; c < 3; c++) {
    const v = 0.5 + SH_C0 * readF(i, oFdc[c]);
    out.writeUInt8(Math.min(255, Math.max(0, Math.round(v * 255))), base + 24 + c);
  }
  out.writeUInt8(Math.min(255, Math.max(0, Math.round(sigmoid(readF(i, oOp)) * 255))), base + 27);

  // rotation quaternion (normalized) packed as q*128+128
  const q = oRot.map((o) => readF(i, o));
  const len = Math.hypot(q[0], q[1], q[2], q[3]) || 1;
  for (let r = 0; r < 4; r++) {
    out.writeUInt8(Math.min(255, Math.max(0, Math.round((q[r] / len) * 128 + 128))), base + 28 + r);
  }
}

writeFileSync(OUT, out);
console.log(`wrote ${OUT} (${(out.length / 1e6).toFixed(2)} MB, ${count} splats)`);
