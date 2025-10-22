import { Link } from 'react-router-dom';
import { rockets } from '../data/sampleData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Rockets = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Rockets</h1>
          <p className="text-xl text-muted-foreground">Explore the rockets that are shaping the future of space exploration</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rockets.map((rocket) => (
            <Link key={rocket.id} to={`/rockets/${rocket.id}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="aspect-[2/3] bg-muted overflow-hidden">
                  <img src={rocket.imageUrl} alt={rocket.name} className="w-full h-full object-cover" />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-2xl">{rocket.name}</CardTitle>
                    {rocket.active && <Badge>Active</Badge>}
                  </div>
                  <CardDescription className="text-base">{rocket.company}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 line-clamp-3">{rocket.description}</p>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Height</p>
                      <p className="font-semibold">{rocket.height}m</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Diameter</p>
                      <p className="font-semibold">{rocket.diameter}m</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Mass</p>
                      <p className="font-semibold">{(rocket.mass / 1000).toFixed(0)}t</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rockets;
