# -------------------------
# STAGE 1: Build
# -------------------------
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /source

# Copia a solução e restaura
COPY ./FrotaMaster.sln .

COPY ./FrotaMaster.API/FrotaMaster.API.csproj ./FrotaMaster.API/
COPY ./FrotaMaster.Application/FrotaMaster.Application.csproj ./FrotaMaster.Application/
COPY ./FrotaMaster.Domain/FrotaMaster.Domain.csproj ./FrotaMaster.Domain/
COPY ./FrotaMaster.Infrastructure/FrotaMaster.Infrastructure.csproj ./FrotaMaster.Infrastructure/

RUN dotnet restore

# Copia tudo e publica
COPY . .
RUN dotnet publish ./FrotaMaster.API/FrotaMaster.API.csproj -c Release -o /app/publish

# -------------------------
# STAGE 2: Runtime
# -------------------------
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

COPY --from=build /app/publish .

EXPOSE 8080

ENV ASPNETCORE_URLS=http://0.0.0.0:8080

ENTRYPOINT ["dotnet", "FrotaMaster.API.dll"]
