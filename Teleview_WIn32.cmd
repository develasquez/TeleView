@echo off

echo Cerraremos Google Chrome.exe

taskkill /f /T /im chrome.exe
taskkill /f /T /im chrome.exe
taskkill /f /T /im chrome.exe

echo Abrimos Chrome en modo Promiscuo
start "" "%programfiles(x86)%\google\chrome\application\chrome.exe" --disable-web-security --allow-insecure-localhost --allow-running-insecure-content --reduce-security-for-testing --app="http://localhost:3000" --start-fullscreen

bin\win32\node.exe bin\www





