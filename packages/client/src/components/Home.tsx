import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="space-x-4">
        <Link to="/chat">
          <button className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            WonderWorld park ChatBot
          </button>
        </Link>
        <Link to="/reviews">
          <button className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition">
            Reviews with summarization
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
