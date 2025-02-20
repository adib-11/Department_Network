import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ThemeToggle from "./auth/ThemeToggle";

export default function GetStarted() {
  return (
    <div className="min-h-screen bg-background font-inter">
      {/* Navigation */}
      <nav className="border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold">CS Department</div>
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="ghost">Log in</Button>
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-8"
          >
            <h1 className="text-4xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Welcome to the CS <br />
              Department Portal
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Access course materials, connect with peers, and explore academic
              resources in one centralized platform designed for computer
              science students.
            </p>
            <div className="flex justify-center">
              <Link to="/login">
                <Button size="lg" className="font-medium">
                  Get started
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Vector Graphics */}
          <div className="mt-16 grid grid-cols-3 gap-8">
            <div className="aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
              <svg
                className="w-12 h-12 text-primary"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20 7L12 3L4 7M20 7L12 11M20 7V17L12 21M12 11L4 7M12 11V21M4 7V17L12 21" />
              </svg>
            </div>
            <div className="aspect-square bg-gradient-to-br from-secondary/10 to-primary/10 rounded-lg flex items-center justify-center">
              <svg
                className="w-12 h-12 text-primary"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 6V4M12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12M12 6C13.6569 6 15 7.34315 15 9C15 10.6569 13.6569 12 12 12M12 12V20M12 20H7M12 20H17" />
              </svg>
            </div>
            <div className="aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
              <svg
                className="w-12 h-12 text-primary"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9.75 17L9 20L8 21H16L15 20L14.25 17M3 13H21M5 17H19C20.1046 17 21 16.1046 21 15V5C21 3.89543 20.1046 3 19 3H5C3.89543 3 3 3.89543 3 5V15C3 16.1046 3.89543 17 5 17Z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
