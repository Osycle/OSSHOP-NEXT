'use client';

interface ShopToolbarProps {
  layout: 'grid' | 'list';
  setLayout: (layout: 'grid' | 'list') => void;
  showSale: boolean;
  sortBy: string;
  updateFilter: (key: string, value: string | boolean | number) => void;
}

export default function ShopToolbar({ layout, setLayout, showSale, sortBy, updateFilter }: ShopToolbarProps) {
  return (
    <div className="filter-heading flex items-center justify-between gap-5 flex-wrap">
      <div className="left flex items-center flex-wrap gap-5">
        <div className="choose-layout menu-tab flex items-center gap-2">
          <div 
            className={`item tab-item style-grid three-col p-2 border border-line rounded flex items-center justify-center cursor-pointer${layout === 'grid' ? ' active bg-black text-white' : ''}`} 
            onClick={() => setLayout('grid')}
          >
            <i className="ph-bold ph-squares-four text-lg" />
          </div>
          <div 
            className={`item tab-item style-list row p-2 border border-line rounded flex items-center justify-center cursor-pointer${layout === 'list' ? ' active bg-black text-white' : ''}`} 
            onClick={() => setLayout('list')}
          >
            <i className="ph-bold ph-list text-lg" />
          </div>
        </div>
        <div className="check-sale flex items-center gap-2 cursor-pointer">
          <input 
            type="checkbox" 
            id="filter-sale" 
            checked={showSale} 
            onChange={e => updateFilter('sale', e.target.checked)} 
            className="border-line w-5 h-5 rounded cursor-pointer" 
          />
          <label htmlFor="filter-sale" className="caption1 cursor-pointer">Show only products on sale</label>
        </div>
      </div>
      
      <div className="sort-product right flex items-center gap-3">
        <label htmlFor="select-filter" className="caption1 capitalize">Sort by</label>
        <div className="select-block relative">
          <select 
            id="select-filter" 
            value={sortBy} 
            onChange={e => updateFilter('sort', e.target.value)} 
            className="caption1 py-2 pl-3 md:pr-10 pr-8 rounded-lg border border-line appearance-none outline-none"
          >
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
  );
}