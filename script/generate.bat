@echo off
setlocal enabledelayedexpansion

cd ..
set "protoDir=.\proto\api"

for /r "%protoDir%" %%f in (*.proto) do (
    set "filePath=%%f"
    set "fileDir=%%~dpf"
    set "relativePath=!fileDir:%CD%\proto%=!"
    set "apiPath=%CD%\api!relativePath!"
    set "apiPath=!apiPath:~0,-1!"
    echo proto path: !filePath!
    echo api path: !apiPath!

    if not exist "!apiPath!" (
        echo Creating directory: !apiPath!
        mkdir "!apiPath!"
    )

    echo protoc --proto_path=. --proto_path=%CD%\proto --proto_path=%CD%\proto\third_party --ts_out=no_namespace,json_names,no_grpc:%CD%\api --ts-httpapi-win_out=. !filePath!
    protoc --proto_path=%CD%\proto --proto_path=%CD%\proto\third_party --ts_out=no_namespace,json_names,no_grpc:%CD%\api --ts-httpapi-win_out=%CD%\api !filePath!
    echo.
)
