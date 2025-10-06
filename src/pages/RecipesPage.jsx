import { useEffect, useMemo, useState } from 'react';
import RecipeGrid from '../components/recipes/RecipeGrid';
import SearchFilterBar from '../components/recipes/SearchFilterBar';
import PaginationControls from '../components/recipes/PaginationControls';

const ITEMS_PER_PAGE = 6;

export default function RecipesPage({
  recipes,
  favorites,
  onToggleFavorite,
  onSelectRecipe,
  initialCategory = 'all',
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState(initialCategory);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCategoryFilter(initialCategory);
    setCurrentPage(1);
  }, [initialCategory]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, categoryFilter]);

  const filteredRecipes = useMemo(() => {
    const lowerCaseQuery = searchQuery.trim().toLowerCase();

    return recipes.filter((recipe) => {
      const matchesCategory = categoryFilter === 'all' || recipe.category === categoryFilter;
      const matchesQuery = lowerCaseQuery === '' || recipe.name.toLowerCase().includes(lowerCaseQuery);

      return matchesCategory && matchesQuery;
    });
  }, [recipes, searchQuery, categoryFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredRecipes.length / ITEMS_PER_PAGE));
  const paginatedRecipes = filteredRecipes.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pb-28 md:pb-12">
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16 space-y-10 md:space-y-14">
        <header className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-500 font-semibold">Koleksi Resep Nusantara</p>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-800">Jelajahi Makanan &amp; Minuman Favorit</h1>
          <p className="text-base md:text-lg text-slate-500 max-w-3xl">
            Temukan inspirasi hidangan lezat dan minuman segar dari seluruh penjuru Nusantara. Gunakan pencarian dan filter untuk menemukan resep terbaik sesuai selera Anda.
          </p>
        </header>

        <SearchFilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          categoryFilter={categoryFilter}
          onCategoryChange={setCategoryFilter}
          totalResults={filteredRecipes.length}
        />

        <RecipeGrid
          recipes={paginatedRecipes}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
          onSelectRecipe={onSelectRecipe}
        />

        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </main>
    </div>
  );
}
