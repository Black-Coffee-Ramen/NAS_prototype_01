import React from 'react';
import { Server, Shield, Keyboard, Cloud } from 'lucide-react';

interface LandingPageProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLoginClick, onRegisterClick }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="px-6 py-4">
        <div className="flex items-center space-x-2">
          <Server className="w-8 h-8 text-orange-400" />
          <h1 className="text-2xl font-bold text-white">SecureNAS</h1>
        </div>
      </header>

      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <Cloud className="w-20 h-20 text-orange-400 mx-auto mb-6" />
            <h2 className="text-5xl font-bold text-white mb-4">
              Your Personal <span className="text-orange-400">Cloud Storage</span>
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Experience next-generation security with keystroke-based authentication. 
              Access your files with the unique rhythm of your typing.
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
              <Shield className="w-12 h-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Advanced Security</h3>
              <p className="text-slate-400">Keystroke biometrics provide an additional layer of security beyond traditional passwords.</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
              <Keyboard className="w-12 h-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Smart Authentication</h3>
              <p className="text-slate-400">Our AI learns your unique typing patterns for seamless, secure access.</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
              <Server className="w-12 h-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Personal NAS</h3>
              <p className="text-slate-400">Your own private cloud storage, accessible from anywhere with military-grade security.</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onRegisterClick}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-orange-500/25"
            >
              Get Started
            </button>
            <button
              onClick={onLoginClick}
              className="bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 border border-slate-600 hover:border-slate-500"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-6 py-4 border-t border-slate-700">
        <div className="text-center text-slate-400">
          <p>&copy; 2025 SecureNAS. Advanced keystroke authentication technology.</p>
        </div>
      </footer>
    </div>
  );
};