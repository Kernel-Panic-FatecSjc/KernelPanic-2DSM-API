# (Este arquivo deve estar em ./views/Dockerfile)

# --- Estágio 1: "Builder" ---
FROM node:18-alpine AS builder

# O WORKDIR continua sendo /app
WORKDIR /app

# Copia os arquivos de pacote DE DENTRO da subpasta
COPY frontend-app/package*.json ./

# Roda o npm install
RUN npm install

# Copia todo o resto do código-fonte DE DENTRO da subpasta
COPY frontend-app/. .

# Desativa a telemetria
ENV NEXT_TELEMETRY_DISABLED 1

# Roda o build
RUN npm run build

# --- Estágio 2: "Runner" ---
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED 1

# Estas linhas não mudam, pois copiam do estágio 'builder'
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

# Expõe a porta 3000 (padrão do Next.js)
EXPOSE 3000

# Roda o servidor otimizado
CMD ["node", "server.js"]