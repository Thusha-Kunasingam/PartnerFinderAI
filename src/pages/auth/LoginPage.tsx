import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MaterialIcon } from '../../components/common/MaterialIcon';
import { useAuthStore } from '../../stores/useAuthStore';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, currentUser } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSubmitted, setForgotSubmitted] = useState(false);

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      login(email.trim());
      setIsSubmitting(false);

      // On successful login:
      // If user has completed profile -> /dashboard, else -> /onboarding/profile
      if (currentUser?.skillsOffered && currentUser.skillsOffered.length > 0) {
        navigate('/dashboard');
      } else {
        navigate('/onboarding/profile');
      }
    }, 400);
  };

  const handleSocialLogin = (provider: string) => {
    setIsSubmitting(true);
    setTimeout(() => {
      login(`demo.${provider.toLowerCase()}@partnerfinder.ai`);
      setIsSubmitting(false);
      navigate('/dashboard');
    }, 400);
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotEmail)) return;
    setForgotSubmitted(true);
  };

  return (
    <div className="bg-[#f8f9ff] text-[#0b1c30] min-h-screen flex items-center justify-center p-4 antialiased selection:bg-[#eaddff] selection:text-[#25005a]">
      {/* Centered Login Card Container (Approx 420px wide, 12px radius, soft border, level 1 elevation) */}
      <main className="w-full max-w-[420px] bg-white border border-[#E2E8F0] rounded-xl p-8 shadow-[0_1px_3px_0_rgba(15,23,42,0.05),0_1px_2px_-1px_rgba(15,23,42,0.03)] flex flex-col">
        {/* Top Branding & Headers */}
        <header className="flex flex-col items-center text-center">
          {/* Product Logo & Name */}
          <Link to="/" className="flex items-center gap-2 mb-6 group cursor-pointer">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#7c3aed] to-[#2170e4] flex items-center justify-center text-white shadow-sm group-hover:opacity-90 transition-opacity">
              <MaterialIcon icon="hub" size={20} />
            </div>
            <span className="text-[20px] font-bold text-[#0b1c30] tracking-tight">
              PartnerFinder AI
            </span>
          </Link>
          {/* Heading */}
          <h1 className="text-[24px] font-bold text-[#0b1c30] tracking-tight">
            Welcome Back
          </h1>
          {/* Subtitle */}
          <p className="text-[14px] text-[#474e64] mt-1">Login to continue</p>
        </header>

        {errors.general && (
          <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-[#ba1a1a] text-[12px] flex items-center gap-2">
            <MaterialIcon icon="error" size={16} />
            <span>{errors.general}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="mt-8 flex flex-col gap-4" noValidate>
          {/* Email Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-medium text-[#0b1c30]" htmlFor="email">
              Email
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-[#474e64] text-[18px] pointer-events-none flex items-center">
                <MaterialIcon icon="mail" size={18} />
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
                className={`w-full h-11 pl-10 pr-3.5 bg-white border ${
                  errors.email ? 'border-[#ba1a1a] ring-1 ring-[#ba1a1a]' : 'border-[#E2E8F0]'
                } rounded-lg text-[14px] text-[#0b1c30] placeholder:text-[#474e64]/60 focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/15 focus:outline-none transition-all duration-150`}
              />
            </div>
            {errors.email && (
              <p className="text-[11px] text-[#ba1a1a] font-medium mt-0.5">{errors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-medium text-[#0b1c30]" htmlFor="password">
              Password
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-[#474e64] text-[18px] pointer-events-none flex items-center">
                <MaterialIcon icon="lock" size={18} />
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
                className={`w-full h-11 pl-10 pr-10 bg-white border ${
                  errors.password ? 'border-[#ba1a1a] ring-1 ring-[#ba1a1a]' : 'border-[#E2E8F0]'
                } rounded-lg text-[14px] text-[#0b1c30] placeholder:text-[#474e64]/60 focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/15 focus:outline-none transition-all duration-150`}
              />
              <button
                type="button"
                aria-label="Toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-[#474e64] hover:text-[#0b1c30] flex items-center justify-center p-0.5 focus:outline-none cursor-pointer"
              >
                <MaterialIcon icon={showPassword ? 'visibility_off' : 'visibility'} size={18} />
              </button>
            </div>
            {errors.password && (
              <p className="text-[11px] text-[#ba1a1a] font-medium mt-0.5">{errors.password}</p>
            )}
          </div>

          {/* Remember me & Forgot Password Row */}
          <div className="flex items-center justify-between mt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-[18px] h-[18px] rounded border-[#E2E8F0] text-[#7c3aed] focus:ring-[#7c3aed]/20 focus:ring-offset-0 cursor-pointer"
              />
              <span className="text-[12px] text-[#0b1c30]">Remember me</span>
            </label>
            <button
              type="button"
              onClick={() => {
                setForgotEmail(email);
                setForgotSubmitted(false);
                setIsForgotModalOpen(true);
              }}
              className="text-[12px] text-[#7c3aed] hover:text-[#630ed4] transition-colors duration-150 font-medium cursor-pointer"
            >
              Forgot Password?
            </button>
          </div>

          {/* Purple Gradient Login Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-[42px] mt-2 rounded-lg bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] hover:brightness-105 active:scale-[0.99] text-white text-[14px] font-medium shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_14px_0_rgba(124,58,237,0.35)] transition-all duration-150 flex items-center justify-center cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>Logging in...</span>
              </div>
            ) : (
              'Login'
            )}
          </button>
        </form>

        {/* Soft Subtle OR Divider */}
        <div className="relative my-6 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#E2E8F0]"></div>
          </div>
          <div className="relative bg-white px-3">
            <span className="text-[11px] text-[#474e64] tracking-wider font-semibold">OR</span>
          </div>
        </div>

        {/* Social Login Buttons Cluster */}
        <div className="flex flex-col gap-2.5">
          {/* Continue with Google */}
          <button
            type="button"
            onClick={() => handleSocialLogin('Google')}
            className="w-full h-[42px] bg-white border border-[#E2E8F0] hover:bg-[#f8f9ff] hover:border-[#ccc3d8] active:scale-[0.99] rounded-lg text-[#0b1c30] text-[14px] font-medium flex items-center justify-center gap-3 transition-all duration-150 cursor-pointer shadow-sm"
          >
            <svg aria-hidden="true" className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
                fill="#4285F4"
              />
              <path
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24Z"
                fill="#34A853"
              />
              <path
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15Z"
                fill="#FBBC05"
              />
              <path
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"
                fill="#EA4335"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Continue with Microsoft */}
          <button
            type="button"
            onClick={() => handleSocialLogin('Microsoft')}
            className="w-full h-[42px] bg-white border border-[#E2E8F0] hover:bg-[#f8f9ff] hover:border-[#ccc3d8] active:scale-[0.99] rounded-lg text-[#0b1c30] text-[14px] font-medium flex items-center justify-center gap-3 transition-all duration-150 cursor-pointer shadow-sm"
          >
            <svg aria-hidden="true" className="w-4 h-4 shrink-0" viewBox="0 0 23 23">
              <path d="M1 1h10v10H1z" fill="#f35325" />
              <path d="M12 1h10v10H12z" fill="#81bc06" />
              <path d="M1 12h10v10H1z" fill="#05a6f0" />
              <path d="M12 12h10v10H12z" fill="#ffba08" />
            </svg>
            <span>Continue with Microsoft</span>
          </button>
        </div>

        {/* Bottom Registration Link */}
        <footer className="mt-8 text-center">
          <p className="text-[12px] text-[#474e64]">
            Don't have an account?
            <Link
              to="/register"
              className="text-[12px] text-[#7c3aed] hover:text-[#630ed4] ml-1 font-medium transition-colors duration-150 hover:underline"
            >
              Create Account
            </Link>
          </p>
        </footer>
      </main>

      {/* Forgot Password Modal */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 max-w-sm w-full shadow-2xl relative">
            <button
              onClick={() => setIsForgotModalOpen(false)}
              className="absolute top-4 right-4 text-[#474e64] hover:text-[#0b1c30] cursor-pointer"
            >
              ✕
            </button>
            <h3 className="text-[18px] font-bold text-[#0b1c30] mb-2">Reset Password</h3>
            {forgotSubmitted ? (
              <div className="space-y-4">
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[12px] rounded-lg">
                  Password reset link has been dispatched to <strong>{forgotEmail}</strong>.
                </div>
                <button
                  type="button"
                  onClick={() => setIsForgotModalOpen(false)}
                  className="w-full h-10 rounded-lg bg-[#0b1c30] text-white text-[14px] font-medium"
                >
                  Back to Login
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
                <p className="text-[12px] text-[#474e64]">
                  Enter your email address and we'll send you an encrypted link to reset your
                  password.
                </p>
                <input
                  type="email"
                  required
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full h-10 px-3 border border-[#E2E8F0] rounded-lg text-[14px] text-[#0b1c30] focus:border-[#7c3aed] focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full h-10 rounded-lg bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] text-white text-[14px] font-medium"
                >
                  Send Reset Link
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
