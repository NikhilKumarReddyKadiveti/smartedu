
import React, { useState } from 'react';
import { User, UserRole, TopicPerformance } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const mockPerformance: TopicPerformance[] = [
  { id: '1', subject: 'Calculus', chapter: 'Integration', topic: 'Definite Integrals', subTopic: 'U-Substitution', mastery: 85, lastAttemptScore: 90 },
  { id: '2', subject: 'Calculus', chapter: 'Integration', topic: 'Definite Integrals', subTopic: 'Integration by Parts', mastery: 42, lastAttemptScore: 35 },
  { id: '3', subject: 'Calculus', chapter: 'Limits', topic: 'Continuity', subTopic: 'L\'Hopital Rule', mastery: 78, lastAttemptScore: 80 },
  { id: '4', subject: 'DB Management', chapter: 'SQL', topic: 'Joins', subTopic: 'Outer Joins', mastery: 92, lastAttemptScore: 95 },
  { id: '5', subject: 'DB Management', chapter: 'SQL', topic: 'Normalization', subTopic: '3NF', mastery: 55, lastAttemptScore: 60 },
];

const mockClassData = [
  { name: 'Joins', avg: 88, low: 45 },
  { name: 'Normal.', avg: 62, low: 30 },
  { name: 'Integration', avg: 54, low: 22 },
  { name: 'Limits', avg: 76, low: 50 },
  { name: 'Objects', avg: 91, low: 65 },
];

const PerformanceModule: React.FC<{ user: User }> = ({ user }) => {
  const [selectedSubject, setSelectedSubject] = useState('Calculus');
  const isFaculty = user.role === UserRole.FACULTY;

  const filteredData = mockPerformance.filter(p => p.subject === selectedSubject);

  if (isFaculty) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-black text-gray-900">Class Performance</h2>
          <p className="text-sm text-gray-500">Monitoring 42 students in CS-401</p>
        </div>

        <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Topic Mastery Heatmap (Class Avg)</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockClassData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" tick={{fontSize: 10, fontWeight: 'bold'}} axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: '#F8FAFC'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="avg" radius={[10, 10, 0, 0]}>
                  {mockClassData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.avg > 80 ? '#10B981' : entry.avg > 60 ? '#6366F1' : '#F59E0B'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4">Critical Focus Areas</h3>
          <div className="space-y-4">
            <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100 flex items-center">
              <div className="text-2xl mr-4">⚠️</div>
              <div>
                <p className="text-sm font-black text-orange-900 leading-tight">Integration by Parts</p>
                <p className="text-xs text-orange-700 opacity-80">18 students scored below 40% mastery</p>
              </div>
            </div>
            <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-center">
              <div className="text-2xl mr-4">✨</div>
              <div>
                <p className="text-sm font-black text-indigo-900 leading-tight">Outer Joins</p>
                <p className="text-xs text-indigo-700 opacity-80">Exceptional performance - 92% average</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black text-gray-900">My Stats</h2>
        <select 
          className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-xs font-bold outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          <option>Calculus</option>
          <option>DB Management</option>
        </select>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Subject Mastery Progress</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={filteredData}>
              <XAxis dataKey="subTopic" tick={{fontSize: 9, fontWeight: 'bold'}} interval={0} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} hide />
              <Tooltip cursor={false} />
              <Bar dataKey="mastery" radius={[8, 8, 8, 8]} barSize={24}>
                {filteredData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.mastery > 70 ? '#4F46E5' : entry.mastery > 50 ? '#F59E0B' : '#EF4444'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {filteredData.map(item => (
          <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center group active:scale-[0.98] transition">
            <div>
              <p className="text-[10px] text-indigo-600 font-black uppercase tracking-widest">{item.topic}</p>
              <p className="font-black text-gray-800 text-sm">{item.subTopic}</p>
            </div>
            <div className={`text-sm font-black px-3 py-1 rounded-full ${item.mastery > 70 ? 'bg-indigo-50 text-indigo-600' : 'bg-orange-50 text-orange-600'}`}>
              {item.mastery}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceModule;
