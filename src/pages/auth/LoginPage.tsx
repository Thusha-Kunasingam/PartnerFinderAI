import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextInput } from '../../components/common/TextInput';
import { PasswordInput } from '../../components/common/PasswordInput';
import { Checkbox } from '../../components/common/Checkbox';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { SecondaryButton } from '../../components/common/SecondaryButton';
import { useAuthStore } from '../../stores/useAuthStore';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const [email, setEmail] = useState('k.thusha@example.com');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
    navigate('/dashboard');
  };

  const handleSocialLogin = () => {
    login(email);
    navigate('/dashboard');
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6 py-12">
      <div className="w-full max-w-[440px] bg-surface-container-lowest border border-border-standard rounded-2xl p-8 shadow-elevation-1">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-fixed text-primary mb-3">
            <span className="material-symbols-outlined text-[28px]">hub</span>
          </div>
          <h1 className="text-headline-lg font-headline-lg font-bold text-on-surface">
            Welcome Back
          </h1>
          <p className="text-body-sm text-on-surface-variant mt-1">
            Sign in to your account to continue
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
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

          <div className="flex items-center justify-between mt-1">
            <Checkbox
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              label="Remember for 30 days"
            />
            <Link to="/login" className="text-label-sm text-primary-container font-medium hover:underline">
              Forgot Password?
            </Link>
          </div>

          <PrimaryButton type="submit" fullWidth className="h-11 mt-2">
            Login
          </PrimaryButton>
        </form>

        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border-standard" />
          </div>
          <span className="relative bg-surface-container-lowest px-3 text-label-xs text-outline uppercase font-semibold">
            Or continue with
          </span>
        </div>

        <div className="flex flex-col gap-2.5">
          <SecondaryButton fullWidth onClick={handleSocialLogin}>
            <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            Continue with Google
          </SecondaryButton>

          <SecondaryButton fullWidth onClick={handleSocialLogin}>
            <svg className="w-4 h-4 mr-1" viewBox="0 0 23 23">
              <path fill="#f35325" d="M1 1h10v10H1z"/>
              <path fill="#81bc06" d="M12 1h10v10H12z"/>
              <path fill="#05a6f0" d="M1 12h10v10H1z"/>
              <path fill="#ffba08" d="M12 12h10v10H12z"/>
            </svg>
            Continue with Microsoft
          </SecondaryButton>
        </div>

        <div className="text-center mt-6 pt-5 border-t border-border-standard text-body-sm text-on-surface-variant">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary-container font-semibold hover:underline">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};
