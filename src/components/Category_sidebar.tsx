'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Category {
  _id: string;
  name: string;
  parentCategoryId: string | null;
  ranking: number;
  createdAt: string;
  updatedAt: string;
}

const CategorySidebar: React.FC = () => {
  const [categories, setCategories] = React.useState<Category[]>([]);

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://api.aicenter.tw/category');
        const data = await response.json();
        const sortedData = data.sort((a: Category, b: Category) => b.ranking - a.ranking);
        setCategories(sortedData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Card className="fixed left-0 top-0 h-full w-64 bg-white shadow-none border-r">
      <CardContent className="p-4">
        <div className="grid grid-cols-1 gap-4">
          {categories.map((category) => (
            <div key={category._id} className="flex flex-col">
              <div className="text-purple-500 mb-2">
                <h3 className="text-xl font-medium">{category.name}</h3>
                <p className="text-sm text-gray-400">*Menu*</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CategorySidebar;
