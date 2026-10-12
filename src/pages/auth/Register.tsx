import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthShell from '@/pages/auth/components/AuthShell';
import RoleSelect from '@/pages/auth/components/RoleSelect';
import { useAuth } from '@/context/AuthContext';
import type { Role } from '@/context/AuthContext';

const inputClass =
  'w-full rounded-md bg-slate-100 border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/40 transition-all';

export default function Register() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [role, setRole] = useState<Role>('vendor');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (name.trim().length < 2) {
      setError(role === 'vendor' ? 'Enter a contact name.' : 'Enter your name.');
      return;
    }
    if (role === 'vendor' && company.trim().length < 2) {
      setError('Enter your company name.');
      return;
    }
    if (!email.includes('@')) {
      setError('Enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    try {
      await signUp({ name: name.trim(), email: email.trim().toLowerCase(), password, role, company: company.trim() });
      navigate(role === 'vendor' ? '/claim' : '/vendors');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      eyebrow="Create account"
      title="Join as a researcher or a company"
      subtitle="Pick the account type that fits you, you can always claim a store later."
      footer={
        <>
          Already have an account?{' '}
          <Link to="/signin" className="text-cyan-700 hover:text-cyan-800 font-medium">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-5" noValidate>
        <div>
          <div className="text-xs font-medium text-slate-600 mb-2">Account type</div>
          <RoleSelect value={role} onChange={setRole} />
        </div>

        <div>
          <label htmlFor="reg-name" className="block text-xs font-medium text-slate-600 mb-2">
            {role === 'vendor' ? 'Contact name' : 'Full name'}
          </label>
          <input
            id="reg-name"
            name="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={role === 'vendor' ? 'Dr. Sarah Whitfield' : 'Alex Morgan'}
            className={inputClass}
          />
        </div>

        {role === 'vendor' && (
          <div>
            <label htmlFor="reg-company" className="block text-xs font-medium text-slate-600 mb-2">
              Company name
            </label>
            <input
              id="reg-company"
              name="company"
              type="text"
              autoComplete="organization"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="EVLV Peptides"
              className={inputClass}
            />
          </div>
        )}

        <div>
          <label htmlFor="reg-email" className="block text-xs font-medium text-slate-600 mb-2">
            Email address
          </label>
          <input
            id="reg-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="reg-password" className="block text-xs font-medium text-slate-600 mb-2">
            Password
          </label>
          <input
            id="reg-password"
            name="password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            className={inputClass}
          />
        </div>

        {error && (
          <div className="flex items-center gap-2 text-xs text-amber-600">
            <i className="ri-error-warning-line"></i>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full whitespace-nowrap px-5 py-3.5 rounded-md text-sm font-semibold text-slate-900 bg-gradient-to-r from-cyan-500 to-teal-500 border border-cyan-400/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <><i className="ri-loader-4-line animate-spin mr-1.5"></i>Creating account…</>
          ) : (
            <>{role === 'vendor' ? 'Create Account & Claim Store' : 'Create Account'}<i className="ri-arrow-right-line ml-1.5"></i></>
          )}
        </button>

        <p className="text-[11px] text-slate-500 leading-relaxed">
          By continuing you agree to the Terms of Service and Privacy Policy. Compliant reviews stay online forever.
        </p>
      </form>
    </AuthShell>
  );
}