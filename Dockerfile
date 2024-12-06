# Build Stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production Stage
FROM node:18-alpine AS production

# Optional: run with non-root user for better security
USER node

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Copy any additional necessary files
COPY --from=builder /app/nest-cli.json ./

# Environment variables
ENV NODE_ENV production
ENV PORT 3000
ENV HOST 0.0.0.0

# Expose port
EXPOSE 3000

# Start the server using production build
CMD [ "node", "dist/main.js" ]