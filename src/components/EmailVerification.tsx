import React, { useState, useEffect } from 'react';
import { ArrowLeft, Mail, Check, Loader } from 'lucide-react';

interface EmailVerificationProps {
  email: string;
  onVerified: () => void;
  onBackClick: () => void;
}

export const EmailVerification: React.FC<EmailVerificationProps> = ({ email, onVerified, onBackClick }) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleVerify = async () => {
    setIsVerifying(true);
    // Simulate email verification
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsVerifying(false);
    onVerified();
  };

  const handleResend = () => {
    setCountdown(60);
    setCanResend(false);
    // Simulate resending email
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full">
        <button
          onClick={onBackClick}
          className="flex items-center text-slate-300 hover:text-white mb-8 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700 shadow-2xl text-center">
          <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-orange-400" />
          </div>

          <h2 className="text-3xl font-bold text-white mb-4">Check Your Email</h2>
          <p className="text-slate-300 mb-2">We've sent a verification link to:</p>
          <p className="text-orange-400 font-medium mb-8">{email}</p>

          <div className="space-y-4">
            <button
              onClick={handleVerify}
              disabled={isVerifying}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-slate-600 disabled:to-slate-700 text-white py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center"
            >
              {isVerifying ? (
                <>
                  <Loader className="w-5 h-5 mr-2 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  I've Verified My Email
                </>
              )}
            </button>

            <button
              onClick={handleResend}
              disabled={!canResend}
              className="w-full bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 text-white py-3 rounded-lg font-semibold transition-all duration-200 disabled:cursor-not-allowed"
            >
              {canResend ? 'Resend Email' : `Resend in ${countdown}s`}
            </button>
          </div>

          <div className="mt-8 p-4 bg-slate-700/50 rounded-lg border border-slate-600">
            <p className="text-sm text-slate-300 mb-2">📧 Didn't receive the email?</p>
            <p className="text-xs text-slate-400">Check your spam folder or try resending after the countdown.</p>
          </div>
        </div>
      </div>
    </div>
  );
};