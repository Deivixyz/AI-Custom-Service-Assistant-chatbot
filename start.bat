@echo off
echo ================================
echo    Iniciando AI Study Assistant
echo ================================

REM ── Backend ──────────────────────────────────────────
cd backend

if not exist venv (
    echo [Backend] Creando entorno virtual...
    python -m venv venv
    if errorlevel 1 (
        echo [ERROR] No se pudo crear el entorno virtual. Asegurate de tener Python instalado.
        pause
        exit /b 1
    )
)

echo [Backend] Activando entorno virtual...
call venv\Scripts\activate

echo [Backend] Instalando dependencias...
pip install -r requirements.txt --quiet
if errorlevel 1 (
    echo [ERROR] Fallo al instalar dependencias del backend.
    pause
    exit /b 1
)

if not exist .env (
    echo [ERROR] No se encontro el archivo .env en la carpeta backend.
    echo Crea el archivo backend\.env con tu API_KEY y POLITICAS_PATH.
    pause
    exit /b 1
)

echo [Backend] Arrancando servidor...
start "Backend - FastAPI" cmd /k "cd /d %~dp0backend && call venv\Scripts\activate && uvicorn main:app --reload"

REM ── Frontend ─────────────────────────────────────────
cd ..\frontend

if not exist node_modules (
    echo [Frontend] Instalando dependencias npm...
    npm install
    if errorlevel 1 (
        echo [ERROR] Fallo al instalar dependencias del frontend.
        pause
        exit /b 1
    )
)

echo [Frontend] Arrancando servidor de desarrollo...
start "Frontend - Vite" cmd /k "cd /d %~dp0frontend && npm run dev"

REM ── Listo ─────────────────────────────────────────────
echo.
echo ================================
echo  Backend:  http://localhost:8000
echo  Frontend: http://localhost:5173
echo ================================
echo.
pause