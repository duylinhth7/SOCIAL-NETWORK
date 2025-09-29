from fastapi import FastAPI
from pydantic import BaseModel
from model.model import predict


app = FastAPI()

class TextIn(BaseModel):
    text: str

class PredictionOut(BaseModel):
    isToxic: str
@app.post("/predict", response_model=PredictionOut)
def predict_function(payload: TextIn):
    pred = predict(payload.text)  # có thể là 0 hoặc 1
    label = "toxic" if pred == 1 else "non-toxic"
    return PredictionOut(isToxic=label)
