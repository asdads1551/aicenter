"use client"

import React, { useEffect, useState } from 'react';
import { Tool, toolsApi } from '@/services/api';
import CardWithDisplay from '@/components/CardWithDisplay';
import { useUserActions } from '@/context/useUserActions';

export default function HomePage() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const { isToolSaved, toggleSaveTool, isToolLiked, toggleLikeTool } = useUserActions();

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const data = await toolsApi.getAllTools();
        setTools(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTools();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-[14px] sm:mb-[24px] lg:mb-[40px]">
        <div className="flex justify-center">
          <h1 className="text-[20px] sm:text-[24px] font-bold sm:font-medium text-center mb-4">
            找出屬於自己的AI工具<br />
          </h1>
        </div>
      </div>

      <div className="w-full grid sm:grid-cols-3 lg:grid-cols-4 gap-[14px] sm:gap-[32px] lg:gap-[20px]">
        {tools.map((tool) => (
          <CardWithDisplay
            key={tool._id}
            _id={tool._id}
            title={tool.title}
            description={tool.overview}
            tags={tool.tags}
            imageUrl={tool.imageUrl}
            saveCount={tool.saveCount}
            commentCount={tool.commentCount}
            onLoginRequired={() => {/* 處理登入要求 */}}
            isLoggedIn={true}
            isSaved={isToolSaved(tool._id)}
            onSave={() => toggleSaveTool(tool._id)}
            isLiked={isToolLiked(tool._id)}
            onLike={() => toggleLikeTool(tool._id)}
          />
        ))}
      </div>
    </div>
  );
}
