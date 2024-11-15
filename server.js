const express = require('express');
const app = express();

// Railway 会自动设置 PORT，我们应该优先使用它
const PORT = process.env.PORT || 3002;
const HOST = process.env.HOST || '0.0.0.0';

// 打印配置信息
console.log('Starting server with config:', {
  PORT,
  HOST,
  NODE_ENV: process.env.NODE_ENV,
  RAILWAY_ENVIRONMENT: process.env.RAILWAY_ENVIRONMENT
});

// 基本中间件
app.use(express.json());

// 根路由
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Firecrawl API is running',
    endpoints: {
      health: '/health',
      crawl: '/v0/crawl'
    }
  });
});

// 健康检查
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.RAILWAY_ENVIRONMENT || 'development'
  });
});

// 爬虫端点
app.post('/v0/crawl', async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({
        status: 'error',
        message: 'URL is required'
      });
    }
    
    res.json({ 
      status: 'success',
      message: `Received request to crawl: ${url}`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Crawl error:', error);
    res.status(500).json({ 
      status: 'error',
      message: error.message 
    });
  }
});

// 创建服务器
const server = app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
  console.log('Available endpoints:');
  console.log('- GET /');
  console.log('- GET /health');
  console.log('- POST /v0/crawl');
});

// 优雅关闭处理
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Performing graceful shutdown...');
  server.close(() => {
    console.log('Server closed. Exiting process.');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Performing graceful shutdown...');
  server.close(() => {
    console.log('Server closed. Exiting process.');
    process.exit(0);
  });
});

// 未捕获的异常处理
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  server.close(() => {
    process.exit(1);
  });
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
}); 