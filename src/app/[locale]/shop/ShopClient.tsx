'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
// Используем стандартные хуки навигации Next.js
import { useRouter, usePathname, useSearchParams } from 'next/navigation'; 
import ProductCard from '@/components/ProductCard';
import type { Product } from '@/types/product';

const ITEMS_PER_PAGE = 9;

export default function ShopClient({ products, filters }: { products: Product[], filters: any }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams(); // Читаем URL

  // Данные для вывода кнопок фильтров
  const availableTypes  = filters?.types || [];
  const availableSizes  = filters?.sizes || [];
  const availableColors = filters?.colors || [];
  const availableBrands = filters?.brands || [];
  
  const defaultMinPrice = filters?.priceRange?.min || 0;
  const defaultMaxPrice = filters?.priceRange?.max || 300;

  // 1. ЧИТАЕМ АКТИВНЫЕ ФИЛЬТРЫ ПРЯМО ИЗ URL
  // Если в URL пусто, ставим значения по умолчанию
  const activeType   = searchParams.get('type') || '';
  const activeSizes  = searchParams.getAll('sizes'); // getAll вернет массив ['S', 'M']
  const activeColors = searchParams.getAll('colors');
  const activeBrands = searchParams.getAll('brands');
  const showSale     = searchParams.get('sale') === 'true';
  const priceMin     = Number(searchParams.get('min_price')) || defaultMinPrice;
  const priceMax     = Number(searchParams.get('max_price')) || defaultMaxPrice;
  const sortBy       = searchParams.get('sort') || 'Sorting';
  const page         = Number(searchParams.get('page')) || 1;

  // Локальный стейт только для переключения вида "Сетка/Список" (это не нужно слать на бэкенд)
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');

  // Подсчет товаров по категориям (оставляем локально, если бэкенд не присылает счетчики)
  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    availableTypes.forEach((t: any) => { 
      counts[t.slug] = products.filter(p => p.type === t.slug).length; 
    });
    return counts;
  }, [products, availableTypes]);

  // 2. УНИВЕРСАЛЬНАЯ ФУНКЦИЯ ОБНОВЛЕНИЯ URL
  // При вызове она меняет URL браузера, Next.js это замечает, 
  // делает запрос на сервер (page.tsx) и отдает нам новые products!
  const updateFilter = (key: string, value: string | string[] | boolean | number) => {
    const params = new URLSearchParams(searchParams.toString());

    // Если значение пустое - удаляем фильтр из URL
    if (value === '' || value === false || (Array.isArray(value) && value.length === 0)) {
      params.delete(key);
    } 
    // Если это массив (например, выбрали два бренда)
    else if (Array.isArray(value)) {
      params.delete(key);
      value.forEach(v => params.append(key, v)); // Создаст ?brands=nike&brands=adidas
    } 
    // Обычное значение
    else {
      params.set(key, String(value));
    }

    // При любом изменении фильтра скидываем пагинацию на 1 страницу
    if (key !== 'page') params.delete('page');

    // Обновляем адресную строку без скролла наверх
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Хелперы для кликов по чекбоксам
  const toggleSize  = (s: string) => updateFilter('sizes', activeSizes.includes(s) ? activeSizes.filter(x => x !== s) : [...activeSizes, s]);
  const toggleColor = (c: string) => updateFilter('colors', activeColors.includes(c) ? activeColors.filter(x => x !== c) : [...activeColors, c]);
  const toggleBrand = (b: string) => updateFilter('brands', activeBrands.includes(b) ? activeBrands.filter(x => x !== b) : [...activeBrands, b]);
  const handleType  = (t: string) => updateFilter('type', activeType === t ? '' : t);

  const hasFilters = !!(activeType || activeSizes.length || activeColors.length || activeBrands.length || priceMin > defaultMinPrice || priceMax < defaultMaxPrice);
  const clearAll = () => router.push(pathname, { scroll: false }); // Просто очищаем URL

  const priceRangeDiff = defaultMaxPrice - defaultMinPrice || 1;
  const progressLeft = ((priceMin - defaultMinPrice) / priceRangeDiff) * 100;
  const progressRight = 100 - ((priceMax - defaultMinPrice) / priceRangeDiff) * 100;

  // Пагинация (временно нарезаем массив клиента, если Laravel пока не отдает постраничную навигацию)
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
                {availableTypes.slice(0, 5).map((type: any) => (
                  <div
                    key={type.slug}
                    className={`item tab-item text-button-uppercase cursor-pointer has-line-before line-2px${activeType === type.slug ? ' active' : ''}`}
                    onClick={() => handleType(type.slug)}
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
          <div className="flex max-md:flex-wrap max-md:flex-col-reverse gap-y-8">

            {/* ── Sidebar ── */}
            <div className="sidebar lg:w-1/4 md:w-1/3 w-full md:pr-12">
              <div className="filter-type-block pb-8 border-b border-line">
                <div className="heading6">Products Type</div>
                <div className="list-type filter-type menu-tab mt-4">
                  {availableTypes.map((type: any) => (
                    <div
                      key={type.slug}
                      className={`item tab-item flex items-center justify-between cursor-pointer${activeType === type.slug ? ' active' : ''}`}
                      onClick={() => handleType(type.slug)}
                    >
                      <div className="type-name text-secondary has-line-before hover:text-black capitalize">{type.name}</div>
                      <div className="text-secondary2 number">{typeCounts[type.slug] ?? 0}</div>
                    </div>
                  ))}
                </div>
              </div>

              {availableSizes.length > 0 && (
                <div className="filter-size pb-8 border-b border-line mt-8">
                  <div className="heading6">Size</div>
                  <div className="list-size flex items-center flex-wrap gap-3 gap-y-4 mt-4">
                    {availableSizes.map((size: string) => (
                      <div
                        key={size}
                        className={`size-item text-button flex items-center justify-center rounded-full border border-line cursor-pointer${activeSizes.includes(size) ? ' active border-black bg-black text-white' : ''} px-4 py-2`}
                        onClick={() => toggleSize(size)}
                      >
                        {size}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="filter-price pb-8 border-b border-line mt-8">
                <div className="heading6">Price Range</div>
                <div className="tow-bar-block mt-5 relative w-full h-1 bg-line rounded-full">
                  <div className="progress absolute h-full bg-black rounded-full" style={{ left: `${progressLeft}%`, right: `${progressRight}%` }} />
                </div>
                <div className="range-input relative w-full mt-2">
                  <input
                    type="range" min={defaultMinPrice} max={defaultMaxPrice} value={priceMin} className="range-min absolute w-full -top-3 opacity-0 cursor-pointer pointer-events-auto"
                    onChange={e => { const v = +e.target.value; if (v < priceMax) updateFilter('min_price', v); }}
                  />
                  <input
                    type="range" min={defaultMinPrice} max={defaultMaxPrice} value={priceMax} className="range-max absolute w-full -top-3 opacity-0 cursor-pointer pointer-events-auto"
                    onChange={e => { const v = +e.target.value; if (v > priceMin) updateFilter('max_price', v); }}
                  />
                </div>
                <div className="price-block flex items-center justify-between flex-wrap mt-4">
                  <div className="min flex items-center gap-1">
                    <span>Min price:</span><span className="min-price font-semibold">${priceMin}</span>
                  </div>
                  <div className="min flex items-center gap-1">
                    <span>Max price:</span><span className="max-price font-semibold">${priceMax}</span>
                  </div>
                </div>
              </div>

              {availableColors.length > 0 && (
                <div className="filter-color pb-8 border-b border-line mt-8">
                  <div className="heading6">Colors</div>
                  <div className="list-color flex items-center flex-wrap gap-3 gap-y-4 mt-4">
                    {availableColors.map(({ name, code }: any) => (
                      <div
                        key={name}
                        className={`color-item px-3 py-[5px] flex items-center justify-center gap-2 rounded-full border cursor-pointer duration-300 ${activeColors.includes(name) ? ' border-black' : ' border-line hover:border-black'}`}
                        onClick={() => toggleColor(name)}
                      >
                        <div className="color w-5 h-5 rounded-full border border-black/10" style={{ backgroundColor: code }} />
                        <div className="caption1 capitalize">{name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {availableBrands.length > 0 && (
                <div className="filter-brand pb-8 mt-8">
                  <div className="heading6">Brands</div>
                  <div className="list-brand mt-4">
                    {availableBrands.map((brand: any) => (
                      <div key={brand.slug} className={`brand-item flex items-center justify-between mb-2 last:mb-0 ${activeBrands.includes(brand.slug) ? ' active' : ''}`}>
                        <div className="left flex items-center cursor-pointer gap-2" onClick={() => toggleBrand(brand.slug)}>
                          <div className="block-input flex items-center justify-center w-5 h-5 border border-line rounded">
                            {activeBrands.includes(brand.slug) && <i className="ph-bold ph-check text-xs" />}
                          </div>
                          <label className="brand-name capitalize cursor-pointer">{brand.name}</label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── Product area ── */}
            <div className="list-product-block style-grid lg:w-3/4 md:w-2/3 w-full md:pl-3">
              <div className="filter-heading flex items-center justify-between gap-5 flex-wrap">
                <div className="left flex items-center flex-wrap gap-5">
                  <div className="choose-layout menu-tab flex items-center gap-2">
                    <div className={`item tab-item style-grid three-col p-2 border border-line rounded flex items-center justify-center cursor-pointer${layout === 'grid' ? ' active bg-black text-white' : ''}`} onClick={() => setLayout('grid')}>
                      <i className="ph-bold ph-squares-four text-lg" />
                    </div>
                    <div className={`item tab-item style-list row p-2 border border-line rounded flex items-center justify-center cursor-pointer${layout === 'list' ? ' active bg-black text-white' : ''}`} onClick={() => setLayout('list')}>
                      <i className="ph-bold ph-list text-lg" />
                    </div>
                  </div>
                  <div className="check-sale flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" id="filter-sale" checked={showSale} onChange={e => updateFilter('sale', e.target.checked)} className="border-line w-5 h-5 rounded cursor-pointer" />
                    <label htmlFor="filter-sale" className="caption1 cursor-pointer">Show only products on sale</label>
                  </div>
                </div>
                <div className="sort-product right flex items-center gap-3">
                  <label htmlFor="select-filter" className="caption1 capitalize">Sort by</label>
                  <div className="select-block relative">
                    <select id="select-filter" value={sortBy} onChange={e => updateFilter('sort', e.target.value)} className="caption1 py-2 pl-3 md:pr-10 pr-8 rounded-lg border border-line appearance-none outline-none">
                      <option value="Sorting">Sorting</option>
                      <option value="soldQuantityHighToLow">Best Selling</option>
                      <option value="discountHighToLow">Best Discount</option>
                      <option value="priceHighToLow">Price High To Low</option>
                      <option value="priceLowToHigh">Price Low To High</option>
                    </select>
                    <i className="ph ph-caret-down absolute top-1/2 -translate-y-1/2 md:right-3 right-2 pointer-events-none" />
                  </div>
                </div>
              </div>

              {hasFilters && (
                <div className="list-filtered flex items-center gap-3 flex-wrap mt-4">
                  <div className="list flex items-center gap-2 flex-wrap">
                    {activeType && (
                      <div className="item flex gap-1 items-center px-3 py-1 border border-line rounded-full caption1 cursor-pointer hover:border-black" onClick={() => updateFilter('type', '')}>
                        <span className="capitalize">{activeType}</span><i className="ph ph-x text-xs" />
                      </div>
                    )}
                    {activeSizes.map(s => (
                      <div key={s} className="item flex gap-1 items-center px-3 py-1 border border-line rounded-full caption1 cursor-pointer hover:border-black" onClick={() => toggleSize(s)}>
                        <span>{s}</span><i className="ph ph-x text-xs" />
                      </div>
                    ))}
                    {activeColors.map(c => (
                      <div key={c} className="item flex gap-1 items-center px-3 py-1 border border-line rounded-full caption1 cursor-pointer hover:border-black" onClick={() => toggleColor(c)}>
                        <span className="capitalize">{c}</span><i className="ph ph-x text-xs" />
                      </div>
                    ))}
                    {activeBrands.map(b => (
                      <div key={b} className="item flex gap-1 items-center px-3 py-1 border border-line rounded-full caption1 cursor-pointer hover:border-black" onClick={() => toggleBrand(b)}>
                        <span className="capitalize">{b}</span><i className="ph ph-x text-xs" />
                      </div>
                    ))}
                  </div>
                  <button className="clear-btn caption1 text-red cursor-pointer underline hover:text-black transition-colors" onClick={clearAll}>Clear All</button>
                </div>
              )}

              <div className={`list-product hide-product-sold grid ${layout === 'grid' ? 'lg:grid-cols-3 grid-cols-2' : 'grid-cols-1'} sm:gap-[30px] gap-[20px] mt-7`}>
                {paginated.length > 0
                  ? paginated.map(product => <ProductCard key={product.id} product={product} showSoldBar={false} />)
                  : <div className="col-span-full text-center py-20 text-secondary">No products found matching your filters.</div>
                }
              </div>

              {totalPages > 1 && (
                <div className="list-pagination w-full flex items-center justify-center gap-4 mt-10">
                  <button onClick={() => updateFilter('page', page - 1)} disabled={page === 1} className={`w-10 h-10 flex items-center justify-center rounded-full border border-line duration-300 ${page === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black hover:text-white'}`}>
                    <i className="ph-bold ph-caret-left" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                    <button key={p} className={`w-10 h-10 flex items-center justify-center rounded-full border duration-300 ${p === page ? 'bg-black text-white border-black font-semibold' : 'border-line hover:bg-black hover:text-white'}`} onClick={() => updateFilter('page', p)}>
                      {p}
                    </button>
                  ))}
                  <button onClick={() => updateFilter('page', page + 1)} disabled={page === totalPages} className={`w-10 h-10 flex items-center justify-center rounded-full border border-line duration-300 ${page === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black hover:text-white'}`}>
                    <i className="ph-bold ph-caret-right" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}