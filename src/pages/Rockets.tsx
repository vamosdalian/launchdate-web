import { Link } from 'react-router-dom';
import { rockets } from '../data/sampleData';
import { Badge } from '@/components/ui/badge';

const Rockets = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Page Hero */}
      <section className="py-16 md:py-24 text-center bg-[#111]">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">Rockets</h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-400">
            Explore the rockets that are shaping the future of space exploration
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rockets.map((rocket) => (
              <Link key={rocket.id} to={`/rockets/${rocket.id}`}>
                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg overflow-hidden hover:border-[#4a4a4a] hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full">
                  <div className="aspect-[2/3] bg-[#0a0a0a]">
                    <img src={rocket.imageUrl} alt={rocket.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-2xl font-bold">{rocket.name}</h3>
                      {rocket.active && <Badge className="bg-blue-600">Active</Badge>}
                    </div>
                    <p className="text-gray-400 text-base mb-4">{rocket.company}</p>
                    <p className="text-gray-300 mb-4 line-clamp-3">{rocket.description}</p>
                    <div className="grid grid-cols-3 gap-2 text-sm pt-4 border-t border-[#2a2a2a]">
                      <div>
                        <p className="text-gray-400">Height</p>
                        <p className="font-semibold">{rocket.height}m</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Diameter</p>
                        <p className="font-semibold">{rocket.diameter}m</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Mass</p>
                        <p className="font-semibold">{(rocket.mass / 1000).toFixed(0)}t</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Rockets;
