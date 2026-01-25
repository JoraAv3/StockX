"""
AI Services API - Main application entry point
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import router

app = FastAPI(title="StockX AI Services", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(router, prefix="/api", tags=["AI Services"])

@app.get("/")
async def root():
    return {
        "service": "StockX AI Services",
        "version": "1.0.0",
        "endpoints": {
            "signals": "/api/signals/{symbol}",
            "sentiment": "/api/sentiment/analyze",
            "analytics": "/api/analytics/trend/{symbol}",
            "health": "/health",
        }
    }
