import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <h1>Welcome to LaunchDate</h1>
        <p className="hero-subtitle">
          Your comprehensive source for rocket launches, space news, and aerospace information
        </p>
        <div className="hero-cta">
          <Link to="/launches" className="cta-button primary">
            View Launch Schedule
          </Link>
          <Link to="/rockets" className="cta-button secondary">
            Explore Rockets
          </Link>
        </div>
      </section>

      <section className="features">
        <div className="feature-grid">
          <Link to="/rockets" className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3>Rockets</h3>
            <p>Explore detailed information about various rockets and their capabilities</p>
          </Link>

          <Link to="/launches" className="feature-card">
            <div className="feature-icon">📅</div>
            <h3>Launch Schedule</h3>
            <p>Stay updated with upcoming and past rocket launches</p>
          </Link>

          <Link to="/news" className="feature-card">
            <div className="feature-icon">📰</div>
            <h3>Space News</h3>
            <p>Read the latest news and updates from the space industry</p>
          </Link>

          <Link to="/bases" className="feature-card">
            <div className="feature-icon">🗺️</div>
            <h3>Launch Sites</h3>
            <p>Discover launch facilities around the world</p>
          </Link>

          <Link to="/companies" className="feature-card">
            <div className="feature-icon">🏢</div>
            <h3>Space Companies</h3>
            <p>Learn about the organizations shaping the future of space exploration</p>
          </Link>

          <div className="feature-card">
            <div className="feature-icon">🌍</div>
            <h3>Global Coverage</h3>
            <p>Information from space agencies and companies worldwide</p>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="stat-item">
          <div className="stat-number">200+</div>
          <div className="stat-label">Annual Launches</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">50+</div>
          <div className="stat-label">Active Rockets</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">30+</div>
          <div className="stat-label">Launch Sites</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">20+</div>
          <div className="stat-label">Space Companies</div>
        </div>
      </section>
    </div>
  );
};

export default Home;
