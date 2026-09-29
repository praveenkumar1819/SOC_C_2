'use client';

import { useState, useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Shield,
  User,
  LogOut,
  Settings,
  Search,
  Sliders,
  Menu,
  X,
  BookOpen,
  Home,
  TrendingUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { GlobalSearch } from './global-search';
import { DevAdminModal } from '@/components/admin/dev-admin-modal';
import { cn } from '@/lib/utils';

interface HeaderProps {
  user?: {
    name?: string | null;
    email?: string | null;
    role?: string;
  } | null;
}

export function Header({ user }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [devAdminOpen, setDevAdminOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/login');
  };

  const initials =
    user?.name
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase() || 'U';

  const navLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Modules', href: '/modules', icon: BookOpen },
    { name: 'Progress', href: '/progress', icon: TrendingUp },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between gap-3">
          {/* Left: Mobile Drawer Toggle & Logo */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </Button>

            <Link href="/dashboard" className="flex items-center gap-2.5 hover:opacity-90 transition-opacity">
              <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center shadow-xs">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-base font-bold leading-tight">SOC Analyst L1</h1>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                  Learning Platform
                </p>
              </div>
            </Link>
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/dashboard' && pathname.startsWith(link.href));
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    'px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors',
                    isActive
                      ? 'bg-primary/10 text-primary font-bold'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Center Search Input / Trigger */}
          <div className="flex-1 max-w-xs hidden lg:block">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSearchOpen(true)}
              className="w-full justify-between text-muted-foreground hover:text-foreground h-9 text-xs"
            >
              <div className="flex items-center gap-2">
                <Search className="h-3.5 w-3.5" />
                <span>Search topics & concepts...</span>
              </div>
              <kbd className="pointer-events-none h-4 select-none items-center gap-0.5 rounded border bg-muted px-1.5 font-mono text-[9px] font-medium opacity-100 flex">
                ⌘K
              </kbd>
            </Button>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            {/* Search Trigger for smaller screens */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-9 w-9"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </Button>

            {/* Direct Development Admin Button (Section 15) */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDevAdminOpen(true)}
              className="border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 font-semibold text-xs h-9 gap-1.5 px-3 shadow-xs"
              title="Open Development Admin Panel"
            >
              <Sliders className="h-3.5 w-3.5 text-amber-700" />
              <span>Admin</span>
            </Button>

            {/* User Profile Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full ring-1 ring-border">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary text-white text-xs font-bold">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-semibold">{user?.name || 'Analyst'}</p>
                    <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  Profile & Achievements
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setDevAdminOpen(true)}>
                  <Sliders className="mr-2 h-4 w-4" />
                  Dev Admin Panel
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/admin')}>
                  <Settings className="mr-2 h-4 w-4" />
                  Full Admin Portal
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Slide-over Drawer (Side Navigation when explicitly opened) */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="relative w-72 max-w-[80vw] bg-background border-r p-6 shadow-2xl flex flex-col z-10 animate-slide-up">
            <div className="flex items-center justify-between pb-4 border-b">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center font-bold">
                  <Shield className="w-4 h-4" />
                </div>
                <span className="font-bold text-sm">Navigation</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setDrawerOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <nav className="flex-1 space-y-1.5 py-6">
              {navLinks.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setDrawerOpen(false)}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold transition-colors',
                      isActive
                        ? 'bg-primary text-white'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                );
              })}

              <div className="pt-4 border-t mt-4 space-y-1.5">
                <button
                  onClick={() => {
                    setDrawerOpen(false);
                    setDevAdminOpen(true);
                  }}
                  className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 transition-colors"
                >
                  <Sliders className="h-4 w-4 text-amber-700" />
                  Dev Admin Controls
                </button>
                <Link
                  href="/profile"
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <User className="h-4 w-4" />
                  Analyst Profile
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Global Search Dialog */}
      <GlobalSearch open={searchOpen} onOpenChange={setSearchOpen} />

      {/* Development Admin Modal */}
      <DevAdminModal open={devAdminOpen} onOpenChange={setDevAdminOpen} />
    </>
  );
}
