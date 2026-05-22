const ALLOWED_LANGUAGES = new Set([
  'ts',
  'typescript',
  'js',
  'jsx',
  'tsx',
  'html',
  'css',
  'json',
  'bash'
]);

function normalizeLanguage(language) {
  if (!language) {
    return undefined;
  }

  const normalized = language.trim().toLowerCase();

  if (!normalized) {
    return undefined;
  }

  if (ALLOWED_LANGUAGES.has(normalized)) {
    return normalized;
  }

  return undefined;
}

export function parseAssistantMessage(content) {
  const text = typeof content === 'string' ? content : '';
  const parts = [];
  const codeFenceRegex = /```([a-zA-Z]+)?\n([\s\S]*?)```/g;
  let lastIndex = 0;
  let match;

  while ((match = codeFenceRegex.exec(text)) !== null) {
    const [fullMatch, langCandidate, codeContent] = match;
    const startIndex = match.index;

    if (startIndex > lastIndex) {
      const textPart = text.slice(lastIndex, startIndex);
      if (textPart) {
        parts.push({
          type: 'text',
          content: textPart
        });
      }
    }

    parts.push({
      type: 'code',
      language: normalizeLanguage(langCandidate),
      content: codeContent
    });

    lastIndex = startIndex + fullMatch.length;
  }

  if (lastIndex < text.length) {
    const tailText = text.slice(lastIndex);
    if (tailText) {
      parts.push({
        type: 'text',
        content: tailText
      });
    }
  }

  if (parts.length === 0) {
    return [
      {
        type: 'text',
        content: text
      }
    ];
  }

  return parts;
}
