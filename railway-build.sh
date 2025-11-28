#!/bin/bash
set -e

echo "🚀 Railway frontend deployment starting..."

# Navigate to frontend directory
cd frontend

echo "📦 Installing frontend dependencies..."
npm ci --production=false

echo "🏗️  Building Next.js application for production..."
echo "NODE_ENV: $NODE_ENV"
echo "PORT: $PORT"
npm run railway:build

echo "📁 Listing build output..."
ls -la .next/

echo "✅ Frontend build completed successfully!"