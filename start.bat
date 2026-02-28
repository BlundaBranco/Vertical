@echo off

:: Backend
start "Backend" cmd /k "cd /d %~dp0 && call venv\Scripts\activate && cd backend && uvicorn app.main:app --reload --port 8000"

:: Frontend
start "Frontend" cmd /k "cd /d %~dp0frontend && npm run dev"

:: Cloudflare Tunnel
start "Tunnel" cmd /k "cd /d %~dp0 && cloudflared.exe tunnel --url http://localhost:8000"
