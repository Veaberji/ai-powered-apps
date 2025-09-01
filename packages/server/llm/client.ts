import OpenAI from 'openai';
import { InferenceClient } from '@huggingface/inference';
import { Ollama } from 'ollama';

const hfClient = new InferenceClient(process.env.HF_TOKEN);
const openAIClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const ollamaClient = new Ollama();

interface GenerateTextOptions {
  model: string;
  prompt: string;
  maxOutputTokens: number;
  instructions?: string;
  temperature?: number;
  previousResponseId?: string;
}

export interface LLMResponse {
  id: string;
  message: string;
}

export const llmClient = {
  async generateText({
    model,
    prompt,
    maxOutputTokens,
    instructions,
    temperature,
    previousResponseId,
  }: GenerateTextOptions): Promise<LLMResponse> {
    const response = await openAIClient.responses.create({
      model,
      input: prompt,
      max_output_tokens: maxOutputTokens,
      instructions,
      temperature: temperature,
      previous_response_id: previousResponseId,
    });

    return { id: response.id, message: response.output_text };
  },

  async summarize(instructions: string, prompt: string) {
    const response = await hfClient.chatCompletion({
      provider: 'cerebras',
      model: 'meta-llama/Llama-3.1-8B-Instruct',
      messages: [
        {
          role: 'system',
          content: instructions,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    return response.choices[0]?.message.content || '';
  },

  async ollamaSummarize(instructions: string, prompt: string) {
    const response = await ollamaClient.chat({
      model: 'tinyllama',
      messages: [
        {
          role: 'system',
          content: instructions,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    return response.message.content;
  },
};
