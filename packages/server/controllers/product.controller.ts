import type { Request, Response } from 'express';
import { productService } from '../services/product.service';

export const productController = {
  async getProductReviews(req: Request, res: Response) {
    const productId = Number(req.params.id);

    if (isNaN(productId)) {
      res.status(400).json({ error: 'Invalid product Id' });
      return;
    }

    res.json(await productService.getProductReviews(productId));
  },

  async getProductSummarizedReviews(req: Request, res: Response) {
    const productId = Number(req.params.id);

    if (isNaN(productId)) {
      res.status(400).json({ error: 'Invalid product Id' });
      return;
    }

    try {
      const summary = await productService.getProductSummarizedReviews(productId);
      res.json({ summary });
    } catch (error) {
      console.log('%c⧭', 'color: #ff0000', error);
      res.json({ summary: null });
    }
  },
};
