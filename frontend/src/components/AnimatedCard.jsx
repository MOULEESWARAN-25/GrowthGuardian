import React, { useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { useMotionTemplate, useMotionValue, useSpring, motion } from 'framer-motion';

const AnimatedCard = ({ children, className = '', delay = 0, hover = true, style = {}, ...props }) => {
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 28, stiffness: 200 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  const rotateX = useMotionTemplate`${mouseYSpring}deg`;
  const rotateY = useMotionTemplate`${mouseXSpring}deg`;

  // Spotlight position
  const spotX = useMotionValue(50);
  const spotY = useMotionValue(50);

  const handleMouseMove = (e) => {
    if (!ref.current || !hover) return;
    const rect = ref.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width;
    const yPct = (e.clientY - rect.top) / rect.height;

    mouseX.set((xPct - 0.5) * 6);
    mouseY.set((yPct - 0.5) * -6);
    spotX.set(xPct * 100);
    spotY.set(yPct * 100);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    spotX.set(50);
    spotY.set(50);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        transformStyle: "preserve-3d",
        rotateX: hover ? rotateX : 0,
        rotateY: hover ? rotateY : 0,
        background: "rgba(10,10,20,0.6)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "20px",
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
      className={`group shadow-2xl ${className}`}
      {...props}
    >
      {/* Mouse-tracking spotlight shimmer */}
      {hover && (
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: useMotionTemplate`radial-gradient(280px circle at ${spotX}% ${spotY}%, rgba(99,102,241,0.08) 0%, transparent 70%)`,
          }}
        />
      )}

      {/* Edge highlight on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-[inherit]"
        style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)" }}
      />

      <div style={{ transform: hover ? "translateZ(20px)" : "none", transition: "transform 300ms" }}>
        {children}
      </div>
    </motion.div>
  );
};

export default AnimatedCard;
