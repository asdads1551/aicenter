import { NextResponse } from 'next/server.js';
import clientPromise from '@/lib/mongodb';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;
  const client = await clientPromise;
  const db = client.db("your_database_name");
  
  try {
    const tool = await db.collection("tools").findOne({ slug: slug });
    
    if (!tool) {
      return NextResponse.json({ error: 'Tool not found' }, { status: 404 });
    }

    return NextResponse.json(tool);
  } catch (error) {
    console.error('Error fetching tool:', error);
    return NextResponse.json({ error: 'Failed to fetch tool details' }, { status: 500 });
  }
}