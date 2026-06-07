import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Line } from '@react-three/drei'
import * as THREE from 'three'
import { DEPARTMENTS } from '../../data/sampleData'

const statusColors: Record<string, string> = {
  healthy: '#10b981',
  warning: '#f59e0b',
  critical: '#ef4444',
}

function AnimatedNode({ position, color, size, label }: { position: [number, number, number]; color: string; size: number; label: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.08
    }
  })

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} transparent opacity={0.85} />
      </mesh>
      <mesh>
        <sphereGeometry args={[size * 1.4, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.08} />
      </mesh>
      <Text position={[0, -size - 0.3, 0]} fontSize={0.18} color="#94a3b8" anchorX="center" anchorY="top">
        {label}
      </Text>
    </group>
  )
}

function DataFlowLine({ start, end, color }: { start: [number, number, number]; end: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (ref.current) {
      ref.current.children.forEach((child, i) => {
        const t = ((state.clock.elapsedTime * 0.5 + i * 0.3) % 1)
        child.position.lerpVectors(new THREE.Vector3(...start), new THREE.Vector3(...end), t)
      })
    }
  })

  const particles = useMemo(() => Array.from({ length: 3 }, (_, i) => i), [])

  return (
    <group>
      <Line points={[start, end]} color={color} opacity={0.3} transparent lineWidth={1} />
      {particles.map((i) => (
        <group key={i} ref={i === 0 ? ref : undefined}>
          <mesh position={start}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshBasicMaterial color={color} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function EcosystemScene() {
  const nodes = useMemo(() => {
    const count = DEPARTMENTS.length
    return DEPARTMENTS.map((dept, i) => {
      const angle = (i / count) * Math.PI * 2
      const radius = 3.5
      return {
        ...dept,
        position: [Math.cos(angle) * radius, 0, Math.sin(angle) * radius] as [number, number, number],
        color: statusColors[dept.status],
      }
    })
  }, [])

  const center: [number, number, number] = [0, 0, 0]

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#06b6d4" />
      <pointLight position={[-10, -5, -10]} intensity={0.5} color="#8b5cf6" />

      <AnimatedNode position={center} color="#06b6d4" size={0.5} label="Campus Hub" />

      {nodes.map((node) => (
        <group key={node.id}>
          <AnimatedNode position={node.position} color={node.color} size={0.35} label={node.name.split(' ')[0]} />
          <DataFlowLine start={center} end={node.position} color={node.color} />
        </group>
      ))}

      {nodes.map((node, i) => {
        const next = nodes[(i + 1) % nodes.length]
        return <DataFlowLine key={`link-${i}`} start={node.position} end={next.position} color="#06b6d4" />
      })}

      <OrbitControls enableZoom autoRotate autoRotateSpeed={0.5} maxDistance={12} minDistance={4} />
    </>
  )
}

interface DigitalTwinMapProps {
  className?: string
  height?: string
}

export function DigitalTwinMap({ className = '', height = '400px' }: DigitalTwinMapProps) {
  return (
    <div className={`relative rounded-xl overflow-hidden border border-cyan-500/20 ${className}`} style={{ height }}>
      <Canvas camera={{ position: [0, 5, 8], fov: 50 }}>
        <EcosystemScene />
      </Canvas>
      <div className="absolute bottom-4 left-4 flex gap-3 text-xs">
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Healthy</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500" /> Warning</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500" /> Critical</span>
      </div>
    </div>
  )
}
