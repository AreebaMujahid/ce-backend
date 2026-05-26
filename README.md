# 🚀 Backend API (NestJS)

A scalable backend built with **NestJS**, **PostgreSQL**, and **Prisma ORM**, providing REST APIs with full Swagger documentation.

---

## 🧠 Tech Stack

- 🟢 NestJS (Backend Framework)
- 🐘 PostgreSQL (Database)
- ⚡ Prisma ORM (Database Layer)
- 📄 Swagger (API Documentation)
- 🔐 Class Validator & Class Transformer
- 🧪 Jest (Testing)

---

## ⚙️ Installation

### 1. Clone Repository
```bash
git clone <your-repo-url>
```
### 2. Install Dependencies
npm install

🛠️ Environment Variables

### 3. Create a .env file:

DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DB_NAME"
PORT=3000

## 🗄️ Database Setup (Prisma)
1. Generate Prisma Client
```
npx prisma generate
```


3. Running the Server
Development Mode
```
npm run start:dev
```

## 📄 API Documentation (Swagger)
Once server is running, open:

```
http://localhost:3000/api-docs#/
```

Swagger provides:

All REST endpoints
Request/Response schemas
DTO validation details
Interactive API testing

<img width="1353" height="659" alt="image" src="https://github.com/user-attachments/assets/a1ceb5e8-2a9e-4b09-93c3-46d27b76498d" />


## 🧩 Architecture Overview
- Modular NestJS structure
- Controller → Service → Prisma Layer
- DTO-based validation
- Centralized error handling
- Clean separation of concerns
  
## 🗄️ Database Layer (Prisma)
- Prisma used as ORM for PostgreSQL
- Type-safe database queries
- Auto-generated client
- Migration-based schema evolution
  
## 📌 Key Features
- RESTful API design
- Swagger auto documentation
- Prisma ORM integration
- PostgreSQL relational schema
- Clean modular architecture
- DTO validation system

