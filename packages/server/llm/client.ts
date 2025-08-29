import OpenAI from 'openai';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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
    const response = await client.responses.create({
      model,
      input: prompt,
      max_output_tokens: maxOutputTokens,
      instructions,
      temperature: temperature,
      previous_response_id: previousResponseId,
    });

    return { id: response.id, message: response.output_text };
  },
};
