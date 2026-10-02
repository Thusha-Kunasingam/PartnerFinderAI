import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMatchingStore } from '../../stores/useMatchingStore';
import { MaterialIcon } from '../../components/common/MaterialIcon';

const processingSteps = [
  '1. Checking skills',
  '2. Checking interests',
  '3. Checking availability',
  '4. Checking project requirements',
  '5. Calculating compatibility',
];

export const MatchingProcessingPage: React.FC = () => {
  const navigate = useNavigate();
  const { matches, setIsProcessing, setProcessingProgress } = useMatchingStore();

  const [activeStep, setActiveStep] = useState(1);
  const [progressPercent, setProgressPercent] = useState(20);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    setIsProcessing(true);

    const stepInterval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= 5) {
          clearInterval(stepInterval);
          setProgressPercent(100);
          setIsDone(true);
          setProcessingProgress(100);

          setTimeout(() => {
            setIsProcessing(false);
            navigate('/matches');
          }, 900);
          return 5;
        }

        const next = prev + 1;
        const newProgress = Math.min(100, next * 20);
        setProgressPercent(newProgress);
        setProcessingProgress(newProgress);
        return next;
      });
    }, 450);

    return () => clearInterval(stepInterval);
  }, [navigate, setIsProcessing, setProcessingProgress]);

  const candidateCount = matches.length || 8;

  return (
    <div className="flex-1 w-full max-w-[1440px] mx-auto flex items-center justify-center py-12 px-4 sm:px-6">
      {/* Processing Container Card (700px wide, 12px radius, Level 1 shadow) */}
      <div className="w-full max-w-[700px] bg-white rounded-xl border border-slate-200 shadow-sm p-8 sm:p-10 flex flex-col items-center">
        {/* Purple AI Sparkle / Robot Icon */}
        <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center mb-5 border border-purple-100 text-[#7C3AED]">
          <MaterialIcon icon="smart_toy" size={24} />
        </div>

        {/* Heading */}
        <h1 className="text-[24px] leading-8 font-semibold text-[#0b1c30] text-center mb-2">
          Finding the best partners for you...
        </h1>

        {/* Subtitle */}
        <p className="text-[14px] text-slate-500 text-center max-w-lg mb-8">
          Our AI is analyzing your requirements and finding the most suitable people.
        </p>

        {/* Exactly Five Status Rows */}
        <div className="w-full space-y-3 mb-8 bg-slate-50/70 p-5 rounded-lg border border-slate-100">
          {processingSteps.map((stepText, index) => {
            const stepNum = index + 1;
            const isCompleted = stepNum <= activeStep || isDone;

            return (
              <React.Fragment key={stepText}>
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-[14px] text-slate-700 font-medium">
                    {stepText}
                  </span>
                  {isCompleted ? (
                    <div className="flex items-center gap-1.5 text-[#10B981]">
                      <MaterialIcon icon="check_circle" size={18} />
                      <span className="text-[12px] font-semibold">Completed</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                      <span className="text-[12px]">Pending</span>
                    </div>
                  )}
                </div>
                {index < processingSteps.length - 1 && (
                  <div className="h-px w-full bg-slate-200/60" />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Horizontal Purple-to-Blue Progress Bar */}
        <div className="w-full mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[12px] text-slate-500 font-medium">Progress</span>
            <span className="text-[12px] text-[#7C3AED] font-semibold">
              {progressPercent}%
            </span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/70">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Bottom Notification Card Inside Container */}
        <div className="w-full bg-[#ecfdf5] border border-[#a7f3d0] rounded-lg p-4 text-center">
          <div className="flex items-center justify-center gap-2 text-[#059669] font-semibold text-[14px] mb-1">
            <MaterialIcon icon="verified" size={18} />
            <span>We found {candidateCount} potential partners!</span>
          </div>
          <p className="text-[12px] text-slate-600">
            Preparing your results...
          </p>
        </div>
      </div>
    </div>
  );
};
