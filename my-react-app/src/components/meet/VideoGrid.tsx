import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface Participant {
  name: string;
  isSpeaking: boolean;
  camOn: boolean;
  micOn: boolean;
  avatar: string;
}

const mockParticipants: Participant[] = [
  { name: 'Dr. Sarah Jameson', isSpeaking: true, camOn: true, micOn: true, avatar: 'SJ' },
  { name: 'Michael Chen', isSpeaking: false, camOn: true, micOn: true, avatar: 'MC' },
  { name: 'Elena Rodriguez', isSpeaking: false, camOn: false, micOn: false, avatar: 'ER' },
  { name: 'Alex Thompson', isSpeaking: false, camOn: true, micOn: true, avatar: 'AT' },
];

type LayoutMode = "grid" | "speaker" | "presentation";

const VideoGrid: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [layoutMode, setLayoutMode] = React.useState<LayoutMode>("grid");

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
      className="flex-1 p-6 grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-fr h-full"
    >
      {mockParticipants.map((p, i) => (
        <VideoTile key={i} participant={p} />
      ))}
    </div>
  );
};

const VideoTile: React.FC<{ participant: Participant }> = ({ participant }) => {
  return (
    <div className={clsx(
        'video-tile relative rounded-[28px] bg-white border transition-all duration-500 overflow-hidden group',
        participant.isSpeaking ? 'border-indigo-500 ring-2 ring-indigo-500 shadow-[0_0_40px_rgba(79,70,229,0.12)] scale-[1.01] z-10' : 'border-zinc-200 shadow-lg hover:shadow-xl'
    )}>
       {participant.camOn ? (
           <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border-2 border-white/10 opacity-20" />
           </div>
       ) : (
           <div className="absolute inset-0 bg-[#EEF2FF] flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-[#FFFFFF] border border-[#E4E4E7] shadow-sm flex items-center justify-center text-3xl font-black text-[#4F46E5]">
                 {participant.avatar}
              </div>
           </div>
       )}

       {/* Overlay Labels */}
       <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-zinc-200 shadow-sm">
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-950">
             {participant.name}
          </span>
       </div>

       <div className="absolute top-4 right-4 flex space-x-2">
          {!participant.micOn && <MicOff size={14} className="text-red-500" />}
          {!participant.camOn && <VideoOff size={14} className="text-red-500" />}
       </div>

       {/* Speaking Aura */}
       {participant.isSpeaking && (
           <div className="absolute inset-0 rounded-[28px] pointer-events-none" />
       )}
    </div>
  );
};

import { MicOff, VideoOff } from 'lucide-react';
import { clsx } from 'clsx';
export default VideoGrid;
