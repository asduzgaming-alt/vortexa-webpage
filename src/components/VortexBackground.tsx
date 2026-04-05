import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import * as THREE from 'three';

function VortexPoints() {
  const ref = useRef<THREE.Points>(null);
  
  // Generate particles in a sphere, then we'll animate them in a vortex pattern
  const sphere = useMemo(() => random.inSphere(new Float32Array(5000 * 3), { radius: 1.5 }), []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
      
      // Add a subtle pulsing effect based on BPM (130 BPM = ~2.16 beats per second)
      // 1 beat = 60/130 = 0.4615 seconds
      const time = state.clock.elapsedTime;
      const beat = 60 / 130;
      const pulse = Math.sin((time / beat) * Math.PI * 2) * 0.05 + 1;
      ref.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere as Float32Array} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#FF007F"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

export const VortexBackground = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <VortexPoints />
      </Canvas>
      {/* Overlay gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-obsidian/50 to-obsidian pointer-events-none" />
    </div>
  );
};
