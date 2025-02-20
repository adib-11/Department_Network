import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon, List, Grid, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventList from "./EventList";

export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  location: string;
  type: "workshop" | "meetup" | "conference" | "other";
  attendees: number;
  isPinned?: boolean;
}

const defaultEvents: Event[] = [
  {
    id: "1",
    title: "React Advanced Workshop",
    description:
      "Deep dive into React performance optimization and advanced patterns",
    date: new Date(2024, 3, 15),
    time: "10:00 AM - 2:00 PM",
    location: "Virtual",
    type: "workshop",
    attendees: 45,
    isPinned: true,
  },
  {
    id: "2",
    title: "Tech Meetup: Future of Web Dev",
    description: "Discussion about upcoming web technologies and trends",
    date: new Date(2024, 3, 20),
    time: "6:00 PM - 8:00 PM",
    location: "San Francisco, CA",
    type: "meetup",
    attendees: 120,
  },
  {
    id: "3",
    title: "DevCon 2024",
    description: "Annual developer conference featuring industry leaders",
    date: new Date(2024, 4, 1),
    time: "9:00 AM - 6:00 PM",
    location: "New York, NY",
    type: "conference",
    attendees: 500,
  },
];

export default function EventsLayout() {
  const [view, setView] = useState<"calendar" | "list">("calendar");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Events & Calendar</h1>
        <div className="flex items-center gap-2">
          <Tabs
            value={view}
            onValueChange={(v) => setView(v as "calendar" | "list")}
          >
            <TabsList>
              <TabsTrigger value="calendar">
                <CalendarIcon className="w-4 h-4 mr-2" /> Calendar
              </TabsTrigger>
              <TabsTrigger value="list">
                <List className="w-4 h-4 mr-2" /> List
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Button className="ml-4">
            <Plus className="w-4 h-4 mr-2" /> Add Event
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-[300px,1fr] gap-6">
        {/* Calendar Widget */}
        <div className="space-y-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border shadow"
          />
          <div className="p-4 bg-muted/50 rounded-lg">
            <h3 className="font-medium mb-2">Upcoming Events</h3>
            <p className="text-sm text-muted-foreground">
              {defaultEvents.length} events scheduled
            </p>
          </div>
        </div>

        {/* Events Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <EventList
              events={defaultEvents}
              onEventClick={setSelectedEvent}
              view={view}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Event Details Dialog */}
      <Dialog
        open={!!selectedEvent}
        onOpenChange={() => setSelectedEvent(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedEvent?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              {selectedEvent?.description}
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Date:</span>{" "}
                {selectedEvent?.date.toLocaleDateString()}
              </div>
              <div>
                <span className="font-medium">Time:</span> {selectedEvent?.time}
              </div>
              <div>
                <span className="font-medium">Location:</span>{" "}
                {selectedEvent?.location}
              </div>
              <div>
                <span className="font-medium">Attendees:</span>{" "}
                {selectedEvent?.attendees}
              </div>
            </div>
            <Button className="w-full">RSVP Now</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
