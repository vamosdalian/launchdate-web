import { launchBases } from '../data/sampleData';
import './LaunchBases.css';

const LaunchBases = () => {
  return (
    <div className="bases-page">
      <div className="page-header">
        <h1>Launch Sites</h1>
        <p>Explore the facilities where rockets are launched into space</p>
      </div>

      <div className="bases-grid">
        {launchBases.map((base) => (
          <div key={base.id} className="base-card">
            <div className="base-image">
              <img src={base.imageUrl} alt={base.name} />
            </div>
            <div className="base-content">
              <h2>{base.name}</h2>
              <div className="base-location">
                <span className="location-icon">📍</span>
                <span>{base.location}, {base.country}</span>
              </div>
              <p className="base-description">{base.description}</p>
              <div className="base-coordinates">
                <div className="coordinate-item">
                  <span className="coordinate-label">Latitude</span>
                  <span className="coordinate-value">{base.latitude.toFixed(4)}°</span>
                </div>
                <div className="coordinate-item">
                  <span className="coordinate-label">Longitude</span>
                  <span className="coordinate-value">{base.longitude.toFixed(4)}°</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LaunchBases;
