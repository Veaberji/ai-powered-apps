import ChatBot from './components/chat/ChatBot';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ReviewListWrapper from './components/reviews/ReviewListWrapper';
import ReviewSelector from './components/reviews/ReviewSelector';

function App() {
  return (
    <div className="p-4 h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<ChatBot />} />
          {/* <Route path="/reviews" element={<ReviewList />} /> */}
          <Route path="/reviews" element={<ReviewSelector />} />
          <Route path="/reviews/:productId" element={<ReviewListWrapper />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
