import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, RotateCcw, ShieldCheck, Truck, Headphones } from 'lucide-react';
import { categories, getFeaturedProducts } from '@/lib/data/products';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product/product-card';

const valueProps = [
  {
    icon: Truck,
    title: 'Free Fast Shipping',
    description: 'Free delivery on orders over $150, usually within 3 days.',
  },
  {
    icon: RotateCcw,
    title: '30-Day Returns',
    description: 'Changed your mind? Send it back within 30 days, no questions.',
  },
  {
    icon: ShieldCheck,
    title: '2-Year Warranty',
    description: 'Every product is covered by our hassle-free warranty.',
  },
  {
    icon: Headphones,
    title: 'Expert Support',
    description: 'Real humans on call 24/7 to help you get set up.',
  },
];

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <>
      <section className="relative overflow-hidden bg-ink-900 text-white">
        <div className="pointer-events-none absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2000&q=80"
            alt=""
            fill
            className="object-cover opacity-25"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/80 to-transparent" />
        </div>

        <div className="container relative flex min-h-[520px] flex-col justify-center py-24 lg:min-h-[620px]">
          <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider backdrop-blur">
            New season tech has landed
          </span>
          <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            The gear you need to{' '}
            <span className="text-brand-400">build the future.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-ink-200">
            From flagship laptops to pro audio, TECHNOVA stocks the technology you
            trust — hand-picked, fully tested and backed by expert support.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/catalog">
              <Button size="lg" className="group">
                Shop the collection
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
            <Link href="/catalog?category=laptops">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 bg-white/10 text-white hover:border-white/50 hover:bg-white/20"
              >
                Browse laptops
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="container py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">
              Shop by category
            </h2>
            <p className="mt-1 text-ink-500">Find exactly what you are looking for.</p>
          </div>
          <Link
            href="/catalog"
            className="hidden items-center gap-1 text-sm font-semibold text-brand-700 hover:underline sm:flex"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/catalog?category=${category.slug}`}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-ink-900/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3">
                <h3 className="text-sm font-bold text-white">{category.name}</h3>
                <p className="mt-0.5 hidden text-xs text-white/70 md:block">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">
                Featured products
              </h2>
              <p className="mt-1 text-ink-500">
                Our bestsellers and freshest arrivals, curated for you.
              </p>
            </div>
            <Link
              href="/catalog"
              className="hidden items-center gap-1 text-sm font-semibold text-brand-700 hover:underline sm:flex"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="container py-16">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {valueProps.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-2xl border border-ink-200 bg-white p-6 shadow-card"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold text-ink-900">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-500">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
