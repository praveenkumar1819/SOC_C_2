import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ToastProvider } from '@/components/ui/toast-provider';
import { GlobalStyleProvider } from '@/components/providers/global-style-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CDAC SOC Course - Enterprise Security Operations',
  description: 'Professional interactive training platform for CDAC SOC Analysts and Enterprise Defenders',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const stored = localStorage.getItem('theme');
                if (stored === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className={`${inter.className} overflow-x-hidden max-w-full min-h-screen`} suppressHydrationWarning>
        <GlobalStyleProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </GlobalStyleProvider>
      </body>
    </html>
  );
}
