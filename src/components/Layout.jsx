import React from 'react';
import Link from 'next/link';
import { Home, PlusCircle, Search, User } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900 dark:text-white">
      <header className="bg-background border-b border-border p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-10">
      <h1 className="text-2xl font-bold">Piscator</h1>
      <ThemeToggle />
      </header>
      <main>{children}</main>
      <nav className="bg-secondary border-t-border bottom-0 left-0 right-0 z-10 fixed">
        <div className="container mx-auto px-4">
          <ul className="flex justify-around py-2">
            <li>
              <Link href="/" className="flex flex-col items-center text-muted-foreground hover:text-foreground">
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
            <li>
              <Link href="/add-entry" className="flex flex-col items-center text-muted-foreground hover:text-foreground">
                <PlusCircle size={24} />
                <span className="text-xs mt-1">Add</span>
              </Link>
            </li>
            <li>
              <Link href="/profile" className="flex flex-col items-center text-muted-foreground hover:text-foreground">
                <User size={24} />
                <span className="text-xs mt-1">Profile</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Layout;