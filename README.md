<img src="img/img.png" />

## Pre-requisits
 * .NET Core v2.1
 * node.js > 6.x

## Development server
### .NET Core application which provides API and SPA fallback:
```
cd DC.FrontEndAssignment.WebApi/
dotnet watch run
```
### Angular Live reload by webpack:
```
cd DC.FrontEndAssignment.WebApi/
webpack -w
```

## Production build
```
cd DC.FrontEndAssignment.WebApi/
dotnet publish
```

This repository already contains a production build in bin/Debug/* directory, so you can run it just by:
```
cd DC.FrontEndAssignment/DC.FrontEndAssignment.WebApi/
dotnet run bin/Debug/netcoreapp2.0/publish/DC.FrontEndAssignment.WebApi.dll
```