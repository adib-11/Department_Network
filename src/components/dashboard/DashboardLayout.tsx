import { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import NewsFeed from "./NewsFeed";
import ThemeToggle from "../auth/ThemeToggle";

export default function DashboardLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  return (
    <div
      className={`min-h-screen bg-background ${theme === "dark" ? "dark" : ""}`}
    >
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <motion.main
        initial={{ marginLeft: isSidebarCollapsed ? 70 : 240 }}
        animate={{ marginLeft: isSidebarCollapsed ? 70 : 240 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen"
      >
        <NewsFeed />
      </motion.main>
      <ThemeToggle theme={theme} onThemeChange={setTheme} />
    </div>
  );
}
