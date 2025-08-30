# Project Creator Scripts

This collection of scripts allows you to quickly create new Next.js + Chakra UI + GSAP + Express.js projects from anywhere on your system.

## 📦 What's Included

- `create-chakra-project.sh` - Main shell script (works on Windows with Git Bash, macOS, Linux)
- `create-chakra-project.bat` - Windows batch wrapper
- `create-chakra-project.ps1` - PowerShell version for Windows
- `setup-path.ps1` - Script to add to Windows PATH
- `SCRIPTS_README.md` - This documentation

## 🚀 Quick Setup (Windows)

### Option 1: PowerShell (Recommended)

1. **Copy the scripts** to your template directory:
   ```powershell
   # Already done if you're in the template directory
   ```

2. **Install to PATH** (run as Administrator for system-wide, or as user for current user only):
   ```powershell
   # For current user only
   .\setup-path.ps1
   
   # For all users (requires Administrator)
   .\setup-path.ps1 -SystemWide
   ```

3. **Restart your terminal** and test:
   ```cmd
   create-chakra-project my-awesome-app
   ```

### Option 2: Manual PATH Setup

1. Create a directory for your scripts (e.g., `C:\Tools\ChakraCreator`)
2. Copy the script files to this directory
3. Add the directory to your PATH:
   - Press `Win + R`, type `sysdm.cpl`, press Enter
   - Click "Environment Variables..."
   - Under "User variables" or "System variables", find "Path"
   - Click "Edit..." → "New" → Add your scripts directory
   - Click "OK" to save

## 💻 Usage

### Basic Usage
```bash
# Create project in current directory
create-chakra-project my-awesome-app

# Create project in specific directory
create-chakra-project my-awesome-app C:\Users\Dev\projects
create-chakra-project my-awesome-app ~/projects
```

### PowerShell Specific
```powershell
# Using PowerShell version directly
create-chakra-project.ps1 my-awesome-app

# With target directory
create-chakra-project.ps1 my-awesome-app C:\Users\Dev\projects
```

### Get Help
```bash
create-chakra-project --help
create-chakra-project.ps1 -Help
```

## 🎯 What the Scripts Do

1. **Validates** project name and prerequisites
2. **Copies** template files from this directory
3. **Initializes** a fresh Git repository
4. **Updates** `package.json` with your project name
5. **Installs** all dependencies with `npm install`
6. **Creates** initial Git commit
7. **Shows** helpful next steps

## 📋 Prerequisites

- **Git** (for Windows: Git for Windows with Git Bash)
- **Node.js** 18.0.0 or higher
- **npm** (comes with Node.js)

## 🌟 Features Created

Your new project will include:

- ✨ **Next.js 15** with App Router
- 🎨 **Chakra UI v2** with advanced theming (6 color schemes)
- 🎭 **GSAP** animations and scroll triggers
- 🚀 **Express.js** backend with TypeScript
- 📱 **Responsive design** with dark/light modes
- 🧪 **Testing setup** with Jest & Testing Library
- 📚 **Storybook** for component documentation
- 🔧 **TypeScript** configuration for full-stack development
- 📝 **ESLint & Prettier** for code quality
- 🪝 **Husky & lint-staged** for pre-commit hooks

## 🛠 Script Details

### `create-chakra-project.sh`
- Main script that works cross-platform
- Requires Git Bash on Windows
- Most comprehensive with error handling and validation

### `create-chakra-project.bat`
- Windows batch wrapper for the shell script
- Automatically uses Git Bash if available
- Handles Windows path conversion

### `create-chakra-project.ps1`
- Native PowerShell implementation
- Best integration with Windows
- Doesn't require Git Bash

### `setup-path.ps1`
- Automates adding scripts to Windows PATH
- Supports both user and system-wide installation
- Includes uninstall functionality

## 📂 Project Structure Created

```
my-awesome-app/
├── package.json                 # Dependencies and scripts
├── .gitignore                  # Git ignore rules
├── .cursorrules                # Cursor IDE rules
├── lib/                        # Shared utilities
│   ├── theme/                  # Chakra UI theme system
│   │   ├── index.ts           # Main theme export
│   │   ├── colors.ts          # Color schemes
│   │   ├── hooks.ts           # Theme hooks
│   │   ├── components/        # Component themes
│   │   └── foundations/       # Design tokens
│   └── animations.ts          # GSAP utilities
└── README.md                   # Project documentation
```

## 🎨 Available Commands in New Project

```bash
npm run dev              # Start both frontend and backend
npm run dev:client       # Start only Next.js frontend
npm run dev:server       # Start only Express.js backend
npm run build            # Build for production
npm run build:server     # Build backend for production
npm run start            # Start production frontend
npm run start:server     # Start production backend
npm run start:full       # Start both in production
npm run test             # Run tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with coverage
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run type-check       # TypeScript type checking
npm run type-check:server # Server TypeScript checking
npm run format           # Format with Prettier
npm run format:check     # Check Prettier formatting
npm run storybook        # Start Storybook
npm run build-storybook  # Build Storybook
```

## 🔧 Customization

### Updating the Template

To modify what gets created in new projects:

1. Update files in this directory (your template)
2. The scripts will automatically use the updated template
3. Changes take effect immediately for new projects

### Script Configuration

Edit the scripts to customize:

- **Default git repository** (if you want to clone from remote instead of local copy)
- **Additional setup steps**
- **Custom validation rules**
- **Different package manager** (yarn, pnpm)

## 🐛 Troubleshooting

### "Command not found" after PATH setup
- Restart your terminal/command prompt
- Verify the scripts directory is in PATH: `echo $env:PATH` (PowerShell) or `echo %PATH%` (CMD)

### "Git not found" error
- Install Git for Windows: https://git-scm.com/download/win
- Ensure Git is in your PATH

### "Node.js version too old" warning
- Update Node.js: https://nodejs.org/
- Use Node Version Manager (nvm) for multiple versions

### Permission errors on Windows
- Try running as Administrator
- Check antivirus isn't blocking script execution
- Enable script execution: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`

### Scripts don't work from Git Bash
- Use the `.sh` script directly: `./create-chakra-project.sh my-app`
- Or use PowerShell/CMD with the `.bat` file

## 📝 License

These scripts are part of the Next.js + Chakra UI + GSAP + Express.js template project.
Use freely for your projects!

---

**Happy coding! 🚀**

Need help? Check the troubleshooting section above or refer to the individual script help:
- `create-chakra-project --help`
- `create-chakra-project.ps1 -Help`
