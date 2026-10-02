import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore';
import { MaterialIcon } from '../common/MaterialIcon';

interface TopCommandBarProps {
  title?: string;
  subtitle?: string;
  onToggleMobileMenu?: () => void;
}

export const TopCommandBar: React.FC<TopCommandBarProps> = ({
  title,
  subtitle,
  onToggleMobileMenu,
}) => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuthStore();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const notifications = [
    {
      id: 'notif-1',
      title: 'Connection Accepted',
      description: 'K.Thulaanchan accepted your connection request for AI Event Assistant.',
      time: '2 hours ago',
      icon: 'check_circle',
      read: false,
    },
    {
      id: 'notif-2',
      title: 'High AI Compatibility',
      description: '91% Match found with K.Thulaanchan based on Python & AI requirements.',
      time: '5 hours ago',
      icon: 'auto_awesome',
      read: false,
    },
    {
      id: 'notif-3',
      title: 'Milestone Completed',
      description: 'Core REST & WebSocket API Endpoints marked completed.',
      time: '1 day ago',
      icon: 'flag',
      read: true,
    },
  ];

  return (
    <header className="h-16 px-6 lg:px-8 bg-surface-container-lowest border-b border-surface-container-high flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Menu Toggle */}
        <button
          type="button"
          onClick={onToggleMobileMenu}
          aria-label="Toggle navigation menu"
          className="lg:hidden p-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors"
        >
          <MaterialIcon icon="menu" size={22} />
        </button>

        <div>
          <h1 className="text-headline-md font-headline-md text-on-surface flex items-center gap-1.5 leading-none">
            {title ? (
              title
            ) : (
              <>
                Hello {currentUser.fullName} <span className="text-xl">👋</span>
              </>
            )}
          </h1>
          <p className="text-body-sm font-body-sm text-on-surface-variant mt-0.5 hidden sm:block">
            {subtitle || "Here's what's happening with your collaborations."}
          </p>
        </div>
      </div>

      {/* Top Right Controls */}
      <div className="flex items-center gap-4 relative">
        {/* Notification Bell */}
        <div className="relative">
          <button
            type="button"
            aria-label="Notifications"
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              setProfileMenuOpen(false);
            }}
            className="relative w-9 h-9 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary-container rounded-full ring-2 ring-surface-container-lowest" />
          </button>

          {/* Notifications Flyout Dropdown */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-surface-container-lowest rounded-xl border border-surface-container-high shadow-xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
                <span className="text-label-md font-label-md font-semibold text-on-surface">
                  Notifications
                </span>
                <span className="text-label-xs font-label-xs bg-primary-fixed text-primary px-2 py-0.5 rounded-full font-semibold">
                  2 new
                </span>
              </div>
              <div className="divide-y divide-surface-container-low max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="py-3 flex gap-3 items-start hover:bg-surface-bright p-2 rounded-lg transition-colors">
                    <span className="material-symbols-outlined text-[18px] text-primary shrink-0 mt-0.5">
                      {n.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-label-sm font-label-sm font-semibold text-on-surface truncate">
                        {n.title}
                      </p>
                      <p className="text-body-sm font-body-sm text-on-surface-variant text-[12px] leading-snug mt-0.5">
                        {n.description}
                      </p>
                      <span className="text-label-xs font-label-xs text-outline mt-1 block">
                        {n.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t border-surface-container-high text-center">
                <button
                  type="button"
                  onClick={() => setNotificationsOpen(false)}
                  className="text-label-xs text-primary font-semibold hover:underline"
                >
                  Close Notifications
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="h-6 w-px bg-surface-container-high" />

        {/* User Profile Area */}
        <div className="relative">
          <div
            onClick={() => {
              setProfileMenuOpen(!profileMenuOpen);
              setNotificationsOpen(false);
            }}
            className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity"
          >
            {currentUser.avatarUrl ? (
              <img
                src={currentUser.avatarUrl}
                alt={currentUser.fullName}
                className="w-9 h-9 rounded-full object-cover border border-surface-container-high shadow-sm"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-surface-container-low border border-surface-container-high flex items-center justify-center font-bold text-secondary text-label-sm">
                {currentUser.initials}
              </div>
            )}
            <span className="text-label-md font-label-md text-on-surface font-medium hidden sm:inline">
              {currentUser.fullName}
            </span>
          </div>

          {/* Profile Dropdown Menu */}
          {profileMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-surface-container-lowest rounded-xl border border-surface-container-high shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 py-2 border-b border-surface-container-high">
                <p className="text-label-sm font-semibold text-on-surface">{currentUser.fullName}</p>
                <p className="text-label-xs text-outline truncate">{currentUser.email}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setProfileMenuOpen(false);
                  navigate('/onboarding/profile');
                }}
                className="w-full text-left px-4 py-2 text-label-sm text-on-surface hover:bg-surface-bright flex items-center gap-2"
              >
                <MaterialIcon icon="person" size={16} />
                <span>My Profile</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setProfileMenuOpen(false);
                  navigate('/onboarding/skills');
                }}
                className="w-full text-left px-4 py-2 text-label-sm text-on-surface hover:bg-surface-bright flex items-center gap-2"
              >
                <MaterialIcon icon="psychology" size={16} />
                <span>My Skills</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setProfileMenuOpen(false);
                  logout();
                  navigate('/login');
                }}
                className="w-full text-left px-4 py-2 text-label-sm text-error hover:bg-surface-bright flex items-center gap-2 border-t border-surface-container-high mt-1"
              >
                <MaterialIcon icon="logout" size={16} />
                <span>Log Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
