import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
}

export const ScrollReveal = ({ children, className, delay = 0, direction = "up" }: Props) => {
  const offsets = { up: { y: 20 }, left: { x: -20 }, right: { x: 20 } };
  const initial = { opacity: 0, filter: "blur(4px)", ...offsets[direction] };
  const animate = { opacity: 1, filter: "blur(0px)", x: 0, y: 0 };

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
