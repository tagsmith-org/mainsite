#!/bin/bash

# Script to check .env file and server configuration
# Run this on your production server

echo "🔍 Checking .env file and server configuration..."
echo "================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if we're in the right directory
echo -e "${BLUE}📁 Current directory:${NC}"
pwd
echo ""

# Check if .env file exists
echo -e "${BLUE}🔍 Checking .env file:${NC}"
if [ -f ".env" ]; then
    echo -e "${GREEN}✅ .env file exists${NC}"
    echo "File size: $(ls -lh .env | awk '{print $5}')"
    echo "File permissions: $(ls -la .env | awk '{print $1}')"
    echo ""
    echo -e "${BLUE}📄 .env file contents:${NC}"
    cat .env
else
    echo -e "${RED}❌ .env file does not exist${NC}"
fi
echo ""

# Check all files in directory
echo -e "${BLUE}📋 All files in directory:${NC}"
ls -la
echo ""

# Check nginx configuration
echo -e "${BLUE}🔧 Checking nginx configuration:${NC}"
if command -v nginx &> /dev/null; then
    echo -e "${GREEN}✅ Nginx is installed${NC}"
    nginx -t 2>&1
    echo ""
    echo -e "${BLUE}📊 Nginx status:${NC}"
    systemctl status nginx --no-pager -l
else
    echo -e "${RED}❌ Nginx is not installed${NC}"
fi
echo ""

# Check if index.html exists
echo -e "${BLUE}📄 Checking index.html:${NC}"
if [ -f "index.html" ]; then
    echo -e "${GREEN}✅ index.html exists${NC}"
    echo "File size: $(ls -lh index.html | awk '{print $5}')"
    echo "First few lines:"
    head -5 index.html
else
    echo -e "${RED}❌ index.html does not exist${NC}"
fi
echo ""

# Check environment variables in the built app
echo -e "${BLUE}🔍 Checking built app for environment variables:${NC}"
if [ -f "index.html" ]; then
    echo "Searching for VITE_ variables in index.html:"
    grep -o 'VITE_[^"]*' index.html | head -10
else
    echo "index.html not found, cannot check environment variables"
fi
echo ""

echo -e "${BLUE}💡 Summary:${NC}"
if [ -f ".env" ]; then
    echo -e "${GREEN}✅ .env file is present${NC}"
else
    echo -e "${RED}❌ .env file is missing${NC}"
    echo "This means the GitHub Actions deployment didn't create it properly"
fi

if [ -f "index.html" ]; then
    echo -e "${GREEN}✅ index.html is present${NC}"
else
    echo -e "${RED}❌ index.html is missing${NC}"
    echo "This means the deployment failed completely"
fi
