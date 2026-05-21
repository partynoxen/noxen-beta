"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function MouseGlow() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    damping: 40,
    stiffness: 120,
  });

  const smoothY = useSpring(mouseY, {
    damping: 40,
    stiffness: 120,
  });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX - 200);
      mouseY.set(e.clientY - 200);
    };

    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed z-[1] h-[400px] w-[400px] rounded-full bg-fuchsia-500/20 blur-[120px]"
      style={{
        x: smoothX,
        y: smoothY,
      }}
    />
  );
}