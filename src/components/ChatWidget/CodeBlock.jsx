import React from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';

function CodeBlock({ content, language, isCopied, onCopy }) {
  return (
    <div className="chat-widget-codeblock">
      <div className="chat-widget-codeblock-header">
        <span className="chat-widget-codeblock-language">{language || 'code'}</span>
        <button
          type="button"
          className="chat-widget-codeblock-copy"
          onClick={onCopy}
          aria-label="copy code"
        >
          {isCopied ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
          {isCopied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="chat-widget-codeblock-pre">
        <code>{content}</code>
      </pre>
    </div>
  );
}

export default CodeBlock;
