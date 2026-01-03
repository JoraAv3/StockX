"""
Market Analyzer - Analyze market trends and patterns
"""
import pandas as pd
import numpy as np
from typing import Dict, List, Optional


class MarketAnalyzer:
    """Analyze market data and identify trends"""
    
    def __init__(self):
        self.historical_data = {}
    
    def analyze_trend(self, symbol: str, price_data: List[Dict]) -> Dict:
        """
        Analyze price trend for a symbol
        
        Args:
            symbol: Stock symbol
            price_data: List of price data points
            
        Returns:
            Trend analysis result
        """
        if not price_data:
            return {"trend": "neutral", "strength": 0.0}
        
        df = pd.DataFrame(price_data)
        prices = df['price'].values
        
        # Calculate moving averages
        sma_20 = np.mean(prices[-20:]) if len(prices) >= 20 else np.mean(prices)
        sma_50 = np.mean(prices[-50:]) if len(prices) >= 50 else np.mean(prices)
        
        # Determine trend
        current_price = prices[-1]
        trend_strength = abs(current_price - sma_20) / sma_20
        
        if current_price > sma_20 > sma_50:
            trend = "bullish"
        elif current_price < sma_20 < sma_50:
            trend = "bearish"
        else:
            trend = "neutral"
        
        return {
            "trend": trend,
            "strength": float(trend_strength),
            "sma_20": float(sma_20),
            "sma_50": float(sma_50) if len(prices) >= 50 else None,
            "current_price": float(current_price),
        }
    
    def calculate_volatility(self, symbol: str, price_data: List[Dict]) -> float:
        """Calculate volatility (standard deviation of returns)"""
        if len(price_data) < 2:
            return 0.0
        
        df = pd.DataFrame(price_data)
        returns = df['price'].pct_change().dropna()
        
        return float(returns.std() * np.sqrt(252))  # Annualized volatility
    
    def detect_anomalies(self, symbol: str, price_data: List[Dict]) -> List[Dict]:
        """Detect price anomalies using statistical methods"""
        if len(price_data) < 10:
            return []
        
        df = pd.DataFrame(price_data)
        prices = df['price'].values
        
        mean = np.mean(prices)
        std = np.std(prices)
        
        # Z-score method
        z_scores = np.abs((prices - mean) / std)
        threshold = 2.5
        
        anomalies = []
        for i, z_score in enumerate(z_scores):
            if z_score > threshold:
                anomalies.append({
                    "index": i,
                    "price": float(prices[i]),
                    "z_score": float(z_score),
                    "timestamp": price_data[i].get("timestamp"),
                })
        
        return anomalies
