#!/bin/bash

# Next.js + Chakra UI + GSAP + Express.js Project Creator
# Usage: ./salzkammercoder.sh <project-name> [target-directory]

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default values
TEMPLATE_REPO="https://github.com/UranymusDev/default_project"  # Update this to your actual repository URL
DEFAULT_TARGET_DIR="D:/dev"

# Print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Show usage
show_usage() {
    echo "Usage: $0 <project-name> [target-directory]"
    echo ""
    echo "Examples:"
    echo "  $0 my-awesome-app                    # Creates in D:/dev/my-awesome-app"
    echo "  $0 my-awesome-app .                  # Creates in current directory"
    echo "  $0 my-awesome-app ~/projects         # Creates in ~/projects/my-awesome-app"
    echo "  $0 my-awesome-app C:/Users/Dev       # Creates in C:/Users/Dev/my-awesome-app"
    echo ""
    echo "This script will:"
    echo "  1. Clone the Next.js + Chakra UI + GSAP + Express.js template from Git"
    echo "  2. Initialize a fresh git repository"
    echo "  3. Install all dependencies"
    echo "  4. Set up the project for development"
    echo ""
    echo "Default target directory: $DEFAULT_TARGET_DIR"
}

# Validate project name
validate_project_name() {
    local name="$1"
    
    if [[ -z "$name" ]]; then
        print_error "Project name is required!"
        show_usage
        exit 1
    fi
    
    # Check for valid characters (letters, numbers, hyphens, underscores)
    if [[ ! "$name" =~ ^[a-zA-Z0-9_-]+$ ]]; then
        print_error "Project name can only contain letters, numbers, hyphens, and underscores"
        exit 1
    fi
    
    # Check length
    if [[ ${#name} -lt 3 || ${#name} -gt 50 ]]; then
        print_error "Project name must be between 3 and 50 characters"
        exit 1
    fi
}

# Check prerequisites
check_prerequisites() {
    print_status "Checking prerequisites..."
    
    # Check if git is installed
    if ! command -v git &> /dev/null; then
        print_error "Git is not installed. Please install Git and try again."
        exit 1
    fi
    
    # Check if npm is installed
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install Node.js and npm, then try again."
        exit 1
    fi
    
    # Check Node.js version
    NODE_VERSION=$(node --version 2>/dev/null | sed 's/v//' || echo "0.0.0")
    REQUIRED_VERSION="18.0.0"
    
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js ${REQUIRED_VERSION}+ and try again."
        exit 1
    fi
    
    # Simple version check (assumes semantic versioning)
    NODE_MAJOR=$(echo $NODE_VERSION | cut -d. -f1)
    if [[ $NODE_MAJOR -lt 18 ]]; then
        print_warning "Node.js version $NODE_VERSION detected. This project requires Node.js 18.0.0 or higher."
        print_warning "Please consider upgrading Node.js for the best experience."
    fi
    
    print_success "Prerequisites check passed!"
}

# Get template files
get_template() {
    local temp_dir="$1"
    
    print_status "Getting template files..."
    
    # Clone template from git repository
    if [[ "$TEMPLATE_REPO" == *"YOUR_USERNAME"* ]]; then
        print_error "Repository URL not configured!"
        print_error "Please update TEMPLATE_REPO in the script with your actual repository URL."
        print_error "Example: https://github.com/yourusername/your-template-repo.git"
        exit 1
    fi
    
    print_status "Cloning template from repository: $TEMPLATE_REPO"
    if ! git clone "$TEMPLATE_REPO" "$temp_dir" 2>/dev/null; then
        print_error "Failed to clone template repository: $TEMPLATE_REPO"
        print_error "Please check:"
        print_error "  1. Repository URL is correct"
        print_error "  2. You have internet connection"
        print_error "  3. Repository is publicly accessible or you have access"
        exit 1
    fi
    
    # Remove the .git folder to start fresh
    rm -rf "$temp_dir/.git"
    
    # Remove script files if they exist in the template
    rm -f "$temp_dir/salzkammercoder"* 2>/dev/null || true
    rm -f "$temp_dir/create-chakra-project"* 2>/dev/null || true
    rm -f "$temp_dir/setup-path.ps1" 2>/dev/null || true
    rm -f "$temp_dir/install.ps1" 2>/dev/null || true
    rm -f "$temp_dir/SCRIPTS_README.md" 2>/dev/null || true
    
    # Verify we have the essential files
    if [[ ! -f "$temp_dir/package.json" ]]; then
        print_error "Template appears to be invalid - no package.json found"
        print_error "Please check that your repository contains a valid Next.js + Chakra UI project"
        exit 1
    fi
    
    print_success "Template files acquired!"
}

# Setup project
setup_project() {
    local project_name="$1"
    local project_dir="$2"
    local temp_dir=$(mktemp -d)
    
    print_status "Setting up project: $project_name"
    
    # Get template files
    get_template "$temp_dir"
    
    # Create project directory if it doesn't exist
    mkdir -p "$project_dir"
    
    # Move files to project directory
    print_status "Copying template files to project directory..."
    cp -r "$temp_dir/"* "$project_dir/" 2>/dev/null || true
    cp -r "$temp_dir/".* "$project_dir/" 2>/dev/null || true
    
    # Clean up temp directory
    rm -rf "$temp_dir"
    
    # Change to project directory
    cd "$project_dir"
    
    # Update package.json with new project name
    if [[ -f "package.json" ]]; then
        print_status "Updating package.json with project name..."
        if command -v sed &> /dev/null; then
            sed -i.bak "s/\"name\": \".*\"/\"name\": \"$project_name\"/" package.json && rm package.json.bak
        elif command -v gsed &> /dev/null; then
            gsed -i "s/\"name\": \".*\"/\"name\": \"$project_name\"/" package.json
        else
            print_warning "Could not update package.json automatically. Please update the 'name' field manually."
        fi
    fi
    
    # Initialize git repository
    print_status "Initializing Git repository..."
    git init -q
    
    # Create initial .gitignore if it doesn't exist
    if [[ ! -f ".gitignore" ]]; then
        print_status "Creating .gitignore file..."
        cat > .gitignore << 'EOF'
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
EOF
    fi
    
    # Install dependencies
    print_status "Installing dependencies (this may take a few minutes)..."
    if ! npm install; then
        print_error "Failed to install dependencies. Please check your internet connection and try again."
        exit 1
    fi
    
    # Create initial commit
    print_status "Creating initial commit..."
    git add .
    git commit -q -m "Initial commit: Next.js + Chakra UI + GSAP + Express.js project setup"
    
    print_success "Project '$project_name' has been created successfully!"
}

# Show post-setup instructions
show_instructions() {
    local project_name="$1"
    local project_dir="$2"
    
    echo ""
    print_success "🎉 Your new Next.js + Chakra UI + GSAP + Express.js project is ready!"
    echo ""
    echo -e "${BLUE}Project Location:${NC} $project_dir"
    echo ""
    echo -e "${YELLOW}Next Steps:${NC}"
    echo "  1. Navigate to your project:"
    echo "     cd \"$project_dir\""
    echo ""
    echo "  2. Start the development server:"
    echo "     npm run dev"
    echo ""
    echo "  3. Open your browser to:"
    echo "     http://localhost:3000"
    echo ""
    echo -e "${YELLOW}Available Scripts:${NC}"
    echo "  npm run dev          - Start development servers (frontend + backend)"
    echo "  npm run dev:client   - Start only Next.js frontend"
    echo "  npm run dev:server   - Start only Express.js backend"
    echo "  npm run build        - Build for production"
    echo "  npm run test         - Run tests"
    echo "  npm run lint         - Run linter"
    echo "  npm run storybook    - Start Storybook"
    echo ""
    echo -e "${YELLOW}Key Features:${NC}"
    echo "  ✨ Next.js 15 with App Router"
    echo "  🎨 Chakra UI v2 with advanced theming (6 color schemes)"
    echo "  🎭 GSAP animations and scroll triggers"
    echo "  🚀 Express.js backend with TypeScript"
    echo "  📱 Responsive design with dark/light modes"
    echo "  🧪 Testing setup with Jest & Testing Library"
    echo "  📚 Storybook for component documentation"
    echo ""
    echo -e "${GREEN}Happy coding! 🚀${NC}"
}

# Main function
main() {
    local project_name="$1"
    local target_dir="${2:-$DEFAULT_TARGET_DIR}"
    
    # Show help if requested
    if [[ "$1" == "-h" || "$1" == "--help" || "$1" == "/?" ]]; then
        show_usage
        exit 0
    fi
    
    # Validate inputs
    validate_project_name "$project_name"
    
    # Resolve target directory
    if [[ "$target_dir" == "." ]]; then
        project_dir="$(pwd)/$project_name"
    elif [[ "$target_dir" == "$DEFAULT_TARGET_DIR" ]]; then
        # Default case: D:/dev/project-name
        project_dir="$target_dir/$project_name"
    else
        project_dir="$target_dir/$project_name"
    fi
    
    # Check if directory already exists
    if [[ -d "$project_dir" ]]; then
        print_error "Directory '$project_dir' already exists!"
        print_error "Please choose a different project name or remove the existing directory."
        exit 1
    fi
    
    # Check prerequisites
    check_prerequisites
    
    # Setup the project
    setup_project "$project_name" "$project_dir"
    
    # Show instructions
    show_instructions "$project_name" "$project_dir"
}

# Run main function with all arguments
main "$@"
