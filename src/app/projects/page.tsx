"use client";

import { useUser, RedirectToSignIn } from "@clerk/nextjs";
import { Show, UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Plus, Clock, FileDown, MoreHorizontal, ArrowLeft, ArrowRight, LayoutGrid, Search, ChevronDown, Check, Columns,
  Layers, Home, GitMerge, FolderOpen, Video, Moon, Brush, PenTool, Mic, ScanFace, Box, Film, PanelLeftClose, Pickaxe, User as UserIcon, Image as ImageIcon, Wand2, MonitorPlay
} from "lucide-react";

export default function ProjectsPage() {
  const { user, isLoaded } = useUser();
  const [workflows, setWorkflows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showMoreTools, setShowMoreTools] = useState(false);

  useEffect(() => {
    async function fetchWorkflows() {
      try {
        const res = await fetch('/api/workflows');
        if (res.ok) {
          const data = await res.json();
          setWorkflows(data.workflows);
        }
      } catch (e) {
        console.error("Failed to fetch workflows", e);
      } finally {
        setLoading(false);
      }
    }

    if (isLoaded && user) {
      fetchWorkflows();
    }
  }, [isLoaded, user]);

  if (!isLoaded) return <div className="h-screen w-screen bg-[#0E0E0E] text-white flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen w-full bg-[#0E0E0E] text-white flex overflow-hidden font-sans">
      <Show when="signed-in">
        
        {/* Advanced Collapsable Sidebar */}
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
                    className="text-white/50 hover:text-white transition-colors flex items-center justify-center w-8 h-8 rounded-lg hover:bg-white/5"
                  >
                    <PanelLeftClose size={20} className={`${!isSidebarOpen ? "rotate-180" : ""} shrink-0`} />
                  </button>
              </div>

              <nav className="flex flex-col gap-1 mt-2">
                  <Link href="/" className={`flex items-center gap-3 p-2 rounded-xl transition-colors hover:bg-white/5 text-white/70 ${!isSidebarOpen ? 'justify-center w-full' : ''}`}>
                      <Home size={20} strokeWidth={1.5} className="shrink-0" />
                      {isSidebarOpen && <span className="font-medium text-sm">Home</span>}
                  </Link>
                  <Link href="#" className={`flex items-center gap-3 p-2 rounded-xl transition-colors hover:bg-white/5 text-white/70 ${!isSidebarOpen ? 'justify-center w-full' : ''}`}>
                      <GitMerge size={20} strokeWidth={1.5} className="shrink-0" />
                      {isSidebarOpen && <span className="font-medium text-sm">Train Lora</span>}
                  </Link>
                  <Link href="/projects" className={`flex items-center gap-3 p-2 rounded-xl transition-colors bg-white/10 text-white ${!isSidebarOpen ? 'justify-center w-full' : ''}`}>
                      <LayoutGrid size={20} strokeWidth={1.5} className="shrink-0" />
                      {isSidebarOpen && <span className="font-medium text-sm">Node Editor</span>}
                  </Link>
                  <Link href="#" className={`flex items-center gap-3 p-2 rounded-xl transition-colors hover:bg-white/5 text-white/70 ${!isSidebarOpen ? 'justify-center w-full' : ''}`}>
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
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/10 text-white/80 overflow-hidden">
                   {user?.imageUrl ? (
                     <img src={user.imageUrl} alt="User Avatar" className="w-full h-full object-cover" />
                   ) : (
                     <UserIcon size={18} />
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

        {/* Main Content Area */}
        <main className={`flex-1 w-full flex flex-col h-[100vh] overflow-y-auto overflow-x-hidden transition-all duration-300 ${isSidebarOpen ? 'md:pl-[240px]' : 'md:pl-[68px]'}`}>
            
            {/* Header Right */}
            <header className="absolute top-0 right-0 p-4 z-50 flex gap-4">
               <UserButton />
            </header>

            {/* Hero Section */}
            <div className="w-full relative min-h-[350px] flex px-12 md:px-24 mb-12">
                {/* Background image covering the hero section */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <img src="https://s.krea.ai/nodesHeaderBannerBlurGradient.webp" className="w-full h-full object-cover object-[center_right] opacity-100 mix-blend-lighten" alt="Nodes Hero" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0E0E0E] via-[#0E0E0E]/80 to-transparent w-[70%]"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E] via-[#0E0E0E]/20 to-transparent h-32 top-auto"></div>
                </div>

                <div className="relative z-10 flex flex-col justify-end max-w-xl pb-12 w-full mt-24">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                            <LayoutGrid size={28} className="text-[#3b82f6]" fill="currentColor" strokeWidth={1} />
                        </div>
                        <h1 className="text-[40px] font-semibold tracking-tight text-white m-0 leading-none">Node Editor</h1>
                    </div>
                    <p className="text-[17px] text-white/80 leading-relaxed mb-8 font-medium">
                        Nodes is the most powerful way to operate Nextflow. Connect every tool and model into complex automated pipelines.
                    </p>
                    <Link href="/canvas" className="bg-white hover:bg-white/90 text-black font-semibold text-[15px] px-6 py-3 rounded-full flex items-center justify-center gap-2 w-max transition-colors shadow-lg">
                        New Workflow
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </div>

            {/* Content Section below Hero */}
            <div className="px-12 md:px-24 pb-24 max-w-[1600px] mx-auto w-full flex-1">
                
                {/* Tabs & Filters bar */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#222]">
                    <div className="flex items-center gap-8">
                        <button className="text-white font-medium pb-4 border-b-2 border-white -mb-[17px]">Projects</button>
                        <button className="text-white/50 hover:text-white transition-colors font-medium pb-4 -mb-[17px]">Apps</button>
                        <button className="text-white/50 hover:text-white transition-colors font-medium pb-4 -mb-[17px]">Examples</button>
                        <button className="text-white/50 hover:text-white transition-colors font-medium pb-4 -mb-[17px]">Templates</button>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                            <input 
                                type="text" 
                                placeholder="Search projects..." 
                                className="bg-[#151515] border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/30 transition-colors w-[240px]"
                            />
                        </div>
                        <button className="flex items-center gap-2 bg-[#151515] border border-white/10 rounded-lg px-4 py-2 text-sm hover:bg-[#222] transition-colors">
                            Last viewed
                            <ChevronDown size={14} className="text-white/50" />
                        </button>
                        <button className="w-9 h-9 flex items-center justify-center bg-[#151515] border border-white/10 rounded-lg hover:bg-[#222] transition-colors">
                            <Columns size={16} className="text-white/50" />
                        </button>
                    </div>
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="aspect-[4/3] bg-[#1a1a1a] rounded-xl animate-pulse"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 w-full">
                        {/* New Workflow Card */}
                        <Link href="/canvas" className="group rounded-2xl overflow-hidden flex flex-col w-full">
                            <div className="aspect-[4/3] bg-[#1C1C1C] hover:bg-[#222] transition-colors rounded-xl flex items-center justify-center">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                                    <Plus size={20} className="text-black" />
                                </div>
                            </div>
                            <div className="py-4">
                                <h3 className="font-semibold text-[15px]">New Project</h3>
                            </div>
                        </Link>

                        {/* Existing Workflows */}
                        {workflows.map((workflow) => (
                            <Link href={`/canvas?id=${workflow._id}`} key={workflow._id} className="group rounded-2xl overflow-hidden flex flex-col w-full">
                                <div className="aspect-[4/3] bg-[#1A1A1A] border border-white/10 rounded-xl relative overflow-hidden flex flex-col">
                                    {/* The background pattern for the card */}
                                    <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:12px_12px]"></div>
                                    
                                    <div className="w-full h-full flex flex-col p-4 justify-between relative z-10 transition-transform duration-500 group-hover:scale-105">
                                      <div className="mt-auto flex justify-between items-end">
                                        <span className="bg-black/60 backdrop-blur-md px-2 py-1 rounded border border-white/10 text-[10px] uppercase font-bold tracking-wider text-white/80">
                                            {workflow.nodes?.length || 0} Nodes
                                        </span>
                                      </div>
                                    </div>
                                </div>
                                <div className="py-4 flex flex-col gap-1">
                                    <h3 className="font-semibold text-[15px] truncate group-hover:text-white/90 transition-colors text-white/80">{workflow.name}</h3>
                                    <span className="text-xs text-white/40">{new Date(workflow.updatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric'})}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
            
        </main>
      </Show>
      
      <Show when="signed-out">
        <RedirectToSignIn />
      </Show>
    </div>
  );
}
