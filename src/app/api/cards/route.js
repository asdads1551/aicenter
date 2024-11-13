import mongoose from 'mongoose';
import { NextResponse } from 'next/server.js';
import { AIcard } from '@/models/AIcard';  // 使用 @ 别名
import slugify from 'slugify';

// CORS 配置
const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://aicenter.tw',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// 添加這個函數來連接到 MongoDB
async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) return;
  
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(request) {
  console.log('GET /api/cards route hit');
  
  // 檢查是否有特定的查詢參數來觸發簡單的響應
  const { searchParams } = new URL(request.url);
  if (searchParams.get('check') === 'api') {
    console.log('Simple GET /api/cards route hit');
    return NextResponse.json({ message: 'API is working' }, { status: 200, headers: corsHeaders });
  }

  try {
    await connectToDatabase(); // 確保在執行查詢前連接到數據庫
    const cards = await AIcard.find();
    console.log('Cards fetched:', cards);
    return NextResponse.json(cards, { headers: corsHeaders });
  } catch (err) {
    console.error('Error in GET /api/cards:', err);
    return NextResponse.json({ message: err.message }, { status: 500, headers: corsHeaders });
  }
}

export async function POST(request) {
  const cardData = await request.json();

  // 生成 slug
  let slug = slugify(cardData.title, { lower: true, strict: true });
  let uniqueSlug = slug;
  let counter = 1;

  // 確保 slug 唯一
  while (await AIcard.findOne({ slug: uniqueSlug })) {
    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }

  const newCard = new AIcard({
    ...cardData,
    slug: uniqueSlug
  });

  try {
    const savedCard = await newCard.save();
    return NextResponse.json(savedCard, { status: 201, headers: corsHeaders });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 400, headers: corsHeaders });
  }
}

export async function PATCH(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const updateData = await request.json();

  try {
    await connectToDatabase(); // 確保在執行查詢前連接到數據庫
    const updatedCard = await AIcard.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedCard) {
      return NextResponse.json({ message: 'Card not found' }, { status: 404, headers: corsHeaders });
    }
    return NextResponse.json(updatedCard, { headers: corsHeaders });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 400, headers: corsHeaders });
  }
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  try {
    await connectToDatabase(); // 確保在執行查詢前連接到數據庫
    const result = await AIcard.findByIdAndDelete(id);
    if (!result) {
      return NextResponse.json({ message: 'Card not found' }, { status: 404, headers: corsHeaders });
    }
    return NextResponse.json({ message: 'Card deleted successfully' }, { headers: corsHeaders });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 400, headers: corsHeaders });
  }
}