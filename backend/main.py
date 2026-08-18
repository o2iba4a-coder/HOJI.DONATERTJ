from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="HOJI DONATER TJ API",
    version="0.1.0"
)

# Пока разрешаем подключение frontend.
# Позже ограничим доступ только нашим доменом.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Проверка работы сервера
@app.get("/api/health")
def health():
    return {
        "status": "ok",
        "service": "hoji-donater-api",
        "version": "0.1.0"
    }


# Список пакетов алмазов
@app.get("/api/products")
def products():
    return [
        {
            "id": 1,
            "diamonds": 100,
            "price": 10,
            "currency": "TJS"
        },
        {
            "id": 2,
            "diamonds": 310,
            "price": 25,
            "currency": "TJS"
        },
        {
            "id": 3,
            "diamonds": 520,
            "price": 40,
            "currency": "TJS"
        },
        {
            "id": 4,
            "diamonds": 1060,
            "price": 75,
            "currency": "TJS"
        },
        {
            "id": 5,
            "diamonds": 2180,
            "price": 145,
            "currency": "TJS"
        },
        {
            "id": 6,
            "diamonds": 5600,
            "price": 350,
            "currency": "TJS"
        },
        {
            "id": 7,
            "diamonds": 10000,
            "price": 600,
            "currency": "TJS"
        }
      ]
