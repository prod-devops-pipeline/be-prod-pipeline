# Stage 1: Build the TypeScript application
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files first for better layer caching
COPY package*.json ./

# Install all dependencies (including devDependencies needed for TypeScript build)
RUN npm ci

# Copy application source code
COPY . .

# Build the TypeScript project
# Make sure package.json contains:
# "build": "tsc"
RUN npm run build


# Stage 2: Production image
FROM node:20-alpine AS production

# Set environment
ENV NODE_ENV=production

# Set working directory
WORKDIR /app

# Copy package files
COPY --from=builder /app/package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Copy compiled JavaScript output
COPY --from=builder /app/dist ./dist

# Expose application port (change if your app uses a different port)
EXPOSE 5000

# Start the application
# Ensure your compiled entry file is dist/server.js
CMD ["node", "dist/server.js"]