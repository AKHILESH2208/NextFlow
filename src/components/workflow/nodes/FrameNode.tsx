import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { ScissorsIcon, X, Play } from 'lucide-react';
import { useWorkflowStore } from '@/store/workflowStore';
import { useWorkflowExecution } from '@/hooks/useWorkflowExecution';

function FrameNode({ id, data }: { id: string; data: any }) {
  const deleteNode = useWorkflowStore((state) => state.deleteNode);
  const updateNodeData = useWorkflowStore((state) => state.updateNodeData);
  const edges = useWorkflowStore((state) => state.edges);
  const { executeSingleNode } = useWorkflowExecution();

// Remove unused hasVideoConnection variable
  const hasTimestampConnection = edges.some(e => e.target === id && e.targetHandle === "timestamp");

  return (
    <div className={`w-56 bg-[#0f0f0f] text-white border rounded-xl shadow-[0_0_30px_rgba(0,0,0,1)] p-0 font-sans transition-all duration-300 ${data.isGenerating ? "border-purple-500 ring-2 ring-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.4)]" : "border-white/10 hover:border-white/20"}`}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent">
        <div className="flex items-center gap-2">
          <ScissorsIcon size={14} className="text-white/40" />
          <span className="font-medium text-[11px] tracking-wide text-white/80 uppercase">Extract Frame</span>
        </div>
        <button onClick={() => deleteNode(id)} className="text-krea-text-muted hover:text-white transition-colors">
          <X size={14} />
        </button>
      </div>
      <div className="p-3 flex flex-col gap-3 relative">
        <div className="relative flex items-center h-4">
          <Handle type="target" id="video_url" position={Position.Left} style={{ left: "-8px" }} className="w-3! h-3! border-0! bg-white! shadow-[0_0_12px_rgba(255,255,255,0.9)]! ring-2! ring-black/50!" />
          <span className="text-[10px] text-krea-text-muted uppercase ml-1">Video URL *</span>
        </div>

        <div className="relative">
          <Handle type="target" id="timestamp" position={Position.Left} style={{ left: "-8px" }} className="w-3! h-3! border-0! bg-white! shadow-[0_0_12px_rgba(255,255,255,0.9)]! ring-2! ring-black/50!" />
          <label className="flex flex-col text-[10px] text-krea-text-muted gap-1 ml-1">
            Timestamp (sec or %)
            <input 
              type="text" 
              value={data.timestamp ?? "0"} 
              onChange={(e) => updateNodeData(id, { timestamp: e.target.value })}
              disabled={hasTimestampConnection}
              className={`nodrag bg-krea-bg border border-white/10 rounded px-2 py-1 text-xs text-krea-text outline-none ${hasTimestampConnection ? 'opacity-50 cursor-not-allowed' : 'focus:border-white/10-hover'}`}
            />
          </label>
        </div>
        <button 
          onClick={() => executeSingleNode(id)}
          disabled={data.isGenerating}
          className="w-full bg-[#1a1a1a] hover:bg-[#333] border border-white/10 text-krea-text font-medium py-1.5 rounded-md text-[10px] uppercase tracking-wider transition-colors flex justify-center items-center gap-2 nodrag disabled:opacity-50"
        >
          <Play size={10} />
          {data.isGenerating ? "Executing..." : "Run Node"}
        </button>
        {data.output && (
          <div className="mt-2 flex flex-col gap-1 nodrag cursor-default">
            <span className="text-[10px] text-white/50 uppercase tracking-wider">Output</span>
            <div className="relative w-full aspect-square bg-[#111] rounded-lg overflow-hidden border border-white/10 group/output">
              <img src={data.output} alt="Extracted Frame" className="w-full h-full object-contain" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/output:opacity-100 flex items-center justify-center transition-opacity">
                <a href={data.output} download="frame_result.jpg" className="text-[10px] bg-white/20 hover:bg-white/40 text-white px-3 py-1.5 rounded-full backdrop-blur-md shadow-lg">Download Image</a>
              </div>
            </div>
          </div>
        )}
      </div>

      <Handle type="source" id="output" position={Position.Right} className="w-3! h-3! border-0! bg-white! shadow-[0_0_12px_rgba(255,255,255,0.8)]! ring-2! ring-black/50!" style={{ right: "-8px", top: '50%' }} />
    </div>
  );
}
export default memo(FrameNode);
