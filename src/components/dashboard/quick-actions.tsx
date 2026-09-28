import Link from 'next/link';
import { BookOpen, Target, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button asChild variant="outline" className="w-full justify-start">
          <Link href="/modules">
            <BookOpen className="mr-2 h-4 w-4" />
            Browse All Modules
          </Link>
        </Button>

        <Button asChild variant="outline" className="w-full justify-start">
          <Link href="/progress">
            <Target className="mr-2 h-4 w-4" />
            View Progress
          </Link>
        </Button>

        <Button asChild variant="outline" className="w-full justify-start">
          <Link href="/profile">
            <Award className="mr-2 h-4 w-4" />
            View Badges
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
