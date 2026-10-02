import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboardingStore } from '../../stores/useOnboardingStore';
import { MaterialIcon } from '../../components/common/MaterialIcon';

interface SkillOption {
  name: string;
  icon: string;
}

const popularSkillsToLearn: SkillOption[] = [
  { name: 'Python', icon: 'terminal' },
  { name: 'Machine Learning', icon: 'psychology' },
  { name: 'Flutter', icon: 'smartphone' },
  { name: 'AI', icon: 'psychology' },
  { name: 'Data Science', icon: 'analytics' },
  { name: 'UI/UX', icon: 'palette' },
  { name: 'DevOps', icon: 'cloud' },
  { name: 'Mobile Development', icon: 'smartphone' },
  { name: 'Rust', icon: 'terminal' },
  { name: 'Cloud Computing', icon: 'cloud' },
];

export const OnboardingLearnPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    skillsToLearn,
    toggleSkillToLearn,
    removeSkillToLearn,
    setStep,
  } = useOnboardingStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [validationError, setValidationError] = useState('');

  const filteredSkills = popularSkillsToLearn.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getSkillIcon = (name: string) => {
    const found = popularSkillsToLearn.find(
      (s) => s.name.toLowerCase() === name.toLowerCase()
    );
    return found ? found.icon : 'school';
  };

  const handleNext = () => {
    if (skillsToLearn.length === 0) {
      setValidationError('Please select at least one skill or topic you want to learn.');
      return;
    }
    setStep(4);
    navigate('/onboarding/partner-type');
  };

  const handleBack = () => {
    setStep(2);
    navigate('/onboarding/skills');
  };

  return (
    <div className="w-full max-w-[1080px] bg-white rounded-xl border border-[#E2E8F0] shadow-[0_1px_3px_0_rgba(15,23,42,0.05),0_1px_2px_-1px_rgba(15,23,42,0.03)] overflow-hidden">
      <div className="flex flex-col md:flex-row min-h-[640px]">
        {/* Left Column: Onboarding Progress Tracker */}
        <aside className="w-full md:w-[320px] bg-[#F8FAFC] border-b md:border-b-0 md:border-r border-[#E2E8F0] p-6 md:p-8 flex flex-col justify-between">
          <div>
            {/* Progress Tracker Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
                  Step 3 of 4
                </span>
                <span className="text-[11px] text-[#7C3AED] font-semibold">75%</span>
              </div>
              <div className="w-full h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
                <div className="w-3/4 h-full bg-[#7C3AED] rounded-full"></div>
              </div>
            </div>

            {/* Steps List */}
            <nav className="space-y-4">
              {/* Step 1: Completed */}
              <div className="flex items-center gap-3.5 group">
                <div className="w-8 h-8 rounded-full bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shrink-0 border border-[#BBF7D0]">
                  <MaterialIcon icon="check" size={18} />
                </div>
                <div>
                  <span className="text-[11px] text-[#64748B] block">Step 1</span>
                  <span className="text-[14px] font-medium text-[#0b1c30]">Basic Info</span>
                </div>
              </div>

              {/* Step 2: Completed */}
              <div className="flex items-center gap-3.5 group">
                <div className="w-8 h-8 rounded-full bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shrink-0 border border-[#BBF7D0]">
                  <MaterialIcon icon="check" size={18} />
                </div>
                <div>
                  <span className="text-[11px] text-[#64748B] block">Step 2</span>
                  <span className="text-[14px] font-medium text-[#0b1c30]">Skills</span>
                </div>
              </div>

              {/* Step 3: Active State */}
              <div className="flex items-center gap-3.5 p-2 -mx-2 rounded-lg bg-[#dce9ff]/40 border border-[#7C3AED]/20">
                <div className="w-8 h-8 rounded-full bg-[#7C3AED] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <span className="text-[12px] font-semibold">3</span>
                </div>
                <div>
                  <span className="text-[11px] text-[#7C3AED] font-semibold block">Step 3 of 4</span>
                  <span className="text-[14px] font-semibold text-[#630ed4]">
                    Interests / Learning
                  </span>
                </div>
              </div>

              {/* Step 4: Inactive Gray State */}
              <div className="flex items-center gap-3.5 opacity-60">
                <div className="w-8 h-8 rounded-full bg-[#F1F5F9] text-[#94A3B8] border border-[#CBD5E1] flex items-center justify-center shrink-0">
                  <span className="text-[12px] font-semibold">4</span>
                </div>
                <div>
                  <span className="text-[11px] text-[#64748B] block">Step 4</span>
                  <span className="text-[14px] text-[#64748B]">Complete</span>
                </div>
              </div>
            </nav>
          </div>

          <div className="mt-8 pt-6 border-t border-[#E2E8F0] hidden md:block">
            <span className="text-[11px] text-[#64748B] flex items-center gap-1.5">
              <MaterialIcon icon="help_outline" size={16} className="text-[#64748B]" />
              Need assistance? Support is online
            </span>
          </div>
        </aside>

        {/* Right Main Column: Interaction Canvas */}
        <section className="flex-1 p-6 md:p-8 flex flex-col justify-between">
          <div className="space-y-6">
            {/* Header Titles */}
            <div>
              <h1 className="text-[24px] leading-8 font-semibold text-[#0b1c30]">
                Skills You Want to Learn
              </h1>
              <p className="text-[14px] leading-5 text-[#64748B] mt-1">
                Select the skills you want to learn.
              </p>
            </div>

            {/* Top Search Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94A3B8]">
                <MaterialIcon icon="search" size={20} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search skills..."
                className="w-full h-[44px] pl-10 pr-4 bg-white border border-[#E2E8F0] rounded-lg text-[14px] text-[#0b1c30] placeholder-[#94A3B8] focus:border-[#7C3AED] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/15 transition-all"
              />
            </div>

            {/* Popular Skills Section */}
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B] block mb-3">
                POPULAR SKILLS
              </span>
              <div className="flex flex-wrap gap-2">
                {filteredSkills.map((skill) => {
                  const isSelected = skillsToLearn.includes(skill.name);
                  return (
                    <button
                      key={skill.name}
                      type="button"
                      onClick={() => {
                        toggleSkillToLearn(skill.name);
                        setValidationError('');
                      }}
                      className={`h-6 px-2.5 rounded-full text-[12px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[#E0F2FE] border border-[#BAE6FD] text-[#0284C7]'
                          : 'bg-white border border-[#E2E8F0] text-[#0b1c30] hover:bg-[#F8FAFC]'
                      }`}
                    >
                      {isSelected && (
                        <MaterialIcon icon="check" size={14} className="text-[#0284C7]" />
                      )}
                      <span>{skill.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Skills Section */}
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B] block mb-3">
                SELECTED SKILLS
              </span>

              {skillsToLearn.length === 0 ? (
                <div className="p-6 rounded-lg border border-dashed border-[#CBD5E1] text-center text-[14px] text-[#64748B]">
                  No skills selected yet. Click any popular skill above to add.
                </div>
              ) : (
                <div className="space-y-2.5">
                  {skillsToLearn.map((skillName) => (
                    <div
                      key={skillName}
                      className="flex items-center justify-between h-[52px] px-4 rounded-lg bg-white border border-[#E2E8F0] shadow-sm hover:border-[#CBD5E1] transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[#64748B] flex items-center">
                          <MaterialIcon icon={getSkillIcon(skillName)} size={20} />
                        </span>
                        <span className="text-[14px] font-medium text-[#0b1c30]">
                          {skillName}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeSkillToLearn(skillName)}
                        title={`Delete ${skillName}`}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-[#EF4444] hover:bg-[#FEF2F2] transition-colors cursor-pointer"
                      >
                        <MaterialIcon icon="delete" size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {validationError && (
                <p className="text-[12px] text-[#ba1a1a] mt-2 font-medium">{validationError}</p>
              )}
            </div>
          </div>

          {/* Bottom Navigation Actions */}
          <div className="mt-8 pt-6 border-t border-[#E2E8F0] flex items-center justify-between">
            <button
              type="button"
              onClick={handleBack}
              className="h-[42px] px-5 rounded-lg border border-[#E2E8F0] bg-white text-[#1E293B] text-[14px] font-medium hover:bg-[#F8FAFC] hover:border-[#CBD5E1] transition-all duration-150 active:scale-[0.98] cursor-pointer"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="h-[42px] px-6 rounded-lg bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] hover:brightness-105 hover:shadow-[0_4px_14px_0_rgba(124,58,237,0.35)] text-white text-[14px] font-medium transition-all duration-150 active:scale-[0.98] cursor-pointer"
            >
              Next
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
