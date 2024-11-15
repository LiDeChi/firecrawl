FROM node:18

WORKDIR /app

# 复制项目文件
COPY . .

# 安装依赖
RUN npm install

# 设置环境变量
ENV PORT=3002
ENV HOST=0.0.0.0
ENV NODE_ENV=production

# 暴露端口
EXPOSE 3002

# 使用 node 直接运行，而不是通过 npm
CMD ["node", "server.js"]
