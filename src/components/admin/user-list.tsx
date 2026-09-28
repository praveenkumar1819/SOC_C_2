'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Search, Eye, Shield } from 'lucide-react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

interface UserListProps {
  users: Array<{
    id: string;
    name: string | null;
    email: string;
    role: string;
    totalXP: number;
    level: number;
    lastActive: Date | string;
    progress: any[];
    badges: any[];
    createdAt: Date | string;
  }>;
}

export function UserList({ users }: UserListProps) {
  const [search, setSearch] = useState('');

  const filteredUsers = users.filter((user) => {
    const searchLower = search.toLowerCase();
    return (
      user.name?.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower)
    );
  });

  return (
    <Card className="border border-border/80 shadow-xs">
      <CardHeader className="pb-4 border-b border-border/60">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <CardTitle className="text-lg font-bold text-foreground">
            All Registered Users ({users.length})
          </CardTitle>
          <div className="relative sm:w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 text-xs"
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-4">
        <div className="space-y-3">
          {filteredUsers.length === 0 ? (
            <p className="text-xs text-muted-foreground text-center py-8">
              No users matching "{search}"
            </p>
          ) : (
            filteredUsers.map((user) => {
              const initials = user.name
                ?.split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase() || 'U';

              return (
                <div
                  key={user.id}
                  className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl border border-border/70 hover:bg-muted/30 transition-colors gap-4"
                >
                  <div className="flex items-center gap-3.5 flex-1 min-w-0">
                    <Avatar className="w-10 h-10 shrink-0">
                      <AvatarFallback className="bg-primary text-white text-xs font-bold">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-foreground truncate">
                          {user.name || 'Student'}
                        </p>
                        {user.role === 'ADMIN' ? (
                          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 text-[10px] font-mono">
                            <Shield className="h-3 w-3 mr-1" />
                            Admin
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="text-[10px] font-mono">
                            Student
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate font-mono mt-0.5">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-6 sm:gap-8 pt-2 md:pt-0 border-t md:border-t-0 border-border/50">
                    <div className="text-right">
                      <p className="text-xs sm:text-sm font-bold text-foreground font-mono">
                        {user.totalXP.toLocaleString()} XP
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        Level {user.level}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs sm:text-sm font-bold text-foreground font-mono">
                        {user.progress.length} modules
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {user.badges.length} badges
                      </p>
                    </div>

                    <div className="text-right min-w-[90px]">
                      <p className="text-[10px] text-muted-foreground">
                        Last active
                      </p>
                      <p className="text-xs font-medium text-foreground">
                        {formatDistanceToNow(new Date(user.lastActive), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>

                    <Button asChild variant="outline" size="sm" className="h-8 text-xs shrink-0">
                      <Link href={`/admin/users/${user.id}`}>
                        <Eye className="h-3.5 w-3.5 mr-1.5" />
                        View
                      </Link>
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}
