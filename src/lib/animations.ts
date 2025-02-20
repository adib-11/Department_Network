import { Variants } from "framer-motion";

export const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const slideIn: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const hoverScale = {
  scale: 1.02,
  transition: { duration: 0.3 },
};

export const parallaxScroll = (yOffset: number = 50) => ({
  initial: { y: 0 },
  animate: {
    y: [-yOffset, yOffset],
    transition: {
      repeat: Infinity,
      repeatType: "reverse" as const,
      duration: 20,
      ease: "linear",
    },
  },
});
