import React, { useState } from 'react';
import { GlassCard } from '../ui/Cards';
import { PrimaryButton } from '../ui/Buttons';
import { api } from '@/lib/api';

interface ReauthModalProps {
  onSuccess: () => void;
  onCancel?: () => void;
  isOpen: boolean;
}

export function ReauthModal({ onSuccess, onCancel, isOpen }: ReauthModalProps) {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;

    setLoading(true);
    setError('');

    try {
      const res = await api('/api/v1/admin/reauth', {
        method: 'POST',
        body: JSON.stringify({ password })
      });

      if (res.ok) {
        setPassword('');
        onSuccess();
      } else {
        const data = await res.json();
        setError(data.error || 'Authentication failed');
      }
    } catch (err) {
      setError('A network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <GlassCard className="max-w-md w-full p-8">
        <h2 className="text-2xl font-heading font-bold mb-2">Elevated Access Required</h2>
        <p className="text-secondary text-sm mb-6">
          Please re-enter your admin password to access this protected area.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0a0e17] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
              placeholder="Enter your password"
              autoFocus
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-end gap-3 pt-4">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 text-secondary hover:text-white transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
            )}
            <PrimaryButton type="submit" disabled={loading || !password}>
              {loading ? 'Verifying...' : 'Unlock'}
            </PrimaryButton>
          </div>
        </form>
      </GlassCard>
    </div>
  );
}
