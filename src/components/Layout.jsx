import React from 'react';
import Link from 'next/link';
import { Home, PlusCircle, Search, User } from 'lucide-react';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">{children}</main>
      <nav className="bg-background border-t border-border">
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