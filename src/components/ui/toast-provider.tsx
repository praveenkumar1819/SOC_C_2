'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, XCircle, Info, AlertTriangle, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  description?: string;
}

interface ToastContextType {
  showToast: (toast: Omit<Toast, 'id'>) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (toast: Omit<Toast, 'id'>) => {
    // Deduplicate: avoid spamming identical toasts
    setToasts((prev) => {
      const isDuplicate = prev.some(
        (t) => t.title === toast.title && t.description === toast.description
      );
      if (isDuplicate) return prev;

      const id = Math.random().toString(36).substring(2, 9);
      const newToast = { ...toast, id };

      setTimeout(() => {
        setToasts((current) => current.filter((t) => t.id !== id));
      }, 5500);

      // Keep maximum 3 active toasts
      return [...prev.slice(-2), newToast];
    });
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const icons = {
    success: CheckCircle2,
    error: XCircle,
    info: Info,
    warning: AlertTriangle,
  };

  const colors = {
    success: 'bg-emerald-50/98 dark:bg-slate-900/98 border-emerald-400/50 dark:border-emerald-500/50 text-emerald-950 dark:text-emerald-200 shadow-emerald-500/20',
    error: 'bg-rose-50/98 dark:bg-slate-900/98 border-rose-400/50 dark:border-rose-500/50 text-rose-950 dark:text-rose-200 shadow-rose-500/20',
    info: 'bg-sky-50/98 dark:bg-slate-900/98 border-sky-400/50 dark:border-sky-500/50 text-sky-950 dark:text-sky-200 shadow-sky-500/20',
    warning: 'bg-amber-50/98 dark:bg-slate-900/98 border-amber-400/60 dark:border-amber-500/60 text-amber-950 dark:text-amber-200 shadow-amber-500/20',
  };

  const iconColors = {
    success: 'text-emerald-600 dark:text-emerald-400',
    error: 'text-rose-600 dark:text-rose-400',
    info: 'text-sky-600 dark:text-sky-400',
    warning: 'text-amber-600 dark:text-amber-400',
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-16 right-3 sm:right-6 z-[9999] space-y-2 w-80 sm:w-96 max-w-[92vw] pointer-events-none flex flex-col items-end">
        <AnimatePresence>
          {toasts.map((toast) => {
            const Icon = icons[toast.type];
            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: -16, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.95 }}
                transition={{ duration: 0.18 }}
                className="w-full pointer-events-auto"
              >
                <div
                  className={cn(
                    'p-3 sm:p-4 rounded-2xl border backdrop-blur-2xl shadow-2xl transition-all',
                    colors[toast.type]
                  )}
                >
                  <div className="flex items-start gap-2.5">
                    <Icon className={cn('h-4 w-4 shrink-0 mt-0.5', iconColors[toast.type])} />
                    <div className="flex-1 min-w-0 pr-1">
                      <p className="text-xs font-bold leading-snug">{toast.title}</p>
                      {toast.description && (
                        <p className="text-xs opacity-90 mt-1 leading-relaxed whitespace-pre-line break-words">
                          {toast.description}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => removeToast(toast.id)}
                      className="shrink-0 opacity-60 hover:opacity-100 transition-opacity p-0.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10"
                      aria-label="Close notification"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}
