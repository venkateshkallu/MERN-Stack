# 🚀 MERN Stack Code Quality Check Using SonarQube

This guide walks you through **running SonarQube** locally and analyzing a MERN stack project (MongoDB, Express, React, Node.js) with it. You'll also learn how to interpret the results and enforce code quality in CI/CD.

---

## 🧰 Prerequisites

Make sure you have the following:

- Node.js (v18 or later)
- Docker & Docker Compose
- A MERN Stack project ready
- Git (optional for CI)
- Internet access to download SonarQube and scanner images

---

## 🔧 Step 1: Setup SonarQube with Docker

Create a `docker-compose.yml` file:

```yaml
version: "3"

services:
  sonarqube:
    image: sonarqube:community
    ports:
      - "9000:9000"
    environment:
      - SONAR_JDBC_USERNAME=sonar
      - SONAR_JDBC_PASSWORD=sonar
    volumes:
      - sonarqube_data:/opt/sonarqube/data
      - sonarqube_extensions:/opt/sonarqube/extensions

volumes:
  sonarqube_data:
  sonarqube_extensions:
````

Start SonarQube:

```bash
docker-compose up -d
```

Visit `http://localhost:9000`.
Default login: `admin` / `admin`.

---

## 🏗️ Step 2: Install the SonarScanner

Install SonarScanner CLI:

```bash
npm install -g sonarqube-scanner
```

Or use the official binary:
[https://docs.sonarsource.com/sonarqube/latest/analyzing-source-code/scanners/sonarscanner/](https://docs.sonarsource.com/sonarqube/latest/analyzing-source-code/scanners/sonarscanner/)

---

## 📁 Step 3: Add `sonar-project.properties`

In the **root** of your MERN project, create a file:

```properties
sonar.projectKey=mern-app
sonar.projectName=MERN Stack App
sonar.projectVersion=1.0

sonar.sources=.
sonar.exclusions=node_modules/**,dist/**,build/**,coverage/**,public/**

sonar.language=js
sonar.sourceEncoding=UTF-8

sonar.javascript.lcov.reportPaths=coverage/lcov.info
```

---

## ▶️ Step 4: Run the Analysis

From the root of your project:

```bash
sonar-scanner \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.login=admin \
  -Dsonar.password=admin
```

You’ll see logs showing scanning progress.
Once complete, visit `http://localhost:9000`.

---

## 📊 Step 5: Explore the SonarQube Dashboard

You should now see your project on the home page.

### 🔍 What You'll See:

#### 1. ⚠️ **Evaluation Database Warning**

> "Embedded database should be used for evaluation purposes only..."

* It means SonarQube is running using its built-in H2 database.
* **This is OK for local testing**, but for production, use **PostgreSQL**.

#### 2. ✅ **Quality Gates**

* A "gate" defines if your code meets quality standards.
* The default **"Sonar way"** gate:

  * 0 new issues
  * Test coverage > 80%
  * Duplications < 3%
  * Security hotspots reviewed

#### 3. 📈 **Quality Profiles**

* A rule set per language (e.g., JavaScript, TypeScript, etc.)
* JavaScript: \~3100 rules enabled by default

You can view:

```
Projects → [Your Project] → Issues
```

To inspect:

* Bugs
* Vulnerabilities
* Code Smells
* Security Hotspots

---

## 🔄 Step 6: Customize Rules (Optional)

You can create or modify:

* ✅ Custom **Quality Gates**
* 🧠 Custom **Quality Profiles**

Go to:

```
Quality Gates → Create
Quality Profiles → Create/Edit → Choose Language
```

---

## 🔁 Step 7: CI/CD Integration (Optional)

To enforce scans in GitHub Actions:

```yaml
# .github/workflows/sonarqube.yml
name: SonarQube Scan

on: [push]

jobs:
  sonarqube:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 20

      - name: Install dependencies
        run: npm ci

      - name: Run SonarQube Scan
        run: |
          npm install -g sonarqube-scanner
          sonar-scanner \
            -Dsonar.host.url=http://<YOUR-IP>:9000 \
            -Dsonar.login=${{ secrets.SONAR_TOKEN }}
```

> 🔐 Create a token in SonarQube (`My Account → Security`) and store it in GitHub Secrets as `SONAR_TOKEN`.
---

## ✅ Conclusion

You’ve now:

* ✅ Installed and ran SonarQube locally with Docker
* ✅ Scanned your MERN stack project
* ✅ Understood SonarQube dashboards (Quality Gates, Rules, Issues)
* ✅ Optionally enforced code quality in CI/CD

> 🎯 SonarQube helps catch bugs, maintain consistency, and enforce security — **before code goes to production**.

---

## 📎 Useful Links

* [SonarQube Docs](https://docs.sonarsource.com/)
* [SonarScanner CLI](https://docs.sonarsource.com/sonarqube/latest/analyzing-source-code/scanners/sonarscanner/)
* [GitHub Actions Guide](https://docs.github.com/en/actions)

---

```

Would you like this saved as a `.md` file in your project folder or want a downloadable version?
```
