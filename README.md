# 🐦 Twitter Clone (Node.js + Express + EJS + PostgreSQL)

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=000)
![EJS](https://img.shields.io/badge/EJS-FFB13B?style=for-the-badge&logo=ejs&logoColor=000)
![CSS3](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)

A full-stack Twitter-style app built with **Node.js, Express, EJS, CSS, and PostgreSQL**. Includes user auth, tweeting, likes, profiles, and a clean server-side rendered UI.

> **Security note:** Keep secrets out of Git. Use `.env` (already ignored). If you ever committed secrets, rotate them and rewrite history.

---

## ✨ Features

- 🔐 Auth: register, login, logout (session/cookie)
- 📝 Tweets: create, list, delete (owner only)
- 🧑‍💻 Profiles: view user profile & their tweets
- 🖼️ SSR UI with **EJS** templates, **CSS** styling
- 🗄️ **PostgreSQL** persistence via a lightweight model layer

---

## 🏗 Architecture

- **Express** for HTTP & routing
- **EJS** for server-side rendering
- **PostgreSQL** for relational data
- **Session** auth (cookie + server session)
- Simple MVC-ish separation: `routes`, `controllers`, `models`, `views`


---

## 🧰 Tech Stack

- **Runtime:** Node.js (Express.js)
- **Views:** EJS + CSS + a little client-side JS
- **DB:** PostgreSQL
- **Auth:** express-session (cookie-based)
- **Env:** dotenv

---

## ✅ Prerequisites

- Node.js 18+ and npm
- PostgreSQL 13+ running locally (or connection string to hosted DB)
- Git

---

## 🚀 Quick Start

```bash
# 1) Clone
git clone https://github.com/Sarthak074/Twitter-s-Clone.git
cd Twitter-s-Clone

# 2) Install deps
npm install

# 3) Create .env from example
cp .env.example .env
# then edit .env values as needed

# 4) Create DB (see "Database Setup" below for schema)
# psql -U <user> -h localhost -c "CREATE DATABASE twitter_clone;"

# 5) Run initial SQL (tables)
# psql -U <user> -d twitter_clone -h localhost -f db/schema.sql

# 6) Start app
npm run dev  # with auto-reload via nodemon
# or
npm start    # regular start

# App by default at: http://localhost:3000

```

## Demo Video
https://www.linkedin.com/posts/sarthak-bhandare-136aa724a_fullstackdeveloper-webdevelopment-javascript-activity-7214638938508959744-PGZJ?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD298foBdtGQwVL-5InHncHsXM6rV9hL-E4


## 🖼️ Screen Shots
<img width="1920" height="1016" alt="image" src="https://github.com/user-attachments/assets/08296d5f-b688-4d8c-8693-8036a8174eba" />

<img width="1917" height="1012" alt="image" src="https://github.com/user-attachments/assets/37670223-e1f2-4529-aa5d-66765662d72d" />




