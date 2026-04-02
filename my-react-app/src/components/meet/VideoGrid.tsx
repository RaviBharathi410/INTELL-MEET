import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { MicOff, VideoOff, Mic } from 'lucide-react';
import { clsx } from 'clsx';
import { useMeetingStore } from '../../store/useMeetingStore';

const VideoGrid: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { participants, activeSpeakerId } = useMeetingStore();

  useGSAP(() => {
    gsap.from('.video-tile', {
       scale: 0.9,
       opacity: 0,
       stagger: 0.1,
       duration: 0.8,
       ease: 'back.out(1.2)'
    });
  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef}
      className="flex-1 p-6 grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr h-full"
    >
      {participants.map((p) => (
        <VideoTile key={p.id} participant={p} isActiveSpeaker={p.id === activeSpeakerId} />
      ))}
    </div>
  );
};

// Use the type from our store
type Participant = ReturnType<typeof useMeetingStore.getState>['participants'][number];

const VideoTile = React.memo<{ participant: Participant, isActiveSpeaker: boolean }>(({ participant, isActiveSpeaker }) => {
  return (
    <div className={clsx(
        'video-tile relative rounded-[24px] bg-[#FFFFFF] border transition-all duration-300 overflow-hidden group',
        isActiveSpeaker || participant.isSpeaking ? 'border-[#5850EC] ring-2 ring-[#5850EC]/30 shadow-[0_8px_30px_rgba(88,80,236,0.2)] scale-[1.02] z-10' : 'border-[#E4E4E7] shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]'
    )}>
       {participant.isVideoOn ? (
           <div className="absolute inset-0 bg-[#111111] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 to-transparent z-10" />
              <div className="w-24 h-24 rounded-full border-2 border-[#FFFFFF]/10 opacity-20" />
           </div>
       ) : (
           <div className="absolute inset-0 bg-[#F8F8FC] flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-[#FFFFFF] border border-[#E4E4E7] shadow-sm flex items-center justify-center text-3xl font-black text-[#5850EC]">
                 {participant.avatar || participant.name.charAt(0)}
              </div>
           </div>
       )}

       {/* Overlay Labels */}
       <div className="absolute bottom-5 left-5 bg-[#FFFFFF]/90 backdrop-blur-md px-4 py-2 rounded-xl border border-[#E4E4E7] shadow-sm z-20">
          <span className="text-[11px] font-black uppercase tracking-widest text-[#111111]">
             {participant.name}
          </span>
       </div>

       <div className="absolute top-5 right-5 flex space-x-2 z-20">
          {!participant.isMuted ? (
             <div className="w-8 h-8 rounded-full bg-[#111111]/20 backdrop-blur-md flex items-center justify-center text-[#FFFFFF]">
                <Mic size={14} />
             </div>
          ) : (
             <div className="w-8 h-8 rounded-full bg-red-500/90 backdrop-blur-md flex items-center justify-center text-[#FFFFFF] shadow-lg shadow-red-500/20">
                <MicOff size={14} />
             </div>
          )}
          {!participant.isVideoOn && (
             <div className="w-8 h-8 rounded-full bg-red-500/90 backdrop-blur-md flex items-center justify-center text-[#FFFFFF] shadow-lg shadow-red-500/20">
                <VideoOff size={14} />
             </div>
          )}
       </div>

       {/* Speaking Aura */}
       {(isActiveSpeaker || participant.isSpeaking) && (
           <div className="absolute inset-0 rounded-[24px] shadow-[inset_0_0_0_2px_#5850EC] pointer-events-none z-20" />
       )}
    </div>
  );
});

export default VideoGrid;
