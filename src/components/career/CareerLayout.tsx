import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import OpportunityList from "./OpportunityList";
import MentorshipSection from "./MentorshipSection";

type FilterType = "all" | "jobs" | "internships" | "remote" | "onsite";

export default function CareerLayout() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-8">
      {/* Header & Search */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">
          Career & Professional Development
        </h1>
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search opportunities..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Opportunities Section */}
        <div className="lg:col-span-2 space-y-6">
          <OpportunityList filter={filter} searchQuery={searchQuery} />
        </div>

        {/* Mentorship Section */}
        <div className="space-y-6">
          <MentorshipSection />
        </div>
      </div>
    </div>
  );
}
