import { useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

export interface Message {
  role: 'user' | 'bot';
  content: string;
}

interface ChatMessagesProps {
  messages: Message[];
}

const ChatMessages = ({ messages }: ChatMessagesProps) => {
  const lasMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    lasMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const copyText = (e: React.ClipboardEvent) => {
    const selection = window.getSelection()?.toString().trim();
    if (selection) {
      e.preventDefault();
      e.clipboardData.setData('text/plain', selection);
    }
  };

  return (
    <>
      {messages.map((message, index) => (
        <div
          key={index}
          onCopy={copyText}
          ref={index === messages.length - 1 ? lasMessageRef : null}
          className={`px-3 py-1 max-w-md rounded-xl ${message.role === 'user' ? `bg-blue-600 text-white self-end` : `bg-gray-100 text-black self-start`}`}
        >
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>
      ))}
    </>
  );
};

export default ChatMessages;
