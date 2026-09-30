import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProgressBar } from '../../components/common/ProgressBar';
import { ProcessingStepRow } from '../../components/feedback/ProcessingStepRow';

const steps = [
  'Checking skills',
  'Checking interests',
  'Checking availability',
  'Checking project requirements',
  'Calculating compatibility',
];

export const MatchingProcessingPage: React.FC = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(15);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            navigate('/matches');
          }, 800);
          return 100;
        }
        const next = prev + 20;
        setCurrentStepIndex(Math.min(steps.length - 1, Math.floor(next / 20)));
        return next;
      });
    }, 500);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="flex-1 flex items-center justify-center p-6 py-12">
      <div className="w-full max-w-[640px] bg-surface-container-lowest border border-border-standard rounded-2xl p-10 shadow-elevation-1 text-center">
        {/* Animated AI Icon */}
        <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary-fixed text-primary mb-6 shadow-sm">
          <span className="material-symbols-outlined text-[40px] animate-pulse">
            smart_toy
          </span>
          <span className="absolute -inset-1 rounded-2xl bg-primary-container/20 animate-ping" />
        </div>

        <h1 className="text-headline-lg font-headline-lg font-bold text-on-surface mb-2">
          Finding the best partners for you...
        </h1>
        <p className="text-body-md text-on-surface-variant max-w-md mx-auto mb-8">
          Our algorithmic engine is analyzing your requirements and finding the most suitable candidates.
        </p>

        {/* 5-Step Checklist Card */}
        <div className="bg-surface-container-low border border-surface-container-high rounded-xl p-5 mb-6 text-left">
          {steps.map((label, index) => {
            const isCompleted = index < currentStepIndex || progress === 100;
            const isInProgress = index === currentStepIndex && progress < 100;

            return (
              <ProcessingStepRow
                key={label}
                stepNumber={index + 1}
                label={label}
                isCompleted={isCompleted}
                isInProgress={isInProgress}
              />
            );
          })}
        </div>

        {/* Progress Bar & Status */}
        <div className="mb-4">
          <ProgressBar progress={progress} showLabel />
        </div>

        {progress === 100 && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-label-md font-semibold flex items-center justify-center gap-2 animate-fade-in">
            <span className="material-symbols-outlined text-[20px] text-emerald-600">verified</span>
            <span>We found 8 potential partners! Preparing your results...</span>
          </div>
        )}
      </div>
    </div>
  );
};
