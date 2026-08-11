import Link from 'next/link';
import { PackageSearch } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center gap-4 py-28 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-ink-100">
        <PackageSearch className="h-10 w-10 text-ink-400" />
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight text-ink-900">404</h1>
      <p className="max-w-md text-ink-500">
        The page or product you are looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="mt-2 flex gap-3">
        <Link href="/">
          <Button>Back home</Button>
        </Link>
        <Link href="/catalog">
          <Button variant="outline">Browse catalog</Button>
        </Link>
      </div>
    </div>
  );
}
