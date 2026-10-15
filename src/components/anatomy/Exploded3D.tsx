"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import * as THREE from "three";

export type Part = { label: string; detail: string };

// ---------- procedural textures (no files) ----------

// Radial "sunburst" brushing for dials: fine lines from the centre outwards.
function sunburstTexture(size = 1024) {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d")!;
  g.fillStyle = "#808080";
  g.fillRect(0, 0, size, size);
  const cx = size / 2;
  for (let i = 0; i < 5200; i++) {
    const a = Math.random() * Math.PI * 2;
    const v = 100 + Math.random() * 60;
    g.strokeStyle = `rgba(${v},${v},${v},0.35)`;
    g.lineWidth = 0.6 + Math.random() * 0.8;
    g.beginPath();
    g.moveTo(cx, cx);
    g.lineTo(cx + Math.cos(a) * cx, cx + Math.sin(a) * cx);
    g.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.anisotropy = 8;
  return t;
}

// Radial anisotropy direction map (R,G = tangent direction, B = strength) so highlights sweep
// around the dial like a real sunburst finish.
function radialAnisotropyTexture(size = 512) {
  const data = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const t = Math.atan2(y / size - 0.5, x / size - 0.5);
      const i = (y * size + x) * 4;
      data[i] = Math.round((0.5 + 0.5 * -Math.sin(t)) * 255);
      data[i + 1] = Math.round((0.5 + 0.5 * Math.cos(t)) * 255);
      data[i + 2] = 255;
      data[i + 3] = 255;
    }
  }
  const tex = new THREE.DataTexture(data, size, size);
  tex.needsUpdate = true;
  return tex;
}

// Linear brushing for steel: long horizontal streaks of varying brightness.
function brushedTexture(size = 512) {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d")!;
  g.fillStyle = "#6a6a6a";
  g.fillRect(0, 0, size, size);
  for (let i = 0; i < 2400; i++) {
    const y = Math.random() * size;
    const v = 70 + Math.random() * 90;
    g.strokeStyle = `rgba(${v},${v},${v},0.25)`;
    g.lineWidth = Math.random() * 1.2;
    g.beginPath();
    const x = Math.random() * size;
    g.moveTo(x - size * 0.6, y);
    g.lineTo(x + size * 0.6, y);
    g.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = 8;
  return t;
}

// Côtes de Genève stripes with a hint of perlage for the movement bridges.
function genevaTexture(size = 1024) {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d")!;
  const stripe = size / 9;
  for (let x = -stripe; x < size + stripe; x += stripe) {
    const grd = g.createLinearGradient(x, 0, x + stripe, 0);
    grd.addColorStop(0, "#9a9a9a");
    grd.addColorStop(0.5, "#e6e6e6");
    grd.addColorStop(1, "#9a9a9a");
    g.fillStyle = grd;
    g.save();
    g.translate(size / 2, size / 2);
    g.rotate(-0.5);
    g.fillRect(x - size, -size, stripe, size * 2);
    g.restore();
  }
  const t = new THREE.CanvasTexture(c);
  t.anisotropy = 8;
  return t;
}

function perlageTexture(size = 512) {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d")!;
  g.fillStyle = "#8a8a8a";
  g.fillRect(0, 0, size, size);
  const r = size / 22;
  for (let y = 0; y < size + r; y += r * 1.1) {
    for (let x = (Math.round(y / r) % 2) * r * 0.55; x < size + r; x += r * 1.1) {
      const grd = g.createRadialGradient(x, y, 0, x, y, r);
      grd.addColorStop(0, "#d8d8d8");
      grd.addColorStop(0.7, "#9a9a9a");
      grd.addColorStop(1, "#7a7a7a");
      g.fillStyle = grd;
      g.beginPath();
      g.arc(x, y, r, 0, Math.PI * 2);
      g.fill();
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(2, 2);
  return t;
}

// ---------- geometry helpers ----------

function gearShape(teeth: number, rOuter: number, rRoot: number, rHole: number, spokes = 0) {
  const s = new THREE.Shape();
  const step = (Math.PI * 2) / teeth;
  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    const pts: [number, number][] = [
      [rRoot, a],
      [rOuter, a + step * 0.18],
      [rOuter, a + step * 0.45],
      [rRoot, a + step * 0.63],
    ];
    pts.forEach(([r, t], k) => {
      const x = Math.cos(t) * r,
        y = Math.sin(t) * r;
      if (i === 0 && k === 0) s.moveTo(x, y);
      else s.lineTo(x, y);
    });
  }
  s.closePath();
  const hole = new THREE.Path();
  hole.absarc(0, 0, rHole, 0, Math.PI * 2, true);
  s.holes.push(hole);
  if (spokes) {
    const rin = rHole * 1.8,
      rout = rRoot * 0.78;
    for (let i = 0; i < spokes; i++) {
      const a0 = (i / spokes) * Math.PI * 2 + 0.25,
        a1 = ((i + 1) / spokes) * Math.PI * 2 - 0.25;
      const w = new THREE.Path();
      w.absarc(0, 0, rout, a0, a1, false);
      w.absarc(0, 0, rin, a1, a0, true);
      w.closePath();
      s.holes.push(w);
    }
  }
  return s;
}

// Case middle as a lathe: slightly tapered flank with a bevelled top edge.
function caseProfile() {
  const pts = [
    [0.98, -0.16],
    [1.1, -0.15],
    [1.16, -0.08],
    [1.17, 0.06],
    [1.13, 0.14],
    [1.04, 0.17],
    [0.98, 0.17],
  ].map(([x, y]) => new THREE.Vector2(x, y));
  return new THREE.LatheGeometry(pts, 128);
}

function bezelProfile() {
  const pts = [
    [0.9, 0],
    [1.08, 0],
    [1.1, 0.03],
    [1.06, 0.08],
    [0.96, 0.1],
    [0.9, 0.08],
  ].map(([x, y]) => new THREE.Vector2(x, y));
  return new THREE.LatheGeometry(pts, 128);
}

// ---------- the watch ----------

function Watch({ progress, dial }: { progress: MutableRefObject<number>; dial: string }) {
  const root = useRef<THREE.Group>(null);
  const layers = useRef<(THREE.Group | null)[]>([]);
  const hands = useRef<{ h: THREE.Group | null; m: THREE.Group | null; s: THREE.Group | null }>({ h: null, m: null, s: null });
  const gears = useRef<(THREE.Mesh | null)[]>([]);
  const balance = useRef<THREE.Group>(null);
  const rotor = useRef<THREE.Group>(null);

  const tex = useMemo(() => ({ aniso: radialAnisotropyTexture(), sun: sunburstTexture(), brushed: brushedTexture(), geneva: genevaTexture(), perlage: perlageTexture() }), []);
  const mat = useMemo(() => {
    const steel = new THREE.MeshPhysicalMaterial({ color: "#d4d6d9", metalness: 1, roughness: 0.35, roughnessMap: tex.brushed, anisotropy: 0.6, anisotropyRotation: Math.PI / 2 });
    const polished = new THREE.MeshPhysicalMaterial({ color: "#eef0f2", metalness: 1, roughness: 0.06 });
    const dialMat = new THREE.MeshPhysicalMaterial({ color: dial, metalness: 0.85, roughness: 0.3, roughnessMap: tex.sun, anisotropy: 0.9, anisotropyMap: tex.aniso, clearcoat: 1, clearcoatRoughness: 0.05 });
    const lume = new THREE.MeshStandardMaterial({ color: "#f3f1e6", roughness: 0.6 });
    const brass = new THREE.MeshPhysicalMaterial({ color: "#d9b26a", metalness: 1, roughness: 0.28 });
    const bridge = new THREE.MeshPhysicalMaterial({ color: "#d8dadc", metalness: 1, roughness: 0.22, roughnessMap: tex.geneva });
    const plate = new THREE.MeshPhysicalMaterial({ color: "#e4e5e7", metalness: 0.9, roughness: 0.42, roughnessMap: tex.perlage });
    const ruby = new THREE.MeshPhysicalMaterial({ color: "#9b0f2a", roughness: 0.05, transmission: 0.4, thickness: 0.05, ior: 1.76 });
    // Cheap glass: a faint tint with strong reflections reads better than transmission on a light page.
    const sapphire = new THREE.MeshPhysicalMaterial({ color: "#dfe9f5", metalness: 0, roughness: 0, transparent: true, opacity: 0.18, depthWrite: false, envMapIntensity: 2.5, clearcoat: 1, clearcoatRoughness: 0, ior: 1.77 });
    const glassEdge = new THREE.MeshPhysicalMaterial({ color: "#dfe8f2", roughness: 0.05, transmission: 0.6, thickness: 0.02, ior: 1.77 });
    const handMat = new THREE.MeshPhysicalMaterial({ color: "#f2f3f5", metalness: 1, roughness: 0.18 });
    const red = new THREE.MeshStandardMaterial({ color: "#c8102e", roughness: 0.4 });
    return { handMat, steel, polished, dialMat, lume, brass, bridge, plate, ruby, sapphire, glassEdge, red };
  }, [tex, dial]);

  const geo = useMemo(() => {
    const ext = (s: THREE.Shape, depth: number) => new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: true, bevelThickness: 0.004, bevelSize: 0.004, bevelSegments: 2, curveSegments: 24 });
    const gearDefs = [
      { t: 60, ro: 0.36, rr: 0.335, h: 0.02, sp: 4, x: 0, z: 0, y: 0.03, speed: 0.08 },
      { t: 48, ro: 0.27, rr: 0.25, h: 0.02, sp: 4, x: 0.44, z: 0.2, y: 0.035, speed: -0.11 },
      { t: 40, ro: 0.2, rr: 0.18, h: 0.02, sp: 3, x: -0.3, z: 0.42, y: 0.035, speed: 0.15 },
      { t: 30, ro: 0.15, rr: 0.135, h: 0.02, sp: 0, x: 0.12, z: -0.5, y: 0.035, speed: -0.3 },
      { t: 15, ro: 0.1, rr: 0.085, h: 0.024, sp: 0, x: -0.5, z: -0.2, y: 0.035, speed: 0.9 }, // escape wheel
    ];
    return {
      case: caseProfile(),
      bezel: bezelProfile(),
      gears: gearDefs.map((d) => ({ ...d, geo: ext(gearShape(d.t, d.ro, d.rr, 0.02, d.sp), d.h) })),
      index: new THREE.BoxGeometry(0.035, 0.022, 0.15),
      indexBig: new THREE.BoxGeometry(0.06, 0.026, 0.19),
      lugA: lugGeo(1),
      lugB: lugGeo(-1),
      hourHand: handGeo(0.48, 0.055),
      minHand: handGeo(0.74, 0.04),
    };
  }, []);

  useFrame((state, dt) => {
    const p = progress.current;
    const ease = 1 - Math.pow(1 - Math.min(1, p * 1.25), 3);
    const n = layers.current.length;
    // Stack: index 0 is the top layer (crystal). Spread along Y with scroll.
    layers.current.forEach((g, i) => {
      if (!g) return;
      const base = (g.userData.base as number) ?? 0;
      // Extra room under the movement so the case does not swallow it.
      const target = base + ((n - 1) / 2 - i) * 0.56 * ease - (i >= 5 ? 0.3 * ease : 0) + 0.15 * ease;
      g.position.y = THREE.MathUtils.lerp(g.position.y, target, 1 - Math.pow(0.0005, dt));
    });
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 6.2 + ease * 3.4, 1 - Math.pow(0.001, dt));
    state.camera.lookAt(0, 0, 0);
    if (root.current) {
      const t = state.clock.elapsedTime;
      root.current.rotation.y = -0.5 + Math.sin(t * 0.18) * 0.35 + p * 0.6;
      root.current.rotation.x = 0.55 - ease * 0.25;
    }
    const d = new Date();
    const s = d.getSeconds() + d.getMilliseconds() / 1000;
    const m = d.getMinutes() + s / 60;
    const h = (d.getHours() % 12) + m / 60;
    if (hands.current.s) hands.current.s.rotation.y = -(s / 60) * Math.PI * 2;
    if (hands.current.m) hands.current.m.rotation.y = -(m / 60) * Math.PI * 2;
    if (hands.current.h) hands.current.h.rotation.y = -(h / 12) * Math.PI * 2;
    gears.current.forEach((g, i) => g && (g.rotation.z += geo.gears[i].speed * dt));
    if (balance.current) balance.current.rotation.y = Math.sin(state.clock.elapsedTime * Math.PI * 8) * 1.6;
    if (rotor.current) rotor.current.rotation.y += dt * 0.15;
  });

  const L = (i: number, base = 0) => (el: THREE.Group | null) => {
    layers.current[i] = el;
    if (el) el.userData.base = base;
  };

  return (
    <group ref={root}>
      {/* 0 crystal */}
      <group ref={L(0, 0.26)}>
        <mesh material={mat.sapphire}>
          <cylinderGeometry args={[0.94, 0.94, 0.05, 128]} />
        </mesh>
        <mesh material={mat.glassEdge} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.94, 0.012, 12, 128]} />
        </mesh>
      </group>

      {/* 1 bezel */}
      <group ref={L(1, 0.18)}>
        <mesh geometry={geo.bezel} material={mat.polished} />
      </group>

      {/* 2 hands */}
      <group ref={L(2, 0.13)}>
        <group ref={(el) => void (hands.current.h = el)}>
          <mesh geometry={geo.hourHand} material={mat.handMat} />
        </group>
        <group ref={(el) => void (hands.current.m = el)} position={[0, 0.012, 0]}>
          <mesh geometry={geo.minHand} material={mat.handMat} />
        </group>
        <group ref={(el) => void (hands.current.s = el)} position={[0, 0.024, 0]}>
          <mesh material={mat.red} position={[0, 0, -0.3]}>
            <boxGeometry args={[0.012, 0.006, 0.9]} />
          </mesh>
        </group>
        <mesh material={mat.polished} position={[0, 0.03, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.02, 32]} />
        </mesh>
      </group>

      {/* 3 dial */}
      <group ref={L(3, 0.08)}>
        <mesh material={mat.dialMat} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.92, 128]} />
        </mesh>
        <mesh material={mat.dialMat} position={[0, -0.01, 0]}>
          <cylinderGeometry args={[0.92, 0.92, 0.02, 128, 1, true]} />
        </mesh>
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i / 12) * Math.PI * 2;
          const big = i % 3 === 0;
          if (i === 3) return null; // date window at 3
          return (
            <mesh key={i} geometry={big ? geo.indexBig : geo.index} material={mat.polished} position={[Math.sin(a) * 0.72, 0.013, -Math.cos(a) * 0.72]} rotation={[0, -a, 0]} />
          );
        })}
        <mesh material={mat.lume} position={[0.7, 0.003, 0]}>
          <boxGeometry args={[0.13, 0.004, 0.09]} />
        </mesh>
        {Array.from({ length: 60 }, (_, i) => {
          if (i % 5 === 0) return null;
          const a = (i / 60) * Math.PI * 2;
          return (
            <mesh key={`m${i}`} material={mat.lume} position={[Math.sin(a) * 0.86, 0.003, -Math.cos(a) * 0.86]} rotation={[0, -a, 0]}>
              <boxGeometry args={[0.008, 0.003, 0.04]} />
            </mesh>
          );
        })}
      </group>

      {/* 4 movement */}
      <group ref={L(4, -0.1)}>
        <mesh material={mat.plate}>
          <cylinderGeometry args={[0.86, 0.86, 0.06, 96]} />
        </mesh>
        {geo.gears.map((g, i) => (
          <mesh
            key={i}
            ref={(el) => void (gears.current[i] = el)}
            geometry={g.geo}
            material={mat.brass}
            position={[g.x, g.y, g.z]}
            rotation={[-Math.PI / 2, 0, 0]}
          />
        ))}
        {/* bridges with Geneva stripes */}
        <mesh material={mat.bridge} position={[0.15, 0.07, 0.1]} rotation={[0, 0.4, 0]}>
          <boxGeometry args={[1.1, 0.025, 0.26]} />
        </mesh>
        <mesh material={mat.bridge} position={[-0.2, 0.07, -0.32]} rotation={[0, -0.6, 0]}>
          <boxGeometry args={[0.8, 0.025, 0.2]} />
        </mesh>
        {/* jewels */}
        {[
          [0.15, 0.1],
          [0.6, 0.28],
          [-0.3, 0.1],
          [-0.15, -0.42],
          [-0.5, -0.2],
        ].map(([x, z], i) => (
          <mesh key={i} material={mat.ruby} position={[x, 0.087, z]}>
            <cylinderGeometry args={[0.028, 0.028, 0.012, 24]} />
          </mesh>
        ))}
        {/* balance wheel */}
        <group ref={balance} position={[0.5, 0.05, -0.42]}>
          <mesh material={mat.brass} rotation={[-Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.16, 0.012, 12, 64]} />
          </mesh>
          <mesh material={mat.brass}>
            <boxGeometry args={[0.32, 0.01, 0.018]} />
          </mesh>
        </group>
        {/* screws */}
        {[0, 1, 2, 3].map((i) => {
          const a = (i / 4) * Math.PI * 2 + 0.4;
          return (
            <mesh key={i} material={mat.polished} position={[Math.cos(a) * 0.74, 0.035, Math.sin(a) * 0.74]}>
              <cylinderGeometry args={[0.035, 0.035, 0.02, 24]} />
            </mesh>
          );
        })}
      </group>

      {/* 5 case middle with lugs and crown */}
      <group ref={L(5, 0)}>
        <mesh geometry={geo.case} material={mat.steel} />
        {[1, -1].map((side) =>
          [1, -1].map((lr) => (
            <mesh key={`${side}${lr}`} geometry={side === 1 ? geo.lugA : geo.lugB} material={mat.steel} position={[lr * 0.62 + (side === 1 ? 0.09 : -0.09), 0, 0]} />
          )),
        )}
        <group position={[1.24, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <mesh material={mat.steel}>
            <cylinderGeometry args={[0.09, 0.09, 0.14, 40]} />
          </mesh>
          <mesh material={mat.polished} position={[0, -0.09, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 0.06, 24]} />
          </mesh>
        </group>
      </group>

      {/* 6 caseback with sapphire window and rotor */}
      <group ref={L(6, -0.2)}>
        <mesh material={mat.steel}>
          <cylinderGeometry args={[1.0, 0.96, 0.06, 128]} />
        </mesh>
        <group ref={rotor} position={[0, -0.05, 0]}>
          <mesh material={mat.bridge} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.2, 0.7, 64, 1, 0, Math.PI]} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

// A curved lug horn: side profile drawn in (outward distance, height), extruded across X.
function lugGeo(side: 1 | -1) {
  const s = new THREE.Shape();
  s.moveTo(0.85, 0.16);
  s.bezierCurveTo(1.05, 0.16, 1.22, 0.1, 1.36, -0.02);
  s.lineTo(1.36, -0.1);
  s.bezierCurveTo(1.24, -0.08, 1.05, -0.13, 0.85, -0.15);
  s.closePath();
  const g = new THREE.ExtrudeGeometry(s, { depth: 0.2, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.025, bevelSegments: 4, curveSegments: 24 });
  g.rotateY(side === 1 ? -Math.PI / 2 : Math.PI / 2);
  return g;
}

// Flat dauphine-style hand lying in the XZ plane, pointing to -Z (12 o'clock).
function handGeo(len: number, w: number) {
  const s = new THREE.Shape();
  s.moveTo(0, -0.08);
  s.lineTo(w / 2, 0);
  s.lineTo(w * 0.18, len);
  s.lineTo(-w * 0.18, len);
  s.lineTo(-w / 2, 0);
  s.closePath();
  const g = new THREE.ExtrudeGeometry(s, { depth: 0.008, bevelEnabled: true, bevelThickness: 0.003, bevelSize: 0.003, bevelSegments: 2 });
  g.rotateX(Math.PI / 2);
  return g;
}

// Pinned section: as you scroll, a photoreal-ish 3D watch separates into its layers, each labelled.
export default function Exploded3D({ parts, dial = "#1f3a68" }: { parts: Part[]; dial?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const [p, setP] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "200px" });
    io.observe(el);
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const v = Math.min(1, Math.max(0, -r.top / (r.height - window.innerHeight)));
      progress.current = v;
      setP(Math.round(v * 40) / 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Captions advance linearly with scroll, one layer at a time.
  const lin = Math.min(1, p * 1.15);

  return (
    <section ref={ref} className="relative h-[260svh]">
      <div className="sticky top-[72px] grid h-[calc(100svh-72px)] items-center overflow-hidden">
        <div className="grid items-center gap-6 md:grid-cols-[1.3fr_1fr]">
          <div className="relative h-[58svh] w-full md:h-[min(78svh,700px)]">
            {visible && (
              <Canvas
                camera={{ position: [0, 1.2, 6.2], fov: 30 }}
                dpr={[1, 2]}
                gl={{ antialias: true, toneMapping: THREE.NeutralToneMapping, toneMappingExposure: 1 }}
              >
                <ambientLight intensity={0.25} />
                <directionalLight position={[3, 6, 4]} intensity={1.4} />
                <Environment resolution={512}>
                  <mesh scale={50}>
                    <sphereGeometry args={[1, 32, 16]} />
                    <meshBasicMaterial color="#4a4640" side={THREE.BackSide} />
                  </mesh>
                  <Lightformer form="rect" intensity={5} position={[0, 5, 2]} scale={[10, 2.5, 1]} rotation={[Math.PI / 2.4, 0, 0]} />
                  <Lightformer form="rect" intensity={4} position={[-5, 1, 1]} scale={[1.2, 8, 1]} rotation={[0, Math.PI / 2, 0]} />
                  <Lightformer form="rect" intensity={4} position={[5, 0, 1]} scale={[1.2, 8, 1]} rotation={[0, -Math.PI / 2, 0]} />
                  <Lightformer form="rect" intensity={3} position={[0, 1, -5]} scale={[8, 1, 1]} />
                  <Lightformer form="ring" intensity={1.5} position={[0, 2, 5]} scale={3} />
                  <Lightformer form="rect" intensity={0.5} position={[0, -4, 0]} scale={[10, 10, 1]} rotation={[-Math.PI / 2, 0, 0]} color="#f2e7d4" />
                </Environment>
                <Watch progress={progress} dial={dial} />
                <ContactShadows position={[0, -2.6, 0]} opacity={0.3} scale={9} blur={2.8} far={5} />
              </Canvas>
            )}
          </div>
          {/* phones: only the layer that just separated */}
          <div className="min-h-[96px] px-4 md:hidden" aria-live="polite">
            {(() => {
              const k = Math.max(0, Math.min(parts.length - 1, Math.floor(lin * parts.length - 0.3)));
              const part = parts[k];
              return (
                <div key={part.label} className="flex gap-4 border-t border-line pt-3">
                  <span className="font-mono text-xs text-gold">0{k + 1}</span>
                  <div>
                    <p className="font-semibold">{part.label}</p>
                    <p className="text-[15px] text-ink-soft">{part.detail}</p>
                  </div>
                </div>
              );
            })()}
          </div>
          <ol className="hidden space-y-5 md:block">
            {parts.map((part, i) => {
              const on = lin > (i + 0.3) / parts.length;
              return (
                <li key={part.label} className="flex gap-4 border-t border-line pt-3 transition-all duration-500" style={{ opacity: on ? 1 : 0.15, transform: `translateX(${on ? 0 : -12}px)` }}>
                  <span className="font-mono text-xs text-gold">0{i + 1}</span>
                  <div>
                    <p className="font-semibold">{part.label}</p>
                    <p className="text-[15px] text-ink-soft">{part.detail}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
