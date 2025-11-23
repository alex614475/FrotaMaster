# -------------------------
# STAGE 1: Build BACKEND
# -------------------------
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /source

COPY ./FrotaMaster.sln .

COPY ./FrotaMaster.API/FrotaMaster.API.csproj ./FrotaMaster.API/
COPY ./FrotaMaster.Application/FrotaMaster.Application.csproj ./FrotaMaster.Application/
COPY ./FrotaMaster.Domain/FrotaMaster.Domain.csproj ./FrotaMaster.Domain/
COPY ./FrotaMaster.Infrastructure/FrotaMaster.Infrastructure.csproj ./FrotaMaster.Infrastructure/

RUN dotnet restore

COPY . .
RUN dotnet publish ./FrotaMaster.API/FrotaMaster.API.csproj -c Release -o /app/publish


# -------------------------
# STAGE 2: Build FRONTEND
# -------------------------
FROM node:20 AS frontend
WORKDIR /app

COPY ./UI/package*.json ./
RUN npm install

COPY ./UI .
RUN npm run build --configuration production


# -------------------------
# STAGE 3: Runtime
# -------------------------
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

# Backend
COPY --from=build /app/publish .

# Frontend (Angular)
COPY --from=frontend /app/dist/frotamaster ./wwwroot/

EXPOSE 8080
ENV ASPNETCORE_URLS=http://0.0.0.0:8080

ENTRYPOINT ["dotnet", "FrotaMaster.API.dll"]
