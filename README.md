# 📈 Sales Forecasting System

A full-stack time series forecasting application for sales data using machine learning models. Upload your CSV sales data and generate forecasts with ARIMA or Facebook Prophet, visualized in interactive charts.

## Tech Stack

| Component | Technology |
|-----------|-----------|
| Backend API | FastAPI |
| Forecasting Models | ARIMA (statsmodels), Facebook Prophet |
| Frontend | Next.js 14 (App Router) |
| UI Components | React 18, TypeScript |
| Charts | Recharts |
| Styling | Tailwind CSS |
| Containerization | Docker & Docker Compose |

## Features

- 📤 **CSV Upload**: Upload sales data in CSV format
- 🤖 **Multiple Models**: Choose between ARIMA and Prophet forecasting models
- 📊 **Interactive Charts**: Visualize forecasts with confidence intervals
- 📈 **Model Metrics**: View MAE and RMSE for model accuracy
- 🎯 **Flexible Forecasting**: Customize forecast periods and frequency (Daily, Weekly, Monthly)
- 🐳 **Docker Ready**: Full Docker Compose setup for easy deployment

## Quick Start

### Prerequisites

- Python 3.11+
- Node.js 20+
- Docker & Docker Compose (optional)

### Local Development

#### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The backend API will be available at `http://localhost:8000`

#### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Docker Compose Setup

The easiest way to run the entire application:

```bash
# Build and start all services
docker-compose up --build

# Or run in detached mode
docker-compose up -d
```

- Backend API: `http://localhost:8000`
- Frontend: `http://localhost:3000`

To stop:

```bash
docker-compose down
```

## CSV Data Format

Your CSV file must contain the following columns:

| Column | Type | Format | Description |
|--------|------|--------|-------------|
| `date` | string | YYYY-MM-DD | Date of the sales record |
| `sales` | numeric | float/int | Sales value for that date |

### Sample CSV

```csv
date,sales
2023-01-01,1000
2023-02-01,1200
2023-03-01,1150
2023-04-01,1300
2023-05-01,1400
2023-06-01,1350
2023-07-01,1500
2023-08-01,1600
2023-09-01,1550
2023-10-01,1700
2023-11-01,1800
2023-12-01,2000
```

## API Documentation

### Upload CSV

**Endpoint:** `POST /api/upload`

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: Form data with `file` field containing the CSV file

**Response:**
```json
{
  "message": "File uploaded successfully.",
  "rows": 12,
  "columns": ["date", "sales"]
}
```

**Error Responses:**
- `400`: Invalid file type (not CSV)
- `422`: Missing required columns (`date` or `sales`)

---

### Generate Forecast

**Endpoint:** `POST /api/forecast`

**Request:**
```json
{
  "model": "prophet",
  "periods": 12,
  "frequency": "M"
}
```

**Parameters:**
- `model` (string): `"arima"` or `"prophet"` (default: `"arima"`)
- `periods` (int): Number of periods to forecast (default: `12`)
- `frequency` (string): Time frequency - `"D"` (Daily), `"W"` (Weekly), `"M"` (Monthly) (default: `"M"`)

**Response:**
```json
{
  "model_used": "Prophet",
  "periods": 12,
  "forecast": [
    {
      "date": "2024-01-01",
      "forecast": 2100.50,
      "lower": 1950.25,
      "upper": 2250.75
    }
  ],
  "metrics": {
    "MAE": 45.32,
    "RMSE": 67.89
  }
}
```

**Error Responses:**
- `400`: No data uploaded or unknown model specified

## Project Structure

```
sales-forecasting/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI application
│   │   ├── schemas.py           # Pydantic models
│   │   ├── routes/
│   │   │   ├── forecast.py      # Forecast endpoint
│   │   │   └── upload.py        # Upload endpoint
│   │   └── models/
│   │       ├── arima_model.py   # ARIMA implementation
│   │       └── prophet_model.py # Prophet implementation
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/
│   ├── app/
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Home page
│   │   └── globals.css          # Global styles
│   ├── components/
│   │   ├── UploadForm.tsx       # File upload component
│   │   ├── ForecastForm.tsx     # Forecast configuration
│   │   └── ForecastChart.tsx    # Chart visualization
│   ├── lib/
│   │   └── api.ts               # API client
│   ├── package.json
│   └── Dockerfile
│
└── docker-compose.yml
```

## Models

### ARIMA (AutoRegressive Integrated Moving Average)

- Best for: Linear trends, seasonal patterns
- Parameters: Default order (1,1,1)
- Output: Point forecasts only

### Prophet (Facebook Prophet)

- Best for: Complex seasonality, holidays, trend changes
- Features: Automatic seasonality detection
- Output: Point forecasts with confidence intervals (lower/upper bounds)

## Development

### Running Tests

Backend:
```bash
cd backend
pytest
```

Frontend:
```bash
cd frontend
npm test
```

### Linting

Backend:
```bash
cd backend
flake8 app/
```

Frontend:
```bash
cd frontend
npm run lint
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
