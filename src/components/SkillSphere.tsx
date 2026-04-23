import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, TrackballControls, View } from '@react-three/drei';
import * as THREE from 'three';

function Word({ children, ...props }: { children: string; position: THREE.Vector3 }) {
  const color = new THREE.Color();
  const fontProps = { 
    font: 'https://fonts.gstatic.com/s/plusjakartasans/v8/L0xYDFLY24CAiWjwWvcfDRum7sqZ61S2atMv.woff', 
    fontSize: 0.25, 
    letterSpacing: -0.05, 
    lineHeight: 1, 
    'material-toneMapped': false,
    transparent: true,
    opacity: 0.6
  };
  const ref = useRef<any>(null);
  const [hovered, setHovered] = React.useState(false);
  const over = (e: any) => (e.stopPropagation(), setHovered(true));
  const out = () => setHovered(false);

  useFrame(() => {
    if (ref.current) {
      ref.current.quaternion.copy(props.position as any).normalize();
      ref.current.material.color.lerp(color.set(hovered ? '#c79b5c' : '#1a1a1a'), 0.1);
      ref.current.material.opacity = THREE.MathUtils.lerp(ref.current.material.opacity, hovered ? 1 : 0.6, 0.1);
    }
  });

  return (
    <Text 
      ref={ref} 
      onPointerOver={over} 
      onPointerOut={out} 
      {...props} 
      {...fontProps}
    >
      {children}
    </Text>
  );
}

function Cloud({ count = 4, radius = 4, skills }: { count?: number; radius?: number; skills: string[] }) {
  const words = useMemo(() => {
    const temp = [];
    const spherical = new THREE.Spherical();
    const phiSpan = Math.PI / (10);
    const thetaSpan = (Math.PI * 2) / skills.length;
    for (let i = 0; i < skills.length; i++) {
        temp.push([new THREE.Vector3().setFromSpherical(new THREE.Spherical(radius, Math.acos(1 - (2 * i) / skills.length), (Math.PI * 2) / skills.length * i * 3)), skills[i]]);
    }
    return temp;
  }, [count, radius, skills]);

  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
      groupRef.current.rotation.x += 0.002;
    }
  });

  return (
    <group ref={groupRef}>
      {words.map(([pos, word], index) => (
        <Word key={index} position={pos as THREE.Vector3}>
          {word as string}
        </Word>
      ))}
    </group>
  );
}

export function SkillSphere({ skills, track }: { skills: string[]; track: React.RefObject<HTMLDivElement> }) {
  return (
    <View track={track}>
      <fog attach="fog" args={['#f5f2ed', 0, 15]} />
      <Cloud radius={5} skills={skills} />
      <TrackballControls noPan noZoom rotateSpeed={2} />
    </View>
  );
}
