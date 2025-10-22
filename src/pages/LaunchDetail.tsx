import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { launches, rockets, launchBases } from '@/data/sampleData';

const LaunchDetail = () => {
  const { id } = useParams<{ id: string }>();
  const launch = launches.find((l) => l.id === id);

  if (!launch) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card>
          <CardHeader>
            <CardTitle>Launch Not Found</CardTitle>
            <CardDescription>The requested launch could not be found.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link to="/launches">Back to Launches</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const rocket = rockets.find((r) => r.name === launch.rocket);
  const launchBase = launchBases.find((b) => b.name === launch.launchBase);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
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
        return <Badge className="bg-green-600">✅ Successful</Badge>;
      case 'failed':
        return <Badge variant="destructive">❌ Failed</Badge>;
      case 'cancelled':
        return <Badge variant="secondary">🚫 Cancelled</Badge>;
      default:
        return <Badge>🕒 Scheduled</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="border-b bg-card py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Button asChild variant="ghost" className="mb-4">
              <Link to="/launches">← Back to Launches</Link>
            </Button>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-4xl font-bold mb-2">{launch.name}</h1>
                <p className="text-xl text-muted-foreground">
                  {formatDate(launch.date)}
                </p>
              </div>
              {getStatusBadge(launch.status)}
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Mission Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Mission Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{launch.description}</p>
              <Separator />
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm text-muted-foreground">Mission Name</h3>
                  <p className="text-lg">{launch.name}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm text-muted-foreground">Status</h3>
                  <div>{getStatusBadge(launch.status)}</div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm text-muted-foreground">Launch Date & Time</h3>
                  <p className="text-lg">{formatDate(launch.date)}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm text-muted-foreground">Mission Type</h3>
                  <p className="text-lg">
                    {launch.name.includes('Starlink') ? 'Satellite Deployment' :
                     launch.name.includes('Crew') ? 'Crewed Mission' :
                     launch.name.includes('Cargo') || launch.name.includes('Dragon') ? 'Cargo Resupply' :
                     launch.name.includes('GPS') ? 'Navigation Satellite' :
                     'Communications Satellite'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rocket Information */}
          {rocket && (
            <Card>
              <CardHeader>
                <CardTitle>Rocket Information</CardTitle>
                <CardDescription>Details about the launch vehicle</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-6">
                  <div className="w-32 h-48 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                    <img src={rocket.imageUrl} alt={rocket.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold">{rocket.name}</h3>
                      <p className="text-muted-foreground">{rocket.company}</p>
                    </div>
                    <p className="text-muted-foreground">{rocket.description}</p>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Height</p>
                        <p className="text-lg font-semibold">{rocket.height}m</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Diameter</p>
                        <p className="text-lg font-semibold">{rocket.diameter}m</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Mass</p>
                        <p className="text-lg font-semibold">{(rocket.mass / 1000).toFixed(0)}t</p>
                      </div>
                    </div>
                    <Button asChild variant="outline">
                      <Link to={`/rockets/${rocket.id}`}>View Rocket Details →</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Launch Site Information */}
          {launchBase && (
            <Card>
              <CardHeader>
                <CardTitle>Launch Site</CardTitle>
                <CardDescription>Location details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold">{launchBase.name}</h3>
                    <p className="text-muted-foreground">{launchBase.location}</p>
                  </div>
                  <p className="text-muted-foreground">{launchBase.description}</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Country</p>
                      <p className="font-semibold">{launchBase.country}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Coordinates</p>
                      <p className="font-semibold">{launchBase.latitude.toFixed(4)}°N, {Math.abs(launchBase.longitude).toFixed(4)}°W</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Mission Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Mission Timeline</CardTitle>
              <CardDescription>Key events and milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-2 bg-primary rounded-full"></div>
                  <div className="flex-1 pb-4">
                    <p className="font-semibold">T-24 Hours</p>
                    <p className="text-sm text-muted-foreground">Weather briefing and final go/no-go poll</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-2 bg-primary rounded-full"></div>
                  <div className="flex-1 pb-4">
                    <p className="font-semibold">T-4 Hours</p>
                    <p className="text-sm text-muted-foreground">Propellant loading begins</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-2 bg-primary rounded-full"></div>
                  <div className="flex-1 pb-4">
                    <p className="font-semibold">T-35 Minutes</p>
                    <p className="text-sm text-muted-foreground">Launch director verifies go for launch</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-2 bg-primary rounded-full"></div>
                  <div className="flex-1 pb-4">
                    <p className="font-semibold">T-0</p>
                    <p className="text-sm text-muted-foreground">Liftoff</p>
                  </div>
                </div>
                {launch.status === 'successful' && (
                  <>
                    <div className="flex gap-4">
                      <div className="w-2 bg-green-600 rounded-full"></div>
                      <div className="flex-1 pb-4">
                        <p className="font-semibold">T+2 Minutes</p>
                        <p className="text-sm text-muted-foreground">Stage separation</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-2 bg-green-600 rounded-full"></div>
                      <div className="flex-1">
                        <p className="font-semibold">T+9 Minutes</p>
                        <p className="text-sm text-muted-foreground">
                          {rocket?.name.includes('Falcon') ? 'First stage landing' : 'Mission success'}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Launch Provider</h3>
                <p className="text-muted-foreground">{rocket?.company || 'N/A'}</p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Orbit</h3>
                <p className="text-muted-foreground">
                  {launch.name.includes('Starlink') || launch.name.includes('OneWeb') ? 'Low Earth Orbit (LEO)' :
                   launch.name.includes('GPS') || launch.name.includes('SES') ? 'Geostationary Orbit (GEO)' :
                   launch.name.includes('ISS') || launch.name.includes('Dragon') || launch.name.includes('Crew') ? 'Low Earth Orbit (LEO) - ISS' :
                   launch.name.includes('Moon') || launch.name.includes('Artemis') ? 'Trans-Lunar Injection' :
                   'Low Earth Orbit (LEO)'}
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Payload Details</h3>
                <p className="text-muted-foreground">
                  {launch.description}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LaunchDetail;
