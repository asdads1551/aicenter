import React from 'react';
import axios from 'axios';
import CommentBoard from '@/component/CommentBoard';
import { MongoClient, Db } from 'mongodb';
import { Button } from '@/components/ui/button';

interface PageProps {
  params: {
    _id: string;
  };
}

interface CommentBoardData {
  title: string;
  description: string;
  imageUrl: string;
}

const CommentBoardPage: React.FC<PageProps> = async ({ params }) => {
  let client: MongoClient | null = null;
  let db: Db | null = null;

  try {
    // 獲取評論板數據
    const response = await axios.get(`mongodb://localhost:27017/MessageBoard/messages`);
    if (!response.data) {
      throw new Error("Comment board not found");
    }
    const commentBoardData = response.data as CommentBoardData;

    // 連接到 MongoDB
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
    client = await MongoClient.connect(MONGODB_URI);
    db = client.db('MessageBoard');

    // 處理新增留言的函數
    const addMessage = async (message: string) => {
      if (!db) throw new Error("Database connection not established");
      const messagesCollection = db.collection('messages');
      await messagesCollection.insertOne({
        cardId: params._id,
        message,
        createdAt: new Date()
      });
    };

    return (
      <div className="container mx-auto p-4">
        <CommentBoard
          id={params._id}
          title={commentBoardData.title}
          description={commentBoardData.description}
          imageUrl={commentBoardData.imageUrl}
          onAddMessage={addMessage}
        />
        <Button>新增留言</Button>
      </div>
    );
  } catch (error) {
    console.error("Error:", error);
    return <div>Error: {error instanceof Error ? error.message : String(error)}</div>;
  } finally {
    if (client) {
      await client.close();
    }
  }
};

export default CommentBoardPage;
