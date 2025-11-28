#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Starting Next.js App with Backend...${NC}\n"

# Start backend
echo -e "${GREEN}Starting backend server on port 5000...${NC}"
cd backend
npm install --silent 2>/dev/null
npm run dev &
BACKEND_PID=$!
echo -e "${GREEN}✓ Backend started (PID: $BACKEND_PID)${NC}\n"

# Wait for backend to start
sleep 2

# Start frontend
echo -e "${GREEN}Starting frontend server on port 3000...${NC}"
cd ../frontend
npm install --silent 2>/dev/null
npm run dev &
FRONTEND_PID=$!
echo -e "${GREEN}✓ Frontend started (PID: $FRONTEND_PID)${NC}\n"

echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}✓ Application is running!${NC}"
echo -e "${BLUE}========================================${NC}"
echo -e "Frontend:  ${GREEN}http://localhost:3000${NC}"
echo -e "Backend:   ${GREEN}http://localhost:5000${NC}\n"
echo -e "Test Credentials:"
echo -e "  Email:    ${GREEN}test@example.com${NC}"
echo -e "  Password: ${GREEN}password123${NC}\n"
echo -e "Press Ctrl+C to stop both servers"
echo -e "${BLUE}========================================${NC}\n"

# Wait for both processes
wait
