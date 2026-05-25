import { getProducts } from '@/services/api';
import ShopClient from './ShopClient';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Shop — Anvogue' };

export default async function ShopPage() {
  const products = await getProducts();
  return <ShopClient products={products} />;
}
