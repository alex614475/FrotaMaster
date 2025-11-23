# ============================
# 1) BACKEND - .NET 8
# ============================
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS backend-build
WORKDIR /src

# Copia apenas os .csproj para restaurar dependências
COPY ./FrotaMaster.API/FrotaMaster.API.csproj ./FrotaMaster.API/
COPY ./FrotaMaster.Application/FrotaMaster.Application.csproj ./FrotaMaster.Application/
COPY ./FrotaMaster.Domain/FrotaMaster.Domain.csproj ./FrotaMaster.Domain/
COPY ./FrotaMaster.Infrastructure/FrotaMaster.Infrastructure.csproj ./FrotaMaster.Infrastructure/

# Restaurar dependências
RUN dotnet restore ./FrotaMaster.API/FrotaMaster.API.csproj

# Copiar todo o backend
COPY . .

# Publicar
RUN dotnet publish ./FrotaMaster.API/FrotaMaster.API.csproj -c Release -o /app/publish


# ============================
# 2) FRONTEND - Angular
# ============================
FROM node:18 AS frontend-build
WORKDIR /app

COPY ./UI/package.json ./UI/package-lock.json ./
RUN npm install

COPY ./UI .

RUN npm run build


# ============================
# 3) RUNTIME - NGINX + API
# ============================
FROM nginx:alpine AS final

# Copiar build do Angular
COPY --from=frontend-build /app/dist/frotamaster/browser /usr/share/nginx/html

# Copiar API publicada
COPY --from=backend-build /app/publish /app

# Expor porta default NGINX
EXPOSE 80

# Iniciar NGINX
CMD ["nginx", "-g", "daemon off;"]
