#!/bin/bash

# Detailed server diagnosis script
# This helps identify the root cause of 403/500 errors

echo "🔍 Detailed Server Diagnosis"
echo "=============================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

SERVER_IP="178.156.135.213"

echo -e "${BLUE}📊 Basic Connectivity Tests${NC}"
echo "--------------------------------"

# Test basic connectivity
echo -n "Testing basic connectivity... "
if ping -c 1 $SERVER_IP > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Server is reachable${NC}"
else
    echo -e "${RED}❌ Server is not reachable${NC}"
    exit 1
fi

# Test HTTP response
echo -n "Testing HTTP response... "
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "http://$SERVER_IP")
echo -e "${YELLOW}Status: $HTTP_STATUS${NC}"

# Test different paths
echo ""
echo -e "${BLUE}🔍 Testing Different Paths${NC}"
echo "--------------------------------"

paths=("/" "/index.html" "/services" "/portfolio" "/contact" "/api/health")

for path in "${paths[@]}"; do
    echo -n "Testing $path... "
    status=$(curl -s -o /dev/null -w "%{http_code}" "http://$SERVER_IP$path")
    if [ "$status" = "200" ]; then
        echo -e "${GREEN}✅ $status${NC}"
    elif [ "$status" = "403" ]; then
        echo -e "${RED}❌ $status (Forbidden)${NC}"
    elif [ "$status" = "404" ]; then
        echo -e "${YELLOW}⚠️  $status (Not Found)${NC}"
    elif [ "$status" = "500" ]; then
        echo -e "${RED}❌ $status (Internal Server Error)${NC}"
    else
        echo -e "${YELLOW}⚠️  $status${NC}"
    fi
done

# Test with different User-Agents
echo ""
echo -e "${BLUE}🤖 Testing with Different User-Agents${NC}"
echo "--------------------------------"

echo -n "Testing with curl User-Agent... "
status1=$(curl -s -o /dev/null -w "%{http_code}" -H "User-Agent: curl/7.68.0" "http://$SERVER_IP")
echo -e "${YELLOW}$status1${NC}"

echo -n "Testing with browser User-Agent... "
status2=$(curl -s -o /dev/null -w "%{http_code}" -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36" "http://$SERVER_IP")
echo -e "${YELLOW}$status2${NC}"

# Test headers
echo ""
echo -e "${BLUE}📋 Response Headers Analysis${NC}"
echo "--------------------------------"

echo "Full response headers:"
curl -I "http://$SERVER_IP" 2>/dev/null | while read line; do
    if [[ $line =~ ^[[:space:]]*$ ]]; then
        break
    fi
    echo "  $line"
done

# Test if it's a directory listing issue
echo ""
echo -e "${BLUE}📁 Testing Directory Access${NC}"
echo "--------------------------------"

echo -n "Testing if directory listing is enabled... "
dir_status=$(curl -s -o /dev/null -w "%{http_code}" "http://$SERVER_IP/")
if [ "$dir_status" = "403" ]; then
    echo -e "${YELLOW}Directory access forbidden${NC}"
    echo "  This might indicate:"
    echo "  - Missing index.html file"
    echo "  - Incorrect file permissions"
    echo "  - Wrong nginx root directory"
    echo "  - Directory listing disabled"
else
    echo -e "${GREEN}Directory access allowed${NC}"
fi

# Test static files
echo ""
echo -e "${BLUE}📄 Testing Static Files${NC}"
echo "--------------------------------"

static_files=("/favicon.ico" "/robots.txt" "/.well-known/robots.txt")

for file in "${static_files[@]}"; do
    echo -n "Testing $file... "
    status=$(curl -s -o /dev/null -w "%{http_code}" "http://$SERVER_IP$file")
    if [ "$status" = "200" ]; then
        echo -e "${GREEN}✅ $status${NC}"
    elif [ "$status" = "404" ]; then
        echo -e "${YELLOW}⚠️  $status (Not Found)${NC}"
    else
        echo -e "${YELLOW}⚠️  $status${NC}"
    fi
done

echo ""
echo -e "${BLUE}💡 Diagnosis Summary${NC}"
echo "=============================="

if [ "$HTTP_STATUS" = "403" ]; then
    echo -e "${RED}🔴 Main Issue: 403 Forbidden${NC}"
    echo "Possible causes:"
    echo "1. Missing index.html file in web root"
    echo "2. Incorrect file permissions (not readable by nginx)"
    echo "3. Wrong nginx root directory configuration"
    echo "4. Directory listing disabled and no index file"
    echo ""
    echo "Recommended actions:"
    echo "1. Check if files were deployed correctly"
    echo "2. Verify nginx configuration"
    echo "3. Check file permissions on server"
    echo "4. Ensure index.html exists in web root"
elif [ "$HTTP_STATUS" = "500" ]; then
    echo -e "${RED}🔴 Main Issue: 500 Internal Server Error${NC}"
    echo "Possible causes:"
    echo "1. Nginx configuration syntax error"
    echo "2. Missing required modules"
    echo "3. Permission issues with nginx user"
    echo ""
    echo "Recommended actions:"
    echo "1. Check nginx error logs"
    echo "2. Verify nginx configuration syntax"
    echo "3. Check nginx service status"
else
    echo -e "${GREEN}✅ Server appears to be working correctly${NC}"
fi

echo ""
echo -e "${BLUE}🚀 Next Steps${NC}"
echo "=============================="
echo "1. Check GitHub Actions deployment status"
echo "2. If deployment failed, check the logs"
echo "3. If deployment succeeded, wait a few minutes and test again"
echo "4. If issues persist, connect to server via SSH for manual diagnosis"
echo "5. Use the fix-nginx-config.sh script on the server"
