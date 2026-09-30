import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextInput } from '../../components/common/TextInput';
import { Textarea } from '../../components/common/Textarea';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { SecondaryButton } from '../../components/common/SecondaryButton';
import { useOnboardingStore } from '../../stores/useOnboardingStore';

export const OnboardingProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const {
    fullName,
    university,
    major,
    yearOfStudy,
    location,
    bio,
    setProfileData,
  } = useOnboardingStore();

  const [form, setForm] = useState({
    fullName,
    university,
    major,
    yearOfStudy,
    location,
    bio,
  });

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileData(form);
    navigate('/onboarding/skills');
  };

  return (
    <div className="w-full max-w-[720px] bg-surface-container-lowest border border-border-standard rounded-xl p-8 shadow-elevation-1">
      <div className="mb-6">
        <h1 className="text-headline-lg font-headline-lg font-bold text-on-surface">
          Basic Information
        </h1>
        <p className="text-body-sm text-on-surface-variant mt-1">
          Tell future partners about your academic background and location.
        </p>
      </div>

      <form onSubmit={handleNext} className="flex flex-col gap-5">
        {/* Avatar Upload Preview */}
        <div className="flex items-center gap-5 p-4 rounded-xl bg-surface-container-low border border-surface-container">
          <div className="w-16 h-16 rounded-full bg-primary-fixed text-primary border border-primary-fixed-dim flex items-center justify-center font-bold text-headline-md flex-shrink-0">
            {form.fullName ? form.fullName.substring(0, 2).toUpperCase() : 'AM'}
          </div>
          <div>
            <h4 className="text-label-md font-semibold text-on-surface">Profile Picture</h4>
            <p className="text-body-sm text-on-surface-variant mt-0.5">PNG, JPG up to 5MB</p>
            <SecondaryButton type="button" className="h-8 px-3 text-xs mt-2">
              Change Photo
            </SecondaryButton>
          </div>
        </div>

        <TextInput
          label="Full Name"
          placeholder="e.g. Alex Morgan"
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput
            label="University / Institution"
            placeholder="e.g. Stanford University"
            value={form.university}
            onChange={(e) => setForm({ ...form, university: e.target.value })}
            required
          />

          <TextInput
            label="Major / Field of Study"
            placeholder="e.g. Computer Science"
            value={form.major}
            onChange={(e) => setForm({ ...form, major: e.target.value })}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput
            label="Year of Study"
            placeholder="e.g. Junior (Year 3)"
            value={form.yearOfStudy}
            onChange={(e) => setForm({ ...form, yearOfStudy: e.target.value })}
            required
          />

          <TextInput
            label="Location"
            placeholder="e.g. San Francisco, CA"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            required
          />
        </div>

        <Textarea
          label="Bio / Overview"
          placeholder="Provide a brief summary of your background, technical focus, and collaboration goals..."
          rows={3}
          value={form.bio}
          onChange={(e) => setForm({ ...form, bio: e.target.value })}
        />

        <div className="flex justify-end pt-4 border-t border-border-standard">
          <PrimaryButton type="submit" className="h-11 px-8">
            Next
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
};
