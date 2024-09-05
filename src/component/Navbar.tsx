'use client';

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Menu, X, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from "@/components/ui/input"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login');
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // 實現搜尋邏輯
  };

  return (
    <nav className="bg-white bg-opacity-75 backdrop-filter backdrop-blur-lg sticky top-0 z-10 border-b border-gray-200">
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center'>
            <div className='flex-shrink-0'>
              <a href='/' className='text-black'>
                <img src="/aicenter-logo.png" alt='Logo' className='h-5 w-30' />
              </a>
            </div>
          </div>
          
          {/* 更新的搜尋框和圓形按鈕 */}
          <div className='hidden md:block flex-1 max-w-xl mx-4'>
            <form onSubmit={handleSearch} className='relative'>
              <Input
                type="text"
                placeholder="搜尋工具..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-10 py-1.5 text-sm rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-2.5 flex items-center pointer-events-none">
                <Search className="h-3.5 w-3.5 text-gray-400" />
              </div>
              <Button 
                type="submit" 
                className="absolute right-1.5 top-1/2 transform -translate-y-1/2 p-0 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-6 h-6 flex items-center justify-center"
              >
                <Search className="h-3 w-3" />
              </Button>
            </form>
          </div>
          
          <div className='hidden md:block'>
            <div className='ml-4 flex items-center space-x-4'>
              <Button variant="outline" onClick={handleLoginClick}>
                登入
              </Button>
            </div>
          </div>
          <div className='md:hidden'>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
            >
              <span className='sr-only'>Open main menu</span>
              {isOpen ? (
                <X className='block h-6 w-6' aria-hidden='true' />
              ) : (
                <Menu className='block h-6 w-6' aria-hidden='true' />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
          {/* 在移動端菜單中更新搜尋輸入框和圓形按鈕 */}
          <form onSubmit={handleSearch} className='relative mb-3'>
            <Input
              type="text"
              placeholder="搜尋工具..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-10 py-1.5 text-sm rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 left-2.5 flex items-center pointer-events-none">
              <Search className="h-3.5 w-3.5 text-gray-400" />
            </div>
            <Button 
              type="submit" 
              className="absolute right-1.5 top-1/2 transform -translate-y-1/2 p-0 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-6 h-6 flex items-center justify-center"
            >
              <Search className="h-3 w-3" />
            </Button>
          </form>
          <Link href="/login" className='block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50' onClick={handleLoginClick}>
            登入
          </Link>
          <Link href="/register" className='block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50'>
            註冊
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;