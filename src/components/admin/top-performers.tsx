import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Trophy } from 'lucide-react';

interface TopPerformersProps {
  performers: Array<{
    id: string;
    name: string | null;
    email: string;
    totalXP: number;
    level: number;
    progress: any[];
  }>;
}

export function TopPerformers({ performers }: TopPerformersProps) {
  return (
    <Card className="border border-border/80 shadow-xs">
      <CardHeader className="pb-3 border-b border-border/60">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-warning" />
          <CardTitle className="text-base font-bold text-foreground">Top Performers</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-3">
          {performers.length === 0 ? (
            <p className="text-xs text-muted-foreground text-center py-6">
              No performers data available yet.
            </p>
          ) : (
            performers.map((performer, index) => {
              const initials = performer.name
                ?.split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase() || 'U';

              return (
                <div
                  key={performer.id}
                  className="flex items-center gap-4 p-3 rounded-xl border border-border/70 hover:bg-muted/40 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="relative shrink-0">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-primary text-white text-xs font-bold">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      {index < 3 && (
                        <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-extrabold shadow-xs">
                          {index + 1}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-xs sm:text-sm text-foreground truncate">
                        {performer.name || 'User'}
                      </p>
                      <p className="text-xs text-muted-foreground truncate font-mono">
                        {performer.email}
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs sm:text-sm font-extrabold text-foreground font-mono">
                      {performer.totalXP.toLocaleString()} XP
                    </p>
                    <Badge variant="outline" className="mt-0.5 text-[10px] font-mono">
                      Level {performer.level}
                    </Badge>
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
