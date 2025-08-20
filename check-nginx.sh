#!/bin/bash

# Script to check and fix nginx configuration
# This script connects to the server and checks nginx

echo "🔧 Checking and fixing nginx configuration..."
echo "============================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Server details
SERVER_IP="178.156.135.213"
SSH_USER="root"

echo -e "${BLUE}🌐 Connecting to server: $SERVER_IP${NC}"
echo ""

# Execute remote nginx checks
ssh $SSH_USER@$SERVER_IP << 'REMOTE_SCRIPT'
echo "🔧 Checking nginx configuration..."
echo "================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check nginx configuration
echo -e "${BLUE}🔍 Checking nginx configuration:${NC}"
nginx -t
echo ""

# Check nginx sites
echo -e "${BLUE}📁 Checking nginx sites:${NC}"
ls -la /etc/nginx/sites-available/
echo ""

# Check mainsite configuration
echo -e "${BLUE}📄 Checking mainsite nginx config:${NC}"
if [ -f "/etc/nginx/sites-available/mainsite" ]; then
    echo -e "${GREEN}✅ mainsite config exists${NC}"
    cat /etc/nginx/sites-available/mainsite
else
    echo -e "${RED}❌ mainsite config does not exist${NC}"
fi
echo ""

# Check if mainsite is enabled
echo -e "${BLUE}🔗 Checking if mainsite is enabled:${NC}"
ls -la /etc/nginx/sites-enabled/
echo ""

# Check nginx error logs
echo -e "${BLUE}📋 Checking nginx error logs:${NC}"
tail -10 /var/log/nginx/error.log
echo ""

# Check nginx access logs
echo -e "${BLUE}📋 Checking nginx access logs:${NC}"
tail -5 /var/log/nginx/access.log
echo ""

# Check if mainsite directory exists and has files
echo -e "${BLUE}📁 Checking mainsite directory:${NC}"
ls -la /var/www/mainsite/
echo ""

# Test nginx configuration
echo -e "${BLUE}🧪 Testing nginx configuration:${NC}"
nginx -t
echo ""

# Check nginx status
echo -e "${BLUE}📊 Nginx status:${NC}"
systemctl status nginx --no-pager -l
echo ""

echo -e "${BLUE}💡 Summary:${NC}"
if [ -f "/etc/nginx/sites-available/mainsite" ]; then
    echo -e "${GREEN}✅ mainsite config exists${NC}"
else
    echo -e "${RED}❌ mainsite config missing${NC}"
fi

if [ -L "/etc/nginx/sites-enabled/mainsite" ]; then
    echo -e "${GREEN}✅ mainsite is enabled${NC}"
else
    echo -e "${RED}❌ mainsite is not enabled${NC}"
fi

if [ -f "/var/www/mainsite/index.html" ]; then
    echo -e "${GREEN}✅ index.html exists${NC}"
else
    echo -e "${RED}❌ index.html missing${NC}"
fi
REMOTE_SCRIPT

echo ""
echo -e "${BLUE}🎉 Nginx check completed!${NC}"
