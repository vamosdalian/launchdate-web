import { launchBases } from '../data/sampleData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const LaunchBases = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Launch Sites</h1>
          <p className="text-xl text-muted-foreground">Explore the facilities where rockets are launched into space</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {launchBases.map((base) => (
            <Card key={base.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-muted">
                <img src={base.imageUrl} alt={base.name} className="w-full h-full object-cover" />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">{base.name}</CardTitle>
                <CardDescription className="text-base flex items-center gap-2">
                  <span>📍</span>
                  <span>{base.location}, {base.country}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{base.description}</p>
                <div className="flex gap-4">
                  <Badge variant="outline">
                    Lat: {base.latitude.toFixed(4)}°
                  </Badge>
                  <Badge variant="outline">
                    Long: {base.longitude.toFixed(4)}°
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LaunchBases;
