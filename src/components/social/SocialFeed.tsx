import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollAreaWithFade } from "@/components/ui/scroll-area-with-fade";
import {
  containerVariants,
  itemVariants,
  parallaxScroll,
} from "@/lib/animations";

interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  isPinned?: boolean;
  isLiked?: boolean;
  isBookmarked?: boolean;
}

const defaultPosts: Post[] = [
  {
    id: "1",
    author: {
      name: "Alex Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      role: "Product Designer",
    },
    content:
      "Just launched our new design system! Check out the documentation and let me know your thoughts. 🚀",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    likes: 128,
    comments: 32,
    shares: 12,
    timestamp: "2h ago",
    isPinned: true,
  },
  {
    id: "2",
    author: {
      name: "Sarah Miller",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      role: "Frontend Developer",
    },
    content:
      "Here's a quick tip for React performance optimization: Use memo wisely! 💡",
    likes: 89,
    comments: 24,
    shares: 8,
    timestamp: "4h ago",
  },
  {
    id: "3",
    author: {
      name: "Mike Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
      role: "UX Researcher",
    },
    content:
      "Just wrapped up our latest user research session. Some fascinating insights about how people interact with navigation patterns.",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12",
    likes: 156,
    comments: 45,
    shares: 18,
    timestamp: "6h ago",
  },
];

export default function SocialFeed() {
  const [posts, setPosts] = useState(defaultPosts);

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            isLiked: !post.isLiked,
          };
        }
        return post;
      }),
    );
  };

  const handleBookmark = (postId: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            isBookmarked: !post.isBookmarked,
          };
        }
        return post;
      }),
    );
  };

  return (
    <ScrollAreaWithFade className="max-w-3xl mx-auto p-4 h-[calc(100vh-4rem)]">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            variants={itemVariants}
            whileHover={{
              y: -5,
              transition: { duration: 0.2 },
            }}
          >
            <Card
              className={`overflow-hidden ${post.isPinned ? "ring-2 ring-primary/20" : ""}`}
            >
              {post.isPinned && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-primary/5 px-4 py-1 text-xs font-medium text-primary flex items-center justify-between"
                >
                  <span>Pinned Post</span>
                  <Badge variant="secondary" className="text-xs">
                    Featured
                  </Badge>
                </motion.div>
              )}
              <CardHeader className="p-4 flex flex-row items-start gap-4">
                <Avatar>
                  <AvatarImage src={post.author.avatar} />
                  <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{post.author.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {post.author.role}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {post.timestamp}
                      </span>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-4">
                <p className="text-sm">{post.content}</p>
                {post.image && (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative aspect-video rounded-lg overflow-hidden"
                  >
                    <motion.img
                      src={post.image}
                      alt="Post content"
                      className="object-cover w-full h-full"
                      variants={parallaxScroll(10)}
                      initial="initial"
                      whileHover="animate"
                    />
                  </motion.div>
                )}
                <div className="flex items-center justify-between pt-4">
                  <div className="flex gap-4">
                    <motion.div whileTap={{ scale: 0.9 }}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`flex items-center gap-2 ${post.isLiked ? "text-primary" : ""}`}
                        onClick={() => handleLike(post.id)}
                      >
                        <Heart
                          className={`h-4 w-4 ${post.isLiked ? "fill-current" : ""}`}
                        />
                        {post.likes}
                      </Button>
                    </motion.div>
                    <motion.div whileTap={{ scale: 0.9 }}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <MessageCircle className="h-4 w-4" />
                        {post.comments}
                      </Button>
                    </motion.div>
                    <motion.div whileTap={{ scale: 0.9 }}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <Share2 className="h-4 w-4" />
                        {post.shares}
                      </Button>
                    </motion.div>
                  </div>
                  <motion.div whileTap={{ scale: 0.9 }}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={post.isBookmarked ? "text-primary" : ""}
                      onClick={() => handleBookmark(post.id)}
                    >
                      <Bookmark
                        className={`h-4 w-4 ${post.isBookmarked ? "fill-current" : ""}`}
                      />
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </ScrollAreaWithFade>
  );
}
