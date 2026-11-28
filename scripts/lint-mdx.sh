#!/usr/bin/env bash
# Lint MDX files for common Crowdin translation corruption issues
# These patterns cause build failures and are not caught by standard linters

set -e

SEARCH_PATH="${1:-docs i18n}"
EXIT_CODE=0

# Define MDX type for ripgrep
RG_MDX="--type-add=mdx:*.mdx --type=mdx"

# Most checks below are ripgrep patterns whose stderr is discarded, and a
# missing rg exits 127, which reads as "no matches" and prints a ✓. Without this
# guard every ripgrep check passes silently on a machine with no ripgrep
# installed, including a stock GitHub Actions ubuntu runner.
if ! command -v rg >/dev/null 2>&1; then
  echo "❌ ripgrep (rg) is not installed, so these checks cannot run."
  echo "   Install it with 'brew install ripgrep' or 'apt-get install ripgrep'."
  exit 1
fi

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
# The \1 backreference needs PCRE2; ripgrep's default engine rejects it, and the
# resulting parse error is indistinguishable from a clean result here.
echo ""
echo "=== Checking for duplicated opening tags ==="
if rg -n --pcre2 '<(div|span|a|p)[^>]*><\1[^>]*>' $SEARCH_PATH $RG_MDX 2>/dev/null; then
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

# Pattern 6: Accessibility — images missing alt text
# Single-line <img> tags without an alt attribute, and empty markdown alt ![]().
# Warning-level: multi-line <img> tags (alt on a following line) and <img> inside
# inline code are not fully parseable here; use a JSX-aware linter for strict checks.
echo ""
echo "=== Checking for images missing alt text ==="
ALT_ISSUES=0
NOALT_TMP="$(mktemp)"
trap 'rm -f "$NOALT_TMP"' EXIT
if rg -n '<img\b[^>]*>' $SEARCH_PATH $RG_MDX 2>/dev/null | rg -v 'alt\s*=' | rg -v '`<img' >"$NOALT_TMP" 2>/dev/null && [ -s "$NOALT_TMP" ]; then
  cat "$NOALT_TMP"
  echo "WARNING: Found <img> tags without an alt attribute. Add alt=\"...\" (or alt=\"\" if purely decorative)."
  ALT_ISSUES=1
fi
# Exempt only a complete inline-code span, so prose documenting the rule (as the
# writing style guide does) is not reported as breaking it. Requiring a backtick
# on both sides keeps a real empty-alt image that merely follows inline code,
# such as `label`![](/img/x.webp), reported.
if rg -n --pcre2 '(?<!`)!\[\]\(|!\[\]\([^)]*\)(?!`)' $SEARCH_PATH $RG_MDX 2>/dev/null; then
  echo "WARNING: Found markdown images with empty alt text ![](...). Describe the image or use it only if decorative."
  ALT_ISSUES=1
fi
rm -f "$NOALT_TMP"
if [ $ALT_ISSUES -eq 0 ]; then
  echo "✓ No images missing alt text found"
fi

# Pattern 7: Tabs blocks whose headings build a wrong table of contents
# Docusaurus renders inactive tab panels hidden and builds the table of contents
# from every heading regardless, so a block that heads only some of its tabs
# lists only some of them. See design standards 11.10 and the script for the
# full rule, including why platform tabs are deliberately left alone.
echo ""
echo "=== Checking tab headings against the table of contents ==="
if python3 scripts/lint-tabitem-headings.py $SEARCH_PATH; then
  echo "✓ Tab headings and the table of contents agree"
else
  echo "WARNING: The tabs above are missing from the table of contents."
  echo "Give each one a heading naming the variant as its first line."
fi

echo ""
if [ $EXIT_CODE -eq 0 ]; then
  echo "✅ MDX lint passed!"
else
  echo "❌ MDX lint failed. Please fix the errors above."
fi

exit $EXIT_CODE
