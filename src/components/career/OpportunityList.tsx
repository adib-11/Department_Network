import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, Clock, ArrowUpRight } from "lucide-react";

interface Opportunity {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "Full-time" | "Internship" | "Contract";
  workMode: "Remote" | "Onsite" | "Hybrid";
  postedDate: string;
  description: string;
  skills: string[];
}

const opportunities: Opportunity[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp Solutions",
    location: "San Francisco, CA",
    type: "Full-time",
    workMode: "Hybrid",
    postedDate: "2 days ago",
    description:
      "Join our team to build next-generation web applications using React and TypeScript...",
    skills: ["React", "TypeScript", "GraphQL"],
  },
  {
    id: "2",
    title: "UX Design Intern",
    company: "DesignHub",
    location: "Remote",
    type: "Internship",
    workMode: "Remote",
    postedDate: "1 week ago",
    description:
      "Exciting opportunity for aspiring UX designers to work on real-world projects...",
    skills: ["Figma", "User Research", "Prototyping"],
  },
  {
    id: "3",
    title: "Backend Engineer",
    company: "DataFlow Inc",
    location: "New York, NY",
    type: "Full-time",
    workMode: "Onsite",
    postedDate: "3 days ago",
    description:
      "Looking for experienced backend engineers to scale our distributed systems...",
    skills: ["Node.js", "PostgreSQL", "AWS"],
  },
];

interface OpportunityListProps {
  filter: string;
  searchQuery: string;
}

export default function OpportunityList({
  filter,
  searchQuery,
}: OpportunityListProps) {
  const filteredOpportunities = opportunities.filter((opp) => {
    if (searchQuery) {
      const search = searchQuery.toLowerCase();
      return (
        opp.title.toLowerCase().includes(search) ||
        opp.company.toLowerCase().includes(search) ||
        opp.description.toLowerCase().includes(search) ||
        opp.skills.some((skill) => skill.toLowerCase().includes(search))
      );
    }
    return true;
  });

  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {filteredOpportunities.map((opportunity, index) => (
          <motion.div
            key={opportunity.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
              <CardContent className="p-6">
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {opportunity.title}
                      </h3>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Building2 className="w-4 h-4" />
                        <span>{opportunity.company}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        <MapPin className="w-3 h-3" />
                        {opportunity.location}
                      </Badge>
                      <Badge variant="secondary">{opportunity.type}</Badge>
                      <Badge variant="secondary">{opportunity.workMode}</Badge>
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <Clock className="w-3 h-3" />
                        {opportunity.postedDate}
                      </Badge>
                    </div>

                    <p className="text-muted-foreground">
                      {opportunity.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {opportunity.skills.map((skill) => (
                        <Badge key={skill} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button size="icon" variant="ghost" className="shrink-0">
                    <ArrowUpRight className="w-5 h-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
