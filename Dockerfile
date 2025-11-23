# ============================
# STAGE 1 — BACKEND (.NET 8)
# ============================
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS backend-build
WORKDIR /src

COPY ./API/API.csproj ./API/
COPY ./Application/Application.csproj ./Application/
COPY ./Domain/Domain.csproj ./Domain/
COPY ./Infrastructure/Infrastructure.csproj ./Infrastructure/

RUN dotnet restore ./API/API.csproj

COPY . .

RUN dotnet publish ./API/API.csproj -c Release -o /app/publish


# ============================
# STAGE 2 — FRONTEND (Angular)
# ============================
FROM node:20 AS frontend-build
WORKDIR /app

COPY ./UI/package*.json ./
RUN npm install

COPY ./UI .

# Build CORRETO para seu projeto
RUN npm run build -- --configuration=production --project=FrotaMaster


# ============================
# STAGE 3 — NGINX FRONTEND
# ============================
FROM nginx:stable AS frontend
WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

# Caminho CORRETO baseado no seu angular.json
COPY --from=frontend-build /app/dist/frotamaster/browser ./


# ============================
# STAGE 4 — FINAL (.NET + NGINX)
# ============================
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

COPY --from=backend-build /app/publish .

COPY --from=frontend /usr/share/nginx/html /var/www/html

EXPOSE 8080
ENV ASPNETCORE_URLS=http://0.0.0.0:8080

ENTRYPOINT ["dotnet", "API.dll"]
