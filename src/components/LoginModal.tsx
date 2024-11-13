'use client';

import React from 'react';
import { X, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* 背景遮罩 */}
      <div 
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />
      
      {/* 登入表單 */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                    bg-white rounded-2xl p-6 w-[400px] z-50 shadow-xl">
        {/* 關閉按鈕 */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>

        {/* 標題 */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-gray-900">登入繼續</h2>
        </div>

        {/* 社群登入按鈕 */}
        <div className="space-y-3">
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-3 h-12"
          >
            <Image src="/google.svg" alt="Google" width={20} height={20} />
            用 Google 帳號登入
          </Button>
          
          <Button 
            variant="outline"
            className="w-full flex items-center justify-center gap-3 h-12 bg-black text-white hover:bg-gray-800"
          >
            <Github className="h-5 w-5" />
            用 Github 帳號登入
          </Button>
        </div>

        {/* 說明文字 */}
        <p className="mt-6 text-center text-sm text-gray-500">
          無法登入？請來信到{' '}
          <a href="mailto:1234567890@gmail.com" className="text-blue-600 hover:text-blue-500">
            1234567890@gmail.com
          </a>
        </p>
      </div>
    </>
  );
};

export default LoginModal; 