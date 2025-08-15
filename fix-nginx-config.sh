#!/bin/bash

# Script to fix nginx configuration for SPA routing
# Run this on your production server

echo "🔧 Fixing nginx configuration for SPA routing..."

# Backup current config
sudo cp /etc/nginx/sites-available/mainsite /etc/nginx/sites-available/mainsite.backup.$(date +%Y%m%d_%H%M%S)

# Create correct nginx configuration
sudo tee /etc/nginx/sites-available/mainsite > /dev/null << 'EOF'
server {
    listen 80;
    server_name 178.156.135.213;

    # Frontend (Vue.js build)
    location / {
        root /var/www/mainsite;
        try_files $uri $uri/ /index.html;
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # API Backend
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
}
EOF

# Test nginx configuration
echo "🧪 Testing nginx configuration..."
sudo nginx -t

if [ $? -eq 0 ]; then
    echo "✅ Nginx configuration is valid"
    
    # Reload nginx
    echo "🔄 Reloading nginx..."
    sudo systemctl reload nginx
    
    # Check nginx status
    echo "📊 Nginx status:"
    sudo systemctl status nginx --no-pager -l
    
    echo "🎉 Configuration updated successfully!"
    echo "🌐 Test your site: http://178.156.135.213/services"
else
    echo "❌ Nginx configuration test failed"
    echo "📋 Check the configuration and try again"
    exit 1
fi
