'use client';

import Image from 'next/image';
import { Clock, MapPin, Users, Utensils } from 'lucide-react';

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';

export interface MealCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  cookName: string;
  cookAvatarUrl?: string;
  cookRating?: number;
  tokenPrice: number;
  pickupTime: string;
  pickupLocation: string;
  portionsAvailable: number;
  totalPortions: number;
  tags?: string[];
  isVegetarian?: boolean;
  isVegan?: boolean;
  isHalal?: boolean;
  onReserve?: () => void;
  onViewDetails?: () => void;
}

export function MealCard({
  title,
  description,
  imageUrl,
  cookName,
  cookAvatarUrl,
  cookRating,
  tokenPrice,
  pickupTime,
  pickupLocation,
  portionsAvailable,
  totalPortions,
  tags = [],
  isVegetarian,
  isVegan,
  isHalal,
  onReserve,
  onViewDetails,
}: MealCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const isAvailable = portionsAvailable > 0;

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      {/* Image */}
      <div className="relative aspect-[4/3] w-full bg-muted">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Utensils className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
        {/* Dietary badges */}
        <div className="absolute left-2 top-2 flex gap-1">
          {isVegan && (
            <Badge className="bg-green-600 text-white">Vegan</Badge>
          )}
          {isVegetarian && !isVegan && (
            <Badge className="bg-green-500 text-white">Végétarien</Badge>
          )}
          {isHalal && (
            <Badge className="bg-blue-600 text-white">Halal</Badge>
          )}
        </div>
        {/* Token price */}
        <div className="absolute right-2 top-2">
          <Badge variant="secondary" className="bg-terracotta text-white font-bold">
            {tokenPrice} {tokenPrice === 1 ? 'token' : 'tokens'}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-2">
        <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
      </CardHeader>

      <CardContent className="space-y-3 pb-3">
        {/* Cook info */}
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={cookAvatarUrl} alt={cookName} />
            <AvatarFallback>{getInitials(cookName)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{cookName}</p>
            {cookRating && (
              <p className="text-xs text-muted-foreground">
                ⭐ {cookRating.toFixed(1)}
              </p>
            )}
          </div>
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span className="truncate">{pickupTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span className="truncate">{pickupLocation}</span>
          </div>
        </div>

        {/* Portions */}
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <div className="flex-1">
            <div className="flex justify-between text-sm">
              <span>{portionsAvailable} portions disponibles</span>
              <span className="text-muted-foreground">/ {totalPortions}</span>
            </div>
            <div className="mt-1 h-2 w-full rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-sage transition-all"
                style={{ width: `${(portionsAvailable / totalPortions) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{tags.length - 3}
              </Badge>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="gap-2 pt-0">
        <Button
          variant="outline"
          className="flex-1"
          onClick={onViewDetails}
        >
          Détails
        </Button>
        <Button
          className="flex-1 bg-terracotta hover:bg-terracotta/90"
          disabled={!isAvailable}
          onClick={onReserve}
        >
          {isAvailable ? 'Réserver' : 'Épuisé'}
        </Button>
      </CardFooter>
    </Card>
  );
}

export function MealCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="aspect-[4/3] w-full" />
      <CardHeader className="pb-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full mt-2" />
      </CardHeader>
      <CardContent className="space-y-3 pb-3">
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="flex-1">
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
        <Skeleton className="h-4 w-full" />
      </CardContent>
      <CardFooter className="gap-2 pt-0">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 flex-1" />
      </CardFooter>
    </Card>
  );
}
