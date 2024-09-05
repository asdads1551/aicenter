import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error('MONGODB_URI is not defined in the environment variables');
  throw new Error('MONGODB_URI is not defined in the environment variables');
} else {
  console.log('MONGODB_URI:', uri);
}

const client = new MongoClient(uri);

export async function POST(request: NextRequest) {
  console.log('POST request received');
  try {
    await client.connect();
    const database = client.db('MessageBoard');
    const comments = database.collection('messages');

    const { content, cardId } = await request.json();
    console.log('Request body:', { content, cardId });

    const result = await comments.insertOne({
      content,
      cardId: new ObjectId(cardId),
      createdAt: new Date(),
    });

    console.log('Comment inserted:', result.insertedId);
    return NextResponse.json({ message: 'Comment created successfully', id: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json({ message: 'Error creating comment' }, { status: 500 });
  } finally {
    await client.close();
  }
}

export async function GET(request: NextRequest) {
  console.log('GET request received');
  try {
    await client.connect();
    const database = client.db('MessageBoard');
    const comments = database.collection('messages');

    const { searchParams } = new URL(request.url);
    const cardId = searchParams.get('cardId');

    if (!cardId) {
      return NextResponse.json({ message: 'CardId is required' }, { status: 400 });
    }

    const result = await comments.find({ cardId: new ObjectId(cardId) }).sort({ createdAt: -1 }).toArray();

    console.log('Comments fetched:', result);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ message: 'Error fetching comments' }, { status: 500 });
  } finally {
    await client.close();
  }
}