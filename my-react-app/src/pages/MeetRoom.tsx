import React from 'react';
import MeetNavbar from '../components/meet/MeetNavbar';
import VideoGrid from '../components/meet/VideoGrid';
import Sidebar from '../components/meet/Sidebar';
import AIPanel from '../components/meet/AIPanel';
import Controls from '../components/meet/Controls';

const MeetRoom: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8F8FA] text-zinc-950 flex flex-col overflow-hidden">
      <MeetNavbar />
      
      <div className="grid grid-cols-[300px_1fr_360px] h-[calc(100vh-64px)] overflow-hidden">
        <Sidebar />
        <VideoGrid />
        <AIPanel />
      </div>

      <Controls />
    </div>
  );
};

export default MeetRoom;
