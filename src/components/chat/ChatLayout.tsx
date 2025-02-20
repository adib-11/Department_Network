import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ConversationList from "./ConversationList";
import MessageThread from "./MessageThread";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread?: boolean;
}

const defaultConversations: Conversation[] = [
  {
    id: "1",
    name: "Alex Thompson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    lastMessage: "Hey, how's the project coming along?",
    timestamp: "2m ago",
    unread: true,
  },
  {
    id: "2",
    name: "Sarah Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    lastMessage: "The design looks great! Just a few tweaks...",
    timestamp: "1h ago",
  },
  {
    id: "3",
    name: "Team Sync",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Team",
    lastMessage: "Meeting scheduled for tomorrow at 10 AM",
    timestamp: "3h ago",
  },
];

export default function ChatLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);

  return (
    <div className="h-screen flex bg-background overflow-hidden">
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden fixed top-4 left-4 z-50"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Conversation List - Mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <ConversationList
              conversations={defaultConversations}
              onSelect={(conv) => {
                setSelectedConversation(conv);
                setIsMobileMenuOpen(false);
              }}
              selectedId={selectedConversation?.id}
              className="w-80 h-full"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Layout */}
      <div className="hidden lg:block w-80 border-r border-border">
        <ConversationList
          conversations={defaultConversations}
          onSelect={setSelectedConversation}
          selectedId={selectedConversation?.id}
        />
      </div>

      {/* Message Thread */}
      <div className="flex-1 h-full">
        {selectedConversation ? (
          <MessageThread conversation={selectedConversation} />
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            Select a conversation to start messaging
          </div>
        )}
      </div>
    </div>
  );
}
