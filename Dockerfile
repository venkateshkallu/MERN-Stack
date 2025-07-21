# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your app
COPY . .

# Expose port (adjust to your app's port)
EXPOSE 3000

# Run your app
CMD ["npm", "start"]
