# Build Angular app
FROM node:20-alpine AS angular-build
WORKDIR /app/client
COPY vvis.client/package*.json ./
RUN npm install
COPY vvis.client/ ./
RUN npm run build

# Build .NET app
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS dotnet-build
WORKDIR /app
COPY VVIS.Server/*.csproj ./VVIS.Server/
RUN dotnet restore ./VVIS.Server/VVIS.Server.csproj
COPY VVIS.Server/ ./VVIS.Server/
WORKDIR /app/VVIS.Server
RUN dotnet publish -c Release -o out

# Final runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=dotnet-build /app/VVIS.Server/out .
COPY --from=angular-build /app/client/dist/vvis.client/browser ./wwwroot

# Set environment to production
ENV ASPNETCORE_ENVIRONMENT=Production

# Use shell form to allow environment variable expansion at runtime
CMD dotnet VVIS.Server.dll --urls "http://0.0.0.0:${PORT:-8080}"
