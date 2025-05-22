
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Newspaper } from "lucide-react";
import { Link } from 'react-router-dom';

interface NewsCardProps {
  id: string;
  title: string;
  summary: string;
  image: string;
  date: string;
  category: string;
  author?: string;
}

const NewsCard = ({ id, title, summary, image, date, category, author }: NewsCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video relative">
        <img 
          src={image} 
          alt={`News: ${title}`} 
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <Badge className="absolute top-3 right-3 bg-morocco-red">{category}</Badge>
      </div>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <Newspaper className="h-4 w-4" />
          <span>{new Date(date).toLocaleDateString()}</span>
          {author && <span>• {author}</span>}
        </div>
        
        <h3 className="font-bold text-lg mb-2 line-clamp-2">{title}</h3>
        <p className="text-gray-600 mb-4 text-sm line-clamp-3">{summary}</p>
        
        <Button 
          variant="outline" 
          className="w-full border-morocco-green text-morocco-green hover:bg-morocco-green hover:text-white"
          asChild
        >
          <Link to={`/news/${id}`}>
            Read More
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default NewsCard;
