@echo off
REM Windows batch wrapper for salzkammercoder.sh
REM This allows the script to be called from anywhere on Windows

setlocal enabledelayedexpansion

REM Get the directory where this batch file is located
set "SCRIPT_DIR=%~dp0"

REM Path to the shell script
set "SHELL_SCRIPT=%SCRIPT_DIR%salzkammercoder.sh"

REM Check if Git Bash is available
where git >nul 2>nul
if errorlevel 1 (
    echo Error: Git is not installed or not in PATH.
    echo Please install Git for Windows and try again.
    echo Download from: https://git-scm.com/download/win
    pause
    exit /b 1
)

REM Check if the shell script exists
if not exist "%SHELL_SCRIPT%" (
    echo Error: Shell script not found at %SHELL_SCRIPT%
    echo Please ensure both salzkammercoder.bat and salzkammercoder.sh are in the same directory.
    pause
    exit /b 1
)

REM Show help if no arguments or help requested
if "%~1"=="" goto :show_help
if "%~1"=="-h" goto :show_help
if "%~1"=="--help" goto :show_help
if "%~1"=="/?" goto :show_help

REM Convert Windows paths to Unix-style for Git Bash
set "ARG1=%~1"
set "ARG2=%~2"

if defined ARG2 (
    REM Convert Windows path to Unix path for Git Bash
    set "ARG2=!ARG2:\=/!"
    if "!ARG2:~1,1!"==":" (
        set "DRIVE=!ARG2:~0,1!"
        set "PATH_PART=!ARG2:~2!"
        set "ARG2=/!DRIVE!/!PATH_PART!"
    )
)

REM Run the shell script through Git Bash
echo Creating Next.js + Chakra UI + GSAP + Express.js project...
echo.

if defined ARG2 (
    bash "%SHELL_SCRIPT%" "%ARG1%" "%ARG2%"
) else (
    bash "%SHELL_SCRIPT%" "%ARG1%"
)

goto :end

:show_help
echo.
echo SalzKammerCoder - Next.js + Chakra UI + GSAP + Express.js Project Creator
echo.
echo Usage: salzkammercoder ^<project-name^> [target-directory]
echo.
echo Examples:
echo   salzkammercoder my-awesome-app                   (creates in D:\dev\my-awesome-app)
echo   salzkammercoder my-awesome-app .                 (creates in current directory)
echo   salzkammercoder my-awesome-app C:\Users\Dev      (creates in C:\Users\Dev\my-awesome-app)
echo.
echo This script will:
echo   1. Clone the Next.js + Chakra UI + GSAP + Express.js template from Git
echo   2. Initialize a fresh git repository
echo   3. Install all dependencies
echo   4. Set up the project for development
echo.
echo Default target directory: D:\dev
echo.
echo Requirements:
echo   - Git for Windows (includes Git Bash)
echo   - Node.js 18.0.0 or higher
echo   - npm
echo.
pause

:end
endlocal
