import { NextResponse } from 'next/server.js';
import { connectToDatabase } from '@/lib/mongodb';
import { AIcard } from '@/models/AIcard';

export async function GET() {
  try {
    await connectToDatabase();
    const slugs = await AIcard.find({}, 'slug').lean();
    return NextResponse.json(slugs.map(card => card.slug));
  } catch (error) {
    console.error('Error fetching slugs:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}