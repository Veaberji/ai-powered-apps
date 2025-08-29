import fs from 'fs';
import path from 'path';
import { conversationRepository } from '../data/conversation.repository';
import template from '../prompts/chatbot.txt';
import { llmClient, type LLMResponse } from '../llm/client';

const parkInfo = fs.readFileSync(path.join(__dirname, '..', 'prompts', 'WonderWorld.md'), 'utf-8');
const instructions = template.replace('{{parkInfo}}', parkInfo);

export const chatService = {
  async sendMessage(prompt: string, conversationId: string): Promise<LLMResponse> {
    const response = await llmClient.generateText({
      model: 'gpt-4o-mini',
      instructions,
      prompt,
      maxOutputTokens: 200,
      temperature: 0.2,
      previousResponseId: conversationRepository.getLastResponseId(conversationId),
    });

    conversationRepository.setLastResponseId(conversationId, response.id);

    return response;
  },
};
