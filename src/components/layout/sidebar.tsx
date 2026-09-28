'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  BookOpen, 
  TrendingUp, 
  User,
  Home,
  SlidersHorizontal,
  Users,
  BarChart3,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const studentNavigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Modules', href: '/modules', icon: BookOpen },
  { name: 'Progress', href: '/progress', icon: TrendingUp },
  { name: 'Profile', href: '/profile', icon: User },
];

const adminNavigation = [
  { name: 'Admin Overview', href: '/admin', icon: SlidersHorizontal },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Modules', href: '/admin/modules', icon: BookOpen },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
];

interface SidebarProps {
  isAdmin?: boolean;
}

export function Sidebar({ isAdmin = false }: SidebarProps) {
  const pathname = usePathname();
  const navigation = isAdmin ? adminNavigation : studentNavigation;

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:border-r lg:bg-muted/10 min-h-[calc(100vh-4rem)]">
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/dashboard' && item.href !== '/admin' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Quick Stats / Admin Status */}
      <div className="border-t p-4 space-y-3">
        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {isAdmin ? 'PLATFORM STATUS' : 'QUICK STATS'}
        </div>
        {isAdmin ? (
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Modules</span>
              <span className="font-medium">18 Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Environment</span>
              <span className="font-medium text-success">Production</span>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Modules</span>
              <span className="font-medium">5 / 18</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">XP</span>
              <span className="font-medium">1,250</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Level</span>
              <span className="font-medium">2</span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
