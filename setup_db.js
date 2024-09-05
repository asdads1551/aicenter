const { MongoClient } = require('mongodb');

// 連接 URL
const url = 'mongodb://localhost:27017';

// 數據庫名稱
const dbName = 'messageBoard';

async function setupMessageDatabase() {
  const client = new MongoClient(url);

  try {
    // 連接到 MongoDB
    await client.connect();
    console.log('成功連接到 MongoDB');

    // 獲取數據庫引用
    const db = client.db(dbName);

    // 創建 messages 集合
    await db.createCollection('messages');
    console.log('成功創建 messages 集合');

    // 創建索引以提高查詢效率
    await db.collection('messages').createIndex({ createdAt: -1 });
    console.log('成功創建索引');

    // 插入一條測試數據
    const result = await db.collection('messages').insertOne({
      author: '測試用戶',
      content: '這是一條測試留言',
      createdAt: new Date()
    });
    console.log('插入測試數據成功，ID:', result.insertedId);

  } finally {
    // 關閉連接
    await client.close();
    console.log('數據庫連接已關閉');
  }
}

setupMessageDatabase().catch(console.error);