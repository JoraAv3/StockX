"""
Tests for sentiment analysis
"""
import pytest
from src.sentiment.sentiment_analyzer import SentimentAnalyzer


def test_sentiment_analyzer():
    """Test sentiment analyzer"""
    analyzer = SentimentAnalyzer()
    
    # Test positive sentiment
    result = analyzer.analyze("This stock is doing great!")
    assert result["sentiment"] in ["positive", "neutral"]
    
    # Test negative sentiment
    result = analyzer.analyze("This stock is terrible and going down")
    assert result["sentiment"] in ["negative", "neutral"]
    
    # Test neutral sentiment
    result = analyzer.analyze("The stock price is unchanged")
    assert result["sentiment"] in ["neutral", "positive"]


def test_batch_analyze():
    """Test batch sentiment analysis"""
    analyzer = SentimentAnalyzer()
    
    texts = [
        "Great news!",
        "Terrible results",
        "No change",
    ]
    
    results = analyzer.batch_analyze(texts)
    assert len(results) == 3
    assert all("sentiment" in r for r in results)
