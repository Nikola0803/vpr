import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthShell from '@/pages/auth/components/AuthShell';
import { useAuth } from '@/context/AuthContext';

const inputClass =
  'w-full rounded-md bg-slate-100 border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/40 transition-all';

export default function SignIn() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
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
      const authedUser = await signIn(email.trim().toLowerCase(), password);
      navigate(authedUser.role === 'vendor' ? '/dashboard' : '/vendors');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      eyebrow="Welcome back"
      title="Sign in to your account"
      subtitle="Access your vendor portal, review history, and trust analytics."
      footer={
        <>
          New here?{' '}
          <Link to="/register" className="text-cyan-700 hover:text-cyan-800 font-medium">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-5" noValidate>
        <div>
          <label htmlFor="signin-email" className="block text-xs font-medium text-slate-600 mb-2">
            Email address
          </label>
          <input
            id="signin-email"
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
          <label htmlFor="signin-password" className="block text-xs font-medium text-slate-600 mb-2">
            Password
          </label>
          <input
            id="signin-password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
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
            <><i className="ri-loader-4-line animate-spin mr-1.5"></i>Signing in…</>
          ) : (
            <>Sign In<i className="ri-arrow-right-line ml-1.5"></i></>
          )}
        </button>
      </form>
    </AuthShell>
  );
}