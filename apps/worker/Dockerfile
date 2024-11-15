FROM node:20-slim

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy the entire repository first
COPY . .

# Install dependencies and build
WORKDIR /app/apps/api
RUN pnpm install
RUN pnpm run build

# Start worker
CMD ["node", "dist/workers.js"]
