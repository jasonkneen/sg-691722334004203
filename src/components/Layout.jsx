import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Home, PlusCircle, Search, User, Settings, FishIcon, ShipIcon, HookIcon } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { ErrorBoundary } from 'react-error-boundary';

console.log('Layout module is being loaded');

const ErrorFallback = ({ error }) => (
  <div className="text-center text-red-500">
    <h1>Something went wrong in the layout:</h1>
    <pre>{error.message}</pre>
  </div>
);

const Layout = ({ children }) => {
  console.log('Layout is being rendered');
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    console.log('Layout useEffect is running');
    setIsMounted(true);
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  if (typeof window === 'undefined') {
    console.log('Rendering server-side layout');
    return <div className="min-h-screen bg-background">{children}</div>;
  }

  if (!isMounted) {
    return null;
  }

  console.log('Rendering client-side layout');
  return (
<<<<<<< HEAD
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="flex flex-col h-full dark:bg-gray-900 dark:text-white">
        <header className="bg-background border-b border-border p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Fishing Journal</h1>
          <ThemeToggle />
        </header>
        {isDesktop && (
          <nav className="bg-background border-b border-border">
            <div className="container mx-auto px-4">
              <ul className="flex justify-center space-x-8 py-2">
                <li>
                  <Link href="/" className="text-muted-foreground hover:text-foreground">Home</Link>
                </li>
                <li>
                  <Link href="/search" className="text-muted-foreground hover:text-foreground">Search</Link>
                </li>
                <li>
                  <Link href="/add-entry" className="text-muted-foreground hover:text-foreground">Add Entry</Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">Dashboard</Link>
                </li>
              </ul>
            </div>
          </nav>
        )}
        <main className="flex-grow overflow-auto">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            {children}
          </ErrorBoundary>
        </main>
        {!isDesktop && (
          <nav className="bg-background border-t border-border mt-auto">
=======
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800 p-4">
      <div className="phone-container bg-white dark:bg-gray-900 rounded-[10px] shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl"></div>
        <div className="phone-content flex flex-col">
          <header className="bg-background border-b border-border p-4 flex justify-between items-center z-10">
            <h1 className="text-2xl font-bold">Piscator</h1>
            <ThemeToggle />
          </header>
          <main className="flex-grow overflow-y-auto">{children}</main>
          <nav className="bg-secondary border-t border-border">
>>>>>>> origin/main
            <div className="container mx-auto px-4">
              <ul className="flex justify-around py-2">
                <li>
                  <Link href="/" className="flex flex-col items-center text-muted-foreground hover:text-foreground">
<<<<<<< HEAD
                    <Home size={24} />
                    <span className="text-xs mt-1">Home</span>
                  </Link>
                </li>
                <li>
                  <Link href="/search" className="flex flex-col items-center text-muted-foreground hover:text-foreground">
                    <Search size={24} />
                    <span className="text-xs mt-1">Search</span>
                  </Link>
                </li>
=======
                    <FishIcon size={24} />
                    <span className="text-xs mt-1">Log</span>
                  </Link>
                </li>
              
>>>>>>> origin/main
                <li>
                  <Link href="/add-entry" className="flex flex-col items-center text-muted-foreground hover:text-foreground">
                    <PlusCircle size={24} />
                    <span className="text-xs mt-1">Add</span>
                  </Link>
                </li>
                <li>
<<<<<<< HEAD
                  <Link href="/dashboard" className="flex flex-col items-center text-muted-foreground hover:text-foreground">
                    <User size={24} />
                    <span className="text-xs mt-1">Dashboard</span>
=======
                  <Link href="/search" className="flex flex-col items-center text-muted-foreground hover:text-foreground">
                    <ShipIcon size={24} />
                    <span className="text-xs mt-1">Search</span>
                  </Link>
                </li>
                <li>
                  <Link href="/settings" className="flex flex-col items-center text-muted-foreground hover:text-foreground">
                    <Settings size={24} />
                    <span className="text-xs mt-1">Settings</span>
>>>>>>> origin/main
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
<<<<<<< HEAD
        )}
      </div>
    </ErrorBoundary>
=======
        </div>
      </div>
    </div>
>>>>>>> origin/main
  );
};

export default Layout;