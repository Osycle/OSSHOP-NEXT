import { getProducts } from '@/services/api';
import Client from './Client';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Shop — Anvogue' };

export default async function ShopPage() {
  const products = await getProducts();
  return <Client products={products} />;
}
