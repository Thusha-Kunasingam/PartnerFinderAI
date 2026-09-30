import React from 'react';
import { Outlet } from 'react-router-dom';
import { SideNavRail } from './SideNavRail';
import { TopCommandBar } from './TopCommandBar';

export const AppShellLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex bg-canvas-base">
      {/* 260px Fixed Sidebar */}
      <SideNavRail />

      {/* Main Content Workspace Canvas */}
      <div className="flex-1 flex flex-col min-w-0 bg-background">
        <TopCommandBar />
        <main className="flex-1 p-8 max-w-[1440px] w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
