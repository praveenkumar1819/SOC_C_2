import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity } from 'lucide-react';

export function RecentActivity() {
  const activities = [
    {
      user: 'John Analyst',
      action: 'completed Module 04: SOC Operations',
      time: '2 hours ago',
    },
    {
      user: 'Sarah Security',
      action: 'earned Alert Triage Ready badge',
      time: '3 hours ago',
    },
    {
      user: 'Mike Monitor',
      action: 'started Module 05: Log Analysis',
      time: '5 hours ago',
    },
    {
      user: 'Lisa Log',
      action: 'completed Topic 3 Knowledge Check',
      time: '6 hours ago',
    },
  ];

  return (
    <Card className="border border-border/80 shadow-xs">
      <CardHeader className="pb-3 border-b border-border/60">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          <CardTitle className="text-base font-bold text-foreground">Recent Platform Activity</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-3">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-xl border border-border/70 hover:bg-muted/40 transition-colors"
            >
              <div>
                <p className="text-xs sm:text-sm font-semibold text-foreground">{activity.user}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {activity.action}
                </p>
              </div>
              <span className="text-[11px] text-muted-foreground font-mono shrink-0 ml-4">
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
