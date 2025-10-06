import RecipeGrid from '../components/recipes/RecipeGrid';

export default function FavoritesPage({ favoriteRecipes, favorites, onToggleFavorite, onSelectRecipe }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pb-28 md:pb-12">
      <main className="max-w-5xl mx-auto px-4 md:px-8 py-10 md:py-16 space-y-8">
        <header className="space-y-3 text-center md:text-left">
          <p className="text-sm uppercase tracking-[0.3em] text-rose-500 font-semibold">Koleksi Favorit</p>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-800">Resep Pilihanmu</h1>
          <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto md:mx-0">
            Simpan resep makanan dan minuman yang kamu sukai untuk diakses dengan cepat kapan saja.
          </p>
        </header>

        {favoriteRecipes.length === 0 ? (
          <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl p-10 text-center shadow-lg">
            <p className="text-lg font-semibold text-slate-600 mb-2">Belum ada resep favorit</p>
            <p className="text-slate-500">
              Jelajahi katalog resep, lalu tekan ikon hati untuk menambahkan makanan dan minuman favoritmu.
            </p>
          </div>
        ) : (
          <RecipeGrid
            recipes={favoriteRecipes}
            favorites={favorites}
            onToggleFavorite={onToggleFavorite}
            onSelectRecipe={onSelectRecipe}
          />
        )}
      </main>
    </div>
  );
}
