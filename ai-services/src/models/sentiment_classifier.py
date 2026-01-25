"""
Sentiment Classifier Model - Classify sentiment of text
"""
from typing import List, Dict


class SentimentClassifier:
    """Classify text sentiment as positive, negative, or neutral"""
    
    def __init__(self):
        self.model = None
        self.is_trained = False
    
    def train(self, texts: List[str], labels: List[int]) -> None:
        """Train the sentiment classifier"""
        # Mock training - in production, would use BERT, RoBERTa, etc.
        self.is_trained = True
        self.model = {"type": "sentiment_classifier", "trained": True}
    
    def predict(self, text: str) -> Dict:
        """Predict sentiment for a single text"""
        if not self.is_trained:
            # Fallback to rule-based classification
            return self._rule_based_classify(text)
        
        # Mock prediction - in production, would use actual model
        positive_words = {'good', 'great', 'excellent', 'positive', 'bullish'}
        negative_words = {'bad', 'terrible', 'poor', 'negative', 'bearish'}
        
        text_lower = text.lower()
        pos_count = sum(1 for word in positive_words if word in text_lower)
        neg_count = sum(1 for word in negative_words if word in text_lower)
        
        if pos_count > neg_count:
            return {"sentiment": "positive", "confidence": 0.7}
        elif neg_count > pos_count:
            return {"sentiment": "negative", "confidence": 0.7}
        else:
            return {"sentiment": "neutral", "confidence": 0.5}
    
    def predict_batch(self, texts: List[str]) -> List[Dict]:
        """Predict sentiment for multiple texts"""
        return [self.predict(text) for text in texts]
    
    def _rule_based_classify(self, text: str) -> Dict:
        """Rule-based fallback classification"""
        positive_words = {'good', 'great', 'excellent', 'positive', 'bullish', 'up', 'rise'}
        negative_words = {'bad', 'terrible', 'poor', 'negative', 'bearish', 'down', 'fall'}
        
        text_lower = text.lower()
        pos_score = sum(1 for word in positive_words if word in text_lower)
        neg_score = sum(1 for word in negative_words if word in text_lower)
        
        if pos_score > neg_score:
            return {"sentiment": "positive", "confidence": 0.6 + min(0.3, pos_score * 0.05)}
        elif neg_score > pos_score:
            return {"sentiment": "negative", "confidence": 0.6 + min(0.3, neg_score * 0.05)}
        else:
            return {"sentiment": "neutral", "confidence": 0.5}
