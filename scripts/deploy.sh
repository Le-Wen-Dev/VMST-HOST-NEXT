#!/bin/bash
# ============================================================
#  VMST Host — Deploy Script
#  Build + Push Git + Deploy to VPS
# ============================================================

set -e

VPS_HOST="103.37.60.86"
VPS_USER="root"
VPS_PASS="AloodmKYVRf7"
VPS_PATH="/var/www/v2.vmst.host"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${CYAN}═══════════════════════════════════════${NC}"
echo -e "${CYAN}  VMST Host — Deploy Pipeline${NC}"
echo -e "${CYAN}═══════════════════════════════════════${NC}"
echo ""

# 1. Ask for commit message
read -p "$(echo -e ${YELLOW}Commit message: ${NC})" COMMIT_MSG
if [ -z "$COMMIT_MSG" ]; then
  echo -e "${RED}Commit message không được để trống!${NC}"
  exit 1
fi

# 2. Git add + commit + push
echo ""
echo -e "${CYAN}[1/4] Git commit & push...${NC}"
git add -A
git commit -m "$COMMIT_MSG" || echo -e "${YELLOW}Nothing to commit${NC}"
git push origin main || git push -u origin main
echo -e "${GREEN}✓ Git pushed${NC}"

# 3. Build Next.js
echo ""
echo -e "${CYAN}[2/4] Building Next.js...${NC}"
npm run build
echo -e "${GREEN}✓ Build complete${NC}"

# 4. Package for deploy
echo ""
echo -e "${CYAN}[3/4] Packaging...${NC}"
tar czf /tmp/vmst-deploy.tar.gz \
  --exclude='node_modules' \
  --exclude='.git' \
  --exclude='.claude' \
  --exclude='src/_pages_old' \
  .next \
  public \
  server \
  package.json \
  package-lock.json \
  next.config.ts \
  tailwind.config.js \
  postcss.config.mjs \
  tsconfig.json \
  .env.local \
  middleware.ts
echo -e "${GREEN}✓ Package ready${NC}"

# 5. Upload & deploy on VPS
echo ""
echo -e "${CYAN}[4/4] Deploying to VPS...${NC}"
sshpass -p "$VPS_PASS" scp -o StrictHostKeyChecking=no /tmp/vmst-deploy.tar.gz ${VPS_USER}@${VPS_HOST}:/tmp/

sshpass -p "$VPS_PASS" ssh -o StrictHostKeyChecking=no ${VPS_USER}@${VPS_HOST} << 'REMOTE'
  set -e
  cd /var/www/v2.vmst.host
  tar xzf /tmp/vmst-deploy.tar.gz
  npm install --production
  pm2 restart v2-vmst-host || pm2 start npm --name v2-vmst-host -- start
  pm2 restart sepay-server || pm2 start server/sepay-webhook.js --name sepay-server
  rm /tmp/vmst-deploy.tar.gz
  echo "Deploy OK"
REMOTE

rm /tmp/vmst-deploy.tar.gz 2>/dev/null || true

echo ""
echo -e "${GREEN}═══════════════════════════════════════${NC}"
echo -e "${GREEN}  Deploy thành công!${NC}"
echo -e "${GREEN}  https://vmst.host${NC}"
echo -e "${GREEN}═══════════════════════════════════════${NC}"
