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

  const formatMonthYear = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return `${year}年${month}月`;
  };

  const getMonthYearKey = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
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

  // Group launches by month/year
  const groupedLaunches = sortedLaunches.reduce((acc, launch) => {
    const key = getMonthYearKey(launch.date);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(launch);
    return acc;
  }, {} as Record<string, typeof launches>);

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
          <div className="max-w-4xl mx-auto">
            {Object.entries(groupedLaunches).map(([monthKey, monthLaunches], groupIndex) => (
              <div key={monthKey} className="relative">
                {/* Month/Year Header with Timeline */}
                <div className="flex items-center mb-8">
                  <div className="relative flex items-center">
                    {/* Timeline dot */}
                    <div className="w-4 h-4 rounded-full bg-blue-500 border-4 border-[#111] z-10"></div>
                    {/* Timeline vertical line */}
                    {groupIndex < Object.keys(groupedLaunches).length - 1 && (
                      <div className="absolute top-4 left-2 w-0.5 h-full bg-gray-700" style={{ height: 'calc(100% + 2rem)' }}></div>
                    )}
                  </div>
                  <h2 className="text-2xl font-bold ml-6 text-gray-100">
                    {formatMonthYear(monthLaunches[0].date)}
                  </h2>
                </div>

                {/* Launches for this month */}
                <div className="space-y-4 ml-10 pb-8">
                  {monthLaunches.map((launch) => (
                    <div key={launch.id} className="relative">
                      {/* Connecting line from timeline to card */}
                      <div className="absolute left-[-2.5rem] top-8 w-6 h-0.5 bg-gray-700"></div>
                      <div className="absolute left-[-2.5rem] top-[1.9rem] w-2 h-2 rounded-full bg-gray-600 border-2 border-[#111]"></div>
                      
                      <Link to={`/launches/${launch.id}`}>
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
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Launches;
