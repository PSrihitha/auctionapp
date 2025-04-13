import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: { color: "#000000" },
        fpsLimit: 60,
        particles: {
          color: { value: "#cccccc" },
          links: {
            color: "#cccccc",
            distance: 130,
            enable: true,
            opacity: 0.4,
            width: 1,
          },
          move: { enable: true, speed: 2 },
          number: { value: 70 },
          opacity: { value: 0.5 },
          shape: { type: "circle" },
          size: { value: { min: 1, max: 4 } },
        },
        detectRetina: true,
      }}
    />
  );
}
