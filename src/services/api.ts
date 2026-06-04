import { fetcher } from './fetcher';
import type { Product } from "@/types/product";
import type { Blog } from "@/types/blog";


// Универсальный интерфейс для ответов Laravel
export interface LaravelResponse<T> {
  data: T;
  meta?: any;  // На будущее, для пагинации
  links?: any; // На будущее
}

export interface ProductFilters {
  categories: string[];
  colors: { name: string; colorCode: string }[]; // или просто string[]
  sizes: string[];
  brands: string[];
  minPrice: number;
  maxPrice: number;
}


// Запрашиваем реальные товары с бэкенда
export async function getProducts(
  params?: Record<string, string | number | (string | number)[]>
): Promise<Product[]> {
  // Передаем params внутрь объекта options для нашего fetcher'а
  const response = await fetcher<LaravelResponse<Product[]>>('products', { 
    params 
  }); 
  
  return response?.data || [];
}

export async function getFilters(): Promise<any> {
  const response = await fetcher<any>('products/filters/all');
  return response || null;
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {  
  const response = await fetcher<LaravelResponse<Product>>(`products/${slug}`);
  return response?.data || undefined;
}



// Блог пока можно оставить на моках, если API для него еще не готово,
// или тоже перевести на fetcher:
import mockDataBlog from '@/mocks/Blog.json';
export async function getBlog(): Promise<Blog[]> {
  return mockDataBlog as Blog[];
}