import { getProducts, getProductBySlug } from '@/services/api';
import { notFound } from 'next/navigation';
import ProductClient from './ProductClient';
import type { Metadata } from 'next';

// export async function generateStaticParams() {
//   const products = await getProducts();
//   return products.map(p => ({ slug: p.slug }));
// }

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  
  // Выводим правильное брендирование в title вкладки
  return { title: product ? `${product.name} — Osycle` : 'Product — Osycle' };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  // 1. Сначала получаем только сам товар
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  // 2. Получаем товары для блока "Related".
  // Примечание: пока фильтруем массив на сервере фронтенда. 
  // Когда настроишь фильтры в Laravel, лучше передавать параметры в функцию: 
  const related = await getProducts({ brand: product.type, limit: 1 });
  

  // 3. Передаем в клиентский компонент ТОЛЬКО необходимые данные.
  // Мы убрали allProducts={all}, чтобы не отправлять всю базу данных 
  // в HTML-код браузера пользователя.
  return <ProductClient product={product} related={related} />;
}