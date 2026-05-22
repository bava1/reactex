import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Fab from '@mui/material/Fab';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import DownloadIcon from '@mui/icons-material/Download';
import RefreshIcon from '@mui/icons-material/Refresh';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import CodeBlock from './CodeBlock';
import { sendAiChatMessage, GENERIC_ERROR_MESSAGE } from '../../api/aiChat';
import { parseAssistantMessage } from '../../utils/chatMessageParser';
import './ChatWidget.css';

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedCodeState, setCopiedCodeState] = useState('');
  const [copiedMessageState, setCopiedMessageState] = useState('');
  const [feedbackByMessage, setFeedbackByMessage] = useState({});
  const [clearConfirmOpen, setClearConfirmOpen] = useState(false);

  const messagesEndRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages, isOpen, isLoading]);

  useEffect(() => {
    if (!copiedCodeState && !copiedMessageState) {
      return undefined;
    }

    const timeoutId = setTimeout(() => {
      setCopiedCodeState('');
      setCopiedMessageState('');
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, [copiedCodeState, copiedMessageState]);

  const hasMessages = messages.length > 0;

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    setMessages([]);
    setFeedbackByMessage({});
    setCopiedMessageState('');
    setCopiedCodeState('');
    setInputValue('');
    setClearConfirmOpen(false);
  };

  const handleCopyCode = async (codeKey, codeText) => {
    try {
      await navigator.clipboard.writeText(codeText);
      setCopiedCodeState(codeKey);
    } catch (_error) {
      setCopiedCodeState('');
    }
  };

  const handleCopyAssistantMessage = async (messageIndex, text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedMessageState(String(messageIndex));
    } catch (_error) {
      setCopiedMessageState('');
    }
  };

  const toggleFeedback = (messageIndex, value) => {
    setFeedbackByMessage((prevState) => {
      const currentValue = prevState[messageIndex] || null;
      return {
        ...prevState,
        [messageIndex]: currentValue === value ? null : value
      };
    });
  };

  const handleSend = async () => {
    const userMessage = inputValue.trim();

    if (!userMessage || isLoading) {
      return;
    }

    setInputValue('');
    setIsLoading(true);

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        role: 'user',
        content: userMessage
      }
    ]);

    try {
      const assistantText = await sendAiChatMessage({
        currentUserMessage: userMessage,
        historyMessages: messages
      });
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: 'assistant',
          content: assistantText
        }
      ]);
    } catch (_error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: 'assistant',
          content: GENERIC_ERROR_MESSAGE
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = useCallback(async (assistantIndex) => {
    if (isLoading) {
      return;
    }

    const conversationBeforeAssistant = messages.slice(0, assistantIndex);
    const previousUserIndex = [...conversationBeforeAssistant]
      .map((message, index) => ({ ...message, originalIndex: index }))
      .reverse()
      .find((message) => message.role === 'user');

    if (!previousUserIndex || !previousUserIndex.content) {
      return;
    }

    const precedingHistory = messages.slice(0, previousUserIndex.originalIndex);
    const targetUserMessage = previousUserIndex.content;

    setIsLoading(true);

    try {
      const assistantText = await sendAiChatMessage({
        currentUserMessage: targetUserMessage,
        historyMessages: precedingHistory
      });
      setMessages((prevMessages) =>
        prevMessages.map((message, index) => {
          if (index !== assistantIndex) {
            return message;
          }

          return {
            ...message,
            content: assistantText
          };
        })
      );
    } catch (_error) {
      setMessages((prevMessages) =>
        prevMessages.map((message, index) => {
          if (index !== assistantIndex) {
            return message;
          }

          return {
            ...message,
            content: GENERIC_ERROR_MESSAGE
          };
        })
      );
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, messages]);

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const handleExportChat = () => {
    if (!messages.length) {
      return;
    }

    const lines = [`React Developer Chat`, `Exported: ${new Date().toLocaleString()}`, ''];

    messages.forEach((message) => {
      const label = message.role === 'user' ? 'User' : 'AI React Agent';
      lines.push(`${label}:`);
      lines.push(message.content || '');
      lines.push('');
    });

    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'react-developer-chat.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const openClearConfirmation = () => {
    if (isLoading || !hasMessages) {
      return;
    }
    setClearConfirmOpen(true);
  };

  const handleConfirmClear = () => {
    if (isLoading) {
      return;
    }

    setMessages([]);
    setFeedbackByMessage({});
    setCopiedMessageState('');
    setCopiedCodeState('');
    setClearConfirmOpen(false);
  };

  const renderedMessages = useMemo(
    () =>
      messages.map((message, messageIndex) => {
        const isUser = message.role === 'user';
        const label = isUser ? 'User' : 'AI React Agent';
        const parts = isUser ? [{ type: 'text', content: message.content }] : parseAssistantMessage(message.content);
        const feedbackValue = feedbackByMessage[messageIndex] || null;

        return (
          <div
            key={`${message.role}-${messageIndex}`}
            className={`chat-widget-message-row ${isUser ? 'chat-widget-message-row-user' : 'chat-widget-message-row-assistant'}`}
          >
            <div className={`chat-widget-message ${isUser ? 'chat-widget-message-user' : 'chat-widget-message-assistant'}`}>
              <div className="chat-widget-message-head">
                <div className="chat-widget-message-label">{label}</div>
              </div>
              {parts.map((part, partIndex) => {
                if (part.type === 'code') {
                  const codeKey = `${messageIndex}-${partIndex}`;
                  return (
                    <CodeBlock
                      key={codeKey}
                      content={part.content}
                      language={part.language}
                      isCopied={copiedCodeState === codeKey}
                      onCopy={() => handleCopyCode(codeKey, part.content)}
                    />
                  );
                }

                return (
                  <Typography key={`${messageIndex}-${partIndex}`} variant="body2" className="chat-widget-text-part">
                    {part.content}
                  </Typography>
                );
              })}
              {!isUser && (
                <div className="chat-widget-message-tools">
                  <IconButton
                    size="small"
                    onClick={() => handleCopyAssistantMessage(messageIndex, message.content)}
                    disabled={isLoading}
                    aria-label="Copy assistant message"
                  >
                    {copiedMessageState === String(messageIndex) ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleRegenerate(messageIndex)}
                    disabled={isLoading}
                    aria-label="Regenerate response"
                  >
                    <RefreshIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => toggleFeedback(messageIndex, 'up')}
                    className={feedbackValue === 'up' ? 'chat-widget-feedback-active' : ''}
                    aria-label="Thumbs up"
                  >
                    <ThumbUpAltOutlinedIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => toggleFeedback(messageIndex, 'down')}
                    className={feedbackValue === 'down' ? 'chat-widget-feedback-active' : ''}
                    aria-label="Thumbs down"
                  >
                    <ThumbDownAltOutlinedIcon fontSize="small" />
                  </IconButton>
                </div>
              )}
            </div>
          </div>
        );
      }),
    [messages, copiedCodeState, copiedMessageState, feedbackByMessage, isLoading, handleRegenerate]
  );

  return (
    <>
      <Fab color="primary" className="chat-widget-launcher" onClick={handleOpen} aria-label="open chat">
        <ChatBubbleOutlineIcon />
      </Fab>

      <Dialog
        open={isOpen}
        onClose={handleClose}
        fullScreen={isMobile}
        maxWidth="xl"
        fullWidth
        PaperProps={{ className: 'chat-widget-dialog-paper' }}
      >
        <DialogTitle className="chat-widget-title">
          React Developer Chat
          <IconButton onClick={handleClose} aria-label="Close chat" className="chat-widget-title-close">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers className="chat-widget-content">
          <div className="chat-widget-messages">
            {messages.length === 0 && (
              <div className="chat-widget-message-row chat-widget-message-row-assistant">
                <div className="chat-widget-message chat-widget-message-assistant">
                  <div className="chat-widget-message-label">AI React Agent</div>
                  <Typography variant="body2" className="chat-widget-text-part">
                    Hi! I&apos;m an AI assistant focused on React, frontend development, and more. Ask anything.
                  </Typography>
                </div>
              </div>
            )}
            {renderedMessages}
            {isLoading && (
              <div className="chat-widget-message-row chat-widget-message-row-assistant">
                <div className="chat-widget-message chat-widget-message-assistant">
                  <div className="chat-widget-message-label">AI React Agent</div>
                  <div className="chat-widget-typing" aria-label="AI is typing">
                    <span className="chat-widget-typing-dot" />
                    <span className="chat-widget-typing-dot" />
                    <span className="chat-widget-typing-dot" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </DialogContent>

        <DialogActions className="chat-widget-actions">
          <TextField
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onKeyDown={handleInputKeyDown}
            multiline
            minRows={3}
            maxRows={6}
            fullWidth
            placeholder="Ask about React, frontend architecture, hooks, routing..."
            disabled={isLoading}
          />

          <div className="chat-widget-action-bar">
            <div className="chat-widget-action-left">
              {hasMessages && (
                <Button onClick={handleExportChat} variant="text" startIcon={<DownloadIcon />} disabled={isLoading}>
                  Export chat
                </Button>
              )}
            </div>
            <div className="chat-widget-action-right">
              {hasMessages && (
                <Button onClick={openClearConfirmation} variant="text" disabled={isLoading}>
                  Clear chat
                </Button>
              )}
              <Button
                onClick={handleSend}
                variant="contained"
                startIcon={<SendIcon />}
                disabled={isLoading || !inputValue.trim()}
                className="chat-widget-send-btn"
              >
                Send
              </Button>
            </div>
          </div>
        </DialogActions>
      </Dialog>

      <Dialog open={clearConfirmOpen} onClose={() => setClearConfirmOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Clear chat?</DialogTitle>
        <DialogContent>
          <DialogContentText>This will remove the current chat history.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setClearConfirmOpen(false)}>Cancel</Button>
          <Button onClick={handleConfirmClear} color="error" variant="contained">
            Clear
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ChatWidget;
