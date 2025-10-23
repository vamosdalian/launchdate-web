import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { launches, news, rockets, companies } from '@/data/sampleData';
import { useEffect, useState } from 'react';

const Home = () => {
  // Get the next upcoming launch
  const now = new Date();
  const upcomingLaunches = launches
    .filter((launch) => {
      const launchDate = new Date(launch.date);
      return launch.status === 'scheduled' && launchDate >= now;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  const nextLaunch = upcomingLaunches[0];

  // Countdown state
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Update countdown every second
  useEffect(() => {
    if (!nextLaunch) return;

    const updateCountdown = () => {
      const launchDate = new Date(nextLaunch.date).getTime();
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
  }, [nextLaunch]);

  // Get recent launch results (successful or failed)
  const recentResults = launches
    .filter((launch) => launch.status === 'successful' || launch.status === 'failed')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6);

  // Get latest news
  const latestNews = news.slice(0, 3);

  // Get popular rockets (active ones)
  const popularRockets = rockets.filter(rocket => rocket.active).slice(0, 4);

  // Get popular companies
  const popularCompanies = companies.slice(0, 5);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Countdown */}
      <section className="relative h-screen flex items-end justify-center text-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1614728263952-84ea256ec346?q=80&w=2574&auto=format&fit=crop" 
            alt="Rocket Launch Background"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?q=80&w=2574&auto=format&fit=crop';
            }}
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-x-0 bottom-0 h-1/2" style={{
            background: 'linear-gradient(0deg, rgba(10, 10, 10, 1) 0%, rgba(10, 10, 10, 0.7) 30%, rgba(10, 10, 10, 0) 100%)'
          }}></div>
        </div>

        {/* Content */}
        {nextLaunch && (
          <div className="relative z-10 p-4 pb-24 md:pb-32 container mx-auto">
            <h2 className="text-lg md:text-xl font-medium text-gray-300 mb-2">Next Launch</h2>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{nextLaunch.name}</h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-2">{nextLaunch.rocket}</p>
            <p className="text-lg md:text-xl text-gray-400 mb-8">{nextLaunch.launchBase}</p>
            
            {/* Countdown Timer */}
            <div className="flex justify-center gap-4 md:gap-8 mb-8">
              <div className="countdown-box rounded-lg px-4 py-3 md:px-6 md:py-4 min-w-[70px] md:min-w-[100px]" style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div className="text-3xl md:text-5xl font-bold">{String(countdown.days).padStart(2, '0')}</div>
                <div className="text-xs md:text-sm text-gray-400 mt-1">Days</div>
              </div>
              <div className="countdown-box rounded-lg px-4 py-3 md:px-6 md:py-4 min-w-[70px] md:min-w-[100px]" style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div className="text-3xl md:text-5xl font-bold">{String(countdown.hours).padStart(2, '0')}</div>
                <div className="text-xs md:text-sm text-gray-400 mt-1">Hours</div>
              </div>
              <div className="countdown-box rounded-lg px-4 py-3 md:px-6 md:py-4 min-w-[70px] md:min-w-[100px]" style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div className="text-3xl md:text-5xl font-bold">{String(countdown.minutes).padStart(2, '0')}</div>
                <div className="text-xs md:text-sm text-gray-400 mt-1">Minutes</div>
              </div>
              <div className="countdown-box rounded-lg px-4 py-3 md:px-6 md:py-4 min-w-[70px] md:min-w-[100px]" style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div className="text-3xl md:text-5xl font-bold">{String(countdown.seconds).padStart(2, '0')}</div>
                <div className="text-xs md:text-sm text-gray-400 mt-1">Seconds</div>
              </div>
            </div>

            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
              <Link to={`/launches/${nextLaunch.id}`}>View Launch Details</Link>
            </Button>
          </div>
        )}
      </section>

      {/* Upcoming Launches Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Upcoming Launches</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingLaunches.slice(0, 6).map((launch) => (
              <Link key={launch.id} to={`/launches/${launch.id}`}>
                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 hover:border-[#4a4a4a] hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold">{launch.name}</h3>
                    <Badge className="bg-blue-600">Scheduled</Badge>
                  </div>
                  <div className="space-y-2 text-sm text-gray-400 mb-4">
                    <p>🚀 {launch.rocket}</p>
                    <p>📍 {launch.launchBase}</p>
                    <p>📅 {formatDate(launch.date)} UTC</p>
                  </div>
                  <p className="text-gray-300 line-clamp-2">{launch.description}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="outline" size="lg">
              <Link to="/launches">View All Launches</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Recent Launch Results */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Recent Launch Results</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {recentResults.map((launch) => (
              <Link key={launch.id} to={`/launches/${launch.id}`}>
                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 hover:border-[#4a4a4a] hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{launch.name}</h3>
                      <div className="flex gap-4 text-sm text-gray-400 mb-2">
                        <span>📅 {formatDate(launch.date)}</span>
                        <span>🚀 {launch.rocket}</span>
                      </div>
                      <p className="text-sm text-gray-400">📍 {launch.launchBase}</p>
                    </div>
                    <Badge 
                      className={launch.status === 'successful' ? 'bg-green-600' : 'bg-red-600'}
                    >
                      {launch.status === 'successful' ? '✅ Success' : '❌ Failed'}
                    </Badge>
                  </div>
                  <p className="text-gray-300">{launch.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Latest News</h2>
            <Button asChild variant="outline">
              <Link to="/news">View All</Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {latestNews.map((article) => (
              <div key={article.id} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg overflow-hidden hover:border-[#4a4a4a] hover:-translate-y-1 transition-all duration-300">
                <div className="aspect-video bg-[#0a0a0a]">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-400 mb-2">{formatDate(article.date)}</p>
                  <h3 className="text-xl font-bold mb-3 line-clamp-2">{article.title}</h3>
                  <p className="text-gray-400 line-clamp-3 mb-4">{article.summary}</p>
                  <a 
                    href={article.url} 
                    className="text-blue-500 hover:text-blue-400 font-medium"
                  >
                    Read More →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Rockets */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Popular Rockets</h2>
            <Button asChild variant="outline">
              <Link to="/rockets">View All</Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {popularRockets.map((rocket) => (
              <Link key={rocket.id} to={`/rockets/${rocket.id}`}>
                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg overflow-hidden hover:border-[#4a4a4a] hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full">
                  <div className="aspect-[2/3] bg-[#0a0a0a]">
                    <img
                      src={rocket.imageUrl}
                      alt={rocket.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-1">{rocket.name}</h3>
                    <p className="text-gray-400 text-sm mb-3">{rocket.company}</p>
                    <div className="flex gap-2 text-xs">
                      <Badge variant="secondary" className="bg-[#2a2a2a]">Height: {rocket.height}m</Badge>
                      {rocket.active && <Badge className="bg-blue-600">Active</Badge>}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Space Agencies Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Explore Major Space Agencies</h2>
          <div className="flex flex-wrap justify-center items-center gap-x-12 sm:gap-x-16 md:gap-x-20 gap-y-8">
            {popularCompanies.map((company) => (
              <a 
                key={company.id} 
                href={company.website} 
                target="_blank" 
                rel="noopener noreferrer"
                title={company.name}
                className="grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-300"
              >
                <img 
                  src={company.imageUrl} 
                  alt={`${company.name} Logo`} 
                  className="h-12 md:h-16 max-w-[150px] object-contain"
                />
              </a>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
};

export default Home;
