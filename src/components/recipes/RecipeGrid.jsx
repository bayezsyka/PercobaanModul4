import RecipeCard from './RecipeCard';

export default function RecipeGrid({ recipes, favorites, onToggleFavorite, onSelectRecipe }) {
  if (recipes.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-500 text-lg font-medium">Resep tidak ditemukan. Coba kata kunci atau kategori lain.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
      {recipes.map((recipe, index) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          index={index}
          isFavorite={favorites.includes(recipe.id)}
          onToggleFavorite={onToggleFavorite}
          onSelectRecipe={onSelectRecipe}
        />
      ))}
    </div>
  );
}
