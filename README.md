# 🤖 AI Customer Assistant

A customer service chatbot built with **React + TypeScript** on the frontend and **FastAPI + Gemini** on the backend. Responses are based exclusively on company policies defined in a local text file.

---

## 🧰 Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Frontend  | React, TypeScript, Vite           |
| Backend   | FastAPI, Python                   |
| AI Model  | Google Gemini 2.0 Flash Lite      |
| Styling   | CSS Modules (custom design system)|

---

## 📁 Project Structure

```
main/
├── backend/
│   ├── politicas/
│   │   └── politicas.txt   # Company policies (context for the AI)
│   ├── main.py             # FastAPI app
│   ├── requirements.txt
│   └── .env                # API key and config (not included in repo)
├── frontend/
│   └── src/
│       ├── components/chat/
│       ├── hooks/
│       └── types/
├── start.bat               # One-click launcher (Windows)
└── README.md
```

---

## ⚙️ Setup

### Prerequisites
- Python 3.10+
- Node.js 18+
- A [Google AI Studio](https://aistudio.google.com) API key

### 1. Clone the repository
```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2. Configure the backend
Create a `.env` file inside the `backend/` folder:

```env
API_KEY=your_gemini_api_key_here
POLITICAS_PATH=politicas/politicas.txt
```

### 3. Add your company policies
Edit `backend/politicas/politicas.txt` with your company's policies. The AI will only answer based on this content.

### 4. Run the project

**Windows — one click:**
```
Double-click start.bat
```

**Manual:**
```bash
# Backend
cd backend
python -m venv venv
venv\Scripts\activate        # Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

---

## 🌐 URLs

| Service  | URL                       |
|----------|---------------------------|
| Frontend | http://localhost:5173     |
| Backend  | http://localhost:8000     |
| API Docs | http://localhost:8000/docs|

---

## ✨ Features

- 💬 Real-time chat interface
- 🧠 Context-aware responses (chat history is sent on every request)
- 📋 Policy-based answers — the AI stays on topic
- 💾 Conversation persisted in localStorage (survives page refresh)
- ⌨️ Typing indicator while the AI responds

---

## 📄 License

MIT
