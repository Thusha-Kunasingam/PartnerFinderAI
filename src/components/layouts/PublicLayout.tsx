import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Footer } from './Footer';
import { MaterialIcon } from '../common/MaterialIcon';

export const PublicLayout: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9ff] text-[#0b1c30]">
      {/* Top Navigation Bar (Shared Stitch Component: TopNavBar) */}
      <header className="bg-[#0b1c30] border-b border-[#5e667d]/40 shadow-sm w-full sticky top-0 z-50">
        <div className="flex justify-between items-center w-full px-8 max-w-[1440px] mx-auto h-16">
          {/* Brand Logo / Product Name */}
          <Link
            to="/"
            className="text-[20px] font-bold text-white flex items-center gap-2 hover:opacity-95 transition-opacity"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7c3aed] to-[#2170e4] flex items-center justify-center text-white shadow-sm">
              <MaterialIcon icon="hub" size={20} />
            </div>
            <span>PartnerFinder AI</span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/#home"
              className="text-white font-medium text-[14px] transition-all duration-150 hover:text-white active:scale-[0.98]"
            >
              Home
            </Link>
            <a
              href="/#how-it-works"
              className="text-[#d3e4fe] font-normal hover:text-white text-[14px] transition-colors duration-150"
            >
              How It Works
            </a>
            <a
              href="/#success-stories"
              className="text-[#d3e4fe] font-normal hover:text-white text-[14px] transition-colors duration-150"
            >
              Success Stories
            </a>
          </nav>

          {/* Actions (Login & Register) */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/login')}
              className="h-[40px] px-4 rounded-lg border border-[#5e667d] text-white hover:border-[#d3e4fe] text-[14px] font-medium transition-all duration-150 active:scale-[0.98] cursor-pointer"
              type="button"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/register')}
              className="h-[40px] px-4 rounded-lg bg-gradient-to-r from-[#7c3aed] to-[#2170e4] text-white text-[14px] font-medium shadow-sm hover:brightness-105 transition-all duration-150 active:scale-[0.98] cursor-pointer"
              type="button"
            >
              Register
            </button>
          </div>
        </div>
      </header>

      {/* Main Page Outlet */}
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      {/* Global Stitch Footer */}
      <Footer />
    </div>
  );
};
