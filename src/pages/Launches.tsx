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

  // Sort launches by date
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
          <div className="space-y-4 max-w-4xl mx-auto">
            {sortedLaunches.map((launch) => (
              <Link key={launch.id} to={`/launches/${launch.id}`}>
                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 hover:border-[#4a4a4a] hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">{launch.name}</h3>
                      <p className="text-base text-gray-400">
                        {formatDate(launch.date)}
                      </p>
                    </div>
                    {getStatusBadge(launch.status)}
                  </div>
                  <div className="flex gap-6 mb-3 text-sm flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">🚀 Rocket:</span>
                      <span className="font-medium">{launch.rocket}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">📍 Site:</span>
                      <span className="font-medium">{launch.launchBase}</span>
                    </div>
                  </div>
                  <p className="text-gray-300">{launch.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Launches;
