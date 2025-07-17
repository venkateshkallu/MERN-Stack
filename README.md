# MERN Stack DevOps Pipeline 

## 🙌 Acknowledgements

- **Helped & Guided By:** [Jinna Balu](https://jinnabalu.com/)
- **Forked From:** [Original Project Name](https://github.com/idurar/idurar-erp-crm)
- **Purpose:**  
  This project is built for **learning**, **experimentation**, and to **demonstrate DevOps capabilities**.  
  Not intended for production use. 

## Dev Machine Instructions 

- [Installation Instructions](INSTALLATION-INSTRUCTIONS.md)

## DevOps Learning Activity
### 1. .gitignore Update 

**Usecase1** : .gitignore was very basic and need to be add with MERN Stack related ignorable configuartioin

**Solution** : 
  - Generated `.gitignore` file using [toptal gitignore generator](https://www.toptal.com/developers/gitignore) for visualstudiocode,react,node

### 2. Dockerise Frontend and Backend

### 3. Create Docker Compose for MongoDB

### 4. Buid the Docker Image Locally 

### 5. Buid the Docker Image with GitHub Actions and Push to GCR registery

### 6. Run Application Locally 

### 7. Run Application On AWS EC2

## Security 

### 8. Quality Gate or Code Quality Check with SonarQube

### 9. Quality Gate or Code Quality Check with DeepSource

### 10. Secrets Scan (open source tool)

### 11. Vulnerability Scans with Dependence Track  to Create SBOM

- https://dependencytrack.org/

### 12. OWASP Top 10 Scan with Arachni

- https://github.com/Arachni/arachni

##  Observebility Instrumentation 

### 13. Centralised Logging with ELK Stack 

### 14. Monetering and Alterting () with prometheus , Grafana 

### 15. Uptime and Application Status with Uptime Kuma

- https://uptimekuma.org/install-uptime-kuma-docker/

### 16. Tracing with Elastic APM or Jaeger

- https://www.jaegertracing.io/



medium blog , reddit 


 
> Unofficial Dockerized version of [Idurar ERP CRM](https://github.com/idurar/idurar-erp-crm) for educational and DevSecOps learning purposes.

This project provides a Dockerized setup for the open-source [Idurar ERP CRM](https://github.com/idurar/idurar-erp-crm) application.  
It includes Docker support, CI/CD workflows, and is designed for experimenting with containerization and security audits.

---

## Security & Source Warning

- Always trust official builds from: [https://idurarapp.com](https://idurarapp.com)
- Official repo: [https://github.com/idurar/idurar-erp-crm](https://github.com/idurar/idurar-erp-crm)
- Do **NOT** run versions downloaded from unofficial GitHub repos in production. They may be **fake**, **modified**, or **malicious**.
- This repository is for educational purposes only. Not affiliated with the official Idurar team.

---

### Features

- Docker support (frontend & backend)
- Docker Compose for full app orchestration
- GitHub Actions CI/CD Workflow
- DevSecOps tools integration ready (e.g., Trivy, SonarQube, etc.)

---

### Getting Started

```bash
# Clone this repo
git clone https://github.com/venkateshkallu/Idurur-dockerized.git

# Navigate to project
cd Idurur-dockerized

# Start Docker containers
docker-compose up --build
```

```arduino
Folder Structure

Idurur-dockerized/
├── backend/               → Node.js API
├── frontend/              → React (Ant Design) UI
├── docker-compose.yml     → Multi-container setup
├── Dockerfile             → Backend Dockerfile
├── .github/workflows/     → GitHub Actions for CI/CD
```

## Credits
This project is built upon the amazing work of the Idurar team:

Official project: https://github.com/idurar/idurar-erp-crm

Original license: GNU Affero General Public License v3.0

All ERP/CRM app features (Invoice, Customer, Quote, etc.) are developed by Idurar.
This project only adds Dockerization, automation, and DevSecOps improvements.

## Use Cases
Learn Docker with a real-world full-stack app

Test CI/CD using GitHub Actions

Experiment with security scanning (SCA, SAST tools)

Practice DevOps & DevSecOps workflows

### License
This repository and the original Idurar code are licensed under:

GNU Affero General Public License v3.0
See LICENSE for details.

### Show Your Support
If you found this helpful, please consider:

- Starring this repo

- Forking and experimenting

- Sharing feedback


