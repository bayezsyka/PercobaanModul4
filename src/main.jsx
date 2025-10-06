// src/main.jsx
import { StrictMode, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import SplashScreen from './pages/SplashScreen';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import RecipesPage from './pages/RecipesPage';
import FavoritesPage from './pages/FavoritesPage';
import DetailPage from './pages/DetailPage';
import DesktopNavbar from './components/navbar/DesktopNavbar';
import MobileNavbar from './components/navbar/MobileNavbar';
import { ResepMakanan } from './data/makanan';
import { ResepMinuman } from './data/minuman';
import './index.css';
import PWABadge from './PWABadge';

function AppRoot() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const [favorites, setFavorites] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [previousPage, setPreviousPage] = useState('home');
  const [catalogCategory, setCatalogCategory] = useState('all');

  const allRecipes = useMemo(() => {
    const makanan = Object.values(ResepMakanan.resep).map((recipe) => ({
      ...recipe,
      id: `makanan-${recipe.id}`,
      category: 'Makanan',
    }));

    const minuman = Object.values(ResepMinuman.resep).map((recipe) => ({
      ...recipe,
      id: `minuman-${recipe.id}`,
      category: 'Minuman',
    }));

    return [...makanan, ...minuman];
  }, []);

  const favoriteRecipes = useMemo(
    () => allRecipes.filter((recipe) => favorites.includes(recipe.id)),
    [allRecipes, favorites],
  );

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleToggleFavorite = (recipeId) => {
    setFavorites((prev) => (
      prev.includes(recipeId)
        ? prev.filter((id) => id !== recipeId)
        : [...prev, recipeId]
    ));
  };

  const handleSelectRecipe = (recipeId) => {
    const recipe = allRecipes.find((item) => item.id === recipeId);
    if (recipe) {
      setPreviousPage(currentPage);
      setSelectedRecipe(recipe);
      setCurrentPage('detail');
    }
  };

  const handleNavigation = (page, options = {}) => {
    if (page === 'recipes') {
      setCatalogCategory(options.category ?? 'all');
    }

    if (page !== 'detail') {
      setSelectedRecipe(null);
    }

    if (page === 'detail' && options.recipeId) {
      handleSelectRecipe(options.recipeId);
    } else {
      setCurrentPage(page);
    }
  };

  const handleBackFromDetail = () => {
    const fallback = previousPage === 'detail' ? 'recipes' : previousPage;
    setCurrentPage(fallback || 'home');
    setSelectedRecipe(null);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigation} onSelectRecipe={handleSelectRecipe} />;
      case 'recipes':
        return (
          <RecipesPage
            recipes={allRecipes}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onSelectRecipe={handleSelectRecipe}
            initialCategory={catalogCategory}
          />
        );
      case 'favorites':
        return (
          <FavoritesPage
            favoriteRecipes={favoriteRecipes}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onSelectRecipe={handleSelectRecipe}
          />
        );
      case 'detail':
        return (
          <DetailPage
            recipe={selectedRecipe}
            onBack={handleBackFromDetail}
            isFavorite={selectedRecipe ? favorites.includes(selectedRecipe.id) : false}
            onToggleFavorite={handleToggleFavorite}
          />
        );
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage onNavigate={handleNavigation} onSelectRecipe={handleSelectRecipe} />;
    }
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DesktopNavbar currentPage={currentPage} onNavigate={handleNavigation} />

      <main className="min-h-screen">
        {renderCurrentPage()}
      </main>

      <MobileNavbar currentPage={currentPage} onNavigate={handleNavigation} />

      <PWABadge />
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRoot />
  </StrictMode>,
);
