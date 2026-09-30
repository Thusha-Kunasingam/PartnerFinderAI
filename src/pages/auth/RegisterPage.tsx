import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextInput } from '../../components/common/TextInput';
import { PasswordInput } from '../../components/common/PasswordInput';
import { Checkbox } from '../../components/common/Checkbox';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { useAuthStore } from '../../stores/useAuthStore';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, updateProfile } = useAuthStore();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      setError('Please fill out all required fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!agreeTerms) {
      setError('Please accept the Terms of Service and Privacy Policy.');
      return;
    }

    login(email);
    updateProfile({ fullName, email });
    navigate('/onboarding/profile');
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6 py-12">
      <div className="w-full max-w-[480px] bg-surface-container-lowest border border-border-standard rounded-2xl p-8 shadow-elevation-1">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-fixed text-primary mb-3">
            <span className="material-symbols-outlined text-[28px]">hub</span>
          </div>
          <h1 className="text-headline-lg font-headline-lg font-bold text-on-surface">
            Create Your Account
          </h1>
          <p className="text-body-sm text-on-surface-variant mt-1">
            Join thousands of builders finding their ideal project partners.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-error text-label-sm font-medium flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">error</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <TextInput
            label="Full Name"
            placeholder="John Doe"
            leftIcon="person"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <TextInput
            label="Email Address"
            type="email"
            placeholder="name@company.com"
            leftIcon="mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <PasswordInput
            label="Password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <PasswordInput
            label="Confirm Password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <div className="mt-1">
            <Checkbox
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              label={
                <span>
                  I agree to the{' '}
                  <span className="text-primary-container font-medium hover:underline">Terms of Service</span> and{' '}
                  <span className="text-primary-container font-medium hover:underline">Privacy Policy</span>
                </span>
              }
            />
          </div>

          <PrimaryButton type="submit" fullWidth className="h-11 mt-2">
            Create Account
          </PrimaryButton>
        </form>

        <div className="text-center mt-6 pt-5 border-t border-border-standard text-body-sm text-on-surface-variant">
          Already have an account?{' '}
          <Link to="/login" className="text-primary-container font-semibold hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};
