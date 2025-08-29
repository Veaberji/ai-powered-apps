import { Link } from 'react-router-dom';

const ReviewSelector = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-4 bg-gray-50">
      <h1 className="text-2xl font-semibold mb-4">Select a Product</h1>
      {[1, 2, 3, 4, 5].map((id) => (
        <Link key={id} to={`/reviews/${id}`}>
          <button className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
            Product {id}
          </button>
        </Link>
      ))}
    </div>
  );
};

export default ReviewSelector;
