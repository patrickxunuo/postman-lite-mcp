#!/bin/bash

# Add API key check to all tool files
for file in src/tools/postman-public-workspace/postman-api/*.ts; do
  # Skip if already has the check
  if grep -q "POSTMAN_PUBLIC_WORKSPACE_API_KEY environment variable is not set" "$file"; then
    echo "Skipping $file - already has API key check"
    continue
  fi
  
  # Add the API key check after the apiKey declaration
  sed -i '/const apiKey = process\.env\.POSTMAN_PUBLIC_WORKSPACE_API_KEY;/a\\n  if (!apiKey) {\n    return { error: '"'"'POSTMAN_PUBLIC_WORKSPACE_API_KEY environment variable is not set'"'"' };\n  }' "$file"
  
  # Fix the headers type
  sed -i 's/const headers = {/const headers: Record<string, string> = {/g' "$file"
  
  echo "Updated $file"
done

echo "All files updated!"