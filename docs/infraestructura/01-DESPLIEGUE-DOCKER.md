# 01 · Despliegue con Docker (Contenedorización)

**Nayarit Digital / ConnectX / SOATM** · Infraestructura como Código · v1.0

Este documento explica cómo levantar y desplegar la plataforma **ConnectX (SOATM)** utilizando Docker. Este es el primer paso en la arquitectura a escala nacional, garantizando que el sistema sea agnóstico a la nube, reproducible y escalable.

## 1. El Concepto: Eliminando el "Funciona en mi máquina"

Hemos empaquetado la aplicación en un **contenedor de Docker**. Esto significa que:
*   No necesitas instalar versiones específicas de Node.js en tu servidor.
*   El código de producción, las dependencias y la configuración de entorno viajan juntos.
*   Puedes desplegar el mismo contenedor exacto en tu laptop, en AWS, Google Cloud, Azure, o en los servidores on-premise del gobierno.

## 2. Requisitos Previos

*   [Docker](https://docs.docker.com/get-docker/) instalado.
*   [Docker Compose](https://docs.docker.com/compose/install/) instalado (usualmente incluido con Docker Desktop).
*   Las variables de entorno configuradas (Firebase, Gemini, Stripe). Puedes copiar el `.env.example` a un archivo `.env`.

## 3. Construir y Levantar el Sistema (Local / Pruebas)

Para construir la imagen y levantar el servidor usando Docker Compose, corre el siguiente comando en la raíz del proyecto:

```bash
docker-compose up --build -d
```

*   `--build`: Fuerza la construcción de la imagen usando nuestro `Dockerfile` multi-etapa.
*   `-d`: Ejecuta el contenedor en modo "detached" (en segundo plano).

El sistema estará disponible en `http://localhost:3000`.

Para ver los logs en tiempo real:

```bash
docker-compose logs -f
```

Para detener el sistema:

```bash
docker-compose down
```

## 4. Entendiendo el `Dockerfile` (Arquitectura Multi-etapa)

Nuestro `Dockerfile` utiliza un patrón de construcción multi-etapa por seguridad y eficiencia:

1.  **Etapa `builder`**: Usa una imagen con las herramientas necesarias para compilar TypeScript y empaquetar el frontend con Vite y el backend con esbuild.
2.  **Etapa `production`**: Toma *solo* los archivos estáticos y el servidor compilado de la etapa anterior (la carpeta `dist/`) y las dependencias estrictamente de producción (`npm ci --omit=dev`).
3.  **Seguridad**: El contenedor final ejecuta la aplicación bajo el usuario `node` (sin privilegios de root) y pesa una fracción de lo que pesaría si incluyera el código fuente completo.

## 5. El Siguiente Paso: Infraestructura como Código (IaC)

Este contenedor es el bloque de construcción fundamental. En iteraciones futuras, esta imagen de Docker será desplegada en un clúster de **Kubernetes (K8s)** utilizando herramientas como **Terraform**, permitiendo balanceo de carga automático, autoescalado en picos de demanda y persistencia en clústeres de PostgreSQL para garantizar la *Soberanía de Datos*.
