import {
  Home,
  User,
  MessageSquare,
  Users,
  Calendar,
  Settings,
  BookOpen,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { motion } from "framer-motion";

interface SidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

const navItems = [
  { icon: Home, label: "Home", href: "/home" },
  { icon: Users, label: "Forums", href: "/forums" },
  { icon: BookOpen, label: "Academic", href: "/academic" },
  { icon: Calendar, label: "Events", href: "/events" },
  { icon: MessageSquare, label: "Messages", href: "/messages" },
  { icon: User, label: "Profile", href: "/profile" },
  { icon: Settings, label: "Settings", href: "/settings" },
  { icon: HelpCircle, label: "Help", href: "/help" },
];

export default function Sidebar({
  isCollapsed = false,
  onToggle,
}: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const handleNavigation = (href: string) => {
    navigate(href);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <motion.aside
      initial={{ width: isCollapsed ? 70 : 240 }}
      animate={{ width: isCollapsed ? 70 : 240 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="h-screen fixed left-0 top-0 z-20 flex flex-col bg-background/80 backdrop-blur-sm border-r shadow-lg"
    >
      <div className="p-4 flex-1 flex flex-col gap-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Button
              key={item.label}
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start gap-4 transition-all",
                isCollapsed && "justify-center px-2",
                isActive &&
                  "bg-primary text-primary-foreground hover:bg-primary/90",
              )}
              onClick={() => handleNavigation(item.href)}
            >
              <item.icon size={20} />
              {!isCollapsed && <span>{item.label}</span>}
            </Button>
          );
        })}
      </div>

      <div className="p-4 border-t">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-4 text-destructive hover:text-destructive hover:bg-destructive/10",
            isCollapsed && "justify-center px-2",
          )}
          onClick={handleLogout}
        >
          <LogOut size={20} />
          {!isCollapsed && <span>Logout</span>}
        </Button>
      </div>
    </motion.aside>
  );
}
