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
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo 和版權聲明 - 置頂 */}
        <div className="flex justify-between items-center py-8">
          <div>
            <Image src="/aicenter-logo.png" alt='AI Center Logo' width={120} height={20} />
          </div>
          <div className="text-sm text-gray-500">
            © AI center 2024
          </div>
        </div>

        {/* 主要內容區塊 */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 py-12">
          {/* 產品區塊 */}
          <div>
            <h3 className="font-semibold text-xl mb-6">關於</h3>
            <ul className="space-y-4">
              <li><Link href="/about" className="hover:underline">關於我們</Link></li>
              <li><Link href="/feedback" className="hover:underline">意見反映</Link></li>
            </ul>
          </div>

        {/* 法律文件區塊 */}
          <div>
            <h3 className="font-semibold text-xl mb-6">法律文件</h3>
            <ul className="space-y-4">
              <li><Link href="/service" className="hover:underline">使用者條款</Link></li>
              <li><Link href="/privacy" className="hover:underline">隱私權政策</Link></li>
            </ul>
          </div>


        </div>
      </div>
    </footer>
  );
}

export default Footer