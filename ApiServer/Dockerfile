# --- Estágio 1: "Builder" (O Construtor) ---
# Usamos uma imagem Node 18 baseada em Alpine (leve)
FROM node:18-alpine AS builder

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de pacote e instala TODAS as dependências
COPY package*.json ./
RUN npm install

# Copia todo o resto do código-fonte (src, tsconfig.json, etc.)
COPY . .

# Roda seu script de build ("tsc")
RUN npm run build

# --- Estágio 2: "Runner" (O Executor) ---
# Começa do zero com a mesma imagem leve
FROM node:18-alpine AS runner

WORKDIR /app

# Copia os arquivos de pacote novamente
COPY package*.json ./

# Instala APENAS as dependências de produção
# (Pula devDependencies como typescript, nodemon, etc.)
RUN npm install --omit=dev

# Copia a pasta 'dist' (com o JS compilado) do estágio 'builder'
COPY --from=builder /app/dist ./dist

# Copia o tsconfig.json (necessário para o 'tsconfig-paths')
COPY tsconfig.json .

# Expõe a porta que sua API usa (MUDE SE FOR DIFERENTE)
EXPOSE 5000

# O comando para iniciar, usando o script 'start' que ajustamos
CMD ["npm", "run", "start"]