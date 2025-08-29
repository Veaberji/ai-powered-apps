import dayjs from 'dayjs';
import { PrismaClient, type Product, type Review, type Summary } from '../generated/prisma';

const dbClient = new PrismaClient();

export const productRepository = {
  async getProduct(productId: number): Promise<Product | null> {
    return dbClient.product.findUnique({ where: { id: productId } });
  },

  async getProductReviews(productId: number, limit?: number): Promise<Review[]> {
    return dbClient.review.findMany({ where: { productId }, orderBy: { createdAt: 'desc' }, take: limit });
  },

  async getReviewSummary(productId: number): Promise<Summary | null> {
    return dbClient.summary.findUnique({ where: { productId } });
  },

  async storeReviewSummary(productId: number, summary: string) {
    const now = new Date();
    const expiresAt = dayjs().add(7, 'days').toDate();
    return dbClient.summary.upsert({
      where: { productId },
      create: { content: summary, productId, generatedAt: now, expiresAt },
      update: { content: summary, productId, generatedAt: now, expiresAt },
    });
  },
};
