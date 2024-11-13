'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import { Input } from '@/components/ui/input';

const LoginPage = () => {
  const handleOAuthLogin = (provider: 'google' | 'github') => {
    signIn(provider);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: 處理電子郵件和密碼登入邏輯
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800 pt-16">
      <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">建立帳號</h2>
        <p className="text-center mb-4 text-gray-600">請輸入您的電子郵件以建立帳號</p>
        <div className="flex space-x-4 mb-6">
          {['github', 'google'].map((provider) => (
            <Button
              key={provider}
              onClick={() => handleOAuthLogin(provider as 'google' | 'github')}
              className="w-full bg-white text-gray-800 border border-gray-300 hover:bg-gray-100"
            >
              <img src={`/${provider}-icon.svg`} alt={provider} className="h-5 w-5 inline mr-2" />
              {provider.charAt(0).toUpperCase() + provider.slice(1)}
            </Button>
          ))}
        </div>
        <div className="text-center text-gray-500 mb-4">或繼續使用</div>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="m@example.com"
            className="mb-4 bg-white border-gray-300"
            required
          />
          <Input
            type="password"
            placeholder="密碼"
            className="mb-4 bg-white border-gray-300"
            required
          />
          <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">
            建立帳號
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;