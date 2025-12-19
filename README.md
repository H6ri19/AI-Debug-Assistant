# Multimodal Code Debug Assistant — Full scaffold

This archive contains a runnable scaffold for a full-stack app:
- React frontend (Vite)
- Express backend (Node.js)
- PostgreSQL (Docker)

## Quick start
1. Install Node.js (>=18), pnpm (optional), Docker & Docker Compose.
2. From the project root run:
   - `docker compose up --build` to build and run services OR
   - run backend and frontend locally (see backend/ and frontend/ README snippets).

## Notes
- This scaffold includes example code for collaboration, file uploads, and an `agent` endpoint stub.
- Add your LLM API keys to `backend/.env` before using agent routes.



Objective: Created a developer tool that accepts code, logs, screenshots, and error traces to suggest 
fixes using LLMs and agentic workflows. AI agents extract errors, retrieve documentation, and 
provide corrected code with rationales. Multimodal support allows diagram and UI bug analysis. 
Key Requirements: 
Frontend: 
● React interface for code editing, log viewing, and AI suggestions 
● Screenshot annotation tools for UI bugs 
● Real-time collaboration features 
Backend: 
 
 
● Node.js or FastAPI with RESTful APIs 
● PostgreSQL for code history and error patterns 
● File upload handling for screenshots and logs 
Authentication: 
● JWT tokens for session management 
● OAuth integration (Google/GitHub) for easy login 
● Basic user profile management 
AI Integration: 
● GPT-4, Claude 3.5, or open-source LLMs for code analysis 
● Computer vision models for screenshot analysis 
● Multi-agent workflow for error classification and solution generation
