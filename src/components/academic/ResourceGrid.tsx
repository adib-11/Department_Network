import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, BookOpen, Download, Star } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Resource } from "./AcademicLayout";

const defaultResources: Resource[] = [
  {
    id: "1",
    title: "Machine Learning Foundations",
    description:
      "Comprehensive course covering ML fundamentals and practical applications",
    category: "courses",
    tags: ["ML", "AI", "Python"],
    author: "Dr. Sarah Chen",
    institution: "Stanford University",
    link: "#",
    image: "https://images.unsplash.com/photo-1488229297570-58520851e868",
    featured: true,
  },
  {
    id: "2",
    title: "Research Methods in Computer Science",
    description:
      "A systematic approach to conducting and documenting research in CS",
    category: "papers",
    tags: ["Research", "Methodology"],
    author: "Prof. Michael Ross",
    institution: "MIT",
    link: "#",
    featured: true,
  },
  {
    id: "3",
    title: "Deep Learning Dataset Collection",
    description:
      "Curated datasets for training and testing deep learning models",
    category: "datasets",
    tags: ["Deep Learning", "Data"],
    author: "AI Research Team",
    institution: "Google Research",
    link: "#",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8",
  },
];

interface ResourceGridProps {
  category: string;
  searchQuery: string;
}

export default function ResourceGrid({
  category,
  searchQuery,
}: ResourceGridProps) {
  const filteredResources = defaultResources.filter((resource) => {
    const matchesCategory =
      category === "all" || resource.category === category;
    const matchesSearch =
      searchQuery.toLowerCase() === "" ||
      [
        resource.title,
        resource.description,
        resource.author,
        ...(resource.tags || []),
      ].some((text) => text.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence mode="popLayout">
        {filteredResources.map((resource, index) => (
          <motion.div
            key={resource.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card
              className={`h-full group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] ${resource.featured ? "ring-2 ring-primary/20" : ""}`}
            >
              {resource.image && (
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <img
                    src={resource.image}
                    alt={resource.title}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                  {resource.featured && (
                    <div className="absolute top-2 right-2">
                      <Badge
                        variant="secondary"
                        className="bg-primary text-primary-foreground"
                      >
                        <Star className="w-3 h-3 mr-1" /> Featured
                      </Badge>
                    </div>
                  )}
                </div>
              )}
              <CardHeader>
                <div className="space-y-1">
                  <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-2">
                    {resource.title}
                  </h3>
                  {resource.institution && (
                    <p className="text-sm text-muted-foreground">
                      {resource.institution}
                    </p>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {resource.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {resource.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {resource.category === "papers" ? (
                      <>
                        <BookOpen className="w-4 h-4 mr-2" /> Read Paper
                      </>
                    ) : resource.category === "datasets" ? (
                      <>
                        <Download className="w-4 h-4 mr-2" /> Download
                      </>
                    ) : (
                      <>
                        <ExternalLink className="w-4 h-4 mr-2" /> View Resource
                      </>
                    )}
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
