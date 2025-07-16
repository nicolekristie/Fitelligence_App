#!/bin/bash

# Fitelligence Deployment Script
# This script builds the React app and deploys it to AWS EC2

set -e  # Exit on any error

echo "🚀 Starting Fitelligence deployment..."

# Configuration
SERVER="ubuntu@34.225.131.148"
SSH_KEY="~/.ssh/virginia-app-mbp.pem"
REMOTE_PATH="/var/www/vite-app/dist/"
LOCAL_BUILD_PATH="client/fitelligenceApp/dist/"

# Step 1: Build the React application
echo "📦 Building React application..."
cd client/fitelligenceApp
npm run build
cd ../..

# Step 2: Deploy using rsync
echo "🔄 Syncing files to server..."
rsync -avz --delete -e "ssh -i $SSH_KEY" \
  $LOCAL_BUILD_PATH \
  $SERVER:$REMOTE_PATH

# Step 2.5: Deploy backend server (if needed)
echo "🔄 Syncing backend files..."
rsync -avz --exclude=node_modules -e "ssh -i $SSH_KEY" \
  server/ \
  $SERVER:/home/ubuntu/fitelligence-server/

# Step 2.6: Install dependencies and restart server
echo "🔄 Updating server dependencies..."
ssh -i $SSH_KEY $SERVER "cd /home/ubuntu/fitelligence-server && npm install"
ssh -i $SSH_KEY $SERVER "cd /home/ubuntu/fitelligence-server && (pm2 restart fitelligence-server || pm2 start index.js --name fitelligence-server)"

# Step 3: Reload Caddy (optional)
echo "🔄 Reloading Caddy server..."
ssh -i $SSH_KEY $SERVER "sudo systemctl reload caddy"

# Step 4: Test deployment
echo "🧪 Testing deployment..."
curl -I http://34.225.131.148 > /dev/null && echo "✅ Deployment successful!" || echo "❌ Deployment test failed"

echo "🎉 Deployment complete!"
echo "🌐 Your app is live at: http://34.225.131.148"
