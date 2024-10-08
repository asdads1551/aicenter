'use client'

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Share2, Bookmark } from 'lucide-react';
import axios from 'axios';
import Categories from './Categories';
import Link from 'next/link';
import { ObjectId } from 'mongodb';

interface CardType {
  _id: string; // 改為 string 類型
  title: string;
  footer: string;
  description: string;
  content: string;
  name: string;
  category: string;
  imageUrl: string;
  shareCount: number;
  viewCount: number;
  savedCount: number;
}

const fetchCards = async (): Promise<CardType[]> => {
  try {
    const response = await axios.get('/api/cards');  // 修改 API 端點
    return response.data;
  } catch (error) {
    console.error('Error fetching cards:', error);
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(`Failed to fetch cards: ${error.response.status} ${error.response.statusText}`);
    } else {
      throw new Error('An unexpected error occurred while fetching cards');
    }
  }
};

const CardItem: React.FC<{ card: CardType }> = ({ card }) => {
  return (
    <Link href={`/card/comments/${card._id}`} passHref>
      <Card className="w-full max-w-sm overflow-hidden cursor-pointer transition-shadow duration-300 hover:shadow-lg">
        <div className="relative">
          <img 
            src={card.imageUrl || '/api/placeholder/400/300'} 
            alt={card.title} 
            className="w-full h-48 object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <h3 className="text-white font-bold text-lg text-left">{card.title || '無標題'}</h3>
            <p className="text-white text-sm text-left">{card.description || '無描述'}</p>
          </div>
        </div>
        <CardContent className="p-4">
          <p className="text-sm text-gray-600 line-clamp-3 text-left">{card.content || '無內容'}</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center p-4 bg-gray-100">
          <div className="flex items-center space-x-2">
            <Eye size={16} />
            <span className="text-sm">{card.viewCount}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Share2 size={16} />
            <span className="text-sm">{card.shareCount}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Bookmark size={16} />
            <span className="text-sm">{card.savedCount}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

const CardDisplay = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [filteredCards, setFilteredCards] = useState<CardType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCards = async () => {
      try {
        setIsLoading(true);
        const data = await fetchCards();
        console.log('Fetched cards:', data);
        if (!Array.isArray(data)) {
          throw new Error('Received invalid data format');
        }
        setCards(data);
        setFilteredCards(data);
      } catch (err) {
        console.error('Error loading cards:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };
    loadCards();
  }, []);

  if (isLoading) return <div>載入中...</div>;
  if (error) return <div>錯誤: {error}</div>;

  function handleSelectCategory(category: string): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4"></h1>
      <Categories onSelectCategory={handleSelectCategory} />
      {filteredCards.length === 0 ? (
        <p>沒有卡片數據</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCards.map(card => (
            <CardItem key={card._id} card={card} />
          ))}
        </div>
      )}
      <Button className="mt-4" onClick={() => setFilteredCards(cards)}>顯示所有卡片</Button>
    </div>
  );
};

export default CardDisplay;