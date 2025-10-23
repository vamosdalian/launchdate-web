import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { launches, news, rockets, companies } from '@/data/sampleData';
import { useEffect, useState } from 'react';

const Home = () => {
  const [currentLaunchIndex, setCurrentLaunchIndex] = useState(0);

  // Get upcoming launches in the next week
  const now = new Date();
  const oneWeekLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const upcomingLaunches = launches.filter((launch) => {
    const launchDate = new Date(launch.date);
    return launch.status === 'scheduled' && launchDate >= now && launchDate <= oneWeekLater;
  });

  // Get recent launch results (successful or failed)
  const recentResults = launches
    .filter((launch) => launch.status === 'successful' || launch.status === 'failed')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  // Get latest news
  const latestNews = news.slice(0, 3);

  // Get popular rockets (active ones)
  const popularRockets = rockets.filter(rocket => rocket.active).slice(0, 4);

  // Get popular companies
  const popularCompanies = companies.slice(0, 4);

  // Auto-scroll banner
  useEffect(() => {
    if (upcomingLaunches.length > 0) {
      const interval = setInterval(() => {
        setCurrentLaunchIndex((prev) => (prev + 1) % upcomingLaunches.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [upcomingLaunches.length]);

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
      {/* Hero/Header Section */}
      <section className="border-b bg-accent py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Welcome to LaunchDate
            </h1>
            <p className="text-xl text-muted-foreground">
              Your comprehensive source for rocket launches, space news, and aerospace information
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Button asChild size="lg">
                <Link to="/launches">View Launch Schedule</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/rockets">Explore Rockets</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Scrolling Banner - Upcoming Launches */}
      {upcomingLaunches.length > 0 && (
        <section className="border-b bg-muted py-6">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-4 text-center">Upcoming This Week</h2>
            <Link to={`/launches/${upcomingLaunches[currentLaunchIndex].id}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{upcomingLaunches[currentLaunchIndex].name}</CardTitle>
                      <CardDescription className="mt-2">
                        {formatDate(upcomingLaunches[currentLaunchIndex].date)} UTC
                      </CardDescription>
                    </div>
                    <Badge>Scheduled</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-6 text-sm">
                    <div>
                      <span className="text-muted-foreground">Rocket: </span>
                      <span className="font-medium">{upcomingLaunches[currentLaunchIndex].rocket}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Site: </span>
                      <span className="font-medium">{upcomingLaunches[currentLaunchIndex].launchBase}</span>
                    </div>
                  </div>
                  <p className="mt-3 text-muted-foreground">
                    {upcomingLaunches[currentLaunchIndex].description}
                  </p>
                </CardContent>
              </Card>
            </Link>
            <div className="flex justify-center gap-2 mt-4">
              {upcomingLaunches.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentLaunchIndex(idx)}
                  className={`h-2 w-2 rounded-full transition-all ${
                    idx === currentLaunchIndex ? 'bg-primary w-8' : 'bg-primary/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent Launch Results */}
      <section className="py-12 border-b">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Recent Launch Results</h2>
          <div className="space-y-4">
            {recentResults.map((launch) => (
              <Link key={launch.id} to={`/launches/${launch.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{launch.name}</h3>
                        <div className="flex gap-4 text-sm text-muted-foreground mb-2">
                          <span>{formatDate(launch.date)}</span>
                          <span>🚀 {launch.rocket}</span>
                          <span>📍 {launch.launchBase}</span>
                        </div>
                        <p className="text-muted-foreground">{launch.description}</p>
                      </div>
                      <Badge variant={launch.status === 'successful' ? 'default' : 'destructive'}>
                        {launch.status === 'successful' ? '✅ Success' : '❌ Failed'}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-12 border-b bg-accent">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Latest News</h2>
            <Button asChild variant="outline">
              <Link to="/news">View All</Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {latestNews.map((article) => (
              <Card key={article.id} className="overflow-hidden">
                <div className="aspect-video bg-muted">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardDescription>{formatDate(article.date)}</CardDescription>
                  <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3 mb-4">{article.summary}</p>
                  <Button asChild variant="link" className="px-0">
                    <a href={article.url}>Read More →</a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Rockets */}
      <section className="py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Popular Rockets</h2>
            <Button asChild variant="outline">
              <Link to="/rockets">View All</Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {popularRockets.map((rocket) => (
              <Link key={rocket.id} to={`/rockets/${rocket.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <div className="aspect-[2/3] bg-muted">
                    <img
                      src={rocket.imageUrl}
                      alt={rocket.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{rocket.name}</CardTitle>
                    <CardDescription>{rocket.company}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2 text-xs">
                      <Badge variant="secondary">Height: {rocket.height}m</Badge>
                      {rocket.active && <Badge>Active</Badge>}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Companies */}
      <section className="py-12 border-b bg-accent">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Space Companies</h2>
            <Button asChild variant="outline">
              <Link to="/companies">View All</Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {popularCompanies.map((company) => (
              <Card key={company.id} className="hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-muted">
                  <img
                    src={company.imageUrl}
                    alt={company.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{company.name}</CardTitle>
                  <CardDescription>Founded {company.founded}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {company.description}
                  </p>
                  <Button asChild variant="link" className="px-0 mt-2">
                    <a href={company.website} target="_blank" rel="noopener noreferrer">
                      Visit Website →
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsor Section */}
      <section className="py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <h2 className="text-3xl font-bold">Support LaunchDate</h2>
            <p className="text-muted-foreground">
              Help us keep tracking launches and providing up-to-date space information
            </p>
            <Button size="lg" variant="outline">
              Become a Sponsor
            </Button>
          </div>
        </div>
      </section>

      {/* Comments Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Community Feedback</h2>
            <Card>
              <CardHeader>
                <CardTitle>Share Your Thoughts</CardTitle>
                <CardDescription>
                  Let us know what you think about LaunchDate
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">
                  Comment functionality coming soon...
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
