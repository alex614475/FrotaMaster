# ============================
# STAGE 1 — BACKEND (.NET 8)
# ============================
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY ./FrotaMaster.sln .

COPY ./FrotaMaster.API/FrotaMaster.API.csproj ./FrotaMaster.API/
COPY ./FrotaMaster.Application/FrotaMaster.Application.csproj ./FrotaMaster.Application/
COPY ./FrotaMaster.Domain/FrotaMaster.Domain.csproj ./FrotaMaster.Domain/
COPY ./FrotaMaster.Infrastructure/FrotaMaster.Infrastructure.csproj ./FrotaMaster.Infrastructure/

RUN dotnet restore

COPY . .

# Publica a API
RUN dotnet publish ./FrotaMaster.API/FrotaMaster.API.csproj -c Release -o /app/publish


# ============================
# STAGE 2 — FRONTEND Angular
# ============================
FROM node:20 AS frontend
WORKDIR /app

COPY ./UI/package*.json ./
RUN npm install

COPY ./UI .
RUN npm run build -- --configuration production


# ============================
# STAGE 3 — IMAGEM FINAL
# ============================
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

# Copia API
COPY --from=build /app/publish .

# Copia Angular compilado para wwwroot
COPY --from=frontend /app/dist/FrotaMaster/browser ./wwwroot/

EXPOSE 8080
ENV ASPNETCORE_URLS=http://0.0.0.0:8080

ENTRYPOINT ["dotnet", "FrotaMaster.API.dll"]
