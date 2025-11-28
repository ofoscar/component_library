#!/bin/bash
set -e

echo "🌟 Starting Next.js frontend application..."
echo "Environment: $NODE_ENV"
echo "Port: $PORT"
echo "Railway Environment: $RAILWAY_ENVIRONMENT"

# Navigate to frontend directory
cd frontend

echo "📡 Starting Next.js production server..."
npm run railway:start