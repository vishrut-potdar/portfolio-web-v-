import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, View } from '@react-three/drei';
import * as THREE from 'three';

function CityMarker({ lat, lon, color = "#c79b5c" }: { lat: number; lon: number; color?: string }) {
  const pos = useMemo(() => {
    const phi = (90 - lat) * (Math.PI / 180);
    const thetaSlice = (lon + 180) * (Math.PI / 180);
    const radius = 2.05;
    return new THREE.Vector3(
      -radius * Math.sin(phi) * Math.cos(thetaSlice),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(thetaSlice)
    );
  }, [lat, lon]);

  return (
    <mesh position={pos}>
      <sphereGeometry args={[0.06, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
      <pointLight distance={1} intensity={1} color={color} />
    </mesh>
  );
}

function Earth() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (meshRef.current) meshRef.current.rotation.y += 0.001;
  });

  return (
    <group rotation={[0, -Math.PI / 2, 0]}>
      {/* Outer Atmosphere Glow */}
      <Sphere args={[2.1, 64, 64]}>
        <meshBasicMaterial color="#c79b5c" transparent opacity={0.05} side={THREE.BackSide} />
      </Sphere>

      <Sphere ref={meshRef} args={[2, 64, 64]}>
        <meshStandardMaterial 
          color="#1a1a1a" 
          wireframe 
          transparent 
          opacity={0.2} 
          metalness={0.9} 
          roughness={0.1} 
          emissive="#c79b5c"
          emissiveIntensity={0.05}
        />
      </Sphere>
      
      {/* Markers */}
      <CityMarker lat={20.59} lon={78.96} /> {/* India */}
      <CityMarker lat={12.97} lon={77.59} /> {/* Bangalore */}
      <CityMarker lat={37.42} lon={-122.08} /> {/* Mountain View */}
    </group>
  );
}

export function PremiumGlobe({ track }: { track: React.RefObject<HTMLDivElement> }) {
  return (
    <View track={track}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <Earth />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
    </View>
  );
}
