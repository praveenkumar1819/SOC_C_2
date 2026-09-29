import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  User,
  Mail,
  Calendar,
  Zap,
  Trophy,
  Award,
  Target,
  TrendingUp,
} from 'lucide-react';
import { format } from 'date-fns';

export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect('/login');
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email },
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
    },
  });

  if (!user) {
    redirect('/login');
  }

  const initials =
    user.name
      ?.split(' ')
      .map((n: string) => n[0])
      .join('')
      .toUpperCase() || 'U';

  const completedModules = (user.progress || []).filter(
    (p: any) => p.status === 'COMPLETED'
  ).length;
  const totalModules = 18;
  const completionPercentage = Math.round(
    (completedModules / totalModules) * 100
  );

  const currentLevel = user.level || 1;
  const totalXP = user.totalXP || 0;
  const xpInCurrentLevel = Math.max(0, totalXP - (currentLevel - 1) * 1000);
  const xpForNextLevel = 1000;
  const levelProgress = Math.min(100, Math.round((xpInCurrentLevel / xpForNextLevel) * 100));

  return (
    <div className="container py-8 max-w-6xl">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Your Profile</h1>
          <p className="text-muted-foreground">
            Track your progress and achievements
          </p>
        </div>

        {/* Profile Card */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <Avatar className="w-24 h-24">
                <AvatarFallback className="bg-primary text-white text-3xl font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-2xl font-bold mb-1">{user.name || 'Analyst'}</h2>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span className="text-sm">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">
                      Joined {user.createdAt ? format(new Date(user.createdAt), 'MMMM yyyy') : 'Recently'}
                    </span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-primary/5 rounded-lg border">
                    <div className="text-2xl font-bold text-primary">
                      {currentLevel}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Level
                    </div>
                  </div>
                  <div className="text-center p-4 bg-amber-500/10 rounded-lg border">
                    <div className="text-2xl font-bold text-amber-600">
                      {totalXP.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Total XP
                    </div>
                  </div>
                  <div className="text-center p-4 bg-emerald-500/10 rounded-lg border">
                    <div className="text-2xl font-bold text-emerald-600">
                      {completedModules}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Completed
                    </div>
                  </div>
                  <div className="text-center p-4 bg-orange-100 rounded-lg border">
                    <div className="text-2xl font-bold text-orange-600">
                      {user.badges?.length || 0}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Badges
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Level Progress */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <CardTitle>Level Progress</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold">Level {currentLevel}</p>
                  <p className="text-sm text-muted-foreground">
                    {Math.max(0, 1000 - xpInCurrentLevel)} XP to Level {currentLevel + 1}
                  </p>
                </div>
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Trophy className="h-8 w-8 text-primary" />
                </div>
              </div>
              <Progress value={levelProgress} className="h-3" />
              <p className="text-sm text-muted-foreground">
                {xpInCurrentLevel.toLocaleString()} / {xpForNextLevel.toLocaleString()} XP
              </p>
            </CardContent>
          </Card>

          {/* Course Progress */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-emerald-600" />
                <CardTitle>Course Progress</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold">{completionPercentage}%</p>
                  <p className="text-sm text-muted-foreground">
                    {completedModules} of {totalModules} modules
                  </p>
                </div>
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <Target className="h-8 w-8 text-emerald-600" />
                </div>
              </div>
              <Progress value={completionPercentage} className="h-3" />
              <p className="text-sm text-muted-foreground">
                {Math.max(0, totalModules - completedModules)} modules remaining
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Badges */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-amber-500" />
              <CardTitle>Earned Badges</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {!user.badges || user.badges.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">
                  No badges earned yet. Keep learning to unlock achievements!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {user.badges.map((userBadge: any) => (
                  <Card key={userBadge.id} className="bg-amber-50/50 border-amber-200">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                          <Award className="h-8 w-8 text-amber-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-lg mb-1">
                            {userBadge.badge?.name || 'Achievement Badge'}
                          </h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            {userBadge.badge?.description || 'Awarded for completing training milestones.'}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>
                              Earned{' '}
                              {userBadge.earnedAt
                                ? format(
                                    new Date(userBadge.earnedAt),
                                    'MMM d, yyyy'
                                  )
                                : 'Recently'}
                            </span>
                            {userBadge.badge?.xpBonus && (
                              <Badge variant="outline" className="text-xs">
                                +{userBadge.badge.xpBonus} XP
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Learning History */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              <CardTitle>Learning History</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {!user.progress || user.progress.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No learning activity yet. Start your first module!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {user.progress.slice(0, 10).map((progress: any) => (
                  <div
                    key={progress.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border gap-4"
                  >
                    <div className="flex-1">
                      <p className="font-medium">
                        Module {progress.module?.id || progress.moduleId}: {progress.module?.title || 'SOC Training'}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <Progress
                          value={progress.completionPercentage || 0}
                          className="h-2 max-w-xs"
                        />
                        <span className="text-sm text-muted-foreground">
                          {progress.completionPercentage || 0}%
                        </span>
                      </div>
                    </div>
                    <div className="sm:text-right">
                      <Badge
                        variant={
                          progress.status === 'COMPLETED' ? 'default' : 'outline'
                        }
                      >
                        {progress.status === 'COMPLETED'
                          ? 'Completed'
                          : 'In Progress'}
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-1">
                        {progress.totalXpEarned || 0} XP
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
