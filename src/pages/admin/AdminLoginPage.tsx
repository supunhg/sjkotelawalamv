import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, User, AlertCircle, ArrowRight, ShieldCheck, ArrowLeft } from 'lucide-react';
import { api, authStorage } from '../../api/client';

export const AdminLoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await api.login({ username, password });
      authStorage.setToken(res.token);
      authStorage.setUser(res.user);

      if (res.user.mustChangePassword) {
        navigate('/admin/change-password');
      } else {
        navigate('/admin');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2B0505] via-[#4A0A0A] to-[#1C1D21] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        
        {/* Back Link */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-1.5 text-xs text-amber-200/80 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to School Website</span>
        </Link>

        {/* Brand Crest */}
        <div className="text-center">
          <img 
            src="/images/logo-color.png" 
            alt="Crest" 
            className="w-20 h-20 mx-auto object-contain filter drop-shadow-xl mb-3"
          />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#FAF2DF] tracking-tight">
            Administrative Portal
          </h2>
          <p className="text-xs text-amber-200/80 mt-1 font-medium">
            Sir John Kotelawala Maha Vidyalaya • Secretariat & Digital Team
          </p>
        </div>

        {/* Login Box */}
        <div className="mt-8 bg-white/95 backdrop-blur-md py-8 px-6 sm:px-10 shadow-2xl rounded-2xl border border-[#C8872B]/40">
          <form className="space-y-5" onSubmit={handleLogin}>
            
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2.5 text-xs text-red-700">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. admin or digital_team"
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8872B] focus:bg-white text-stone-900"
                  autoComplete="username"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8872B] focus:bg-white text-stone-900"
                  autoComplete="current-password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-md text-xs sm:text-sm font-bold text-[#3D0707] bg-gradient-to-r from-[#C8872B] to-[#E1B463] hover:brightness-110 focus:outline-none active:scale-[0.98] transition-all disabled:opacity-60"
            >
              {loading ? (
                <span>Authenticating Session...</span>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Institutional Security Notice */}
          <div className="mt-6 pt-5 border-t border-stone-200 text-center">
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C8872B]" />
              <span>Restricted Access • Authorized Faculty & Digital Officers Only</span>
            </div>
            <p className="text-[10px] text-stone-400 mt-1">
              Initial admin login requires mandatory password reset on first access.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
