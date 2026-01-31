
import React, { useState } from 'react';
import { geminiService } from '../services/gemini';
import { User } from '../types';

const AdaptiveLearningModule: React.FC<{ user: User }> = ({ user }) => {
  const [step, setStep] = useState<'IDLE' | 'QUIZ' | 'UPLOAD'>('IDLE');
  const [hint, setHint] = useState<string | null>(null);
  const [evaluation, setEvaluation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const currentQuestion = {
    id: 'q1',
    text: "Find the integral of x^2 from 0 to 3.",
    expected: "9"
  };

  const getHint = async () => {
    setLoading(true);
    const result = await geminiService.getHint(currentQuestion.text);
    setHint(result || "Try basic integration rules.");
    setLoading(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = (reader.result as string).split(',')[1];
      const result = await geminiService.evaluateHandwrittenAnswer(base64, currentQuestion.text);
      setEvaluation(result || "Evaluation failed.");
      setLoading(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Adaptive Learning</h2>

      {step === 'IDLE' && (
        <div className="grid grid-cols-1 gap-4">
          <button 
            onClick={() => setStep('QUIZ')}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center text-left hover:bg-indigo-50 transition"
          >
            <div className="bg-indigo-100 p-3 rounded-xl mr-4 text-2xl">📝</div>
            <div>
              <p className="font-bold text-gray-800">Practice Quiz</p>
              <p className="text-xs text-gray-500">Guided subtopic questions with hints</p>
            </div>
          </button>
          <button 
            onClick={() => setStep('UPLOAD')}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center text-left hover:bg-amber-50 transition"
          >
            <div className="bg-amber-100 p-3 rounded-xl mr-4 text-2xl">📸</div>
            <div>
              <p className="font-bold text-gray-800">Scan Answer Sheet</p>
              <p className="text-xs text-gray-500">AI evaluation of handwritten work</p>
            </div>
          </button>
        </div>
      )}

      {step === 'QUIZ' && (
        <div className="bg-white p-6 rounded-2xl shadow-sm space-y-6">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-indigo-600 uppercase">Calculus Mastery Test</span>
            <button onClick={() => setStep('IDLE')} className="text-gray-400">✕</button>
          </div>
          
          <p className="text-lg font-bold text-gray-800 leading-relaxed">
            {currentQuestion.text}
          </p>

          {hint && (
            <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 text-sm text-amber-800">
              <p className="font-bold mb-1">💡 Hint:</p>
              {hint}
            </div>
          )}

          <div className="space-y-3">
            <button onClick={getHint} className="w-full text-center text-sm font-bold text-indigo-600 hover:bg-indigo-50 py-2 rounded-lg transition">
              {loading ? 'Thinking...' : 'Need a Hint?'}
            </button>
            <input 
              type="text" 
              placeholder="Enter your final answer"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold shadow-lg">Submit Answer</button>
          </div>
        </div>
      )}

      {step === 'UPLOAD' && (
        <div className="bg-white p-6 rounded-2xl shadow-sm space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-gray-800">Handwritten Feedback</h3>
            <button onClick={() => {setStep('IDLE'); setEvaluation(null);}} className="text-gray-400">✕</button>
          </div>

          {!evaluation ? (
            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-10 flex flex-col items-center justify-center text-center">
              <div className="bg-gray-50 p-4 rounded-full mb-4">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="text-sm text-gray-500 mb-4">Take a clear photo of your working steps</p>
              <label className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold cursor-pointer">
                {loading ? 'Analyzing...' : 'Snap Photo'}
                <input type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFileUpload} />
              </label>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-indigo-50 p-4 rounded-xl prose prose-sm text-indigo-900 leading-relaxed whitespace-pre-line">
                <h4 className="font-bold mb-2">AI Feedback:</h4>
                {evaluation}
              </div>
              <button onClick={() => setEvaluation(null)} className="w-full py-2 text-indigo-600 font-bold text-sm">Upload another</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdaptiveLearningModule;
