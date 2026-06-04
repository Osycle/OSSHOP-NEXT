import { getProducts, getFilters } from '@/services/api';
import ShopClient from './ShopClient';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Shop — Osycle' };

export default async function ShopPage({
  searchParams,
}: {
  // В Next.js 15 searchParams является промисом
  searchParams: Promise<Record<string, string | string[]>>;
}) {
  // 1. Ожидаем параметры из URL (например, { brands: 'adidas', colors: ['red', 'blue'] })
  const params = await searchParams;

  // 2. Отправляем эти параметры прямо в Laravel через твой fetcher
  const [products, filters] = await Promise.all([
    getProducts(params),
    getFilters()
  ]);

  return <ShopClient products={products} filters={filters} />;
}