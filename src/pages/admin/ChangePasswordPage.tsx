import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { KeyRound, ShieldAlert, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { api, authStorage } from '../../api/client';

export const ChangePasswordPage: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const user = authStorage.getUser();
  const isForced = Boolean(user?.mustChangePassword);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New password and confirmation do not match.');
      return;
    }

    if (newPassword === 'Admin@123') {
      setError('You must choose a new password distinct from the default temporary password.');
      return;
    }

    setLoading(true);

    try {
      const res = await api.changePassword({
        currentPassword: isForced ? undefined : currentPassword,
        newPassword
      });

      authStorage.setToken(res.token);
      authStorage.setUser(res.user);

      // Successfully updated
      navigate('/admin');
    } catch (err: any) {
      setError(err.message || 'Failed to update password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2B0505] via-[#4A0A0A] to-[#1C1D21] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        
        <div className="text-center">
          <div className="w-14 h-14 bg-amber-400/20 text-[#C8872B] border-2 border-[#C8872B]/60 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
            <KeyRound className="w-7 h-7" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#FAF2DF] tracking-tight">
            {isForced ? 'Mandatory Password Update' : 'Update Your Password'}
          </h2>
          <p className="text-xs text-amber-200/80 mt-1 font-medium">
            {isForced 
              ? 'Security Policy: The initial default password must be changed before accessing the console.' 
              : 'Choose a strong, secure passphrase for your college staff account.'}
          </p>
        </div>

        <div className="mt-8 bg-white/95 backdrop-blur-md py-8 px-6 sm:px-10 shadow-2xl rounded-2xl border border-[#C8872B]/40">
          
          {isForced && (
            <div className="mb-5 p-3.5 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2.5 text-xs text-amber-900 leading-relaxed">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                You are currently signed in with the default credential <strong>Admin@123</strong>. For institutional security, you must specify your permanent password now.
              </span>
            </div>
          )}

          {error && (
            <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2.5 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isForced && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  Current Password *
                </label>
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8872B] focus:bg-white text-stone-900"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                New Secure Password *
              </label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                className="w-full px-4 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8872B] focus:bg-white text-stone-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                Confirm New Password *
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-type new password"
                className="w-full px-4 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8872B] focus:bg-white text-stone-900"
              />
            </div>

            <div className="text-[11px] text-stone-500 space-y-1 bg-stone-50 p-3 rounded-lg border border-stone-200">
              <div className="font-semibold text-stone-700">Password Requirements:</div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className={`w-3.5 h-3.5 ${newPassword.length >= 8 ? 'text-green-600' : 'text-stone-300'}`} />
                <span>At least 8 characters in length</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className={`w-3.5 h-3.5 ${newPassword !== 'Admin@123' && newPassword.length > 0 ? 'text-green-600' : 'text-stone-300'}`} />
                <span>Different from temporary setup password</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-lg shadow-md text-xs sm:text-sm font-bold text-[#3D0707] bg-gradient-to-r from-[#C8872B] to-[#E1B463] hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-60"
            >
              {loading ? (
                <span>Updating Password...</span>
              ) : (
                <>
                  <span>Save Password & Access Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};
