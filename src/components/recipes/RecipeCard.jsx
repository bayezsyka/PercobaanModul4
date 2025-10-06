import { useRef, useEffect, useState } from 'react';
import { Clock, ChefHat, CupSoda, Heart } from 'lucide-react';

export default function RecipeCard({
  recipe,
  isFavorite,
  onToggleFavorite,
  onSelectRecipe,
  index,
}) {
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), (index % 3) * 120);
        }
      });
    }, { threshold: 0.15 });

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [index]);

  const handleCardClick = () => {
    if (onSelectRecipe) {
      onSelectRecipe(recipe.id);
    }
  };

  const handleFavoriteClick = (event) => {
    event.stopPropagation();
    onToggleFavorite(recipe.id);
  };

  return (
    <div
      ref={cardRef}
      onClick={handleCardClick}
      className={`group transform transition-all duration-700 cursor-pointer ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
    >
      <div className="relative bg-white/15 backdrop-blur-xl border border-white/30 rounded-3xl overflow-hidden shadow-lg md:shadow-2xl shadow-blue-500/10 hover:shadow-blue-500/30 transition-all duration-500 group-hover:scale-[1.02]">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <button
          onClick={handleFavoriteClick}
          className={`absolute top-4 right-4 z-20 rounded-full p-2 backdrop-blur bg-white/80 transition-colors duration-200 hover:bg-white ${
            isFavorite ? 'text-rose-600' : 'text-slate-400'
          }`}
          aria-label={isFavorite ? 'Hapus dari favorit' : 'Tambah ke favorit'}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        <div className="relative h-48 overflow-hidden">
          <img
            src={recipe.image_url}
            alt={recipe.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 p-6 space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-blue-700 bg-blue-100/90 px-3 py-1 rounded-full">
              {recipe.category}
            </span>
            <div className="flex items-center space-x-2 bg-white/85 px-3 py-1 rounded-full text-xs font-semibold text-slate-700">
              {recipe.category === 'Makanan' ? (
                <ChefHat className="w-4 h-4" />
              ) : (
                <CupSoda className="w-4 h-4" />
              )}
              <span>{recipe.steps.length} langkah</span>
            </div>
          </div>

          <h3 className="font-bold text-slate-800 text-lg md:text-xl leading-tight group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
            {recipe.name}
          </h3>

          <div className="flex items-center justify-between text-sm text-slate-600">
            <div className="flex items-center space-x-2 bg-white/70 px-3 py-2 rounded-full">
              <Clock className="w-4 h-4" />
              <span className="font-medium">{recipe.ingredients.length} bahan</span>
            </div>
            <span className="text-xs text-slate-500">
              Klik untuk detail
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
