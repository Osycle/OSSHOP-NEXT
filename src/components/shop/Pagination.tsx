'use client';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (p: number) => void;
}

export default function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null; // Скрываем, если страница всего одна

  return (
    <div className="list-pagination w-full flex items-center justify-center gap-4 mt-10">
      <button 
        onClick={() => onPageChange(page - 1)} 
        disabled={page === 1} 
        className={`w-10 h-10 flex items-center justify-center rounded-full border border-line duration-300 ${page === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black hover:text-white'}`}
      >
        <i className="ph-bold ph-caret-left" />
      </button>
      
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
        <button 
          key={p} 
          className={`w-10 h-10 flex items-center justify-center rounded-full border duration-300 ${p === page ? 'bg-black text-white border-black font-semibold' : 'border-line hover:bg-black hover:text-white'}`} 
          onClick={() => onPageChange(p)}
        >
          {p}
        </button>
      ))}
      
      <button 
        onClick={() => onPageChange(page + 1)} 
        disabled={page === totalPages} 
        className={`w-10 h-10 flex items-center justify-center rounded-full border border-line duration-300 ${page === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black hover:text-white'}`}
      >
        <i className="ph-bold ph-caret-right" />
      </button>
    </div>
  );
}