![Inpost Logo](./assets/readme_banner.webp)

**Inpost** is a web application that allows users to create temporary mailboxes and receive emails.

🔗 **Live demo:** [https://inpost.wallte.one](https://inpost.wallte.one)  

## 🛠️ Tech Stack

- **Backend:** Node.js, Express  
- **Frontend:** React
- **Database:** MongoDB Atlas  
- **CI/CD:** GitHub Actions  
- **Containerization & Hosting:** Docker, Docker Hub, Traefik, Let's Encrypt  



## 🚀 Features

- User authentication (`/auth`)
- Mailbox management panel (`/dashboard`)
  - Create temporary mailboxes
  - Read emails
- Users and mailboxes list is fetched from MongoDB 

  

## ⚙️ Deployment

Deployment is fully automated via **GitHub Actions**:

1. A Docker image is built and pushed to Docker Hub.
2. The server pulls the latest image and restarts the app using Docker Compose.
3. **Traefik** is used as the reverse proxy and automatically issues SSL certificates via **Let's Encrypt**.
