"use client";

import { useEffect, useState } from 'react';

export function AdminAuth({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState('');

  useEffect(() => {
    try {
      const ok = sessionStorage.getItem('admin-auth') === '1';
      if (ok) setAuthed(true);
    } finally {
      setChecking(false);
    }
  }, []);

  async function sha256Hex(str: string) {
    const enc = new TextEncoder();
    const data = enc.encode(str);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }

  async function onSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    const expected = process.env.NEXT_PUBLIC_ADMIN_HASH;
    if (!expected) {
      // If no hash configured, block access and inform the site owner.
      // This prevents accidental open admin pages on public deploys.
      // Ask the owner to set NEXT_PUBLIC_ADMIN_HASH at build time.
      // eslint-disable-next-line no-alert
      alert('Admin access is not configured. Please set NEXT_PUBLIC_ADMIN_HASH.');
      return;
    }
    const h = await sha256Hex(password);
    if (h === expected) {
      sessionStorage.setItem('admin-auth', '1');
      setAuthed(true);
    } else {
      // eslint-disable-next-line no-alert
      alert('Incorrect password');
    }
  }

  if (checking) return null;

  if (authed) {
    return (
      <div className="min-h-screen">
        <div className="p-4 flex justify-end">
          <button
            className="text-sm text-ink-500 underline"
            onClick={() => {
              sessionStorage.removeItem('admin-auth');
              setAuthed(false);
            }}
          >
            Logout
          </button>
        </div>
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink-50">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-xl border bg-white p-6 shadow-sm"
      >
        <h2 className="mb-3 text-lg font-semibold">Admin access</h2>
        <p className="mb-4 text-sm text-ink-500">Enter the admin password to continue.</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-3 w-full rounded-md border px-3 py-2 outline-none"
          placeholder="Password"
        />
        <div className="flex gap-2">
          <button type="submit" className="rounded-md bg-brand-600 px-3 py-2 text-white">
            Enter
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminAuth;
