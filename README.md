---

# 🧠 Multimodal AI Debug Assistant

A full-stack **AI-powered debugging assistant** that analyzes **source code + runtime logs + screenshots** to generate intelligent debugging suggestions using **JWT authentication**, **OAuth**, and **AI analysis**.

---

## 🚀 Features

* 🔐 **Authentication**

  * Email & Password (JWT based)
  * Google OAuth
  * GitHub OAuth
* 🧠 **AI Debug Analysis**

  * Code analysis
  * Runtime log analysis
  * Screenshot OCR (optional)
* 🛡️ **Secure APIs**

  * JWT protected routes
* 🎨 **Modern UI**

  * React + Vite
  * Tailwind CSS
  * Monaco Code Editor
* 🌐 **Deployment Ready**

  * Backend: Render
  * Frontend: Vercel
* ⚙️ **Mock AI Mode** (no API cost)

---

## 🏗️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Axios
* Monaco Editor

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* JWT
* Passport.js (Google & GitHub OAuth)

### AI

* OpenAI API (optional)
* Mock AI mode for testing

---

## 📁 Project Structure

```
multimodal-debug-assistant/
│
├── backend/
│   ├── src/
│   │   ├── config/        # Passport OAuth config
│   │   ├── middleware/    # JWT middleware
│   │   ├── models/        # MongoDB models
│   │   ├── routes/        # Auth, Agent, Files
│   │   ├── sockets/       # WebSocket logic
│   │   └── index.js       # Server entry
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── pages/         # OAuth callback
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

---

## ⚙️ Environment Variables

### Backend `.env`

```env
PORT=4000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=MultimodalDebugAssistant

# OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_secret

# Frontend URL
FRONTEND_URL=http://localhost:5173

# AI
MOCK_AI=true
OPENAI_API_KEY=sk-xxxx (optional)
```

---

### Frontend `.env`

```env
VITE_BACKEND_URL=http://localhost:4000
```

---

## ▶️ Running Locally

### 1️⃣ Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs on:

```
http://localhost:4000
```

---

### 2️⃣ Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 🔐 Authentication Flow

1. User logs in (Email / Google / GitHub)
2. Backend issues JWT token
3. Token stored in `localStorage`
4. Token sent in `Authorization: Bearer <token>`
5. Protected APIs validate token

---

## 🤖 AI Analysis API

**Endpoint**

```
POST /api/agent/analyze
```

**Headers**

```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

**Body**

```json
{
  "code": "function test(x){ return x.value; }",
  "logs": "TypeError: Cannot read property 'value' of undefined"
}
```

---

## 🧪 Mock AI Mode

To avoid API costs:

```env
MOCK_AI=true
```

Returns predefined AI suggestions for testing.

---

## 🌍 Deployment

### Backend

* Platform: **Render**
* Start command: `npm start`

### Frontend

* Platform: **Vercel**
* Framework: Vite

### OAuth (Production)

Update Google & GitHub callback URLs to deployed backend URLs.

---

## 🎓 Viva / Evaluation Summary

> “This project implements a secure multimodal AI debugging system using React, Node.js, JWT authentication, OAuth, and AI-based analysis. The system is deployed using modern cloud platforms and follows industry-standard security practices.”

---

## 👨‍💻 Author

**Hariharan**
Final Year Project
Multimodal AI Debug Assistant

