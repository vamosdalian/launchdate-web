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
          <h1 className="text-2xl font-bold mb-4 text-white">火箭信息未找到</h1>
          <p className="text-gray-400 mb-6">请求的火箭不存在。</p>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link to="/rockets">返回火箭列表</Link>
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
      status: rocket.active ? '现役' : '退役',
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
          chineseName: '猎鹰9号',
          firstFlight: '2010年6月',
          reusable: true,
          leoCapacity: '22,800 kg',
          gtoCapacity: '8,300 kg',
          engines: '第一级: 9台梅林1D引擎, 第二级: 1台真空梅林1D引擎',
          propellant: 'RP-1 (火箭推进剂-1) / 液氧',
          timeline: [
            { year: '2010', event: '首次轨道飞行', description: '首次发射即成功进入轨道' },
            { year: '2012', event: '商业货运', description: '首次商业货运任务前往国际空间站' },
            { year: '2015', event: '首次成功着陆', description: '成为首个垂直着陆的轨道级火箭助推器' },
            { year: '2020', event: '载人航天', description: '首次载人发射，送宇航员前往国际空间站' },
            { year: '2023', event: '世界最繁忙火箭', description: '成为全球发射频率最高的火箭' },
          ],
        };
      case 'Falcon Heavy':
        return {
          ...commonData,
          chineseName: '猎鹰重型',
          firstFlight: '2018年2月',
          reusable: true,
          leoCapacity: '63,800 kg',
          gtoCapacity: '26,700 kg',
          engines: '第一级: 27台梅林1D引擎, 第二级: 1台真空梅林1D引擎',
          propellant: 'RP-1 (火箭推进剂-1) / 液氧',
          timeline: [
            { year: '2018', event: '首次发射', description: '成功发射并搭载特斯拉跑车作为载荷' },
            { year: '2019', event: '商业发射', description: '首次商业发射任务' },
            { year: '2023', event: '现役最强火箭', description: '成为现役运载能力最强的火箭' },
          ],
        };
      case 'Starship':
        return {
          ...commonData,
          chineseName: '星舰',
          firstFlight: '2023年4月',
          reusable: true,
          leoCapacity: '100-150 吨 (预计)',
          gtoCapacity: '待定',
          engines: '超重型助推器: 33台猛禽引擎, 星舰: 6台猛禽引擎',
          propellant: '液态甲烷 / 液氧',
          timeline: [
            { year: '2018', event: '开始研发', description: '全可重复使用发射系统设计与测试开始' },
            { year: '2023', event: '首次集成飞行测试', description: '首次尝试发射完整组装的飞行器' },
            { year: '2024', event: '持续测试', description: '多次飞行测试，不断改进系统' },
          ],
        };
      case 'New Shepard':
        return {
          ...commonData,
          chineseName: '新谢泼德',
          firstFlight: '2015年4月',
          reusable: true,
          stages: 1,
          leoCapacity: '亚轨道飞行器 (非低地球轨道设计)',
          gtoCapacity: '不适用',
          engines: '助推器: 1台BE-3引擎, 太空舱: 1台BE-3PM引擎',
          propellant: '液氢 / 液氧',
          timeline: [
            { year: '2015', event: '首次飞行', description: '亚轨道飞行器首次测试飞行' },
            { year: '2021', event: '首次载人飞行', description: 'Jeff Bezos及团队成为首批乘客' },
            { year: '2022', event: '商业太空旅游', description: '持续开展商业太空旅游业务' },
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
                {rocketData.chineseName || rocket.name}
              </h1>
              <p className="text-2xl text-gray-400 mb-4">{rocket.name}</p>
              {rocket.active && (
                <Badge className="bg-green-600 text-white px-4 py-1 text-sm">✓ 现役</Badge>
              )}
            </div>

            <p className="text-lg text-gray-300 leading-relaxed">
              {rocket.description}
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4">
                <p className="text-sm text-gray-400 mb-1">高度</p>
                <p className="text-3xl font-bold text-white">{rocket.height}m</p>
              </div>
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4">
                <p className="text-sm text-gray-400 mb-1">直径</p>
                <p className="text-3xl font-bold text-white">{rocket.diameter}m</p>
              </div>
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4">
                <p className="text-sm text-gray-400 mb-1">质量</p>
                <p className="text-3xl font-bold text-white">{(rocket.mass / 1000).toFixed(0)}t</p>
              </div>
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4">
                <p className="text-sm text-gray-400 mb-1">首飞</p>
                <p className="text-xl font-bold text-white">{rocketData.firstFlight || '待定'}</p>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link to="/launches">查看发射记录</Link>
              </Button>
              <Button asChild variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                <Link to="/rockets">返回列表</Link>
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
              概述
            </button>
            <button
              onClick={() => setActiveTab('timeline')}
              className={`px-6 py-4 font-semibold whitespace-nowrap transition-all ${
                activeTab === 'timeline'
                  ? 'text-white border-b-2 border-blue-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              发展历程
            </button>
            <button
              onClick={() => setActiveTab('engines')}
              className={`px-6 py-4 font-semibold whitespace-nowrap transition-all ${
                activeTab === 'engines'
                  ? 'text-white border-b-2 border-blue-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              引擎系统
            </button>
            <button
              onClick={() => setActiveTab('reusability')}
              className={`px-6 py-4 font-semibold whitespace-nowrap transition-all ${
                activeTab === 'reusability'
                  ? 'text-white border-b-2 border-blue-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              可重复性
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">技术规格</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-400">制造商</p>
                        <p className="text-lg text-white">{rocketData.manufacturer}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">状态</p>
                        <p className="text-lg text-white">{rocketData.status}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">级数</p>
                        <p className="text-lg text-white">{rocketData.stages}级</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">可重复使用</p>
                        <p className="text-lg text-white">{rocketData.reusable ? '是' : '否'}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-400">近地轨道运载能力 (LEO)</p>
                        <p className="text-lg text-white">{rocketData.leoCapacity}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">地球同步转移轨道 (GTO)</p>
                        <p className="text-lg text-white">{rocketData.gtoCapacity}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">推进剂</p>
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
                <h3 className="text-2xl font-bold text-white mb-6">发展历程</h3>
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
                <h3 className="text-2xl font-bold text-white mb-4">引擎配置</h3>
                <div className="space-y-4">
                  <div className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg p-6">
                    <p className="text-lg text-white mb-2">{rocketData.engines}</p>
                    <p className="text-gray-400">
                      {rocket.name === 'Falcon 9' && 
                        '第一级的9台梅林1D引擎以八边形网格排列，提供强大的推力。第二级使用一台真空优化的梅林引擎，配备更大的喷管，负责将载荷送入最终轨道。'}
                      {rocket.name === 'Falcon Heavy' && 
                        '由三个猎鹰9号第一级捆绑而成，总共27台梅林1D引擎，使其成为现役运力最强的火箭。'}
                      {rocket.name === 'Starship' && 
                        '超重型助推器使用33台猛禽引擎，星舰上级使用6台猛禽引擎（3台海平面版本，3台真空版本）。猛禽引擎采用全流量分级燃烧循环，是SpaceX最先进的火箭引擎。'}
                      {rocket.name === 'New Shepard' && 
                        'BE-3引擎使用液氢和液氧作为推进剂，是一种高效清洁的引擎设计，适合可重复使用的亚轨道飞行。'}
                    </p>
                  </div>
                  <div className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-white mb-2">推进剂系统</h4>
                    <p className="text-gray-400">{rocketData.propellant}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Reusability Tab */}
            {activeTab === 'reusability' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-4">可重复使用技术</h3>
                {rocketData.reusable ? (
                  <div className="space-y-4">
                    <p className="text-gray-300">
                      {rocket.name.includes('Falcon') && 
                        '猎鹰系列火箭最显著的特点是其第一级助推器能够在发射后受控返回地球。通过使用剩余的推进剂、冷气体推进器和格栅舵，助推器可以精确地降落在陆地上的着陆区或在海上的自主无人驾驶驳船上。'}
                      {rocket.name === 'Starship' && 
                        '星舰是世界上第一个设计为完全可重复使用的轨道级火箭系统。超重型助推器和星舰上级都设计为可以返回并着陆，实现快速周转和重复使用。'}
                      {rocket.name === 'New Shepard' && 
                        '新谢泼德的助推器和太空舱都设计为可重复使用。助推器通过垂直着陆回收，太空舱则使用降落伞安全返回地面。'}
                    </p>
                    <div className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg p-6">
                      <h4 className="text-lg font-semibold text-white mb-2">回收记录</h4>
                      <p className="text-gray-400">
                        {rocket.name === 'Falcon 9' && 
                          'SpaceX已经成功回收和复飞助推器数百次，部分助推器的单枚复飞次数已超过20次，这从根本上改变了航天发射的经济格局。'}
                        {rocket.name === 'Falcon Heavy' && 
                          '猎鹰重型可以回收其三个第一级助推器，两个侧助推器通常降落在陆地着陆区，中心核心助推器降落在海上驳船。'}
                        {rocket.name === 'Starship' && 
                          '星舰正在开发和测试阶段，目标是实现完全快速可重复使用，最终目标是在发射后数小时内重新发射。'}
                        {rocket.name === 'New Shepard' && 
                          '新谢泼德已经多次成功回收和重复使用助推器和太空舱，展示了亚轨道飞行器的可重复使用能力。'}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-400">此火箭不具备可重复使用能力。</p>
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
