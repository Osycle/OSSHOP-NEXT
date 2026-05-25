import mockDataProduct from '@/mocks/Product.json';
import mockDataBlog from '@/mocks/Blog.json';
import type { Product } from "@/types/product";
import type { Blog } from "@/types/blog";


export async function getProducts(): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return mockDataProduct as Product[];
}
export async function getBlog(): Promise<Blog[]> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return mockDataBlog as Blog[];
}

/* КОГДА ПОЯВИТСЯ РЕАЛЬНЫЙ API, ТЫ ПРОСТО ЗАМЕНИШЬ КОД ВЫШЕ НА:
  export async function getProducts(): Promise<Product[]> {
    const res = await fetch('https://api.osshop.com/products');
    if (!res.ok) throw new Error('Failed to fetch data');
    return res.json();
  }
*/