from pydantic import BaseModel
from typing import List, Optional


class ForecastRequest(BaseModel):
    model: str = "arima"
    periods: int = 12
    frequency: str = "M"


class ForecastPoint(BaseModel):
    date: str
    forecast: float
    lower: Optional[float] = None
    upper: Optional[float] = None


class ForecastResponse(BaseModel):
    model_used: str
    periods: int
    forecast: List[ForecastPoint]
    metrics: Optional[dict] = None
