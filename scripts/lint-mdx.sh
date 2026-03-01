#!/usr/bin/env bash
# Lint MDX files for common Crowdin translation corruption issues
# These patterns cause build failures and are not caught by standard linters

set -e

SEARCH_PATH="${1:-docs i18n}"
EXIT_CODE=0

# Define MDX type for ripgrep
RG_MDX="--type-add=mdx:*.mdx --type=mdx"

echo "Checking MDX files for common corruption patterns..."

# Pattern 1: Malformed closing tags with space after < (e.g., "</ TabItem>")
echo ""
echo "=== Checking for malformed closing tags (e.g., '</ TabItem>') ==="
if rg -n '</ \w+>' $SEARCH_PATH $RG_MDX 2>/dev/null; then
  echo "ERROR: Found malformed closing tags. Fix by removing space after '</'."
  EXIT_CODE=1
else
  echo "✓ No malformed closing tags found"
fi

# Pattern 2: Duplicated opening tags on same line (e.g., "<div...><div...>")
echo ""
echo "=== Checking for duplicated opening tags ==="
if rg -n '<(div|span|a|p)[^>]*><\1[^>]*>' $SEARCH_PATH $RG_MDX 2>/dev/null; then
  echo "ERROR: Found duplicated opening tags. This is likely Crowdin corruption."
  EXIT_CODE=1
else
  echo "✓ No duplicated opening tags found"
fi

# Pattern 3: Unbalanced div tags (basic check)
echo ""
echo "=== Checking for unbalanced div tags ==="
while IFS= read -r file; do
  if [ -f "$file" ]; then
    open_count=$(grep -o '<div' "$file" 2>/dev/null | wc -l | tr -d ' ')
    close_count=$(grep -o '</div>' "$file" 2>/dev/null | wc -l | tr -d ' ')
    if [ "$open_count" != "$close_count" ]; then
      echo "WARNING: $file has unbalanced div tags (open: $open_count, close: $close_count)"
    fi
  fi
done < <(find $SEARCH_PATH -name "*.mdx" -type f 2>/dev/null | head -500)
echo "✓ Div tag balance check complete"

# Pattern 4: Broken JSX imports (import without from)
echo ""
echo "=== Checking for broken imports ==="
if rg -n '^import\s+\{[^}]+\}\s*;?\s*$' $SEARCH_PATH $RG_MDX 2>/dev/null | grep -v 'from'; then
  echo "ERROR: Found imports without 'from' clause."
  EXIT_CODE=1
else
  echo "✓ No broken imports found"
fi

# Pattern 5: Unclosed JSX tags (self-closing without /)
echo ""
echo "=== Checking for potentially unclosed self-closing tags ==="
if rg -n '<(img|br|hr|input|meta|link)\s+[^/]*[^/]>' $SEARCH_PATH $RG_MDX 2>/dev/null | grep -v '/>' | head -10; then
  echo "WARNING: Found potentially unclosed self-closing tags (may be false positives)"
fi

echo ""
if [ $EXIT_CODE -eq 0 ]; then
  echo "✅ MDX lint passed!"
else
  echo "❌ MDX lint failed. Please fix the errors above."
fi

exit $EXIT_CODE
