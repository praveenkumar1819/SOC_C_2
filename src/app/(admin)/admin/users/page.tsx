import { db } from '@/lib/db';
import { UserList } from '@/components/admin/user-list';

export const dynamic = 'force-dynamic';

export default async function UsersPage() {
  const users = await db.user.findMany({
    include: {
      progress: {
        where: { status: 'COMPLETED' },
      },
      badges: {
        include: {
          badge: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">User Management</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage, search, and monitor platform users and SOC learning progress.
        </p>
      </div>

      <UserList users={users} />
    </div>
  );
}
