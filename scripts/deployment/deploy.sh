#!/bin/bash

# Deployment script for StockX platform

set -e

echo "🚀 Starting StockX deployment..."

# Build frontend
echo "📦 Building frontend..."
cd frontend
npm install
npm run build
cd ..

# Build backend
echo "📦 Building backend..."
cd backend
npm install
npm run build
cd ..

# Deploy smart contracts
echo "🔗 Deploying smart contracts..."
cd smart-contracts
npm install
npm run compile
npm run deploy:local
cd ..

echo "✅ Deployment complete!"
