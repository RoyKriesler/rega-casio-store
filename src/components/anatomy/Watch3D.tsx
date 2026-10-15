"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, OrbitControls, RoundedBox } from "@react-three/drei";
import { useMemo, useRef } from "react";
import type { Group } from "three";

// A procedural 3D watch (integrated-bracelet style) with brushed steel, a dial in the given
// colour and hands at the visitor's time. Drag to rotate; it turns slowly on its own.
function Watch({ dial = "#1f3a68" }: { dial?: string }) {
  const hour = useRef<Group>(null);
  const minute = useRef<Group>(null);
  const second = useRef<Group>(null);

  useFrame(() => {
    const d = new Date();
    const s = d.getSeconds() + d.getMilliseconds() / 1000;
    const m = d.getMinutes() + s / 60;
    const h = (d.getHours() % 12) + m / 60;
    if (second.current) second.current.rotation.z = -(s / 60) * Math.PI * 2;
    if (minute.current) minute.current.rotation.z = -(m / 60) * Math.PI * 2;
    if (hour.current) hour.current.rotation.z = -(h / 12) * Math.PI * 2;
  });

  const steel = { color: "#d7d9db", metalness: 1, roughness: 0.28 } as const;
  const polished = { color: "#eceef0", metalness: 1, roughness: 0.08 } as const;
  const indices = useMemo(() => Array.from({ length: 12 }, (_, i) => i), []);
  const links = useMemo(() => Array.from({ length: 6 }, (_, i) => i), []);

  return (
    <group rotation={[-0.15, 0, 0]}>
      {/* case */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.08, 1.12, 0.34, 96]} />
        <meshStandardMaterial {...steel} />
      </mesh>
      {/* bezel */}
      <mesh position={[0, 0, 0.18]}>
        <torusGeometry args={[0.98, 0.07, 32, 128]} />
        <meshStandardMaterial {...polished} />
      </mesh>
      {/* dial */}
      <mesh position={[0, 0, 0.175]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.92, 0.92, 0.02, 96]} />
        <meshStandardMaterial color={dial} metalness={0.45} roughness={0.35} />
      </mesh>
      {/* indices */}
      {indices.map((i) => {
        const a = (i / 12) * Math.PI * 2;
        const big = i % 3 === 0;
        return (
          <mesh key={i} position={[Math.sin(a) * 0.76, Math.cos(a) * 0.76, 0.2]} rotation={[0, 0, -a]}>
            <boxGeometry args={[big ? 0.06 : 0.04, big ? 0.2 : 0.14, 0.03]} />
            <meshStandardMaterial {...polished} />
          </mesh>
        );
      })}
      {/* hands */}
      <group ref={hour} position={[0, 0, 0.23]}>
        <mesh position={[0, 0.24, 0]}>
          <boxGeometry args={[0.07, 0.5, 0.02]} />
          <meshStandardMaterial {...polished} />
        </mesh>
      </group>
      <group ref={minute} position={[0, 0, 0.25]}>
        <mesh position={[0, 0.34, 0]}>
          <boxGeometry args={[0.05, 0.72, 0.02]} />
          <meshStandardMaterial {...polished} />
        </mesh>
      </group>
      <group ref={second} position={[0, 0, 0.27]}>
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[0.015, 0.84, 0.01]} />
          <meshStandardMaterial color="#c8102e" metalness={0.2} roughness={0.4} />
        </mesh>
      </group>
      <mesh position={[0, 0, 0.28]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.03, 24]} />
        <meshStandardMaterial {...polished} />
      </mesh>
      {/* crystal */}
      <mesh position={[0, 0, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.93, 0.93, 0.02, 96]} />
        <meshPhysicalMaterial transmission={1} roughness={0} thickness={0.2} ior={1.7} transparent opacity={0.25} />
      </mesh>
      {/* crown */}
      <mesh position={[1.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.1, 0.1, 0.16, 32]} />
        <meshStandardMaterial {...steel} />
      </mesh>
      {/* integrated bracelet */}
      {[1, -1].map((side) => (
        <group key={side}>
          <RoundedBox args={[1.25, 0.32, 0.28]} radius={0.06} position={[0, side * 1.12, -0.02]}>
            <meshStandardMaterial {...steel} />
          </RoundedBox>
          {links.map((i) => (
            <group key={i} position={[0, side * (1.42 + i * 0.3), -0.04]}>
              <RoundedBox args={[0.42, 0.28, 0.22]} radius={0.04}>
                <meshStandardMaterial {...polished} />
              </RoundedBox>
              <RoundedBox args={[0.36, 0.28, 0.2]} radius={0.04} position={[0.4, 0, 0]}>
                <meshStandardMaterial {...steel} />
              </RoundedBox>
              <RoundedBox args={[0.36, 0.28, 0.2]} radius={0.04} position={[-0.4, 0, 0]}>
                <meshStandardMaterial {...steel} />
              </RoundedBox>
            </group>
          ))}
        </group>
      ))}
    </group>
  );
}

export default function Watch3D({ dial, className = "h-[460px]" }: { dial?: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#f4f1ea] to-[#e3ded3] ${className}`}>
      <Canvas camera={{ position: [0, 0, 7], fov: 32 }} dpr={[1, 2]}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 4, 5]} intensity={1.2} />
        <Environment resolution={256}>
          <Lightformer intensity={2.5} position={[0, 3, 4]} scale={[8, 1.5, 1]} />
          <Lightformer intensity={1.5} position={[-4, 0, 2]} scale={[1.5, 6, 1]} />
          <Lightformer intensity={1.5} position={[4, -1, 2]} scale={[1.5, 6, 1]} />
          <Lightformer intensity={0.6} position={[0, -3, -2]} scale={[8, 2, 1]} />
        </Environment>
        <Watch dial={dial} />
        <ContactShadows position={[0, -2.6, 0]} opacity={0.35} scale={8} blur={2.6} far={4} />
        <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.8} minPolarAngle={Math.PI / 3} maxPolarAngle={(2 * Math.PI) / 3} />
      </Canvas>
      <p className="pointer-events-none absolute inset-x-0 bottom-4 text-center text-[13px] text-[#6e675d]">גררו כדי לסובב</p>
    </div>
  );
}
