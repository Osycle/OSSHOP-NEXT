'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation'; 
import ProductCard from '@/components/ProductCard';
import ShopSidebar from '@/components/shop/ShopSidebar';
import ShopToolbar from '@/components/shop/ShopToolbar';
import ActiveFilters from '@/components/shop/ActiveFilters';
import Pagination from '@/components/shop/Pagination';
import type { Product } from '@/types/product';

const ITEMS_PER_PAGE = 9;

export default function ShopClient({ products, filters }: { products: Product[], filters: any }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Локальный стейт только для переключения вида (Сетка/Список)
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');

  // Читаем базовые параметры из URL для тулбара и пагинации
  const showSale = searchParams.get('sale') === 'true';
  const sortBy   = searchParams.get('sort') || 'Sorting';
  const page     = Number(searchParams.get('page')) || 1;
  const activeType = searchParams.get('type') || '';

  // Проверка на наличие фильтров (для отображения блока ActiveFilters)
  const defaultMinPrice = filters?.priceRange?.min || 0;
  const defaultMaxPrice = filters?.priceRange?.max || 300;
  const hasFilters = !!(
    activeType || 
    searchParams.getAll('sizes').length || 
    searchParams.getAll('colors').length || 
    searchParams.getAll('brands').length || 
    (Number(searchParams.get('min_price')) || defaultMinPrice) > defaultMinPrice || 
    (Number(searchParams.get('max_price')) || defaultMaxPrice) < defaultMaxPrice
  );

  // Универсальная функция обновления URL
  const updateFilter = (key: string, value: string | string[] | boolean | number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === '' || value === false || (Array.isArray(value) && value.length === 0)) {
      params.delete(key);
    } else if (Array.isArray(value)) {
      params.delete(key);
      value.forEach(v => params.append(key, v));
    } else {
      params.set(key, String(value));
    }

    if (key !== 'page') params.delete('page');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const clearAll = () => router.push(pathname, { scroll: false });

  // Временная пагинация на клиенте (пока бэкенд не возвращает мета-данные пагинации)
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const paginated  = products.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <>
      <div className="breadcrumb-block style-img">
        <div className="breadcrumb-main bg-linear overflow-hidden">
          <div className="container lg:pt-[134px] pt-24 pb-10 relative">
            <div className="main-content w-full h-full flex flex-col items-center justify-center relative z-[1]">
              <div className="text-content">
                <div className="heading2 text-center">Shop</div>
                <div className="link flex items-center justify-center gap-1 caption1 mt-3">
                  <Link href="/">Homepage</Link>
                  <i className="ph ph-caret-right text-sm text-secondary2"></i>
                  <span className="text-secondary2 capitalize">Shop</span>
                </div>
              </div>
              <div className="filter-type menu-tab flex flex-wrap items-center justify-center gap-y-5 gap-8 lg:mt-[70px] mt-12 overflow-hidden">
                {(filters?.types || []).slice(0, 5).map((type: any) => (
                  <div
                    key={type.slug}
                    className={`item tab-item text-button-uppercase cursor-pointer has-line-before line-2px${activeType === type.slug ? ' active' : ''}`}
                    onClick={() => updateFilter('type', activeType === type.slug ? '' : type.slug)}
                  >
                    {type.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="shop-product breadcrumb1 lg:py-20 md:py-14 py-10">
        <div className="container">
          <div className="flex max-md:flex-wrap max-md:flex-col-reverse gap-y-8 items-start">
            
            {/* Левый сайдбар (все фильтры) */}
            <ShopSidebar filters={filters} updateFilter={updateFilter} />

            <div className="list-product-block style-grid lg:w-3/4 md:w-2/3 w-full md:pl-3">
              
              {/* Верхняя панель (Вид, Сортировка) */}
              <ShopToolbar 
                layout={layout} 
                setLayout={setLayout} 
                showSale={showSale} 
                sortBy={sortBy} 
                updateFilter={updateFilter} 
              />

              {/* Активные фильтры */}
              {hasFilters && (
                <ActiveFilters updateFilter={updateFilter} clearAll={clearAll} />
              )}

              {/* Сетка товаров */}
              <div className={`list-product hide-product-sold grid ${layout === 'grid' ? 'lg:grid-cols-3 grid-cols-2' : 'grid-cols-1'} sm:gap-[30px] gap-[20px] mt-7`}>
                {paginated.length > 0
                  ? paginated.map(product => <ProductCard key={product.id} product={product} showSoldBar={false} />)
                  : <div className="col-span-full text-center py-20 text-secondary">No products found matching your filters.</div>
                }
              </div>

              {/* Пагинация */}
              <Pagination 
                page={page} 
                totalPages={totalPages} 
                onPageChange={(p) => updateFilter('page', p)} 
              />

            </div>
          </div>
        </div>
      </div>
    </>
  );
}