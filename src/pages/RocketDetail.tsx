import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { rockets, launches } from '@/data/sampleData';

const RocketDetail = () => {
  const { id } = useParams<{ id: string }>();
  const rocket = rockets.find((r) => r.id === id);

  if (!rocket) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card>
          <CardHeader>
            <CardTitle>Rocket Not Found</CardTitle>
            <CardDescription>The requested rocket could not be found.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link to="/rockets">Back to Rockets</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Find launches using this rocket
  const rocketLaunches = launches.filter((l) => l.rocket === rocket.name);
  const upcomingLaunches = rocketLaunches.filter((l) => l.status === 'scheduled');
  const pastLaunches = rocketLaunches.filter((l) => l.status !== 'scheduled');

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="border-b bg-card py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Button asChild variant="ghost" className="mb-4">
              <Link to="/rockets">← Back to Rockets</Link>
            </Button>
            <div className="flex gap-8">
              <div className="w-48 h-72 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                <img src={rocket.imageUrl} alt={rocket.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex gap-3 mb-2">
                  <h1 className="text-4xl font-bold">{rocket.name}</h1>
                  {rocket.active && <Badge className="self-start">Active</Badge>}
                </div>
                <p className="text-xl text-muted-foreground mb-4">{rocket.company}</p>
                <p className="text-lg mb-6">{rocket.description}</p>
                <div className="flex gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Height</p>
                    <p className="text-2xl font-bold">{rocket.height}m</p>
                  </div>
                  <Separator orientation="vertical" className="h-12" />
                  <div>
                    <p className="text-sm text-muted-foreground">Diameter</p>
                    <p className="text-2xl font-bold">{rocket.diameter}m</p>
                  </div>
                  <Separator orientation="vertical" className="h-12" />
                  <div>
                    <p className="text-sm text-muted-foreground">Mass</p>
                    <p className="text-2xl font-bold">{(rocket.mass / 1000).toFixed(0)}t</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Technical Specifications */}
          <Card>
            <CardHeader>
              <CardTitle>Technical Specifications</CardTitle>
              <CardDescription>Detailed technical information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground mb-1">Height</h3>
                    <p className="text-lg">{rocket.height} meters ({(rocket.height * 3.28084).toFixed(1)} feet)</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground mb-1">Diameter</h3>
                    <p className="text-lg">{rocket.diameter} meters ({(rocket.diameter * 3.28084).toFixed(1)} feet)</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground mb-1">Mass</h3>
                    <p className="text-lg">{rocket.mass.toLocaleString()} kg ({(rocket.mass / 1000).toFixed(0)} metric tons)</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground mb-1">Status</h3>
                    <p className="text-lg">{rocket.active ? 'Active' : 'Inactive'}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground mb-1">Manufacturer</h3>
                    <p className="text-lg">{rocket.company}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground mb-1">Stages</h3>
                    <p className="text-lg">
                      {rocket.name === 'Starship' ? 'Two (Super Heavy + Starship)' :
                       rocket.name.includes('Falcon') ? 'Two' :
                       rocket.name.includes('New Shepard') ? 'Single Stage (suborbital)' :
                       'Two'}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground mb-1">Reusability</h3>
                    <p className="text-lg">
                      {rocket.name.includes('Falcon') || rocket.name.includes('Starship') || rocket.name.includes('New Shepard') 
                        ? 'Fully/Partially Reusable' 
                        : 'Expendable'}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground mb-1">First Flight</h3>
                    <p className="text-lg">
                      {rocket.name === 'Falcon 9' ? '2010' :
                       rocket.name === 'Falcon Heavy' ? '2018' :
                       rocket.name === 'Starship' ? '2023' :
                       rocket.name === 'New Shepard' ? '2015' :
                       'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Capabilities</CardTitle>
              <CardDescription>Payload capacity and orbital capabilities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-1">Payload to Low Earth Orbit (LEO)</h3>
                  <p className="text-muted-foreground">
                    {rocket.name === 'Falcon 9' ? '22,800 kg (50,265 lb)' :
                     rocket.name === 'Falcon Heavy' ? '63,800 kg (140,660 lb)' :
                     rocket.name === 'Starship' ? '100-150 metric tons (estimated)' :
                     rocket.name === 'New Shepard' ? 'Suborbital vehicle (not designed for LEO)' :
                     'N/A'}
                  </p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-1">Payload to Geostationary Transfer Orbit (GTO)</h3>
                  <p className="text-muted-foreground">
                    {rocket.name === 'Falcon 9' ? '8,300 kg (18,300 lb)' :
                     rocket.name === 'Falcon Heavy' ? '26,700 kg (58,860 lb)' :
                     rocket.name === 'Starship' ? 'TBD' :
                     rocket.name === 'New Shepard' ? 'N/A (suborbital)' :
                     'N/A'}
                  </p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-1">Engines</h3>
                  <p className="text-muted-foreground">
                    {rocket.name === 'Falcon 9' ? '9 × Merlin 1D (first stage), 1 × Merlin Vacuum (second stage)' :
                     rocket.name === 'Falcon Heavy' ? '27 × Merlin 1D (first stage), 1 × Merlin Vacuum (second stage)' :
                     rocket.name === 'Starship' ? '33 × Raptor (Super Heavy), 6 × Raptor (Starship)' :
                     rocket.name === 'New Shepard' ? '1 × BE-3 (booster), 1 × BE-3PM (capsule)' :
                     'N/A'}
                  </p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-1">Propellant</h3>
                  <p className="text-muted-foreground">
                    {rocket.name.includes('Falcon') ? 'RP-1 (Rocket Propellant-1) / Liquid Oxygen' :
                     rocket.name === 'Starship' ? 'Liquid Methane / Liquid Oxygen' :
                     rocket.name === 'New Shepard' ? 'Liquid Hydrogen / Liquid Oxygen' :
                     'N/A'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* History & Achievements */}
          <Card>
            <CardHeader>
              <CardTitle>History & Achievements</CardTitle>
              <CardDescription>Notable milestones and accomplishments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {rocket.name === 'Falcon 9' && (
                  <>
                    <div className="flex gap-4">
                      <div className="w-2 bg-primary rounded-full"></div>
                      <div className="flex-1">
                        <p className="font-semibold">First Orbital Flight - June 2010</p>
                        <p className="text-sm text-muted-foreground">Successfully reached orbit on its maiden flight</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-2 bg-primary rounded-full"></div>
                      <div className="flex-1">
                        <p className="font-semibold">First Successful Landing - December 2015</p>
                        <p className="text-sm text-muted-foreground">First orbital-class rocket booster to land vertically</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-2 bg-primary rounded-full"></div>
                      <div className="flex-1">
                        <p className="font-semibold">Most Launched Rocket - 2023</p>
                        <p className="text-sm text-muted-foreground">Became the most frequently launched rocket in the world</p>
                      </div>
                    </div>
                  </>
                )}
                {rocket.name === 'Falcon Heavy' && (
                  <>
                    <div className="flex gap-4">
                      <div className="w-2 bg-primary rounded-full"></div>
                      <div className="flex-1">
                        <p className="font-semibold">Maiden Flight - February 2018</p>
                        <p className="text-sm text-muted-foreground">Successfully launched with Tesla Roadster payload</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-2 bg-primary rounded-full"></div>
                      <div className="flex-1">
                        <p className="font-semibold">Most Powerful Operational Rocket</p>
                        <p className="text-sm text-muted-foreground">Highest payload capacity of any operational rocket</p>
                      </div>
                    </div>
                  </>
                )}
                {rocket.name === 'Starship' && (
                  <>
                    <div className="flex gap-4">
                      <div className="w-2 bg-primary rounded-full"></div>
                      <div className="flex-1">
                        <p className="font-semibold">Development Started - 2018</p>
                        <p className="text-sm text-muted-foreground">Design and testing of the fully reusable launch system began</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-2 bg-primary rounded-full"></div>
                      <div className="flex-1">
                        <p className="font-semibold">First Integrated Flight Test - April 2023</p>
                        <p className="text-sm text-muted-foreground">First attempt to launch the fully stacked vehicle</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-2 bg-primary rounded-full"></div>
                      <div className="flex-1">
                        <p className="font-semibold">Most Powerful Rocket Ever Built</p>
                        <p className="text-sm text-muted-foreground">Designed to be the most powerful launch vehicle in history</p>
                      </div>
                    </div>
                  </>
                )}
                {rocket.name === 'New Shepard' && (
                  <>
                    <div className="flex gap-4">
                      <div className="w-2 bg-primary rounded-full"></div>
                      <div className="flex-1">
                        <p className="font-semibold">First Flight - April 2015</p>
                        <p className="text-sm text-muted-foreground">Inaugural test flight of the suborbital vehicle</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-2 bg-primary rounded-full"></div>
                      <div className="flex-1">
                        <p className="font-semibold">First Crewed Flight - July 2021</p>
                        <p className="text-sm text-muted-foreground">Jeff Bezos and crew became first passengers</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Launch History */}
          {rocketLaunches.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Launch History</CardTitle>
                    <CardDescription>Missions using this rocket</CardDescription>
                  </div>
                  <Badge variant="secondary">{rocketLaunches.length} Total Launches</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingLaunches.length > 0 && (
                    <>
                      <h3 className="font-semibold">Upcoming Launches</h3>
                      {upcomingLaunches.map((launch) => (
                        <Link key={launch.id} to={`/launches/${launch.id}`}>
                          <Card className="hover:shadow-md transition-shadow">
                            <CardContent className="pt-6">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-semibold">{launch.name}</p>
                                  <p className="text-sm text-muted-foreground">{new Date(launch.date).toLocaleDateString()}</p>
                                </div>
                                <Badge>Scheduled</Badge>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </>
                  )}
                  {pastLaunches.length > 0 && (
                    <>
                      <Separator />
                      <h3 className="font-semibold">Past Launches</h3>
                      {pastLaunches.slice(0, 5).map((launch) => (
                        <Link key={launch.id} to={`/launches/${launch.id}`}>
                          <Card className="hover:shadow-md transition-shadow">
                            <CardContent className="pt-6">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-semibold">{launch.name}</p>
                                  <p className="text-sm text-muted-foreground">{new Date(launch.date).toLocaleDateString()}</p>
                                </div>
                                <Badge variant={launch.status === 'successful' ? 'default' : 'destructive'}>
                                  {launch.status}
                                </Badge>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Additional Resources */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button asChild variant="outline" className="w-full justify-start">
                <a href={`https://www.${rocket.company.toLowerCase().replace(' ', '')}.com`} target="_blank" rel="noopener noreferrer">
                  Visit {rocket.company} Website →
                </a>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link to="/launches">
                  View All Launches →
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link to="/rockets">
                  Compare Other Rockets →
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RocketDetail;
