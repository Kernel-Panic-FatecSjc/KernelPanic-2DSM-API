# (Este arquivo deve estar em ./views/Dockerfile)

# --- Estágio 1: "Builder" ---
FROM node:18-alpine AS builder

WORKDIR /app

# Copia os arquivos de pacote DE DENTRO da subpasta frontend-app
COPY frontend-app/package*.json ./

# Instala as dependências
RUN npm install

# Copia todo o resto do código-fonte
COPY frontend-app/. .

# --- CORREÇÃO CRÍTICA AQUI ---
# 1. Aceita o argumento enviado pelo docker-compose.yml
ARG NEXT_PUBLIC_API_URL

# 2. Transforma o argumento em variável de ambiente antes do build
#    Sem isso, o Next.js vai "assar" o código com a URL undefined
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
# -----------------------------

# Desativa a telemetria do Next.js (opcional, mas recomendado)
ENV NEXT_TELEMETRY_DISABLED 1

# Roda o build (Agora ele vai ler a variável acima corretamente)
RUN npm run build

# --- Estágio 2: "Runner" ---
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED 1

# Copia apenas os arquivos necessários do estágio 'builder' para deixar a imagem leve
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

# Expõe a porta 3000
EXPOSE 3000

# Inicia o servidor Node.js
CMD ["node", "server.js"]
