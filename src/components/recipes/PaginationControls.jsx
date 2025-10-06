import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function PaginationControls({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      <button
        onClick={handlePrev}
        className="p-2 rounded-xl bg-white/60 border border-white/40 text-slate-500 hover:text-blue-600 hover:bg-white transition-colors"
        disabled={currentPage === 1}
        aria-label="Halaman sebelumnya"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
            currentPage === page
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
              : 'bg-white/70 text-slate-600 hover:text-blue-600'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={handleNext}
        className="p-2 rounded-xl bg-white/60 border border-white/40 text-slate-500 hover:text-blue-600 hover:bg-white transition-colors"
        disabled={currentPage === totalPages}
        aria-label="Halaman selanjutnya"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
