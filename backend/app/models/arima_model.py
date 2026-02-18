import pandas as pd
import numpy as np
from statsmodels.tsa.arima.model import ARIMA
from sklearn.metrics import mean_absolute_error, mean_squared_error


def _convert_freq(freq):
    """Convert frequency to pandas-compatible format."""
    freq_map = {
        'M': 'ME',  # Month end
        'D': 'D',   # Daily
        'W': 'W',   # Weekly
    }
    return freq_map.get(freq, freq)


def run_arima_forecast(df, periods, freq, order=(1, 1, 1)):
    """
    Run ARIMA forecast on the provided dataframe.
    
    Args:
        df: DataFrame with 'date' and 'sales' columns
        periods: Number of periods to forecast
        freq: Frequency string (D, W, M, etc.)
        order: ARIMA order tuple (p, d, q)
    
    Returns:
        (results, metrics): Tuple containing forecast results and metrics
    """
    # Set index to date column and sort
    df = df.copy()
    df['date'] = pd.to_datetime(df['date'])
    df = df.set_index('date').sort_index()
    
    # Split test set
    test_size = min(12, len(df) // 5)
    train = df.iloc[:-test_size] if test_size > 0 else df
    test = df.iloc[-test_size:] if test_size > 0 else pd.DataFrame()
    
    # Fit ARIMA on train set and compute metrics
    metrics = {}
    if len(test) > 0:
        model_train = ARIMA(train['sales'], order=order)
        fitted_train = model_train.fit()
        
        # Forecast test set
        forecast_test = fitted_train.forecast(steps=len(test))
        
        # Compute metrics
        mae = mean_absolute_error(test['sales'], forecast_test)
        rmse = np.sqrt(mean_squared_error(test['sales'], forecast_test))
        metrics = {"MAE": round(float(mae), 2), "RMSE": round(float(rmse), 2)}
    
    # Refit on full dataset
    model_full = ARIMA(df['sales'], order=order)
    fitted_full = model_full.fit()
    
    # Forecast future periods
    forecast_values = fitted_full.forecast(steps=periods)
    
    # Generate future dates
    last_date = df.index[-1]
    pandas_freq = _convert_freq(freq)
    future_dates = pd.date_range(start=last_date, periods=periods + 1, freq=pandas_freq)[1:]
    
    # Prepare results
    results = []
    for date, value in zip(future_dates, forecast_values):
        results.append({
            "date": date.strftime("%Y-%m-%d"),
            "forecast": round(float(value), 2)
        })
    
    return results, metrics
