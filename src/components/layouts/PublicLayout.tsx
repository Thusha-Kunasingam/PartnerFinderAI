import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Footer } from './Footer';

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-canvas-base">
      {/* Top Navbar */}
      <header className="h-16 px-8 bg-surface-container-lowest border-b border-border-standard flex items-center justify-between sticky top-0 z-20">
        <Link to="/" className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary-container text-[24px]">hub</span>
          <span className="text-headline-sm font-headline-sm font-bold text-on-surface tracking-tight">
            PartnerFinder AI
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-label-md font-label-md text-on-surface-variant font-medium">
          <Link to="/" className="hover:text-on-surface transition-colors">Home</Link>
          <a href="#how-it-works" className="hover:text-on-surface transition-colors">How It Works</a>
          <a href="#success-stories" className="hover:text-on-surface transition-colors">Success Stories</a>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="h-10 px-4 rounded-lg bg-surface-container-lowest border border-border-standard text-on-surface font-label-md text-label-md font-medium hover:bg-surface-container-low transition-all flex items-center justify-center"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="h-10 px-4 rounded-lg bg-gradient-to-r from-primary-container to-secondary-container text-white font-label-md text-label-md font-medium hover:brightness-105 shadow-sm transition-all flex items-center justify-center"
          >
            Register
          </Link>
        </div>
      </header>

      {/* Main Page Outlet */}
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
};
