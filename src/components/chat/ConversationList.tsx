import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Conversation } from "./ChatLayout";

interface ConversationListProps {
  conversations: Conversation[];
  onSelect: (conversation: Conversation) => void;
  selectedId?: string;
  className?: string;
}

export default function ConversationList({
  conversations,
  onSelect,
  selectedId,
  className,
}: ConversationListProps) {
  return (
    <div className={cn("flex flex-col h-full bg-background", className)}>
      {/* Search Bar */}
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            className="pl-9 bg-muted/50"
          />
        </div>
      </div>

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto py-2 space-y-1">
        {conversations.map((conversation, i) => (
          <motion.div
            key={conversation.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <button
              onClick={() => onSelect(conversation)}
              className={cn(
                "w-full p-3 flex items-start gap-3 hover:bg-muted/50 transition-colors",
                "focus:outline-none focus:bg-muted/50",
                selectedId === conversation.id && "bg-muted",
              )}
            >
              <Avatar className="flex-shrink-0">
                <AvatarImage src={conversation.avatar} />
                <AvatarFallback>{conversation.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left">
                <div className="flex justify-between items-baseline">
                  <span className="font-medium">{conversation.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {conversation.timestamp}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {conversation.lastMessage}
                </p>
              </div>
              {conversation.unread && (
                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
              )}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
