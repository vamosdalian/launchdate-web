import { useParams, Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Timeline, TimelineItem } from '@/components/ui/timeline';
import { launches, rockets, launchBases } from '@/data/sampleData';
import { useEffect, useState } from 'react';

const LaunchDetail = () => {
  const { id } = useParams<{ id: string }>();
  const launch = launches.find((l) => l.id === id);

  // Countdown state
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Update countdown every second
  useEffect(() => {
    if (!launch || launch.status !== 'scheduled') return;

    const updateCountdown = () => {
      const launchDate = new Date(launch.date).getTime();
      const now = new Date().getTime();
      const distance = launchDate - now;

      if (distance < 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [launch]);

  if (!launch) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-8 max-w-md text-center">
          <h1 className="text-2xl font-bold mb-4">发射信息未找到</h1>
          <p className="text-gray-400 mb-6">请求的发射任务不存在。</p>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link to="/launches">返回发射列表</Link>
          </Button>
        </div>
      </div>
    );
  }

  const rocket = rockets.find((r) => r.name === launch.rocket);
  const launchBase = launchBases.find((b) => b.name === launch.launchBase);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
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
      case 'successful':
        return <Badge className="bg-green-600">✅ 成功</Badge>;
      case 'failed':
        return <Badge className="bg-red-600">❌ 失败</Badge>;
      case 'cancelled':
        return <Badge className="bg-gray-600">🚫 取消</Badge>;
      default:
        return <Badge className="bg-blue-600">🕒 计划中</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f0f0f0]">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-end justify-center text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1614728263952-84ea256ec346?q=80&w=2574&auto=format&fit=crop" 
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?q=80&w=2574&auto=format&fit=crop';
            }}
            alt="火箭发射背景图" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-x-0 bottom-0 h-1/2" style={{
            background: 'linear-gradient(0deg, rgba(10, 10, 10, 1) 0%, rgba(10, 10, 10, 0.7) 30%, rgba(10, 10, 10, 0) 100%)'
          }}></div>
        </div>
        <div className="relative z-10 p-4 pb-16 md:pb-24 container mx-auto">
          <div className="mb-8">
            {getStatusBadge(launch.status)}
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">{launch.name}</h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-2">{launch.rocket}</p>
          <p className="text-lg md:text-xl text-gray-400 mb-2">📍 {launch.launchBase}</p>
          <p className="text-lg md:text-xl text-gray-400 mb-8">🕒 {formatDate(launch.date)}</p>
          
          {/* Countdown Timer - Only show for scheduled launches */}
          {launch.status === 'scheduled' && (
            <div>
              <h2 className="text-lg md:text-xl font-medium text-gray-300 mb-4">发射倒计时</h2>
              <div className="flex justify-center gap-4 md:gap-6 mb-8">
                <div className="rounded-lg px-4 py-3 md:px-6 md:py-4 min-w-[70px] md:min-w-[100px]" style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <div className="text-3xl md:text-5xl font-bold">{String(countdown.days).padStart(2, '0')}</div>
                  <div className="text-xs md:text-sm text-gray-400 mt-1">天</div>
                </div>
                <div className="rounded-lg px-4 py-3 md:px-6 md:py-4 min-w-[70px] md:min-w-[100px]" style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <div className="text-3xl md:text-5xl font-bold">{String(countdown.hours).padStart(2, '0')}</div>
                  <div className="text-xs md:text-sm text-gray-400 mt-1">时</div>
                </div>
                <div className="rounded-lg px-4 py-3 md:px-6 md:py-4 min-w-[70px] md:min-w-[100px]" style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <div className="text-3xl md:text-5xl font-bold">{String(countdown.minutes).padStart(2, '0')}</div>
                  <div className="text-xs md:text-sm text-gray-400 mt-1">分</div>
                </div>
                <div className="rounded-lg px-4 py-3 md:px-6 md:py-4 min-w-[70px] md:min-w-[100px]" style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <div className="text-3xl md:text-5xl font-bold">{String(countdown.seconds).padStart(2, '0')}</div>
                  <div className="text-xs md:text-sm text-gray-400 mt-1">秒</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column: Mission Details */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <Button asChild variant="ghost" className="mb-4 text-gray-300 hover:text-white">
                    <Link to="/launches">← 返回发射列表</Link>
                  </Button>
                  <h2 className="text-3xl font-bold mb-6">任务详情</h2>
                  
                  {/* Mission Overview */}
                  <div className="bg-[#1a1a1a] border border-[#2a2a2a] p-6 rounded-lg mb-6">
                    <h3 className="text-xl font-bold mb-3">任务概况</h3>
                    <p className="text-gray-300 mb-4">{launch.description}</p>
                    <ul className="grid sm:grid-cols-2 gap-4 text-gray-300">
                      <li><strong>任务名称:</strong> {launch.name}</li>
                      <li><strong>状态:</strong> {launch.status === 'successful' ? '成功' : launch.status === 'failed' ? '失败' : launch.status === 'cancelled' ? '取消' : '计划中'}</li>
                      <li><strong>发射时间:</strong> {formatDate(launch.date)}</li>
                      <li><strong>任务类型:</strong> {
                        launch.name.includes('Starlink') ? '卫星部署' :
                        launch.name.includes('Crew') ? '载人任务' :
                        launch.name.includes('Cargo') || launch.name.includes('Dragon') ? '货运补给' :
                        launch.name.includes('GPS') ? '导航卫星' :
                        '通信卫星'
                      }</li>
                    </ul>
                  </div>

                  {/* Rocket Information */}
                  {rocket && (
                    <div className="bg-[#1a1a1a] border border-[#2a2a2a] p-6 rounded-lg mb-6">
                      <h3 className="text-xl font-bold mb-3">火箭信息</h3>
                      <div className="flex flex-col sm:flex-row gap-6">
                        <div className="w-32 h-48 bg-[#0a0a0a] rounded-lg overflow-hidden flex-shrink-0">
                          <img src={rocket.imageUrl} alt={rocket.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-2xl font-bold mb-2">{rocket.name}</h4>
                          <p className="text-gray-400 mb-4">{rocket.company}</p>
                          <p className="text-gray-300 mb-4">{rocket.description}</p>
                          <ul className="grid grid-cols-3 gap-4 text-gray-300 mb-4">
                            <li><strong>高度:</strong> {rocket.height}m</li>
                            <li><strong>直径:</strong> {rocket.diameter}m</li>
                            <li><strong>质量:</strong> {(rocket.mass / 1000).toFixed(0)}t</li>
                          </ul>
                          <Button asChild className="bg-blue-600 hover:bg-blue-700">
                            <Link to={`/rockets/${rocket.id}`}>查看火箭详情 →</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Launch Site */}
                  {launchBase && (
                    <div className="bg-[#1a1a1a] border border-[#2a2a2a] p-6 rounded-lg mb-6">
                      <h3 className="text-xl font-bold mb-3">发射场信息</h3>
                      <h4 className="text-2xl font-bold mb-2">{launchBase.name}</h4>
                      <p className="text-gray-400 mb-4">{launchBase.location}</p>
                      <p className="text-gray-300 mb-4">{launchBase.description}</p>
                      <ul className="grid sm:grid-cols-2 gap-4 text-gray-300">
                        <li><strong>国家:</strong> {launchBase.country}</li>
                        <li><strong>坐标:</strong> {launchBase.latitude.toFixed(4)}°N, {Math.abs(launchBase.longitude).toFixed(4)}°W</li>
                      </ul>
                    </div>
                  )}

                  {/* Additional Information */}
                  <div className="bg-[#1a1a1a] border border-[#2a2a2a] p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-3">载荷信息</h3>
                    <ul className="grid sm:grid-cols-2 gap-4 text-gray-300">
                      <li><strong>发射提供商:</strong> {rocket?.company || 'N/A'}</li>
                      <li><strong>目标轨道:</strong> {
                        launch.name.includes('Starlink') || launch.name.includes('OneWeb') ? '近地轨道 (LEO)' :
                        launch.name.includes('GPS') || launch.name.includes('SES') ? '地球同步轨道 (GEO)' :
                        launch.name.includes('ISS') || launch.name.includes('Dragon') || launch.name.includes('Crew') ? '近地轨道 (LEO) - ISS' :
                        launch.name.includes('Moon') || launch.name.includes('Artemis') ? '月球转移轨道' :
                        '近地轨道 (LEO)'
                      }</li>
                      {rocket?.name.includes('Falcon') && (
                        <>
                          <li><strong>一级回收:</strong> 是</li>
                          <li><strong>整流罩回收:</strong> 是</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Right Column: Timeline */}
              <div>
                <h2 className="text-3xl font-bold mb-6">发射流程</h2>
                <Timeline>
                  <TimelineItem
                    time="T-00:00:00"
                    title="点火升空"
                    description={`${rocket?.name || '火箭'}主引擎点火，开始升空`}
                  />
                  <TimelineItem
                    time="T+00:01:12"
                    title="通过 Max-Q"
                    description="火箭通过最大动压点，承受最大气动压力"
                  />
                  <TimelineItem
                    time="T+00:02:27"
                    title="MECO"
                    description="一级主引擎关闭 (Main Engine Cut-Off)"
                  />
                  <TimelineItem
                    time="T+00:02:31"
                    title="级间分离"
                    description="一二级分离，二级引擎点火"
                  />
                  {rocket?.name.includes('Falcon') && (
                    <TimelineItem
                      time="T+00:08:45"
                      title="助推器着陆"
                      description="一级助推器成功回收着陆"
                    />
                  )}
                  <TimelineItem
                    time="T+01:04:29"
                    title="载荷部署"
                    description="到达目标轨道，开始载荷部署"
                    isLast={true}
                  />
                </Timeline>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#111] border-t border-gray-800">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-2">LaunchDate</h3>
              <p className="text-gray-400">您全面的火箭发射、太空新闻和航空航天信息来源。</p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-3">快速链接</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/launches" className="hover:text-white">发射日历</Link></li>
                <li><Link to="/rockets" className="hover:text-white">火箭资料库</Link></li>
                <li><Link to="/news" className="hover:text-white">航天新闻</Link></li>
                <li><Link to="/companies" className="hover:text-white">航天公司</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-3">保持联系</h4>
              <p className="text-gray-400 mb-4">订阅最新的发射更新和太空新闻。</p>
              <form className="flex">
                <input 
                  type="email" 
                  placeholder="您的邮箱" 
                  className="w-full rounded-l-md bg-gray-800 border-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                  type="submit" 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 rounded-r-md"
                >
                  订阅
                </button>
              </form>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; 2025 LaunchDate. All Rights Reserved. 数据来源仅供参考。</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LaunchDetail;
