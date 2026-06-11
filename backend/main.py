from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from google import genai
import os

load_dotenv()

client = genai.Client(api_key=os.getenv("API_KEY"))

# Leer las políticas una sola vez al arrancar el servidor
def load_politicas() -> str:
    path = os.getenv("POLITICAS_PATH")
    if not path or not os.path.exists(path):
        raise FileNotFoundError(f"No se encontró el archivo de políticas en: {path}")
    with open(path, "r", encoding="utf-8") as f:
        return f.read()

POLITICAS = load_politicas()

SYSTEM_PROMPT = f"""Eres un asistente virtual de la empresa. 
Responde ÚNICAMENTE basándote en las siguientes políticas de la empresa.
Si el usuario pregunta algo que no está cubierto en las políticas, indica amablemente 
que no tienes información sobre ese tema y que contacte al área correspondiente.

POLÍTICAS DE LA EMPRESA:
{POLITICAS}
"""

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "working"}

@app.post("/chat")
async def chat(body: dict):
    message = body["message"]
    history = body.get("history", [])

    contents = [{"role": "user", "parts": [{"text": SYSTEM_PROMPT}]},
                {"role": "model", "parts": [{"text": "Entendido, responderé basándome únicamente en las políticas de la empresa."}]}]

    for msg in history:
        role = "user" if msg["role"] == "user" else "model"
        contents.append({"role": role, "parts": [{"text": msg["content"]}]})

    contents.append({"role": "user", "parts": [{"text": message}]})

    response = client.models.generate_content(
        model="gemini-3.5-flash",
        contents=contents,
    )
    return {"reply": response.text}