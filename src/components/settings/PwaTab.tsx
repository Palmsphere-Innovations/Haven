'use client';

import React, { useState, useEffect } from 'react';

export const PwaTab = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  return (
    <div className="space-y-6 max-w-xl">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Application & PWA</h2>
        <p className="text-sm text-slate-500">Configure desktop and offline mobile access options for Haven.</p>
      </div>

      <div className="border border-slate-200 rounded-lg p-5 bg-slate-50/50 space-y-4">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-slate-900">Standalone Installation</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Haven runs as an installed Progressive Web App on macOS, Windows, iOS, and Android. Installing enables offline navigation, quicker launch times, and native desktop notifications.
          </p>
        </div>

        <div className="pt-2">
          {isInstalled ? (
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-200/70 px-3 py-2 rounded">
              ✓ Haven is currently installed on this device
            </div>
          ) : (
            <button
              type="button"
              onClick={handleInstallClick}
              disabled={!deferredPrompt}
              className={`text-sm font-medium px-4 py-2 rounded transition-colors ${
                deferredPrompt
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer'
                  : 'bg-slate-200 text-slate-500 cursor-not-allowed'
              }`}
            >
              {deferredPrompt ? 'Install Haven App' : 'App Available via Browser Menu'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};