import os
from fastapi import APIRouter, HTTPException
import pandas as pd
from app.schemas import ForecastRequest, ForecastResponse, ForecastPoint
from app.models.arima_model import run_arima_forecast
from app.models.prophet_model import run_prophet_forecast

router = APIRouter()

UPLOAD_DIR = "uploads"


@router.post("/forecast", response_model=ForecastResponse)
async def generate_forecast(request: ForecastRequest):
    """
    Generate a forecast using the specified model.
    """
    # Check if data file exists
    file_path = os.path.join(UPLOAD_DIR, "sales_data.csv")
    if not os.path.exists(file_path):
        raise HTTPException(
            status_code=400,
            detail="No sales data found. Please upload a CSV file first."
        )
    
    # Read data
    try:
        df = pd.read_csv(file_path)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error reading data: {str(e)}")
    
    # Route to appropriate model
    if request.model.lower() == "arima":
        results, metrics = run_arima_forecast(df, request.periods, request.frequency)
        model_used = "ARIMA"
    elif request.model.lower() == "prophet":
        results, metrics = run_prophet_forecast(df, request.periods, request.frequency)
        model_used = "Prophet"
    else:
        raise HTTPException(
            status_code=400,
            detail=f"Unknown model: {request.model}. Supported models: arima, prophet"
        )
    
    # Convert results to ForecastPoint objects
    forecast_points = [ForecastPoint(**point) for point in results]
    
    return ForecastResponse(
        model_used=model_used,
        periods=request.periods,
        forecast=forecast_points,
        metrics=metrics
    )
