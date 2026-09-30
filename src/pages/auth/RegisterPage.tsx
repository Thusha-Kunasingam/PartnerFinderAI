import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MaterialIcon } from '../../components/common/MaterialIcon';
import { useAuthStore } from '../../stores/useAuthStore';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, updateProfile } = useAuthStore();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    } else if (fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }

    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate brief network submission for loading state
    setTimeout(() => {
      login(email.trim());
      updateProfile({
        fullName: fullName.trim(),
        email: email.trim(),
        initials: fullName
          .trim()
          .split(' ')
          .map((n) => n[0])
          .join('')
          .slice(0, 2)
          .toUpperCase(),
      });
      setIsSubmitting(false);
      navigate('/onboarding/profile');
    }, 400);
  };

  return (
    <div className="bg-[#f8f9ff] text-[#0b1c30] antialiased min-h-screen flex items-center justify-center p-6 selection:bg-[#eaddff] selection:text-[#25005a]">
      {/* Registration Card Container (approx 420px wide) */}
      <main className="w-full max-w-[420px] bg-white rounded-[12px] border border-[#E2E8F0] shadow-[0_1px_3px_0_rgba(15,23,42,0.05),0_1px_2px_-1px_rgba(15,23,42,0.03)] p-8">
        {/* Top of Card: Logo, Heading, Subtitle */}
        <div className="flex flex-col items-center text-center mb-7">
          <Link to="/" className="flex items-center gap-2 mb-4 group cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-[#0b1c30] flex items-center justify-center text-white group-hover:opacity-90 transition-opacity">
              <MaterialIcon icon="hub" size={20} />
            </div>
            <span className="text-[20px] font-bold text-[#0b1c30] tracking-tight">
              PartnerFinder AI
            </span>
          </Link>
          <h1 className="text-[24px] font-bold text-[#0b1c30] tracking-tight mb-1.5">
            Create Your Account
          </h1>
          <p className="text-[14px] text-[#474e64]">
            Join and start finding your perfect partner.
          </p>
        </div>

        {/* Form Section */}
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          {/* 1. Full Name */}
          <div className="space-y-1.5">
            <label className="block text-[14px] font-medium text-[#0b1c30]" htmlFor="full_name">
              Full Name
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-[20px] text-[#94A3B8] pointer-events-none flex items-center">
                <MaterialIcon icon="person" size={20} />
              </span>
              <input
                id="full_name"
                name="full_name"
                type="text"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: '' }));
                }}
                placeholder="John Doe"
                className={`w-full h-[46px] pl-10 pr-4 bg-white border ${
                  errors.fullName ? 'border-[#ba1a1a] ring-1 ring-[#ba1a1a]' : 'border-[#E2E8F0]'
                } rounded-[10px] text-[14px] text-[#0b1c30] placeholder-[#94A3B8] focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/15 focus:outline-none transition-all duration-150`}
              />
            </div>
            {errors.fullName && (
              <p className="text-[11px] text-[#ba1a1a] font-medium mt-1">{errors.fullName}</p>
            )}
          </div>

          {/* 2. Email */}
          <div className="space-y-1.5">
            <label className="block text-[14px] font-medium text-[#0b1c30]" htmlFor="email">
              Email
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-[20px] text-[#94A3B8] pointer-events-none flex items-center">
                <MaterialIcon icon="mail" size={20} />
              </span>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                }}
                placeholder="name@company.com"
                className={`w-full h-[46px] pl-10 pr-4 bg-white border ${
                  errors.email ? 'border-[#ba1a1a] ring-1 ring-[#ba1a1a]' : 'border-[#E2E8F0]'
                } rounded-[10px] text-[14px] text-[#0b1c30] placeholder-[#94A3B8] focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/15 focus:outline-none transition-all duration-150`}
              />
            </div>
            {errors.email && (
              <p className="text-[11px] text-[#ba1a1a] font-medium mt-1">{errors.email}</p>
            )}
          </div>

          {/* 3. Password */}
          <div className="space-y-1.5">
            <label className="block text-[14px] font-medium text-[#0b1c30]" htmlFor="password">
              Password
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-[20px] text-[#94A3B8] pointer-events-none flex items-center">
                <MaterialIcon icon="lock" size={20} />
              </span>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
                }}
                placeholder="••••••••"
                className={`w-full h-[46px] pl-10 pr-10 bg-white border ${
                  errors.password ? 'border-[#ba1a1a] ring-1 ring-[#ba1a1a]' : 'border-[#E2E8F0]'
                } rounded-[10px] text-[14px] text-[#0b1c30] placeholder-[#94A3B8] focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/15 focus:outline-none transition-all duration-150`}
              />
              <button
                type="button"
                aria-label="Toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-[#94A3B8] hover:text-[#0b1c30] focus:outline-none flex items-center justify-center transition-colors duration-150 cursor-pointer"
              >
                <MaterialIcon icon={showPassword ? 'visibility_off' : 'visibility'} size={20} />
              </button>
            </div>
            {errors.password && (
              <p className="text-[11px] text-[#ba1a1a] font-medium mt-1">{errors.password}</p>
            )}
          </div>

          {/* 4. Confirm Password */}
          <div className="space-y-1.5">
            <label
              className="block text-[14px] font-medium text-[#0b1c30]"
              htmlFor="confirm_password"
            >
              Confirm Password
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-[20px] text-[#94A3B8] pointer-events-none flex items-center">
                <MaterialIcon icon="lock" size={20} />
              </span>
              <input
                id="confirm_password"
                name="confirm_password"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword)
                    setErrors((prev) => ({ ...prev, confirmPassword: '' }));
                }}
                placeholder="••••••••"
                className={`w-full h-[46px] pl-10 pr-10 bg-white border ${
                  errors.confirmPassword
                    ? 'border-[#ba1a1a] ring-1 ring-[#ba1a1a]'
                    : 'border-[#E2E8F0]'
                } rounded-[10px] text-[14px] text-[#0b1c30] placeholder-[#94A3B8] focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/15 focus:outline-none transition-all duration-150`}
              />
              <button
                type="button"
                aria-label="Toggle confirm password visibility"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3.5 text-[#94A3B8] hover:text-[#0b1c30] focus:outline-none flex items-center justify-center transition-colors duration-150 cursor-pointer"
              >
                <MaterialIcon
                  icon={showConfirmPassword ? 'visibility_off' : 'visibility'}
                  size={20}
                />
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-[11px] text-[#ba1a1a] font-medium mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-[44px] bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] hover:brightness-108 hover:shadow-[0_4px_14px_0_rgba(124,58,237,0.35)] text-white font-medium text-[14px] rounded-[8px] flex items-center justify-center transition-all duration-150 active:scale-[0.98] cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Creating Account...</span>
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </div>
        </form>

        {/* Bottom Link */}
        <div className="mt-6 text-center text-[14px] text-[#474e64]">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-[#7c3aed] font-medium hover:underline ml-1"
          >
            Login
          </Link>
        </div>
      </main>
    </div>
  );
};
