import React from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useTheme } from "@/lib/theme";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="fixed top-4 right-4 z-50">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full w-10 h-10 border-2 transition-all duration-300 bg-background/50 backdrop-blur-sm"
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: theme === "dark" ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {theme === "dark" ? (
                    <Moon className="h-5 w-5 text-primary transition-all duration-300" />
                  ) : (
                    <Sun className="h-5 w-5 text-primary transition-all duration-300" />
                  )}
                </motion.div>
                <span className="sr-only">Toggle theme</span>
              </Button>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Switch to {theme === "dark" ? "light" : "dark"} mode</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ThemeToggle;
