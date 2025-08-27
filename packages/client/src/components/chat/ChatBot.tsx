import axios from 'axios';
import { useRef, useState } from 'react';
import TypingIndicator from './TypingIndicator';
import ChatMessages, { type Message } from './ChatMessages';
import ChatInput from './ChatInput';
import popSound from '@/assets/sounds/pop.mp3';
import notificationSound from '@/assets/sounds/notification.mp3';

const popAudio = new Audio(popSound);
popAudio.volume = 0.2;

const notificationAudio = new Audio(notificationSound);
popAudio.volume = 0.2;

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
      popAudio.play();

      const { data } = await axios.post<ChatResponse>('/api/chat', { prompt, conversationId: conversationId.current });
      setMessages((prev) => [...prev, { role: 'bot', content: data.message }]);
      notificationAudio.play();
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
