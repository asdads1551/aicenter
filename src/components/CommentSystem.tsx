import React from 'react';
import { Star, ThumbsUp, MessageSquare } from 'lucide-react';
import Link from 'next/link';

interface Review {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  rating: number;
  date: string;
  content: string;
  likes: number;
  slug: string; // Add this new property
}

const ReviewSystem: React.FC<{ reviews: Review[]; productSlug: string }> = ({ reviews, productSlug }) => {
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">產品評分</h2>
      <div className="flex items-center mb-6">
        <span className="text-4xl font-bold mr-2">{averageRating.toFixed(1)}</span>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-6 h-6 ${
                star <= Math.round(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <span className="ml-2 text-gray-600">({reviews.length} reviews)</span>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-4">
            <div className="flex items-center mb-2">
              <img src={review.user.avatar} alt={review.user.name} className="w-10 h-10 rounded-full mr-3" />
              <div>
                <p className="font-semibold">{review.user.name}</p>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">{review.date}</span>
                </div>
              </div>
            </div>
            <p className="text-gray-700 mb-2">{review.content}</p>
            <div className="flex items-center mt-2">
              <button className="flex items-center text-gray-600 hover:text-blue-600 mr-4">
                <ThumbsUp className="w-4 h-4 mr-1" />
                <span>{review.likes}</span>
              </button>
              <Link href={`/${productSlug}/${review.slug}`} className="flex items-center text-gray-600 hover:text-blue-600">
                <MessageSquare className="w-4 h-4 mr-1" />
                <span>回覆</span>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-6 w-full py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
        顯示更多
      </button>
    </div>
  );
};

export default ReviewSystem;
