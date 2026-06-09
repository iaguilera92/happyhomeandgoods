@echo off
set "TEMP=C:\Windows\Temp"
set "TMP=C:\Windows\Temp"
set "USERPROFILE=C:\Users\Public"
set "HOME=C:\Users\Public"
subst X: "C:\Users\Ignacio Aguilera\Desktop\Trabajo (SPA)\GolfInColors" >nul 2>&1
cd /d X:\
node start-vite-local.mjs >> vite-run.log 2>&1
