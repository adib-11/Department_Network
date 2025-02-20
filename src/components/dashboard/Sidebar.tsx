import {
  Home,
  User,
  MessageSquare,
  Users,
  Calendar,
  Settings,
  BookOpen,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { motion } from "framer-motion";

interface SidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

const navItems = [
  { icon: Home, label: "Feed", href: "/" },
  { icon: User, label: "Profile", href: "/profile" },
  { icon: MessageSquare, label: "Messages", href: "/messages" },
  { icon: Users, label: "Forums", href: "/forums" },
  { icon: Calendar, label: "Events", href: "/events" },
  { icon: BookOpen, label: "Academic", href: "/academic" },
  { icon: Settings, label: "Settings", href: "/settings" },
  { icon: HelpCircle, label: "Help & Support", href: "/help" },
];

export default function Sidebar({
  isCollapsed = false,
  onToggle,
}: SidebarProps) {
  const navigate = useNavigate();
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
        {navItems.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            className={cn(
              "w-full justify-start gap-4 transition-all",
              isCollapsed && "justify-center px-2",
            )}
            onClick={() => handleNavigation(item.href)}
          >
            <item.icon size={20} />
            {!isCollapsed && <span>{item.label}</span>}
          </Button>
        ))}
      </div>
    </motion.aside>
  );
}
