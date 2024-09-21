import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { getCards, createCard, updateCard, deleteCard } from './src/app/api/cards/route';

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
export const AIcard = mongoose.model('AIcard', AIcardSchema);


// 路由：獲取所有 AIcard
app.get('/api/cards', getCards);

// 路由：創建新 AIcard
app.post('/api/cards', createCard);

// 路由：更新 AIcard
app.patch('/api/cards/:id', updateCard);

// 路由：刪除 AIcard
app.delete('/api/cards/:id', deleteCard);

// 啟動伺服器
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

