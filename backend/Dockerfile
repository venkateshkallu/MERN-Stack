FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8888

CMD ["npm", "start"]


# # Use Node.js base image
# FROM node:20-alpine

# # Set working directory
# WORKDIR /app

# # Copy all backend code
# COPY . .

# # Install dependencies
# RUN npm install

# RUN npm install express


# # Run backend server
# CMD ["npm", "start"]


# # Use official Node.js image
# FROM node:20-alpine

# # Set working directory
# WORKDIR /usr/src/app

# # Copy package*.json files first to leverage Docker cache
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy all source code
# COPY . .

# # Expose port
# EXPOSE 5000

# # Start the server
# CMD ["node", "src/server.js"]
