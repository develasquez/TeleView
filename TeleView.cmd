@echo off

echo Cerraremos Google Chrome.exe
setlocal

:PROMPT
SET /P AREYOUSURE=Cerrar Google Chrome (Y/[N])?
IF /I "%AREYOUSURE%" NEQ "Y" GOTO END

taskkill /f /im chrome.exe
taskkill /f /im chrome.exe
taskkill /f /im chrome.exe

echo Abrimos Chrome en modo Promiscuo
start "" "c:\program files (x86)\google\chrome\application\chrome.exe" --disable-web-security --allow-insecure-localhost --allow-running-insecure-content --reduce-security-for-testing --app="http://localhost:3000" --start-fullscreen

bin\node.exe bin\www





:END
endlocal