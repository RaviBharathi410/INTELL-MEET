import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MeetNavbar from '../components/meet/MeetNavbar';
import VideoGrid from '../components/meet/VideoGrid';
import Sidebar from '../components/meet/Sidebar';
import AIPanel from '../components/meet/AIPanel';
import Controls from '../components/meet/Controls';
import { useMeetingStore } from '../store/useMeetingStore';

const MeetRoom: React.FC = () => {
  const { requestMediaDevices, stopLocalStream, isSidebarOpen, sidebarWidth } = useMeetingStore();

  useEffect(() => {
    requestMediaDevices();
    return () => stopLocalStream();
  }, []);

  return (
    <div className="h-screen bg-[#F5F5F7] text-zinc-950 flex flex-col overflow-hidden font-body">
      <MeetNavbar />

      <div className="flex-1 flex overflow-hidden relative">
        {/* Sidebar — collapsible */}
        <AnimatePresence mode="wait">
          {isSidebarOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: sidebarWidth, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex-shrink-0 overflow-hidden hidden md:block"
              style={{ width: sidebarWidth }}
            >
              <Sidebar />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Video Grid — fills all remaining space */}
        <div className="flex-1 min-w-0 relative">
          <VideoGrid />
        </div>

        {/* AI Panel — collapsible */}
        <AIPanel />
      </div>

      <Controls />
    </div>
  );
};

export default MeetRoom;
