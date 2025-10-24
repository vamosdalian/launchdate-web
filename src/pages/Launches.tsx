import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { useCallback, useMemo } from 'react';
import { useApi } from '../hooks/useApi';
import { fetchRocketLaunches } from '../services/launchesService';

// Get the best date field to display
const getLaunchDate = (launch: { t0?: string; window_open?: string; win_open?: string; date?: string; created_at?: string }) => {
  return launch.t0 || launch.window_open || launch.win_open || launch.date || launch.created_at || '';
};

const Launches = () => {
  const fetchLaunchesCallback = useCallback(() => fetchRocketLaunches(), []);
  const { data: launches, loading, error } = useApi(fetchLaunchesCallback);
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
  const sortedLaunches = useMemo(() => {
    if (!launches) return [];
    return [...launches].sort((a, b) => {
      const dateA = getLaunchDate(a);
      const dateB = getLaunchDate(b);
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    });
  }, [launches]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading launches...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg mb-4">Error loading launches: {error.message}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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
                            <span>{launch.date_str || formatDate(getLaunchDate(launch))}</span>
                          </div>
                        </div>
                        {getStatusBadge(launch.status)}
                      </div>
                      
                      {launch.quicktext && (
                        <p className="text-sm sm:text-base text-muted-foreground text-pretty">
                          {launch.quicktext}
                        </p>
                      )}
                      {!launch.quicktext && (launch.launch_description || launch.mission_description || launch.description) && (
                        <p className="text-sm sm:text-base text-muted-foreground text-pretty">
                          {launch.launch_description || launch.mission_description || launch.description}
                        </p>
                      )}
                      
                      <div className="flex flex-wrap gap-2">
                        {(launch.vehicle?.name || launch.rocket) && (
                          <Badge variant="secondary" className="rounded-full">
                            🚀 {launch.vehicle?.name || launch.rocket}
                          </Badge>
                        )}
                        {(launch.pad?.name || launch.launchBase) && (
                          <Badge variant="secondary" className="rounded-full">
                            📍 {launch.pad?.name || launch.launchBase}
                          </Badge>
                        )}
                        {launch.provider?.name && (
                          <Badge variant="secondary" className="rounded-full">
                            🏢 {launch.provider.name}
                          </Badge>
                        )}
                        {launch.tags && launch.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag.id} variant="outline" className="rounded-full">
                            {tag.text}
                          </Badge>
                        ))}
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
