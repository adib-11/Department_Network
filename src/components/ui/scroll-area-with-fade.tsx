import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ScrollAreaWithFadeProps {
  children: React.ReactNode;
  className?: string;
}

export function ScrollAreaWithFade({
  children,
  className,
}: ScrollAreaWithFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: ref });

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [1, 0, 0, 1]);

  return (
    <div className={cn("relative", className)}>
      <div ref={ref} className="overflow-y-auto max-h-full">
        {children}
      </div>
      <motion.div
        style={{ opacity }}
        className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-background to-transparent"
      />
      <motion.div
        style={{ opacity }}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-background to-transparent"
      />
    </div>
  );
}
