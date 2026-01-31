
import React from 'react';
import { UserRole } from '../types';

interface NavigationBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  role: UserRole;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ activeTab, setActiveTab, role }) => {
  const tabs = [
    { id: 'dashboard', label: 'Home', icon: '🏠' },
    { id: 'attendance', label: 'Attendance', icon: '✅' },
    { id: 'performance', label: 'Stats', icon: '📊' },
    { id: 'campus', label: 'Map', icon: '📍' },
    { id: 'learning', label: 'Learn', icon: '🧠' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center p-2 pb-safe shadow-lg z-20">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex flex-col items-center p-1 transition ${activeTab === tab.id ? 'text-indigo-600' : 'text-gray-400'}`}
        >
          <span className="text-xl">{tab.icon}</span>
          <span className="text-xs mt-1">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default NavigationBar;
