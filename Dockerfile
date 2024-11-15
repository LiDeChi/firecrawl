FROM node:18

WORKDIR /app

# 先复制整个项目
COPY . .

# 然后再运行 npm install
RUN npm install

# 设置环境变量
ENV PORT=3002
ENV HOST=0.0.0.0
ENV REDIS_URL=redis://redis:6379
ENV REDIS_RATE_LIMIT_URL=redis://redis:6379
ENV PLAYWRIGHT_MICROSERVICE_URL=http://playwright-service:3000/html
ENV USE_DB_AUTHENTICATION=false

# 暴露端口
EXPOSE 3002

# 启动命令
CMD ["npm", "start"]
