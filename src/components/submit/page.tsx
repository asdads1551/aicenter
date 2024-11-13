'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function SubmitToolPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    category: '',
    imageUrl: '',
    websiteUrl: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/cards', {
        ...formData,
        category: formData.category.split(',').map(cat => cat.trim()),
      });
      router.push('/');
    } catch (error) {
      console.error('Error submitting tool:', error);
      alert('Failed to submit tool. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">提交新的 AI 工具</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1">標題</label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-1">描述</label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block mb-1">內容</label>
          <Textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="category" className="block mb-1">類別 (用逗號分隔)</label>
          <Input
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="imageUrl" className="block mb-1">圖片 URL</label>
          <Input
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="websiteUrl" className="block mb-1">網站 URL</label>
          <Input
            id="websiteUrl"
            name="websiteUrl"
            value={formData.websiteUrl}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit">提交</Button>
      </form>
    </div>
  );
}