'use client';
import { useState } from "react";
import Categories from "@/components/Categories";
import Category_sidebar from "@/components/Category_sidebar";
import CardWithDisplay from "@/components/CardWithDisplay";
import card from "antd/es/card";

interface CategoryItem {
  name: string;
  subItems?: string[];
}

const mockCategories = {
  title: "分類",
  layouts: [
    {
      title: "展開子分類",
      subtitle: "*Menu*",
      items: [
        {
          name: "文案生成",
          subItems: ["子項目1", "子項目2", "子項目3"]
        },
        {
          name: "圖像生成",
          subItems: ["AI繪圖", "照片編輯", "圖像優化"]
        },
        {
          name: "影像生成",
          subItems: ["視頻製作", "動畫生成", "特效處理"]
        },
        {
          name: "剪接工具",
          subItems: ["視頻剪輯", "音頻剪輯", "轉場效果"]
        },
        // ... 其他項目
      ]
    },
    // ... 其他 layouts
  ]
};

export default function CategoriesPage() {
  const [expandedItems, setExpandedItems] = useState<{[key: string]: boolean}>({});
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");

  const toggleItem = (layoutIndex: number, itemName: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [`${layoutIndex}-${itemName}`]: !prev[`${layoutIndex}-${itemName}`]
    }));
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubCategory("");
  };

  const handleSubCategorySelect = (subCategory: string) => {
    setSelectedSubCategory(subCategory);
  };

    function handleLoginRequired(): void {
        throw new Error("Function not implemented.");
    }

  return (
    <div className="flex">
      <div className="w-[280px] border-r">
        {mockCategories.layouts.map((layout, layoutIndex) => (
          <div key={layoutIndex} className="flex flex-col p-4">
            <h2 className="text-xl font-bold text-purple-500 mb-1">{layout.title}</h2>
            <p className="text-gray-400 text-sm mb-3">{layout.subtitle}</p>
            <div className="space-y-2">
              {layout.items.map((item: CategoryItem, itemIndex) => (
                <div key={itemIndex} className="flex flex-col">
                  <div 
                    onClick={() => {
                      toggleItem(layoutIndex, item.name);
                      handleCategorySelect(item.name);
                    }}
                    className={`px-4 py-2.5 rounded-md cursor-pointer flex justify-between items-center text-base w-full
                      ${selectedCategory === item.name ? 'bg-blue-100' : 'bg-blue-50 hover:bg-blue-100'}`}
                  >
                    <span>{item.name}</span>
                    <span className="transform transition-transform text-sm ml-3">
                      {expandedItems[`${layoutIndex}-${item.name}`] ? '▼' : '▶'}
                    </span>
                  </div>
                  {expandedItems[`${layoutIndex}-${item.name}`] && item.subItems && (
                    <div className="ml-3 mt-1.5 space-y-2">
                      {item.subItems.map((subItem, subIndex) => (
                        <div 
                          key={subIndex}
                          onClick={() => handleSubCategorySelect(subItem)}
                          className={`px-4 py-2.5 rounded-md cursor-pointer text-base w-full
                            ${selectedSubCategory === subItem ? 'bg-purple-100' : 'bg-purple-50 hover:bg-purple-100'}`}
                        >
                          {subItem}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-purple-500 mb-6">
          {selectedCategory} {selectedSubCategory && `> ${selectedSubCategory}`}
        </h1>
        <CardWithDisplay 
              _id={""} title={""} description={""} imageUrl={""} saveCount={0} {...card}
              commentCount={0}
              isLoggedIn={false}
              onLoginRequired={handleLoginRequired}  
        />
      </div>
    </div>
  );
}