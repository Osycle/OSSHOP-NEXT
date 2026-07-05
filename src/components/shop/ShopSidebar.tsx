'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

interface ShopSidebarProps {
  filters: any;
  updateFilter: (key: string, value: string | string[] | boolean | number) => void;
}

export default function ShopSidebar({ filters, updateFilter }: ShopSidebarProps) {
  const searchParams = useSearchParams();

  // Данные для вывода
  const availableTypes  = filters?.types || [];
  const availableSizes  = filters?.sizes || [];
  const availableColors = filters?.colors || [];
  const availableBrands = filters?.brands || [];
  
  const defaultMinPrice = filters?.priceRange?.min || 0;
  const defaultMaxPrice = filters?.priceRange?.max || 300;

  // Читаем активные фильтры из URL
  const activeType   = searchParams.get('type') || '';
  const activeSizes  = searchParams.getAll('sizes');
  const activeColors = searchParams.getAll('colors');
  const activeBrands = searchParams.getAll('brands');
  const priceMin     = Number(searchParams.get('min_price')) || defaultMinPrice;
  const priceMax     = Number(searchParams.get('max_price')) || defaultMaxPrice;

  // Стейт для кнопок "Show More"
  const [expandedBlocks, setExpandedBlocks] = useState<Record<string, boolean>>({});
  const toggleExpand = (blockName: string) => {
    setExpandedBlocks(prev => ({ ...prev, [blockName]: !prev[blockName] }));
  };

  // Хелперы для кликов
  const toggleSize  = (s: string) => updateFilter('sizes', activeSizes.includes(s) ? activeSizes.filter((x: string) => x !== s) : [...activeSizes, s]);
  const toggleColor = (c: string) => updateFilter('colors', activeColors.includes(c) ? activeColors.filter((x: string) => x !== c) : [...activeColors, c]);
  const toggleBrand = (b: string) => updateFilter('brands', activeBrands.includes(b) ? activeBrands.filter((x: string) => x !== b) : [...activeBrands, b]);
  const handleType  = (t: string) => updateFilter('type', activeType === t ? '' : t);

  // Вычисления для ползунка цены
  const priceRangeDiff = defaultMaxPrice - defaultMinPrice || 1;
  const progressLeft = ((priceMin - defaultMinPrice) / priceRangeDiff) * 100;
  const progressRight = 100 - ((priceMax - defaultMinPrice) / priceRangeDiff) * 100;

  return (
    <div className="sidebar lg:w-1/4 md:w-1/3 w-full md:pr-12">
      
      {/* ── Products Type ── */}
      <div className="filter-type-block pb-8 border-b border-line">
        <div className="heading6">Products Type</div>
        <div className={`list-type filter-type list-bar menu-tab mt-4 transition-all duration-300 ${expandedBlocks['types'] ? 'max-h-[240px] overflow-y-auto pr-2' : ''}`}>
          {(expandedBlocks['types'] ? availableTypes : availableTypes.slice(0, 5)).map((type: any) => (
            <div
              key={type.slug}
              className={`item tab-item flex items-center justify-between cursor-pointer mb-2 last:mb-0 ${activeType === type.slug ? ' active' : ''}`}
              onClick={() => handleType(type.slug)}
            >
              <div className="type-name text-secondary has-line-before hover:text-black capitalize">{type.name}</div>
              <div className="text-secondary2 number text-sm">{type.count ?? 0}</div>
            </div>
          ))}
        </div>
        {availableTypes.length > 5 && (
          <div className="text-button text-secondary mt-3 cursor-pointer hover:text-black transition-colors flex items-center gap-1" onClick={() => toggleExpand('types')}>
            {expandedBlocks['types'] ? <>Show Less <i className="ph ph-caret-up text-sm" /></> : <>+ {availableTypes.length - 5} More <i className="ph ph-caret-down text-sm" /></>}
          </div>
        )}
      </div>

      {/* ── Size ── */}
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

      {/* ── Price Range ── */}
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

      {/* ── Colors ── */}
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

      {/* ── Brands ── */}
      {availableBrands.length > 0 && (
        <div className="filter-brand pb-8 mt-8">
          <div className="heading6">Brands</div>
          <div className={`list-brand list-bar mt-4 transition-all duration-300 ${expandedBlocks['brands'] ? 'max-h-[240px] overflow-y-auto pr-2' : ''}`}>
            {(expandedBlocks['brands'] ? availableBrands : availableBrands.slice(0, 5)).map((brand: any) => (
              <div key={brand.slug} className={`brand-item flex items-center justify-between mb-2 last:mb-0 ${activeBrands.includes(brand.slug) ? ' active' : ''}`}>
                <div className="left flex items-center cursor-pointer gap-2" onClick={() => toggleBrand(brand.slug)}>
                  <div className="block-input flex items-center justify-center w-5 h-5 border border-line rounded">
                    {activeBrands.includes(brand.slug) && <i className="ph-bold ph-check text-xs" />}
                  </div>
                  <label className="brand-name capitalize cursor-pointer">{brand.name}</label>
                </div>
                <div className="text-secondary2 number text-sm">{brand.count || 0}</div>
              </div>
            ))}
          </div>
          {availableBrands.length > 5 && (
            <div className="text-button text-secondary mt-3 cursor-pointer hover:text-black transition-colors flex items-center gap-1" onClick={() => toggleExpand('brands')}>
              {expandedBlocks['brands'] ? <>Show Less <i className="ph ph-caret-up text-sm" /></> : <>+ {availableBrands.length - 5} More <i className="ph ph-caret-down text-sm" /></>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}