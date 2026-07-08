import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const Particles = ({ count = 6000 }) => {
  const points = useRef();
  
  // Track global mouse position so the background responds even if UI is on top
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Generate random points in a hollow sphere structure
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      // Radius between 2.5 and 3.5 for a nice spread
      const r = 2.5 + Math.random() * 1.5; 
      
      p[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      p[i * 3 + 2] = r * Math.cos(phi);
    }
    return p;
  }, [count]);

  useFrame((state, delta) => {
    if (points.current) {
      // Base slow rotation
      points.current.rotation.x -= delta * 0.05;
      points.current.rotation.y -= delta * 0.08;
      
      // Interactive mouse follow using global mouse state
      const targetX = mouse.y * 0.5;
      const targetY = mouse.x * 0.5;
      
      points.current.rotation.x += (targetX - points.current.rotation.x) * 0.02;
      points.current.rotation.y += (targetY - points.current.rotation.y) * 0.02;
    }
  });

  return (
    <Points ref={points} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00e5ff"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.8}
      />
    </Points>
  );
};

const WebGLBackground = () => {
  return (
    <div className="fixed inset-0 z-0 opacity-70 mix-blend-screen pointer-events-none">
      {/* We use pointer-events-none so it never blocks scrolling, 
          and track global mouse events in the component instead */}
      <Canvas camera={{ position: [0, 1.5, 7], fov: 60 }}>
        <Particles count={8000} />
      </Canvas>
    </div>
  );
};

export default WebGLBackground;
