import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FreelanceForm from './components/FreelanceForm';
import History from './pages/HIstory';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <Router>
      <div>

        {/* Route Definitions */}
        <Routes>
          <Route path="/home" element={<FreelanceForm />} />
          <Route path="/history" element={<History />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
