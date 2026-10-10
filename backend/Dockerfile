FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY MeowOffice.Api/MeowOffice.Api.csproj MeowOffice.Api/
RUN dotnet restore MeowOffice.Api/MeowOffice.Api.csproj
COPY MeowOffice.Api/ MeowOffice.Api/
RUN dotnet publish MeowOffice.Api/MeowOffice.Api.csproj -c Release -o /app --no-restore
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app .
ENV ASPNETCORE_URLS=http://+:5080
EXPOSE 5080
ENTRYPOINT ["dotnet", "MeowOffice.Api.dll"]
