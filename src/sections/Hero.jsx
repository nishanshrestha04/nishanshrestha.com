import { Canvas, useFrame } from "@react-three/fiber";
import HeroText from "../components/HeroText";
import Parallax from "../components/Parallax";
import { Astronaut } from "../components/Astronaut";
import { Float } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { easing } from "maath";
import { Suspense, useState } from "react";
import { motion } from "motion/react";
import Loader from "../components/Loader";

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    setMousePosition({ x, y });
  };

  return (
    <section 
      className="relative flex items-start justify-center h-screen overflow-hidden md:items-start md:justify-start c-space"
      onMouseMove={handleMouseMove}
    >
      <Parallax mouseX={mousePosition.x} mouseY={mousePosition.y} />
      <HeroText />
      <figure
        className="absolute inset-0 pointer-events-none"
        style={{ width: "100%", height: "100%" }}
      >
        <Canvas camera={{ position: [0, 1, 3] }}>
          <Suspense fallback={null}>
            <Float>
              <Astronaut
                scale={isMobile && 0.23}
                position={isMobile && [0, -1.5, 0]}
              />
            </Float>
            <Rig mouseX={mousePosition.x} mouseY={mousePosition.y} />
          </Suspense>
        </Canvas>
      </figure>
    </section>
  );
};

function Rig({ mouseX, mouseY }) {
  return useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    easing.damp3(
      state.camera.position,
      [
        (mouseX * 0.5) + Math.sin(time * 0.5) * 0.2,
        1 + (mouseY * 0.5) + Math.cos(time * 0.3) * 0.2,
        3
      ],
      0.5,
      delta
    );
  });
}

export default Hero;
