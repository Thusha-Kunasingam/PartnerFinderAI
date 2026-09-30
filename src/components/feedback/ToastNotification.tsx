import React, { useEffect } from 'react';
import { cn } from '../../utils/cn';

interface ToastNotificationProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  type?: 'success' | 'info' | 'error';
  duration?: number;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({
  message,
  isVisible,
  onClose,
  type = 'success',
  duration = 4000,
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        'fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-elevation-3',
        'bg-slate-900 text-white font-label-md text-label-md border border-slate-700 animate-bounce'
      )}
    >
      <span
        className={cn(
          'material-symbols-outlined text-[20px]',
          type === 'success' && 'text-emerald-400',
          type === 'error' && 'text-rose-400',
          type === 'info' && 'text-blue-400'
        )}
      >
        {type === 'success' ? 'check_circle' : type === 'error' ? 'error' : 'info'}
      </span>
      <span>{message}</span>
      <button
        type="button"
        onClick={onClose}
        className="ml-2 text-slate-400 hover:text-white cursor-pointer"
        aria-label="Dismiss toast"
      >
        <span className="material-symbols-outlined text-[16px]">close</span>
      </button>
    </div>
  );
};
