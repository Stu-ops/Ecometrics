from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import pickle
import pandas as pd
import numpy as np
from typing import List, Dict, Any, Optional
import uvicorn
import os

app = FastAPI(
    title="ML Model API",
    description="API for serving machine learning model predictions",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variable to store the latest prediction
latest_prediction = None

class PredictionRequest(BaseModel):
    features: List[str]
    
    class Config:
        schema_extra = {
            "example": {
                "features": ['coal', 'public', 'frequently', 'large Scale', '7', '1', 'No', 'YES']
            }
        }

class PredictionResponse(BaseModel):
    prediction: Any
    probability: Optional[List[float]] = None
    model_version: str

def load_model(model_path: str):
    """Load the ML model from the specified path using pickle."""
    try:
        with open(model_path, 'rb') as file:
            model = pickle.load(file)
        print(f"Model loaded successfully from {model_path}")
        return model
    except Exception as e:
        print(f"Error loading model: {e}")
        raise RuntimeError(f"Failed to load model: {e}")

MODEL_PATH = os.environ.get("MODEL_PATH", "pipe.pkl")
MODEL_VERSION = os.environ.get("MODEL_VERSION", "1.0.0")

try:
    model = load_model(MODEL_PATH)
except Exception as e:
    print(f"Warning: Model not loaded at startup: {e}")
    model = None

@app.get("/")
async def root():
    """Root endpoint with API information."""
    return {
        "message": "ML Model API is running",
        "model_version": MODEL_VERSION,
        "endpoints": {
            "prediction": "/predict",
            "health": "/health",
            "latest_prediction": "/latest-prediction"
        }
    }

@app.get("/health")
async def health_check():
    """Health check endpoint."""
    if model is None:
        raise HTTPException(status_code=503, detail="Model not loaded")
    return {"status": "healthy", "model_version": MODEL_VERSION}

@app.post("/predict", response_model=PredictionResponse)
async def predict(request: PredictionRequest):
    global model, latest_prediction
    if model is None:
        try:
            model = load_model(MODEL_PATH)
        except Exception as e:
            raise HTTPException(status_code=503, detail=f"Model not available: {e}")
    
    try:
        features = request.features
        features = np.array([features[0:4]+[int(features[4]), int(features[5])]+features[6:8]], dtype=object).reshape(1, -1)
        keys = ['Energy_Source', 'Transport', 'Frequency of Transport', 'Waste Production', 'How Long Machine Works Daily', 'Machine repairing(in Months)', 'Energy efficiency', 'Recycling Waste']
        features = pd.DataFrame(features, columns=keys)

        prediction = model.predict(features).tolist()

        probability = model.predict_proba(features)[0].tolist() if hasattr(model, 'predict_proba') else None

        # Store the latest prediction
        latest_prediction = {
            "prediction": prediction,
            "probability": probability,
            "model_version": MODEL_VERSION
        }

        return latest_prediction
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

@app.get("/predict", response_model=Optional[PredictionResponse])
async def get_latest_prediction():
    """Retrieve the most recent prediction."""
    if latest_prediction is None:
        raise HTTPException(status_code=404, detail="No predictions made yet")
    return latest_prediction

# Run the application
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
