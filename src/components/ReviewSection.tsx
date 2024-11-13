import React from 'react';
import StarRating from './StarRating';

interface Review {
  id: string;
  user: string;
  rating: number;
  content: string;
  date: string;
}

interface ReviewSectionProps {
  reviews: Review[];
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ reviews }) => {
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">用戶評價</h2>
      <div className="flex items-center mb-4">
        <StarRating rating={averageRating} />
        <span className="ml-2 text-lg">{averageRating.toFixed(1)}</span>
        <span className="ml-2 text-gray-600">({reviews.length} 評價)</span>
      </div>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">{review.user}</span>
              <span className="text-gray-600">{review.date}</span>
            </div>
            <StarRating rating={review.rating} />
            <p className="mt-2">{review.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
