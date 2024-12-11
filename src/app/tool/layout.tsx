export default function ToolLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main content container */}
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Product header section */}
        <div className="mb-8">
          {children}
        </div>

        {/* Product info section - NEW */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">產品介紹</h2>
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">使用影片說明</h3>
              {/* Video explanation content */}
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">使用說明與規則</h3>
              {/* Usage rules content */}
            </div>
          </div>
        </section>

        {/* Rating section - Updated */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">產品評分</h2>
          <div className="flex items-center mb-4">
            <div className="text-4xl font-bold mr-4">4.5</div>
            {/* Star rating component */}
          </div>
        </section>

        {/* Reviews section - Updated */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">討論區</h2>
          <div className="space-y-4">
            {/* Review items will go here */}
          </div>
        </section>

        {/* Related products section - Updated */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">相似推薦</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Related product cards will go here */}
          </div>
        </section>
      </main>
    </div>
  )
}
