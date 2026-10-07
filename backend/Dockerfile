FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY backend.sln .
COPY ReservasApi/ReservasApi.csproj ReservasApi/
COPY ReservasApi.Tests/ReservasApi.Tests.csproj ReservasApi.Tests/

RUN dotnet restore backend.sln

COPY . .

RUN dotnet build backend.sln \
    -c Release \
    --no-restore

FROM build AS test

RUN dotnet test backend.sln \
    -c Release \
    --no-build \
    /p:CollectCoverage=true \
    /p:CoverletOutput=/coverage/coverage \
    /p:CoverletOutputFormat=cobertura \
    /p:Threshold=70 \
    "/p:ThresholdType=line%2cbranch" \
    "/p:Exclude=[ReservasApi]Program*%2c[ReservasApi]ReservasApi.Data.*%2c[ReservasApi]ReservasApi.Models.*%2c[ReservasApi]ReservasApi.Services.SystemClock"

FROM test AS publish

RUN dotnet publish ReservasApi/ReservasApi.csproj \
    -c Release \
    -o /app/publish \
    --no-build \
    /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

COPY --from=publish /app/publish .

ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "ReservasApi.dll"]