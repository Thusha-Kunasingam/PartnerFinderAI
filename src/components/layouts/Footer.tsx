import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#0b1c30] border-t border-[#5e667d]/40 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-8 py-8 max-w-[1440px] mx-auto gap-4">
        {/* Brand Name */}
        <div className="text-[16px] font-bold text-white">
          PartnerFinder AI
        </div>

        {/* Footer Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          <Link
            to="/"
            className="text-[#d3e4fe] hover:text-white transition-colors duration-150 text-[12px]"
          >
            Privacy Policy
          </Link>
          <Link
            to="/"
            className="text-[#d3e4fe] hover:text-white transition-colors duration-150 text-[12px]"
          >
            Terms of Service
          </Link>
          <Link
            to="/"
            className="text-[#d3e4fe] hover:text-white transition-colors duration-150 text-[12px]"
          >
            Security
          </Link>
          <Link
            to="/"
            className="text-[#d3e4fe] hover:text-white transition-colors duration-150 text-[12px]"
          >
            Help Center
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-[#d3e4fe] text-[12px]">
          © 2025 PartnerFinder AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
