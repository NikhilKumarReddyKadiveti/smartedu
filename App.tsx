
import React, { useState, useEffect } from 'react';
import Background from './components/Background';
import LoginForm from './components/LoginForm';
import { getSmartEduTip } from './services/geminiService';
import { Lightbulb, Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [tip, setTip] = useState<string>('');
  const [loadingTip, setLoadingTip] = useState<boolean>(true);

  useEffect(() => {
    const fetchTip = async () => {
      try {
        const result = await getSmartEduTip();
        setTip(result);
      } catch (error) {
        console.error("Failed to fetch smart tip", error);
        setTip("Unlock your potential through consistent learning.");
      } finally {
        setLoadingTip(false);
      }
    };
    fetchTip();
  }, []);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 overflow-hidden">
      <Background />
      
      <div className="z-10 w-full max-w-md space-y-6">
        <LoginForm />
        
        {/* Glassmorphic Smart Tip Footer */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex items-start gap-3 shadow-xl">
          <div className="bg-blue-500/20 p-2 rounded-lg">
            <Lightbulb className="w-5 h-5 text-blue-300" />
          </div>
          <div>
            <h3 className="text-white/60 text-xs font-semibold uppercase tracking-wider">Smart Tip of the Day</h3>
            <p className="text-white/90 text-sm mt-1 leading-relaxed">
              {loadingTip ? (
                <span className="flex items-center gap-2 italic">
                  <Loader2 className="w-3 h-3 animate-spin" /> Fetching insight...
                </span>
              ) : (
                tip
              )}
            </p>
          </div>
        </div>
      </div>
      
      {/* Branding Overlay */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-xs tracking-widest font-light pointer-events-none">
        © 2024 SMARTEDU CLOUD ECOSYSTEM
      </div>
    </div>
  );
};

export default App;
