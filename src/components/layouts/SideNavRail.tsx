import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { MaterialIcon } from '../common/MaterialIcon';

interface NavItem {
  label: string;
  icon: string;
  path: string;
  badge?: number;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', icon: 'dashboard', path: '/dashboard' },
  { label: 'My Profile', icon: 'person', path: '/onboarding/profile' },
  { label: 'My Skills', icon: 'psychology', path: '/onboarding/skills' },
  { label: 'Find Partners', icon: 'travel_explore', path: '/requirements/new' },
  { label: 'My Matches', icon: 'join', path: '/matches' },
  { label: 'Connection Requests', icon: 'group_add', path: '/connections/requests' },
  { label: 'Messages', icon: 'chat_bubble_outline', path: '/messages' },
  { label: 'My Projects', icon: 'folder_open', path: '/workspace/ai-event-assistant' },
  { label: 'Notifications', icon: 'notifications', path: '/dashboard' },
];

interface SideNavRailProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const SideNavRail: React.FC<SideNavRailProps> = ({ mobileOpen, onCloseMobile }) => {
  const content = (
    <aside className="w-[260px] flex-shrink-0 bg-on-background flex flex-col justify-between h-screen sticky top-0 border-r border-tertiary-container/30 z-30 select-none">
      <div className="flex flex-col">
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-tertiary-container/30">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-fixed text-[24px]">hub</span>
            <span className="text-headline-sm font-headline-sm font-bold text-surface-container-lowest tracking-tight">
              PartnerFinder AI
            </span>
          </div>
          {onCloseMobile && (
            <button
              type="button"
              onClick={onCloseMobile}
              className="lg:hidden text-surface-container-highest hover:text-white"
            >
              <MaterialIcon icon="close" size={20} />
            </button>
          )}
        </div>

        {/* Navigation List */}
        <nav className="p-4 flex flex-col gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                cn(
                  'flex items-center justify-between px-3 py-2.5 rounded-lg font-label-md text-label-md transition-colors',
                  isActive
                    ? 'bg-primary-container text-surface-container-lowest shadow-sm font-medium'
                    : 'text-surface-container-highest hover:text-surface-container-lowest hover:bg-tertiary-container/20'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3">
                    <span
                      className="material-symbols-outlined text-[20px]"
                      style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-primary-fixed text-primary font-bold">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom Live AI Pulse */}
      <div className="p-4 border-t border-tertiary-container/30">
        <div className="flex items-center gap-3 px-3 py-2 text-surface-container-highest font-body-sm text-body-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-medium text-emerald-400">AI Engine Connected</span>
        </div>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <div className="hidden lg:block shrink-0">{content}</div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative z-10">{content}</div>
        </div>
      )}
    </>
  );
};
