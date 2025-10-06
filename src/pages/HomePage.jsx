// src/pages/HomePage.jsx
import HeroSection from '../components/home/HeroSection';
import FeaturedMakananSection from '../components/home/FeaturedMakananSection';
import FeaturedMinumanSection from '../components/home/FeaturedMinumanSection';
import { ResepMakanan } from '../data/makanan';
import { ResepMinuman } from '../data/minuman';

export default function HomePage({ onNavigate, onSelectRecipe }) {
  const featuredMakanan = Object.values(ResepMakanan.resep)
    .slice(0, 3)
    .map((recipe) => ({ ...recipe, id: `makanan-${recipe.id}`, category: 'Makanan' }));

  const featuredMinuman = Object.values(ResepMinuman.resep)
    .slice(0, 2)
    .map((recipe) => ({ ...recipe, id: `minuman-${recipe.id}`, category: 'Minuman' }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pb-20 md:pb-8">
      <HeroSection onNavigate={onNavigate} />

      <main className="max-w-7xl mx-auto px-4 md:px-8 space-y-12 md:space-y-16">
        <FeaturedMakananSection
          featuredMakanan={featuredMakanan}
          onSeeAll={() => onNavigate?.('recipes', { category: 'Makanan' })}
          onSelectRecipe={onSelectRecipe}
        />
        <FeaturedMinumanSection
          featuredMinuman={featuredMinuman}
          onSeeAll={() => onNavigate?.('recipes', { category: 'Minuman' })}
          onSelectRecipe={onSelectRecipe}
        />
      </main>
    </div>
  );
}
