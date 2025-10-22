import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Rockets from './pages/Rockets';
import Launches from './pages/Launches';
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
            <Route path="/launches" element={<Launches />} />
            <Route path="/news" element={<News />} />
            <Route path="/bases" element={<LaunchBases />} />
            <Route path="/companies" element={<Companies />} />
          </Routes>
        </main>
        <footer className="footer">
          <p>&copy; 2025 LaunchDate. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
