import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus, Filter } from "lucide-react";
import ThreadList from "./ThreadList";
import TopicSidebar from "./TopicSidebar";

export interface Thread {
  id: string;
  title: string;
  author: {
    name: string;
    avatar: string;
  };
  category: string;
  replies: number;
  views: number;
  lastActivity: string;
  preview: string;
}

const defaultThreads: Thread[] = [
  {
    id: "1",
    title: "Best practices for React component architecture",
    author: {
      name: "Alex Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
    category: "React",
    replies: 23,
    views: 1204,
    lastActivity: "2h ago",
    preview:
      "I've been working on a large React application and wanted to share some patterns...",
  },
  {
    id: "2",
    title: "Understanding TypeScript generics",
    author: {
      name: "Sarah Miller",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    category: "TypeScript",
    replies: 15,
    views: 892,
    lastActivity: "4h ago",
    preview:
      "Generics can be tricky to understand at first. Here's a comprehensive guide...",
  },
  {
    id: "3",
    title: "CSS Grid vs Flexbox - When to use what?",
    author: {
      name: "Mike Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    },
    category: "CSS",
    replies: 31,
    views: 1567,
    lastActivity: "6h ago",
    preview:
      "Let's discuss the pros and cons of Grid and Flexbox in different scenarios...",
  },
];

export default function ForumLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredThreads = selectedCategory
    ? defaultThreads.filter((thread) => thread.category === selectedCategory)
    : defaultThreads;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Discussion Forums</h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Filter className="h-5 w-5" />
            </Button>
            <Button className="gap-2">
              <Plus className="h-5 w-5" />
              New Topic
            </Button>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <TopicSidebar
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>

          {/* Sidebar - Mobile */}
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.div
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                className="fixed inset-0 z-50 lg:hidden"
              >
                <div
                  className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                  onClick={() => setIsSidebarOpen(false)}
                />
                <div className="absolute left-0 top-0 h-full w-64 bg-background border-r">
                  <TopicSidebar
                    selectedCategory={selectedCategory}
                    onSelectCategory={(category) => {
                      setSelectedCategory(category);
                      setIsSidebarOpen(false);
                    }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Thread List */}
          <div className="flex-1">
            <ThreadList threads={filteredThreads} />
          </div>
        </div>
      </div>
    </div>
  );
}
