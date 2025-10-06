import { Search } from 'lucide-react';

const categories = [
  { id: 'all', label: 'Semua' },
  { id: 'Makanan', label: 'Makanan' },
  { id: 'Minuman', label: 'Minuman' },
];

export default function SearchFilterBar({ searchQuery, onSearchChange, categoryFilter, onCategoryChange, totalResults }) {
  return (
    <div className="bg-white/40 backdrop-blur-xl border border-white/30 rounded-3xl p-6 md:p-8 shadow-lg md:shadow-xl shadow-blue-500/10">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="lg:max-w-2xl w-full">
          <label htmlFor="search" className="block text-sm font-semibold text-slate-600 mb-2">
            Cari resep favoritmu
          </label>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              id="search"
              type="search"
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Masukkan nama makanan atau minuman..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/80 border border-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400 text-slate-700 placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="flex flex-col lg:items-end gap-4 w-full lg:w-auto">
          <div className="flex gap-2 bg-white/60 p-1 rounded-2xl border border-white/40">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  categoryFilter === category.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                    : 'text-slate-600 hover:text-blue-600'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
          <p className="text-sm text-slate-500 font-medium">
            {totalResults} resep tersedia
          </p>
        </div>
      </div>
    </div>
  );
}
