import React from 'react';
import { BaseEdge, EdgeLabelRenderer, getBezierPath, EdgeProps } from '@xyflow/react';
import { useWorkflowStore } from '@/store/workflowStore';
import { X } from 'lucide-react';

export default function DeletableEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style,
  markerEnd,
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const deleteEdge = useWorkflowStore((state) => state.deleteEdge);

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
          }}
          className="nodrag nopan"
        >
          <button
            className="w-5 h-5 flex items-center justify-center bg-zinc-800 border border-zinc-600 rounded-full text-zinc-400 hover:text-white hover:bg-red-500 transition-colors cursor-pointer"
            onClick={(event) => {
              event.stopPropagation();
              deleteEdge(id);
            }}
          >
            <X size={12} strokeWidth={2.5} />
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
