import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Briefcase, Users, Image } from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  date: string;
  description: string;
}

interface UserProfileProps {
  user?: {
    name: string;
    avatar: string;
    role: string;
    education: string;
    achievements: Achievement[];
  };
}

const defaultUser = {
  name: "Sarah Anderson",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  role: "Senior Software Engineer",
  education: "M.S. Computer Science, Stanford University",
  achievements: [
    {
      id: "1",
      title: "Tech Lead",
      date: "2023",
      description: "Led a team of 5 engineers in developing a cloud platform",
    },
    {
      id: "2",
      title: "Patent Holder",
      date: "2022",
      description: "Awarded patent for innovative ML algorithm",
    },
  ],
};

const tabVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function UserProfile({ user = defaultUser }: UserProfileProps) {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <Card className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5" />

        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <Avatar className="w-32 h-32 border-4 border-background shadow-xl">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </motion.div>

            <div className="text-center md:text-left space-y-2">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-muted-foreground">{user.role}</p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <Badge variant="secondary" className="flex gap-1 items-center">
                  <GraduationCap className="w-3 h-3" />
                  {user.education}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="mentorship">Mentorship</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
        </TabsList>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={tabVariants}
          transition={{ duration: 0.3 }}
        >
          <TabsContent value="overview" className="mt-6 space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">
                  Professional Achievements
                </h2>
                <div className="space-y-4">
                  {user.achievements.map((achievement) => (
                    <motion.div
                      key={achievement.id}
                      whileHover={{ x: 5 }}
                      className="flex gap-4 items-start p-4 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <Briefcase className="w-5 h-5 mt-1 text-primary" />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{achievement.title}</h3>
                          <span className="text-sm text-muted-foreground">
                            {achievement.date}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {achievement.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold">
                  Projects coming soon...
                </h2>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mentorship">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold">
                  Mentorship details coming soon...
                </h2>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="media">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold">
                  Media gallery coming soon...
                </h2>
              </CardContent>
            </Card>
          </TabsContent>
        </motion.div>
      </Tabs>
    </div>
  );
}
