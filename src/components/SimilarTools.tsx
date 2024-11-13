import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import StarRating from './StarRating';

interface Tool {
  id: string;
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  rating: number;
}

interface SimilarToolsProps {
  tools: Tool[];
}

const SimilarTools: React.FC<SimilarToolsProps> = ({ tools }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">相似工具</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <Link href={`/tool/${tool.slug}`} key={tool.id}>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-4">
                <img src={tool.imageUrl} alt={tool.title} className="w-full h-40 object-cover mb-4 rounded" />
                <h3 className="text-lg font-semibold mb-2">{tool.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{tool.description}</p>
                <StarRating rating={tool.rating} />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SimilarTools;
