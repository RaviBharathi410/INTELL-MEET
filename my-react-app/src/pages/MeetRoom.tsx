import React from 'react';
import MeetNavbar from '../components/meet/MeetNavbar';
import VideoGrid from '../components/meet/VideoGrid';
import Sidebar from '../components/meet/Sidebar';
import AIPanel from '../components/meet/AIPanel';
import Controls from '../components/meet/Controls';

const MeetRoom: React.FC = () => {
  return (
    <div className="h-screen bg-black flex flex-col overflow-hidden">
      <MeetNavbar />
      
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <VideoGrid />
        <AIPanel />
      </div>

      <Controls />
    </div>
  );
};

export default MeetRoom;
