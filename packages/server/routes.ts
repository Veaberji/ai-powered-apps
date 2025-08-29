import express from 'express';
import { chatController } from './controllers/chat.controller';
import { productController } from './controllers/product.controller';

const router = express.Router();

router.post('/api/chat', chatController.sendMessage);

router.get('/api/products/:id/reviews', productController.getProductReviews);
router.post('/api/products/:id/reviews/summarize', productController.getProductSummarizedReviews);

export default router;
