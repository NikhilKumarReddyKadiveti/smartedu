
import React, { useState, useEffect } from 'react';
import { User, UserRole } from './types';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import NavigationBar from './components/NavigationBar';
import AttendanceModule from './modules/Attendance';
import PerformanceModule from './modules/Performance';
import CampusNavModule from './modules/CampusNav';
import AdaptiveLearningModule from './modules/AdaptiveLearning';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogout = () => {
    setUser(null);
    setActiveTab('dashboard');
  };

  const renderContent = () => {
    if (!user) return <Login onLogin={setUser} />;

    switch (activeTab) {
      case 'dashboard': return <Dashboard user={user} />;
      case 'attendance': return <AttendanceModule user={user} />;
      case 'performance': return <PerformanceModule user={user} />;
      case 'campus': return <CampusNavModule user={user} />;
      case 'learning': return <AdaptiveLearningModule user={user} />;
      default: return <Dashboard user={user} />;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-indigo-900 flex items-center justify-center p-4">
        <Login onLogin={setUser} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 flex flex-col">
      <header className="bg-white border-b border-gray-100 p-4 shadow-sm sticky top-0 z-10 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-600 p-1.5 rounded-lg">
             <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
             </svg>
          </div>
          <h1 className="text-lg font-extrabold text-gray-900 tracking-tight">EduCloud</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="relative p-1 text-gray-400 hover:text-indigo-600 transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-1 text-sm font-semibold text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </header>

      <main className="flex-grow p-4 md:max-w-2xl md:mx-auto w-full animate-in fade-in duration-500">
        {renderContent()}
      </main>

      <NavigationBar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        role={user.role} 
      />
    </div>
  );
};

export default App;
