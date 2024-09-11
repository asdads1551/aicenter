import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const port = 5002;

// 使用 CORS 和 JSON 解析中間件
app.use(cors({
  origin: ['https://aicenter.tw', 'http://localhost:3000'], // 添加您的前端域名
  credentials: true
}));
app.use(express.json());

// 連接到 MongoDB
mongoose.connect('mongodb://mongo:k9V4RvQIUz8uobC2Sj0p16JAe57TLgs3@hkg1.clusters.zeabur.com:31399', {
});

/* mongoose.connect('mongodb://localhost:27017/AIcardDB', {
}); */

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// 定義 AIcard Schema
const AIcardSchema = new mongoose.Schema({
  name: String,
  email: String
});

// 創建 AIcard 模型
const AIcard = mongoose.model('AIcard', AIcardSchema);

// 路由：獲取所有 AIcard
app.get('/cards', async (req, res) => {
  try {
    const cards = await AIcard.find().lean();
    // 確保 _id 被轉換為字符串
    const formattedCards = cards.map(card => ({
      ...card,
      _id: card._id.toString()
    }));
    res.json(formattedCards);
  } catch (err) {
    console.error('Error fetching cards:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

// 路由：創建新 AIcard
app.post('/cards', async (req, res) => {
  const { name, email } = req.body;

  const newCard = new AIcard({
    name,
    email
  });

  try {
    const savedCard = await newCard.save();
    res.status(201).json({
      ...savedCard.toObject(),
      _id: savedCard._id.toString()
    });
  } catch (err) {
    console.error('Error creating card:', err);
    res.status(400).json({ message: 'Error creating card', error: err.message });
  }
});

// 路由：更新 AIcard
app.patch('/cards/:id', async (req, res) => {
  try {
    const updatedCard = await AIcard.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCard) return res.status(404).json({ message: 'Card not found' });
    res.json(updatedCard);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 路由：刪除 AIcard
app.delete('/cards/:id', async (req, res) => {
  try {
    const result = await AIcard.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: 'Card not found' });
    res.json({ message: 'Card deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 啟動伺服器
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
