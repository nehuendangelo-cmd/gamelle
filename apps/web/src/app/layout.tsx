import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import { Providers } from '@/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'January - Partage de Plats Faits Maison',
  description:
    'Plateforme de partage de plats faits maison entre étudiants 42. Partagez vos créations culinaires et découvrez celles de vos camarades.',
  keywords: ['42', 'école 42', 'food sharing', 'plats maison', 'étudiants'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
