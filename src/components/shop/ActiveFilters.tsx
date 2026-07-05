'use client';
import { useSearchParams } from 'next/navigation';

interface ActiveFiltersProps {
  updateFilter: (key: string, value: string | string[]) => void;
  clearAll: () => void;
}

export default function ActiveFilters({ updateFilter, clearAll }: ActiveFiltersProps) {
  const searchParams = useSearchParams();

  // Читаем параметры напрямую из URL
  const activeType   = searchParams.get('type') || '';
  const activeSizes  = searchParams.getAll('sizes');
  const activeColors = searchParams.getAll('colors');
  const activeBrands = searchParams.getAll('brands');

  // Функции для удаления конкретного фильтра из массива
  const removeSize  = (s: string) => updateFilter('sizes', activeSizes.filter(x => x !== s));
  const removeColor = (c: string) => updateFilter('colors', activeColors.filter(x => x !== c));
  const removeBrand = (b: string) => updateFilter('brands', activeBrands.filter(x => x !== b));

  return (
    <div className="list-filtered flex items-center gap-3 flex-wrap mt-4">
      <div className="list flex items-center gap-2 flex-wrap">
        {activeType && (
          <div className="item flex gap-1 items-center px-3 py-1 border border-line rounded-full caption1 cursor-pointer hover:border-black" onClick={() => updateFilter('type', '')}>
            <span className="capitalize">{activeType}</span><i className="ph ph-x text-xs" />
          </div>
        )}
        {activeSizes.map(s => (
          <div key={s} className="item flex gap-1 items-center px-3 py-1 border border-line rounded-full caption1 cursor-pointer hover:border-black" onClick={() => removeSize(s)}>
            <span>{s}</span><i className="ph ph-x text-xs" />
          </div>
        ))}
        {activeColors.map(c => (
          <div key={c} className="item flex gap-1 items-center px-3 py-1 border border-line rounded-full caption1 cursor-pointer hover:border-black" onClick={() => removeColor(c)}>
            <span className="capitalize">{c}</span><i className="ph ph-x text-xs" />
          </div>
        ))}
        {activeBrands.map(b => (
          <div key={b} className="item flex gap-1 items-center px-3 py-1 border border-line rounded-full caption1 cursor-pointer hover:border-black" onClick={() => removeBrand(b)}>
            <span className="capitalize">{b}</span><i className="ph ph-x text-xs" />
          </div>
        ))}
      </div>
      <button className="clear-btn caption1 text-red cursor-pointer underline hover:text-black transition-colors" onClick={clearAll}>
        Clear All
      </button>
    </div>
  );
}