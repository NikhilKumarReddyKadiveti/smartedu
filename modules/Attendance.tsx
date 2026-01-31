
import React, { useState, useRef } from 'react';
import { User, UserRole, AttendanceRecord } from '../types';

interface AttendanceProps {
  user: User;
}

const mockRequests: AttendanceRecord[] = [
  { id: '1', studentId: 's1', studentName: 'Rahul Sharma', timestamp: '10:42 AM', location: { lat: 37.77, lng: -122.41, name: 'Block B, R-202' }, photo: 'https://picsum.photos/seed/rahul/200', status: 'PENDING' },
  { id: '2', studentId: 's2', studentName: 'Ananya Iyer', timestamp: '10:45 AM', location: { lat: 37.77, lng: -122.41, name: 'Block B, R-202' }, photo: 'https://picsum.photos/seed/ananya/200', status: 'PENDING' },
  { id: '3', studentId: 's3', studentName: 'Vikram Singh', timestamp: '10:48 AM', location: { lat: 37.78, lng: -122.42, name: 'Library Hall' }, photo: 'https://picsum.photos/seed/vikram/200', status: 'PENDING' },
];

const AttendanceModule: React.FC<AttendanceProps> = ({ user }) => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [status, setStatus] = useState<'IDLE' | 'LOCATING' | 'READY' | 'SUBMITTING' | 'DONE'>('IDLE');
  const [requests, setRequests] = useState(mockRequests);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startAttendance = () => {
    setStatus('LOCATING');
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(() => {
        setStatus('READY');
        setIsCameraOpen(true);
        startCamera();
      }, () => {
        alert("Location required for attendance.");
        setStatus('IDLE');
      });
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) {
      console.error("Camera access denied", err);
    }
  };

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        setPhoto(canvasRef.current.toDataURL('image/jpeg'));
        setIsCameraOpen(false);
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    }
  };

  const submitAttendance = () => {
    setStatus('SUBMITTING');
    setTimeout(() => {
      setStatus('DONE');
    }, 1500);
  };

  const handleAction = (id: string, action: 'APPROVED' | 'REJECTED') => {
    setRequests(prev => prev.filter(r => r.id !== id));
    alert(`Request ${action.toLowerCase()}!`);
  };

  if (user.role === UserRole.FACULTY) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-black text-gray-900 leading-tight">Admin Attendance Panel</h2>
          <p className="text-sm text-gray-500">Managing Session: CS-402 (Data Structures)</p>
        </div>

        <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800">Pending Approvals ({requests.length})</h3>
            <button className="text-xs text-indigo-600 font-bold uppercase tracking-widest">Approve All</button>
          </div>
          
          <div className="space-y-4">
            {requests.map(req => (
              <div key={req.id} className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="flex items-center mb-3">
                  <img src={req.photo} className="w-12 h-12 rounded-xl object-cover border border-indigo-100" alt="student" />
                  <div className="ml-3 flex-grow">
                    <p className="font-bold text-gray-900 text-sm">{req.studentName}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">{req.timestamp} • {req.location.name}</p>
                  </div>
                  <div className="bg-emerald-100 text-emerald-700 p-1.5 rounded-lg">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleAction(req.id, 'APPROVED')}
                    className="flex-1 bg-white border border-gray-200 text-gray-800 py-2 rounded-xl text-xs font-bold shadow-sm active:bg-emerald-50 active:border-emerald-200 transition"
                  >
                    Approve
                  </button>
                  <button 
                    onClick={() => handleAction(req.id, 'REJECTED')}
                    className="flex-1 bg-white border border-gray-200 text-red-500 py-2 rounded-xl text-xs font-bold shadow-sm active:bg-red-50 transition"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
            {requests.length === 0 && (
              <div className="text-center py-10">
                <div className="text-4xl mb-2">🎉</div>
                <p className="text-sm font-bold text-gray-500">All caught up!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black text-gray-900 leading-tight">Class Check-in</h2>
      {status === 'IDLE' && (
        <div className="bg-white p-10 rounded-3xl shadow-sm border border-dashed border-indigo-200 flex flex-col items-center justify-center text-center">
          <div className="bg-indigo-50 p-6 rounded-full mb-4">
            <svg className="w-12 h-12 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" /></svg>
          </div>
          <p className="text-gray-600 font-medium mb-6 leading-relaxed">System will verify your biometric and location data.</p>
          <button onClick={startAttendance} className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-black shadow-lg shadow-indigo-100 hover:scale-105 transition">Mark Presence</button>
        </div>
      )}
      {status === 'LOCATING' && <div className="text-center py-20 animate-pulse text-indigo-600 font-bold">Verifying Coordinates...</div>}
      {isCameraOpen && (
        <div className="bg-black rounded-3xl overflow-hidden relative aspect-[3/4] shadow-2xl">
          <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
          <button onClick={takePhoto} className="absolute bottom-6 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full border-4 border-white bg-white/20" />
        </div>
      )}
      {photo && !isCameraOpen && status !== 'DONE' && (
        <div className="bg-white p-6 rounded-3xl shadow-sm text-center">
          <img src={photo} className="w-48 h-48 rounded-2xl object-cover mx-auto mb-4 border-2 border-indigo-500" alt="selfie" />
          <button onClick={submitAttendance} className="w-full bg-indigo-600 text-white py-3 rounded-2xl font-black">Finalize Submission</button>
        </div>
      )}
      {status === 'DONE' && <div className="bg-emerald-50 p-10 rounded-3xl text-center border border-emerald-100 font-bold text-emerald-800">✅ Request Sent to Faculty</div>}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default AttendanceModule;
