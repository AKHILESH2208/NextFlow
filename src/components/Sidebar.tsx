"use client";
import { useState } from "react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { 
  Layers, Home, GitMerge, FolderOpen, Video, Moon, Brush, PenTool, Mic, ScanFace, Box, Film, MoreHorizontal, PanelLeftClose, Pickaxe, User, LayoutGrid, Image as ImageIcon, Wand2, MonitorPlay
} from 'lucide-react';

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showMoreTools, setShowMoreTools] = useState(false);
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <aside 
      className={`${isSidebarOpen ? 'w-[240px]' : 'w-[68px]'} flex-col justify-between py-4 border-r border-[#222] bg-[#0A0A0A] hidden md:flex z-50 fixed h-full left-0 top-0 transition-all duration-300 overflow-y-auto no-scrollbar shrink-0`}
    >
      <div className="flex flex-col w-full px-3 gap-6">
          <div className={`flex ${isSidebarOpen ? 'items-center justify-between px-1 h-8 mt-2' : 'flex-col items-center justify-center gap-4 mt-4 w-full'}`}>
              {isSidebarOpen ? (
                 <Link href="/" className="flex items-center gap-2">
                   <Layers className="w-5 h-5 text-white shrink-0" />
                 </Link>
              ) : (
                 <Link href="/" className="mb-1 flex items-center justify-center">
                   <Layers className="w-5 h-5 text-white shrink-0" />
                 </Link>
              )}
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-white/50 hover*text-white transition-colors flex items-center justify-center w-8 h-8 rounded-lg hover:bg-white/5"
              >
                <PanelLeftClose size={20} className={`${!isSidebarOpen ? "rotate-180" : ""} shrink-0`} />
              </button>
          </div>

          <nav className="flex flex-col gap-1 mt-2">
              <Link href="/" className={`flex items-center gap-3 p-2 rounded-xl transition-colors ${pathname === '/' ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-white/70'} ${!isSidebarOpen ? 'justify-center w-full' : ''}`}>
                  <Home size={20} strokeWidth={1.5} className="shrink-0" />
                  {isSidebarOpen && <span className="font-medium text-sm">Home</span>}
              </Link>
              <Link href="#" className={`flex items-center gap-3 p-2 rounded-xl transition-colors ${pathname === '/train' ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-white/70'} ${!isSidebarOpen ? 'justify-center w-full' : ''}`}>
                  <GitMerge size={20} strokeWidth={1.5} className="shrink-0" />
                  {isSidebarOpen && <span className="font-medium text-sm">Train Lora</span>}
              </Link>
              <Link href="/projects" className={`flex items-center gap-3 p-2 rounded-xl transition-colors ${pathname === '/projects' ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-white/70'} ${!isSidebarOpen ? 'justify-center w-full' : ''}`}>
                  <LayoutGrid size={20} strokeWidth={1.5} className="shrink-0" />
                  {isSidebarOpen && <span className="font-medium text-sm">Node Editor</span>}
              </Link>
              <Link href="#" className={`flex items-center gap-3 p-2 rounded-xl transition-colors ${pathname === '/assets' ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-white/70'} ${!isSidebarOpen ? 'justify-center w-full' : ''}`}>
                  <FolderOpen size={20} strokeWidth={1.5} className="shrink-0" />
                  {isSidebarOpen && <span className="font-medium text-sm">Assets</span>}
              </Link>
          </nav>

          <div className="flex flex-col gap-1 mt-4">
              {isSidebarOpen && <div className="text-white/40 text-xs font-medium px-3 mb-2">Tools</div>}
              
              <Link href="#" className={`flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors text-white/70 ${!isSidebarOpen ? 'justify-center w-full' : ''}`}>
                  <ImageIcon size={20} strokeWidth={1.5} className="text-[#3b82f6] shrink-0" />
                  {isSidebarOpen && <span className="font-medium text-sm">Image</span>}
              </Link>
              <Link href="#" className={`flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors text-white/70 ${!isSidebarOpen ? 'justify-center w-full' : ''}`}>
                  <MonitorPlay size={20} strokeWidth={1.5} className="text-[#f59e0b] shrink-0" />
                  {isSidebarOpen && <span className="font-medium text-sm">Video</span>}
              </Link>
              <Link href="#" className={`flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors text-white/70 ${!isSidebarOpen ? 'justify-center w-full' : ''}`}>
                  <Wand2 size={20} strokeWidth={1.5} className="shrink-0" />
                  {isSidebarOpen && <span className="font-medium text-sm">Enhancer</span>}
              </Link>
              <Link href="#" className={`flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors text-white/70 ${!isSidebarOpen ? 'justify-center w-full' : ''}`}>
                  <Moon size={20} strokeWidth={1.5} className="text-[#eab308] shrink-0" />
                  {isSidebarOpen && <span className="font-medium text-sm text-white/90">Nano Banana</span>}
              </Link>
              <Link href="#" className={`flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors text-white/70 ${!isSidebarOpen ? 'justify-center w-full' : ''}`}>
                  <Brush size={20} strokeWidth={1.5} className="text-[#06b6d4] shrink-0" />
                  {isSidebarOpen && <span className="font-medium text-sm">Realtime</span>}
              </Link>

              {showMoreTools && (
                <>
                  <Link href="#" className={`flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors text-white/70 ${!isSidebarOpen ? 'justify-center w-full' : ''}`}>
                      <PenTool size={20} strokeWidth={1.5} className="text-[#d946ef] shrink-0" />
                      {isSidebarOpen && <span className="font-medium text-sm">Edit</span>}
                  </Link>
                  <Link href="#" className={`flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors text-white/70 ${!isSidebarOpen ? 'justify-center w-full' : ''}`}>
                      <Mic size={20} strokeWidth={1.5} className="shrink-0" />
                      {isSidebarOpen && <span className="font-medium text-sm">Video Lipsync</span>}
                  </Link>
                  <Link href="#" className={`flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors text-white/70 ${!isSidebarOpen ? 'justify-center w-full' : ''}`}>
                      <ScanFace size={20} strokeWidth={1.5} className="text-[#a3e635] shrink-0" />
                      {isSidebarOpen && <span className="font-medium text-sm">Motion Transfer</span>}
                  </Link>
                  <Link href="#" className={`flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors text-white/70 ${!isSidebarOpen ? 'justify-center w-full' : ''}`}>
                      <Box size={20} strokeWidth={1.5} className="shrink-0" />
                      {isSidebarOpen && <span className="font-medium text-sm">3D Objects</span>}
                  </Link>
                  <Link href="#" className={`flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors text-white/70 ${!isSidebarOpen ? 'justify-center w-full' : ''}`}>
                      <Film size={20} strokeWidth={1.5} className="text-[#f97316] shrink-0" />
                      {isSidebarOpen && <span className="font-medium text-sm">Video Restyle</span>}
                  </Link>
                </>
              )}

              <button 
                onClick={() => setShowMoreTools(!showMoreTools)} 
                className={`flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors text-white/40 ${!isSidebarOpen ? 'justify-center w-full' : ''}`}
              >
                  <MoreHorizontal size={20} strokeWidth={1.5} className="shrink-0" />
                  {isSidebarOpen && <span className="font-medium text-sm">{showMoreTools ? 'Less' : 'More'}</span>}
              </button>
          </div>
      </div>

      <div className={`flex flex-col w-full ${isSidebarOpen ? 'px-4' : 'px-2 items-center'} gap-4 mt-8 pb-4 border-t border-white/5 pt-6`}>
         {isSidebarOpen && (
           <div className="flex flex-col gap-3">
             <span className="text-white/90 text-sm font-medium">Earn 3,000 Credits</span>
             <button className="w-full bg-gradient-to-r from-[#3b82f6] to-[#4f46e5] hover:opacity-90 text-white rounded-xl py-2.5 text-[15px] font-medium transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)]">
               Upgrade
             </button>
           </div>
         )}
         <div className={`flex items-center gap-3 mt-2 ${!isSidebarOpen ? 'justify-center w-full' : ''}`}>
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/10 text-white/80 overflow-hidden relative">
               {user?.imageUrl ? (
                 <img src={user.imageUrl} alt="User avatar" className="w-full h-full object-cover" />
               ) : (
                 <User size={18} />
               )}
            </div>
            {isSidebarOpen && (
               <div className="flex flex-col overflow-hidden">
                  <span className="text-sm font-medium text-white/90 truncate">
                    {user?.fullName || user?.firstName || user?.primaryEmailAddress?.emailAddress?.split('@')[0] || 'User'}
                  </span>
                  <span className="text-xs text-white/50">Free</span>
               </div>
            )}
         </div>
      </div>
    </aside>
  );
}
