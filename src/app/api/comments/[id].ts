import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;
console.log(uri);
if (!uri) {
  throw new Error('MONGODB_URI is not defined in the environment variables');
}
const client = new MongoClient(uri);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      await client.connect();
      const database = client.db('MessageBoard');
      const comments = database.collection('messages');

      const { id } = req.query;
      const result = await comments.find({ cardId: new ObjectId(id as string) }).sort({ createdAt: -1 }).toArray();

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching comments', error });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}