## Dockerize Frontend and Backend

In this step, we will create separate Dockerfiles for the **frontend** and **backend** of a MERN app.

Each service will run in its own container.

---

## 🖥️ Backend Dockerfile (Node.js + Express)

Create a `Dockerfile` inside the `backend/` folder.

```Dockerfile
# Use Node.js base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy all backend code
COPY . .

# Install dependencies
RUN npm install

# Run backend server
CMD ["npm", "start"]
```

### Explanation

* `node:20-alpine`: Lightweight Node.js image.
* `WORKDIR /app`: Creates a working directory.
* `COPY . .`: Copies all files to container.
* `npm install`: Installs all packages.
* `CMD`: Starts the Express app.

---

## 🌐 Frontend Dockerfile (React)

Create a `Dockerfile` inside the `frontend/` folder.

```Dockerfile
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

# Serve the React app
CMD ["serve", "-s", "dist", "-l", "80"]
```

### Explanation

* `npm run build`: Builds React static files.
* `serve`: Lightweight static file server.
* `CMD`: Runs server on port 80.
---
✅ Final Notes

You now have a Dockerfile for both backend and frontend.

This allows each part to be built into its own Docker image.

---


<!-- ## 🚀 Step 1: Dockerising Frontend and Backend of MERN Stack -->

<!-- Dockerising your **frontend (React)** and **backend (Node.js/Express)** makes your app consistent across environments and easier to deploy.

In this blog, we’ll walk you through creating Dockerfiles for both your frontend and backend, assuming MongoDB is managed separately or already running.

---

## 🧱 Folder Structure

Your project should look like this:

```

your-project/
├── backend/
│   ├── Dockerfile
│   ├── package.json
├── frontend/
│   ├── Dockerfile
│   ├── package.json

````

---

## 🐳 Dockerising the Backend (Express + Node.js)

Go to the `backend/` folder and create a `Dockerfile`:

**`backend/Dockerfile`**

```Dockerfile
# Use Node.js LTS version as the base image
FROM node:18

# Create app directory inside container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all backend source code
COPY . .

# Expose the port the backend listens on
EXPOSE 5000

# Command to run the app
CMD ["npm", "start"]
````

> ✅ Tip: Make sure your Express app is set to run on `process.env.PORT || 5000`.

---

## ⚛️ Dockerising the Frontend (React with Vite or Create React App)

Go to the `frontend/` folder and create a `Dockerfile`.

If you're using **Vite**, this Dockerfile works perfectly.

**`frontend/Dockerfile`**

```Dockerfile
# Build stage
FROM node:18 as build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code and build the app
COPY . .
RUN npm run build

# Serve with Nginx
FROM nginx:alpine

# Copy the production build from previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose default port
EXPOSE 80

# Run Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
```

> 📝 If you're using **Create React App**, replace `dist` with `build` in the line:
>
> ```Dockerfile
> COPY --from=build /app/build /usr/share/nginx/html
> ```

---

## 🔍 Test Docker Builds (Optional)

To test each Dockerfile separately:

**Backend:**

```bash
cd backend
docker build -t my-backend .
docker run -p 5000:5000 my-backend
```

**Frontend:**

```bash
cd frontend
docker build -t my-frontend .
docker run -p 3000:80 my-frontend
```
---

## 📦 Summary

| Part     | Dockerised         | Port                |
| -------- | ------------------ | ------------------- |
| Backend  | ✅ Node/Express     | 5000                |
| Frontend | ✅ React/Vite/Nginx | 80 (→ 3000 on host) |

--- -->



<!-- 
---
title: Dockerizing a MERN Stack Application (MongoDB, Express, React, Node.js)
slug: /blogs/dockerise-mern
date: 2025-07-18
authors: [venkatesh]
tags: [docker, mern, fullstack, react, express, mongodb, devops]
---
## 🚀 Dockerizing a MERN Stack Project (MongoDB, Express, React, Node.js)

In this guide, we'll walk through the step-by-step process to Dockerize your **MERN Stack Application** — making it portable, easy to deploy, and ready for production.

This tutorial is beginner-friendly and assumes you've already cloned or built your MERN app locally.

---

## 🧱 What is the MERN Stack?

- **M**ongoDB: NoSQL database
- **E**xpress.js: Backend web framework
- **R**eact.js: Frontend library
- **N**ode.js: Runtime for the backend

---

## 🗂 Project Folder Structure

We assume your project is structured like this:

```

your-project/
├── backend/        # Express.js backend
├── frontend/       # React.js frontend
├── docker-compose.yml

````

---

## 🐳 Step 1: Dockerize the Backend (Express.js)

Create a `Dockerfile` inside your `backend/` folder.

**`backend/Dockerfile`**:

```Dockerfile
# Use Node.js as base image
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source code
COPY . .

# Expose port
EXPOSE 5000

# Run the backend
CMD ["npm", "start"]
````

> ✅ Make sure your Express app uses:
>
> ```js
> const PORT = process.env.PORT || 5000;
> ```

---

## ⚛️ Step 2: Dockerize the Frontend (React with Vite or CRA)

Create a `Dockerfile` inside your `frontend/` folder.

**`frontend/Dockerfile`**:

```Dockerfile
# Build stage
FROM node:18 as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Serve the build using Nginx
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

> 📦 If you're using **Create React App**, replace `dist` with `build`.

---

## 🛠️ Step 3: Create docker-compose.yml

This file defines and connects all three services: MongoDB, backend, and frontend.

**`docker-compose.yml`** (root level):

```yaml
version: '3.8'

services:
  mongo:
    image: mongo
    container_name: mongo
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

  backend:
    build: ./backend
    container_name: backend
    ports:
      - "5000:5000"
    depends_on:
      - mongo
    environment:
      - MONGO_URI=mongodb://mongo:27017/your-db
    restart: always

  frontend:
    build: ./frontend
    container_name: frontend
    ports:
      - "3000:80"
    depends_on:
      - backend
    restart: always

volumes:
  mongo-data:
```

---

## 🌐 Step 4: Enable CORS in Backend

Inside `backend/index.js` or `server.js`:

```js
const cors = require("cors");
app.use(cors());
```

---

## 🔌 Step 5: Connect Backend to MongoDB

In your backend `.env` or config:

```env
MONGO_URI=mongodb://mongo:27017/your-db
```

Make sure you're using `mongoose.connect(process.env.MONGO_URI)` or similar.

---

## 🧪 Step 6: Run Everything

In your root project folder:

```bash
docker-compose up --build
```

Docker will:

* Spin up a MongoDB container
* Build and run the backend on `http://localhost:5000`
* Build and serve the frontend on `http://localhost:3000`

---

## ✅ Test URLs

* **Frontend (React)**: [http://localhost:3000](http://localhost:3000)
* **Backend API (Express)**: [http://localhost:5000/api/](http://localhost:5000/api/)


---

## 📘 Summary

You’ve just containerized your entire MERN stack app with a single command using Docker! This makes your app ready for production, staging, or team development environments.

### ✅ What We Did:

* Dockerized **React frontend** with Nginx
* Dockerized **Node/Express backend**
* Spun up a **MongoDB database**
* Used **docker-compose** to manage services

--- --> 

