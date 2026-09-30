import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchInput } from '../../components/common/SearchInput';
import { SelectDropdown } from '../../components/common/SelectDropdown';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { SecondaryButton } from '../../components/common/SecondaryButton';
import { useOnboardingStore } from '../../stores/useOnboardingStore';
import { ProficiencyLevel } from '../../types';
import { cn } from '../../utils/cn';

const popularSkills = [
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
  'FastAPI',
  'Node.js',
];

export const OnboardingSkillsPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    skillsOffered,
    toggleSkillOffered,
    updateSkillLevel,
    removeSkillOffered,
  } = useOnboardingStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [customSkill, setCustomSkill] = useState('');

  const filteredPopular = popularSkills.filter((s) =>
    s.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (customSkill.trim()) {
      toggleSkillOffered(customSkill.trim(), 'Intermediate');
      setCustomSkill('');
    }
  };

  return (
    <div className="w-full max-w-[760px] bg-surface-container-lowest border border-border-standard rounded-xl p-8 shadow-elevation-1">
      <div className="mb-6">
        <h1 className="text-headline-lg font-headline-lg font-bold text-on-surface">
          Add Your Skills
        </h1>
        <p className="text-body-sm text-on-surface-variant mt-1">
          Select technologies, frameworks, and tools you excel at to boost algorithmic matching.
        </p>
      </div>

      {/* Search Input */}
      <div className="mb-6">
        <SearchInput
          placeholder="Search skills..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onClear={() => setSearchQuery('')}
        />
      </div>

      {/* Popular Skills Cloud */}
      <div className="mb-8">
        <h2 className="text-headline-sm font-semibold text-on-surface mb-3">Popular Skills</h2>
        <div className="flex flex-wrap gap-2">
          {filteredPopular.map((skill) => {
            const isSelected = skillsOffered.some((s) => s.skillName === skill);
            return (
              <button
                key={skill}
                type="button"
                onClick={() => toggleSkillOffered(skill)}
                className={cn(
                  'h-9 px-3.5 rounded-full text-label-sm font-medium transition-all duration-150 flex items-center gap-1.5 border cursor-pointer select-none',
                  isSelected
                    ? 'bg-primary-container text-white border-primary-container shadow-sm'
                    : 'bg-surface-container-low text-on-surface border-border-standard hover:border-border-input hover:bg-surface-container'
                )}
              >
                <span>{skill}</span>
                {isSelected && (
                  <span className="material-symbols-outlined text-[16px] leading-none">check</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Skills Table */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-headline-sm font-semibold text-on-surface">
            Selected Skills ({skillsOffered.length})
          </h2>
        </div>

        {skillsOffered.length === 0 ? (
          <div className="p-6 rounded-xl border border-dashed border-border-input text-center text-body-sm text-on-surface-variant">
            No skills selected yet. Click skills above or add custom ones below.
          </div>
        ) : (
          <div className="flex flex-col gap-2.5">
            {skillsOffered.map((skill) => (
              <div
                key={skill.skillName}
                className="flex items-center justify-between p-3 rounded-lg border border-border-standard bg-surface-container-low"
              >
                <span className="font-semibold text-label-md text-on-surface">{skill.skillName}</span>

                <div className="flex items-center gap-3">
                  <div className="w-36">
                    <SelectDropdown
                      value={skill.level}
                      onChange={(e) =>
                        updateSkillLevel(skill.skillName, e.target.value as ProficiencyLevel)
                      }
                      options={[
                        { value: 'Beginner', label: 'Beginner' },
                        { value: 'Intermediate', label: 'Intermediate' },
                        { value: 'Advanced', label: 'Advanced' },
                        { value: 'Expert', label: 'Expert' },
                      ]}
                      className="h-9 py-0 text-xs"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => removeSkillOffered(skill.skillName)}
                    className="p-1 text-outline hover:text-error transition-colors cursor-pointer"
                    aria-label={`Remove ${skill.skillName}`}
                  >
                    <span className="material-symbols-outlined text-[20px]">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Custom Skill Form */}
      <form onSubmit={handleAddCustom} className="flex items-center gap-3 pt-4 border-t border-border-standard mb-8">
        <input
          type="text"
          placeholder="Add custom skill (e.g. PyTorch, Rust, Solidity)..."
          value={customSkill}
          onChange={(e) => setCustomSkill(e.target.value)}
          className="flex-1 h-10 px-3.5 rounded-lg border border-border-standard bg-surface-container-lowest text-body-md font-body-md text-on-surface focus:outline-none focus:border-primary-container"
        />
        <SecondaryButton type="submit" icon="add" iconPosition="left" className="h-10 text-xs">
          Add Custom
        </SecondaryButton>
      </form>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-6 border-t border-border-standard">
        <SecondaryButton type="button" onClick={() => navigate('/onboarding/profile')} className="h-11 px-6">
          Back
        </SecondaryButton>
        <PrimaryButton
          type="button"
          onClick={() => navigate('/onboarding/learn')}
          disabled={skillsOffered.length === 0}
          className="h-11 px-8"
        >
          Next
        </PrimaryButton>
      </div>
    </div>
  );
};
