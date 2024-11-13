'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, MessageSquare, Share2, Bookmark, X } from 'lucide-react';
import Link from 'next/link';
import { FacebookIcon, TwitterIcon } from 'lucide-react';
import { LinkIcon } from 'lucide-react';

interface Tool {
  _id: string;
  title: string;
  imageUrl: string;
  overview: string;
  content: string;
  url: string;
  commentCount: number;
  likeCount: number;
}

interface CardWithDisplayProps {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  saveCount: number;
  commentCount: number;
  onLoginRequired: () => void;
  isLoggedIn: boolean;
}

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-50" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50
                    bg-white rounded-2xl w-[280px] shadow-lg border border-gray-100">
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100">
          <h3 className="text-base font-normal text-gray-900">分享</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-3 flex gap-2">
          <Button 
            variant="outline" 
            className="flex-1 h-9 border border-gray-200 rounded-lg hover:bg-gray-50"
            onClick={copyLink}
          >
            <LinkIcon className="h-5 w-5" />
            <span className="ml-2 text-sm">複連結</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-9 px-3 border border-gray-200 rounded-lg hover:bg-gray-50"
            onClick={() => window.open('https://www.facebook.com/sharer/sharer.php?u=' + window.location.href)}
          >
            <FacebookIcon className="h-5 w-5" />
          </Button>
          
          <Button 
            variant="outline" 
            className="h-9 px-3 border border-gray-200 rounded-lg hover:bg-gray-50"
            onClick={() => window.open('https://twitter.com/intent/tweet?url=' + window.location.href)}
          >
            <TwitterIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </>
  );
};

const CardWithDisplay: React.FC<CardWithDisplayProps> = ({
  _id,
  title,
  description,
  imageUrl,
  saveCount: initialSaveCount,
  commentCount,
  onLoginRequired,
  isLoggedIn,
}) => {
  const [saveCount, setSaveCount] = useState(initialSaveCount);
  const [isLiked, setIsLiked] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [tools, setTools] = useState<Tool[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const response = await fetch('https://api.aicenter.tw/tool');
        if (!response.ok) {
          throw new Error('Failed to fetch tools');
        }
        const data = await response.json();
        setTools(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTools();
  }, []);

  const handleLike = () => {
    if (!isLoggedIn) {
      onLoginRequired();
      return;
    }
    
    if (isLiked) {
      setSaveCount(prev => prev - 1);
    } else {
      setSaveCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleBookmark = () => {
    if (!isLoggedIn) {
      onLoginRequired();
      return;
    }
    console.log('Save clicked');
  };

  // 使用 title 創建路徑，將標題轉換為 URL 友好的格式
  const toolPath = `/tool/${encodeURIComponent(title.toLowerCase().replace(/ /g, '-'))}`;

  return (
    <>
      <div className="w-full max-w-2xl mx-auto p-4">
        <Card className="bg-white rounded-3xl overflow-hidden relative transition-all duration-300 border-none
          shadow-[0_2px_8px_rgba(0,0,0,0.04),0_16px_24px_rgba(0,0,0,0.08)]
          hover:shadow-[0_2px_8px_rgba(0,0,0,0.04),0_16px_32px_rgba(0,0,0,0.12)]
          after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 
          after:h-[6px] after:bg-gradient-to-r after:from-blue-500 after:to-blue-400 
          after:rounded-b-3xl">
          <Link href={toolPath} className="block">
            <CardContent className="p-0">
              <div className="bg-slate-100 h-56 flex items-center justify-center">
                <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 pb-20">
                <h3 className="text-2xl font-bold mb-3">{title}</h3>
                <p className="text-base text-gray-600 mb-5">{description}</p>
                <div className="flex space-x-3">
                  <Button variant="secondary" size="sm" className="rounded-full bg-purple-50 text-purple-600 hover:bg-purple-100">影片剪輯</Button>
                  <Button variant="secondary" size="sm" className="rounded-full bg-purple-50 text-purple-600 hover:bg-purple-100">免費</Button>
                  <Button variant="secondary" size="sm" className="rounded-full bg-purple-50 text-purple-600 hover:bg-purple-100">中文</Button>
                </div>
              </div>
            </CardContent>
          </Link>
          <div className="absolute bottom-0 left-0 right-0 bg-white">
            <hr className="border-gray-100" />
            <div className="flex items-center justify-between text-base text-gray-500 p-5">
              <div className="flex items-center space-x-6">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`p-0 flex items-center hover:bg-transparent ${isLiked ? 'text-red-500' : 'text-gray-500'}`} 
                  onClick={handleLike}
                >
                  <Heart className="w-6 h-6 mr-2" fill={isLiked ? "currentColor" : "none"} />
                  <span className="text-lg">{saveCount}</span>
                </Button>
                <div className="flex items-center">
                  <MessageSquare className="w-6 h-6 mr-2" />
                  <span className="text-lg">{commentCount}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-0 hover:bg-transparent" 
                  onClick={() => setIsShareModalOpen(true)}
                >
                  <Share2 className="w-6 h-6" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-0 hover:bg-transparent" 
                  onClick={handleBookmark}
                >
                  <Bookmark className="w-6 h-6" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      <ShareModal 
        isOpen={isShareModalOpen} 
        onClose={() => setIsShareModalOpen(false)} 
      />
    </>
  );
};

export default CardWithDisplay;
