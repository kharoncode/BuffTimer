import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/layout/header/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
   title: 'BuffTimer',
   description: 'Application pour visualier/gérer les buffs entres joueurs',
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="fr">
         <body className={inter.className}>
            <Header />
            <main>{children}</main>
         </body>
      </html>
   );
}
