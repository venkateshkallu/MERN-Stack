## 🧩 Create Docker Compose for MongoDB and MERN App

In this blog, we will write a `docker-compose.yml` file to run:

* MongoDB database
* Express backend
* React frontend

All together. With one command.

---

## 📁 Folder Structure

We assume your project looks like this:

```
your-project/
├── backend/
├── frontend/
└── docker-compose.yml
```

---

## 🔧 Step 1: MongoDB Service

We use the official MongoDB image.

```yaml
mongo:
  image: mongo:7.0
  ports:
    - "27017:27017"
  environment:
    MONGO_INITDB_ROOT_USERNAME: root
    MONGO_INITDB_ROOT_PASSWORD: example
  volumes:
    - mongo_data:/data/db
```

* `image`: Uses the latest MongoDB.
* `ports`: Exposes MongoDB locally.
* `environment`: Sets username and password.
* `volumes`: Saves data across container restarts.

---

## 🔧 Step 2: Backend Service (Express API)

```yaml
backend:
  build:
    context: ./backend
    dockerfile: Dockerfile
  ports:
    - "5000:5000"
  environment:
    - DATABASE=mongodb://mongo:27017/idurar_crm_db
    - JWT_SECRET=mysecretkey123
  depends_on:
    - mongo
```

* `build`: Builds from the `./backend` folder.
* `ports`: Maps container port 5000 to host.
* `environment`: Passes MongoDB URI and secret.
* `depends_on`: Waits for MongoDB.

---

## 🔧 Step 3: Frontend Service (React UI)

```yaml
frontend:
  build:
    context: ./frontend
    dockerfile: Dockerfile
  ports:
    - "3000:80"
  depends_on:
    - backend
```

* `build`: Builds React app from `./frontend`.
* `ports`: Serves UI on `http://localhost:3000`.
* `depends_on`: Waits for backend.

---

## 🧱 Step 4: Define Volumes

```yaml
volumes:
  mongo_data:
```

* Creates persistent storage for MongoDB.

---

## ✅ Full docker-compose.yml

```yaml
version: '3.8'

services:
  mongo:
    image: mongo:7.0
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: example
    volumes:
      - mongo_data:/data/db

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "5000:8888"
    environment:
      - DATABASE=mongodb://mongo:27017/idurar_crm_db
      - JWT_SECRET=mysecretkey123
    depends_on:
      - mongo

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:80"
    depends_on:
      - backend

volumes:
  mongo_data:
```

---

## 🚀 Run the App

```bash
docker-compose up -d
```

* Starts MongoDB, backend, and frontend.
* App is now running.
* Visit: `http://localhost:3000`

---

## 🧼 Stop the App

```bash
docker-compose down -v
```

* Stops all containers.
* Removes MongoDB volume.

---

## 🎯 Summary

* `docker-compose.yml` helps run fullstack apps easily.
* MongoDB, backend, frontend work together.
* One command to run everything.
---

