const express = require('express');
const app = express();

// 环境变量配置
const PORT = process.env.PORT || 3002;
const HOST = process.env.HOST || '0.0.0.0';

// JSON 解析中间件
app.use(express.json());

// 健康检查端点
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// 爬虫端点
app.post('/v0/crawl', async (req, res) => {
  try {
    const { url } = req.body;
    // 这里添加实际的爬虫逻辑
    res.json({ 
      status: 'success',
      message: `Received request to crawl: ${url}`
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error',
      message: error.message 
    });
  }
});

// 启动服务器
app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
}); 