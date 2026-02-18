import os
from fastapi import APIRouter, UploadFile, File, HTTPException
import pandas as pd

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/upload")
async def upload_csv(file: UploadFile = File(...)):
    """
    Upload a CSV file with sales data.
    Expected columns: 'date', 'sales'
    
    Note: Uses a fixed filename for simplicity. In production, implement
    user sessions or unique filenames to handle concurrent uploads.
    """
    # Validate file extension
    if not file.filename.endswith('.csv'):
        raise HTTPException(status_code=400, detail="Only CSV files are allowed")
    
    # Save file
    file_path = os.path.join(UPLOAD_DIR, "sales_data.csv")
    
    try:
        content = await file.read()
        with open(file_path, "wb") as f:
            f.write(content)
        
        # Validate CSV structure
        df = pd.read_csv(file_path)
        
        if 'date' not in df.columns or 'sales' not in df.columns:
            # Delete invalid file
            os.remove(file_path)
            raise HTTPException(
                status_code=422,
                detail="CSV must contain 'date' and 'sales' columns"
            )
        
        return {
            "message": "File uploaded successfully.",
            "rows": len(df),
            "columns": list(df.columns)
        }
    
    except pd.errors.EmptyDataError:
        if os.path.exists(file_path):
            os.remove(file_path)
        raise HTTPException(status_code=422, detail="CSV file is empty")
    except Exception as e:
        if os.path.exists(file_path):
            os.remove(file_path)
        raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")
