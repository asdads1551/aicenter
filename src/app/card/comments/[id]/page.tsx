'use client';

import React, { useEffect, useState } from 'react';
import CommentBoard from '@/component/CommentBoard';
import { Button } from '@/components/ui/button';
import axios from 'axios';

interface PageProps {
  params: {
    id: string;
  };
}

interface CommentBoardData {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
}

interface Comment {
  _id: string;
  message: string;
  createdAt: string;
}

const CommentBoardPage: React.FC<PageProps> = ({ params }) => {
  const [commentBoardData, setCommentBoardData] = useState<CommentBoardData | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [boardResponse, commentsResponse] = await Promise.all([
          axios.get(`/api/commentBoard/${params.id}`),
          axios.get(`/api/comments/${params.id}`)
        ]);
        setCommentBoardData(boardResponse.data);
        setComments(commentsResponse.data);
      } catch (err) {
        setError('Failed to fetch data');
        console.error(err);
      }
    };

    fetchData();
  }, [params.id]);

  const addMessage = async (message: string) => {
    try {
      const response = await axios.post(`/api/comments/${params.id}`, { message });
      setComments(prevComments => [...prevComments, response.data]);
    } catch (err) {
      console.error('Failed to add comment:', err);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!commentBoardData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <CommentBoard
        title={commentBoardData.title}
        description={commentBoardData.description}
        imageUrl={commentBoardData.imageUrl}
      />
      <Button onClick={() => addMessage('New comment')}>新增留言</Button>
    </div>
  );
};

export default CommentBoardPage;
