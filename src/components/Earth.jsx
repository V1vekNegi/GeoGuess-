import React, { useRef, useMemo, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader, Vector3, SRGBColorSpace, NearestFilter } from "three";
import { OrbitControls } from "@react-three/drei";

import EarthMap from "../assets/maskmap.jpeg";

const Earth = ({ fastSpin = false, move = false, isBouncing = false }) => {
  const earthRef = useRef();
  const controlsRef = useRef();

  const cloudsGroupRef = useRef();

    const bounceRef = useRef({
      isAnimating: false,
      direction: 1, // 1 = down, -1 = up
      scale: 1,
    });

  const [earthmap] = useLoader(TextureLoader, [EarthMap]);

  if (earthmap) {
    earthmap.colorSpace = SRGBColorSpace;
    earthmap.minFilter = NearestFilter;
    earthmap.magFilter = NearestFilter;
  }

  const targetPosition = new Vector3(-2, 0, 1);
  const spinSpeedRef = useRef(0.005);

  function Cloud({ basePosition, baseScale = 1 }) {
    const cloudParts = useMemo(() => {
      const parts = [];
      const numParts = Math.floor(Math.random() * 3) + 4;
      for (let i = 0; i < numParts; i++) {
        const xOffset = (Math.random() - 0.5) * 0.4; // Small random offset
        const yOffset = (Math.random() - 0.5) * 0.4;
        const zOffset = (Math.random() - 0.5) * 0.4;
        const radius = Math.random() * 0.15 + 0.1; // Random radius between 0.1 and 0.25

        parts.push({
          position: [xOffset, yOffset, zOffset],
          radius: radius,
          // Optional: Add a slight rotation for more randomness
          rotation: [
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI,
          ],
        });
      }
      return parts;
    }, []); // Empty dependency array means it runs once when component mounts

    useEffect(() => {
      if (isBouncing) {
        bounceRef.current.isAnimating = true;
        bounceRef.current.direction = 1;
      }
    }, [isBouncing]);

    return (
      <group position={basePosition} scale={baseScale}>
        {cloudParts.map((part, index) => (
          <mesh key={index} position={part.position} rotation={part.rotation}>
            <sphereGeometry args={[part.radius, 16, 16]} />{" "}
            {/* Use slightly fewer segments for performance if many clouds */}
            <meshStandardMaterial
              color="#ffffff"
              roughness={1}
              flatShading={false}
            />{" "}
            {/* Smooth, white clouds */}
          </mesh>
        ))}
      </group>
    );
  }

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += spinSpeedRef.current;
    }
    if (cloudsGroupRef.current) {
      cloudsGroupRef.current.rotation.y += spinSpeedRef.current;
    }
    // Gradually increase spin speed
    if (fastSpin && spinSpeedRef.current < 0.2) {
      spinSpeedRef.current += 0.003; // control acceleration
    }

    if (controlsRef.current) {
      const target = controlsRef.current.target;
      target.x = Math.max(-1.5, Math.min(1.5, target.x));
      target.y = Math.max(-1.2, Math.min(1.2, target.y));
      target.z = Math.max(-1.5, Math.min(1.5, target.z));
      controlsRef.current.update();
    }

    if (move) {
      earthRef.current.position.lerp(targetPosition, 0.005);
    }

     if (bounceRef.current.isAnimating) {
          // Animate the scale down to 0.8
          if (bounceRef.current.direction === 1) {
            bounceRef.current.scale -= 0.05;
            if (bounceRef.current.scale <= 0.8) {
              bounceRef.current.direction = -1; // Switch to scale up
            }
          } 
          // Animate the scale up to 1.1 (slight overshoot)
          else if (bounceRef.current.direction === -1) {
            bounceRef.current.scale += 0.05;
            if (bounceRef.current.scale >= 1.1) {
              bounceRef.current.direction = 2; // Switch to scale back to normal
            }
          }
          // Animate the scale back to the original size
          else if (bounceRef.current.direction === 2) {
            bounceRef.current.scale -= 0.05;
            if (bounceRef.current.scale <= 1) {
              bounceRef.current.scale = 1;
              bounceRef.current.isAnimating = false;
            }
          }
          // Apply the new scale to the Earth
          earthRef.current.scale.set(bounceRef.current.scale, bounceRef.current.scale, bounceRef.current.scale);
        }
        
  });

  return (
    <>
      <group ref={earthRef} position={[0, 0, 0]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 2, 1]} intensity={1.5} />

        <mesh>
          <sphereGeometry args={[2, 64, 64]} />

          <meshStandardMaterial
            displacementMap={earthmap}
            displacementScale={0.07}
            roughness={0.1}
            flatShading={false}
            color="#3cb9fc"
            emissiveMap={earthmap}
            emissive="#6cd84e"
            emissiveIntensity={1}
          />
        </mesh>

        {/* Clouds */}
        <group ref={cloudsGroupRef}>
          {/* Now these will be your imported 3D cloud models! */}
          <Cloud basePosition={[0.8, 0.7, 2.05]} baseScale={0.5} />
          <Cloud basePosition={[-2.4, 1.0, -2.05]} baseScale={1.2} />
          <Cloud basePosition={[0.8, 2.2, -2.05]} baseScale={0.8} />
          <Cloud basePosition={[2.05, 0.0, 0.5]} baseScale={1.5} />{" "}
          {/* Added more clouds */}
          <Cloud basePosition={[-1.5, -1.8, 0.0]} baseScale={0.9} />
          <Cloud basePosition={[0.0, 1.5, 2.05]} baseScale={1.1} />
          {/* Add more Cloud components as needed */}
        </group>

        <OrbitControls
          ref={controlsRef}
          enableZoom={false}
          enableRotate
          minDistance={6}
          maxDistance={7}
          target={[0, 0, 0]}
        />
      </group>
    </>
  );
};
export default Earth;
