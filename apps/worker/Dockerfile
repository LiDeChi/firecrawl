FROM node:20-slim

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy package files
COPY apps/api/package*.json ./
COPY apps/api/pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY apps/api/ ./

# Build the application
RUN pnpm run build

# Start worker
CMD ["node", "dist/workers.js"]
