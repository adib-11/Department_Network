import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Check if hovering over clickable element
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === "pointer" ||
          target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.closest("button, a, [role=button]"),
      );
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          scale: isClicking ? 0.8 : isPointer ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.1,
        }}
      >
        <motion.div
          className="relative -ml-3 -mt-3 w-6 h-6"
          animate={{
            borderRadius: isPointer ? "25%" : "50%",
          }}
        >
          <motion.div
            className="absolute inset-0 bg-white rounded-full"
            animate={{
              scale: isPointer ? 0.5 : 1,
            }}
            transition={{ duration: 0.2 }}
          />
          <motion.div
            className="absolute inset-0 border border-white rounded-full"
            initial={{ scale: 0 }}
            animate={{
              scale: isPointer ? 1.2 : 0,
              opacity: isPointer ? 1 : 0,
            }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
