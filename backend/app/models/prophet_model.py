import pandas as pd
import numpy as np
from prophet import Prophet
from sklearn.metrics import mean_absolute_error, mean_squared_error


def run_prophet_forecast(df, periods, freq):
    """
    Run Prophet forecast on the provided dataframe.
    
    Args:
        df: DataFrame with 'date' and 'sales' columns
        periods: Number of periods to forecast
        freq: Frequency string (D, W, M, etc.)
    
    Returns:
        (results, metrics): Tuple containing forecast results and metrics
    """
    # Prepare data for Prophet (requires 'ds' and 'y' columns)
    df = df.copy()
    df['date'] = pd.to_datetime(df['date'])
    df = df.rename(columns={'date': 'ds', 'sales': 'y'})
    df = df.sort_values('ds')
    
    # Split test set
    test_size = min(12, len(df) // 5)
    train = df.iloc[:-test_size] if test_size > 0 else df
    test = df.iloc[-test_size:] if test_size > 0 else pd.DataFrame()
    
    # Fit Prophet on train set and compute metrics
    metrics = {}
    if len(test) > 0:
        model_train = Prophet(daily_seasonality=False, yearly_seasonality=True, weekly_seasonality=False)
        model_train.fit(train)
        
        # Create future dataframe for test period
        future_test = test[['ds']].copy()
        forecast_test = model_train.predict(future_test)
        
        # Compute metrics
        mae = mean_absolute_error(test['y'], forecast_test['yhat'])
        rmse = np.sqrt(mean_squared_error(test['y'], forecast_test['yhat']))
        metrics = {"MAE": round(float(mae), 2), "RMSE": round(float(rmse), 2)}
    
    # Refit on full dataset
    model_full = Prophet(daily_seasonality=False, yearly_seasonality=True, weekly_seasonality=False)
    model_full.fit(df)
    
    # Create future dataframe
    future = model_full.make_future_dataframe(periods=periods, freq=freq)
    forecast = model_full.predict(future)
    
    # Get only future predictions (exclude historical)
    forecast_future = forecast.iloc[-periods:]
    
    # Prepare results
    results = []
    for _, row in forecast_future.iterrows():
        results.append({
            "date": row['ds'].strftime("%Y-%m-%d"),
            "forecast": round(float(row['yhat']), 2),
            "lower": round(float(row['yhat_lower']), 2),
            "upper": round(float(row['yhat_upper']), 2)
        })
    
    return results, metrics
