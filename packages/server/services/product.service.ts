import { productRepository } from '../data/product.repository';
import { type Product, type Review } from '../generated/prisma';
import { llmClient } from '../llm/client';
import template from '../llm/prompts/summarize-reviews.txt';

export const productService = {
  async getProduct(productId: number): Promise<Product | null> {
    return productRepository.getProduct(productId);
  },

  async getProductReviews(productId: number): Promise<Review[]> {
    return productRepository.getProductReviews(productId);
  },

  async getProductSummarizedReviews(productId: number): Promise<string | null> {
    const reviews = await productRepository.getProductReviews(productId, 10);
    if (!reviews?.length) {
      return null;
    }

    const summary = await productRepository.getReviewSummary(productId);
    if (summary && summary.expiresAt > new Date()) {
      return summary.content;
    }

    const joinedReviews = reviews.map((r) => r.content).join('\n\n');

    const message = await llmClient.summarize(template, joinedReviews);

    await productRepository.storeReviewSummary(productId, message);

    return message;
  },
};
