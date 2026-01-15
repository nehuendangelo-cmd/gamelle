'use client';

import Link from 'next/link';
import { ChefHat, Users, Leaf, ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <ChefHat className="h-8 w-8 text-terracotta" />
          <span className="text-xl font-bold">January</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/meals" className="text-sm font-medium hover:text-terracotta transition-colors">
            Plats disponibles
          </Link>
          <Link href="/how-it-works" className="text-sm font-medium hover:text-terracotta transition-colors">
            Comment ça marche
          </Link>
        </nav>
        <Button asChild className="bg-terracotta hover:bg-terracotta/90">
          <Link href="/api/auth/42">
            Se connecter avec 42
          </Link>
        </Button>
      </div>
    </header>
  );
}

export function Hero() {
  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-b from-cream to-background">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Partagez vos{' '}
            <span className="text-terracotta">plats faits maison</span>{' '}
            entre étudiants 42
          </h1>
          <p className="mt-6 text-lg text-muted-foreground md:text-xl">
            January connecte les étudiants de l'école 42 pour partager des repas 
            cuisinés maison. Économisez, découvrez de nouvelles saveurs et 
            créez des liens autour de la table.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild className="bg-terracotta hover:bg-terracotta/90">
              <Link href="/api/auth/42">
                Commencer maintenant
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/meals">
                Voir les plats disponibles
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Features() {
  const features = [
    {
      icon: ChefHat,
      title: 'Cuisinez et partagez',
      description:
        'Proposez vos plats faits maison et gagnez des tokens à utiliser pour réserver d\'autres repas.',
    },
    {
      icon: Users,
      title: 'Communauté 42',
      description:
        'Connectez-vous exclusivement avec d\'autres étudiants de l\'école 42 via OAuth.',
    },
    {
      icon: Leaf,
      title: 'Économique & Écologique',
      description:
        'Réduisez le gaspillage alimentaire et économisez sur vos repas quotidiens.',
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">
          Pourquoi January ?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-terracotta/10">
                  <feature.icon className="h-6 w-6 text-terracotta" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Connectez-vous',
      description: 'Utilisez votre compte 42 pour vous inscrire en un clic.',
    },
    {
      number: '02',
      title: 'Cuisinez ou réservez',
      description: 'Proposez un plat pour gagner des tokens ou réservez avec vos tokens.',
    },
    {
      number: '03',
      title: 'Récupérez votre repas',
      description: 'Retrouvez le cuisinier au lieu de rendez-vous convenu.',
    },
    {
      number: '04',
      title: 'Notez et recommencez',
      description: 'Laissez une note et découvrez de nouveaux plats chaque jour.',
    },
  ];

  return (
    <section className="py-20 bg-sage/10">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">
          Comment ça marche ?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="mb-4 text-5xl font-bold text-terracotta/20">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t py-12 bg-background">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ChefHat className="h-6 w-6 text-terracotta" />
            <span className="font-semibold">January</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 January. Fait avec ❤️ par des étudiants 42.
          </p>
          <nav className="flex gap-4 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground">
              Confidentialité
            </Link>
            <Link href="/terms" className="hover:text-foreground">
              CGU
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
