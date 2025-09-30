import React, { useState } from 'react';
import { User as UserIcon, Settings, Shield, HardDrive, Upload, FolderOpen, Search, LogOut, Server } from 'lucide-react';
import type { User } from '../App';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('files');

  const stats = [
    { label: 'Storage Used', value: '2.3 GB', max: '100 GB', color: 'blue' },
    { label: 'Files', value: '1,247', color: 'green' },
    { label: 'Security Score', value: '98%', color: 'orange' },
  ];

  const recentFiles = [
    { name: 'Project_Docs.pdf', size: '2.4 MB', modified: '2 hours ago', type: 'pdf' },
    { name: 'Vacation_Photos.zip', size: '145 MB', modified: '1 day ago', type: 'archive' },
    { name: 'Presentation.pptx', size: '12.8 MB', modified: '3 days ago', type: 'presentation' },
    { name: 'Database_Backup.sql', size: '89 MB', modified: '1 week ago', type: 'database' },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Server className="w-8 h-8 text-orange-400" />
              <h1 className="text-2xl font-bold text-white">SecureNAS Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-slate-300">
                <UserIcon className="w-5 h-5" />
                <span>{user.username}</span>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors duration-200"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome back, {user.username}!</h2>
          <p className="text-slate-400">Your secure cloud storage is ready to use.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-slate-400 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
                {stat.label === 'Storage Used' && <HardDrive className="w-8 h-8 text-blue-400" />}
                {stat.label === 'Files' && <FolderOpen className="w-8 h-8 text-green-400" />}
                {stat.label === 'Security Score' && <Shield className="w-8 h-8 text-orange-400" />}
              </div>
              {stat.max && (
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full w-1/4"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* File Manager */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-white">Recent Files</h3>
                <div className="flex space-x-2">
                  <button className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-300 transition-colors duration-200">
                    <Search className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-orange-500 hover:bg-orange-600 rounded-lg text-white transition-colors duration-200">
                    <Upload className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {recentFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors duration-200 cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                        <FolderOpen className="w-4 h-4 text-orange-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{file.name}</p>
                        <p className="text-slate-400 text-sm">{file.size} • Modified {file.modified}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 py-2 text-slate-400 hover:text-white transition-colors duration-200">
                View all files →
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Security Status */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Security Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Keystroke Auth</span>
                  <span className="text-green-400">Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Email Verified</span>
                  <span className="text-green-400">Yes</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Last Login</span>
                  <span className="text-slate-400">Just now</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-2 p-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-300 transition-colors duration-200">
                  <Upload className="w-4 h-4" />
                  <span>Upload Files</span>
                </button>
                <button className="w-full flex items-center space-x-2 p-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-300 transition-colors duration-200">
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </button>
                <button className="w-full flex items-center space-x-2 p-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-300 transition-colors duration-200">
                  <Shield className="w-4 h-4" />
                  <span>Security</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};