FROM node:20-slim

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy the entire repository
COPY . .

# Install dependencies
WORKDIR /app/apps/api
RUN pnpm install --frozen-lockfile

# Build the application
RUN pnpm run build

# Start worker
CMD ["node", "dist/workers.js"]
