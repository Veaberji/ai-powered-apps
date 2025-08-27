import type { Request, Response } from 'express';
import { chatService } from '../serveces/chat.service';
import z from 'zod';

const chatSchema = z.object({
  prompt: z.string().trim().min(1, 'Prompt is required').max(1000, 'Max length is 1000 chars'),
  conversationId: z.uuid(),
});

export const chatController = {
  async sendMessage(req: Request, res: Response) {
    const result = chatSchema.safeParse(req.body);

    if (!result.success) {
      const errorTree = z.treeifyError(result.error);
      res.status(400).json(errorTree);

      return;
    }

    try {
      const { prompt, conversationId } = req.body;
      const response = await chatService.sendMessage(prompt, conversationId);

      res.json({ message: response.message });
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate a response.' });
    }
  },
};
