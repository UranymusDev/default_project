# Claude AI Instructions - SalzKammerCoder Project

## 🚨 CRITICAL: ARCHON RAG ENFORCEMENT

### MANDATORY WORKFLOW - NO EXCEPTIONS

**BEFORE ANY CODING OR DOCUMENTATION:**

1. **ARCHON RAG FIRST**: Every single query, question, or documentation need MUST go through Archon RAG system
2. **NO MANUAL DOCS**: Never create documentation manually - always retrieve from Archon knowledge base
3. **RAG-FIRST APPROACH**: All implementation guidance comes from `archon:perform_rag_query()` and `archon:search_code_examples()`

### ARCHON MCP INTEGRATION

#### **PRIMARY PROJECT**: f1797817-4fdc-4cce-99d1-1b80d0f24220
- **PURPOSE**: Living knowledge base for established guidelines with this tech stack
- **FUNCTION**: Central repository for best practices, patterns, and solutions
- **USAGE**: Add new learnings here during development for future reference

#### **STYLEGUIDE DOCUMENT**: 92841046-e4cb-4f12-8ef9-0ce5034ee0d7  
- **PURPOSE**: Style guidelines and coding standards template
- **FUNCTION**: Defines consistent styling patterns and code conventions
- **USAGE**: Query for style decisions, update with new style guidelines

#### Required Archon Workflow:
```bash
# STEP 1: Always start with task check
archon:manage_task(action="list", project_id="f1797817-4fdc-4cce-99d1-1b80d0f24220")

# STEP 2: RAG for any implementation question
archon:perform_rag_query(query="[your question/feature]", match_count=5)

# STEP 3: Search for code examples
archon:search_code_examples(query="[specific implementation]", match_count=3)

# STEP 4: Check styleguide for standards
archon:perform_rag_query(query="[topic] styleguide", doc_id="92841046-e4cb-4f12-8ef9-0ce5034ee0d7")

# STEP 5: Update task status
archon:manage_task(action="update", task_id="...", update_fields={"status": "doing"})
```

#### Knowledge Base Enhancement:
```bash
# During development - when discovering new patterns or solutions:

# Add learnings to main project
archon:add_knowledge(project_id="f1797817-4fdc-4cce-99d1-1b80d0f24220", content="[new best practice/pattern]")

# Update styleguide with style decisions
archon:update_document(doc_id="92841046-e4cb-4f12-8ef9-0ce5034ee0d7", content="[style guideline update]")
```

## 📋 DOCUMENTATION PROTOCOL

### ABSOLUTE RULES:
- **NEVER** create README files, documentation, or guides manually
- **ALWAYS** use `archon:perform_rag_query()` for documentation needs
- **ALL** technical explanations must come from Archon knowledge base
- **ONLY** supplement with Perplexity for bleeding-edge updates not in Archon

### FALLBACK PROTOCOL - Missing Documentation:
- **IF** `archon:perform_rag_query()` returns empty results
- **THEN** use `mcp_perplexity-mcp_perplexity_search_web()` to find official documentation
- **IDENTIFY** the authoritative source URL
- **INFORM USER**: "Documentation not found in Archon. Please add [URL] to Archon knowledge base"
- **DO NOT** create manual documentation - wait for Archon update

### Documentation Query Examples:
```bash
# For feature documentation
archon:perform_rag_query(query="Next.js App Router documentation", match_count=3)

# For implementation guides  
archon:perform_rag_query(query="Chakra UI theming implementation guide", match_count=5)

# For troubleshooting
archon:perform_rag_query(query="GSAP animation debugging", match_count=3)
```

### Missing Documentation Workflow:
```bash
# STEP 1: Try Archon first
archon:perform_rag_query(query="React Server Components documentation", match_count=3)

# STEP 2: If empty results, use Perplexity
mcp_perplexity-mcp_perplexity_search_web(query="React Server Components official documentation")

# STEP 3: Inform user with specific URL
# Example output: "Documentation not found in Archon. Please add https://react.dev/reference/react/server-components to Archon knowledge base"

# STEP 4: Wait for user to update Archon - DO NOT CREATE MANUAL DOCS
```

## 🎯 PROJECT CONTEXT

### Tech Stack:
- **Frontend**: Next.js 15 + App Router
- **UI Library**: Chakra UI v2 with advanced theming (6 color schemes)
- **Animations**: GSAP + Framer Motion
- **Backend**: Express.js/Node.js with TypeScript
- **Testing**: Jest + Testing Library + Storybook

### Key Features:
- Advanced theming system with dark/light modes
- 6 color schemes: Ocean Blue, Royal Purple, Forest Green, Sunset Orange, Teal Wave, Cherry Blossom
- GSAP-powered animations and scroll triggers
- Full-stack TypeScript configuration
- Responsive design with semantic tokens

## 🔄 DEVELOPMENT WORKFLOW

### Task-Driven Development:
1. **Check Tasks**: `archon:manage_task(action="list")`
2. **RAG Research**: `archon:perform_rag_query()` + `archon:search_code_examples()`
3. **Implement**: Code based on RAG findings
4. **Update Status**: Mark tasks as "doing" → "review" → "done"

### Quality Assurance:
- TypeScript strict mode enforcement
- ESLint + Prettier for code quality
- Component testing with Testing Library
- Storybook for component documentation
- Performance optimization with React best practices

## 🚀 SALZKAMMERCODER SCRIPT INTEGRATION

This project includes the SalzKammerCoder project creation scripts:
- `salzkammercoder.sh` - Cross-platform shell script
- `salzkammercoder.bat` - Windows batch wrapper
- `salzkammercoder.ps1` - PowerShell version
- `install.ps1` - PATH installation script

### Script Features:
- Git clone from `https://github.com/UranymusDev/default_project`
- Default target directory: `D:/dev/`
- Automatic dependency installation
- Fresh git repository initialization
- Package.json name updating

### Usage Examples:
```bash
# Creates D:/dev/my-app
salzkammercoder my-app

# Creates in current directory
salzkammercoder my-app .

# Creates in specific location
salzkammercoder my-app C:/projects
```

## ⚠️ CRITICAL REMINDERS

### ARCHON RAG ENFORCEMENT:
- **EVERY** question → Archon RAG first
- **EVERY** documentation need → Archon RAG first
- **EVERY** implementation → Archon code examples first
- **IF ARCHON EMPTY** → Use Perplexity to find official docs → Tell user to add to Archon
- **NO EXCEPTIONS** - this is not optional
- **NEVER** create manual documentation, even when missing from Archon

### Task Management:
- Always update task status in real-time
- Use specific Archon project ID: f1797817-4fdc-4cce-99d1-1b80d0f24220
- Mark tasks as "review" when complete but need validation
- Create atomic, focused tasks for better tracking

### Knowledge Base Growth:
- **LEARNING REPOSITORY**: Project f1797817-4fdc-4cce-99d1-1b80d0f24220 is the living knowledge base
- **ADD NEW DISCOVERIES**: When finding solutions, patterns, or best practices during development
- **STYLEGUIDE UPDATES**: Enhance doc 92841046-e4cb-4f12-8ef9-0ce5034ee0d7 with style decisions
- **FUTURE DEVELOPERS**: Ensure knowledge persists and benefits future work on this tech stack

### Code Quality:
- Follow TypeScript strict mode
- Use Chakra UI semantic tokens
- Implement proper error boundaries
- Optimize for performance with Next.js 15 features
- Test components with proper accessibility

## 🎨 THEMING SYSTEM

### Color Schemes (use RAG for implementation details):
- Ocean Blue: Primary brand colors with deep blue tones
- Royal Purple: Elegant purple gradient system
- Forest Green: Natural green palette for eco themes
- Sunset Orange: Warm orange/red gradient system
- Teal Wave: Cool teal/cyan professional palette
- Cherry Blossom: Soft pink/rose romantic palette

### Theme Management (query Archon for specifics):
- `useThemeScheme()` hook for dynamic switching
- CSS custom properties for runtime updates
- Dark/light mode compatibility across all schemes
- Responsive design tokens for mobile optimization

---

**REMEMBER: When in doubt, RAG it out! Always query Archon before creating anything.**
