import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Calendar as CalendarIcon, Clock } from "lucide-react";
import type { Event } from "./EventsLayout";

interface EventListProps {
  events: Event[];
  onEventClick: (event: Event) => void;
  view: "calendar" | "list";
}

const eventTypeColors = {
  workshop: "bg-blue-500/10 text-blue-500",
  meetup: "bg-green-500/10 text-green-500",
  conference: "bg-purple-500/10 text-purple-500",
  other: "bg-gray-500/10 text-gray-500",
};

export default function EventList({
  events,
  onEventClick,
  view,
}: EventListProps) {
  return (
    <div
      className={`grid gap-4 ${view === "calendar" ? "md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}
    >
      {events.map((event, i) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, delay: i * 0.1 }}
          onClick={() => onEventClick(event)}
        >
          <Card
            className={`group cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${event.isPinned ? "ring-2 ring-primary/20" : ""}`}
          >
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <Badge
                    variant="secondary"
                    className={eventTypeColors[event.type]}
                  >
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </Badge>
                  <h3 className="font-semibold group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>
                </div>
                <div className="text-center px-3 py-2 bg-muted rounded-md">
                  <div className="text-2xl font-bold">
                    {event.date.getDate()}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {event.date.toLocaleString("default", { month: "short" })}
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2">
                {event.description}
              </p>

              <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  {event.location}
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4" />
                  {event.attendees} attending
                </div>
                <div className="flex items-center gap-1.5">
                  <CalendarIcon className="w-4 h-4" />
                  {event.date.toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {event.time}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
