import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { SideNavRail } from './SideNavRail';
import { TopCommandBar } from './TopCommandBar';

export const AppShellLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-background selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* 260px Fixed Sidebar with Mobile Drawer support */}
      <SideNavRail
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Workspace Canvas */}
      <div className="flex-1 flex flex-col min-w-0 bg-background">
        <TopCommandBar onToggleMobileMenu={() => setMobileMenuOpen((prev) => !prev)} />
        <div className="flex-1 min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
