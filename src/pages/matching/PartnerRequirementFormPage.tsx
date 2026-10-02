import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMatchingStore } from '../../stores/useMatchingStore';
import { MaterialIcon } from '../../components/common/MaterialIcon';

type DayOfWeek = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
type ExperienceLevel =
  | 'Entry Level (0 - 1 year)'
  | 'Intermediate (2 - 4 years)'
  | 'Senior (5+ years)'
  | 'Lead / Architect';
type ProjectDuration =
  | '2 Weeks (Sprint MVP)'
  | '4 Weeks (Prototype)'
  | '6 Weeks (Full V1 Build)'
  | '3 Months (Production Scale)';

const dayOptions: DayOfWeek[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const PartnerRequirementFormPage: React.FC = () => {
  const navigate = useNavigate();
  const { requirementsDraft, setRequirements, setIsProcessing, setProcessingProgress } = useMatchingStore();

  const [projectName, setProjectName] = useState(
    requirementsDraft.projectHeadline || 'AI Event Assistant'
  );
  const [requiredSkills, setRequiredSkills] = useState<string[]>(
    requirementsDraft.requiredSkills && requirementsDraft.requiredSkills.length > 0
      ? requirementsDraft.requiredSkills
      : ['Python', 'AI', 'Machine Learning']
  );
  const [newSkillInput, setNewSkillInput] = useState('');
  const [isAddingSkill, setIsAddingSkill] = useState(false);

  const [partnersNeeded, setPartnersNeeded] = useState(2);
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>(
    requirementsDraft.experienceLevel || 'Intermediate (2 - 4 years)'
  );
  const [availableDays, setAvailableDays] = useState<DayOfWeek[]>(
    requirementsDraft.availabilityDays && requirementsDraft.availabilityDays.length > 0
      ? requirementsDraft.availabilityDays
      : ['Sat', 'Sun']
  );
  const [preferredTime, setPreferredTime] = useState('6:00 PM - 9:00 PM');
  const [locationMode, setLocationMode] = useState('Online (Remote) / Jaffna');
  const [projectDuration, setProjectDuration] = useState<ProjectDuration>(
    requirementsDraft.projectDuration || '6 Weeks (Full V1 Build)'
  );
  const [projectSummary, setProjectSummary] = useState(
    requirementsDraft.projectDescription ||
      'Building an intelligent event assistant web app using LLMs, real-time schedule tracking, and automated reminders.'
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleDay = (day: DayOfWeek) => {
    if (availableDays.includes(day)) {
      setAvailableDays(availableDays.filter((d) => d !== day));
    } else {
      setAvailableDays([...availableDays, day]);
    }
  };

  const handleAddSkill = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = newSkillInput.trim();
    if (trimmed && !requiredSkills.includes(trimmed)) {
      setRequiredSkills([...requiredSkills, trimmed]);
      setNewSkillInput('');
      setIsAddingSkill(false);
      if (errors.skills) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next.skills;
          return next;
        });
      }
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setRequiredSkills(requiredSkills.filter((s) => s !== skillToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!projectName.trim()) {
      newErrors.projectName = 'Project name is required';
    }
    if (requiredSkills.length === 0) {
      newErrors.skills = 'Please specify at least one required skill';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const mappedLocation: 'Remote' | 'Hybrid' | 'On-site' = locationMode
      .toLowerCase()
      .includes('hybrid')
      ? 'Hybrid'
      : locationMode.toLowerCase().includes('on-site')
      ? 'On-site'
      : 'Remote';

    setRequirements({
      projectHeadline: projectName.trim(),
      requiredSkills,
      experienceLevel,
      availabilityDays: availableDays,
      locationPreference: mappedLocation,
      projectDuration,
      projectDescription: projectSummary,
    });

    setIsProcessing(true);
    setProcessingProgress(0);
    navigate('/matching/processing');
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto px-6 py-10 flex flex-col items-center justify-center">
      {/* Stepper Context Header */}
      <div className="w-full max-w-[900px] mb-4 flex items-center justify-between text-[14px] text-[#7b7487]">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-[#630ed4] text-white flex items-center justify-center text-[11px] font-bold">
            2
          </span>
          <span className="text-[12px] text-[#0b1c30] font-semibold">
            Step 2: Requirement Configuration
          </span>
        </div>
        <span className="text-[11px] uppercase tracking-wider text-[#7b7487]">
          Screen 8 • Requirement Spec
        </span>
      </div>

      {/* Centered Clean Form Container Card */}
      <section className="w-full max-w-[900px] bg-white rounded-xl border border-[#ccc3d8]/40 shadow-[0_1px_3px_0_rgba(15,23,42,0.05),0_1px_2px_-1px_rgba(15,23,42,0.03)] overflow-hidden">
        {/* Card Header */}
        <div className="px-8 pt-8 pb-6 border-b border-[#e5eeff]">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-[20px] leading-7 font-bold text-[#0b1c30]">
                Project Partner Requirements
              </h1>
              <p className="text-[14px] text-[#4a4455] mt-1">
                Specify your project details and ideal teammate profile to find your match.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eff4ff] border border-[#d3e4fe] text-[11px] text-[#630ed4] font-medium">
              <MaterialIcon icon="auto_awesome" size={15} />
              AI Engine Ready
            </span>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
            {/* 1. Project Name (Span 2) */}
            <div className="md:col-span-2">
              <label className="block text-[14px] font-medium text-[#0b1c30] mb-2" htmlFor="projectName">
                Project Name
              </label>
              <div className="relative">
                <input
                  id="projectName"
                  type="text"
                  value={projectName}
                  onChange={(e) => {
                    setProjectName(e.target.value);
                    if (errors.projectName) {
                      setErrors((prev) => {
                        const next = { ...prev };
                        delete next.projectName;
                        return next;
                      });
                    }
                  }}
                  placeholder="Enter project headline"
                  className={`w-full h-11 px-3.5 bg-white border ${
                    errors.projectName ? 'border-[#ba1a1a]' : 'border-[#ccc3d8]'
                  } rounded-lg text-[14px] text-[#0b1c30] placeholder:text-[#7b7487] focus:border-[#630ed4] focus:ring-2 focus:ring-[#630ed4]/20 transition-all outline-none pr-10`}
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#7b7487] pointer-events-none flex items-center">
                  <MaterialIcon icon="edit" size={20} />
                </span>
              </div>
              {errors.projectName && (
                <p className="text-[12px] text-[#ba1a1a] mt-1">{errors.projectName}</p>
              )}
            </div>

            {/* 2. Required Skills (Span 2) */}
            <div className="md:col-span-2">
              <label className="block text-[14px] font-medium text-[#0b1c30] mb-2">
                Required Skills
              </label>
              <div className={`min-h-[44px] p-2 bg-white border ${
                errors.skills ? 'border-[#ba1a1a]' : 'border-[#ccc3d8]'
              } rounded-lg flex flex-wrap items-center gap-2 focus-within:border-[#630ed4] focus-within:ring-2 focus-within:ring-[#630ed4]/20 transition-all`}>
                {requiredSkills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 h-7 px-3 rounded-full bg-[#eff4ff] border border-[#d3e4fe] text-[#0058be] text-[12px] font-medium"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      aria-label={`Remove ${skill}`}
                      className="hover:text-[#ba1a1a] transition-colors flex items-center justify-center cursor-pointer"
                    >
                      <MaterialIcon icon="close" size={14} />
                    </button>
                  </span>
                ))}

                {isAddingSkill ? (
                  <div className="inline-flex items-center gap-1">
                    <input
                      type="text"
                      autoFocus
                      value={newSkillInput}
                      onChange={(e) => setNewSkillInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddSkill();
                        } else if (e.key === 'Escape') {
                          setIsAddingSkill(false);
                          setNewSkillInput('');
                        }
                      }}
                      placeholder="Type skill & enter..."
                      className="h-7 px-2 border border-[#7C3AED] rounded text-[12px] outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleAddSkill()}
                      className="text-[12px] text-[#7C3AED] font-semibold px-1 cursor-pointer"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingSkill(false);
                        setNewSkillInput('');
                      }}
                      className="text-[12px] text-[#7b7487] px-1 cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsAddingSkill(true)}
                    className="flex items-center gap-1 text-[#7b7487] hover:text-[#630ed4] cursor-pointer px-2 py-1 text-[12px] font-medium"
                  >
                    <MaterialIcon icon="add" size={16} />
                    <span>Add skill</span>
                  </button>
                )}
              </div>
              {errors.skills && (
                <p className="text-[12px] text-[#ba1a1a] mt-1">{errors.skills}</p>
              )}
              <p className="text-[12px] text-[#7b7487] mt-1.5">
                Algorithmic matching weights skills heavily against vetted candidate portfolios.
              </p>
            </div>

            {/* 3. Number of Partners Needed */}
            <div>
              <label className="block text-[14px] font-medium text-[#0b1c30] mb-2" htmlFor="partnersNeeded">
                Number of Partners
              </label>
              <div className="relative">
                <input
                  id="partnersNeeded"
                  type="number"
                  min="1"
                  max="10"
                  value={partnersNeeded}
                  onChange={(e) => setPartnersNeeded(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full h-11 px-3.5 bg-white border border-[#ccc3d8] rounded-lg text-[14px] text-[#0b1c30] focus:border-[#630ed4] focus:ring-2 focus:ring-[#630ed4]/20 transition-all outline-none pr-10"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#7b7487] pointer-events-none flex items-center">
                  <MaterialIcon icon="group" size={20} />
                </span>
              </div>
            </div>

            {/* 4. Experience Level */}
            <div>
              <label className="block text-[14px] font-medium text-[#0b1c30] mb-2" htmlFor="experienceLevel">
                Preferred Experience Level
              </label>
              <div className="relative">
                <select
                  id="experienceLevel"
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value as ExperienceLevel)}
                  className="w-full h-11 px-3.5 bg-white border border-[#ccc3d8] rounded-lg text-[14px] text-[#0b1c30] focus:border-[#630ed4] focus:ring-2 focus:ring-[#630ed4]/20 transition-all outline-none appearance-none pr-10 cursor-pointer"
                >
                  <option value="Entry Level (0 - 1 year)">Entry Level (0 - 1 year)</option>
                  <option value="Intermediate (2 - 4 years)">Intermediate (2 - 4 years)</option>
                  <option value="Senior (5+ years)">Senior (5+ years)</option>
                  <option value="Lead / Architect">Lead / Architect</option>
                </select>
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#7b7487] flex items-center">
                  <MaterialIcon icon="expand_more" size={20} />
                </span>
              </div>
            </div>

            {/* 5. Available Days (Span 2) */}
            <div className="md:col-span-2">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-[14px] font-medium text-[#0b1c30]">
                  Available Days
                </label>
                <span className="text-[12px] text-[#7b7487]">Weekend sprint target</span>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {dayOptions.map((day) => {
                  const isSelected = availableDays.includes(day);
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleDay(day)}
                      className={`h-10 rounded-lg text-[12px] font-medium transition-colors flex items-center justify-center cursor-pointer ${
                        isSelected
                          ? 'border border-[#7c3aed] bg-[#7c3aed] text-white font-semibold shadow-sm'
                          : 'border border-[#ccc3d8]/60 bg-white text-[#4a4455] hover:border-[#7b7487]'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 6. Preferred Time */}
            <div>
              <label className="block text-[14px] font-medium text-[#0b1c30] mb-2" htmlFor="preferredTime">
                Preferred Time
              </label>
              <div className="relative">
                <input
                  id="preferredTime"
                  type="text"
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full h-11 px-3.5 bg-white border border-[#ccc3d8] rounded-lg text-[14px] text-[#0b1c30] placeholder:text-[#7b7487] focus:border-[#630ed4] focus:ring-2 focus:ring-[#630ed4]/20 transition-all outline-none pr-10"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#7b7487] pointer-events-none flex items-center">
                  <MaterialIcon icon="schedule" size={20} />
                </span>
              </div>
            </div>

            {/* 7. Location Preference */}
            <div>
              <label className="block text-[14px] font-medium text-[#0b1c30] mb-2" htmlFor="locationMode">
                Location Preference
              </label>
              <div className="relative">
                <input
                  id="locationMode"
                  type="text"
                  value={locationMode}
                  onChange={(e) => setLocationMode(e.target.value)}
                  className="w-full h-11 px-3.5 bg-white border border-[#ccc3d8] rounded-lg text-[14px] text-[#0b1c30] placeholder:text-[#7b7487] focus:border-[#630ed4] focus:ring-2 focus:ring-[#630ed4]/20 transition-all outline-none pr-10"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#7b7487] pointer-events-none flex items-center">
                  <MaterialIcon icon="location_on" size={20} />
                </span>
              </div>
            </div>

            {/* 8. Project Duration (Span 2) */}
            <div className="md:col-span-2">
              <label className="block text-[14px] font-medium text-[#0b1c30] mb-2" htmlFor="projectDuration">
                Estimated Project Duration
              </label>
              <div className="relative">
                <select
                  id="projectDuration"
                  value={projectDuration}
                  onChange={(e) => setProjectDuration(e.target.value as ProjectDuration)}
                  className="w-full h-11 px-3.5 bg-white border border-[#ccc3d8] rounded-lg text-[14px] text-[#0b1c30] focus:border-[#630ed4] focus:ring-2 focus:ring-[#630ed4]/20 transition-all outline-none appearance-none pr-10 cursor-pointer"
                >
                  <option value="2 Weeks (Sprint MVP)">2 Weeks (Sprint MVP)</option>
                  <option value="4 Weeks (Prototype)">4 Weeks (Prototype)</option>
                  <option value="6 Weeks (Full V1 Build)">6 Weeks (Full V1 Build)</option>
                  <option value="3 Months (Production Scale)">3 Months (Production Scale)</option>
                </select>
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#7b7487] flex items-center">
                  <MaterialIcon icon="calendar_today" size={20} />
                </span>
              </div>
            </div>

            {/* 9. Project Summary (Span 2) */}
            <div className="md:col-span-2">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-[14px] font-medium text-[#0b1c30]" htmlFor="projectSummary">
                  Project Summary
                </label>
                <span className="text-[#7b7487] text-[12px]">Optional</span>
              </div>
              <textarea
                id="projectSummary"
                rows={3}
                value={projectSummary}
                onChange={(e) => setProjectSummary(e.target.value)}
                className="w-full p-3.5 bg-white border border-[#ccc3d8] rounded-lg text-[14px] text-[#0b1c30] focus:border-[#630ed4] focus:ring-2 focus:ring-[#630ed4]/20 transition-all outline-none resize-none leading-relaxed"
              />
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="pt-6 border-t border-[#e5eeff] flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigate('/onboarding/partner-type')}
              className="h-[42px] px-5 bg-white border border-[#ccc3d8] rounded-lg text-[#0b1c30] hover:bg-[#eff4ff] hover:border-[#7b7487] text-[14px] font-medium flex items-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
            >
              <MaterialIcon icon="arrow_back" size={18} />
              <span>Back</span>
            </button>
            <button
              type="submit"
              className="h-[42px] px-6 rounded-lg text-white font-medium text-[14px] bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] hover:brightness-105 shadow-sm hover:shadow-[0_4px_14px_0_rgba(124,58,237,0.35)] flex items-center gap-2 active:scale-[0.98] cursor-pointer transition-all"
            >
              <MaterialIcon icon="auto_awesome" size={18} />
              <span>Find Partners</span>
            </button>
          </div>
        </form>
      </section>

      {/* Contextual System Status Badge */}
      <div className="mt-6 flex items-center gap-2 text-[#7b7487] text-[12px]">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span>AI Matcher indexing over 1,420 registered engineering and design profiles</span>
      </div>
    </div>
  );
};
