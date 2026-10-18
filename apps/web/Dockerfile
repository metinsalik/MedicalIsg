# Multi-stage Dockerfile for Medical ISG Web (Vite + Nginx)
FROM node:22-alpine AS builder

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@12.14.0 --activate

# Workspace dosyalarını kopyala
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml turbo.json ./
COPY packages/shared ./packages/shared
COPY apps/web ./apps/web

RUN pnpm config set ignore-scripts false
RUN pnpm install --frozen-lockfile

# Derle
RUN pnpm --filter @isg/shared build
RUN pnpm --filter @isg/web build

# Production Nginx Image
FROM nginx:alpine

# Statik dosyaları kopyala
COPY --from=builder /app/apps/web/dist /usr/share/nginx/html
COPY infra/nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
