import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, MessageCircle, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
  {
    id: "1",
    question: "How do I reset my password?",
    answer:
      "To reset your password, click on the 'Forgot Password' link on the login page. You'll receive an email with instructions to create a new password.",
    category: "Account",
  },
  {
    id: "2",
    question: "How can I update my profile information?",
    answer:
      "Go to Settings > Profile and click on the 'Edit Profile' button. You can update your information and click 'Save' when done.",
    category: "Account",
  },
  {
    id: "3",
    question: "What file formats are supported for uploads?",
    answer:
      "We support PNG, JPG, PDF, and DOC files. Maximum file size is 10MB.",
    category: "Technical",
  },
];

const categories = [
  { id: "all", name: "All Categories" },
  { id: "account", name: "Account" },
  { id: "technical", name: "Technical" },
  { id: "billing", name: "Billing" },
];

export default function HelpLayout() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch = faq.question
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      faq.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Help & Support</h1>
        <p className="text-muted-foreground">
          Find answers to common questions or contact our support team
        </p>
      </div>

      {/* Search & Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for help..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="transition-all duration-300"
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory + searchQuery}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="grid md:grid-cols-[1fr,300px] gap-6"
        >
          {/* Main Content */}
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <Accordion type="single" collapsible className="w-full">
                  {filteredFaqs.map((faq, index) => (
                    <motion.div
                      key={faq.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <AccordionItem value={faq.id}>
                        <AccordionTrigger className="hover:no-underline">
                          <span className="text-left">{faq.question}</span>
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    </motion.div>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6 space-y-4">
                <h3 className="font-semibold">Need more help?</h3>
                <p className="text-sm text-muted-foreground">
                  Can't find what you're looking for? Contact our support team.
                </p>
                <div className="space-y-2">
                  <Button className="w-full gap-2">
                    <MessageCircle className="w-4 h-4" /> Contact Support
                  </Button>
                  <Button variant="outline" className="w-full gap-2">
                    <ExternalLink className="w-4 h-4" /> Visit Help Center
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
