import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Rockets from './pages/Rockets';
import RocketDetail from './pages/RocketDetail';
import Launches from './pages/Launches';
import LaunchDetail from './pages/LaunchDetail';
import News from './pages/News';
import LaunchBases from './pages/LaunchBases';
import Companies from './pages/Companies';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rockets" element={<Rockets />} />
            <Route path="/rockets/:id" element={<RocketDetail />} />
            <Route path="/launches" element={<Launches />} />
            <Route path="/launches/:id" element={<LaunchDetail />} />
            <Route path="/news" element={<News />} />
            <Route path="/bases" element={<LaunchBases />} />
            <Route path="/companies" element={<Companies />} />
          </Routes>
        </main>
        <footer className="bg-[#111] border-t border-gray-800">
          <div className="container mx-auto px-4 py-12">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-2">LaunchDate</h3>
                <p className="text-gray-400">Your comprehensive source for rocket launches, space news, and aerospace information.</p>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-3">Quick Links</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link to="/launches" className="hover:text-white">Launch Dates</Link></li>
                  <li><Link to="/rockets" className="hover:text-white">Rockets</Link></li>
                  <li><Link to="/news" className="hover:text-white">News</Link></li>
                  <li><Link to="/companies" className="hover:text-white">Companies</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-3">Stay Connected</h4>
                <p className="text-gray-400 mb-4">Subscribe for the latest launch updates and space news.</p>
                <form className="flex">
                  <input 
                    type="email" 
                    placeholder="Your email" 
                    className="w-full rounded-l-md bg-gray-800 border-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button 
                    type="submit" 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 rounded-r-md"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
            <div className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
              <p>&copy; 2025 LaunchDate. All Rights Reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
