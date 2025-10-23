import { Link } from 'react-router-dom';
import { companies } from '../data/sampleData';
import { Badge } from '@/components/ui/badge';

const Companies = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Page Hero */}
      <section className="py-16 md:py-24 text-center bg-[#111]">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">Space Companies</h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-400">
            Meet the organizations leading the charge in space exploration
          </p>
        </div>
      </section>

      {/* Companies Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((company) => (
              <Link key={company.id} to={`/companies/${company.id}`}>
                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg overflow-hidden hover:border-[#4a4a4a] hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full flex flex-col">
                  <div className="aspect-video bg-[#0a0a0a]">
                    <img 
                      src={company.imageUrl} 
                      alt={company.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold mb-2">{company.name}</h3>
                    <p className="text-sm text-gray-400 mb-4">
                      Founded {company.founded} by {company.founder}
                    </p>
                    <p className="text-gray-300 mb-4 flex-grow">{company.description}</p>
                    
                    <div className="border-t border-[#2a2a2a] pt-4 mt-auto">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-400 mb-1">Headquarters</p>
                          <p className="text-sm font-semibold">{company.headquarters}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 mb-1">Employees</p>
                          <p className="text-sm font-semibold">{company.employees.toLocaleString()}</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="w-full justify-center py-2 bg-[#2a2a2a] hover:bg-[#3a3a3a]">
                        View Details →
                      </Badge>
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

export default Companies;
