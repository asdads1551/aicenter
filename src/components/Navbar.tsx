'use client';

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Search, BookmarkIcon } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Input } from "@/components/ui/input"
import LoginModal from '@/components/LoginModal';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const pathname = usePathname();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // 实现搜索逻辑
  };

  const navItems = [
    { href: '/', label: '首頁' },
    { href: '/categories', label: '分類' },
    { href: '/filter', label: '條件篩選' },
  ];

  const tags = ['熱門', '最新', '推薦', '推薦', '推薦', '推薦', '推薦', '推薦'];

  return (
    <>
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16'>
            <div className='flex items-center space-x-8'>
              <div className='flex-shrink-0'>
                <Link href='/' className='text-black'>
                  <Image
                    src="/aicenter-logo.png" // 请替换为实际的图片路径
                    alt="AI Center"
                    width={100} // 调整宽度以适应你的设计
                    height={60} // 调整高度以适应你的设计
                    className="object-contain"
                  />
                </Link>
              </div>
              <div className='flex space-x-6'>
                {navItems.map((item) => (
                  <Link 
                    key={item.href} 
                    href={item.href} 
                    className={`text-gray-700 hover:text-gray-900 ${pathname === item.href ? 'font-semibold' : ''}`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <form onSubmit={handleSearch} className='relative'>
                <Input
                  type="text"
                  placeholder="輸入關鍵字"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pr-10 rounded-full text-sm border-gray-300"
                />
                <Button type="submit" variant="ghost" size="icon" className="absolute right-0 top-0 h-full">
                  <Search className="h-4 w-4 text-gray-400" />
                </Button>
              </form>
            </div>
            
            <div className='flex items-center space-x-4'>
              <Link 
                href="/favorites" 
                className="text-gray-600 hover:text-gray-900"
              >
                我的收藏
              </Link>
              <Button 
                variant="default" 
                className='bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2'
                onClick={() => setIsLoginModalOpen(true)}
              >
                登入
              </Button>
            </div>
          </div>
        </div>
        
        {/* 标签栏 */}
        <div className='bg-white py-2 border-t border-gray-200'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex items-center space-x-2 overflow-x-auto'>
              {tags.map((tag, index) => (
                <Button 
                  key={index} 
                  variant={index === 0 ? "default" : "ghost"} 
                  className={`rounded-full text-sm font-normal px-4 py-1 ${
                    index === 0 ? 'bg-blue-500 text-white hover:bg-blue-600' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
}

export default Navbar;
