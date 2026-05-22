# Reactex – AI React Developer Assistant

Reactex is a demonstration project showing how modern frontend applications can integrate lightweight AI agents into real-world user interfaces.

The project combines **React**, **Material UI**, and a shared **AI Gateway Backend** to create a contextual AI chat focused primarily on React development, frontend engineering, and technical workflows.

The goal is not to build a full AI platform, but to demonstrate:

- AI integration in frontend applications
- Context-aware conversational interfaces
- Reusable chat widget architecture
- API communication patterns
- Error handling and resilience
- Modern React UI patterns
- Lightweight AI specialization through system prompts
- Shared backend architecture across multiple frontend technologies

---

## Features

### AI Developer Chat
Context-aware assistant with soft specialization in:

- React
- TypeScript
- JavaScript
- Hooks
- Components
- State management
- Routing
- Frontend architecture
- API integration
- UI implementation
- Deployment workflows

The assistant remains helpful for general topics while prioritizing frontend-related discussions.

---

### Persistent Conversation Context

The chat preserves history between messages:

User → AI → User → AI

instead of treating every request as an isolated prompt.

This enables:

- follow-up questions
- iterative problem solving
- longer technical discussions
- more natural AI interaction

---

### Reusable AI Widget Architecture

The AI widget includes:

✓ Floating launcher  
✓ Modal chat interface  
✓ Message history  
✓ Context preservation  
✓ Export chat (.txt)  
✓ Regenerate responses  
✓ Copy responses  
✓ Code block rendering  
✓ Mobile support  
✓ Loading states  
✓ Error handling  
✓ Confirmation dialogs

Designed as a reusable pattern for other frontend projects.

---

## Architecture

```txt
React Frontend
      ↓
AI Chat Widget
      ↓
EVAISYS AI Gateway Backend
      ↓
LLM Provider
```

The frontend does not communicate directly with LLM providers.

All AI requests pass through a shared backend gateway responsible for:

- authentication
- rate limiting
- project separation
- request normalization
- provider abstraction

---

## Technology Stack

Frontend:

- React
- Material UI
- JavaScript
- CRA

AI:

- Shared EVAISYS AI Gateway
- Context-aware chat
- Prompt specialization
- Multi-project architecture

---

## Purpose

Reactex is intentionally lightweight.

The project serves as a practical demonstration of:

**Frontend + AI + Architecture + UX**

rather than a production AI platform.

---

## Related Projects

The same AI Gateway architecture is reused across multiple frontend demonstrations:

- Angularex → Angular + AI
- Reactex → React + AI
- Vuetex → Vue/Quasar + AI

This allows experimenting with AI integration patterns across frameworks while keeping backend logic centralized.

---

## Future Improvements

Potential future enhancements:

- Streaming responses
- Better context compression
- Multi-session history
- AI memory layer
- RAG integration
- Specialized developer agents
- Voice interaction

---

## Status

Current state:

**Demo project / Active experimentation**