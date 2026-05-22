import { AI_CONFIG } from '../config/aiConfig';

const GENERIC_ERROR_MESSAGE = 'AI assistant is unavailable right now. Please try again later.';
const REQUEST_TIMEOUT_MS = 25000;

const SYSTEM_PROMPT = `
You are an AI assistant focused primarily on React development and modern frontend engineering.

Prefer helping with:
- React
- TypeScript
- JavaScript
- Hooks
- Components
- State management
- Routing
- MUI
- Frontend architecture
- API integration
- Performance
- UI/UX implementation
- Testing
- Build tools
- Deployment

When questions relate to frontend or development, answer with deeper technical detail and practical examples.

For general topics outside frontend, answer normally and remain helpful.

Do not refuse unrelated questions unless they are unsafe or impossible.
Do not repeatedly mention your specialization.
Keep answers practical, concise and developer-oriented.
`;

const API_URL = `${AI_CONFIG.baseUrl}${AI_CONFIG.chatPath}`;

function normalizeHistoryMessages(historyMessages) {
  if (!Array.isArray(historyMessages)) {
    return [];
  }

  return historyMessages
    .filter((message) => message && (message.role === 'user' || message.role === 'assistant'))
    .map((message) => ({
      role: message.role,
      content: typeof message.content === 'string' ? message.content : ''
    }));
}

export async function sendAiChatMessage(payload) {
  if (!API_URL || !AI_CONFIG.clientId || !AI_CONFIG.clientToken) {
    throw new Error(GENERIC_ERROR_MESSAGE);
  }

  const currentUserMessage = typeof payload === 'string' ? payload : payload && payload.currentUserMessage;
  const historyMessages = typeof payload === 'string' ? [] : normalizeHistoryMessages(payload && payload.historyMessages);

  if (!currentUserMessage || typeof currentUserMessage !== 'string') {
    throw new Error(GENERIC_ERROR_MESSAGE);
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Client-ID': AI_CONFIG.clientId,
        'X-Client-Token': AI_CONFIG.clientToken
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPT
          },
          ...historyMessages,
          {
            role: 'user',
            content: currentUserMessage
          }
        ]
      }),
      signal: controller.signal
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error('AI request failed');
    }

    const assistantText = data && data.answer;

    if (!assistantText || typeof assistantText !== 'string') {
      throw new Error('Invalid AI response format');
    }

    return assistantText;
  } catch (_error) {
    throw new Error(GENERIC_ERROR_MESSAGE);
  } finally {
    clearTimeout(timeoutId);
  }
}

export { GENERIC_ERROR_MESSAGE };
