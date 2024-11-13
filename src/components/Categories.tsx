"use client";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

interface CategoriesProps {
  onSelectCategory: (category: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({ onSelectCategory }) => {
  const categories = ["科技", "文字生成", "技術"]; // 你的类别

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {categories.map((category) => (
          <NavigationMenuItem key={category}>
            <NavigationMenuTrigger onClick={() => onSelectCategory(category)}>
              {category}
            </NavigationMenuTrigger>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Categories;
