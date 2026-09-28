import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Award, BookOpen, Zap, Calendar } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

interface UserDetailPageProps {
  params: {
    userId: string;
  };
}

export const dynamic = 'force-dynamic';

export default async function UserDetailPage({ params }: UserDetailPageProps) {
  let user: any = null;

  try {
    user = await db.user.findUnique({
      where: { id: params.userId },
      include: {
        progress: {
          include: {
            module: true,
          },
          orderBy: { updatedAt: 'desc' },
        },
        badges: {
          include: {
            badge: true,
          },
          orderBy: { earnedAt: 'desc' },
        },
        knowledgeCheckAttempts: {
          orderBy: { attemptedAt: 'desc' },
          take: 10,
        },
      },
    });
  } catch (err) {
    console.error('Error finding user:', err);
  }

  if (!user) {
    notFound();
  }

  const initials = user.name
    ?.split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase() || 'U';

  const userProgress = user.progress || [];
  const userBadges = user.badges || [];
  const knowledgeChecks = user.knowledgeCheckAttempts || [];

  const completedModules = userProgress.filter((p: any) => p.status === 'COMPLETED').length;
  const inProgressModules = userProgress.filter((p: any) => p.status === 'IN_PROGRESS').length;
  const totalModules = 18;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button asChild variant="outline" size="sm">
          <Link href="/admin/users">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Users
          </Link>
        </Button>
      </div>

      {/* User Profile Card */}
      <Card className="border border-border/80 shadow-xs">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <Avatar className="w-20 h-20 shrink-0">
              <AvatarFallback className="bg-primary text-white text-2xl font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-2xl font-bold text-foreground truncate">{user.name || 'User'}</h2>
                {user.role === 'ADMIN' ? (
                  <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
                    Admin
                  </Badge>
                ) : (
                  <Badge variant="secondary">Student</Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground font-mono mb-4">{user.email}</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 border-t border-border/60">
                <div className="flex items-center gap-2.5">
                  <Zap className="h-5 w-5 text-amber-500 shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Total XP</p>
                    <p className="text-lg font-extrabold text-foreground font-mono">{user.totalXP.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <BookOpen className="h-5 w-5 text-primary shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Modules</p>
                    <p className="text-lg font-extrabold text-foreground font-mono">{completedModules} / {totalModules}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <Award className="h-5 w-5 text-amber-500 shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Badges</p>
                    <p className="text-lg font-extrabold text-foreground font-mono">{userBadges.length}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <Calendar className="h-5 w-5 text-muted-foreground shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Joined</p>
                    <p className="text-sm font-bold text-foreground">
                      {format(new Date(user.createdAt), 'MMM d, yyyy')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Module Progress */}
        <Card className="border border-border/80 shadow-xs">
          <CardHeader className="pb-3 border-b border-border/60">
            <CardTitle className="text-base font-bold text-foreground">Module Progress</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              {userProgress.length === 0 ? (
                <p className="text-xs text-muted-foreground text-center py-8">
                  No module progress recorded yet.
                </p>
              ) : (
                userProgress.map((prog: any) => (
                  <div key={prog.id} className="space-y-2 p-3 rounded-xl border border-border/60 bg-muted/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-xs sm:text-sm text-foreground">
                          Module {prog.module?.id || prog.moduleId}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {prog.module?.title || `Module ${prog.moduleId}`}
                        </p>
                      </div>
                      <Badge
                        variant={prog.status === 'COMPLETED' ? 'default' : 'outline'}
                        className="text-[10px] font-mono"
                      >
                        {prog.status === 'COMPLETED' ? 'Completed' : 'In Progress'}
                      </Badge>
                    </div>
                    <Progress value={prog.completionPercentage || 0} className="h-1.5" />
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                      <span>{prog.completionPercentage || 0}% complete</span>
                      <span className="font-mono">{prog.totalXpEarned || 0} XP earned</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Badges */}
        <Card className="border border-border/80 shadow-xs">
          <CardHeader className="pb-3 border-b border-border/60">
            <CardTitle className="text-base font-bold text-foreground">Earned Badges</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-3">
              {userBadges.length === 0 ? (
                <p className="text-xs text-muted-foreground text-center py-8">
                  No badges earned yet.
                </p>
              ) : (
                userBadges.map((userBadge: any) => (
                  <div
                    key={userBadge.id}
                    className="flex items-center gap-3 p-3 rounded-xl border border-border/60 hover:bg-muted/30 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                      <Award className="h-5 w-5 text-amber-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-xs sm:text-sm text-foreground">{userBadge.badge.name}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {userBadge.badge.description}
                      </p>
                    </div>
                    <span className="text-[11px] text-muted-foreground shrink-0 font-mono">
                      {format(new Date(userBadge.earnedAt), 'MMM d, yyyy')}
                    </span>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border border-border/80 shadow-xs">
        <CardHeader className="pb-3 border-b border-border/60">
          <CardTitle className="text-base font-bold text-foreground">Recent Knowledge Check Attempts</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-2">
            {knowledgeChecks.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-8">
                No individual quiz attempt logs recorded.
              </p>
            ) : (
              knowledgeChecks.map((attempt: any) => (
                <div
                  key={attempt.id}
                  className="flex items-center justify-between p-3 rounded-xl border border-border/60"
                >
                  <div>
                    <p className="font-semibold text-xs text-foreground">Knowledge Check</p>
                    <p className="text-[11px] text-muted-foreground">
                      {format(new Date(attempt.attemptedAt), 'MMM d, yyyy HH:mm')}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant={attempt.isCorrect ? 'default' : 'outline'} className="text-[10px]">
                      {attempt.isCorrect ? 'Correct' : 'Incorrect'}
                    </Badge>
                    <span className="text-xs font-mono font-bold text-primary">
                      +{attempt.xpEarned} XP
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
