import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TopicSidebarProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const categories = [
  { id: "react", name: "React", count: 145 },
  { id: "typescript", name: "TypeScript", count: 89 },
  { id: "css", name: "CSS", count: 112 },
  { id: "javascript", name: "JavaScript", count: 234 },
  { id: "nextjs", name: "Next.js", count: 67 },
  { id: "design", name: "Design", count: 45 },
];

export default function TopicSidebar({
  selectedCategory,
  onSelectCategory,
}: TopicSidebarProps) {
  return (
    <div className="space-y-2">
      <h2 className="font-semibold mb-4">Topics</h2>
      <Button
        variant="ghost"
        className={cn("w-full justify-start", !selectedCategory && "bg-muted")}
        onClick={() => onSelectCategory(null)}
      >
        All Topics
      </Button>
      {categories.map((category, i) => (
        <motion.div
          key={category.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-between",
              selectedCategory === category.name && "bg-muted",
            )}
            onClick={() => onSelectCategory(category.name)}
          >
            <span>{category.name}</span>
            <span className="text-muted-foreground text-sm">
              {category.count}
            </span>
          </Button>
        </motion.div>
      ))}
    </div>
  );
}
