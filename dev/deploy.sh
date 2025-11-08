#!/bin/bash

set -e
set -x

# -----------------------------
# Usage:
# ./deploy.sh /home/ubuntu/Messenger messenger-frontend.example.com messenger-backend.example.com
# -----------------------------

WORKSPACE=$1         # Local repo path or where you SSH to deploy
FRONTEND_DOMAIN=$2   # Domain for frontend
BACKEND_DOMAIN=$3    # Domain for backend (Laravel API)
PHP_VERSION=8.3      # Adjust if needed

# -----------------------------
# 1. Create directories
# -----------------------------
echo "Creating directories..."

sudo mkdir -p /var/www/$BACKEND_DOMAIN/core
sudo mkdir -p /var/www/$FRONTEND_DOMAIN/html

sudo mkdir -p /var/www/$BACKEND_DOMAIN/core/public/.well-known/acme-challenge
sudo mkdir -p /var/www/$FRONTEND_DOMAIN/html/.well-known/acme-challenge

# -----------------------------
# 2. Deploy Backend (Laravel)
# -----------------------------
echo "Deploying backend..."
sudo rsync -azq --exclude=.git --exclude=node_modules --delete $WORKSPACE/backend/ /var/www/$BACKEND_DOMAIN/core/

cd /var/www/$BACKEND_DOMAIN/core
composer install --no-dev --optimize-autoloader
php artisan migrate --force

# -----------------------------
# 3. Deploy Frontend (Next.js)
# -----------------------------
echo "Deploying frontend..."
cd $WORKSPACE/frontend

# If using Node + npm
npm install
npm run build
npm run export  # If using Next.js static export

sudo rsync -azq --delete $WORKSPACE/frontend/out/ /var/www/$FRONTEND_DOMAIN/html/

# -----------------------------
# 4. Set Permissions
# -----------------------------
echo "Setting permissions..."
sudo chown -R www-data:www-data /var/www/$BACKEND_DOMAIN
sudo chown -R www-data:www-data /var/www/$FRONTEND_DOMAIN/html
sudo chmod -R 755 /var/www/$BACKEND_DOMAIN
sudo chmod -R 755 /var/www/$FRONTEND_DOMAIN/html

# -----------------------------
# 5. Deploy Nginx configs
# -----------------------------
echo "Deploying Nginx configs..."
sudo cp -f $WORKSPACE/dev/nginx/$BACKEND_DOMAIN.conf /etc/nginx/sites-available/$BACKEND_DOMAIN.conf
sudo cp -f $WORKSPACE/dev/nginx/$FRONTEND_DOMAIN.conf /etc/nginx/sites-available/$FRONTEND_DOMAIN.conf

if [ ! -f /etc/nginx/sites-enabled/$BACKEND_DOMAIN.conf ]; then
    sudo ln -s /etc/nginx/sites-available/$BACKEND_DOMAIN.conf /etc/nginx/sites-enabled/
fi

if [ ! -f /etc/nginx/sites-enabled/$FRONTEND_DOMAIN.conf ]; then
    sudo ln -s /etc/nginx/sites-available/$FRONTEND_DOMAIN.conf /etc/nginx/sites-enabled/
fi

# -----------------------------
# 6. Deploy Supervisor configs
# -----------------------------
echo "Deploying Supervisor configs..."
sudo cp -f $WORKSPACE/dev/supervisor/$BACKEND_DOMAIN-worker.conf /etc/supervisor/conf.d/
sudo cp -f $WORKSPACE/dev/supervisor/$BACKEND_DOMAIN-websocket.conf /etc/supervisor/conf.d/

sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl restart all

# -----------------------------
# 7. Restart Services
# -----------------------------
echo "Restarting PHP-FPM and Nginx..."
sudo systemctl restart php$PHP_VERSION-fpm
sudo systemctl restart nginx

echo "Deployment complete!"
