import { motion } from "framer-motion";
import { MessageSquare, Eye } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Thread } from "./ForumLayout";

interface ThreadListProps {
  threads: Thread[];
}

export default function ThreadList({ threads }: ThreadListProps) {
  return (
    <div className="space-y-4">
      {threads.map((thread, i) => (
        <motion.div
          key={thread.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-card cursor-pointer">
            <div className="flex gap-4">
              <Avatar className="w-10 h-10">
                <AvatarImage src={thread.author.avatar} />
                <AvatarFallback>{thread.author.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold hover:text-primary transition-colors">
                      {thread.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      by {thread.author.name} · {thread.lastActivity}
                    </p>
                  </div>
                  <Badge variant="secondary">{thread.category}</Badge>
                </div>
                <p className="text-muted-foreground line-clamp-2">
                  {thread.preview}
                </p>
                <div className="flex gap-4">
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" /> {thread.replies}{" "}
                    replies
                  </span>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Eye className="w-4 h-4" /> {thread.views} views
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
