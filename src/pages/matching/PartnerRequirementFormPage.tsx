import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextInput } from '../../components/common/TextInput';
import { SelectDropdown } from '../../components/common/SelectDropdown';
import { Textarea } from '../../components/common/Textarea';
import { DayToggleButton } from '../../components/common/DayToggleButton';
import { SkillPill } from '../../components/common/SkillPill';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { SecondaryButton } from '../../components/common/SecondaryButton';
import { useMatchingStore } from '../../stores/useMatchingStore';

const daysOfWeek: ('Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun')[] = [
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
  'Sun',
];

export const PartnerRequirementFormPage: React.FC = () => {
  const navigate = useNavigate();
  const { requirementsDraft, setRequirements, setIsProcessing, setProcessingProgress } = useMatchingStore();

  const [form, setForm] = useState(requirementsDraft);
  const [newSkill, setNewSkill] = useState('');

  const toggleDay = (day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun') => {
    const exists = form.availabilityDays.includes(day);
    const updated = exists
      ? form.availabilityDays.filter((d) => d !== day)
      : [...form.availabilityDays, day];
    setForm({ ...form, availabilityDays: updated });
  };

  const addSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim() && !form.requiredSkills.includes(newSkill.trim())) {
      setForm({ ...form, requiredSkills: [...form.requiredSkills, newSkill.trim()] });
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setForm({
      ...form,
      requiredSkills: form.requiredSkills.filter((s) => s !== skill),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRequirements(form);
    setIsProcessing(true);
    setProcessingProgress(0);
    navigate('/matching/processing');
  };

  return (
    <div className="w-full max-w-[800px] bg-surface-container-lowest border border-border-standard rounded-xl p-8 shadow-elevation-1 mx-auto my-6">
      <div className="mb-6">
        <h1 className="text-headline-lg font-headline-lg font-bold text-on-surface">
          Project Partner Requirements
        </h1>
        <p className="text-body-sm text-on-surface-variant mt-1">
          Specify exact technologies, time commitments, and experience to run the algorithmic matcher.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <TextInput
          label="Project Headline"
          placeholder="Enter project headline (e.g. AI Event Assistant)"
          value={form.projectHeadline}
          onChange={(e) => setForm({ ...form, projectHeadline: e.target.value })}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput
            label="Required Role / Title"
            placeholder="e.g. Full Stack AI Developer"
            value={form.requiredRole}
            onChange={(e) => setForm({ ...form, requiredRole: e.target.value })}
            required
          />

          <SelectDropdown
            label="Experience Level Required"
            value={form.experienceLevel}
            onChange={(e) =>
              setForm({
                ...form,
                experienceLevel: e.target.value as any,
              })
            }
            options={[
              { value: 'Entry Level (0 - 1 year)', label: 'Entry Level (0 - 1 year)' },
              { value: 'Intermediate (2 - 4 years)', label: 'Intermediate (2 - 4 years)' },
              { value: 'Senior (5+ years)', label: 'Senior (5+ years)' },
              { value: 'Lead / Architect', label: 'Lead / Architect' },
            ]}
          />
        </div>

        {/* Required Skills Input & Pills */}
        <div className="flex flex-col gap-2">
          <label className="text-label-sm font-label-sm text-on-surface font-medium">
            Required Tech Stack & Skills
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Add required skill (e.g. Python, PyTorch, React)..."
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="flex-1 h-10 px-3.5 rounded-lg border border-border-standard bg-surface-container-lowest text-body-md text-on-surface focus:outline-none focus:border-primary-container"
            />
            <SecondaryButton type="button" onClick={addSkill} className="h-10 text-xs">
              + Add Skill
            </SecondaryButton>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            {form.requiredSkills.map((s) => (
              <SkillPill key={s} label={s} onRemove={() => removeSkill(s)} />
            ))}
          </div>
        </div>

        {/* Time Commitment & Days of Week */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput
            label="Weekly Hours Commitment"
            type="number"
            min="1"
            max="60"
            placeholder="e.g. 15"
            value={form.weeklyHoursCommitment}
            onChange={(e) =>
              setForm({ ...form, weeklyHoursCommitment: parseInt(e.target.value) || 0 })
            }
            required
          />

          <SelectDropdown
            label="Project Duration"
            value={form.projectDuration}
            onChange={(e) =>
              setForm({
                ...form,
                projectDuration: e.target.value as any,
              })
            }
            options={[
              { value: '2 Weeks (Sprint MVP)', label: '2 Weeks (Sprint MVP)' },
              { value: '4 Weeks (Prototype)', label: '4 Weeks (Prototype)' },
              { value: '6 Weeks (Full V1 Build)', label: '6 Weeks (Full V1 Build)' },
              { value: '3 Months (Production Scale)', label: '3 Months (Production Scale)' },
            ]}
          />
        </div>

        {/* Days of Week Selector */}
        <div className="flex flex-col gap-2">
          <label className="text-label-sm font-label-sm text-on-surface font-medium">
            Preferred Availability Days
          </label>
          <div className="flex flex-wrap items-center gap-2">
            {daysOfWeek.map((day) => (
              <DayToggleButton
                key={day}
                day={day}
                selected={form.availabilityDays.includes(day)}
                onToggle={toggleDay}
              />
            ))}
          </div>
        </div>

        <Textarea
          label="Detailed Project Scope & Expectations"
          placeholder="Describe your architecture vision, milestones, and what you expect from your ideal collaborator..."
          rows={4}
          value={form.projectDescription}
          onChange={(e) => setForm({ ...form, projectDescription: e.target.value })}
        />

        {/* Action Footer */}
        <div className="flex items-center justify-between pt-6 border-t border-border-standard">
          <SecondaryButton type="button" onClick={() => navigate('/onboarding/partner-type')} className="h-11 px-6">
            Back
          </SecondaryButton>
          <PrimaryButton
            type="submit"
            icon="auto_awesome"
            iconPosition="left"
            className="h-11 px-8 shadow-ambient-primary"
          >
            Find Partners
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
};
