import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ResourceGrid from "./ResourceGrid";

type CategoryType = "all" | "papers" | "courses" | "tools" | "datasets";

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: CategoryType;
  tags: string[];
  author: string;
  institution?: string;
  link: string;
  image?: string;
  featured?: boolean;
}

const categories = [
  { value: "all", label: "All Resources" },
  { value: "papers", label: "Research Papers" },
  { value: "courses", label: "Online Courses" },
  { value: "tools", label: "Research Tools" },
  { value: "datasets", label: "Datasets" },
];

export default function AcademicLayout() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("all");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-8">
      {/* Header & Search */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Academic & Research Tools</h1>
          <p className="text-muted-foreground">
            Discover resources to enhance your research and learning journey
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search resources..."
              className="pl-9 w-full transition-all duration-300 focus:ring-2 ring-primary/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={
                  selectedCategory === category.value ? "default" : "outline"
                }
                onClick={() =>
                  setSelectedCategory(category.value as CategoryType)
                }
                className="transition-all duration-300"
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <ResourceGrid category={selectedCategory} searchQuery={searchQuery} />
    </div>
  );
}
