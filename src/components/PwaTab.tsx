'use client';

import React, { useState, useEffect } from 'react';

export const PwaTab = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsStandalone(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsStandalone(true);
    }
    setDeferredPrompt(null);
  };

  return (
    <div className="space-y-4 max-w-lg">
      <header className="border-b border-slate-100 pb-3">
        <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Application & PWA</h2>
        <p className="text-xs text-slate-500 mt-0.5">Standalone desktop and mobile application preferences.</p>
      </header>

      <div className="border border-slate-200 rounded p-4 bg-slate-50/50 space-y-3">
        <h3 className="text-xs font-semibold text-slate-800">Persistent Install Prompt</h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          If you previously dismissed the prompt to install Haven on your primary device, you can trigger installation here. Installing running as a standalone app provides offline support and native window management.
        </p>

        <div className="pt-1">
          {isStandalone ? (
            <div className="text-xs font-medium text-slate-600 bg-slate-200/60 px-3 py-1.5 rounded inline-block">
              ✓ Haven is currently running as an installed PWA
            </div>
          ) : (
            <button
              type="button"
              onClick={handleInstallClick}
              disabled={!deferredPrompt}
              className={`text-xs font-medium px-4 py-2 rounded transition-colors ${
                deferredPrompt
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer'
                  : 'bg-slate-200 text-slate-500 cursor-not-allowed'
              }`}
            >
              {deferredPrompt ? 'Install Haven' : 'App Available via Browser Settings'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};