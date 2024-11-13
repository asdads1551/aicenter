import { NextResponse } from 'next/server.js';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  const client = await clientPromise;
  const db = client.db("your_database_name");
  
  try {
    const cards = await db.collection("tools").find({}).toArray();
    return NextResponse.json(cards);
  } catch (error) {
    console.error('Error fetching cards:', error);
    return NextResponse.json({ error: 'Failed to fetch cards' }, { status: 500 });
  }
}
