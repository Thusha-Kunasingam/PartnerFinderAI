import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboardingStore } from '../../stores/useOnboardingStore';
import { useAuthStore } from '../../stores/useAuthStore';
import { MaterialIcon } from '../../components/common/MaterialIcon';
import { PartnerType } from '../../types';

interface PartnerOption {
  type: PartnerType;
  title: string;
  desc: string;
  icon: string;
  colSpan: string;
}

const partnerOptions: PartnerOption[] = [
  {
    type: 'study_partner',
    title: 'Study Partner',
    desc: 'Learn together and improve your skills',
    icon: 'menu_book',
    colSpan: 'md:col-span-2',
  },
  {
    type: 'project_partner',
    title: 'Project Partner',
    desc: 'Build amazing projects together',
    icon: 'rocket_launch',
    colSpan: 'md:col-span-2',
  },
  {
    type: 'hackathon_team',
    title: 'Hackathon Team',
    desc: 'Compete and build a team',
    icon: 'emoji_events',
    colSpan: 'md:col-span-2',
  },
  {
    type: 'skill_exchange',
    title: 'Skill Exchange',
    desc: 'Teach what you know, learn what you need',
    icon: 'swap_horiz',
    colSpan: 'md:col-span-3',
  },
  {
    type: 'startup_partner',
    title: 'Startup Partner',
    desc: 'Find co-founders and build ideas',
    icon: 'lightbulb',
    colSpan: 'md:col-span-3',
  },
];

export const OnboardingPartnerTypePage: React.FC = () => {
  const navigate = useNavigate();
  const {
    partnerType,
    setPartnerType,
    setStep,
    fullName,
    university,
    major,
    yearOfStudy,
    location,
    bio,
    skillsOffered,
    skillsToLearn,
  } = useOnboardingStore();

  const { updateProfile } = useAuthStore();

  const handleBack = () => {
    setStep(3);
    navigate('/onboarding/learn');
  };

  const handleNext = () => {
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
    setStep(4);
    navigate('/requirements/new');
  };

  return (
    <div className="w-full max-w-[960px] bg-white border border-[#e5eeff] rounded-xl p-8 md:p-10 shadow-sm">
      {/* Header Area */}
      <div className="text-center mb-8">
        <h1 className="text-[32px] leading-10 font-bold text-[#0b1c30] mb-2">
          Choose Partner Type
        </h1>
        <p className="text-[16px] leading-6 text-[#474e64]">
          What kind of partner are you looking for?
        </p>
      </div>

      {/* Five Selectable Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-5 mb-10">
        {partnerOptions.map((opt) => {
          const isSelected = partnerType === opt.type;

          return (
            <div
              key={opt.type}
              onClick={() => setPartnerType(opt.type)}
              className={`${opt.colSpan} ${
                isSelected
                  ? 'relative bg-[#f3efff] border-2 border-[#7c3aed] rounded-xl p-6 flex flex-col justify-between shadow-sm cursor-pointer'
                  : 'bg-white border border-[#E2E8F0] rounded-xl p-6 flex flex-col justify-between transition-all duration-150 cursor-pointer hover:border-[#CBD5E1] hover:shadow-sm'
              }`}
            >
              {isSelected && (
                <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[#7c3aed] text-white flex items-center justify-center shadow-sm">
                  <MaterialIcon icon="check" size={16} />
                </div>
              )}

              <div>
                <div
                  className={`w-11 h-11 rounded-lg flex items-center justify-center mb-4 transition-colors ${
                    isSelected
                      ? 'bg-[#7c3aed] text-white shadow-sm'
                      : 'bg-[#eff4ff] border border-[#e5eeff] text-[#7c3aed]'
                  }`}
                >
                  <MaterialIcon icon={opt.icon} size={22} />
                </div>
                <h2 className="text-[16px] font-semibold text-[#0b1c30] mb-1">
                  {opt.title}
                </h2>
                <p className="text-[14px] text-[#474e64] leading-relaxed">
                  {opt.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Navigation Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-[#e5eeff]">
        <button
          type="button"
          onClick={handleBack}
          className="h-[42px] px-6 rounded-lg bg-white border border-[#E2E8F0] text-[#0b1c30] text-[14px] font-medium hover:bg-[#eff4ff] hover:border-[#CBD5E1] transition-all duration-150 active:scale-[0.98] cursor-pointer"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="h-[42px] px-8 rounded-lg bg-gradient-to-r from-[#7c3aed] to-[#2170e4] text-white text-[14px] font-medium shadow-sm hover:brightness-108 transition-all duration-150 active:scale-[0.98] cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};
