import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            🚀 LaunchDate
          </Link>
          <ul className="flex items-center gap-1">
            <li>
              <Button asChild variant={isActive('/') ? 'default' : 'ghost'}>
                <Link to="/">Home</Link>
              </Button>
            </li>
            <li>
              <Button asChild variant={isActive('/launches') ? 'default' : 'ghost'}>
                <Link to="/launches">Launch Dates</Link>
              </Button>
            </li>
            <li>
              <Button asChild variant={isActive('/news') ? 'default' : 'ghost'}>
                <Link to="/news">News</Link>
              </Button>
            </li>
            <li>
              <Button asChild variant={isActive('/rockets') ? 'default' : 'ghost'}>
                <Link to="/rockets">Rockets</Link>
              </Button>
            </li>
            <li>
              <Button asChild variant={isActive('/companies') ? 'default' : 'ghost'}>
                <Link to="/companies">Companies</Link>
              </Button>
            </li>
            <li>
              <Button asChild variant={isActive('/bases') ? 'default' : 'ghost'}>
                <Link to="/bases">Launch Bases</Link>
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

