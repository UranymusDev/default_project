# SalzKammerCoder Quick Installer

param(
    [switch]$SystemWide,
    [string]$InstallPath,
    [switch]$Help
)

if ($Help) {
    Write-Host "SalzKammerCoder - Quick Installer" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Usage:"
    Write-Host "  install.ps1                    # Install for current user"
    Write-Host "  install.ps1 -SystemWide        # Install for all users (requires Admin)"
    Write-Host "  install.ps1 -InstallPath 'C:\MyTools'  # Custom install location"
    Write-Host ""
    Write-Host "After installation, you can create projects from anywhere:"
    Write-Host "  salzkammercoder my-awesome-app"
    exit 0
}

function Write-Status($message) {
    Write-Host "[INFO] $message" -ForegroundColor Blue
}

function Write-Success($message) {
    Write-Host "[SUCCESS] $message" -ForegroundColor Green
}

function Write-Warning($message) {
    Write-Host "[WARNING] $message" -ForegroundColor Yellow
}

function Write-Error($message) {
    Write-Host "[ERROR] $message" -ForegroundColor Red
}

function Test-Administrator {
    $currentPrincipal = New-Object Security.Principal.WindowsPrincipal([Security.Principal.WindowsIdentity]::GetCurrent())
    return $currentPrincipal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
}

try {
    Write-Host ""
    Write-Host "SalzKammerCoder - Quick Installer" -ForegroundColor Cyan
    Write-Host "==================================" -ForegroundColor Cyan
    Write-Host ""

    # Determine installation directory
    if ($InstallPath) {
        $installDir = $InstallPath
        $pathScope = if (Test-Administrator) { "Machine" } else { "User" }
    } elseif ($SystemWide) {
        if (-not (Test-Administrator)) {
            Write-Error "Administrator privileges required for system-wide installation."
            Write-Host "Please run PowerShell as Administrator or remove -SystemWide flag." -ForegroundColor Yellow
            exit 1
        }
        $installDir = Join-Path $env:ProgramFiles "SalzKammerCoder"
        $pathScope = "Machine"
    } else {
        $installDir = Join-Path $env:LOCALAPPDATA "SalzKammerCoder"
        $pathScope = "User"
    }

    Write-Status "Installing to: $installDir"
    Write-Status "PATH scope: $pathScope"

    # Check prerequisites
    Write-Status "Checking prerequisites..."
    
    $missingTools = @()
    
    if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
        $missingTools += "Git"
    }
    
    if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
        $missingTools += "Node.js"
    }
    
    if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
        $missingTools += "npm"
    }
    
    if ($missingTools.Count -gt 0) {
        Write-Warning "Missing prerequisites: $($missingTools -join ', ')"
        Write-Host ""
        Write-Host "Please install the following:" -ForegroundColor Yellow
        if ($missingTools -contains "Git") {
            Write-Host "  Git for Windows: https://git-scm.com/download/win" -ForegroundColor Yellow
        }
        if ($missingTools -contains "Node.js" -or $missingTools -contains "npm") {
            Write-Host "  Node.js (includes npm): https://nodejs.org/" -ForegroundColor Yellow
        }
        Write-Host ""
        Write-Host "Installation will continue, but you'll need these tools to create projects." -ForegroundColor Yellow
        Write-Host ""
        Start-Sleep 3
    } else {
        Write-Success "All prerequisites found!"
    }

    # Create installation directory
    if (-not (Test-Path $installDir)) {
        New-Item -ItemType Directory -Path $installDir -Force | Out-Null
        Write-Status "Created installation directory"
    }

    # Copy files
    $scriptDir = if ($MyInvocation.ScriptName) { 
        Split-Path -Parent $MyInvocation.ScriptName 
    } else { 
        Get-Location 
    }
    
    Write-Status "Script directory: $scriptDir"
    
    $filesToCopy = @(
        "salzkammercoder.sh",
        "salzkammercoder.bat",
        "salzkammercoder.ps1",
        "SCRIPTS_README.md"
    )

    Write-Status "Copying script files..."
    foreach ($file in $filesToCopy) {
        if ([string]::IsNullOrWhiteSpace($file)) {
            Write-Warning "Skipping empty filename"
            continue
        }
        
        $sourcePath = Join-Path $scriptDir $file
        $destPath = Join-Path $installDir $file
        
        Write-Status "  Checking: $sourcePath"
        
        if (Test-Path $sourcePath) {
            try {
                Copy-Item $sourcePath $destPath -Force -ErrorAction Stop
                Write-Status "  Copied $file"
            } catch {
                Write-Warning "  Failed to copy $file`: $($_.Exception.Message)"
            }
        } else {
            Write-Warning "  File not found: $sourcePath"
        }
    }

    # Add to PATH
    $currentPath = [Environment]::GetEnvironmentVariable("PATH", $pathScope)
    
    if ($currentPath -split ';' -contains $installDir) {
        Write-Success "Directory already in PATH"
    } else {
        $newPath = $currentPath + ";" + $installDir
        [Environment]::SetEnvironmentVariable("PATH", $newPath, $pathScope)
        Write-Success "Added to PATH"
    }

    # Success message
    Write-Host ""
    Write-Success "Installation completed successfully!"
    Write-Host ""
    Write-Host "You can now create projects from anywhere using:" -ForegroundColor Yellow
    Write-Host "  salzkammercoder my-awesome-app" -ForegroundColor Green
    Write-Host ""
    Write-Host "Examples:" -ForegroundColor Yellow
    Write-Host "  salzkammercoder my-blog" -ForegroundColor Cyan
    Write-Host "  salzkammercoder ecommerce-site C:\Projects" -ForegroundColor Cyan
    Write-Host "  salzkammercoder portfolio-app ." -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Note: You may need to restart your command prompt/terminal" -ForegroundColor Yellow
    Write-Host "for the PATH changes to take effect." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "For help: salzkammercoder --help" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Happy coding!" -ForegroundColor Green

} catch {
    Write-Error "Installation failed: $($_.Exception.Message)"
    Write-Host ""
    Write-Host "Please try running as Administrator or check the error above." -ForegroundColor Yellow
    exit 1
}
