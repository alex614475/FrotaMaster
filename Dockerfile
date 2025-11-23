# ============================
# STAGE 1 — BACKEND (.NET 8)
# ============================
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS backend-build
WORKDIR /src

# Copia csproj separadamente
COPY ./FrotaMaster.API/FrotaMaster.API.csproj ./FrotaMaster.API/
COPY ./FrotaMaster.Application/FrotaMaster.Application.csproj ./FrotaMaster.Application/
COPY ./FrotaMaster.Domain/FrotaMaster.Domain.csproj ./FrotaMaster.Domain/
COPY ./FrotaMaster.Infrastructure/FrotaMaster.Infrastructure.csproj ./FrotaMaster.Infrastructure/

RUN dotnet restore ./FrotaMaster.API/FrotaMaster.API.csproj

# Copia todo backend
COPY . .

RUN dotnet publish ./FrotaMaster.API/FrotaMaster.API.csproj -c Release -o /app/publish



# ============================
# STAGE 2 — FRONTEND (Angular 20+)
# ============================
FROM node:20 AS frontend-build
WORKDIR /app

COPY ./UI/package*.json ./
RUN npm install

COPY ./UI .

RUN npm run build -- --configuration production



# ============================
# STAGE 3 — NGINX PARA ANGULAR
# ============================
FROM nginx:stable-alpine AS frontend
WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=frontend-build /app/dist/frotamaster/browser ./

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf



# ============================
# STAGE 4 — FINAL (.NET + FRONT)
# ============================
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

COPY --from=backend-build /app/publish .

COPY --from=frontend /usr/share/nginx/html /var/www/html

EXPOSE 8080
ENV ASPNETCORE_URLS=http://0.0.0.0:8080

ENTRYPOINT ["dotnet", "FrotaMaster.API.dll"]
