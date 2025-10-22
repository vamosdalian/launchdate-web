import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
        <footer className="footer border-t py-6 bg-card">
          <div className="container mx-auto px-4 text-center text-muted-foreground">
            <p>&copy; 2025 LaunchDate. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
