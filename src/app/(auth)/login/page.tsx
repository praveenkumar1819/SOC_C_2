'use client';

import { useState, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Shield, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isRegistered = searchParams.get('registered') === 'true';

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid email or password');
        setIsLoading(false);
      } else {
        router.push('/dashboard');
        router.refresh();
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
      setIsLoading(false);
    }
  };

  const handleQuickFill = (email: string) => {
    setFormData({
      email,
      password: 'password123',
    });
  };

  return (
    <div className="w-full max-w-md space-y-8">
      {/* Logo and Header */}
      <div className="text-center space-y-2">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-md shadow-primary/20">
            <Shield className="w-10 h-10 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-foreground">SOC Analyst L1</h1>
        <p className="text-muted-foreground">Welcome back, Analyst</p>
      </div>

      {/* Login Card */}
      <Card>
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>
            Enter your credentials to access the platform
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {isRegistered && !error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-success-light text-success text-sm border border-success/20 animate-fade-in">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Account created successfully! You can now sign in.</span>
              </div>
            )}

            {error && (
              <div className="p-3 rounded-lg bg-danger-light text-danger text-sm border border-danger/20 animate-fade-in">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="analyst@socplatform.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                disabled={isLoading}
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>

            <div className="text-sm text-center text-muted-foreground">
              Don't have an account?{' '}
              <Link href="/register" className="text-primary hover:underline">
                Register
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>

      {/* Demo Credentials */}
      <Card className="bg-muted/50 border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Demo Credentials</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <button
            type="button"
            onClick={() => handleQuickFill('student@socplatform.com')}
            className="w-full text-left p-2 rounded hover:bg-secondary transition-colors"
          >
            <p className="font-medium">Student Account:</p>
            <p className="text-muted-foreground text-xs">student@socplatform.com / password123 (Click to fill)</p>
          </button>
          <button
            type="button"
            onClick={() => handleQuickFill('admin@socplatform.com')}
            className="w-full text-left p-2 rounded hover:bg-secondary transition-colors"
          >
            <p className="font-medium">Admin Account:</p>
            <p className="text-muted-foreground text-xs">admin@socplatform.com / password123 (Click to fill)</p>
          </button>
        </CardContent>
      </Card>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary p-4">
      <Suspense fallback={<div className="text-muted-foreground text-sm">Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
