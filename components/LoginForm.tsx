
import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, LogIn, ShieldCheck } from 'lucide-react';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert(`Welcome to SmartEdu Cloud, ${email}!`);
    }, 1500);
  };

  return (
    <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
      {/* Glowing border effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

      <div className="relative text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-2xl mb-4 border border-white/20">
          <ShieldCheck className="w-8 h-8 text-blue-400" />
        </div>
        <h1 className="text-3xl font-bold text-white tracking-tight">
          SmartEdu <span className="text-blue-400">Cloud</span>
        </h1>
        <p className="text-white/50 mt-2 text-sm">Access your academic horizon</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 relative">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-white/60 ml-1 uppercase tracking-wider">Email Address</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="w-5 h-5 text-white/30" />
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
              placeholder="e.g. alex@university.edu"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-white/60 ml-1 uppercase tracking-wider">Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="w-5 h-5 text-white/30" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-12 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/30 hover:text-white/60 transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between px-1">
          <label className="flex items-center space-x-2 cursor-pointer group">
            <div className="relative flex items-center">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-5 h-5 border-2 border-white/10 rounded bg-white/5 peer-checked:bg-blue-500 peer-checked:border-blue-500 transition-all"></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100">
                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <span className="text-sm text-white/50 group-hover:text-white/70 transition-colors">Remember me</span>
          </label>
          <a href="#" className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors">Forgot Password?</a>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full relative overflow-hidden group/btn bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-in-out"></div>
          {isSubmitting ? (
            <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <>
              <LogIn className="w-5 h-5" />
              <span>Login to Workspace</span>
            </>
          )}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-white/5 text-center">
        <p className="text-white/40 text-sm">
          Don't have an account?{' '}
          <a href="#" className="text-white/90 font-semibold hover:text-blue-400 transition-colors underline decoration-white/20 underline-offset-4">
            Request Access
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
