@echo off
chcp 65001 >nul
echo.
echo  =========================================
echo   Carlos Wagnher Automotive
echo  =========================================
echo.

:: Verifica Node.js
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
  echo  ERRO: Node.js nao encontrado!
  echo  Baixe em: https://nodejs.org/
  echo.
  pause
  exit /b 1
)

echo  Iniciando servidor...
echo  Acesse: http://localhost:3000
echo  Pressione Ctrl+C para parar.
echo.

node "%~dp0server.js"
pause
