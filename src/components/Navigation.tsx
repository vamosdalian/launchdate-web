import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          🚀 LaunchDate
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/" className={isActive('/') ? 'active' : ''}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/rockets" className={isActive('/rockets') ? 'active' : ''}>
              Rockets
            </Link>
          </li>
          <li>
            <Link to="/launches" className={isActive('/launches') ? 'active' : ''}>
              Launch Dates
            </Link>
          </li>
          <li>
            <Link to="/news" className={isActive('/news') ? 'active' : ''}>
              News
            </Link>
          </li>
          <li>
            <Link to="/bases" className={isActive('/bases') ? 'active' : ''}>
              Launch Bases
            </Link>
          </li>
          <li>
            <Link to="/companies" className={isActive('/companies') ? 'active' : ''}>
              Companies
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
