'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import type { Product } from '@/types/product';

const TYPES = ['t-shirt', 'dress', 'top', 'swimwear', 'shirt', 'underwear', 'sets', 'accessories'];
const SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL', 'freesize'];
const COLORS = [
  { name: 'pink',   code: '#F4C5BF' },
  { name: 'red',    code: '#DB4444' },
  { name: 'green',  code: '#52B788' },
  { name: 'yellow', code: '#ECB018' },
  { name: 'purple', code: '#8684D4' },
  { name: 'black',  code: '#1F1F1F' },
  { name: 'white',  code: '#F6EFDD' },
];
const BRANDS = ['adidas', 'hermes', 'zara', 'nike', 'gucci'];
const ITEMS_PER_PAGE = 9;

export default function ShopClient({ products }: { products: Product[] }) {
  const [activeType, setActiveType]     = useState('');
  const [activeSizes, setActiveSizes]   = useState<string[]>([]);
  const [activeColors, setActiveColors] = useState<string[]>([]);
  const [activeBrands, setActiveBrands] = useState<string[]>([]);
  const [showSale, setShowSale]         = useState(false);
  const [priceMin, setPriceMin]         = useState(0);
  const [priceMax, setPriceMax]         = useState(300);
  const [sortBy, setSortBy]             = useState('Sorting');
  const [layout, setLayout]             = useState<'grid' | 'list'>('grid');
  const [page, setPage]                 = useState(1);

  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    TYPES.forEach(t => { counts[t] = products.filter(p => p.type === t).length; });
    return counts;
  }, [products]);

  const filtered = useMemo(() => {
    let list = [...products];
    if (activeType)        list = list.filter(p => p.type === activeType);
    if (activeSizes.length) list = list.filter(p => activeSizes.some(s => p.sizes.includes(s)));
    if (activeColors.length) list = list.filter(p => activeColors.some(c => p.variation.some(v => v.color === c)));
    if (activeBrands.length) list = list.filter(p => activeBrands.includes(p.brand));
    if (showSale)           list = list.filter(p => p.sale);
    list = list.filter(p => p.price >= priceMin && p.price <= priceMax);
    if (sortBy === 'soldQuantityHighToLow') list.sort((a, b) => b.sold - a.sold);
    if (sortBy === 'discountHighToLow')    list.sort((a, b) => (b.originPrice - b.price) / b.originPrice - (a.originPrice - a.price) / a.originPrice);
    if (sortBy === 'priceHighToLow')       list.sort((a, b) => b.price - a.price);
    if (sortBy === 'priceLowToHigh')       list.sort((a, b) => a.price - b.price);
    return list;
  }, [products, activeType, activeSizes, activeColors, activeBrands, showSale, priceMin, priceMax, sortBy]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated  = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const reset = (fn: () => void) => { fn(); setPage(1); };

  const toggleSize  = (s: string) => reset(() => setActiveSizes(prev  => prev.includes(s)  ? prev.filter(x => x !== s)  : [...prev, s]));
  const toggleColor = (c: string) => reset(() => setActiveColors(prev => prev.includes(c)  ? prev.filter(x => x !== c)  : [...prev, c]));
  const toggleBrand = (b: string) => reset(() => setActiveBrands(prev => prev.includes(b)  ? prev.filter(x => x !== b)  : [...prev, b]));
  const handleType  = (t: string) => reset(() => setActiveType(prev   => prev === t ? '' : t));

  const hasFilters = !!(activeType || activeSizes.length || activeColors.length || activeBrands.length);
  const clearAll   = () => { setActiveType(''); setActiveSizes([]); setActiveColors([]); setActiveBrands([]); setPage(1); };

  return (
    <>
      {/* Breadcrumb hero */}
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
                {['t-shirt', 'dress', 'top', 'swimwear', 'shirt'].map(type => (
                  <div
                    key={type}
                    className={`item tab-item text-button-uppercase cursor-pointer has-line-before line-2px${activeType === type ? ' active' : ''}`}
                    onClick={() => handleType(type)}
                  >
                    {type}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shop body */}
      <div className="shop-product breadcrumb1 lg:py-20 md:py-14 py-10">
        <div className="container">
          <div className="flex max-md:flex-wrap max-md:flex-col-reverse gap-y-8">

            {/* ── Sidebar ── */}
            <div className="sidebar lg:w-1/4 md:w-1/3 w-full md:pr-12">

              {/* Type */}
              <div className="filter-type-block pb-8 border-b border-line">
                <div className="heading6">Products Type</div>
                <div className="list-type filter-type menu-tab mt-4">
                  {TYPES.map(type => (
                    <div
                      key={type}
                      className={`item tab-item flex items-center justify-between cursor-pointer${activeType === type ? ' active' : ''}`}
                      onClick={() => handleType(type)}
                    >
                      <div className="type-name text-secondary has-line-before hover:text-black capitalize">{type}</div>
                      <div className="text-secondary2 number">{typeCounts[type] ?? 0}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div className="filter-size pb-8 border-b border-line mt-8">
                <div className="heading6">Size</div>
                <div className="list-size flex items-center flex-wrap gap-3 gap-y-4 mt-4">
                  {SIZES.map(size => (
                    <div
                      key={size}
                      className={`size-item text-button flex items-center justify-center rounded-full border border-line cursor-pointer${activeSizes.includes(size) ? ' active' : ''}${size === 'freesize' ? ' px-4 py-2' : ' w-[44px] h-[44px]'}`}
                      onClick={() => toggleSize(size)}
                    >
                      {size === 'freesize' ? 'Freesize' : size}
                    </div>
                  ))}
                </div>
              </div>

              {/* Price range */}
              <div className="filter-price pb-8 border-b border-line mt-8">
                <div className="heading6">Price Range</div>
                <div className="tow-bar-block mt-5">
                  <div
                    className="progress"
                    style={{ left: `${(priceMin / 300) * 100}%`, right: `${100 - (priceMax / 300) * 100}%` }}
                  />
                </div>
                <div className="range-input">
                  <input
                    type="range" min={0} max={300} value={priceMin} className="range-min"
                    onChange={e => { const v = +e.target.value; if (v < priceMax) { setPriceMin(v); setPage(1); } }}
                  />
                  <input
                    type="range" min={0} max={300} value={priceMax} className="range-max"
                    onChange={e => { const v = +e.target.value; if (v > priceMin) { setPriceMax(v); setPage(1); } }}
                  />
                </div>
                <div className="price-block flex items-center justify-between flex-wrap mt-4">
                  <div className="min flex items-center gap-1">
                    <span>Min price:</span>
                    <span className="min-price">${priceMin}</span>
                  </div>
                  <div className="min flex items-center gap-1">
                    <span>Max price:</span>
                    <span className="max-price">${priceMax}</span>
                  </div>
                </div>
              </div>

              {/* Color */}
              <div className="filter-color pb-8 border-b border-line mt-8">
                <div className="heading6">Colors</div>
                <div className="list-color flex items-center flex-wrap gap-3 gap-y-4 mt-4">
                  {COLORS.map(({ name, code }) => (
                    <div
                      key={name}
                      className={`color-item px-3 py-[5px] flex items-center justify-center gap-2 rounded-full border cursor-pointer${activeColors.includes(name) ? ' border-black' : ' border-line'}`}
                      onClick={() => toggleColor(name)}
                    >
                      <div className="color w-5 h-5 rounded-full" style={{ backgroundColor: code }} />
                      <div className="caption1 capitalize">{name}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div className="filter-brand pb-8 mt-8">
                <div className="heading6">Brands</div>
                <div className="list-brand mt-4">
                  {BRANDS.map(brand => (
                    <div
                      key={brand}
                      className={`brand-item flex items-center justify-between${activeBrands.includes(brand) ? ' active' : ''}`}
                    >
                      <div className="left flex items-center cursor-pointer" onClick={() => toggleBrand(brand)}>
                        <div className="block-input">
                          <input type="checkbox" readOnly checked={activeBrands.includes(brand)} />
                          <i className="ph-fill ph-check-square icon-checkbox text-2xl" />
                        </div>
                        <label className="brand-name capitalize pl-2 cursor-pointer">{brand}</label>
                      </div>
                      <div className="text-secondary2 number">
                        {products.filter(p => p.brand === brand).length}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Product area ── */}
            <div className="list-product-block style-grid lg:w-3/4 md:w-2/3 w-full md:pl-3">

              {/* Filter bar */}
              <div className="filter-heading flex items-center justify-between gap-5 flex-wrap">
                <div className="left flex has-line items-center flex-wrap gap-5">
                  <div className="choose-layout menu-tab flex items-center gap-2">
                    <div
                      className={`item tab-item style-grid three-col p-2 border border-line rounded flex items-center justify-center cursor-pointer${layout === 'grid' ? ' active' : ''}`}
                      onClick={() => setLayout('grid')}
                    >
                      <div className="flex items-center gap-0.5">
                        <span className="w-[3px] h-4 bg-secondary2 rounded-sm" />
                        <span className="w-[3px] h-4 bg-secondary2 rounded-sm" />
                        <span className="w-[3px] h-4 bg-secondary2 rounded-sm" />
                      </div>
                    </div>
                    <div
                      className={`item tab-item style-list row w-8 h-8 border border-line rounded flex items-center justify-center cursor-pointer${layout === 'list' ? ' active' : ''}`}
                      onClick={() => setLayout('list')}
                    >
                      <div className="flex flex-col items-center gap-0.5">
                        <span className="w-4 h-[3px] bg-secondary2 rounded-sm" />
                        <span className="w-4 h-[3px] bg-secondary2 rounded-sm" />
                        <span className="w-4 h-[3px] bg-secondary2 rounded-sm" />
                      </div>
                    </div>
                  </div>
                  <div className="check-sale flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      id="filter-sale"
                      checked={showSale}
                      onChange={e => { setShowSale(e.target.checked); setPage(1); }}
                      className="border-line"
                    />
                    <label htmlFor="filter-sale" className="caption1 cursor-pointer">
                      Show only products on sale
                    </label>
                  </div>
                </div>
                <div className="sort-product right flex items-center gap-3">
                  <label htmlFor="select-filter" className="caption1 capitalize">Sort by</label>
                  <div className="select-block relative">
                    <select
                      id="select-filter"
                      value={sortBy}
                      onChange={e => { setSortBy(e.target.value); setPage(1); }}
                      className="caption1 py-2 pl-3 md:pr-20 pr-10 rounded-lg border border-line"
                    >
                      <option value="Sorting">Sorting</option>
                      <option value="soldQuantityHighToLow">Best Selling</option>
                      <option value="discountHighToLow">Best Discount</option>
                      <option value="priceHighToLow">Price High To Low</option>
                      <option value="priceLowToHigh">Price Low To High</option>
                    </select>
                    <i className="ph ph-caret-down absolute top-1/2 -translate-y-1/2 md:right-4 right-2" />
                  </div>
                </div>
              </div>

              {/* Active filter chips */}
              {hasFilters && (
                <div className="list-filtered flex items-center gap-3 flex-wrap mt-4">
                  <div className="list flex items-center gap-3 flex-wrap">
                    {activeType && (
                      <div className="item flex gap-1 items-center px-3 py-1 border border-line rounded-full caption1 cursor-pointer" onClick={() => reset(() => setActiveType(''))}>
                        <span className="capitalize">{activeType}</span>
                        <i className="ph ph-x text-xs" />
                      </div>
                    )}
                    {activeSizes.map(s => (
                      <div key={s} className="item flex gap-1 items-center px-3 py-1 border border-line rounded-full caption1 cursor-pointer" onClick={() => toggleSize(s)}>
                        <span>{s}</span>
                        <i className="ph ph-x text-xs" />
                      </div>
                    ))}
                    {activeColors.map(c => (
                      <div key={c} className="item flex gap-1 items-center px-3 py-1 border border-line rounded-full caption1 cursor-pointer" onClick={() => toggleColor(c)}>
                        <span className="capitalize">{c}</span>
                        <i className="ph ph-x text-xs" />
                      </div>
                    ))}
                    {activeBrands.map(b => (
                      <div key={b} className="item flex gap-1 items-center px-3 py-1 border border-line rounded-full caption1 cursor-pointer" onClick={() => toggleBrand(b)}>
                        <span className="capitalize">{b}</span>
                        <i className="ph ph-x text-xs" />
                      </div>
                    ))}
                  </div>
                  <button className="clear-btn caption1 text-red cursor-pointer" onClick={clearAll}>
                    Clear All
                  </button>
                </div>
              )}

              {/* Grid */}
              <div className={`list-product hide-product-sold grid ${layout === 'grid' ? 'lg:grid-cols-3 grid-cols-2' : 'grid-cols-1'} sm:gap-[30px] gap-[20px] mt-7`}>
                {paginated.length > 0
                  ? paginated.map(product => <ProductCard key={product.id} product={product} showSoldBar />)
                  : <div className="col-span-3 text-center py-10 text-secondary">No products found</div>
                }
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="list-pagination w-full flex items-center gap-4 mt-10">
                  <button onClick={() => setPage(p => p - 1)} disabled={page === 1} className={page === 1 ? 'disabled' : ''}>
                    <i className="ph ph-caret-left" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                    <button key={p} className={p === page ? 'active' : ''} onClick={() => setPage(p)}>{p}</button>
                  ))}
                  <button onClick={() => setPage(p => p + 1)} disabled={page === totalPages} className={page === totalPages ? 'disabled' : ''}>
                    <i className="ph ph-caret-right" />
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
