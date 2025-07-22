# Use Node.js base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy frontend code
COPY . .

# Install and build React app
RUN npm install && npm run build

# Install serve (for static file hosting)
RUN npm install -g serve

RUN npm install react react-dom
RUN npm install --save-dev vite


# Serve the React app
CMD ["serve", "-s", "dist", "-l", "80"]
# # Build stage
# FROM node:20-alpine as build
# WORKDIR /usr/src/app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# # Serve stage
# FROM nginx:alpine
# COPY --from=build /usr/src/app/dist /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
