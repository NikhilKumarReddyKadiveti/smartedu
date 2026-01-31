
import React from 'react';
import { User, UserRole } from '../types';

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const isFaculty = user.role === UserRole.FACULTY;

  if (isFaculty) {
    return (
      <div className="space-y-6">
        <div className="bg-slate-900 p-6 rounded-3xl shadow-xl text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl font-black">Faculty Portal</h2>
            <p className="opacity-70 text-sm mt-1">CS Department • Semester 4 Overview</p>
          </div>
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/></svg>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <StatCard title="Total Students" value="42" color="bg-indigo-50 text-indigo-700" icon="👥" />
          <StatCard title="Class Avg" value="3.42" color="bg-blue-50 text-blue-700" icon="📈" />
          <StatCard title="Attendance" value="88%" color="bg-emerald-50 text-emerald-700" icon="✅" />
          <StatCard title="Active Quizzes" value="3" color="bg-amber-50 text-amber-700" icon="📝" />
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-black text-gray-900 mb-4">Critical Tasks</h3>
          <div className="space-y-3">
            <TaskItem title="Verify 12 Attendance Requests" priority="HIGH" />
            <TaskItem title="Update Big Data Question Bank" priority="MED" />
            <TaskItem title="Review Struggling Students List" priority="LOW" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex items-center space-x-4">
        <img src={user.avatar} className="w-16 h-16 rounded-2xl object-cover ring-4 ring-indigo-50" alt="avatar" />
        <div>
          <h2 className="text-xl font-black text-gray-900 leading-none">Hi, {user.name.split(' ')[0]}</h2>
          <p className="text-xs font-bold text-indigo-500 uppercase mt-1 tracking-wider">
            {user.role} • CS Dept
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <StatCard title="Attendance" value="92%" color="bg-emerald-50 text-emerald-700" icon="✅" />
        <StatCard title="GPA" value="3.8" color="bg-indigo-50 text-indigo-700" icon="📈" />
        <StatCard title="Assignments" value="12" color="bg-rose-50 text-rose-700" icon="📚" />
        <StatCard title="Credits" value="24" color="bg-amber-50 text-amber-700" icon="⭐" />
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-black text-gray-900">Today's Lectures</h3>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest cursor-pointer">View All</span>
        </div>
        <div className="space-y-4">
          <ScheduleItem time="10:30" subject="Data Structures" location="Block B, Room 202" active />
          <ScheduleItem time="13:30" subject="Cloud Computing" location="Block A, Lab 3" />
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ title: string; value: string; color: string, icon: string }> = ({ title, value, color, icon }) => (
  <div className={`p-4 rounded-3xl shadow-sm flex flex-col items-center justify-center text-center transition hover:scale-[1.02] ${color}`}>
    <span className="text-2xl mb-1">{icon}</span>
    <span className="text-2xl font-black">{value}</span>
    <span className="text-[10px] uppercase tracking-tighter font-black opacity-60 mt-0.5">{title}</span>
  </div>
);

const ScheduleItem: React.FC<{ time: string; subject: string; location: string, active?: boolean }> = ({ time, subject, location, active }) => (
  <div className={`flex items-center p-4 rounded-2xl border transition ${active ? 'bg-indigo-50 border-indigo-100' : 'bg-gray-50/50 border-transparent hover:border-gray-100'}`}>
    <div className={`font-black text-xs min-w-[50px] text-center ${active ? 'text-indigo-600' : 'text-gray-400'}`}>
      {time}
    </div>
    <div className="w-[1px] h-8 bg-gray-200 mx-4"></div>
    <div className="flex-grow">
      <div className={`font-black text-sm ${active ? 'text-gray-900' : 'text-gray-600'}`}>{subject}</div>
      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{location}</div>
    </div>
    {active && <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></div>}
  </div>
);

const TaskItem: React.FC<{ title: string; priority: 'HIGH' | 'MED' | 'LOW' }> = ({ title, priority }) => (
  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition cursor-pointer">
    <div className="flex items-center">
      <div className={`w-2 h-2 rounded-full mr-3 ${priority === 'HIGH' ? 'bg-red-500' : priority === 'MED' ? 'bg-amber-500' : 'bg-gray-400'}`} />
      <span className="text-sm font-medium text-gray-700">{title}</span>
    </div>
    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
  </div>
);

export default Dashboard;
