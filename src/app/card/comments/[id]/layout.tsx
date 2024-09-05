'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface Comment {
  _id: string;
  content: string;
  createdAt: string;
}

interface CardProps {
  image: string;
  description: string;
  _id: string;
}

const Card: React.FC<CardProps> = ({ image, description, _id }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    fetchComments();
  }, [_id]); // 當 _id 變化時重新獲取評論

  const fetchComments = async () => {
    const response = await fetch(`/api/comments/${_id}`);
    const data = await response.json();
    setComments(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/comments/${_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: comment }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }

      const data = await response.json();
      console.log('Comment submitted:', data);
      // 重置評論輸入框或更新評論列表
      setComment('');
      // 可能需要重新獲取評論列表
      fetchComments();
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <div className="card bg-white shadow-lg rounded-lg overflow-hidden max-w-3xl mx-auto">
      <div className="relative h-80 w-full">
        <Image src={image} alt="Tool image" layout="fill" objectFit="cover" />
      </div>
      <div className="p-8 space-y-6">
        <h2 className="text-3xl font-semibold text-gray-800">{description}</h2>
        <div className="bg-gray-100 p-6 rounded-lg shadow-inner">
          <h3 className="text-xl font-medium mb-4">留言區塊</h3>
          <textarea
            className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="在這裡輸入您的留言..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>
        <Button 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg"
          onClick={handleSubmit}
        >
          發表留言
        </Button>
        <div className="bg-gray-100 p-6 rounded-lg shadow-inner">
          <h3 className="text-xl font-medium mb-4">已留言的區塊</h3>
          {comments.map((comment) => (
            <div key={comment._id} className="mb-4 p-4 bg-white rounded-lg shadow">
              <p className="text-gray-700">{comment.content}</p>
              <p className="text-sm text-gray-500 mt-2">{new Date(comment.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CommentBoardLayout: React.FC = () => {
  return (
    <div className="comment-board p-8 bg-gray-100 min-h-screen">
      <Card
        image="/path/to/image.jpg"
        description="工具敘述"
        _id="[_id]"
      />
    </div>
  );
};

export default CommentBoardLayout;
