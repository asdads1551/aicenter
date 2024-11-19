'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import ReviewSection from '@/components/ReviewSection';
import SimilarTools from '@/components/SimilarTools';
import StarRating from '@/components/StarRating';

interface CardType {
  _id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  category: string[];
  imageUrl: string;
  websiteUrl: string;
  monthlyVisits: number | null;
  saveCount: number;
  rating?: number;
  reviewCount?: number;
  collectedDate?: string;
  socialLinks?: { [key: string]: string };
}

export default function ToolPage() {
  const { slug } = useParams();
  const [tool, setTool] = useState<CardType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTool = async () => {
      try {
        setIsLoading(true);
        console.log('Fetching tool with slug:', slug);
        const response = await axios.get(`/api/cards/slug/${slug}`);
        console.log('API response:', response.data);
        setTool(response.data);
      } catch (err) {
        console.error('Error fetching tool:', err);
        if (axios.isAxiosError(err)) {
          setError(`Failed to load tool details: ${err.response?.data?.error || err.message}`);
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchTool();
    }
  }, [slug]);

  if (isLoading) return <div>載入中...</div>;
  if (error) return <div>錯誤: {error}</div>;
  if (!tool) return <div>找不到工具</div>;

  return (
    <div className="container mx-auto p-4">
      {/* Breadcrumb */}
      <div className="text-sm breadcrumbs mb-4">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href={`/category/${tool.category[0]}`}>{tool.category[0]}</a></li>
          <li>{tool.title}</li>
        </ul>
      </div>

      {/* Tool header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold">{tool.title}</h1>
          <div className="flex items-center mt-2">
            {/* Add star rating component */}
            <span className="ml-2">({tool.reviewCount} 評論)</span>
            <span className="ml-4">{tool.saveCount} 收藏</span>
            <span className="ml-4">{tool.monthlyVisits} 月訪問量</span>
          </div>
        </div>
        <Button variant="default">分享工具</Button>
      </div>

      {/* Tool content */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <img src={tool.imageUrl} alt={tool.title} className="w-full rounded-lg mb-4" />
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">工具介紹</h2>
            <p>{tool.description}</p>
          </div>
          <StarRating rating={tool.rating || 0} />
          <ReviewSection reviews={[]} />
        </div>
        <div>
          <Card>
            <CardContent>
              {/* Add pricing information */}
              <Button variant="default" className="w-full" onClick={() => window.open(tool.websiteUrl, '_blank')}>
                打開網站
              </Button>
              {/* Add social sharing buttons */}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Similar tools section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">相似推薦</h2>
        <SimilarTools tools={[]} />
      </div>
    </div>
  );
}
