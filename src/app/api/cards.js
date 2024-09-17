import { AIcard } from '../../models/AIcard';
import Cors from 'cors';

// 初始化 CORS 中間件
const cors = Cors({
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  origin: 'https://aicenter.tw', // 允許的域名
  optionsSuccessStatus: 200, // 一些舊版瀏覽器 (IE11, various SmartTVs) 在 204 上卡住
});

// CORS 中間件包裝函數
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  // 運行 CORS 中間件
  await runMiddleware(req, res, cors);

  // 根據 HTTP 方法處理請求
  switch (req.method) {
    case 'GET':
      try {
        const cards = await AIcard.find();
        res.status(200).json(cards);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
      break;

    case 'POST':
      // POST 處理邏輯
      break;

    case 'PATCH':
      // PATCH 處理邏輯
      break;

    case 'DELETE':
      // DELETE 處理邏輯
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}