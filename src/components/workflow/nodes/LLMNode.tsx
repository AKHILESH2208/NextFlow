import React, { memo, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Wand2Icon, X, Play, ChevronDown, ChevronRight } from 'lucide-react';
import { useWorkflowStore } from '@/store/workflowStore';
import { useWorkflowExecution } from '@/hooks/useWorkflowExecution';

function LLMNode({ id, data }: { id: string; data: any }) {
  const edges = useWorkflowStore((state) => state.edges);
  const updateNodeData = useWorkflowStore((state) => state.updateNodeData);
  const deleteNode = useWorkflowStore((state) => state.deleteNode);
  const { executeSingleNode } = useWorkflowExecution();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const hasSystemPromptConnection = edges.some(e => e.target === id && e.targetHandle === "system_prompt");
  const hasUserMessageConnection = edges.some(e => e.target === id && e.targetHandle === "user_message");
  const hasImagesConnection = edges.some(e => e.target === id && e.targetHandle === "images");

  const handleGenerate = () => {
    executeSingleNode(id);
  };

  return (
    <div className={`w-80 bg-black/60 backdrop-blur-2xl border rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.8)] p-0 font-sans group transition-all duration-300 ${data.isGenerating ? "border-purple-500 ring-2 ring-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.4)] animate-pulse" : "border-white/10 hover:border-white/20"}`}>
      <div className="absolute inset-0 bg-krea-accent opacity-5 pointer-events-none" />
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent">
        <div className="flex items-center gap-2">
          <Wand2Icon size={14} className="text-krea-accent" />
          <span className="font-medium text-[11px] tracking-wide text-white/80 uppercase">Run Any LLM</span>
        </div>
        <button onClick={() => deleteNode(id)} className="text-krea-text-muted hover:text-white transition-colors">
          <X size={14} />
        </button>
      </div>
      <div className="p-4 flex flex-col gap-4 relative z-10">
        
        <div className="flex items-center justify-between pb-2 border-b border-krea-border">
          <span className="text-[10px] text-krea-text-muted font-medium uppercase tracking-wider">Model</span>
          <select 
            className="nodrag bg-black/40 border border-white/5 rounded-lg px-3 py-1.5 text-xs text-white/90 outline-none focus:border-white/20 focus:ring-1 focus:ring-white/10 transition-all resize-none shadow-inner"
            value={data.model || "gemini-2.5-pro"}
            onChange={(e) => updateNodeData(id, { model: e.target.value })}
          >
            <option value="gemini-2.5-pro">gemini-2.5-pro</option>
            <option value="gemini-2.5-flash">gemini-2.5-flash</option>
          </select>
        </div>

        <div className="relative">
          <Handle type="target" id="system_prompt" position={Position.Left} style={{ left: "-8px" }} className="w-3! h-3! border-0! bg-white! shadow-[0_0_12px_rgba(255,255,255,0.9)]! ring-2! ring-black/50!" />
          <div className="text-[10px] text-krea-text-muted uppercase mb-1 ml-2">System Prompt</div>
          <textarea 
            className={`nodrag w-full bg-black/40 border border-white/5 rounded-lg p-3 text-xs text-white/90 outline-none focus:border-white/20 focus:ring-1 focus:ring-white/10 transition-all resize-none min-h-[60px] shadow-inner ${hasSystemPromptConnection ? 'opacity-50 cursor-not-allowed' : 'focus:border-krea-accent'}`}
            placeholder={hasSystemPromptConnection ? "Connected to input..." : "Optional instructions..."}
            disabled={hasSystemPromptConnection}
            value={data.systemPrompt || ""}
            onChange={(e) => updateNodeData(id, { systemPrompt: e.target.value })}
          />
        </div>

        <div className="relative">
          <Handle type="target" id="user_message" position={Position.Left} style={{ left: "-8px" }} className="w-3! h-3! border-0! bg-white! shadow-[0_0_12px_rgba(255,255,255,0.9)]! ring-2! ring-black/50!" />
          <div className="text-[10px] text-krea-text-muted uppercase mb-1 ml-2">User Message *</div>
          <textarea 
            className={`nodrag w-full bg-black/40 border border-white/5 rounded-lg p-3 text-xs text-white/90 outline-none focus:border-white/20 focus:ring-1 focus:ring-white/10 transition-all resize-none min-h-[60px] shadow-inner ${hasUserMessageConnection ? 'opacity-50 cursor-not-allowed' : 'focus:border-krea-accent'}`}
            placeholder={hasUserMessageConnection ? "Connected to input..." : "Required message..."}
            disabled={hasUserMessageConnection}
            value={data.userMessage || ""}
            onChange={(e) => updateNodeData(id, { userMessage: e.target.value })}
          />
        </div>

        <div className="relative flex items-center h-4">
          <Handle type="target" id="images" position={Position.Left} style={{ left: "-8px" }} className="w-3! h-3! border-0! bg-white! shadow-[0_0_12px_rgba(255,255,255,0.9)]! ring-2! ring-black/50!" />
          <div className="text-[10px] text-krea-text-muted uppercase ml-2">Images/Video (Multiple)</div>
        </div>

        <button 
          onClick={handleGenerate}
          className="mt-4 w-full bg-white text-black font-semibold py-2.5 rounded-lg text-[11px] hover:bg-white/90 transition-all flex justify-center items-center gap-2 nodrag shadow-[0_0_15px_rgba(255,255,255,0.3)]"
          disabled={data.isGenerating}
        >
          {data.isGenerating ? "Executing..." : "Run Node"}
        </button>

        {data.output && (
          <div className="mt-2 flex flex-col gap-1 nodrag cursor-default">
            <div className="flex items-center justify-between cursor-pointer group" onClick={() => setIsCollapsed(!isCollapsed)}>
              <span className="text-[10px] text-white/50 uppercase tracking-wider group-hover:text-white/80 transition-colors">Output Result</span>
              {isCollapsed ? <ChevronRight size={12} className="text-white/50" /> : <ChevronDown size={12} className="text-white/50" />}
            </div>
            {!isCollapsed && (
              <div className="p-3 bg-black/40 border border-white/5 rounded-lg text-xs text-white/90 whitespace-pre-wrap shadow-inner">
                {data.output}
              </div>
            )}
          </div>
        )}

        <div className="relative flex justify-end items-center h-4 mt-1">
          <div className="text-[10px] text-krea-text-muted uppercase mr-2">Output Result</div>
          <Handle type="source" id="output" position={Position.Right} style={{ right: "-8px" }} className="w-3! h-3! border-0! bg-white! shadow-[0_0_12px_rgba(255,255,255,0.9)]! ring-2! ring-black/50!" />
        </div>

      </div>
    </div>
  );
}
export default memo(LLMNode);
