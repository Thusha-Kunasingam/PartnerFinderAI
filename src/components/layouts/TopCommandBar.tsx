import React from 'react';
import { useAuthStore } from '../../stores/useAuthStore';

interface TopCommandBarProps {
  title?: string;
  subtitle?: string;
}

export const TopCommandBar: React.FC<TopCommandBarProps> = ({
  title,
  subtitle,
}) => {
  const { currentUser } = useAuthStore();

  return (
    <header className="h-16 px-8 bg-surface-container-lowest border-b border-surface-container-high flex items-center justify-between sticky top-0 z-20">
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
        <p className="text-body-sm font-body-sm text-on-surface-variant mt-0.5">
          {subtitle || "Here's what's happening with your collaborations."}
        </p>
      </div>

      {/* Top Right Controls */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative w-9 h-9 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[22px]">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary-container rounded-full ring-2 ring-surface-container-lowest" />
        </button>

        <div className="h-6 w-px bg-surface-container-high" />

        {/* User Profile Area */}
        <div className="flex items-center gap-3">
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
      </div>
    </header>
  );
};
