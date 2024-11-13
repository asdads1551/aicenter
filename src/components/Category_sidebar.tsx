'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface SubCategory {
  name: string;
  items: string[];
}

interface CategorySidebarProps {
  title: string;
  subCategories: SubCategory[];
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({ title, subCategories = [] }) => {
  const [expandedCategories, setExpandedCategories] = React.useState<Set<number>>(new Set());

  const toggleCategory = (index: number) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <Card className="fixed left-0 top-0 h-full w-64 bg-white shadow-none border-r">
      <CardContent className="p-4">
        <div className="grid grid-cols-1 gap-4">
          {(subCategories || []).map((subCategory, index) => (
            <div key={index} className="flex flex-col">
              <div className="text-purple-500 mb-2">
                <h3 className="text-xl font-medium">{subCategory.name}</h3>
                <p className="text-sm text-gray-400">*Menu*</p>
              </div>
              <div className="space-y-2">
                {subCategory.items.map((item, itemIndex) => (
                  <Button
                    key={itemIndex}
                    variant="ghost"
                    className="w-full justify-between text-left bg-blue-50 hover:bg-blue-100 h-auto py-2"
                  >
                    {item}
                    {itemIndex > 2 && (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CategorySidebar;
