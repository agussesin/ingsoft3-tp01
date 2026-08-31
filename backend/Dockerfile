FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY ReservasApi/ReservasApi.csproj ReservasApi/
RUN dotnet restore ReservasApi/ReservasApi.csproj

COPY . .
WORKDIR /src/ReservasApi
RUN dotnet publish ReservasApi.csproj \
    -c Release \
    -o /app/publish \
    --no-restore \
    /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "ReservasApi.dll"]
