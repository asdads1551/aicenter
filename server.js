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
mongoose.connect(process.env.MONGODB_URI, {
});


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
app.get('/api/cards', async (req, res) => {
  try {
    const cards = await AIcard.find();
    res.json(cards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 路由：創建新 AIcard
app.post('/api/cards', async (req, res) => {
  const { name, category, imageUrl, shareCount, viewCount, savedCount } = req.body;

  const newCard = new AIcard({
    name
  });

  try {
    const savedCard = await newCard.save();
    res.status(201).json(savedCard);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 路由：更新 AIcard
app.patch('/api/cards/:id', async (req, res) => {
  try {
    const updatedCard = await AIcard.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCard) return res.status(404).json({ message: 'Card not found' });
    res.json(updatedCard);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 路由：刪除 AIcard
app.delete('/api/cards/:id', async (req, res) => {
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
