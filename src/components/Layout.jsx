import React from 'react';
import Link from 'next/link';
import { Home, PlusCircle, Search, User, Settings, FishIcon, ShipIcon, HookIcon } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

const Layout = ({ children }) => {
  return (
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
            <div className="container mx-auto px-4">
              <ul className="flex justify-around py-2">
                <li>
                  <Link href="/" className="flex flex-col items-center text-muted-foreground hover:text-foreground">
                    <FishIcon size={24} />
                    <span className="text-xs mt-1">Log</span>
                  </Link>
                </li>
              
                <li>
                  <Link href="/add-entry" className="flex flex-col items-center text-muted-foreground hover:text-foreground">
                    <PlusCircle size={24} />
                    <span className="text-xs mt-1">Add</span>
                  </Link>
                </li>
                <li>
                  <Link href="/search" className="flex flex-col items-center text-muted-foreground hover:text-foreground">
                    <ShipIcon size={24} />
                    <span className="text-xs mt-1">Search</span>
                  </Link>
                </li>
                <li>
                  <Link href="/settings" className="flex flex-col items-center text-muted-foreground hover:text-foreground">
                    <Settings size={24} />
                    <span className="text-xs mt-1">Settings</span>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Layout;