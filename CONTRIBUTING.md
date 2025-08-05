# Contributing to Postman Lite MCP

Thank you for your interest in contributing! Please follow these guidelines to ensure a smooth collaboration.

## 🔄 Contribution Process

1. **Fork the repository** to your own GitHub account
2. **Clone your fork** locally
3. **Create a feature branch** from master:
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Make your changes** and commit with clear messages
5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Create a Pull Request** from your fork to the main repository's master branch

## 📋 Pull Request Guidelines

- **Never push directly to master** - all changes must come through pull requests
- Include a clear description of what changes you made and why
- Reference any related issues using #issue-number
- Ensure all tests pass before submitting
- Keep commits atomic and focused on a single change
- Update documentation if you're changing functionality

## 🧪 Before Submitting

1. Build the project:
   ```bash
   npm run build
   ```

2. Test your changes:
   ```bash
   npm test
   ```

3. Check for linting issues:
   ```bash
   npm run lint
   ```

## 💻 Development Setup

```bash
# Fork and clone the repository
git clone https://github.com/YOUR-USERNAME/postman-mcp.git
cd postman-mcp

# Install dependencies
npm install

# Create a feature branch
git checkout -b feature/my-feature

# Make your changes, then build
npm run build

# Test with MCP Inspector
npx @modelcontextprotocol/inspector
```

## 🎯 Code Standards

- Use TypeScript for all new code
- Follow the existing code style and patterns
- Add comments for complex logic
- Update types in `src/types.ts` if needed
- Keep functions small and focused

## 🐛 Reporting Issues

- Check existing issues first to avoid duplicates
- Include steps to reproduce the problem
- Provide error messages and logs when applicable
- Specify your environment (Node version, OS, etc.)

## ❓ Questions?

Feel free to open an issue for discussion before starting work on major changes.