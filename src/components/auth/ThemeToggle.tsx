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
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-4 right-4 bg-background"
          >
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full w-12 h-12 border-2 transition-colors duration-300"
            >
              {theme === "light" ? (
                <Sun className="h-6 w-6 text-primary transition-transform duration-300" />
              ) : (
                <Moon className="h-6 w-6 text-primary transition-transform duration-300" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Switch to {theme === "light" ? "dark" : "light"} mode</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ThemeToggle;
