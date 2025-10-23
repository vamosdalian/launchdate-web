import { Link } from 'react-router-dom';
import { launches } from '../data/sampleData';
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

  // Sort launches by date (newest first)
  const sortedLaunches = [...launches].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Page Hero */}
      <section className="py-16 md:py-24 text-center bg-[#111]">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">Launch Schedule</h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-400">
            Stay updated with upcoming and past rocket launches
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="relative ml-3">
              {/* Timeline line */}
              <div className="absolute left-0 top-4 bottom-0 border-l-2 border-border" />

              {sortedLaunches.map((launch) => (
                <div key={launch.id} className="relative pl-8 pb-12 last:pb-0">
                  {/* Timeline dot */}
                  <div className="absolute h-3 w-3 -translate-x-1/2 left-px top-3 rounded-full border-2 border-primary bg-background ring-8 ring-background" />

                  {/* Content */}
                  <Link to={`/launches/${launch.id}`}>
                    <div className="space-y-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 hover:border-[#4a4a4a] hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-1">{launch.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>🗓️</span>
                            <span>{formatDate(launch.date)}</span>
                          </div>
                        </div>
                        {getStatusBadge(launch.status)}
                      </div>
                      
                      <p className="text-sm sm:text-base text-muted-foreground text-pretty">
                        {launch.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="rounded-full">
                          🚀 {launch.rocket}
                        </Badge>
                        <Badge variant="secondary" className="rounded-full">
                          📍 {launch.launchBase}
                        </Badge>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Launches;
