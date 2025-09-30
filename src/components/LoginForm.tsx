import React, { useState } from 'react';
import { ArrowLeft, User, Lock, Eye, EyeOff, Loader } from 'lucide-react';

interface LoginFormProps {
  onLogin: (credentials: { username: string; password: string }) => void;
  onBackClick: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onBackClick }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsAuthenticating(true);
      
      // Simulate keystroke authentication
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setIsAuthenticating(false);
      onLogin(formData);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (isAuthenticating) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-12 border border-slate-700 shadow-2xl">
            <Loader className="w-16 h-16 text-orange-400 mx-auto mb-6 animate-spin" />
            <h2 className="text-2xl font-bold text-white mb-4">Authenticating Keystrokes</h2>
            <p className="text-slate-300 mb-6">Analyzing your typing patterns...</p>
            <div className="w-64 bg-slate-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full animate-pulse w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-slate-400">Sign in to access your secure storage</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Username</label>
              <div className="relative">
                <User className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => handleChange('username', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your username"
                />
              </div>
              {errors.username && <p className="text-red-400 text-sm mt-1">{errors.username}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
            </div>

            <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
              <p className="text-sm text-slate-300 mb-2">🔒 Enhanced Security</p>
              <p className="text-xs text-slate-400">Your typing pattern will be analyzed for additional security verification.</p>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-orange-500/25"
            >
              Sign In Securely
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};