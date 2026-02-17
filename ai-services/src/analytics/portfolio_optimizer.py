"""
Portfolio Optimizer - Optimize portfolio allocation
"""
from typing import List, Dict
import numpy as np


class PortfolioOptimizer:
    """Optimize portfolio allocation using modern portfolio theory"""
    
    def __init__(self):
        self.risk_free_rate = 0.02  # 2% annual risk-free rate
    
    def calculate_returns(self, prices: List[float]) -> List[float]:
        """Calculate returns from price data"""
        returns = []
        for i in range(1, len(prices)):
            returns.append((prices[i] - prices[i-1]) / prices[i-1])
        return returns
    
    def calculate_portfolio_metrics(self, holdings: List[Dict]) -> Dict:
        """Calculate portfolio metrics"""
        total_value = sum(h['value'] for h in holdings)
        total_cost = sum(h.get('cost', h['value']) for h in holdings)
        
        pnl = total_value - total_cost
        pnl_percentage = (pnl / total_cost * 100) if total_cost > 0 else 0
        
        return {
            "total_value": total_value,
            "total_cost": total_cost,
            "pnl": pnl,
            "pnl_percentage": pnl_percentage,
            "holdings_count": len(holdings),
        }
    
    def optimize_allocation(self, assets: List[Dict], target_return: float = None) -> Dict:
        """Optimize portfolio allocation (simplified version)"""
        # Mock optimization - in production, would use scipy.optimize
        weights = np.array([1.0 / len(assets)] * len(assets))
        
        return {
            "weights": weights.tolist(),
            "assets": [a['symbol'] for a in assets],
            "expected_return": 0.08,
            "risk": 0.15,
            "sharpe_ratio": (0.08 - self.risk_free_rate) / 0.15,
        }
