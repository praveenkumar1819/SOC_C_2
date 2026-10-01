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
  Layers,
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
import { CurriculumTreeDrawer } from './curriculum-tree-drawer';
import { ThemeToggle } from './theme-toggle';
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
      if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
        e.preventDefault();
        setDrawerOpen((prev) => !prev);
      }
    };

    const handleOpenDrawer = () => setDrawerOpen(true);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('soc:open-curriculum-drawer', handleOpenDrawer);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('soc:open-curriculum-drawer', handleOpenDrawer);
    };
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
      <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl shadow-xs supports-[backdrop-filter]:bg-background/70">
        <div className="container flex h-16 items-center justify-between gap-3">
          {/* Left: Mobile Drawer Toggle, Logo & Curriculum Tree Trigger */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-9 w-9 text-foreground"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open curriculum tree"
              title="Open Curriculum Tree"
            >
              <Menu className="h-5 w-5" />
            </Button>

            <Link href="/dashboard" className="flex items-center gap-2.5 hover:opacity-90 transition-opacity mr-1">
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

            {/* Prominent Header Curriculum Tree Button (Desktop & Tablet) */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDrawerOpen(true)}
              className="hidden md:flex items-center gap-2 text-xs font-semibold h-9 px-3 border-primary/20 bg-primary/5 hover:bg-primary/10 text-primary transition-all shadow-2xs"
              title="Browse Modules, Units & Topics Tree (Ctrl+B)"
            >
              <Layers className="w-4 h-4 text-primary" />
              <span>Curriculum Tree</span>
              <kbd className="pointer-events-none hidden lg:inline-flex h-4 select-none items-center rounded border bg-muted/80 px-1 font-mono text-[9px] font-medium opacity-80">
                ⌘B
              </kbd>
            </Button>
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

            {/* Theme Toggle (Dark & Light Mode) */}
            <ThemeToggle />

            {/* Direct Development Admin Button (Section 15) */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDevAdminOpen(true)}
              className="border-amber-300 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/50 text-amber-900 dark:text-amber-200 font-semibold text-xs h-9 gap-1.5 px-3 shadow-xs"
              title="Open Development Admin Panel"
            >
              <Sliders className="h-3.5 w-3.5 text-amber-700 dark:text-amber-400" />
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

      {/* Curriculum Tree Slide-Over Drawer (Modules, Units & Topics Tree with Statuses) */}
      <CurriculumTreeDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />

      {/* Global Search Dialog */}
      <GlobalSearch open={searchOpen} onOpenChange={setSearchOpen} />

      {/* Development Admin Modal */}
      <DevAdminModal open={devAdminOpen} onOpenChange={setDevAdminOpen} />
    </>
  );
}
