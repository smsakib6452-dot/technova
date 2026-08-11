import type { PaymentMethod } from '@/lib/types';
import type { SVGProps } from 'react';

export function BkashLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" role="img" aria-label="bKash logo" {...props}>
      <rect width="24" height="24" rx="6" fill="#e2136e" />
      <text
        x="50%"
        y="52%"
        fill="#fff"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="700"
        fontSize="10"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        bKash
      </text>
    </svg>
  );
}

export function NagadLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" role="img" aria-label="Nagad logo" {...props}>
      <rect width="24" height="24" rx="6" fill="#f6921e" />
      <text
        x="50%"
        y="52%"
        fill="#fff"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="700"
        fontSize="10"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        nagad
      </text>
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
