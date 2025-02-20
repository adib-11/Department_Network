import { useState } from "react";
import NewsCard, { NewsItem } from "./NewsCard";

const defaultNews: NewsItem[] = [
  {
    id: "1",
    title: "The Future of Web Development",
    content:
      "Exploring the latest trends in web development and what's coming next...",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  },
  {
    id: "2",
    title: "AI in Modern Applications",
    content:
      "How artificial intelligence is transforming the way we build applications...",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
  },
  {
    id: "3",
    title: "Design Systems Evolution",
    content:
      "The evolution of design systems and their impact on product development...",
    image: "https://images.unsplash.com/photo-1545235617-9465d2a55698",
  },
];

interface NewsFeedProps {
  items?: NewsItem[];
}

export default function NewsFeed({ items = defaultNews }: NewsFeedProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {items.map((item) => (
        <NewsCard key={item.id} item={item} />
      ))}
    </div>
  );
}
