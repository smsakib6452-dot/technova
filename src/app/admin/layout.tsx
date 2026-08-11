import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Console',
  description: 'TECHNOVA store administration.',
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <main className="flex-1">{children}</main>;
}
