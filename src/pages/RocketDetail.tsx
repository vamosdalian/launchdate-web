import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { rockets } from '@/data/sampleData';

const RocketDetail = () => {
  const { id } = useParams<{ id: string }>();
  const rocket = rockets.find((r) => r.id === id);
  const [activeTab, setActiveTab] = useState('overview');

  if (!rocket) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-8 max-w-md text-center">
          <h1 className="text-2xl font-bold mb-4 text-white">Rocket Not Found</h1>
          <p className="text-gray-400 mb-6">The requested rocket does not exist.</p>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link to="/rockets">Back to Rockets</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Get rocket-specific data
  const getRocketData = () => {
    const commonData = {
      chineseName: '',
      manufacturer: rocket.company,
      firstFlight: '',
      status: rocket.active ? 'Active' : 'Retired',
      stages: 2,
      reusable: false,
      leoCapacity: '',
      gtoCapacity: '',
      engines: '',
      propellant: '',
      timeline: [] as { year: string; event: string; description: string }[],
    };

    switch (rocket.name) {
      case 'Falcon 9':
        return {
          ...commonData,
          chineseName: 'Falcon 9',
          firstFlight: 'June 2010',
          reusable: true,
          leoCapacity: '22,800 kg',
          gtoCapacity: '8,300 kg',
          engines: 'Stage 1: 9x Merlin 1D engines, Stage 2: 1x Merlin 1D Vacuum engine',
          propellant: 'RP-1 (Rocket Propellant-1) / Liquid Oxygen',
          timeline: [
            { year: '2010', event: 'First Orbital Flight', description: 'Successfully reached orbit on maiden flight' },
            { year: '2012', event: 'Commercial Cargo', description: 'First commercial cargo mission to ISS' },
            { year: '2015', event: 'First Successful Landing', description: 'First orbital-class rocket booster to land vertically' },
            { year: '2020', event: 'Crewed Spaceflight', description: 'First crewed launch sending astronauts to ISS' },
            { year: '2023', event: 'World\'s Busiest Rocket', description: 'Became the most frequently launched rocket globally' },
          ],
        };
      case 'Falcon Heavy':
        return {
          ...commonData,
          chineseName: 'Falcon Heavy',
          firstFlight: 'February 2018',
          reusable: true,
          leoCapacity: '63,800 kg',
          gtoCapacity: '26,700 kg',
          engines: 'Stage 1: 27x Merlin 1D engines, Stage 2: 1x Merlin 1D Vacuum engine',
          propellant: 'RP-1 (Rocket Propellant-1) / Liquid Oxygen',
          timeline: [
            { year: '2018', event: 'First Launch', description: 'Successfully launched with Tesla Roadster as payload' },
            { year: '2019', event: 'Commercial Launch', description: 'First commercial launch mission' },
            { year: '2023', event: 'Most Powerful Operational Rocket', description: 'Became the most powerful operational rocket' },
          ],
        };
      case 'Starship':
        return {
          ...commonData,
          chineseName: 'Starship',
          firstFlight: 'April 2023',
          reusable: true,
          leoCapacity: '100-150 tons (projected)',
          gtoCapacity: 'TBD',
          engines: 'Super Heavy Booster: 33x Raptor engines, Starship: 6x Raptor engines',
          propellant: 'Liquid Methane / Liquid Oxygen',
          timeline: [
            { year: '2018', event: 'Development Begins', description: 'Design and testing of fully reusable launch system begins' },
            { year: '2023', event: 'First Integrated Flight Test', description: 'First attempt to launch fully stacked vehicle' },
            { year: '2024', event: 'Continued Testing', description: 'Multiple flight tests with ongoing system improvements' },
          ],
        };
      case 'New Shepard':
        return {
          ...commonData,
          chineseName: 'New Shepard',
          firstFlight: 'April 2015',
          reusable: true,
          stages: 1,
          leoCapacity: 'Suborbital vehicle (not designed for LEO)',
          gtoCapacity: 'N/A',
          engines: 'Booster: 1x BE-3 engine, Capsule: 1x BE-3PM engine',
          propellant: 'Liquid Hydrogen / Liquid Oxygen',
          timeline: [
            { year: '2015', event: 'First Flight', description: 'First test flight of suborbital vehicle' },
            { year: '2021', event: 'First Crewed Flight', description: 'Jeff Bezos and crew become first passengers' },
            { year: '2022', event: 'Commercial Space Tourism', description: 'Ongoing commercial space tourism operations' },
          ],
        };
      default:
        return commonData;
    }
  };

  const rocketData = getRocketData();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f0f0f0]">
      {/* Hero Section - Two Column Layout */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: Rocket Image */}
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <img 
                src={rocket.imageUrl} 
                alt={rocket.name} 
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </div>
          </div>

          {/* Right: Rocket Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-5xl md:text-6xl font-black text-white mb-2">
                {rocket.name}
              </h1>
              <p className="text-2xl text-gray-400 mb-4">{rocket.company}</p>
              {rocket.active && (
                <Badge className="bg-green-600 text-white px-4 py-1 text-sm">✓ Active</Badge>
              )}
            </div>

            <p className="text-lg text-gray-300 leading-relaxed">
              {rocket.description}
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4">
                <p className="text-sm text-gray-400 mb-1">Height</p>
                <p className="text-3xl font-bold text-white">{rocket.height}m</p>
              </div>
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4">
                <p className="text-sm text-gray-400 mb-1">Diameter</p>
                <p className="text-3xl font-bold text-white">{rocket.diameter}m</p>
              </div>
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4">
                <p className="text-sm text-gray-400 mb-1">Mass</p>
                <p className="text-3xl font-bold text-white">{(rocket.mass / 1000).toFixed(0)}t</p>
              </div>
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4">
                <p className="text-sm text-gray-400 mb-1">First Flight</p>
                <p className="text-xl font-bold text-white">{rocketData.firstFlight || 'TBD'}</p>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link to="/launches">View Launch History</Link>
              </Button>
              <Button asChild variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                <Link to="/rockets">Back to List</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tabbed Technical Details */}
      <section className="container mx-auto px-4 py-12">
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex border-b border-[#2a2a2a] overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-4 font-semibold whitespace-nowrap transition-all ${
                activeTab === 'overview'
                  ? 'text-white border-b-2 border-blue-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('timeline')}
              className={`px-6 py-4 font-semibold whitespace-nowrap transition-all ${
                activeTab === 'timeline'
                  ? 'text-white border-b-2 border-blue-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Timeline
            </button>
            <button
              onClick={() => setActiveTab('engines')}
              className={`px-6 py-4 font-semibold whitespace-nowrap transition-all ${
                activeTab === 'engines'
                  ? 'text-white border-b-2 border-blue-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Engine Systems
            </button>
            <button
              onClick={() => setActiveTab('reusability')}
              className={`px-6 py-4 font-semibold whitespace-nowrap transition-all ${
                activeTab === 'reusability'
                  ? 'text-white border-b-2 border-blue-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Reusability
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Technical Specifications</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-400">Manufacturer</p>
                        <p className="text-lg text-white">{rocketData.manufacturer}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Status</p>
                        <p className="text-lg text-white">{rocketData.status}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Stages</p>
                        <p className="text-lg text-white">{rocketData.stages} stage{rocketData.stages > 1 ? 's' : ''}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Reusable</p>
                        <p className="text-lg text-white">{rocketData.reusable ? 'Yes' : 'No'}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-400">LEO Payload Capacity</p>
                        <p className="text-lg text-white">{rocketData.leoCapacity}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">GTO Payload Capacity</p>
                        <p className="text-lg text-white">{rocketData.gtoCapacity}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Propellant</p>
                        <p className="text-lg text-white">{rocketData.propellant}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Timeline Tab */}
            {activeTab === 'timeline' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-6">Development Timeline</h3>
                <div className="space-y-8">
                  {rocketData.timeline.map((item, index) => (
                    <div key={index} className="flex gap-6 items-start">
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 rounded-full bg-blue-600/20 border-4 border-blue-500 flex items-center justify-center">
                          <span className="text-lg font-bold text-white">{item.year}</span>
                        </div>
                      </div>
                      <div className="flex-1 pt-2">
                        <h4 className="text-xl font-bold text-white mb-2">{item.event}</h4>
                        <p className="text-gray-400">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Engines Tab */}
            {activeTab === 'engines' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-4">Engine Configuration</h3>
                <div className="space-y-4">
                  <div className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg p-6">
                    <p className="text-lg text-white mb-2">{rocketData.engines}</p>
                    <p className="text-gray-400">
                      {rocket.name === 'Falcon 9' && 
                        'The first stage features 9 Merlin 1D engines arranged in an octagonal grid pattern, providing powerful thrust. The second stage uses a single vacuum-optimized Merlin engine with a larger nozzle to deliver payloads to their final orbit.'}
                      {rocket.name === 'Falcon Heavy' && 
                        'Composed of three Falcon 9 first stages strapped together, totaling 27 Merlin 1D engines, making it the most powerful operational rocket.'}
                      {rocket.name === 'Starship' && 
                        'The Super Heavy booster uses 33 Raptor engines, while the Starship upper stage uses 6 Raptor engines (3 sea-level versions and 3 vacuum versions). The Raptor engine employs a full-flow staged combustion cycle, making it SpaceX\'s most advanced rocket engine.'}
                      {rocket.name === 'New Shepard' && 
                        'The BE-3 engine uses liquid hydrogen and liquid oxygen as propellants, an efficient and clean engine design suitable for reusable suborbital flight.'}
                    </p>
                  </div>
                  <div className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-white mb-2">Propellant System</h4>
                    <p className="text-gray-400">{rocketData.propellant}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Reusability Tab */}
            {activeTab === 'reusability' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-4">Reusability Technology</h3>
                {rocketData.reusable ? (
                  <div className="space-y-4">
                    <p className="text-gray-300">
                      {rocket.name.includes('Falcon') && 
                        'The most notable feature of the Falcon series rockets is that the first-stage booster can return to Earth in a controlled manner after launch. By using residual propellant, cold gas thrusters, and grid fins, the booster can precisely land on landing zones on land or autonomous drone ships at sea.'}
                      {rocket.name === 'Starship' && 
                        'Starship is the world\'s first fully reusable orbital-class rocket system. Both the Super Heavy booster and Starship upper stage are designed to return and land, enabling rapid turnaround and reuse.'}
                      {rocket.name === 'New Shepard' && 
                        'Both the New Shepard booster and capsule are designed to be reusable. The booster is recovered through vertical landing, while the capsule safely returns to Earth using parachutes.'}
                    </p>
                    <div className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg p-6">
                      <h4 className="text-lg font-semibold text-white mb-2">Recovery Record</h4>
                      <p className="text-gray-400">
                        {rocket.name === 'Falcon 9' && 
                          'SpaceX has successfully recovered and reflown boosters hundreds of times, with some boosters having flown more than 20 times, fundamentally changing the economics of space launch.'}
                        {rocket.name === 'Falcon Heavy' && 
                          'Falcon Heavy can recover all three of its first-stage boosters, with the two side boosters typically landing at ground landing zones and the center core landing on a drone ship at sea.'}
                        {rocket.name === 'Starship' && 
                          'Starship is in the development and testing phase, with the goal of achieving fully rapid reusability, ultimately aiming to relaunch within hours of a previous flight.'}
                        {rocket.name === 'New Shepard' && 
                          'New Shepard has successfully recovered and reused both boosters and capsules multiple times, demonstrating the reusability capabilities of suborbital vehicles.'}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-400">This rocket does not have reusability capabilities.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default RocketDetail;
