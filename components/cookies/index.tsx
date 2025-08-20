// components/CookieBanner.tsx
'use client';

import { useEffect, useState } from 'react';
import { setCookie, getCookie } from 'cookies-next';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if cookie consent was already given
    const consent = getCookie('cookieConsent');
    if (consent === undefined) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    setCookie('cookieConsent', 'accepted', { maxAge: 60 * 60 * 24 * 365 }); // 1 year
    setShowBanner(false);
  };

  const handleReject = () => {
    setCookie('cookieConsent', 'rejected', { maxAge: 60 * 60 * 24 * 365 }); // 1 year
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50 bg-black bg-opacity-50">
      <div className="w-full max-w-[700px] bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h2 className="font-bold text-xl mb-4">STEINMARINE</h2>
          <p className="mb-6 text-gray-700">
            STEINMARINE Porcelánico S.L. uses third party, session and persistent cookies, 
            with analytic means and to show you personalized advertising based on 
            the information collected from your browsing habits (such as the websites 
            you visit). To obtain more information visit our{' '}
            <a href="/cookie-policy" className="text-blue-600 font-semibold hover:underline">
              cookie policy
            </a>.
          </p>
          <div className="flex flex-col sm:flex-row justify-end gap-3">
            <button 
              onClick={handleReject}
              className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
            >
              Reject
            </button>
            <button 
              onClick={handleAccept}
              className="px-6 py-2 bg-blue-600 text-black border rounded-md hover:bg-blue-700 transition-colors"
            >
              Allow all
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}