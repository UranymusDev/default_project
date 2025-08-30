# Next.js + Chakra UI + GSAP + Express.js Development Stack

A production-ready development preset with advanced theming, animations, and full-stack capabilities.

## 🚀 Quick Setup (New Project)

Since this is a preset template, you'll copy the files manually to create a new project:

### 1. Create Your New Project

```bash
# Create your new project directory
mkdir my-new-project
cd my-new-project

# Initialize git for your new project
git init
```

### 2. Copy Template Files

**Option A: Manual Copy (Recommended)**
```bash
# Copy all files EXCEPT .git folder from the preset location
# From: D:\dev\default_project
# To: your new project directory

# Copy the following structure:
# ├── package.json
# ├── .cursorrules
# ├── lib/theme/           (entire folder)
# ├── tsconfig.json        (if exists)
# ├── next.config.js       (if exists)
# └── README.md            (this file - you can customize it)
```

**Option B: Using Command Line**
```bash
# Windows (PowerShell)
robocopy "D:\dev\default_project" "." /E /XD .git node_modules .next

# macOS/Linux
rsync -av --exclude='.git' --exclude='node_modules' --exclude='.next' D:/dev/default_project/ ./
```

### 3. Initialize Your Project

```bash
# Install dependencies
npm install

# Create initial commit
git add .
git commit -m "Initial commit: Next.js + Chakra UI + GSAP + Express.js stack"

# Add your remote repository (optional)
# git remote add origin https://github.com/yourusername/your-repo.git
# git push -u origin main
```

## 🎨 Theming System

This preset includes a comprehensive theming system with **6 color schemes**:

### Available Themes
- **Ocean Blue** - Professional and trustworthy (default)
- **Royal Purple** - Creative and luxurious
- **Forest Green** - Organic and sustainable
- **Sunset Orange** - Energetic and creative
- **Teal Wave** - Fresh and modern
- **Cherry Blossom** - Elegant and gentle

### Theme Usage

```tsx
import { useThemeScheme } from 'lib/theme/hooks';

function ThemeSwitcher() {
  const { currentScheme, schemes, changeThemeScheme } = useThemeScheme();
  
  return (
    <Select value={currentScheme} onChange={(e) => changeThemeScheme(e.target.value)}>
      {Object.entries(schemes).map(([key, scheme]) => (
        <option key={key} value={key}>{scheme.name}</option>
      ))}
    </Select>
  );
}
```

## 🎬 Pure GSAP Animation System

Comprehensive **GSAP-only** animation system with utility classes, hooks, and advanced features:

### GSAP Utility Classes
```tsx
// Fade in animation
<Box className="gsap-fade-in">Content</Box>

// Slide animations
<Box className="gsap-slide-in-left">From Left</Box>
<Box className="gsap-slide-in-right">From Right</Box>

// Scale animation
<Box className="gsap-scale-in">Scale In</Box>
```

### React Hook for Animations
```tsx
import { useGSAPAnimations } from 'lib/theme/hooks';
import { useEffect, useRef } from 'react';

function AnimatedComponent() {
  const { fadeInUp, slideInLeft, scaleIn } = useGSAPAnimations();
  const elementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    fadeInUp(elementRef.current);
  }, []);
  
  return (
    <div ref={elementRef}>
      Animated content
    </div>
  );
}
```

### Advanced GSAP Features
```tsx
import { 
  animateElement, 
  createScrollAnimation, 
  createMagneticEffect,
  typeWriter 
} from 'lib/animations';

// Scroll-triggered animations
createScrollAnimation('.hero-section', 'fadeInUp', {
  start: 'top 80%',
  toggleActions: 'play none none reverse'
});

// Magnetic button effect
createMagneticEffect('.magnetic-btn', 0.3);

// Typewriter text effect
typeWriter('.typewriter-text', 'Hello, GSAP World!', 2);
```

## 🔧 Development Scripts

### Frontend Development
```bash
npm run dev:client        # Start Next.js dev server only
npm run build             # Build Next.js for production
npm run start             # Start production Next.js server
npm run type-check        # TypeScript type checking
```

### Backend Development
```bash
npm run dev:server        # Start Express.js dev server with nodemon
npm run build:server      # Build Express.js TypeScript
npm run start:server      # Start production Express.js server
npm run type-check:server # TypeScript type checking for backend
```

### Full-Stack Development
```bash
npm run dev              # Start both frontend and backend concurrently
npm run start:full       # Start both production servers
```

### Code Quality
```bash
npm run lint             # ESLint checking
npm run lint:fix         # Auto-fix ESLint issues
npm run format           # Prettier formatting
npm run format:check     # Check Prettier formatting
```

### Testing & Documentation
```bash
npm run test             # Run Jest tests
npm run test:watch       # Jest in watch mode
npm run test:coverage    # Test coverage report
npm run storybook        # Start Storybook dev server
npm run build-storybook  # Build Storybook for production
```

## 🏗️ Project Structure

```
├── app/                          # Next.js 15 App Router
│   ├── globals.css
│   ├── layout.tsx               # Root layout with ChakraProvider + Theme
│   └── page.tsx                 # Home page
├── components/                   # Reusable components
│   ├── ui/                      # Base UI components with theming
│   ├── forms/                   # Form components
│   ├── animations/              # GSAP animation components
│   └── theme/                   # Theme switching components
├── lib/                         # Utilities and configurations
│   ├── theme/                   # Advanced theming system
│   │   ├── index.ts            # Main theme configuration
│   │   ├── colors.ts           # Color system + schemes
│   │   ├── hooks.ts            # Theme hooks
│   │   ├── components/         # Component style overrides
│   │   └── foundations/        # Typography, spacing, shadows
│   ├── utils.ts                # Utility functions
│   └── animations.ts           # GSAP utilities
├── hooks/                       # Custom hooks
├── server/                      # Express.js backend
│   ├── index.ts                # Main server file
│   ├── routes/                 # API routes
│   ├── middleware/             # Custom middleware
│   └── types/                  # Server TypeScript types
└── types/                       # Shared TypeScript definitions
```

## 🤖 Archon Integration

This preset is integrated with **Archon MCP** for enhanced development workflow:

### Archon Project ID
```
f1797817-4fdc-4cce-99d1-1b80d0f24220
```

### Quick Archon Commands
```bash
# Check available tasks for this preset
archon:list_tasks(project_id="f1797817-4fdc-4cce-99d1-1b80d0f24220")

# Research patterns before implementing
archon:perform_rag_query(query="Next.js Chakra UI theming best practices")

# Find code examples
archon:search_code_examples(query="GSAP scroll trigger implementation")

# Use Perplexity for latest updates
perplexity:search("Next.js 15 latest features 2025")
```

## 📋 Development Workflow

### 1. Start Development
```bash
# Full-stack development
npm run dev

# Frontend only
npm run dev:client

# Backend only  
npm run dev:server
```

### 2. Before Committing
```bash
# Run quality checks
npm run lint
npm run type-check
npm run type-check:server
npm run test

# Format code
npm run format
```

### 3. Building for Production
```bash
# Build frontend
npm run build

# Build backend
npm run build:server

# Start production servers
npm run start:full
```

## 🎯 Features Included

### Frontend Stack
- ✅ **Next.js 15** with App Router
- ✅ **React 19** with latest features
- ✅ **Chakra UI v2** with custom theming
- ✅ **TypeScript** strict configuration
- ✅ **GSAP 3.12** with ScrollTrigger & TextPlugin
- ✅ **React Hook Form** + Zod validation
- ✅ **TanStack Query** for data fetching
- ✅ **6 Color Schemes** with dark/light modes

### Backend Stack
- ✅ **Express.js 4.18** with TypeScript
- ✅ **Production Middleware** (CORS, Helmet, Rate Limiting)
- ✅ **Request Validation** with express-validator
- ✅ **Logging** with Morgan
- ✅ **Compression** and security headers

### Development Tools
- ✅ **ESLint** + **Prettier** configuration
- ✅ **Husky** pre-commit hooks
- ✅ **Jest** + **Testing Library** setup
- ✅ **Storybook** for component documentation
- ✅ **Concurrently** for full-stack development
- ✅ **Nodemon** for backend hot reload

### Archon Integration
- ✅ **Task Management** with Archon MCP
- ✅ **Knowledge Queries** for research
- ✅ **Code Examples** search
- ✅ **Perplexity Integration** for latest info

## 🔧 Customization

### Adding New Color Schemes
1. Edit `lib/theme/colors.ts`
2. Add your color palette
3. Update `colorSchemes` object
4. Theme will be automatically available

### Custom Component Styling
1. Add component configs in `lib/theme/components/`
2. Export from `components/index.ts`
3. Styles will be applied automatically

### GSAP Animations
1. Import from `lib/animations.ts` for advanced features
2. Use utility classes for quick animations
3. Use `useGSAPAnimations()` hook for React integration
4. ScrollTrigger for scroll-based animations
5. Custom magnetic effects and typewriter text

## 📚 Resources

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [Chakra UI Documentation](https://chakra-ui.com/docs/get-started)
- [GSAP Documentation](https://greensock.com/docs/)
- [Express.js Documentation](https://expressjs.com/)
- [Archon MCP Documentation](https://github.com/mcp-archon/archon)

## 🆘 Troubleshooting

### Common Issues

**Theme not switching:**
- Check if `useThemeScheme()` hook is imported correctly
- Verify CSS custom properties are loading
- Ensure ChakraProvider is wrapping your app

**GSAP animations not working:**
- Import GSAP in your component: `import gsap from 'gsap'`
- Check if elements have the correct utility classes
- Verify GSAP timeline configuration

**Backend connection issues:**
- Check if both servers are running with `npm run dev`
- Verify CORS configuration in server setup
- Check API endpoint URLs in frontend

---

🎉 **Happy coding with your new full-stack development preset!**