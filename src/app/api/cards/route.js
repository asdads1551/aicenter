import { AIcard } from '../../../models/AIcard';
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

export async function GET() {
  try {
    const cards = await AIcard.find();
    return NextResponse.json(cards, { headers: corsHeaders });
  } catch (err) {
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