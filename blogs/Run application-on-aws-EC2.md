# 🚀 Deploying a Dockerized MERN App to AWS EC2 (Free Tier Friendly)

In this guide, we'll explore how to deploy a Dockerized MERN (MongoDB, Express, React, Node.js) full-stack application to an AWS EC2 instance using the Free Tier. This tutorial covers Docker, Docker Compose, and secure environment configuration.

> 💡 _Note: This post is based on deployment-ready configurations prepared during my local development. Due to budget constraints, the app has not yet been deployed live on EC2._

---

## 🧱 Prerequisites

- AWS Free Tier account
- Dockerized MERN frontend & backend apps
- `.env` files ready (API keys, DB URI, etc.)
- Docker & Docker Compose installed locally
- GitHub account (for pulling code from repo)

---

## 🌐 Step 1: Create an AWS EC2 Instance

1. Go to [AWS EC2 Console](https://console.aws.amazon.com/ec2/)
2. Choose **Ubuntu Server 22.04 (Free Tier eligible)**
3. Set instance type to `t2.micro`
4. Create a new key pair (e.g., `mern-key.pem`)
5. Open inbound rules for:
   - SSH (port 22)
   - HTTP (port 80)
   - Custom TCP (e.g., 3000, 5000)

---

## 🔑 Step 2: SSH into Your Instance

```bash
chmod 400 mern-key.pem
ssh -i "mern-key.pem" ubuntu@your-ec2-public-ip
````

---

## 🐳 Step 3: Install Docker & Docker Compose

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install docker.io docker-compose -y
sudo usermod -aG docker ubuntu
```

Log out and log back in to activate Docker group permissions.

---

## 📦 Step 4: Pull Your Repo and Set Up

Clone your project from GitHub:

```bash
git clone https://github.com/your-username/mern-app.git
cd mern-app
```

Add your `.env` files (or use Docker secrets for production). Example `.env`:

```env
MONGO_URI=mongodb://mongo:27017/yourdb
JWT_SECRET=your_secret_key
```

---

## 🧪 Step 5: Run with Docker Compose

Ensure you have a `docker-compose.yml` similar to:

```yaml
version: '3.8'
services:
  frontend:
    build: ./client
    ports:
      - "3000:3000"
    environment:
      - VITE_API_URL=http://localhost:5000
  backend:
    build: ./server
    ports:
      - "5000:5000"
    env_file:
      - ./server/.env
  mongo:
    image: mongo
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db
volumes:
  mongo-data:
```

Now run:

```bash
docker-compose up -d --build
```

---

## 🌍 Step 6: Access the App

Visit:

```
http://your-ec2-public-ip:3000  (React frontend)
http://your-ec2-public-ip:5000  (Node backend API)
```

---

## 🔐 Optional: Setup NGINX as Reverse Proxy

Install NGINX:

```bash
sudo apt install nginx
```

Edit `/etc/nginx/sites-available/default`:

```nginx
server {
    listen 80;

    location / {
        proxy_pass http://localhost:3000;
    }

    location /api {
        proxy_pass http://localhost:5000;
    }
}
```

Restart:

```bash
sudo systemctl restart nginx
```

---

## 📦 Bonus: Docker Secrets Management (For Production)

Instead of using `.env` directly, you can use:

```bash
echo "your_secret_value" | docker secret create jwt_secret -
```

And reference in `docker-compose.yml`:

```yaml
secrets:
  - jwt_secret

secrets:
  jwt_secret:
    external: true
```

---

## ✅ Conclusion

By following these steps, you're setting yourself up for production-grade deployment of your full-stack Docker app on AWS EC2 — all using the Free Tier.

> 📝 *This guide was written as an implementation-ready blueprint. Deployment was prepared and validated locally. Final EC2 deployment is pending due to budget limitations.*

---
