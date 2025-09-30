import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { RegisterForm } from './components/RegisterForm';
import { LoginForm } from './components/LoginForm';
import { TrainingModule } from './components/TrainingModule';
import { Dashboard } from './components/Dashboard';
import { EmailVerification } from './components/EmailVerification';

export type AppState = 'landing' | 'register' | 'login' | 'email-verify' | 'training' | 'dashboard';

export interface User {
  username: string;
  email: string;
  isEmailVerified: boolean;
  isKeystrokeTrained: boolean;
}

function App() {
  const [currentView, setCurrentView] = useState<AppState>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [pendingUser, setPendingUser] = useState<Partial<User> | null>(null);

  const handleRegister = (userData: { username: string; email: string; password: string }) => {
    setPendingUser({ username: userData.username, email: userData.email });
    setCurrentView('email-verify');
  };

  const handleEmailVerified = () => {
    if (pendingUser) {
      setUser({
        ...pendingUser as User,
        isEmailVerified: true,
        isKeystrokeTrained: false,
      });
      setCurrentView('training');
    }
  };

  const handleTrainingComplete = () => {
    if (user) {
      setUser({ ...user, isKeystrokeTrained: true });
      setCurrentView('dashboard');
    }
  };

  const handleLogin = (credentials: { username: string; password: string }) => {
    // Simulate login - in real app, this would verify credentials and keystroke patterns
    const mockUser: User = {
      username: credentials.username,
      email: `${credentials.username}@example.com`,
      isEmailVerified: true,
      isKeystrokeTrained: true,
    };
    setUser(mockUser);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('landing');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'landing':
        return (
          <LandingPage
            onLoginClick={() => setCurrentView('login')}
            onRegisterClick={() => setCurrentView('register')}
          />
        );
      case 'register':
        return (
          <RegisterForm
            onRegister={handleRegister}
            onBackClick={() => setCurrentView('landing')}
          />
        );
      case 'login':
        return (
          <LoginForm
            onLogin={handleLogin}
            onBackClick={() => setCurrentView('landing')}
          />
        );
      case 'email-verify':
        return (
          <EmailVerification
            email={pendingUser?.email || ''}
            onVerified={handleEmailVerified}
            onBackClick={() => setCurrentView('register')}
          />
        );
      case 'training':
        return (
          <TrainingModule
            username={user?.username || ''}
            onComplete={handleTrainingComplete}
          />
        );
      case 'dashboard':
        return (
          <Dashboard
            user={user!}
            onLogout={handleLogout}
          />
        );
      default:
        return <LandingPage onLoginClick={() => setCurrentView('login')} onRegisterClick={() => setCurrentView('register')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-orange-900">
      {renderCurrentView()}
    </div>
  );
}

export default App;