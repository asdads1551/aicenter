'use client';

import React, { useState } from 'react'
import { Button } from 'antd';
import { Search, BookmarkIcon } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import SearchBar from '@/components/SearchBar';
import LoginModal from '@/components/LoginModal';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const pathname = usePathname();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleSearch = (value: string) => {
    console.log('Searching for:', value);
    // TODO: 實作搜尋邏輯
  };

  const navItems = [
    { href: '/categories', label: '分類' },
    { href: '/filter', label: '條件篩選' },
  ];

  // 直接定義為正確的格式
  const tags = [
    { name: 'tag1' },
    { name: 'tag2' },
    { name: 'tag3' }
  ];

  return (
    <>
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className='w-full overflow-hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16'>
            <div className='flex items-center space-x-8'>
              <div className='flex-shrink-0'>
                <Link href='/' className='text-black'>
                  <Image
                    src="/aicenter-logo.png"
                    alt="AI Center"
                    width={100}
                    height={60}
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
              <div className='relative w-64 '>
                <SearchBar  />
              </div>
            </div>
            
            <div className='flex items-center space-x-4'>
              <Link 
                href="/favorites" 
                className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
              >
                <BookmarkIcon className="h-4 w-4" />
                我的收
              </Link>
              <Button 
                className='bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2'
                onClick={() => setIsLoginModalOpen(true)}
              >
                登入
              </Button>
            </div>
          </div>
        </div>
        
        <div className='hidden sm:flex bg-white py-2 border-t border-gray-200'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex items-center space-x-2 overflow-x-auto'>
              {tags.map((tag, index) => (
                <Button 
                  key={index} 
                  className={`rounded-full text-sm font-normal px-4 py-1 ${
                    index === 0 ? 'bg-blue-500 text-white hover:bg-blue-600' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {tag.name}
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
};

export default Navbar;
