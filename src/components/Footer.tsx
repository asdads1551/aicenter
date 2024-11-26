import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const SocialIcon = ({ href, d, viewBox = "0 0 24 24", ariaLabel }: {
  href: string;
  d: string;
  viewBox?: string;
  ariaLabel: string;
}) => (
  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox={viewBox} fill="currentColor">
      <path d={d} />
    </svg>
  </a>
);

const Footer = () => {
  return (
    <footer className="bg-white py-8 px-4 sm:px-6 lg:px-8 border-t pt-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center">
            <Image src="/aicenter-logo.png" alt='AI Center Logo' width={120} height={20} />
          </div>
          
          <div className="flex space-x-20">
            <div>
              <h3 className="font-semibold mb-4">關於</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:underline">關於我們</Link></li>
                <li><Link href="/joinus" className="hover:underline">加入我們</Link></li>
                <li><Link href="/feedback" className="hover:underline">意見反饋</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">法律文件</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/service" className="hover:underline">服務條款</Link></li>
                <li><Link href="/privacy" className="hover:underline">隱私權政策</Link></li>
              </ul>
            </div>
          </div>

          <div className="flex space-x-4 text-gray-500">
            <SocialIcon 
              href="https://www.facebook.com/AIcenter" 
              d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
              ariaLabel="Facebook"
            />
            <SocialIcon 
              href="https://twitter.com/AIcenter" 
              d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
              ariaLabel="Twitter"
            />
          </div>
        </div>
        
        <div className="border-t pt-4">
          <div className="text-sm text-gray-500 text-center">
            © AI center 2024
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer