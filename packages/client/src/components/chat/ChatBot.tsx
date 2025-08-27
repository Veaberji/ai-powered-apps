import axios from 'axios';
import { useRef, useState } from 'react';
import TypingIndicator from './TypingIndicator';
import ChatMessages, { type Message } from './ChatMessages';
import ChatInput from './ChatInput';

interface ChatResponse {
  message: string;
}

const ChatBot = () => {
  const conversationId = useRef(crypto.randomUUID());
  const [messages, setMessages] = useState<Message[]>([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (prompt: string) => {
    try {
      setMessages((prev) => [...prev, { role: 'user', content: prompt }]);
      setIsBotTyping(true);
      setError('');

      const { data } = await axios.post<ChatResponse>('/api/chat', { prompt, conversationId: conversationId.current });
      setMessages((prev) => [...prev, { role: 'bot', content: data.message }]);
      setIsBotTyping(false);
    } catch (error) {
      console.log('%c⧭', 'color: #ff0000', error);

      setError('Failed to get AI response');
      setIsBotTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col flex-1 gap-3 mb-10 overflow-y-auto">
        <ChatMessages messages={messages} />
        {isBotTyping && <TypingIndicator />}
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <ChatInput formSubmitted={onSubmit} />
    </div>
  );
};

export default ChatBot;
