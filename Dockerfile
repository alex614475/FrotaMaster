# ============================
# STAGE 1 — BACKEND (.NET 8)
# ============================
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS backend-build
WORKDIR /src

COPY ./FrotaMaster.API/FrotaMaster.API.csproj ./FrotaMaster.API/
COPY ./FrotaMaster.Application/FrotaMaster.Application.csproj ./FrotaMaster.Application/
COPY ./FrotaMaster.Domain/FrotaMaster.Domain.csproj ./FrotaMaster.Domain/
COPY ./FrotaMaster.Infrastructure/FrotaMaster.Infrastructure.csproj ./FrotaMaster.Infrastructure/

RUN dotnet restore ./FrotaMaster.API/FrotaMaster.API.csproj

COPY . .

RUN dotnet publish ./FrotaMaster.API/FrotaMaster.API.csproj -c Release -o /app/publish


# ============================
# STAGE 2 — FRONTEND (Angular)
# ============================
FROM node:20 AS frontend-build
WORKDIR /app

COPY ./UI/package*.json ./
RUN npm install

COPY ./UI .
RUN npm run build -- --configuration production


# ============================
# STAGE 3 — FINAL (.NET + ANGULAR)
# ============================
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

# Copia API
COPY --from=backend-build /app/publish .

# Copia Angular para wwwroot
COPY --from=frontend-build /app/dist/frotamaster/browser ./wwwroot/

EXPOSE 8080
ENV ASPNETCORE_URLS=http://0.0.0.0:8080

ENTRYPOINT ["dotnet", "FrotaMaster.API.dll"]
