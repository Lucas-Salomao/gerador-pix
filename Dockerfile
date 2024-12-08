# Use the official Node.js runtime as the base image
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production Stage
FROM node:18-alpine AS production

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/nest-cli.json ./

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8080
ENV HOST=0.0.0.0

# Cloud Run will dynamically assign a port, so we use 8080 by default
EXPOSE 8080

# Run as root user (Cloud Run requirement)
USER root

# Ensure proper permissions
RUN chown -R node:node /app

# Switch to node user (optional, but good practice)
USER node

# Start the server
CMD [ "node", "dist/main.js" ]