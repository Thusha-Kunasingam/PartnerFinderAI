import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboardingStore } from '../../stores/useOnboardingStore';
import { MaterialIcon } from '../../components/common/MaterialIcon';
import { ProficiencyLevel } from '../../types';

const defaultPopularSkills = [
  'C#',
  'Angular',
  'SQL',
  'HTML',
  'CSS',
  'Python',
  'Machine Learning',
  'UI/UX',
  'React',
  'TypeScript',
  'Node.js',
  'Docker',
];

export const OnboardingSkillsPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    skillsOffered,
    toggleSkillOffered,
    updateSkillLevel,
    removeSkillOffered,
    setStep,
  } = useOnboardingStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [isAddingCustom, setIsAddingCustom] = useState(false);
  const [customSkillName, setCustomSkillName] = useState('');
  const [validationError, setValidationError] = useState('');

  const filteredPopularSkills = defaultPopularSkills.filter((s) =>
    s.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customSkillName.trim()) return;

    toggleSkillOffered(customSkillName.trim(), 'Intermediate');
    setCustomSkillName('');
    setIsAddingCustom(false);
    setValidationError('');
  };

  const handleNext = () => {
    if (skillsOffered.length === 0) {
      setValidationError('Please select or add at least one skill to continue.');
      return;
    }
    setStep(3);
    navigate('/onboarding/learn');
  };

  const handleBack = () => {
    setStep(1);
    navigate('/onboarding/profile');
  };

  return (
    <div className="w-full max-w-[1040px] bg-white rounded-xl border border-[#E2E8F0] shadow-[0_1px_3px_0_rgba(15,23,42,0.05),0_1px_2px_-1px_rgba(15,23,42,0.03)] overflow-hidden flex flex-col md:flex-row">
      {/* Left Onboarding Progress Column */}
      <aside className="w-full md:w-[260px] bg-[#F8FAFC] border-b md:border-b-0 md:border-r border-[#E2E8F0] p-6 flex flex-col justify-between">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B] mb-6">
            Onboarding Steps
          </div>
          <div className="flex flex-col gap-5">
            {/* Step 1: Basic Info (Completed) */}
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-[#10B981] text-white flex items-center justify-center">
                <MaterialIcon icon="check" size={16} />
              </div>
              <div>
                <div className="text-[14px] font-medium text-[#1E293B]">Basic Info</div>
              </div>
            </div>

            {/* Step 2: Skills (Active) */}
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-[#7C3AED] text-white flex items-center justify-center text-[12px] font-bold shadow-[0_0_0_3px_rgba(124,58,237,0.15)]">
                2
              </div>
              <div>
                <div className="text-[14px] font-bold text-[#7C3AED]">Skills</div>
              </div>
            </div>

            {/* Step 3: Interests (Inactive) */}
            <div className="flex items-center gap-3 opacity-60">
              <div className="w-7 h-7 rounded-full bg-[#E2E8F0] text-[#64748B] flex items-center justify-center text-[12px] font-medium">
                3
              </div>
              <div>
                <div className="text-[14px] text-[#64748B]">Interests</div>
              </div>
            </div>

            {/* Step 4: Complete (Inactive) */}
            <div className="flex items-center gap-3 opacity-60">
              <div className="w-7 h-7 rounded-full bg-[#E2E8F0] text-[#64748B] flex items-center justify-center text-[12px] font-medium">
                4
              </div>
              <div>
                <div className="text-[14px] text-[#64748B]">Complete</div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar (Step 2 of 4 = 50%) */}
        <div className="pt-6 border-t border-[#E2E8F0] hidden md:block">
          <p className="text-[12px] text-[#64748B]">Step 2 of 4</p>
          <div className="w-full bg-[#E2E8F0] h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-[#7C3AED] h-full w-2/4 rounded-full"></div>
          </div>
        </div>
      </aside>

      {/* Right Skills Section Workspace */}
      <section className="flex-1 p-6 md:p-8 flex flex-col justify-between">
        <div>
          {/* Title & Subtitle */}
          <div className="mb-6">
            <h1 className="text-[24px] leading-8 font-semibold text-[#0b1c30]">Add Your Skills</h1>
            <p className="text-[14px] leading-5 text-[#64748B] mt-1">
              Select the skills you have and set your level.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative mb-6">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none">
              <MaterialIcon icon="search" size={20} />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skills..."
              className="w-full h-[44px] pl-10 pr-4 bg-white border border-[#E2E8F0] rounded-lg text-[14px] text-[#0b1c30] placeholder-[#94A3B8] focus:border-[#7C3AED] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/15 transition-all"
            />
          </div>

          {/* Popular Skills Section */}
          <div className="mb-8">
            <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B] mb-3">
              Popular Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {filteredPopularSkills.map((skill) => {
                const isSelected = skillsOffered.some((s) => s.skillName === skill);
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => {
                      toggleSkillOffered(skill, 'Intermediate');
                      setValidationError('');
                    }}
                    className={`h-6 px-2.5 rounded-full text-[12px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#E0F2FE] border border-[#BAE6FD] text-[#0284C7]'
                        : 'bg-white border border-[#E2E8F0] text-[#64748B] hover:border-[#CBD5E1] hover:text-[#0b1c30]'
                    }`}
                  >
                    <span>{skill}</span>
                    {isSelected && (
                      <MaterialIcon icon="check" size={14} className="text-[#0284C7]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Skills Section */}
          <div className="mb-6">
            <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B] mb-3">
              Selected Skills
            </h2>

            {skillsOffered.length === 0 ? (
              <div className="p-6 rounded-lg border border-dashed border-[#CBD5E1] text-center text-[14px] text-[#64748B]">
                No skills selected yet. Click any popular skill above or add a custom skill.
              </div>
            ) : (
              <div className="border border-[#E2E8F0] rounded-lg divide-y divide-[#F1F5F9] bg-white">
                {skillsOffered.map((s) => (
                  <div
                    key={s.skillName}
                    className="h-[52px] px-4 flex items-center justify-between hover:bg-[#F8FAFC] transition-colors"
                  >
                    <span className="text-[14px] font-medium text-[#0b1c30]">
                      {s.skillName}
                    </span>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <select
                          value={s.level}
                          onChange={(e) =>
                            updateSkillLevel(s.skillName, e.target.value as ProficiencyLevel)
                          }
                          className="h-[36px] pl-3 pr-8 bg-white border border-[#E2E8F0] rounded-lg text-[12px] font-medium text-[#0b1c30] focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] outline-none appearance-none cursor-pointer"
                        >
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                          <option value="Expert">Expert</option>
                        </select>
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none flex items-center">
                          <MaterialIcon icon="expand_more" size={18} />
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeSkillOffered(s.skillName)}
                        aria-label={`Delete ${s.skillName}`}
                        className="text-[#EF4444] hover:bg-[#FEF2F2] p-1.5 rounded transition-colors flex items-center justify-center cursor-pointer"
                      >
                        <MaterialIcon icon="delete" size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {validationError && (
              <p className="text-[12px] text-[#ba1a1a] mt-2 font-medium">{validationError}</p>
            )}
          </div>

          {/* Add Custom Skill Button / Inline Form */}
          <div className="mt-3">
            {isAddingCustom ? (
              <form onSubmit={handleAddCustomSkill} className="flex items-center gap-2">
                <input
                  type="text"
                  autoFocus
                  placeholder="Enter skill name (e.g. Redis, Kubernetes)..."
                  value={customSkillName}
                  onChange={(e) => setCustomSkillName(e.target.value)}
                  className="flex-1 h-[40px] px-3 bg-white border border-[#7C3AED] rounded-lg text-[14px] text-[#0b1c30] outline-none focus:ring-2 focus:ring-[#7C3AED]/20"
                />
                <button
                  type="submit"
                  className="h-[40px] px-4 rounded-lg bg-[#7C3AED] text-white text-[14px] font-medium hover:brightness-105 cursor-pointer"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingCustom(false);
                    setCustomSkillName('');
                  }}
                  className="h-[40px] px-3 rounded-lg border border-[#E2E8F0] text-[#64748B] text-[14px] hover:bg-[#F8FAFC] cursor-pointer"
                >
                  Cancel
                </button>
              </form>
            ) : (
              <button
                type="button"
                onClick={() => setIsAddingCustom(true)}
                className="h-[40px] px-4 rounded-lg border border-dashed border-[#CBD5E1] text-[#64748B] hover:border-[#7C3AED] hover:text-[#7C3AED] text-[14px] font-medium flex items-center gap-2 transition-colors w-full justify-center cursor-pointer"
              >
                <MaterialIcon icon="add" size={18} />
                <span>+ Add Custom Skill</span>
              </button>
            )}
          </div>
        </div>

        {/* Bottom Action Row */}
        <div className="pt-6 border-t border-[#E2E8F0] flex items-center justify-between mt-6">
          <button
            type="button"
            onClick={handleBack}
            className="h-[42px] px-5 rounded-lg border border-[#E2E8F0] bg-white text-[#1E293B] text-[14px] font-medium hover:bg-[#F8FAFC] hover:border-[#CBD5E1] transition-all cursor-pointer"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="h-[42px] px-6 rounded-lg text-white text-[14px] font-medium bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] hover:brightness-105 shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_14px_0_rgba(124,58,237,0.35)] transition-all cursor-pointer"
          >
            Next
          </button>
        </div>
      </section>
    </div>
  );
};
