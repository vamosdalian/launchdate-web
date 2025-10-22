import { launches } from '../data/sampleData';
import './Launches.css';

const Launches = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC',
      timeZoneName: 'short',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'status-scheduled';
      case 'successful':
        return 'status-successful';
      case 'failed':
        return 'status-failed';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled':
        return '🕒';
      case 'successful':
        return '✅';
      case 'failed':
        return '❌';
      case 'cancelled':
        return '🚫';
      default:
        return '';
    }
  };

  return (
    <div className="launches-page">
      <div className="page-header">
        <h1>Launch Schedule</h1>
        <p>Stay updated with upcoming and past rocket launches</p>
      </div>

      <div className="launches-list">
        {launches.map((launch) => (
          <div key={launch.id} className="launch-card">
            <div className="launch-header">
              <div className="launch-date">
                <span className="date-label">Launch Date</span>
                <span className="date-value">{formatDate(launch.date)}</span>
              </div>
              <span className={`launch-status ${getStatusColor(launch.status)}`}>
                {getStatusIcon(launch.status)} {launch.status.toUpperCase()}
              </span>
            </div>
            <h2>{launch.name}</h2>
            <div className="launch-details">
              <div className="detail-item">
                <span className="detail-icon">🚀</span>
                <div>
                  <span className="detail-label">Rocket</span>
                  <span className="detail-value">{launch.rocket}</span>
                </div>
              </div>
              <div className="detail-item">
                <span className="detail-icon">📍</span>
                <div>
                  <span className="detail-label">Launch Site</span>
                  <span className="detail-value">{launch.launchBase}</span>
                </div>
              </div>
            </div>
            <p className="launch-description">{launch.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Launches;
