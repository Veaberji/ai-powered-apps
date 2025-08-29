import { useParams } from 'react-router-dom';
import ReviewList from './ReviewList';

const ReviewListWrapper = () => {
  const { productId } = useParams();
  return <ReviewList productId={Number(productId)} />;
};

export default ReviewListWrapper;
