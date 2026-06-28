import { motion, type Variants } from "framer-motion";
import type { ReactNode, CSSProperties } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut", delay },
  }),
};

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
}

export function Reveal({
  children,
  delay = 0,
  className,
  style,
}: RevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-12% 0px" }}
      custom={delay}
      variants={variants}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
