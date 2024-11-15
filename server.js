const express = require('express');
const app = express();

// 环境变量配置
const PORT = parseInt(process.env.PORT || '3002', 10);
const HOST = process.env.HOST || '0.0.0.0';

// 打印环境变量
console.log('Starting server with config:', {
  PORT,
  HOST,
  NODE_ENV: process.env.NODE_ENV
});

// 基本中间件
app.use(express.json());

// 请求日志
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// 健康检查
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 爬虫端点
app.post('/v0/crawl', async (req, res) => {
  try {
    const { url } = req.body;
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

// 错误处理
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    status: 'error',
    message: 'Internal Server Error'
  });
});

// 创建服务器实例
const server = app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
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