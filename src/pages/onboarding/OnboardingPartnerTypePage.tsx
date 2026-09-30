import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { SecondaryButton } from '../../components/common/SecondaryButton';
import { useOnboardingStore } from '../../stores/useOnboardingStore';
import { useAuthStore } from '../../stores/useAuthStore';
import { PartnerType } from '../../types';
import { cn } from '../../utils/cn';

const partnerOptions: { type: PartnerType; label: string; icon: string; desc: string }[] = [
  {
    type: 'study_partner',
    label: 'Study Partner',
    icon: 'menu_book',
    desc: 'Prepare for exams, coursework, and technical certifications together.',
  },
  {
    type: 'project_partner',
    label: 'Project Partner',
    icon: 'rocket_launch',
    desc: 'Build ambitious web, mobile, or AI software apps with complementary engineering teammates.',
  },
  {
    type: 'hackathon_team',
    label: 'Hackathon Team',
    icon: 'emoji_events',
    desc: 'Form a fast-moving, balanced team to enter and win competitive hackathons.',
  },
  {
    type: 'skill_exchange',
    label: 'Skill Exchange',
    icon: 'swap_horiz',
    desc: 'Reciprocal peer mentorship: teach your strongest skill while learning your target technology.',
  },
  {
    type: 'startup_partner',
    label: 'Startup Partner',
    icon: 'lightbulb',
    desc: 'Find a technical co-founder or early builder to launch and validate a startup idea.',
  },
];

export const OnboardingPartnerTypePage: React.FC = () => {
  const navigate = useNavigate();
  const { partnerType, setPartnerType, skillsOffered, skillsToLearn, fullName, university, major, yearOfStudy, location, bio } = useOnboardingStore();
  const { updateProfile } = useAuthStore();

  const handleFinishOnboarding = () => {
    updateProfile({
      fullName,
      university,
      major,
      yearOfStudy,
      location,
      bio,
      skillsOffered,
      skillsToLearn,
      preferredPartnerType: partnerType,
    });
    navigate('/requirements/new');
  };

  return (
    <div className="w-full max-w-[960px] bg-surface-container-lowest border border-border-standard rounded-xl p-8 shadow-elevation-1">
      <div className="text-center max-w-xl mx-auto mb-8">
        <h1 className="text-headline-lg font-headline-lg font-bold text-on-surface">
          Choose Partner Type
        </h1>
        <p className="text-body-sm text-on-surface-variant mt-1.5">
          What primary collaboration mode are you seeking right now?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {partnerOptions.slice(0, 3).map((opt) => {
          const isSelected = partnerType === opt.type;
          return (
            <div
              key={opt.type}
              onClick={() => setPartnerType(opt.type)}
              className={cn(
                'p-6 rounded-xl border transition-all duration-150 cursor-pointer flex flex-col justify-between relative',
                isSelected
                  ? 'border-primary-container bg-surface-container-low shadow-elevation-2'
                  : 'border-border-standard bg-surface-container-lowest hover:border-border-input hover:bg-surface-container-low'
              )}
            >
              <div>
                <div
                  className={cn(
                    'w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors',
                    isSelected
                      ? 'bg-primary-container text-white'
                      : 'bg-surface-container text-secondary'
                  )}
                >
                  <span className="material-symbols-outlined text-[26px]">{opt.icon}</span>
                </div>
                <h3 className="text-headline-sm font-semibold text-on-surface mb-2">{opt.label}</h3>
                <p className="text-body-sm text-on-surface-variant leading-relaxed">{opt.desc}</p>
              </div>

              {isSelected && (
                <span className="absolute top-4 right-4 w-6 h-6 rounded-full bg-primary-container text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-[16px]">check</span>
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8">
        {partnerOptions.slice(3).map((opt) => {
          const isSelected = partnerType === opt.type;
          return (
            <div
              key={opt.type}
              onClick={() => setPartnerType(opt.type)}
              className={cn(
                'p-6 rounded-xl border transition-all duration-150 cursor-pointer flex flex-col justify-between relative',
                isSelected
                  ? 'border-primary-container bg-surface-container-low shadow-elevation-2'
                  : 'border-border-standard bg-surface-container-lowest hover:border-border-input hover:bg-surface-container-low'
              )}
            >
              <div>
                <div
                  className={cn(
                    'w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors',
                    isSelected
                      ? 'bg-primary-container text-white'
                      : 'bg-surface-container text-secondary'
                  )}
                >
                  <span className="material-symbols-outlined text-[26px]">{opt.icon}</span>
                </div>
                <h3 className="text-headline-sm font-semibold text-on-surface mb-2">{opt.label}</h3>
                <p className="text-body-sm text-on-surface-variant leading-relaxed">{opt.desc}</p>
              </div>

              {isSelected && (
                <span className="absolute top-4 right-4 w-6 h-6 rounded-full bg-primary-container text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-[16px]">check</span>
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-6 border-t border-border-standard">
        <SecondaryButton type="button" onClick={() => navigate('/onboarding/learn')} className="h-11 px-6">
          Back
        </SecondaryButton>
        <PrimaryButton type="button" onClick={handleFinishOnboarding} className="h-11 px-8">
          Next
        </PrimaryButton>
      </div>
    </div>
  );
};
