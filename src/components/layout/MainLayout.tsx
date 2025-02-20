import { useState } from "react";
import { useTheme } from "@/lib/theme";
import { motion } from "framer-motion";
import { Outlet } from "react-router-dom";
import Sidebar from "../dashboard/Sidebar";
import ThemeToggle from "../auth/ThemeToggle";
import { ScrollToTop } from "../ui/scroll-to-top";

export default function MainLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <motion.main
        initial={{ marginLeft: isSidebarCollapsed ? 70 : 240 }}
        animate={{ marginLeft: isSidebarCollapsed ? 70 : 240 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="min-h-screen relative"
      >
        <Outlet />
        <ScrollToTop />
      </motion.main>
      <ThemeToggle />
    </div>
  );
}
