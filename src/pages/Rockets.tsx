import { rockets } from '../data/sampleData';
import './Rockets.css';

const Rockets = () => {
  return (
    <div className="rockets-page">
      <div className="page-header">
        <h1>Rockets</h1>
        <p>Explore the rockets that are shaping the future of space exploration</p>
      </div>

      <div className="rockets-grid">
        {rockets.map((rocket) => (
          <div key={rocket.id} className="rocket-card">
            <div className="rocket-image">
              <img src={rocket.imageUrl} alt={rocket.name} />
              {rocket.active && <span className="active-badge">Active</span>}
            </div>
            <div className="rocket-content">
              <h2>{rocket.name}</h2>
              <p className="rocket-company">{rocket.company}</p>
              <p className="rocket-description">{rocket.description}</p>
              <div className="rocket-specs">
                <div className="spec-item">
                  <span className="spec-label">Height</span>
                  <span className="spec-value">{rocket.height}m</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Diameter</span>
                  <span className="spec-value">{rocket.diameter}m</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Mass</span>
                  <span className="spec-value">{(rocket.mass / 1000).toFixed(0)}t</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rockets;
