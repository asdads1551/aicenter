'use client';

import React, { useState } from 'react'
import { Avatar, Button } from 'antd';
import { Search, BookmarkIcon, Menu } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import SearchBar from '@/components/SearchBar';
import LoginModal from '@/components/LoginModal';
import { useAuth } from '@/context/useAuth';
import { ApiStatus } from '@/enum';
import { Drawer } from 'antd';
import { useMyPageMenu } from '@/context/useMyPageMenu';
import { Menu as AntdMenu } from 'antd';

// 新增選單項目定義
const menuItems = [
  { icon: '🏠', label: '首頁', href: '/' },
  { icon: '🔍', label: '條件篩選', href: '/filter' },
  { icon: '📑', label: '分類', href: '/categories' },
  { icon: '🔖', label: '我的收藏', href: '/saves' },
  { icon: '👤', label: '個人帳號', href: '/my/profile' },
];

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const pathname = usePathname();
  const {
    isShownLoginPopup,
    showLoginPopup,
    hideLoginPopup,
    user,
  } = useAuth();
  const {
    activeTab: myPageActiveTab,
    handleMenuClick: handleMyPageMenuClick,
    menuItems: myPageMenuItems,
  } = useMyPageMenu();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
              <div className='hidden md:flex space-x-6'>
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
              <div className='hidden md:block relative w-64'>
                <SearchBar />
              </div>
            </div>

            <div className='hidden md:flex items-center space-x-6'>
              <Link
                href="/saves"
                className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
                onClick={() => {
                  if (!user) {
                    showLoginPopup();
                  } else {
                    router.push('/saves');
                  }
                }}
              >
                <BookmarkIcon className="h-4 w-4" />
                我的收藏
              </Link>
              {
                user ? (
                  <div className='flex items-center cursor-pointer' onClick={() => router.push('/my/profile')}>
                    <Avatar src={user.avatarUrl} />
                    <p className='ml-[10px] max-w-[200px] text-ellipsis line-clamp-1'>
                      {user.nickname}
                    </p>
                  </div>
                ) : (
                  <Button
                    className='bg-blue-500 text-white rounded-md px-4 py-2'
                    onClick={showLoginPopup}
                  >
                    登入
                  </Button>
                )
              }
            </div>

            <div className='md:hidden flex items-center'>
              <button
                onClick={() => setIsMenuOpen(true)}
                className='text-gray-600 hover:text-gray-900'
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        <div className='hidden md:flex bg-white py-2 border-t border-gray-200'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex items-center space-x-2 overflow-x-auto'>
              {tags.map((tag, index) => (
                <Button
                  key={index}
                  className={`rounded-full text-sm font-normal px-4 py-1 ${index === 0 ? 'bg-blue-500 text-white hover:bg-blue-600' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                >
                  {tag.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
        {
          myPageActiveTab && (
            <div className="w-full flex lg:hidden">
              <AntdMenu
                onClick={handleMyPageMenuClick}
                selectedKeys={[myPageActiveTab]}
                mode="horizontal"
                items={myPageMenuItems}
                className="w-full bg-while"
              />
            </div>

          )
        }
      </nav>

      <Drawer
        placement="right"
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        width={280}
      >
        {user && (
          <div className="flex flex-col items-center mb-6 pt-4">
            <Avatar 
              src={user.avatarUrl} 
              size={64}
              className="mb-2"
            />
            <h3 className="text-lg font-medium">{user.nickname}</h3>
            <p className="text-gray-500 text-sm">{user.email}</p>
          </div>
        )}
        
        <div className="flex flex-col space-y-4">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              onClick={() => {
                setIsMenuOpen(false);
                if (item.label === '我的收藏' && !user) {
                  showLoginPopup();
                }
              }}
            >
              <span className="mr-3 text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
          
          {!user && (
            <Button
              className="w-full mt-4 bg-blue-500 text-white rounded-md px-4 py-2"
              onClick={() => {
                setIsMenuOpen(false);
                showLoginPopup();
              }}
            >
              登入
            </Button>
          )}
        </div>
      </Drawer>

      <LoginModal
        isOpen={isShownLoginPopup}
        onClose={hideLoginPopup}
      />
    </>
  );
};

export default Navbar;
