# Build frontend
FROM node:18-alpine AS frontend
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# Build backend
FROM node:18-alpine AS backend
WORKDIR /app
COPY backend/package*.json ./
RUN npm install
COPY backend/ .

# Final image
FROM node:18-alpine
WORKDIR /app

# Copy backend files
COPY --from=backend /app /app

# Copy frontend build into public folder or dist
COPY --from=frontend /app/dist /app/frontend-dist

ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "server.js"]















# # Use Node.js base image
# FROM node:18

# # Set working directory
# WORKDIR /app

# # Copy package.json and install dependencies
# COPY package*.json ./
# RUN npm install

# # Copy the rest of your app
# COPY . .

# # Expose port (adjust to your app's port)
# EXPOSE 3000

# # Run your app
# CMD ["npm", "start"]

