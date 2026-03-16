@echo off
setlocal EnableDelayedExpansion
set "SOURCE=D:\Kara\Webka\reserve\Important_Data"
set "DEST=D:\Kara\Webka\reserve\Backups"
set "ZIP=C:\Program Files\7-Zip\7z.exe"
for /f "tokens=2-4 delims=/ " %%a in ("%date%") do (
    set "YYYY=%%c"
    set "MM=%%a"
    set "DD=%%b"
)
set "FILENAME=Important_Data_%YYYY%-%MM%-%DD%.7z"
set "ARCHIVE=%DEST%\%FILENAME%"
"%ZIP%" a -t7z "%ARCHIVE%" "%SOURCE%" -mx=9
if errorlevel 1 (
    echo Ошибка при создании архива %date% %time% > "%DEST%\ERROR.txt"
    echo Ошибка выполнения 7-Zip! >> "%DEST%\backup_log.txt"
    echo Ошибка! Проверьте бэкап!
    pause
    exit /b
)
for %%F in ("%ARCHIVE%") do set "SIZE=%%~zF"
if !SIZE! EQU 0 (
    echo Ошибка: архив пустой %date% %time% > "%DEST%\ERROR.txt"
    echo Ошибка! Архив создан, но размер 0 байт! Проверьте исходные данные.
) else (
    echo Архив создан успешно, размер: !SIZE! байт
)
echo Завершено в %date% %time% >> "%DEST%\backup_log.txt"
pause
endlocal