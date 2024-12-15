import React from 'react';
import { ShareAltOutlined, MoreOutlined } from '@ant-design/icons';

interface ToolPageProps {
  // Add necessary props
}

const ToolCard = ({
  image,
  title,
  tags,
  views,
  likes,
  onShare,
  onMore
}: {
  image: string;
  title: string;
  tags: string[];
  views: number;
  likes: number;
  onShare: () => void;
  onMore: () => void;
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
        <img 
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="space-y-2">
        <h3 className="font-semibold text-lg">{title}</h3>
        
        <div className="flex gap-2">
          {tags.map(tag => (
            <span key={tag} className="px-2 py-1 bg-gray-100 rounded-full text-sm">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span>{views} 觀看</span>
            <span>{likes} 讚</span>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={onShare}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ShareAltOutlined style={{ fontSize: '16px' }} />
            </button>
            <button 
              onClick={onMore}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <MoreOutlined style={{ fontSize: '16px' }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ToolPage: React.FC<ToolPageProps> = () => {
  return (
    <div className="tool-page">
      {/* Header Section */}
      <header>
        <h1>healingjourney</h1>
        <div className="stats">
          <span className="rating">⭐⭐⭐⭐⭐</span>
          <span className="likes">999</span>
          <span className="views">999</span>
        </div>
      </header>

      {/* Tool Description */}
      <section className="description">
        <p>工具介紹內容...</p>
        <div className="metadata">
          <span>發佈時間: 2024年10月10日</span>
        </div>
      </section>

      {/* Video Gen Grid */}
      <section className="video-gen-grid">
        {/* Repeat this for each video gen item */}
        <div className="video-gen-item">
          <img src="/video-gen-thumbnail.png" alt="Video Gen" />
          <h3>Video Gen</h3>
          <div className="stats">
            <span>999</span>
            <span>999</span>
          </div>
        </div>
      </section>

      {/* Tool Details */}
      <section className="product-details">
        <h2>產品介紹</h2>
        {/* Add product details content */}
      </section>

      {/* Reviews Section */}
      <section className="reviews">
        <h2>評論區</h2>
        <div className="review-stats">
          <span className="rating">4.5</span>
          {/* Add review items */}
        </div>
      </section>

      {/* Related Products */}
      <section className="related-products">
        <h2>相似推薦</h2>
        {/* Add related products grid */}
      </section>
    </div>
  );
};

export default ToolPage;
