# Publishing Guide

## Prerequisites

1. **NPM Account**: Create an account at [npmjs.com](https://www.npmjs.com)
2. **NPM CLI**: Make sure you have npm installed and are logged in:
   ```bash
   npm login
   ```

## Publishing Steps

### 1. Build the Library
```bash
npm run build:lib
```

This will:
- Compile TypeScript to JavaScript
- Generate type definitions
- Bundle the library with Vite
- Create the `dist/` folder

### 2. Test the Build Locally (Optional)
```bash
# In your design system project
npm pack

# This creates a .tgz file you can test in another project
# In another project:
npm install /path/to/kivaplus-design-system-1.0.0.tgz
```

### 3. Publish to NPM

#### First Time Publishing
```bash
npm publish --access public
```

#### Subsequent Updates
```bash
# Update version first
npm version patch  # for bug fixes
npm version minor  # for new features
npm version major  # for breaking changes

# Then publish
npm publish
```

### 4. Verify Publication
Check your package at: `https://www.npmjs.com/package/@kivaplus/design-system`

## Version Management

Follow [Semantic Versioning](https://semver.org/):
- **PATCH** (1.0.1): Bug fixes
- **MINOR** (1.1.0): New features (backward compatible)
- **MAJOR** (2.0.0): Breaking changes

## Automated Publishing (Optional)

You can set up GitHub Actions for automated publishing:

```yaml
# .github/workflows/publish.yml
name: Publish to NPM

on:
  release:
    types: [published]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm run build:lib
      - run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## Usage After Publishing

Once published, users can install your design system:

```bash
npm install @kivaplus/design-system
```

And use it in their projects:

```tsx
import { Button, Input } from '@kivaplus/design-system'
import '@kivaplus/design-system/styles'

function App() {
  return (
    <div>
      <Input label="Email" />
      <Button>Submit</Button>
    </div>
  )
}
```

## Troubleshooting

### Common Issues

1. **Package name already exists**: Change the name in package.json
2. **Not logged in**: Run `npm login`
3. **Permission denied**: Make sure you have publish rights
4. **Build errors**: Check TypeScript and Vite configurations

### Testing Before Publishing

Always test your build locally:
```bash
npm run build:lib
cd dist
ls -la  # Check that files are generated correctly
```
