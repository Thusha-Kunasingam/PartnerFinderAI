import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-surface-container-lowest border-t border-border-standard py-12 px-8 text-on-surface-variant">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary-container text-[22px]">hub</span>
          <span className="font-semibold text-on-surface text-headline-sm">PartnerFinder AI</span>
          <span className="text-body-sm text-outline ml-2">© 2025 PartnerFinder AI. All rights reserved.</span>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-body-sm">
          <Link to="/" className="hover:text-on-surface transition-colors">Privacy Policy</Link>
          <Link to="/" className="hover:text-on-surface transition-colors">Terms of Service</Link>
          <Link to="/" className="hover:text-on-surface transition-colors">Security</Link>
          <Link to="/" className="hover:text-on-surface transition-colors">Help Center</Link>
        </div>
      </div>
    </footer>
  );
};
