#!/bin/bash

# Script to check server environment and built files remotely
# This script connects to the server and checks everything

echo "🔍 Checking server environment and built files remotely..."
echo "========================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Server details (you'll need to update these)
SERVER_IP="178.156.135.213"
SSH_USER="root"  # Update if different
SSH_KEY_PATH="~/.ssh/id_rsa"  # Update path to your SSH key

echo -e "${BLUE}🌐 Connecting to server: $SERVER_IP${NC}"
echo ""

# Check if we can connect to the server
echo -e "${BLUE}📡 Testing connection...${NC}"
echo "You will be prompted for password if needed"
if ssh -o ConnectTimeout=10 $SSH_USER@$SERVER_IP "echo 'Connection successful'" 2>/dev/null; then
    echo -e "${GREEN}✅ Connection successful${NC}"
else
    echo -e "${RED}❌ Cannot connect to server${NC}"
    echo "Please check:"
    echo "1. SSH key is configured"
    echo "2. Server IP is correct"
    echo "3. SSH user is correct"
    exit 1
fi
echo ""

# Execute remote checks
echo -e "${BLUE}🔍 Running remote checks...${NC}"
ssh $SSH_USER@$SERVER_IP << 'REMOTE_SCRIPT'
echo "🔍 Checking server environment and built files..."
echo "================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Go to mainsite directory
cd /var/www/mainsite

# Check current directory
echo -e "${BLUE}📁 Current directory:${NC}"
pwd
echo ""

# Check if .env file exists
echo -e "${BLUE}🔍 Checking .env file:${NC}"
if [ -f ".env" ]; then
    echo -e "${GREEN}✅ .env file exists${NC}"
    echo "File size: $(ls -lh .env | awk '{print $5}')"
    echo ""
    echo -e "${BLUE}📄 .env file contents:${NC}"
    cat .env
else
    echo -e "${RED}❌ .env file does not exist${NC}"
fi
echo ""

# Check if index.html exists
echo -e "${BLUE}📄 Checking index.html:${NC}"
if [ -f "index.html" ]; then
    echo -e "${GREEN}✅ index.html exists${NC}"
    echo "File size: $(ls -lh index.html | awk '{print $5}')"
else
    echo -e "${RED}❌ index.html does not exist${NC}"
fi
echo ""

# Check all files in directory
echo -e "${BLUE}📋 All files in directory:${NC}"
ls -la
echo ""

# Check JavaScript files for environment variables
echo -e "${BLUE}🔍 Checking JavaScript files for environment variables:${NC}"
if [ -d "assets" ]; then
    echo "Searching for VITE_ variables in JavaScript files:"
    for file in assets/*.js; do
        if [ -f "$file" ]; then
            echo "Checking $file:"
            grep -o 'VITE_[^"]*' "$file" | head -5
        fi
    done
else
    echo -e "${RED}❌ assets directory does not exist${NC}"
fi
echo ""

# Check specifically for VITE_PROMO_MANAGER
echo -e "${BLUE}🔍 Checking for VITE_PROMO_MANAGER:${NC}"
if [ -d "assets" ]; then
    for file in assets/*.js; do
        if [ -f "$file" ]; then
            echo "Checking $file for VITE_PROMO_MANAGER:"
            grep -o 'VITE_PROMO_MANAGER[^"]*' "$file" | head -3
        fi
    done
fi
echo ""

# Check for "true" values in JavaScript
echo -e "${BLUE}🔍 Checking for 'true' values in JavaScript:${NC}"
if [ -d "assets" ]; then
    for file in assets/*.js; do
        if [ -f "$file" ]; then
            echo "Checking $file for 'true' values:"
            grep -o 'true' "$file" | wc -l
        fi
    done
fi
echo ""

# Check nginx status
echo -e "${BLUE}🔧 Checking nginx status:${NC}"
systemctl status nginx --no-pager -l | head -10
echo ""

# Check if site is accessible
echo -e "${BLUE}🌐 Checking if site is accessible:${NC}"
curl -s -o /dev/null -w "HTTP Status: %{http_code}\n" http://localhost
echo ""

echo -e "${BLUE}💡 Summary:${NC}"
if [ -f ".env" ]; then
    echo -e "${GREEN}✅ .env file is present${NC}"
else
    echo -e "${RED}❌ .env file is missing${NC}"
fi

if [ -f "index.html" ]; then
    echo -e "${GREEN}✅ index.html is present${NC}"
else
    echo -e "${RED}❌ index.html is missing${NC}"
fi

if [ -d "assets" ]; then
    echo -e "${GREEN}✅ assets directory is present${NC}"
else
    echo -e "${RED}❌ assets directory is missing${NC}"
fi
REMOTE_SCRIPT

echo ""
echo -e "${BLUE}🎉 Remote check completed!${NC}"
