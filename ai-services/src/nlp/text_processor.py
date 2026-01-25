"""
Text Processor - Process text for NLP tasks
"""
import re
from typing import List, Dict


class TextProcessor:
    """Process text data for sentiment analysis"""
    
    def __init__(self):
        self.stop_words = {'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for'}
        self.positive_words = {'good', 'great', 'excellent', 'positive', 'bullish', 'up', 'rise', 'gain'}
        self.negative_words = {'bad', 'terrible', 'poor', 'negative', 'bearish', 'down', 'fall', 'loss'}
    
    def clean_text(self, text: str) -> str:
        """Clean text by removing special characters and converting to lowercase"""
        # Remove URLs
        text = re.sub(r'http\S+|www\S+|https\S+', '', text, flags=re.MULTILINE)
        
        # Remove special characters but keep spaces
        text = re.sub(r'[^\w\s]', '', text)
        
        # Convert to lowercase
        text = text.lower()
        
        # Remove extra whitespace
        text = ' '.join(text.split())
        
        return text
    
    def tokenize(self, text: str) -> List[str]:
        """Tokenize text into words"""
        cleaned = self.clean_text(text)
        tokens = cleaned.split()
        
        # Remove stop words
        tokens = [t for t in tokens if t not in self.stop_words]
        
        return tokens
    
    def extract_keywords(self, text: str, top_n: int = 10) -> List[str]:
        """Extract keywords from text"""
        tokens = self.tokenize(text)
        
        # Count word frequency (simplified - in production, use TF-IDF)
        word_freq = {}
        for token in tokens:
            word_freq[token] = word_freq.get(token, 0) + 1
        
        # Sort by frequency
        sorted_words = sorted(word_freq.items(), key=lambda x: x[1], reverse=True)
        
        return [word for word, freq in sorted_words[:top_n]]
    
    def preprocess_for_ml(self, texts: List[str]) -> List[str]:
        """Preprocess texts for ML model input"""
        return [self.clean_text(text) for text in texts]
