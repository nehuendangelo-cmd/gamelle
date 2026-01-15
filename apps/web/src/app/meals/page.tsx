'use client';

import { useState } from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';

import { Header, Footer } from '@/components/landing';
import { MealCard, MealCardSkeleton, type MealCardProps } from '@/components/meal-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Mock data pour la démo
const MOCK_MEALS: MealCardProps[] = [
  {
    id: '1',
    title: 'Poulet Basquaise maison',
    description: 'Un délicieux poulet mijoté avec des poivrons et tomates du jardin. Accompagné de riz basmati.',
    imageUrl: undefined,
    cookName: 'Marie Dupont',
    cookAvatarUrl: undefined,
    cookRating: 4.8,
    tokenPrice: 2,
    pickupTime: 'Aujourd\'hui 19h',
    pickupLocation: 'Cluster 1',
    portionsAvailable: 3,
    totalPortions: 5,
    tags: ['Français', 'Sans gluten'],
    isHalal: true,
  },
  {
    id: '2',
    title: 'Pad Thaï végétarien',
    description: 'Nouilles de riz sautées avec légumes croquants, tofu et sauce tamarin.',
    imageUrl: undefined,
    cookName: 'Thomas Leroy',
    cookAvatarUrl: undefined,
    cookRating: 4.5,
    tokenPrice: 2,
    pickupTime: 'Demain 12h30',
    pickupLocation: 'Cafétéria',
    portionsAvailable: 4,
    totalPortions: 6,
    tags: ['Thaï', 'Asiatique'],
    isVegetarian: true,
  },
  {
    id: '3',
    title: 'Chili sin carne',
    description: 'Version vegan du classique texan, avec haricots rouges, maïs et épices fumées.',
    imageUrl: undefined,
    cookName: 'Sophie Martin',
    cookAvatarUrl: undefined,
    cookRating: 4.9,
    tokenPrice: 1,
    pickupTime: 'Aujourd\'hui 20h',
    pickupLocation: 'Cluster 3',
    portionsAvailable: 2,
    totalPortions: 4,
    tags: ['Mexicain', 'Épicé'],
    isVegan: true,
  },
  {
    id: '4',
    title: 'Tajine d\'agneau aux pruneaux',
    description: 'Recette traditionnelle marocaine avec amandes grillées et semoule fine.',
    imageUrl: undefined,
    cookName: 'Karim Benali',
    cookAvatarUrl: undefined,
    cookRating: 4.7,
    tokenPrice: 3,
    pickupTime: 'Demain 19h30',
    pickupLocation: 'Entrée principale',
    portionsAvailable: 0,
    totalPortions: 4,
    tags: ['Marocain', 'Traditionnel'],
    isHalal: true,
  },
  {
    id: '5',
    title: 'Quiche lorraine',
    description: 'Quiche crémeuse aux lardons et gruyère. Pâte brisée maison.',
    imageUrl: undefined,
    cookName: 'Jean-Pierre Blanc',
    cookAvatarUrl: undefined,
    cookRating: 4.3,
    tokenPrice: 1,
    pickupTime: 'Aujourd\'hui 12h',
    pickupLocation: 'Cluster 2',
    portionsAvailable: 6,
    totalPortions: 8,
    tags: ['Français', 'Classique'],
  },
  {
    id: '6',
    title: 'Buddha Bowl quinoa',
    description: 'Bowl équilibré avec quinoa, houmous, légumes rôtis et sauce tahini.',
    imageUrl: undefined,
    cookName: 'Emma Rodriguez',
    cookAvatarUrl: undefined,
    cookRating: 4.6,
    tokenPrice: 2,
    pickupTime: 'Demain 13h',
    pickupLocation: 'Terrasse',
    portionsAvailable: 5,
    totalPortions: 5,
    tags: ['Healthy', 'Bowl'],
    isVegan: true,
  },
];

const FILTERS = ['Tous', 'Végétarien', 'Vegan', 'Halal', 'Sans gluten'];

export default function MealsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('Tous');
  const [isLoading] = useState(false);

  // Filtrage des plats
  const filteredMeals = MOCK_MEALS.filter((meal) => {
    const matchesSearch =
      meal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meal.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meal.cookName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      activeFilter === 'Tous' ||
      (activeFilter === 'Végétarien' && (meal.isVegetarian || meal.isVegan)) ||
      (activeFilter === 'Vegan' && meal.isVegan) ||
      (activeFilter === 'Halal' && meal.isHalal) ||
      (activeFilter === 'Sans gluten' && meal.tags?.includes('Sans gluten'));

    return matchesSearch && matchesFilter;
  });

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="container py-8">
          {/* Page header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Plats disponibles</h1>
            <p className="mt-2 text-muted-foreground">
              Découvrez les plats préparés par les étudiants 42
            </p>
          </div>

          {/* Search and filters */}
          <div className="mb-8 space-y-4">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un plat, un cuisinier..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>

            {/* Filter badges */}
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((filter) => (
                <Badge
                  key={filter}
                  variant={activeFilter === filter ? 'default' : 'outline'}
                  className={
                    activeFilter === filter
                      ? 'bg-terracotta hover:bg-terracotta/90 cursor-pointer'
                      : 'cursor-pointer hover:bg-accent'
                  }
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </Badge>
              ))}
            </div>
          </div>

          {/* Results count */}
          <p className="mb-4 text-sm text-muted-foreground">
            {filteredMeals.length} plat{filteredMeals.length > 1 ? 's' : ''} disponible
            {filteredMeals.length > 1 ? 's' : ''}
          </p>

          {/* Meals grid */}
          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <MealCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredMeals.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredMeals.map((meal) => (
                <MealCard
                  key={meal.id}
                  {...meal}
                  onViewDetails={() => console.log('View details:', meal.id)}
                  onReserve={() => console.log('Reserve:', meal.id)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Filter className="mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="text-lg font-semibold">Aucun plat trouvé</h3>
              <p className="mt-2 text-muted-foreground">
                Essayez de modifier vos filtres ou votre recherche
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilter('Tous');
                }}
              >
                Réinitialiser les filtres
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
