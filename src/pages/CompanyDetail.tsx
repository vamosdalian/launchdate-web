import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { companies, rockets, launches } from '@/data/sampleData';

const CompanyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const company = companies.find((c) => c.id === id);

  if (!company) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-8 max-w-md text-center">
          <h1 className="text-2xl font-bold mb-4">Company Not Found</h1>
          <p className="text-gray-400 mb-6">The requested company does not exist.</p>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link to="/companies">Back to Companies</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Get company's rockets and launches
  const companyRockets = rockets.filter(r => r.company === company.name);
  const companyLaunches = launches.filter(l => 
    companyRockets.some(r => r.name === l.rocket)
  ).slice(0, 6);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-[#111]">
        <div className="container mx-auto px-4">
          <Button asChild variant="ghost" className="mb-8 text-gray-300 hover:text-white">
            <Link to="/companies">← Back to Companies</Link>
          </Button>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Company Logo/Image */}
            <div className="flex justify-center">
              <div className="w-full max-w-md aspect-video bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg overflow-hidden">
                <img 
                  src={company.imageUrl} 
                  alt={company.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Company Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl md:text-6xl font-extrabold mb-4">{company.name}</h1>
                <p className="text-xl text-gray-400 mb-4">
                  Founded {company.founded} by {company.founder}
                </p>
              </div>

              <p className="text-lg text-gray-300 leading-relaxed">
                {company.description}
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-1">Headquarters</p>
                  <p className="text-xl font-bold">{company.headquarters}</p>
                </div>
                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-1">Employees</p>
                  <p className="text-xl font-bold">{company.employees.toLocaleString()}</p>
                </div>
                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-1">Founded</p>
                  <p className="text-xl font-bold">{company.founded}</p>
                </div>
                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-1">Active Rockets</p>
                  <p className="text-xl font-bold">{companyRockets.filter(r => r.active).length}</p>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                  <a href={company.website} target="_blank" rel="noopener noreferrer">
                    Visit Website →
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Rockets */}
      {companyRockets.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Rockets</h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {companyRockets.map((rocket) => (
                <Link key={rocket.id} to={`/rockets/${rocket.id}`}>
                  <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg overflow-hidden hover:border-[#4a4a4a] hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full">
                    <div className="aspect-[2/3] bg-[#0a0a0a]">
                      <img
                        src={rocket.imageUrl}
                        alt={rocket.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold mb-2">{rocket.name}</h3>
                      <div className="flex gap-2 text-xs mb-2">
                        <Badge variant="secondary" className="bg-[#2a2a2a]">Height: {rocket.height}m</Badge>
                      </div>
                      {rocket.active && <Badge className="bg-green-600">Active</Badge>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent Launches */}
      {companyLaunches.length > 0 && (
        <section className="py-20 bg-[#111]">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Recent Launches</h2>
              <Button asChild variant="outline">
                <Link to="/launches">View All</Link>
              </Button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companyLaunches.map((launch) => {
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

                const getStatusBadge = (status: string) => {
                  switch (status) {
                    case 'scheduled':
                      return <Badge>Scheduled</Badge>;
                    case 'successful':
                      return <Badge className="bg-green-600">✅ Success</Badge>;
                    case 'failed':
                      return <Badge className="bg-red-600">❌ Failed</Badge>;
                    default:
                      return <Badge variant="outline">{status}</Badge>;
                  }
                };

                return (
                  <Link key={launch.id} to={`/launches/${launch.id}`}>
                    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 hover:border-[#4a4a4a] hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold">{launch.name}</h3>
                        {getStatusBadge(launch.status)}
                      </div>
                      <div className="space-y-2 text-sm text-gray-400 mb-4">
                        <p>🚀 {launch.rocket}</p>
                        <p>📍 {launch.launchBase}</p>
                        <p>📅 {formatDate(launch.date)} UTC</p>
                      </div>
                      <p className="text-gray-300 line-clamp-2">{launch.description}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default CompanyDetail;
