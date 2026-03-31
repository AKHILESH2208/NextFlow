"use client";

import { useState, useEffect, useRef } from "react";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import WorkflowCanvas from "@/components/workflow/WorkflowCanvas";
import { useWorkflowStore } from "@/store/workflowStore";
import { useWorkflowExecution } from "@/hooks/useWorkflowExecution";
import { 
  TypeIcon, 
  ImageIcon, 
  VideoIcon, 
  Wand2Icon, 
  CropIcon, 
  ScissorsIcon,
  SearchIcon,
  PlusIcon,
  Save,
  Download,
  Upload,
  ChevronLeft,
  ChevronRight,
  Play
} from "lucide-react";
import Link from "next/link";

export default function CanvasPage() {
  const nodes = useWorkflowStore(state => state.nodes);
  const edges = useWorkflowStore(state => state.edges);
  const setNodes = useWorkflowStore(state => state.setNodes);
  const setEdges = useWorkflowStore(state => state.setEdges);
  const history = useWorkflowStore(state => state.history);
  
  const { executeFullWorkflow } = useWorkflowExecution();

  const [isSaving, setIsSaving] = useState(false);
  const workflowId = useWorkflowStore(state => state.workflowId);
  const setWorkflowId = useWorkflowStore(state => state.setWorkflowId);

  // Sidebar states
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);
  const [isSampleLoaded, setIsSampleLoaded] = useState(false);

  // Click-to-add node logic
  const addNodeToCenter = (type: string) => {
    const newNode = {
      id: `node-${Date.now()}`,
      type,
      position: { 
        x: window.innerWidth / 2 - 128 - (leftOpen ? 256 : 0) + (Math.random() * 50 - 25), 
        y: window.innerHeight / 2 - 100 + (Math.random() * 50 - 25) 
      },
      data: { label: `${type.replace('Node', '')} Node` }
    };
    setNodes([...nodes, newNode]);
  };

  // Drag to scroll logic for history sidebar
  const historyRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!historyRef.current) return;
    setIsDragging(true);
    setStartY(e.pageY - historyRef.current.offsetTop);
    setScrollTop(historyRef.current.scrollTop);
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !historyRef.current) return;
    e.preventDefault();
    const y = e.pageY - historyRef.current.offsetTop;
    const walk = (y - startY) * 2;
    historyRef.current.scrollTop = scrollTop - walk;
  };

  useEffect(() => {
    if (isSampleLoaded) return;

    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    
    if (id) {
      setWorkflowId(id);
      fetch(`/api/workflows/get?id=${id}`)
        .then(res => res.json())
        .then(data => {
          if (data.workflow) {
            setNodes(data.workflow.nodes || []);
            setEdges(data.workflow.edges || []);
            setIsSampleLoaded(true);
          }
        })
        .catch(err => console.error("Error loading workflow:", err));
        } else {
      setIsSampleLoaded(true);
      setNodes([]);
      setEdges([]);
    }
  }, [setNodes, setEdges, isSampleLoaded]);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const res = await fetch('/api/workflows', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: workflowId,
          name: 'Untitled Workflow',
          nodes,
          edges
        })
      });
      const data = await res.json();
      if (data.workflow) {
        setWorkflowId(data.workflow._id);
        alert('Workflow saved successfully!');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to save workflow.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleExport = () => {
    const data = JSON.stringify({ nodes, edges }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'workflow.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (json.nodes && json.edges) {
          setNodes(json.nodes);
          setEdges(json.edges);
        }
      } catch (err) {
        alert("Invalid JSON file");
      }
    };
    reader.readAsText(file);
  };

  // Group history by runId
  const groupedHistory = history.reduce((acc, entry) => {
    if (!entry.runId) return acc;
    if (!acc[entry.runId]) {
      acc[entry.runId] = {
        runId: entry.runId,
        runType: entry.runType || 'Unknown',
        runTimestamp: entry.runTimestamp || Date.now(),
        entries: [],
        status: 'success',
        duration: 0
      };
    }
    acc[entry.runId].entries.push(entry);
    if (entry.status === 'error') acc[entry.runId].status = 'error';
    if (entry.status === 'running' && acc[entry.runId].status !== 'error') acc[entry.runId].status = 'running';
    if (entry.duration) acc[entry.runId].duration += entry.duration;
    return acc;
  }, {} as Record<string, { runId: string, runType: string, runTimestamp: number, status: string, duration: number, entries: typeof history }>);

  const sortedRuns = Object.values(groupedHistory).sort((a, b) => b.runTimestamp - a.runTimestamp);

  return (
    <main className="flex h-screen w-screen bg-black text-white overflow-hidden font-sans relative">
      
      {/* LEFT SIDEBAR */}
      <aside 
        className={`h-full shrink-0 flex flex-col bg-black/60 backdrop-blur-xl border-white/[0.05] border-r border-white/5 transition-all duration-300 z-40 shadow-2xl relative min-w-0 ${leftOpen ? 'w-64' : 'w-16 items-center'}`}
      >
        <div className="h-14 flex flex-col justify-center px-4 border-b border-white/5 whitespace-nowrap w-full">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-white flex items-center justify-center text-black font-bold text-xs shadow-lg">
                N
              </div>
              {leftOpen && <span className="font-semibold text-sm tracking-wide">NextFlow</span>}
            </div>
            {leftOpen && <Link href="/" className="text-xs uppercase font-bold tracking-wider bg-white/10 hover:bg-white/20 text-white/90 px-2 py-1 rounded transition-colors">Home</Link>}
          </div>
        </div>

        <div className="p-3 w-full">
          <div className="relative flex items-center w-full">
            <SearchIcon className="absolute left-2.5 text-white/40" size={14} />
            <input 
              type="text" 
              placeholder="Search nodes..." 
              className={`w-full bg-white/5 border border-white/5 rounded-md pl-8 pr-3 py-1.5 text-xs text-white outline-none focus:border-purple-500/50 transition-colors placeholder-white/30 ${!leftOpen ? "hidden" : ""}`}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-2 pb-4 w-full min-h-0">
          {leftOpen && <div className="px-2 py-2 mt-2 text-[10px] font-semibold text-white/40 uppercase tracking-wider">Quick Access (Click to add)</div>}
          <div className="space-y-1 flex flex-col">
            {[
              { type: 'textNode', icon: TypeIcon, label: 'Text Node', color: 'text-white/60' },
              { type: 'imageNode', icon: ImageIcon, label: 'Upload Image', color: 'text-blue-400' },
              { type: 'videoNode', icon: VideoIcon, label: 'Upload Video', color: 'text-purple-400' },
              { type: 'llmNode', icon: Wand2Icon, label: 'Run AI Model', color: 'text-fuchsia-400', shadow: true },
              { type: 'cropNode', icon: CropIcon, label: 'Crop Image', color: 'text-cyan-400' },
              { type: 'frameNode', icon: ScissorsIcon, label: 'Extract Frame', color: 'text-emerald-400' }
            ].map((node) => (
              <button 
                key={node.type}
                onClick={() => addNodeToCenter(node.type)}
                draggable
                onDragStart={(e) => e.dataTransfer.setData("application/reactflow", node.type)}
                className={`flex items-center ${leftOpen ? "gap-3 px-3" : "justify-center px-0"} w-full text-left py-2.5 text-xs text-white/80 hover:bg-white/10 rounded-lg transition-all group cursor-pointer border border-transparent hover:border-white/5`}
              >
                <div className={`p-1.5 rounded-md bg-white/5 ${node.shadow ? 'shadow-[0_0_10px_rgba(168,85,247,0.4)]' : ''}`}>
                  <node.icon size={14} className={`${node.color}`} />
                </div>
                {leftOpen && <span className="font-medium tracking-wide whitespace-nowrap">{node.label}</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-white/5 flex items-center justify-between w-full">
          <Show when="signed-in">
            <div className="flex items-center gap-2">
              <UserButton />
              <div className="flex flex-col">
                {leftOpen && <span className="text-xs font-medium whitespace-nowrap">My Account</span>}
              </div>
            </div>
          </Show>
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="w-full py-2 bg-white text-black hover:bg-white/90 rounded-md text-xs transition-colors font-semibold">
                Sign In
              </button>
            </SignInButton>
          </Show>
        </div>
      </aside>

      {/* Left Sidebar Toggle */}
      <button 
        onClick={() => setLeftOpen(!leftOpen)}
        className={`absolute top-1/2 -translate-y-1/2 z-50 p-1.5 bg-black/60 backdrop-blur-xl border-white/[0.05] border border-white/5 text-white rounded-r-lg shadow-xl hover:bg-[#222] transition-all ${leftOpen ? 'left-64' : 'left-16'}`}
      >
        {leftOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>

      {/* Main Canvas Area */}
      <div className="flex-1 relative flex flex-col bg-black">
        {/* Top Canvas Toolbar */}
        <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
          <div className="bg-black/60 backdrop-blur-xl border-white/[0.05]/80 backdrop-blur-md border border-white/5 rounded-lg px-4 py-2 flex items-center gap-3 shadow-2xl pointer-events-auto">
            <span className="text-sm font-semibold text-white">Untitled Workflow</span>
            <span className="text-[10px] bg-white/10 text-white/50 px-2 py-0.5 rounded-full font-medium">Unsaved</span>
          </div>

          <div className="flex items-center gap-2 pointer-events-auto bg-black/60 backdrop-blur-xl border-white/[0.05]/80 backdrop-blur-md border border-white/5 p-1.5 rounded-xl shadow-2xl">
            <button 
              onClick={() => {
                fetch('/sample-workflow.json')
                  .then(res => res.json())
                  .then(data => {
                    if (data.nodes && data.edges) {
                      setNodes(data.nodes);
                      setEdges(data.edges);
                    }
                  });
              }}
              className="bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 font-medium border border-purple-500/30 text-xs px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Wand2Icon size={14} />
              Load Sample
            </button>
            <div className="w-px h-6 bg-white/10 mx-1"></div>
            <button 
              onClick={handleExport}
              className="hover:bg-white/10 text-white/80 text-xs px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Download size={14} /> Export
            </button>
            <label className="hover:bg-white/10 text-white/80 text-xs px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer">
              <Upload size={14} /> Import
              <input type="file" accept=".json" className="hidden" onChange={handleImport} />
            </label>
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="hover:bg-white/10 text-white/80 text-xs px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 disabled:opacity-50"
            >
              <Save size={14} /> {isSaving ? "Saving..." : "Save"}
            </button>
            <div className="w-px h-6 bg-white/10 mx-1"></div>
            <button 
              onClick={executeFullWorkflow} 
              className="bg-white hover:bg-white/90 text-black font-semibold text-xs px-4 py-1.5 rounded-lg transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)] flex items-center gap-1.5"
            >
              <Play size={14} className="fill-current" />
              Run All
            </button>
          </div>
        </div>

        {/* The React Flow UI */}
        <WorkflowCanvas />
      </div>

      {/* Right Sidebar Toggle */}
      <button 
        onClick={() => setRightOpen(!rightOpen)}
        className={`absolute top-1/2 -translate-y-1/2 z-50 p-1.5 bg-black/60 backdrop-blur-xl border-white/[0.05] border border-white/5 text-white rounded-l-lg shadow-xl hover:bg-[#222] transition-all ${rightOpen ? 'right-72' : 'right-0'}`}
      >
        {rightOpen ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* RIGHT SIDEBAR (History) */}
      <aside 
        className={`h-full shrink-0 flex flex-col bg-black/60 backdrop-blur-xl border-white/[0.05] border-l border-white/5 transition-all duration-300 z-40 shadow-2xl relative min-w-0 ${rightOpen ? 'w-72' : 'w-0 overflow-hidden !border-l-0'}`}
      >
        <div className="h-14 flex items-center px-5 border-b border-white/5 min-w-[18rem]">
          <span className="font-semibold text-sm">Execution Logs</span>
        </div>
        
        <div 
          ref={historyRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseUp}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`flex-1 overflow-y-auto p-4 flex flex-col gap-3 min-w-[18rem] min-h-0 ${isDragging ? 'cursor-grabbing select-none' : 'cursor-default gap-3'}`}
        >
          {sortedRuns.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center mt-10">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/5 flex items-center justify-center mb-3">
                <SearchIcon className="text-white/30" size={20} />
              </div>
              <span className="text-sm text-white/80 font-medium mb-1">No logs yet</span>
              <p className="text-xs text-white/40 max-w-[200px]">
                Run nodes individually or click Run All to see outputs here.
              </p>
            </div>
          ) : (
            sortedRuns.map((run) => (
              <details
                key={run.runId}
                className="group bg-[#181818] border border-white/5 rounded-xl text-xs flex flex-col relative overflow-hidden shrink-0 shadow-lg"
                open
              >
                <summary className="flex flex-col gap-2 p-3 cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden relative">
                  {run.status === 'running' && <div className="absolute top-0 left-0 w-full h-0.5 bg-blue-500 animate-pulse" />}
                  {run.status === 'success' && <div className="absolute top-0 left-0 w-full h-0.5 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />}
                  {run.status === 'error' && <div className="absolute top-0 left-0 w-full h-0.5 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <span className="font-semibold text-white capitalize">{run.runType}</span>
                       <span className="text-[10px] text-white/40 border border-white/10 px-1.5 py-0.5 rounded bg-white/5">
                         {run.entries.length} node{run.entries.length > 1 ? 's' : ''}
                       </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-white/40">
                        {new Date(run.runTimestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' })}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wide ${
                      run.status === 'running' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30' :
                      run.status === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
                      'bg-red-500/10 text-red-400 border border-red-500/30'
                    }`}>
                      {run.status} {run.duration > 0 ? `(${(run.duration).toFixed(2)}s)` : ''}
                    </span>
                    <span className="text-white/40 text-[10px] ml-auto group-open:rotate-180 transition-transform">
                       ▼
                    </span>
                  </div>
                </summary>

                <div className="p-3 pt-0 flex flex-col gap-3 group-open:border-t border-white/5 bg-black/20">
                   {run.entries.map((entry) => (
                      <div key={entry.id} className="pt-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-white/80 capitalize text-[11px]">{entry.nodeType.replace('Node', '')}</span>
                          <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase ${
                              entry.status === 'running' ? 'bg-blue-500/10 text-blue-400' :
                              entry.status === 'success' ? 'bg-emerald-500/10 text-emerald-400' :
                              'bg-red-500/10 text-red-400'
                          }`}>
                             {entry.status} {entry.duration && entry.duration > 0 ? `(${entry.duration.toFixed(2)}s)` : ''}
                          </span>
                        </div>
                        
                        {entry.output && (
                          <div className="mt-1 p-2 bg-black/50 border border-white/5 rounded text-[10px] text-white/70 overflow-y-auto max-h-32 whitespace-pre-wrap font-mono custom-scrollbar">
                            {entry.output}
                          </div>
                        )}
                        
                        {entry.error && (
                          <div className="mt-1 p-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded text-[10px] font-mono break-all">
                            {entry.error}
                          </div>
                        )}
                      </div>
                   ))}
                </div>
              </details>
            ))
          )}
        </div>
      </aside>
    </main>
  );
}