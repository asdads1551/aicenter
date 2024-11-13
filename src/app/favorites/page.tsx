"use client";

import { useState } from 'react';
import FavoritesFilter from '../../components/favorites_filter';
import CardWithDisplay from '@/components/CardWithDisplay';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  
  const handleFilterChange = (filters: any) => {
    // 處理篩選邏輯
    console.log('Filters changed:', filters);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">我的收藏</h1>
      
      <FavoritesFilter onFilterChange={handleFilterChange} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.length > 0 ? (
          favorites.map((item: any) => (
            <CardWithDisplay key={item.id} {...item} />
          ))
        ) : (
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <p className="text-gray-500">尚無收藏的工具</p>
          </div>
        )}
      </div>
    </div>
  );
} 