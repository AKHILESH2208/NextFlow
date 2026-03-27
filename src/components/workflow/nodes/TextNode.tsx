import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { TypeIcon, X , Play} from 'lucide-react';
import { useWorkflowStore } from '@/store/workflowStore';
import { useWorkflowExecution } from '@/hooks/useWorkflowExecution';

function TextNode({ id, data }: { id: string; data: any }) {
  const updateNodeData = useWorkflowStore((state) => state.updateNodeData);
  const deleteNode = useWorkflowStore((state) => state.deleteNode);
  const { executeSingleNode } = useWorkflowExecution();

  return (
    <div className="w-80 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.8)] p-0 font-sans group hover:border-white/20 transition-all duration-300">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent">
        <div className="flex items-center gap-2">
          <TypeIcon size={14} className="text-white/40" />
          <span className="font-medium text-[11px] tracking-wide text-white/80 uppercase">Text</span>
        </div>
        <button onClick={() => deleteNode(id)} className="text-krea-text-muted hover:text-white transition-colors">
          <X size={14} />
        </button>
      </div>
      <div className="p-5 space-y-4">
        <textarea 
          className="nodrag w-full bg-black/40 border border-white/5 rounded-lg p-3 text-xs text-white/90 placeholder-white/20 outline-none focus:border-white/20 focus:ring-1 focus:ring-white/10 transition-all resize-none shadow-inner" 
          defaultValue={data.text || ""}
          onChange={(e) => updateNodeData(id, { text: e.target.value })}
          placeholder="Enter text..." 
          rows={3}
        />
        <button 
          onClick={() => executeSingleNode(id)}
          className="mt-4 w-full bg-white/10 hover:bg-white text-white hover:text-black font-medium py-2.5 rounded-lg text-[11px] transition-all flex justify-center items-center gap-2 nodrag shadow-sm"
        >
          <Play size={10} className="fill-current" /> Run Node
        </button>
      </div>
      <Handle type="source" position={Position.Right} id="text_out" style={{ right: "-8px" }} style={{ right: "-8px" }} className="w-3! h-3! border-0! bg-white! shadow-[0_0_12px_rgba(255,255,255,0.8)]! ring-2! ring-black/50!" />
    </div>
  );
}
export default memo(TextNode);
