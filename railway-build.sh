#!/bin/bash
set -e

echo "🚀 Railway deployment script starting..."

# Navigate to frontend directory
cd frontend

echo "📦 Installing frontend dependencies..."
npm ci

echo "🏗️  Building frontend application..."
npm run build

echo "✅ Build completed successfully!"