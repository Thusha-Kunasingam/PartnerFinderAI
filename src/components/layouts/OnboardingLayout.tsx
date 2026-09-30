import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Footer } from './Footer';
import { cn } from '../../utils/cn';

const steps = [
  { step: 1, label: 'Basic Info', path: '/onboarding/profile' },
  { step: 2, label: 'Add Skills', path: '/onboarding/skills' },
  { step: 3, label: 'Skills to Learn', path: '/onboarding/learn' },
  { step: 4, label: 'Partner Type', path: '/onboarding/partner-type' },
];

export const OnboardingLayout: React.FC = () => {
  const location = useLocation();

  const currentStepIndex = steps.findIndex((s) => s.path === location.pathname);
  const activeStep = currentStepIndex !== -1 ? currentStepIndex + 1 : 1;

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
          <a href="/#how-it-works" className="hover:text-on-surface transition-colors">How It Works</a>
          <a href="/#success-stories" className="hover:text-on-surface transition-colors">Success Stories</a>
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

      {/* Step Tracker Indicator */}
      {currentStepIndex !== -1 && (
        <div className="bg-surface-container-lowest border-b border-border-standard py-4 px-8">
          <div className="max-w-[760px] mx-auto flex items-center justify-between">
            {steps.map((s) => {
              const isPast = s.step < activeStep;
              const isCurrent = s.step === activeStep;

              return (
                <div key={s.step} className="flex items-center gap-2">
                  <div
                    className={cn(
                      'w-7 h-7 rounded-full flex items-center justify-center text-label-xs font-semibold select-none',
                      isCurrent
                        ? 'bg-primary-container text-white shadow-ambient-primary'
                        : isPast
                        ? 'bg-emerald-600 text-white'
                        : 'bg-surface-container text-on-surface-variant'
                    )}
                  >
                    {isPast ? (
                      <span className="material-symbols-outlined text-[16px]">check</span>
                    ) : (
                      s.step
                    )}
                  </div>
                  <span
                    className={cn(
                      'text-label-sm font-label-sm hidden sm:inline',
                      isCurrent
                        ? 'text-primary-container font-semibold'
                        : isPast
                        ? 'text-on-surface font-medium'
                        : 'text-outline font-normal'
                    )}
                  >
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Form Outlet */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-10">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
