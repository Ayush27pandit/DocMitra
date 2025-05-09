import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FreelanceForm from './components/FreelanceForm';
import History from './pages/HIstory';

function App() {
  return (
    <Router>
      <div className="p-4">
        {/* Navigation Bar */}
        <nav className="mb-6 space-x-4 border-b pb-2">
          <Link to="/" className="text-blue-500 font-semibold">Home</Link>
          <Link to="/history" className="text-blue-500 font-semibold">History</Link>
        </nav>

        {/* Route Definitions */}
        <Routes>
          <Route path="/" element={<FreelanceForm />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
