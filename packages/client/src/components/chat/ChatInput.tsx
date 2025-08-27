import React from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';

export interface ChatInputProps {
  formSubmitted: (prompt: string) => void;
}

interface ChatFormData {
  prompt: string;
}

const ChatInput = ({ formSubmitted }: ChatInputProps) => {
  const { register, handleSubmit, reset, formState } = useForm<ChatFormData>();

  const onSubmit = ({ prompt }: ChatFormData) => {
    reset({ prompt: '' });
    formSubmitted(prompt);
  };

  const onEnter = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={onEnter}
      className="flex flex-col gap-2 items-end border-2 p-4 rounded-3xl"
    >
      <textarea
        {...register('prompt', { required: true, validate: (data) => !!data.trim() })}
        className="w-full border-0 focus:outline-0 resize-none"
        placeholder="Ask anything"
        autoFocus
        maxLength={1000}
      />
      <Button disabled={!formState.isValid} className="rounded-full w-9 h-9">
        <FaArrowUp />
      </Button>
    </form>
  );
};

export default ChatInput;
