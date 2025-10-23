import { useParams, Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { launches, rockets, launchBases } from '@/data/sampleData';
import { useEffect, useState } from 'react';

const LaunchDetail = () => {
  const { id } = useParams<{ id: string }>();
  const launch = launches.find((l) => l.id === id);

  // Countdown state
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Update countdown every second
  useEffect(() => {
    if (!launch || launch.status !== 'scheduled') return;

    const updateCountdown = () => {
      const launchDate = new Date(launch.date).getTime();
      const now = new Date().getTime();
      const distance = launchDate - now;

      if (distance < 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [launch]);

  if (!launch) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-8 max-w-md text-center">
          <h1 className="text-2xl font-bold mb-4">Launch Not Found</h1>
          <p className="text-gray-400 mb-6">The requested launch does not exist.</p>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link to="/launches">Back to Launches</Link>
          </Button>
        </div>
      </div>
    );
  }

  const rocket = rockets.find((r) => r.name === launch.rocket);
  const launchBase = launchBases.find((b) => b.name === launch.launchBase);

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'successful':
        return <Badge className="bg-green-600">✅ Success</Badge>;
      case 'failed':
        return <Badge className="bg-red-600">❌ Failed</Badge>;
      case 'cancelled':
        return <Badge className="bg-gray-600">🚫 Cancelled</Badge>;
      default:
        return <Badge className="bg-blue-600">🕒 Scheduled</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f0f0f0]">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-end justify-center text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1614728263952-84ea256ec346?q=80&w=2574&auto=format&fit=crop" 
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?q=80&w=2574&auto=format&fit=crop';
            }}
            alt="Rocket Launch Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-x-0 bottom-0 h-1/2" style={{
            background: 'linear-gradient(0deg, rgba(10, 10, 10, 1) 0%, rgba(10, 10, 10, 0.7) 30%, rgba(10, 10, 10, 0) 100%)'
          }}></div>
        </div>
        <div className="relative z-10 p-4 pb-16 md:pb-24 container mx-auto">
          <div className="mb-8">
            {getStatusBadge(launch.status)}
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">{launch.name}</h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-2">{launch.rocket}</p>
          <p className="text-lg md:text-xl text-gray-400 mb-2">📍 {launch.launchBase}</p>
          <p className="text-lg md:text-xl text-gray-400 mb-8">🕒 {formatDate(launch.date)}</p>
          
          {/* Countdown Timer - Only show for scheduled launches */}
          {launch.status === 'scheduled' && (
            <div>
              <h2 className="text-lg md:text-xl font-medium text-gray-300 mb-4">Launch Countdown</h2>
              <div className="flex justify-center gap-4 md:gap-6 mb-8">
                <div className="rounded-lg px-4 py-3 md:px-6 md:py-4 min-w-[70px] md:min-w-[100px]" style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <div className="text-3xl md:text-5xl font-bold">{String(countdown.days).padStart(2, '0')}</div>
                  <div className="text-xs md:text-sm text-gray-400 mt-1">Days</div>
                </div>
                <div className="rounded-lg px-4 py-3 md:px-6 md:py-4 min-w-[70px] md:min-w-[100px]" style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <div className="text-3xl md:text-5xl font-bold">{String(countdown.hours).padStart(2, '0')}</div>
                  <div className="text-xs md:text-sm text-gray-400 mt-1">Hours</div>
                </div>
                <div className="rounded-lg px-4 py-3 md:px-6 md:py-4 min-w-[70px] md:min-w-[100px]" style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <div className="text-3xl md:text-5xl font-bold">{String(countdown.minutes).padStart(2, '0')}</div>
                  <div className="text-xs md:text-sm text-gray-400 mt-1">Minutes</div>
                </div>
                <div className="rounded-lg px-4 py-3 md:px-6 md:py-4 min-w-[70px] md:min-w-[100px]" style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <div className="text-3xl md:text-5xl font-bold">{String(countdown.seconds).padStart(2, '0')}</div>
                  <div className="text-xs md:text-sm text-gray-400 mt-1">Seconds</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column: Mission Details */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <Button asChild variant="ghost" className="mb-4 text-gray-300 hover:text-white">
                    <Link to="/launches">← Back to Launches</Link>
                  </Button>
                  <h2 className="text-3xl font-bold mb-6">Mission Details</h2>
                  
                  {/* Mission Overview */}
                  <div className="bg-[#1a1a1a] border border-[#2a2a2a] p-6 rounded-lg mb-6">
                    <h3 className="text-xl font-bold mb-3">Mission Overview</h3>
                    <p className="text-gray-300 mb-4">{launch.description}</p>
                    <ul className="grid sm:grid-cols-2 gap-4 text-gray-300">
                      <li><strong>Mission Name:</strong> {launch.name}</li>
                      <li><strong>Status:</strong> {launch.status === 'successful' ? 'Success' : launch.status === 'failed' ? 'Failed' : launch.status === 'cancelled' ? 'Cancelled' : 'Scheduled'}</li>
                      <li><strong>Launch Time:</strong> {formatDate(launch.date)}</li>
                      <li><strong>Mission Type:</strong> {
                        launch.name.includes('Starlink') ? 'Satellite Deployment' :
                        launch.name.includes('Crew') ? 'Crewed Mission' :
                        launch.name.includes('Cargo') || launch.name.includes('Dragon') ? 'Cargo Resupply' :
                        launch.name.includes('GPS') ? 'Navigation Satellite' :
                        'Communication Satellite'
                      }</li>
                    </ul>
                  </div>

                  {/* Rocket Information */}
                  {rocket && (
                    <div className="bg-[#1a1a1a] border border-[#2a2a2a] p-6 rounded-lg mb-6">
                      <h3 className="text-xl font-bold mb-3">Rocket Information</h3>
                      <div className="flex flex-col sm:flex-row gap-6">
                        <div className="w-32 h-48 bg-[#0a0a0a] rounded-lg overflow-hidden flex-shrink-0">
                          <img src={rocket.imageUrl} alt={rocket.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-2xl font-bold mb-2">{rocket.name}</h4>
                          <p className="text-gray-400 mb-4">{rocket.company}</p>
                          <p className="text-gray-300 mb-4">{rocket.description}</p>
                          <ul className="grid grid-cols-3 gap-4 text-gray-300 mb-4">
                            <li><strong>Height:</strong> {rocket.height}m</li>
                            <li><strong>Diameter:</strong> {rocket.diameter}m</li>
                            <li><strong>Mass:</strong> {(rocket.mass / 1000).toFixed(0)}t</li>
                          </ul>
                          <Button asChild className="bg-blue-600 hover:bg-blue-700">
                            <Link to={`/rockets/${rocket.id}`}>View Rocket Details →</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Launch Site */}
                  {launchBase && (
                    <div className="bg-[#1a1a1a] border border-[#2a2a2a] p-6 rounded-lg mb-6">
                      <h3 className="text-xl font-bold mb-3">Launch Site Information</h3>
                      <h4 className="text-2xl font-bold mb-2">{launchBase.name}</h4>
                      <p className="text-gray-400 mb-4">{launchBase.location}</p>
                      <p className="text-gray-300 mb-4">{launchBase.description}</p>
                      <ul className="grid sm:grid-cols-2 gap-4 text-gray-300">
                        <li><strong>Country:</strong> {launchBase.country}</li>
                        <li><strong>Coordinates:</strong> {launchBase.latitude.toFixed(4)}°N, {Math.abs(launchBase.longitude).toFixed(4)}°W</li>
                      </ul>
                    </div>
                  )}

                  {/* Additional Information */}
                  <div className="bg-[#1a1a1a] border border-[#2a2a2a] p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-3">Payload Information</h3>
                    <ul className="grid sm:grid-cols-2 gap-4 text-gray-300">
                      <li><strong>Launch Provider:</strong> {rocket?.company || 'N/A'}</li>
                      <li><strong>Target Orbit:</strong> {
                        launch.name.includes('Starlink') || launch.name.includes('OneWeb') ? 'Low Earth Orbit (LEO)' :
                        launch.name.includes('GPS') || launch.name.includes('SES') ? 'Geostationary Orbit (GEO)' :
                        launch.name.includes('ISS') || launch.name.includes('Dragon') || launch.name.includes('Crew') ? 'Low Earth Orbit (LEO) - ISS' :
                        launch.name.includes('Moon') || launch.name.includes('Artemis') ? 'Trans-Lunar Injection' :
                        'Low Earth Orbit (LEO)'
                      }</li>
                      {rocket?.name.includes('Falcon') && (
                        <>
                          <li><strong>First Stage Recovery:</strong> Yes</li>
                          <li><strong>Fairing Recovery:</strong> Yes</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Right Column: Timeline */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Launch Timeline</h2>
                <div className="relative pl-8">
                  <div className="relative pb-8">
                    <div 
                      className="absolute -left-[30px] top-[5px] w-5 h-5 rounded-full bg-[#2a2a2a] border-4 border-[#007bff]"
                    ></div>
                    <div 
                      className="absolute -left-[21px] top-[5px] bottom-[-5px] w-0.5 bg-[#2a2a2a]"
                    ></div>
                    <p className="font-bold text-lg">T-00:00:00</p>
                    <p className="text-gray-400">{rocket?.name || 'Rocket'} Liftoff</p>
                  </div>
                  <div className="relative pb-8">
                    <div 
                      className="absolute -left-[30px] top-[5px] w-5 h-5 rounded-full bg-[#2a2a2a] border-4 border-[#007bff]"
                    ></div>
                    <div 
                      className="absolute -left-[21px] top-[5px] bottom-[-5px] w-0.5 bg-[#2a2a2a]"
                    ></div>
                    <p className="font-bold text-lg">T+00:01:12</p>
                    <p className="text-gray-400">Pass through Max-Q</p>
                  </div>
                  <div className="relative pb-8">
                    <div 
                      className="absolute -left-[30px] top-[5px] w-5 h-5 rounded-full bg-[#2a2a2a] border-4 border-[#007bff]"
                    ></div>
                    <div 
                      className="absolute -left-[21px] top-[5px] bottom-[-5px] w-0.5 bg-[#2a2a2a]"
                    ></div>
                    <p className="font-bold text-lg">T+00:02:27</p>
                    <p className="text-gray-400">Main Engine Cutoff (MECO)</p>
                  </div>
                  <div className="relative pb-8">
                    <div 
                      className="absolute -left-[30px] top-[5px] w-5 h-5 rounded-full bg-[#2a2a2a] border-4 border-[#007bff]"
                    ></div>
                    <div 
                      className="absolute -left-[21px] top-[5px] bottom-[-5px] w-0.5 bg-[#2a2a2a]"
                    ></div>
                    <p className="font-bold text-lg">T+00:02:31</p>
                    <p className="text-gray-400">Stage Separation</p>
                  </div>
                  {rocket?.name.includes('Falcon') && (
                    <div className="relative pb-8">
                      <div 
                        className="absolute -left-[30px] top-[5px] w-5 h-5 rounded-full bg-[#2a2a2a] border-4 border-[#007bff]"
                      ></div>
                      <div 
                        className="absolute -left-[21px] top-[5px] bottom-[-5px] w-0.5 bg-[#2a2a2a]"
                      ></div>
                      <p className="font-bold text-lg">T+00:08:45</p>
                      <p className="text-gray-400">First Stage Landing</p>
                    </div>
                  )}
                  <div className="relative">
                    <div 
                      className="absolute -left-[30px] top-[5px] w-5 h-5 rounded-full bg-[#2a2a2a] border-4 border-[#007bff]"
                    ></div>
                    <p className="font-bold text-lg">T+01:04:29</p>
                    <p className="text-gray-400">Payload Deployment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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
  );
};

export default LaunchDetail;
