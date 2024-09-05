"use client";

import React from 'react';

interface CommentBoardProps {
  title: string;
  description: string;
  imageUrl: string;
}

const CommentBoard: React.FC<CommentBoardProps> = ({ title, description, imageUrl }) => {
  return (
    <div className="comment-board bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <img src={imageUrl} alt="Tool logo" className="w-12 h-12 mr-4" />
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      
      <p className="text-gray-600 mb-6">{description}</p>
      
      <div className="flex space-x-4 mb-6">
        <button className="bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded">Visit</button>
        <button className="bg-red-500 text-white px-4 py-2 rounded flex items-center">
          <span className="mr-2">▲</span> UPVOTE
        </button>
      </div>
      
      <div className="flex space-x-4 text-sm text-gray-500">
        <span>Discuss</span>
        <span>Collect</span>
        <span>Share</span>
        <span>Stats</span>
      </div>
      
      {/* 保留原有的留言區塊和留言列表 */}
      <div className="comment-area mt-6">
        <textarea placeholder="留言區塊" className="w-full p-2 border rounded" />
      </div>
      
      <div className="comments-list mt-6">
        <h3 className="text-lg font-semibold">已留言的區塊</h3>
        {/* 這裡可以添加留言列表的渲染邏輯 */}
      </div>
    </div>
  );
};

export default CommentBoard;
