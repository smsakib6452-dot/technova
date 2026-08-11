import type { PaymentMethod } from '@/lib/types';
import type { SVGProps } from 'react';

export function BkashLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" role="img" aria-label="bKash logo" {...props}>
      <rect width="24" height="24" rx="6" fill="#e2136e" />
      <path
        d="M8 7h4.2c1.9 0 3.4.5 4.6 1.6 1.2 1.1 1.8 2.7 1.8 4.8 0 2-0.6 3.6-1.8 4.7-1.2 1.1-2.7 1.6-4.6 1.6H8V7Zm1.7 6.2h1.8c1.2 0 2.1-.2 2.7-.8.6-.6.9-1.5.9-2.6 0-1.1-.3-1.9-.9-2.5-.6-.6-1.5-.8-2.7-.8H9.7v6.7Zm-1.5-.8h-.7v2.8h.7v-2.8Z"
        fill="#fff"
      />
    </svg>
  );
}

export function NagadLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" role="img" aria-label="Nagad logo" {...props}>
      <rect width="24" height="24" rx="6" fill="#f6921e" />
      <path
        d="M7 7h3.5l3.8 6.7V7h3.7v10h-3.5l-3.8-6.7V17H7V7Z"
        fill="#fff"
      />
    </svg>
  );
}

export function CodLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" role="img" aria-label="Cash on delivery logo" {...props}>
      <rect width="24" height="24" rx="6" fill="#111827" />
      <path
        d="M6 8h12a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2Z"
        fill="none"
        stroke="#fff"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9 10h4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M9 13h3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function PaymentLogo({
  method,
  ...props
}: { method: PaymentMethod } & SVGProps<SVGSVGElement>) {
  if (method === 'bkash') return <BkashLogo {...props} />;
  if (method === 'nagad') return <NagadLogo {...props} />;
  return <CodLogo {...props} />;
}
