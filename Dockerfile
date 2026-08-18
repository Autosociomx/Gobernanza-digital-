# Etapa 1: Construcción (Build)
FROM node:22-alpine AS builder

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package.json package-lock.json ./

# Instalar dependencias (incluyendo devDependencies para compilar)
RUN npm ci

# Copiar el resto del código fuente
COPY . .

# Compilar la aplicación (Vite para frontend, esbuild para backend)
RUN npm run build

# Etapa 2: Producción (Production)
FROM node:22-alpine AS production

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar solo el artefacto final de servidor desde la etapa de construcción
COPY --from=builder /app/dist ./dist

# Copiar dependencias de producción
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Variable de entorno de puerto
ENV PORT=3000
EXPOSE 3000

# Usuario no root por razones de seguridad
USER node

# Comando de inicio
CMD ["npm", "start"]
