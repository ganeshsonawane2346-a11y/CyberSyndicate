import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function GlowingNode({ position, size, color, pulseSpeed = 1 }: { position: [number, number, number]; size: number; color: string; pulseSpeed?: number }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (ref.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * pulseSpeed) * 0.1
      ref.current.scale.setScalar(scale)
    }
  })

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} transparent opacity={0.9} />
    </mesh>
  )
}

function ConnectionBeam({ start, end }: { start: THREE.Vector3; end: THREE.Vector3 }) {
  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([start, new THREE.Vector3(
      (start.x + end.x) / 2,
      Math.max(start.y, end.y) + 0.5,
      (start.z + end.z) / 2
    ), end])
    return new THREE.BufferGeometry().setFromPoints(curve.getPoints(20))
  }, [start, end])

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color="#06b6d4" transparent opacity={0.2} />
    </lineSegments>
  )
}

function CampusNetworkScene() {
  const departments = useMemo(() => {
    const positions: [number, number, number][] = []
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2
      positions.push([Math.cos(angle) * 4, 0.5, Math.sin(angle) * 4])
    }
    return positions
  }, [])

  const students = useMemo(() =>
    Array.from({ length: 40 }, () => {
      const dept = departments[Math.floor(Math.random() * 8)]
      return [
        dept[0] + (Math.random() - 0.5) * 1.5,
        0.1,
        dept[2] + (Math.random() - 0.5) * 1.5,
      ] as [number, number, number]
    }), [departments])

  const faculty = useMemo(() =>
    departments.map((d) => [d[0] * 0.6, 0.3, d[2] * 0.6] as [number, number, number]), [departments])

  const placements = useMemo(() =>
    Array.from({ length: 6 }, (_, i) => {
      const angle = (i / 6) * Math.PI * 2
      return [Math.cos(angle) * 6, 1, Math.sin(angle) * 6] as [number, number, number]
    }), [])

  const center: [number, number, number] = [0, 0.8, 0]

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 8, 0]} intensity={1.5} color="#06b6d4" />
      <pointLight position={[5, 3, 5]} intensity={0.8} color="#8b5cf6" />

      <GlowingNode position={center} size={0.6} color="#06b6d4" pulseSpeed={0.8} />

      {departments.map((pos, i) => (
        <GlowingNode key={`dept-${i}`} position={pos} size={0.4} color="#8b5cf6" pulseSpeed={1.2} />
      ))}

      {faculty.map((pos, i) => (
        <GlowingNode key={`fac-${i}`} position={pos} size={0.15} color="#f59e0b" pulseSpeed={1.5} />
      ))}

      {students.map((pos, i) => (
        <GlowingNode key={`stu-${i}`} position={pos} size={0.06} color="#10b981" pulseSpeed={2 + Math.random()} />
      ))}

      {placements.map((pos, i) => (
        <GlowingNode key={`plc-${i}`} position={pos} size={0.2} color="#ec4899" pulseSpeed={1} />
      ))}

      {departments.map((pos, i) => (
        <ConnectionBeam
          key={`beam-${i}`}
          start={new THREE.Vector3(...center)}
          end={new THREE.Vector3(...pos)}
        />
      ))}

      <OrbitControls enableZoom autoRotate autoRotateSpeed={0.3} maxDistance={15} minDistance={5} />
    </>
  )
}

export function CampusNetwork({ height = '500px' }: { height?: string }) {
  return (
    <div className="rounded-xl overflow-hidden border border-purple-500/20 relative" style={{ height }}>
      <Canvas camera={{ position: [0, 8, 12], fov: 55 }}>
        <CampusNetworkScene />
      </Canvas>
      <div className="absolute top-4 right-4 glass rounded-lg p-3 text-xs space-y-1.5">
        <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Students</div>
        <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-500" /> Faculty</div>
        <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-purple-500" /> Departments</div>
        <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-pink-500" /> Placements</div>
      </div>
    </div>
  )
}
