import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchInput } from '../../components/common/SearchInput';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { SecondaryButton } from '../../components/common/SecondaryButton';
import { useOnboardingStore } from '../../stores/useOnboardingStore';
import { cn } from '../../utils/cn';

const suggestedTopics = [
  { name: 'Python', icon: 'terminal' },
  { name: 'Machine Learning', icon: 'psychology' },
  { name: 'Flutter', icon: 'smartphone' },
  { name: 'AI', icon: 'psychology' },
  { name: 'Data Science', icon: 'insights' },
  { name: 'UI/UX', icon: 'design_services' },
  { name: 'DevOps', icon: 'cloud_sync' },
  { name: 'Mobile Development', icon: 'smartphone' },
];

export const OnboardingLearnPage: React.FC = () => {
  const navigate = useNavigate();
  const { skillsToLearn, toggleSkillToLearn, removeSkillToLearn } = useOnboardingStore();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTopics = suggestedTopics.filter((t) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-[760px] bg-surface-container-lowest border border-border-standard rounded-xl p-8 shadow-elevation-1">
      <div className="mb-6">
        <h1 className="text-headline-lg font-headline-lg font-bold text-on-surface">
          Skills You Want to Learn
        </h1>
        <p className="text-body-sm text-on-surface-variant mt-1">
          Tell us what technologies, frameworks, or domains you want to learn from your partner.
        </p>
      </div>

      <div className="mb-6">
        <SearchInput
          placeholder="Search skills..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onClear={() => setSearchQuery('')}
        />
      </div>

      {/* Selected Target Learning Skills */}
      <div className="mb-8">
        <h2 className="text-headline-sm font-semibold text-on-surface mb-3">
          Selected Target Skills ({skillsToLearn.length})
        </h2>

        {skillsToLearn.length === 0 ? (
          <div className="p-6 rounded-xl border border-dashed border-border-input text-center text-body-sm text-on-surface-variant">
            No learning interests selected. Choose from suggested topics below.
          </div>
        ) : (
          <div className="flex flex-col gap-2.5">
            {skillsToLearn.map((skill) => (
              <div
                key={skill}
                className="flex items-center justify-between p-3.5 rounded-lg border border-[#BAE6FD] bg-[#E0F2FE]"
              >
                <div className="flex items-center gap-2.5 text-[#0284C7] font-semibold text-label-md">
                  <span className="material-symbols-outlined text-[20px]">check_circle</span>
                  <span>{skill}</span>
                </div>

                <button
                  type="button"
                  onClick={() => removeSkillToLearn(skill)}
                  className="p-1 text-[#0284C7] hover:opacity-75 cursor-pointer"
                  aria-label={`Remove ${skill}`}
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Suggested Topics Cloud */}
      <div className="mb-8">
        <h2 className="text-headline-sm font-semibold text-on-surface mb-3">Suggested Topics</h2>
        <div className="flex flex-wrap gap-2">
          {filteredTopics.map((topic) => {
            const isSelected = skillsToLearn.includes(topic.name);
            return (
              <button
                key={topic.name}
                type="button"
                onClick={() => toggleSkillToLearn(topic.name)}
                className={cn(
                  'h-9 px-3.5 rounded-full text-label-sm font-medium transition-all duration-150 flex items-center gap-1.5 border cursor-pointer select-none',
                  isSelected
                    ? 'bg-primary-container text-white border-primary-container shadow-sm'
                    : 'bg-surface-container-low text-on-surface border-border-standard hover:border-border-input hover:bg-surface-container'
                )}
              >
                <span className="material-symbols-outlined text-[16px] leading-none">
                  {topic.icon}
                </span>
                <span>{topic.name}</span>
                {isSelected && (
                  <span className="material-symbols-outlined text-[16px] leading-none">check</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-6 border-t border-border-standard">
        <SecondaryButton type="button" onClick={() => navigate('/onboarding/skills')} className="h-11 px-6">
          Back
        </SecondaryButton>
        <PrimaryButton
          type="button"
          onClick={() => navigate('/onboarding/partner-type')}
          disabled={skillsToLearn.length === 0}
          className="h-11 px-8"
        >
          Next
        </PrimaryButton>
      </div>
    </div>
  );
};
