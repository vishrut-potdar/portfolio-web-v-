import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text, Sphere, PerspectiveCamera, View } from '@react-three/drei';
import * as THREE from 'three';

function VObject() {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={meshRef}>
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <Text
          font="https://fonts.gstatic.com/s/playfairdisplay/v30/nuFvD7K2E7XcPaJlXN2XateL.woff"
          fontSize={4}
          color="#c79b5c"
          position={[0, 0, 0]}
          anchorX="center"
          anchorY="middle"
        >
          V
        </Text>
      </Float>
      
      {/* Decorative Orbits */}
      <Sphere args={[3.2, 64, 64]}>
        <meshBasicMaterial color="#c79b5c" wireframe transparent opacity={0.1} />
      </Sphere>
      
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[3.5, 0.01, 16, 100]} />
        <meshBasicMaterial color="#c79b5c" transparent opacity={0.3} />
      </mesh>
      
      <mesh rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
        <torusGeometry args={[3.8, 0.005, 16, 100]} />
        <meshBasicMaterial color="#c79b5c" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

export function VGlobe({ track }: { track: React.RefObject<HTMLDivElement> }) {
  return (
    <View track={track}>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
      <VObject />
    </View>
  );
}
