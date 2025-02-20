import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

interface Mentor {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  expertise: string[];
  availability: string;
}

const mentors: Mentor[] = [
  {
    id: "1",
    name: "Dr. Emily Chen",
    role: "Tech Lead",
    company: "Google",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    expertise: ["System Design", "Career Growth", "Leadership"],
    availability: "2 slots this week",
  },
  {
    id: "2",
    name: "Michael Ross",
    role: "Senior PM",
    company: "Microsoft",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    expertise: ["Product Strategy", "Agile", "User Research"],
    availability: "4 slots this week",
  },
  {
    id: "3",
    name: "Sarah Lee",
    role: "Engineering Manager",
    company: "Netflix",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    expertise: ["Team Building", "Tech Strategy", "Career Development"],
    availability: "1 slot this week",
  },
];

export default function MentorshipSection() {
  const [currentMentorIndex, setCurrentMentorIndex] = useState(0);

  const nextMentor = () => {
    setCurrentMentorIndex((prev) => (prev + 1) % mentors.length);
  };

  const prevMentor = () => {
    setCurrentMentorIndex(
      (prev) => (prev - 1 + mentors.length) % mentors.length,
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Featured Mentors</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prevMentor}
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextMentor}
            className="h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="relative h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMentorIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="h-[400px]">
              <CardContent className="p-6 h-full flex flex-col">
                <div className="flex flex-col items-center text-center space-y-4">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={mentors[currentMentorIndex].avatar} />
                    <AvatarFallback>
                      {mentors[currentMentorIndex].name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold">
                      {mentors[currentMentorIndex].name}
                    </h3>
                    <p className="text-muted-foreground">
                      {mentors[currentMentorIndex].role} at{" "}
                      {mentors[currentMentorIndex].company}
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-4 flex-1">
                  <div className="space-y-2">
                    <h4 className="font-medium">Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      {mentors[currentMentorIndex].expertise.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Availability</h4>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {mentors[currentMentorIndex].availability}
                    </p>
                  </div>
                </div>

                <Button className="w-full mt-4">Schedule Session</Button>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
