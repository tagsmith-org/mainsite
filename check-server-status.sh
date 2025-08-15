#!/bin/bash

# Script to check server status via HTTP requests
# This doesn't require SSH access

echo "🔍 Checking server status..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check URL
check_url() {
    local url=$1
    local description=$2
    
    echo -n "Checking $description... "
    
    # Get HTTP status code
    status_code=$(curl -s -o /dev/null -w "%{http_code}" "$url")
    
    if [ "$status_code" = "200" ]; then
        echo -e "${GREEN}✅ OK (200)${NC}"
        return 0
    elif [ "$status_code" = "404" ]; then
        echo -e "${RED}❌ 404 Not Found${NC}"
        return 1
    else
        echo -e "${YELLOW}⚠️  Status: $status_code${NC}"
        return 1
    fi
}

# Check main pages
echo "📊 Checking main pages:"
check_url "http://178.156.135.213" "Home page"
check_url "http://178.156.135.213/services" "Services page"
check_url "http://178.156.135.213/portfolio" "Portfolio page"
check_url "http://178.156.135.213/contact" "Contact page"

echo ""
echo "🔧 Checking technical endpoints:"
check_url "http://178.156.135.213/api/health" "API health check" || echo "API health check not available"

echo ""
echo "📋 Summary:"
echo "- If Services page shows 404, nginx configuration needs to be fixed"
echo "- If all pages show 404, there might be a server issue"
echo "- If only some pages work, it might be a routing issue"

echo ""
echo "💡 Next steps:"
echo "1. Push changes to trigger automatic deployment"
echo "2. Wait for GitHub Actions to complete"
echo "3. Check the pages again"
