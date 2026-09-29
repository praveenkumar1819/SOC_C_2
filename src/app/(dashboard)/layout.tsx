import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Header } from '@/components/layout/header';
import { FloatingGlossary } from '@/components/learning/floating-glossary';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header user={session.user} />
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
      {/* Floating Security Glossary: Accessible at bottom-right corner across all learning */}
      <FloatingGlossary />
    </div>
  );
}
