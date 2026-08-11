'use client';

import { ArrowRight, Cpu, Lock } from 'lucide-react';
import { useState } from 'react';
import { useAdminStore } from '@/store/admin';
import { Button } from '@/components/ui/button';

export function LoginForm() {
  const login = useAdminStore((s) => s.login);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!login(password)) {
      setError(true);
      setPassword('');
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-2xl border border-ink-200 bg-white p-8 shadow-card"
      >
        <div className="mb-6 flex flex-col items-center text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink-900 text-white">
            <Cpu className="h-6 w-6" />
          </span>
          <h1 className="mt-4 text-xl font-bold text-ink-900">Admin Sign In</h1>
          <p className="mt-1 text-sm text-ink-500">TECHNOVA management console</p>
        </div>

        <label className="relative block">
          <span className="sr-only">Password</span>
          <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            placeholder="Enter admin password"
            autoFocus
            className="h-11 w-full rounded-xl border border-ink-300 bg-white pl-10 pr-3 text-sm outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30"
          />
        </label>

        {error && (
          <p className="mt-2 text-sm font-medium text-danger">
            Incorrect password — please try again.
          </p>
        )}

        <Button type="submit" size="lg" className="mt-4 w-full">
          Sign in
          <ArrowRight className="h-4 w-4" />
        </Button>

        <p className="mt-4 text-center text-xs text-ink-400">
          Demo password: <code className="rounded bg-ink-100 px-1.5 py-0.5 font-mono text-ink-700">admin</code>
        </p>
      </form>
    </div>
  );
}