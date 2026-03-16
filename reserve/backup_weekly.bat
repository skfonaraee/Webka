@echo off
set SOURCE=D:\Kara\Webka\reserve\Important_Data
set DEST=D:\Kara\Webka\reserve\Important_Data
robocopy %SOURCE% %DEST% /MIR
echo Weekly backup %date% %time% >> D:\Kara\Webka\reserve\Backups\backup_log.txt
pause