import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboardingStore } from '../../stores/useOnboardingStore';
import { MaterialIcon } from '../../components/common/MaterialIcon';

export const OnboardingProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    fullName,
    university,
    major,
    yearOfStudy,
    location,
    bio,
    setProfileData,
    setStep,
  } = useOnboardingStore();

  const [formData, setFormData] = useState({
    fullName: fullName || '',
    university: university || '',
    major: major || '',
    yearOfStudy: yearOfStudy || '',
    location: location || '',
    bio: bio || '',
  });

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarPreview(url);
    }
  };

  const handleFieldChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.university.trim()) newErrors.university = 'University is required';
    if (!formData.major.trim()) newErrors.major = 'Course is required';
    if (!formData.yearOfStudy.trim()) newErrors.yearOfStudy = 'Year is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setProfileData(formData);
    setStep(2);
    navigate('/onboarding/skills');
  };

  return (
    <div className="w-full max-w-[960px] bg-white border border-[#ccc3d8]/40 rounded-xl shadow-[0_1px_3px_0_rgba(15,23,42,0.05),0_1px_2px_-1px_rgba(15,23,42,0.03)] flex flex-col md:flex-row overflow-hidden">
      {/* Left Narrow Column: Vertical Onboarding Progress */}
      <aside className="w-full md:w-[260px] bg-[#f8f9ff] border-b md:border-b-0 md:border-r border-[#ccc3d8]/30 p-8 flex flex-col justify-start">
        <div className="space-y-6">
          {/* Step 1: Basic Info — active purple */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#7c3aed] text-white flex items-center justify-center text-[14px] font-semibold shadow-sm">
              1
            </div>
            <span className="text-[#7c3aed] text-[16px] font-semibold">
              Basic Info
            </span>
          </div>

          {/* Step 2: Skills — inactive gray */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#e5eeff] text-[#474e64] flex items-center justify-center text-[14px] font-medium border border-[#ccc3d8]/50">
              2
            </div>
            <span className="text-[#474e64] text-[14px] font-normal">
              Skills
            </span>
          </div>

          {/* Step 3: Interests — inactive gray */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#e5eeff] text-[#474e64] flex items-center justify-center text-[14px] font-medium border border-[#ccc3d8]/50">
              3
            </div>
            <span className="text-[#474e64] text-[14px] font-normal">
              Interests
            </span>
          </div>

          {/* Step 4: Complete — inactive gray */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#e5eeff] text-[#474e64] flex items-center justify-center text-[14px] font-medium border border-[#ccc3d8]/50">
              4
            </div>
            <span className="text-[#474e64] text-[14px] font-normal">
              Complete
            </span>
          </div>
        </div>
      </aside>

      {/* Right Main Column: Basic Information Form */}
      <section className="flex-1 p-8 md:p-10 flex flex-col justify-between bg-white">
        <form onSubmit={handleSubmit} className="flex flex-col justify-between flex-1">
          <div>
            {/* Header Area */}
            <div className="mb-6">
              <h1 className="text-[24px] leading-8 font-semibold text-[#0b1c30]">Basic Information</h1>
              <p className="text-[14px] leading-5 text-[#4a4455] mt-1">Tell us about yourself.</p>
            </div>

            {/* Top Center Circular Avatar with Change Photo Link */}
            <div className="flex flex-col items-center justify-center mb-8">
              <div className="relative w-20 h-20 rounded-full bg-[#e5eeff] border border-[#ccc3d8]/50 flex items-center justify-center overflow-hidden mb-2">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Avatar preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <MaterialIcon icon="person" size={40} className="text-[#7b7487]" />
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-[#7c3aed] hover:text-[#630ed4] text-[12px] font-medium transition-colors duration-150 cursor-pointer"
              >
                Change Photo
              </button>
            </div>

            {/* Form Fields Cluster */}
            <div className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-[14px] font-medium text-[#0b1c30] mb-1" htmlFor="full-name">
                  Full Name
                </label>
                <input
                  id="full-name"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleFieldChange('fullName', e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className={`w-full h-[40px] px-3 bg-white border ${
                    errors.fullName ? 'border-[#ba1a1a]' : 'border-[#ccc3d8]/60'
                  } rounded-lg text-[14px] text-[#0b1c30] focus:outline-none focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/15 placeholder-[#7b7487]`}
                />
                {errors.fullName && (
                  <p className="text-[12px] text-[#ba1a1a] mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* University & Course */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[14px] font-medium text-[#0b1c30] mb-1" htmlFor="university">
                    University
                  </label>
                  <input
                    id="university"
                    type="text"
                    value={formData.university}
                    onChange={(e) => handleFieldChange('university', e.target.value)}
                    placeholder="e.g. Stanford University"
                    className={`w-full h-[40px] px-3 bg-white border ${
                      errors.university ? 'border-[#ba1a1a]' : 'border-[#ccc3d8]/60'
                    } rounded-lg text-[14px] text-[#0b1c30] focus:outline-none focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/15 placeholder-[#7b7487]`}
                  />
                  {errors.university && (
                    <p className="text-[12px] text-[#ba1a1a] mt-1">{errors.university}</p>
                  )}
                </div>

                <div>
                  <label className="block text-[14px] font-medium text-[#0b1c30] mb-1" htmlFor="course">
                    Course
                  </label>
                  <input
                    id="course"
                    type="text"
                    value={formData.major}
                    onChange={(e) => handleFieldChange('major', e.target.value)}
                    placeholder="e.g. Computer Science"
                    className={`w-full h-[40px] px-3 bg-white border ${
                      errors.major ? 'border-[#ba1a1a]' : 'border-[#ccc3d8]/60'
                    } rounded-lg text-[14px] text-[#0b1c30] focus:outline-none focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/15 placeholder-[#7b7487]`}
                  />
                  {errors.major && (
                    <p className="text-[12px] text-[#ba1a1a] mt-1">{errors.major}</p>
                  )}
                </div>
              </div>

              {/* Year & Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[14px] font-medium text-[#0b1c30] mb-1" htmlFor="year">
                    Year
                  </label>
                  <input
                    id="year"
                    type="text"
                    value={formData.yearOfStudy}
                    onChange={(e) => handleFieldChange('yearOfStudy', e.target.value)}
                    placeholder="e.g. Junior (Year 3)"
                    className={`w-full h-[40px] px-3 bg-white border ${
                      errors.yearOfStudy ? 'border-[#ba1a1a]' : 'border-[#ccc3d8]/60'
                    } rounded-lg text-[14px] text-[#0b1c30] focus:outline-none focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/15 placeholder-[#7b7487]`}
                  />
                  {errors.yearOfStudy && (
                    <p className="text-[12px] text-[#ba1a1a] mt-1">{errors.yearOfStudy}</p>
                  )}
                </div>

                <div>
                  <label className="block text-[14px] font-medium text-[#0b1c30] mb-1" htmlFor="location">
                    Location
                  </label>
                  <input
                    id="location"
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleFieldChange('location', e.target.value)}
                    placeholder="e.g. San Francisco, CA"
                    className={`w-full h-[40px] px-3 bg-white border ${
                      errors.location ? 'border-[#ba1a1a]' : 'border-[#ccc3d8]/60'
                    } rounded-lg text-[14px] text-[#0b1c30] focus:outline-none focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/15 placeholder-[#7b7487]`}
                  />
                  {errors.location && (
                    <p className="text-[12px] text-[#ba1a1a] mt-1">{errors.location}</p>
                  )}
                </div>
              </div>

              {/* About Me */}
              <div>
                <label className="block text-[14px] font-medium text-[#0b1c30] mb-1" htmlFor="about-me">
                  About Me
                </label>
                <textarea
                  id="about-me"
                  rows={4}
                  value={formData.bio}
                  onChange={(e) => handleFieldChange('bio', e.target.value)}
                  placeholder="Provide a brief summary of your background, technical focus, and collaboration goals..."
                  className="w-full p-3 bg-white border border-[#ccc3d8]/60 rounded-lg text-[14px] text-[#0b1c30] focus:outline-none focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/15 placeholder-[#7b7487] resize-none"
                />
              </div>
            </div>
          </div>

          {/* Action Bar: Bottom Right Purple-to-Blue Gradient Next Button */}
          <div className="flex justify-end items-center pt-6 mt-6 border-t border-[#ccc3d8]/20">
            <button
              type="submit"
              className="h-[42px] px-[18px] rounded-lg text-white text-[14px] font-medium bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] hover:brightness-105 transition-all duration-150 shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_14px_0_rgba(124,58,237,0.35)] active:scale-[0.98] cursor-pointer"
            >
              Next
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};
