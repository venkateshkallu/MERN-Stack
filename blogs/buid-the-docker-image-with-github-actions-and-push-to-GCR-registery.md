# Deploy a Dockerized MERN App to Google Cloud Run using GitHub Actions

In this guide, we'll walk through deploying a MERN (MongoDB, Express, React, Node.js) application to **Google Cloud Run** using **GitHub Actions** to automate the process. You'll containerize the app using Docker, push it to **Artifact Registry**, and deploy it to **Cloud Run**.

---

## 🛠️ Prerequisites

- A Google Cloud account ([https://console.cloud.google.com/](https://console.cloud.google.com/))
- A MERN project with a working `Dockerfile`
- GitHub repository connected to your MERN project
- Docker installed locally (optional but useful for testing)
- GitHub CLI (`gh`) and GCP CLI (`gcloud`) installed

---

## 1️⃣ Create and Configure Google Cloud Project

### Step 1: Create a Project

```bash
gcloud projects create my-mern-app-venkatesh-01 --set-as-default
````

### Step 2: Link Billing (use web UI or CLI)

```bash
gcloud beta billing projects link my-mern-app-venkatesh-01 \
  --billing-account=YOUR_BILLING_ACCOUNT_ID
```

---

## 2️⃣ Enable Required APIs

```bash
gcloud services enable run.googleapis.com \
  artifactregistry.googleapis.com \
  cloudbuild.googleapis.com \
  iam.googleapis.com
```

---

## 3️⃣ Create Artifact Registry (for Docker Images)

```bash
gcloud artifacts repositories create docker-repo \
  --repository-format=docker \
  --location=us-central1 \
  --description="Docker repo for MERN app"
```

---

## 4️⃣ Create GitHub Service Account and Assign Roles

### Step 1: Create the Service Account

```bash
gcloud iam service-accounts create github-actions-sa \
  --display-name="GitHub Actions CI"
```

### Step 2: Grant Permissions

```bash
# Replace with actual project ID if needed
PROJECT_ID=$(gcloud config get-value project)

# Assign roles to the service account
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:github-actions-sa@$PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/run.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:github-actions-sa@$PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/artifactregistry.writer"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:github-actions-sa@$PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/storage.admin"
```

---

## 5️⃣ Create and Download Service Account Key

```bash
gcloud iam service-accounts keys create key.json \
  --iam-account=github-actions-sa@$PROJECT_ID.iam.gserviceaccount.com
```

**Save this `key.json` file** — you'll upload its contents to GitHub.

---

## 6️⃣ Add GitHub Secrets

Go to your GitHub Repository → **Settings** → **Secrets and variables** → **Actions**:

| Secret Name      | Value                        |
| ---------------- | ---------------------------- |
| `GCP_PROJECT_ID` | `my-mern-app-venkatesh-01`   |
| `GCP_REGION`     | `us-central1`                |
| `GCP_SA_KEY`     | Paste contents of `key.json` |

---

## 7️⃣ Add Dockerfile to Your MERN Project

Create a `Dockerfile` in your project root if not already present:

```dockerfile
# Sample Dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

---

## 8️⃣ Create GitHub Actions Workflow

Create `.github/workflows/docker-deploy.yml` in your repo:

```yaml
name: Deploy to Cloud Run

on:
  push:
    branches:
      - main

env:
  PROJECT_ID: ${{ secrets.GCP_PROJECT_ID }}
  REGION: ${{ secrets.GCP_REGION }}
  SERVICE: mern-app

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Authenticate with Google Cloud
        uses: google-github-actions/auth@v2
        with:
          credentials_json: ${{ secrets.GCP_SA_KEY }}

      - name: Configure Docker
        run: gcloud auth configure-docker ${{ secrets.GCP_REGION }}-docker.pkg.dev

      - name: Build and Push Docker image
        run: |
          docker build -t ${{ secrets.GCP_REGION }}-docker.pkg.dev/${{ secrets.GCP_PROJECT_ID }}/docker-repo/mern-app:$GITHUB_SHA .
          docker push ${{ secrets.GCP_REGION }}-docker.pkg.dev/${{ secrets.GCP_PROJECT_ID }}/docker-repo/mern-app:$GITHUB_SHA

      - name: Deploy to Cloud Run
        run: |
          gcloud run deploy mern-app \
            --image=${{ secrets.GCP_REGION }}-docker.pkg.dev/${{ secrets.GCP_PROJECT_ID }}/docker-repo/mern-app:$GITHUB_SHA \
            --region=${{ secrets.GCP_REGION }} \
            --platform=managed \
            --allow-unauthenticated \
            --project=${{ secrets.GCP_PROJECT_ID }}
```

---

## ✅ Trigger Deployment

Now simply push to `main` branch:

```bash
git add .
git commit -m "Initial deploy setup"
git push origin main
```

GitHub Actions will build your Docker image, push it to GCP Artifact Registry, and deploy it to Cloud Run automatically.

---

## 🔍 Access the Deployed App

After deployment completes, you’ll see a URL in the GitHub Actions log like:

```
Deploying... Done.
Service URL: https://mern-app-xxxxxx-uc.a.run.app
```

Open it in the browser 🎉

---

## 🔁 Optional: View Logs

```bash
gcloud logs read --project=$PROJECT_ID --limit=50
```

---

## 📌 Conclusion

You've successfully set up an automated CI/CD pipeline using **GitHub Actions** and **Google Cloud Run** for your MERN app. You can now iterate faster, deploy safely, and scale easily 🚀

---