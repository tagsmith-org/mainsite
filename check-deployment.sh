#!/bin/bash

# Check deployment status and files on server
# This helps verify if the deployment was successful

echo "🚀 Deployment Status Check"
echo "=========================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

SERVER_IP="178.156.135.213"

echo -e "${BLUE}📊 Checking GitHub Actions Status${NC}"
echo "----------------------------------------"

# Check if we can get any response from the server
echo -n "Server response test... "
response=$(curl -s -o /dev/null -w "%{http_code}" "http://$SERVER_IP")
echo -e "${YELLOW}$response${NC}"

# Test if we can get a response body (even if it's an error)
echo -n "Response body test... "
body_size=$(curl -s "http://$SERVER_IP" | wc -c)
echo -e "${YELLOW}${body_size} bytes${NC}"

# Check if we can get the actual error page
echo ""
echo -e "${BLUE}📄 Error Page Analysis${NC}"
echo "---------------------------"

error_content=$(curl -s "http://$SERVER_IP")
echo "Error page content (first 200 chars):"
echo "$error_content" | head -c 200
echo ""

# Check if it's a default nginx error page
if echo "$error_content" | grep -q "nginx"; then
    echo -e "${YELLOW}⚠️  This appears to be a default nginx error page${NC}"
    echo "This suggests:"
    echo "1. Nginx is running but serving default error pages"
    echo "2. The web root directory might be empty or misconfigured"
    echo "3. File permissions might be incorrect"
else
    echo -e "${GREEN}✅ This is not a default nginx page${NC}"
fi

echo ""
echo -e "${BLUE}🔍 Testing Specific Files${NC}"
echo "----------------------------"

# Test for common files that should exist
files=("/index.html" "/favicon.ico" "/assets/" "/css/" "/js/")

for file in "${files[@]}"; do
    echo -n "Testing $file... "
    status=$(curl -s -o /dev/null -w "%{http_code}" "http://$SERVER_IP$file")
    if [ "$status" = "200" ]; then
        echo -e "${GREEN}✅ Found${NC}"
    elif [ "$status" = "404" ]; then
        echo -e "${YELLOW}⚠️  Not found${NC}"
    elif [ "$status" = "403" ]; then
        echo -e "${RED}❌ Forbidden${NC}"
    elif [ "$status" = "500" ]; then
        echo -e "${RED}❌ Server error${NC}"
    else
        echo -e "${YELLOW}⚠️  Status: $status${NC}"
    fi
done

echo ""
echo -e "${BLUE}💡 Deployment Analysis${NC}"
echo "=============================="

if [ "$response" = "403" ]; then
    echo -e "${RED}🔴 Deployment Issue Detected${NC}"
    echo ""
    echo "The 403 Forbidden error suggests:"
    echo "1. Files were not deployed correctly"
    echo "2. Nginx configuration is pointing to wrong directory"
    echo "3. File permissions are incorrect"
    echo "4. The web root directory is empty"
    echo ""
    echo -e "${YELLOW}🔧 Recommended Actions:${NC}"
    echo "1. Check GitHub Actions logs for deployment errors"
    echo "2. Verify that the build process completed successfully"
    echo "3. Ensure the deployment script uploaded files to correct location"
    echo "4. Check if nginx configuration was updated correctly"
    echo ""
    echo "Next steps:"
    echo "1. Wait a few more minutes for deployment to complete"
    echo "2. Check GitHub Actions status in your repository"
    echo "3. If deployment failed, check the logs and fix issues"
    echo "4. If deployment succeeded but site still doesn't work, SSH to server"
elif [ "$response" = "200" ]; then
    echo -e "${GREEN}✅ Deployment appears successful!${NC}"
    echo "The site is responding with 200 OK"
elif [ "$response" = "500" ]; then
    echo -e "${RED}🔴 Server Configuration Error${NC}"
    echo "500 Internal Server Error suggests nginx configuration issues"
    echo "Check nginx configuration and logs on the server"
else
    echo -e "${YELLOW}⚠️  Unknown status: $response${NC}"
    echo "This might indicate a network or server issue"
fi

echo ""
echo -e "${BLUE}🚀 Immediate Actions${NC}"
echo "=============================="
echo "1. Check GitHub Actions: https://github.com/tagsmith-org/mainsite/actions"
echo "2. Look for the latest deployment run"
echo "3. Check if it completed successfully (green checkmark)"
echo "4. If failed, click on the failed run to see error details"
echo "5. If successful, wait 2-3 minutes and test again"
echo ""
echo "Manual server check (if you have SSH access):"
echo "ssh user@178.156.135.213"
echo "ls -la /var/www/mainsite/"
echo "sudo systemctl status nginx"
echo "sudo nginx -t"
