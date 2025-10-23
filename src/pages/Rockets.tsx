import { Link } from 'react-router-dom';
import { rockets } from '../data/sampleData';
import { useState } from 'react';

const Rockets = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'retired'>('all');

  const filteredRockets = rockets.filter((rocket) => {
    const matchesSearch = rocket.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = 
      activeFilter === 'all' || 
      (activeFilter === 'active' && rocket.active) || 
      (activeFilter === 'retired' && !rocket.active);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Page Hero */}
      <section className="py-16 md:py-24 text-center bg-[#111]">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">Rockets</h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-400">
            Explore the rockets that are shaping the future of space exploration
          </p>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 sticky top-20 bg-black/80 backdrop-blur-md z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search rockets, e.g. 'Falcon 9'..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#2a2a2a] border border-[#4a4a4a] rounded-lg py-3 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
                  activeFilter === 'all'
                    ? 'bg-blue-600 border border-blue-600 text-white'
                    : 'bg-[#2a2a2a] border border-[#4a4a4a] text-gray-300 hover:bg-[#3a3a3a] hover:border-[#6a6a6a]'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveFilter('active')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
                  activeFilter === 'active'
                    ? 'bg-blue-600 border border-blue-600 text-white'
                    : 'bg-[#2a2a2a] border border-[#4a4a4a] text-gray-300 hover:bg-[#3a3a3a] hover:border-[#6a6a6a]'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setActiveFilter('retired')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
                  activeFilter === 'retired'
                    ? 'bg-blue-600 border border-blue-600 text-white'
                    : 'bg-[#2a2a2a] border border-[#4a4a4a] text-gray-300 hover:bg-[#3a3a3a] hover:border-[#6a6a6a]'
                }`}
              >
                Retired
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRockets.map((rocket) => (
              <div
                key={rocket.id}
                className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg overflow-hidden hover:border-[#4a4a4a] hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="aspect-[2/3] bg-[#0a0a0a] relative">
                  <img src={rocket.imageUrl} alt={rocket.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold mb-3">{rocket.name}</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {rocket.active ? (
                      <span className="text-xs font-semibold bg-green-500/20 text-green-300 px-2 py-1 rounded-full">
                        Active
                      </span>
                    ) : (
                      <span className="text-xs font-semibold bg-red-500/20 text-red-300 px-2 py-1 rounded-full">
                        Retired
                      </span>
                    )}
                    <span className="text-xs font-semibold bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">
                      {rocket.company}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-4 flex-grow">{rocket.description}</p>
                  <Link
                    to={`/rockets/${rocket.id}`}
                    className="mt-auto text-blue-400 hover:text-blue-300 font-semibold w-full text-center bg-gray-700/50 hover:bg-gray-700/80 py-2 rounded-lg transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
          {filteredRockets.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No rockets found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Rockets;
