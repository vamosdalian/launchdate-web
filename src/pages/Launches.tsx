import { Link } from 'react-router-dom';
import { launches } from '../data/sampleData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Badge>🕒 Scheduled</Badge>;
      case 'successful':
        return <Badge className="bg-green-600">✅ Successful</Badge>;
      case 'failed':
        return <Badge variant="destructive">❌ Failed</Badge>;
      case 'cancelled':
        return <Badge variant="secondary">🚫 Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Sort launches by date
  const sortedLaunches = [...launches].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Launch Schedule</h1>
          <p className="text-xl text-muted-foreground">Stay updated with upcoming and past rocket launches</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="space-y-4 max-w-4xl mx-auto">
          {sortedLaunches.map((launch) => (
            <Link key={launch.id} to={`/launches/${launch.id}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-2">{launch.name}</CardTitle>
                      <CardDescription className="text-base">
                        {formatDate(launch.date)}
                      </CardDescription>
                    </div>
                    {getStatusBadge(launch.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-6 mb-3 text-sm flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">🚀 Rocket:</span>
                      <span className="font-medium">{launch.rocket}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">📍 Site:</span>
                      <span className="font-medium">{launch.launchBase}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{launch.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Launches;
