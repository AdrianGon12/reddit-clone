import Navbar from '@/components/Navbar';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Reddit clone',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
  authModal,
}: {
  children: React.ReactNode;
  authModal: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      className={cn(
        'bg-white text-slate-900 antialiased light',
        inter.className
      )}
    >
      <body className='min-h-screen pt-12 bg-slate-50 antialised'>
        <Navbar />

        {authModal}

        <div className='container max-w-3xl mx-auto h-full pt-12'>
          {children}
        </div>

        <Toaster />
      </body>
    </html>
  );
}