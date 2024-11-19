"use client"

import React, { useEffect, useState } from 'react';
import { Tool, toolsApi } from '@/services/api';
import CardWithDisplay from '@/components/CardWithDisplay';
import SearchBar from '@/components/SearchBar';

export default function HomePage() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);

  const handleSearch = (searchTerm: string) => {
    // TODO: 實作搜尋邏輯
    console.log('Searching for:', searchTerm);
  };

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
      <div className="mb-12">
        <div className="flex justify-center">
          <h1 className="text-4xl font-bold text-center mb-8">A dedicated team to grow<br />your company</h1>
        </div>
        <div className="max-w-3xl mx-auto">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <CardWithDisplay
            key={tool._id}
            _id={tool._id}
            title={tool.title}
            description={tool.overview}
            imageUrl={tool.imageUrl}
            saveCount={tool.favCount}
            commentCount={tool.commentCount}
            onLoginRequired={() => {/* 處理登入要求 */}}
            isLoggedIn={false} // 根據實際登入狀態設置
          />
        ))}
      </div>
    </div>
  );
}
