import StarRating from './StarRating';
import Skeleton from 'react-loading-skeleton';
import { useQuery } from '@tanstack/react-query';
import { Button } from '../ui/button';
import { HiSparkles } from 'react-icons/hi';
import { useState } from 'react';
import { reviewsApi, type ReviewsResponse } from './reviewsApi';

interface ReviewListProps {
  productId: number;
}

const ReviewList = ({ productId }: ReviewListProps) => {
  const [summary, setSummary] = useState<string | null>('');
  const { data, error, isLoading } = useQuery<ReviewsResponse>({
    queryKey: ['reviews', productId],
    queryFn: () => getReviews(),
  });

  const getReviews = async () => await reviewsApi.getReviews(productId);

  const summarize = async () => {
    const { summary } = await reviewsApi.summarize(productId);
    setSummary(summary);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-5">
        {[1, 2, 3].map((item) => (
          <div key={item}>
            <Skeleton width={150} />
            <Skeleton width={100} />
            <Skeleton count={2} />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">Failed to fetch reviews</p>;
  }

  return (
    <div>
      {data?.reviews.length && (
        <div className="mb-5">
          {data?.summary || summary ? (
            <p>{data?.summary || summary}</p>
          ) : (
            <Button onClick={summarize} className="cursor-pointer">
              <HiSparkles /> Summarize
            </Button>
          )}
        </div>
      )}
      <div className="flex flex-col gap-5">
        {data?.reviews.map((review) => (
          <div key={review.id}>
            <div>
              <span className="font-semibold">{review.author} | </span>
              {new Date(review.createdAt).toLocaleDateString()}
            </div>
            <StarRating value={review.rating} />
            <div className="py-2">{review.content}</div>
            <div></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
