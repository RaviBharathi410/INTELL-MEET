import { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Video as VideoIcon, VideoOff, PhoneOff, MessageSquare, Users, Settings } from 'lucide-react';

export function LiveRoom() {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const localVideoRef = useRef(null);

  useEffect(() => {
    // Basic stream setup (WebRTC foundation)
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        if (localVideoRef.current) {
          (localVideoRef.current as HTMLVideoElement).srcObject = stream;
        }
      });
  }, []);

  return (
    <div className="flex h-full bg-black overflow-hidden relative">
      {/* Video Grid */}
      <div className={`flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 transition-all ${showChat ? 'mr-80' : ''}`}>
        <div className="relative bg-white/5 rounded-2xl overflow-hidden border border-white/10 aspect-video flex items-center justify-center">
          <video ref={localVideoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
          <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium border border-white/10">
            You {isMuted && '(Muted)'}
          </div>
        </div>
        {/* Placeholder for remote participant */}
        <div className="relative bg-[#0A1628] rounded-2xl overflow-hidden border border-white/10 aspect-video flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-500 to-emerald-500 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold">JD</span>
            </div>
            <p className="text-white/60 font-medium">Jane Doe (Remote)</p>
            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium border border-white/10">
                Jane Doe
            </div>
        </div>
      </div>

      {/* Chat Sidebar Wrapper */}
      {showChat && (
        <aside className="fixed right-0 top-0 bottom-0 w-80 bg-[#0A1628] border-l border-white/10 p-6 flex flex-col z-20">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg">In-meeting Chat</h3>
                <button onClick={() => setShowChat(false)} className="text-white/40 hover:text-white">&times;</button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                <div className="bg-white/5 p-3 rounded-lg text-sm">
                    <p className="text-cyan-400 font-bold text-xs mb-1">Jane Doe</p>
                    <p className="text-white/80">Can everyone see my shared screen?</p>
                </div>
            </div>
            <input 
                type="text" 
                placeholder="Type a message..." 
                className="bg-black/50 border border-white/10 rounded-full px-4 py-3 text-sm focus:outline-none focus:border-white/30 w-full"
            />
        </aside>
      )}

      {/* Control Bar */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-4 px-6 py-4 bg-black/80 backdrop-blur-xl border border-white/10 rounded-full z-30">
        <button 
            onClick={() => setIsMuted(!isMuted)}
            className={`p-3 rounded-full transition-colors ${isMuted ? 'bg-red-500/20 text-red-500' : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'}`}
        >
          {isMuted ? <MicOff size={22} /> : <Mic size={22} />}
        </button>
        <button 
            onClick={() => setIsVideoOn(!isVideoOn)}
            className={`p-3 rounded-full transition-colors ${!isVideoOn ? 'bg-red-500/20 text-red-500' : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'}`}
        >
          {isVideoOn ? <VideoIcon size={22} /> : <VideoOff size={22} />}
        </button>
        
        <div className="w-px h-6 bg-white/10 mx-2" />
        
        <button 
            onClick={() => setShowChat(!showChat)}
            className={`p-3 rounded-full transition-colors ${showChat ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'}`}
        >
          <MessageSquare size={22} />
        </button>
        <button className="p-3 rounded-full bg-white/5 text-white/70 hover:bg-white/10 hover:text-white">
          <Users size={22} />
        </button>
        <button className="p-3 rounded-full bg-white/5 text-white/70 hover:bg-white/10 hover:text-white">
          <Settings size={22} />
        </button>
        
        <div className="w-px h-6 bg-white/10 mx-2" />
        
        <button className="px-6 py-3 bg-red-500 rounded-full font-bold flex items-center space-x-2 text-white hover:bg-red-600 transition-colors">
          <PhoneOff size={20} />
          <span>Leave</span>
        </button>
      </div>
    </div>
  );
}
