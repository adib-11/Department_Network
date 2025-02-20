import { useState } from "react";
import { motion } from "framer-motion";
import { Paperclip, Smile, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Conversation } from "./ChatLayout";

interface Message {
  id: string;
  content: string;
  sender: "user" | "other";
  timestamp: string;
}

interface MessageThreadProps {
  conversation: Conversation;
}

const defaultMessages: Message[] = [
  {
    id: "1",
    content: "Hey, how's the project coming along?",
    sender: "other",
    timestamp: "10:30 AM",
  },
  {
    id: "2",
    content: "Making good progress! Just finished the main features.",
    sender: "user",
    timestamp: "10:32 AM",
  },
  {
    id: "3",
    content: "That's great to hear! Can you share a demo?",
    sender: "other",
    timestamp: "10:33 AM",
  },
];

export default function MessageThread({ conversation }: MessageThreadProps) {
  const [messages, setMessages] = useState<Message[]>(defaultMessages);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center gap-3">
        <Avatar>
          <AvatarImage src={conversation.avatar} />
          <AvatarFallback>{conversation.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-semibold">{conversation.name}</h2>
          <p className="text-sm text-muted-foreground">Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, i) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.sender === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              <p>{message.content}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {message.timestamp}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-muted transition-colors"
          >
            <Paperclip className="h-5 w-5" />
          </Button>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-muted transition-colors"
          >
            <Smile className="h-5 w-5" />
          </Button>
          <Button
            onClick={handleSend}
            disabled={!newMessage.trim()}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
