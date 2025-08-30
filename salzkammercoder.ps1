# SalzKammerCoder - PowerShell version of the project creator
# Next.js + Chakra UI + GSAP + Express.js Project Creator

param(
    [Parameter(Mandatory=$true, Position=0)]
    [string]$ProjectName,
    
    [Parameter(Position=1)]
    [string]$TargetDirectory = "D:/dev",
    
    [switch]$Help
)

# Show help
if ($Help) {
    Write-Host @"

SalzKammerCoder - Next.js + Chakra UI + GSAP + Express.js Project Creator

Usage: salzkammercoder.ps1 <project-name> [target-directory]

Examples:
  salzkammercoder.ps1 my-awesome-app                    (creates in D:/dev/my-awesome-app)
  salzkammercoder.ps1 my-awesome-app .                  (creates in current directory)
  salzkammercoder.ps1 my-awesome-app C:\Users\Dev       (creates in C:\Users\Dev\my-awesome-app)

This script will:
  1. Clone the Next.js + Chakra UI + GSAP + Express.js template from Git
  2. Initialize a fresh git repository
  3. Install all dependencies
  4. Set up the project for development

Default target directory: D:/dev

Requirements:
  - Git
  - Node.js 18.0.0 or higher
  - npm

"@ -ForegroundColor Cyan
    exit 0
}

# Color functions
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

# Validate project name
function Test-ProjectName($name) {
    if ([string]::IsNullOrWhiteSpace($name)) {
        Write-Error "Project name is required!"
        exit 1
    }
    
    if ($name -notmatch '^[a-zA-Z0-9_-]+$') {
        Write-Error "Project name can only contain letters, numbers, hyphens, and underscores"
        exit 1
    }
    
    if ($name.Length -lt 3 -or $name.Length -gt 50) {
        Write-Error "Project name must be between 3 and 50 characters"
        exit 1
    }
}

# Check prerequisites
function Test-Prerequisites {
    Write-Status "Checking prerequisites..."
    
    # Check Git
    try {
        $null = Get-Command git -ErrorAction Stop
    } catch {
        Write-Error "Git is not installed. Please install Git and try again."
        Write-Host "Download from: https://git-scm.com/download/win" -ForegroundColor Yellow
        exit 1
    }
    
    # Check Node.js
    try {
        $null = Get-Command node -ErrorAction Stop
        $nodeVersion = node --version
        $versionNumber = $nodeVersion -replace 'v', ''
        $majorVersion = ($versionNumber -split '\.')[0]
        
        if ([int]$majorVersion -lt 18) {
            Write-Warning "Node.js version $nodeVersion detected. This project requires Node.js 18.0.0 or higher."
            Write-Warning "Please consider upgrading Node.js for the best experience."
        }
    } catch {
        Write-Error "Node.js is not installed. Please install Node.js 18.0.0+ and try again."
        Write-Host "Download from: https://nodejs.org/" -ForegroundColor Yellow
        exit 1
    }
    
    # Check npm
    try {
        $null = Get-Command npm -ErrorAction Stop
    } catch {
        Write-Error "npm is not installed. Please install Node.js (which includes npm) and try again."
        exit 1
    }
    
    Write-Success "Prerequisites check passed!"
}

# Get template files from Git repository
function Get-Template($tempDir) {
    Write-Status "Getting template files..."
    
    # Repository URL - update this with your actual repository
    $templateRepo = "https://github.com/UranymusDev/default_project"
    
    if ($templateRepo -like "*YOUR_USERNAME*") {
        Write-Error "Repository URL not configured!"
        Write-Error "Please update the templateRepo variable in this script with your actual repository URL."
        Write-Error "Example: https://github.com/yourusername/your-template-repo.git"
        exit 1
    }
    
    Write-Status "Cloning template from repository: $templateRepo"
    
    try {
        git clone $templateRepo $tempDir 2>$null
        if ($LASTEXITCODE -ne 0) {
            throw "Git clone failed"
        }
    } catch {
        Write-Error "Failed to clone template repository: $templateRepo"
        Write-Error "Please check:"
        Write-Error "  1. Repository URL is correct"
        Write-Error "  2. You have internet connection"
        Write-Error "  3. Repository is publicly accessible or you have access"
        exit 1
    }
    
    # Remove .git folder to start fresh
    $gitDir = Join-Path $tempDir ".git"
    if (Test-Path $gitDir) {
        Remove-Item $gitDir -Recurse -Force
    }
    
    # Remove script files if they exist in the template
    $scriptFiles = @("salzkammercoder*", "create-chakra-project*", "setup-path.ps1", "install.ps1", "SCRIPTS_README.md")
    foreach ($pattern in $scriptFiles) {
        Get-ChildItem -Path $tempDir -Filter $pattern -ErrorAction SilentlyContinue | Remove-Item -Force
    }
    
    # Verify essential files
    $packageJsonPath = Join-Path $tempDir "package.json"
    if (-not (Test-Path $packageJsonPath)) {
        Write-Error "Template appears to be invalid - no package.json found"
        Write-Error "Please check that your repository contains a valid Next.js + Chakra UI project"
        exit 1
    }
    
    Write-Success "Template files acquired!"
}

# Setup project
function New-Project($projectName, $projectDir) {
    Write-Status "Setting up project: $projectName"
    
    # Create temporary directory
    $tempDir = Join-Path $env:TEMP "salzkammercoder-template-$(Get-Random)"
    New-Item -ItemType Directory -Path $tempDir -Force | Out-Null
    
    try {
        # Get template files
        Get-Template $tempDir
        
        # Create project directory
        New-Item -ItemType Directory -Path $projectDir -Force | Out-Null
        
        # Copy files to project directory
        Write-Status "Copying template files to project directory..."
        Copy-Item -Path "$tempDir\*" -Destination $projectDir -Recurse -Force
        
        # Change to project directory
        Set-Location $projectDir
        
        # Update package.json
        $packageJsonPath = Join-Path $projectDir "package.json"
        if (Test-Path $packageJsonPath) {
            Write-Status "Updating package.json with project name..."
            $packageJson = Get-Content $packageJsonPath -Raw | ConvertFrom-Json
            $packageJson.name = $projectName
            $packageJson | ConvertTo-Json -Depth 10 | Set-Content $packageJsonPath
        }
        
        # Initialize git
        Write-Status "Initializing Git repository..."
        git init | Out-Null
        
        # Create .gitignore if it doesn't exist
        $gitignorePath = Join-Path $projectDir ".gitignore"
        if (-not (Test-Path $gitignorePath)) {
            Write-Status "Creating .gitignore file..."
            @"
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Next.js
.next/
out/
build/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
*.lcov

# IDE files
.vscode/
.idea/
*.swp
*.swo
*~

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Logs
logs
*.log

# TypeScript
*.tsbuildinfo

# Storybook build outputs
storybook-static

# Local development
.vercel
"@ | Set-Content $gitignorePath
        }
        
        # Install dependencies
        Write-Status "Installing dependencies (this may take a few minutes)..."
        $npmResult = npm install
        if ($LASTEXITCODE -ne 0) {
            Write-Error "Failed to install dependencies. Please check your internet connection and try again."
            exit 1
        }
        
        # Create initial commit
        Write-Status "Creating initial commit..."
        git add . | Out-Null
        git commit -m "Initial commit: Next.js + Chakra UI + GSAP + Express.js project setup" | Out-Null
        
        Write-Success "Project '$projectName' has been created successfully!"
        
    } finally {
        # Clean up temp directory
        if (Test-Path $tempDir) {
            Remove-Item $tempDir -Recurse -Force
        }
    }
}

# Show post-setup instructions
function Show-Instructions($projectName, $projectDir) {
    Write-Host ""
    Write-Success "🎉 Your new Next.js + Chakra UI + GSAP + Express.js project is ready!"
    Write-Host ""
    Write-Host "Project Location: " -NoNewline
    Write-Host $projectDir -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Next Steps:" -ForegroundColor Yellow
    Write-Host "  1. Navigate to your project:"
    Write-Host "     cd `"$projectDir`""
    Write-Host ""
    Write-Host "  2. Start the development server:"
    Write-Host "     npm run dev"
    Write-Host ""
    Write-Host "  3. Open your browser to:"
    Write-Host "     http://localhost:3000"
    Write-Host ""
    Write-Host "Available Scripts:" -ForegroundColor Yellow
    Write-Host "  npm run dev          - Start development servers (frontend + backend)"
    Write-Host "  npm run dev:client   - Start only Next.js frontend"
    Write-Host "  npm run dev:server   - Start only Express.js backend"
    Write-Host "  npm run build        - Build for production"
    Write-Host "  npm run test         - Run tests"
    Write-Host "  npm run lint         - Run linter"
    Write-Host "  npm run storybook    - Start Storybook"
    Write-Host ""
    Write-Host "Key Features:" -ForegroundColor Yellow
    Write-Host "  ✨ Next.js 15 with App Router"
    Write-Host "  🎨 Chakra UI v2 with advanced theming (6 color schemes)"
    Write-Host "  🎭 GSAP animations and scroll triggers"
    Write-Host "  🚀 Express.js backend with TypeScript"
    Write-Host "  📱 Responsive design with dark/light modes"
    Write-Host "  🧪 Testing setup with Jest and Testing Library"
    Write-Host "  📚 Storybook for component documentation"
    Write-Host ""
    Write-Host "Happy coding! 🚀" -ForegroundColor Green
}

# Main execution
try {
    # Validate project name
    Test-ProjectName $ProjectName
    
    # Resolve target directory
    if ($TargetDirectory -eq ".") {
        $projectDir = Join-Path (Get-Location) $ProjectName
    } else {
        $projectDir = Join-Path $TargetDirectory $ProjectName
    }
    
    # Check if directory already exists
    if (Test-Path $projectDir) {
        Write-Error "Directory '$projectDir' already exists!"
        Write-Error "Please choose a different project name or remove the existing directory."
        exit 1
    }
    
    # Check prerequisites
    Test-Prerequisites
    
    # Setup the project
    New-Project $ProjectName $projectDir
    
    # Show instructions
    Show-Instructions $ProjectName $projectDir
    
} catch {
    Write-Error "An unexpected error occurred: $($_.Exception.Message)"
    exit 1
}
