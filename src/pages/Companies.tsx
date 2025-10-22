import { companies } from '../data/sampleData';
import './Companies.css';

const Companies = () => {
  return (
    <div className="companies-page">
      <div className="page-header">
        <h1>Space Companies</h1>
        <p>Meet the organizations leading the charge in space exploration</p>
      </div>

      <div className="companies-grid">
        {companies.map((company) => (
          <div key={company.id} className="company-card">
            <div className="company-logo">
              <img src={company.imageUrl} alt={company.name} />
            </div>
            <div className="company-content">
              <h2>{company.name}</h2>
              <p className="company-description">{company.description}</p>
              <div className="company-info">
                <div className="info-item">
                  <span className="info-label">Founded</span>
                  <span className="info-value">{company.founded}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Founder</span>
                  <span className="info-value">{company.founder}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Headquarters</span>
                  <span className="info-value">{company.headquarters}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Employees</span>
                  <span className="info-value">{company.employees.toLocaleString()}</span>
                </div>
              </div>
              <a href={company.website} target="_blank" rel="noopener noreferrer" className="company-website">
                Visit Website →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Companies;
