import React, { memo, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Handle, Position } from '@xyflow/react';
import { ImageIcon, X , Play, RefreshCw } from 'lucide-react';
import { useWorkflowStore } from '@/store/workflowStore';
import { useWorkflowExecution } from '@/hooks/useWorkflowExecution';
import Uppy from '@uppy/core';
import Transloadit from '@uppy/transloadit';
// @ts-ignore
import DashboardModal from '@uppy/react/dashboard-modal';

import '@uppy/core/css/style.min.css';
import '@uppy/dashboard/css/style.min.css';

function ImageNode({ id, data }: { id: string; data: any }) {
  const updateNodeData = useWorkflowStore((state) => state.updateNodeData);
  const deleteNode = useWorkflowStore((state) => state.deleteNode);
  const { executeSingleNode } = useWorkflowExecution();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [uppy] = useState(() => new Uppy({
      restrictions: { maxNumberOfFiles: 1, allowedFileTypes: ['image/*'] }
      // @ts-ignore
    }).use(Transloadit, {
      waitForEncoding: true,
      assemblyOptions: {
        params: {
          auth: { key: process.env.NEXT_PUBLIC_TRANSLOADIT_KEY || 'dummy_key' },
          template_id: process.env.NEXT_PUBLIC_TRANSLOADIT_TEMPLATE_ID || 'dummy_template'
        }
      }
    }).on('transloadit:complete', (assembly: any) => {
       const result = assembly.results?.[':original']?.[0] || assembly.results?.[Object.keys(assembly.results)[0]]?.[0];
       if (result && result.ssl_url) {
         updateNodeData(id, { url: result.ssl_url });
         setIsOpen(false);
       }
    })
  );

  return (
    <div className="w-80 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.8)] p-0 font-sans group hover:border-white/20 transition-all duration-300">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent">
        <div className="flex items-center gap-2">
          <ImageIcon size={14} className="text-white/40" />
          <span className="font-medium text-[11px] tracking-wide text-white/80 uppercase">Image</span>
        </div>
        <button onClick={() => deleteNode(id)} className="text-krea-text-muted hover:text-white transition-colors">
          <X size={14} />
        </button>
      </div>
      <div className="p-5 flex flex-col gap-4 relative">
        <label className="nodrag border border-dashed border-white/20 hover:border-white/40 bg-black/20 hover:bg-white/5 rounded-lg h-32 flex flex-col items-center justify-center cursor-pointer transition-colors text-krea-text-muted text-[10px] uppercase font-medium tracking-wide relative overflow-hidden">
          {data.url ? (
            <>
              <img src={data.url} alt="Uploaded" className="absolute inset-0 w-full h-full object-cover" />
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsOpen(true); }}
                className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white p-1.5 rounded-md backdrop-blur-md transition-colors opacity-0 group-hover:opacity-100"
                title="Replace Image"
              >
                <RefreshCw size={14} />
              </button>
            </>
          ) : (
            <>
              <div 
                className="w-full h-full flex flex-col items-center justify-center p-4"
                onClick={(e) => { e.preventDefault(); setIsOpen(true); }}
              >
                <span>+ Upload Image</span>
              </div>
            </>
          )}
        </label>
        {isOpen && mounted && createPortal(
          <div className="fixed inset-0 z-[999999] flex items-center justify-center pointer-events-auto" style={{ zIndex: 999999 }}>
            <div className="absolute inset-0 bg-black/50" onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}></div>
            <div className="relative z-10 w-[800px] max-w-[90vw]" onClick={e => e.stopPropagation()}>
              <DashboardModal 
                uppy={uppy}
                open={isOpen}
                onRequestClose={() => setIsOpen(false)}
                proudlyDisplayPoweredByUppy={false}
              />
            </div>
          </div>,
          document.body
        )}
        <button 
          onClick={() => executeSingleNode(id)}
          className="mt-4 w-full bg-white/10 hover:bg-white text-white hover:text-black font-medium py-2.5 rounded-lg text-[11px] transition-all flex justify-center items-center gap-2 nodrag shadow-sm"
        >
          <Play size={10} className="fill-current" /> Run Node
        </button>
      </div>
      <Handle type="source" position={Position.Right} id="image_out" style={{ right: "-8px" }} className="w-3! h-3! border-0! bg-white! shadow-[0_0_12px_rgba(255,255,255,0.9)]! ring-2! ring-black/50!" />
    </div>
  );
}
export default memo(ImageNode);
