import { getProducts, getProductBySlug } from '@/services/api';
import { notFound } from 'next/navigation';
import ProductClient from './ProductClient';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return { title: product ? `${product.name} — Anvogue` : 'Product — Anvogue' };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [product, all] = await Promise.all([getProductBySlug(slug), getProducts()]);

  if (!product) notFound();

  const related = all
    .filter(p => p.type === product.type && p.id !== product.id)
    .slice(0, 8);

  return <ProductClient product={product} related={related} allProducts={all} />;
}
