import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  image: string;
}

interface NewsCardProps {
  item: NewsItem;
}

export default function NewsCard({ item }: NewsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-card">
        <div className="aspect-video relative overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="object-cover w-full h-full"
          />
        </div>
        <CardHeader>
          <CardTitle className="line-clamp-2">{item.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground line-clamp-3">{item.content}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
