from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from pathlib import Path

from model import predict_iris

BASE_DIR = Path(__file__).resolve().parent

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve frontend folder
app.mount(
    "/frontend",
    StaticFiles(directory=BASE_DIR / "frontend"),
    name="frontend"
)

# Open index.html at root URL
@app.get("/")
def home():
    return FileResponse(BASE_DIR / "frontend" / "index.html")


class IrisInput(BaseModel):
    sepal_length: float
    sepal_width: float
    petal_length: float
    petal_width: float


@app.post("/predict")
def predict(data: IrisInput):

    result = predict_iris(
        data.sepal_length,
        data.sepal_width,
        data.petal_length,
        data.petal_width
    )

    return {
        "prediction": result
    }