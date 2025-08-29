import axios from 'axios';

export interface ReviewDto {
  id: number;
  author: string;
  content: string;
  rating: number;
  createdAt: string;
}

export interface ReviewsResponse {
  reviews: ReviewDto[];
  summary?: string;
}

export interface SummaryResponse {
  summary: string | null;
}

export const reviewsApi = {
  async getReviews(productId: number) {
    const { data } = await axios.get<ReviewsResponse>(`/api/products/${productId}/reviews`);
    return data;
  },

  async summarize(productId: number) {
    const { data } = await axios.post<SummaryResponse>(`/api/products/${productId}/reviews/summarize`);
    return data;
  },
};
