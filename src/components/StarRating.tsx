import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, maxRating = 5 }) => {
  return (
    <div className="flex">
      {[...Array(maxRating)].map((_, index) => (
        <Star
          key={index}
          className={`w-5 h-5 ${
            index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
};

export default StarRating;

