### error while connecting backend to Database

### 2. Dockerise Frontend and Backend



“While Dockerizing a MERN-based ERP CRM project (Idurar), my backend container was crashing with this error: Mongoose.connect error and exited with code 1.

I used logs to trace it to the MongoDB connection string. In my Node.js code, mongoose.connect() was trying to read process.env.MONGO_URI, but it wasn’t set correctly in the Docker environment.

To understand it better, I used ChatGPT and also referred to Docker and Mongoose documentation. I learned that in Docker Compose, each service runs on its own network, and you need to use the service name (mongo) as the hostname—not localhost.

I fixed the error by:

Updating my .env or docker-compose.yml to set MONGO_URI=mongodb://mongo:27017/idurar_crm_db

Making sure my Node.js code was reading process.env.MONGO_URI

Restarting the containers properly with docker-compose up --build

After that, the backend connected to MongoDB successfully and the containers ran as expected.

So this issue helped me learn how to handle environment variables inside Docker containers and how to debug using logs. I now always test .env and printenv to confirm variables inside containers.”**

---
🔧 Issue:
Backend container exited due to `Mongoose.connect()` failure (code 1)

📌 Cause:
MongoDB URI was not passed properly to the backend container. Node.js app couldn't connect to MongoDB.

✅ Fix:
- Used Docker service name as MongoDB hostname (`mongo`)
- Set MONGO_URI in `.env` or `docker-compose.yml`
- Verified using console.log + `docker exec printenv`

🤖 Help:
Used ChatGPT and AI resources to understand Docker networking and fix the connection.

🧠 Lesson:
Importance of correct env setup and how to debug containers using logs + AI support.

---

Sure! Here's a concise version in Markdown:

```md
### ❗ ERR_NAME_NOT_RESOLVED – API Login Error

**Problem:**  
Frontend showed `ERR_NAME_NOT_RESOLVED` when trying to call `backend:5000/api/login`.

**Reason:**  
Browser cannot resolve Docker service name `backend`.

**Fix:**  
In `frontend/.env`, replace:
```

VITE\_BACKEND\_SERVER=[http://backend:5000/](http://backend:5000/)

```
with:
```

VITE\_BACKEND\_SERVER=[http://localhost:5000/](http://localhost:5000/)

````

Then run:
```bash
docker-compose down && docker-compose up --build
````

```

Let me know if you want to keep more such quick fixes in a dedicated `.md` file!
```


Here's a **complete technical blog** for deploying a MERN application using **GitHub Actions and Google Cloud Run**, including **building the Docker image**, **pushing to Google Artifact Registry**, **setting up service accounts**, and **troubleshooting common issues**.

---

# 🚀 Deploy MERN App to Google Cloud Run Using GitHub Actions

> In this guide, we’ll walk through deploying a MERN (MongoDB, Express, React, Node.js) application to **Google Cloud Run** using **GitHub Actions**. The CI/CD pipeline will automatically build and push Docker images to **Google Artifact Registry** and deploy to Cloud Run.

---

## 🧩 Tech Stack & Tools Used

* **Google Cloud Platform (GCP)**
* **Cloud Run** – Serverless container deployment
* **Artifact Registry** – Docker image hosting
* **GitHub Actions** – CI/CD pipeline
* **Docker** – Containerization
* **MERN Stack** – App backend/frontend
* **Service Accounts & IAM**

---

## 📌 Step-by-Step Deployment Guide

### 1️⃣ Create a Google Cloud Project

```bash
gcloud projects create my-mern-app-venkatesh-01 \
  --name="MERN CI/CD App" \
  --set-as-default
```

Then enable billing if not already done via [GCP Console → Billing](https://console.cloud.google.com/billing).

---

### 2️⃣ Enable Required APIs

```bash
gcloud services enable \
  run.googleapis.com \
  artifactregistry.googleapis.com \
  iam.googleapis.com
```

---

### 3️⃣ Create Artifact Registry Docker Repository

```bash
gcloud artifacts repositories create mern-docker-repo \
  --repository-format=docker \
  --location=us-central1 \
  --description="Docker repo for MERN app"
```

---

### 4️⃣ Create GitHub Actions Service Account

```bash
gcloud iam service-accounts create github-actions-sa \
  --description="CI/CD SA for GitHub" \
  --display-name="GitHub Actions CI"
```

Grant required roles:

```bash
GITHUB_SA="github-actions-sa@my-mern-app-venkatesh-01.iam.gserviceaccount.com"

gcloud projects add-iam-policy-binding my-mern-app-venkatesh-01 \
  --member="serviceAccount:$GITHUB_SA" \
  --role="roles/artifactregistry.writer"

gcloud projects add-iam-policy-binding my-mern-app-venkatesh-01 \
  --member="serviceAccount:$GITHUB_SA" \
  --role="roles/run.admin"

gcloud projects add-iam-policy-binding my-mern-app-venkatesh-01 \
  --member="serviceAccount:$GITHUB_SA" \
  --role="roles/storage.admin"
```

---

### 5️⃣ Generate Service Account Key (JSON)

```bash
gcloud iam service-accounts keys create key.json \
  --iam-account=$GITHUB_SA
```

> ⚠️ **Important**: Keep `key.json` secure and never commit it to your repo.

---

### 6️⃣ Add Secret to GitHub Repo

Go to **GitHub → Settings → Secrets and Variables → Actions → New repository secret**

* **Name**: `GCP_SA_KEY`
* **Value**: Paste contents of `key.json`

---

### 7️⃣ Set Project ID and Region as GitHub Secrets

* `GCP_PROJECT_ID`: `my-mern-app-venkatesh-01`
* `GCP_REGION`: `us-central1`

---

### 8️⃣ Create GitHub Actions Workflow

Create file: `.github/workflows/deploy.yml`

```yaml
name: Deploy to Google Cloud Run

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v3

    - name: Setup Google Cloud SDK
      uses: google-github-actions/setup-gcloud@v1
      with:
        project_id: ${{ secrets.GCP_PROJECT_ID }}
        service_account_key: ${{ secrets.GCP_SA_KEY }}

    - name: Authenticate Docker with GCP
      run: gcloud auth configure-docker ${{ secrets.GCP_REGION }}-docker.pkg.dev

    - name: Build and Push Docker image
      run: |
        docker build -t ${{ secrets.GCP_REGION }}-docker.pkg.dev/${{ secrets.GCP_PROJECT_ID }}/mern-docker-repo/mern-app:latest .
        docker push ${{ secrets.GCP_REGION }}-docker.pkg.dev/${{ secrets.GCP_PROJECT_ID }}/mern-docker-repo/mern-app:latest

    - name: Deploy to Cloud Run
      run: |
        gcloud run deploy mern-app \
          --image=${{ secrets.GCP_REGION }}-docker.pkg.dev/${{ secrets.GCP_PROJECT_ID }}/mern-docker-repo/mern-app:latest \
          --platform=managed \
          --region=${{ secrets.GCP_REGION }} \
          --allow-unauthenticated
```

---

## 🧪 Test Your Deployment

Push your code to the `main` branch:

```bash
git add .
git commit -m "Deploy MERN app to Cloud Run via GitHub Actions"
git push origin main
```

Go to **GitHub Actions tab** and watch the deployment in real-time. Once successful, copy the Cloud Run URL from the last step and test your MERN app in the browser.

---

Buid the Docker Image with GitHub Actions and Push to GCR registerys

## 🐞 Issues Faced & Fixes

### ❌ Error: Service Account Doesn’t Exist

**Problem:**

```bash
ERROR: (gcloud.projects.add-iam-policy-binding) INVALID_ARGUMENT: 
Service account github-actions@<project>.iam.gserviceaccount.com does not exist.
```

**Fix:**
Ensure you use the correct service account name:
✅ `github-actions-sa@<project>.iam.gserviceaccount.com`

---

### ❌ Docker Push Fails with 403

**Problem:**
You may see a permission denied error while pushing Docker images.

**Fix:**
Ensure the service account has **`roles/artifactregistry.writer`** and run:

```bash
gcloud auth configure-docker us-central1-docker.pkg.dev
```

---

### ❌ Invalid Key Format in GitHub Secret

**Problem:**
Secret `GCP_SA_KEY` in GitHub throws JSON parse error.

**Fix:**
Use `cat key.json | base64` and paste the Base64 string into GitHub as the value. Then decode it in the workflow if needed.

---

## ✅ Final Thoughts

With this setup, every time you push to the `main` branch:

* Docker image is built
* Pushed to Artifact Registry
* Deployed to Google Cloud Run

It’s a scalable and serverless CI/CD pipeline for your MERN app!

---

Let me know if you want a downloadable `.md` version for Docusaurus or to include MongoDB Atlas + frontend next!
