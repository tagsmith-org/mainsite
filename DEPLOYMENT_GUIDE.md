# 🚀 Deployment Guide for VPS

## 📋 Prerequisites

### 1. VPS Requirements
- **OS**: Ubuntu 20.04+ or CentOS 8+
- **RAM**: Minimum 1GB (2GB recommended)
- **Storage**: 10GB+ free space
- **Node.js**: Version 16+ (will be installed)

### 2. Domain & SSL
- Domain name pointing to your VPS
- SSL certificate (Let's Encrypt recommended)

## 🔧 Server Setup

### Step 1: Connect to VPS
```bash
ssh root@your-vps-ip
```

### Step 2: Update System
```bash
# Ubuntu/Debian
apt update && apt upgrade -y

# CentOS/RHEL
dnf update -y
```

### Step 3: Install Node.js
```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# CentOS/RHEL
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
dnf install -y nodejs

# Verify installation
node --version
npm --version
```

### Step 4: Install PM2 (Process Manager)
```bash
npm install -g pm2
```

### Step 5: Install Nginx (Reverse Proxy)
```bash
# Ubuntu/Debian
apt install nginx -y

# CentOS/RHEL
dnf install nginx -y
```

## 📁 Application Deployment

### Step 1: Create Application Directory
```bash
mkdir -p /var/www/mainsite
cd /var/www/mainsite
```

### Step 2: Upload Files
Upload these files to your VPS:
- `server-sqlite.cjs`
- `server.env`
- `package.json` (if you have one)

### Step 3: Install Dependencies
```bash
npm install express cors better-sqlite3 nodemailer
```

### Step 4: Configure Environment
```bash
# Edit server.env with your actual values
nano server.env
```

**Important**: Update these values:
```env
SMTP_USER=your-actual-email@gmail.com
SMTP_PASS=your-gmail-app-password
ADMIN_EMAIL=your-admin-email@example.com
```

### Step 5: Create PM2 Configuration
```bash
# Create ecosystem.config.js
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'mainsite-api',
    script: 'server-sqlite.cjs',
    env_file: 'server.env',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    }
  }]
}
EOF
```
##
### Step 6: Start Application
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## 🌐 Nginx Configuration

### Step 1: Create Nginx Config
```bash
cat > /etc/nginx/sites-available/mainsite << 'EOF'
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

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
```

### Step 2: Enable Site
```bash
ln -s /etc/nginx/sites-available/mainsite /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default  # Remove default site
nginx -t  # Test configuration
systemctl restart nginx
```

## 🔒 SSL Certificate (Let's Encrypt)

### Step 1: Install Certbot
```bash
# Ubuntu/Debian
apt install certbot python3-certbot-nginx -y

# CentOS/RHEL
dnf install certbot python3-certbot-nginx -y
```

### Step 2: Get SSL Certificate
```bash
certbot --nginx -d your-domain.com -d www.your-domain.com
```

### Step 3: Auto-renewal
```bash
crontab -e
# Add this line:
0 12 * * * /usr/bin/certbot renew --quiet
```

## 📧 Email Setup (Gmail)

### Step 1: Enable 2-Factor Authentication
1. Go to Google Account settings
2. Enable 2-Factor Authentication

### Step 2: Generate App Password
1. Go to Security settings
2. Generate App Password for "Mail"
3. Use this password in `SMTP_PASS`

### Step 3: Test Email
```bash
# Test email sending
curl -X POST http://localhost:3001/api/email/order \
  -H "Content-Type: application/json" \
  -d '{
    "to": "test@example.com",
    "subject": "Test Email",
    "html": "<h1>Test</h1>"
  }'
```

## 🔧 Frontend Deployment

### Step 1: Build Frontend
```bash
# On your local machine
npm run build
```

### Step 2: Upload Build
```bash
# Upload dist folder to VPS
scp -r dist/* root@your-vps-ip:/var/www/mainsite/dist/
```

### Step 3: Update Frontend Environment
```bash
# On VPS, update .env file
nano /var/www/mainsite/dist/.env
```

Add your production API URL:
```env
VITE_API_URL=https://your-domain.com
VITE_ADMIN_EMAIL=your-admin-email@example.com
```

## 📊 Monitoring & Maintenance

### PM2 Commands
```bash
pm2 status          # Check app status
pm2 logs mainsite-api  # View logs
pm2 restart mainsite-api  # Restart app
pm2 stop mainsite-api    # Stop app
pm2 delete mainsite-api  # Remove app
```

### Database Backup
```bash
# Create backup script
cat > /var/www/mainsite/backup.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/var/backups/mainsite"
mkdir -p $BACKUP_DIR
DATE=$(date +%Y%m%d_%H%M%S)
cp projects.db $BACKUP_DIR/projects_$DATE.db
# Keep only last 7 days
find $BACKUP_DIR -name "projects_*.db" -mtime +7 -delete
EOF

chmod +x /var/www/mainsite/backup.sh

# Add to crontab (daily backup at 2 AM)
crontab -e
# Add: 0 2 * * * /var/www/mainsite/backup.sh
```

### Log Rotation
```bash
# Configure log rotation
cat > /etc/logrotate.d/mainsite << 'EOF'
/var/www/mainsite/logs/*.log {
    daily
    missingok
    rotate 7
    compress
    delaycompress
    notifempty
    create 644 www-data www-data
}
EOF
```

## 🚨 Troubleshooting

### Check Application Status
```bash
pm2 status
pm2 logs mainsite-api --lines 50
```

### Check Nginx Status
```bash
systemctl status nginx
nginx -t
```

### Check Database
```bash
cd /var/www/mainsite
sqlite3 projects.db ".tables"
sqlite3 projects.db "SELECT COUNT(*) FROM orders;"
```

### Check Email Configuration
```bash
# Test SMTP connection
telnet smtp.gmail.com 587
```

## 📈 Performance Optimization

### Enable Gzip Compression
```bash
# Add to nginx config
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
```

### Database Optimization
```bash
# Run periodically
sqlite3 projects.db "VACUUM;"
sqlite3 projects.db "ANALYZE;"
```

## 🔐 Security Checklist

- [ ] Firewall configured (UFW)
- [ ] SSH key authentication only
- [ ] Regular security updates
- [ ] SSL certificate installed
- [ ] Database backups enabled
- [ ] Log monitoring configured
- [ ] Rate limiting enabled
- [ ] Admin IP restrictions configured

## 📞 Support

If you encounter issues:
1. Check PM2 logs: `pm2 logs mainsite-api`
2. Check Nginx logs: `tail -f /var/log/nginx/error.log`
3. Check system logs: `journalctl -u nginx`
4. Verify environment variables: `pm2 env mainsite-api` 