import { ArrowLeft, ChefHat, CupSoda, Heart } from 'lucide-react';

export default function DetailPage({ recipe, onBack, isFavorite, onToggleFavorite }) {
  if (!recipe) {
    return null;
  }

  const Icon = recipe.category === 'Makanan' ? ChefHat : CupSoda;

  const handleFavorite = () => {
    onToggleFavorite(recipe.id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pb-28 md:pb-12">
      <main className="max-w-5xl mx-auto px-4 md:px-8 py-10 md:py-16 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Kembali
          </button>

          <button
            onClick={handleFavorite}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border transition-colors duration-200 ${
              isFavorite
                ? 'bg-rose-500 border-rose-500 text-white'
                : 'bg-white/70 border-white/60 text-slate-600 hover:text-rose-500'
            }`}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
            {isFavorite ? 'Hapus dari Favorit' : 'Simpan ke Favorit'}
          </button>
        </div>

        <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl overflow-hidden shadow-xl">
          <div className="relative h-72 md:h-96">
            <img
              src={recipe.image_url}
              alt={recipe.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="inline-flex items-center gap-2 bg-white/90 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                <Icon className="w-4 h-4" />
                {recipe.category}
              </span>
            </div>
          </div>

          <div className="p-8 md:p-12 space-y-10">
            <header className="space-y-4">
              <h1 className="text-3xl md:text-5xl font-bold text-slate-800 leading-tight">{recipe.name}</h1>
              <p className="text-slate-500 max-w-2xl">
                Resep {recipe.category.toLowerCase()} pilihan dengan {recipe.ingredients.length} bahan dan {recipe.steps.length} langkah mudah diikuti.
              </p>
            </header>

            <section className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/60 rounded-2xl border border-white/40 p-6 space-y-4 shadow-sm">
                <h2 className="text-xl font-semibold text-slate-800">Bahan-bahan</h2>
                <ul className="space-y-3 text-slate-600">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-blue-500/70" />
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/60 rounded-2xl border border-white/40 p-6 space-y-4 shadow-sm">
                <h2 className="text-xl font-semibold text-slate-800">Langkah Memasak</h2>
                <ol className="space-y-3 text-slate-600 list-decimal list-inside">
                  {recipe.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
