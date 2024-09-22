import { AIcard } from '../../../../models/AIcard';
import { NextResponse } from 'next/server';

// CORS 配置
const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://aicenter.tw',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

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
    const cards = await AIcard.find();
    console.log('Cards fetched:', cards);
    return NextResponse.json(cards, { headers: corsHeaders });
  } catch (err) {
    console.error('Error in GET /api/cards:', err);
    return NextResponse.json({ message: err.message }, { status: 500, headers: corsHeaders });
  }
}

export async function POST(request) {
  const { name } = await request.json();

  const newCard = new AIcard({
    name
    // 添加其他字段如果需要
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
    const result = await AIcard.findByIdAndDelete(id);
    if (!result) {
      return NextResponse.json({ message: 'Card not found' }, { status: 404, headers: corsHeaders });
    }
    return NextResponse.json({ message: 'Card deleted successfully' }, { headers: corsHeaders });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 400, headers: corsHeaders });
  }
}