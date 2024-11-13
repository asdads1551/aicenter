import Image from 'next/image';

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-white">
      {/* 左側導航欄 */}
      <div className="w-64 bg-gray-50 border-r">
        <div className="p-4">
          <div className="text-blue-500 mb-4">我的帳號</div>
          <nav>
            <ul className="space-y-2">
              <li className="text-gray-700">留言紀錄</li>
              {/* 可以添加更多導航項目 */}
            </ul>
          </nav>
        </div>
      </div>

      {/* 右側內容區 */}
      <div className="flex-1 p-8">
        <div className="max-w-3xl mx-auto">
          {/* 個人資料頭部 */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden">
                <Image
                  src="/path-to-avatar.jpg"
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h1 className="text-2xl font-semibold">Alice Huang</h1>
                <p className="text-gray-600">1234567890@gmail.com</p>
              </div>
            </div>
          </div>

          {/* 表單區域 */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                顯示名稱
              </label>
              <div className="flex items-center justify-between">
                <div>Alice Huang</div>
                <button className="px-4 py-2 text-sm bg-white border rounded-md hover:bg-gray-50">
                  修改
                </button>
              </div>
            </div>
            {/* 可以添加更多表單項目 */}
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
