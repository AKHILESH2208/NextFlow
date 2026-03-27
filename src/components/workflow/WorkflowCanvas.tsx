"use client";

import React, { useRef, useCallback } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  ReactFlowProvider,
  useReactFlow,
  Connection,
  Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

// Our Custom Nodes
import TextNode from "@/components/workflow/nodes/TextNode";
import ImageNode from "@/components/workflow/nodes/ImageNode";
import VideoNode from "@/components/workflow/nodes/VideoNode";
import LLMNode from "@/components/workflow/nodes/LLMNode";
import CropNode from "@/components/workflow/nodes/CropNode";
import FrameNode from "@/components/workflow/nodes/FrameNode";
import DeletableEdge from "@/components/workflow/edges/DeletableEdge";

import { useWorkflowStore } from "../../store/workflowStore";

const nodeTypes = { textNode: TextNode, text: TextNode, imageNode: ImageNode, upload_image: ImageNode, videoNode: VideoNode, upload_video: VideoNode, llmNode: LLMNode, llm: LLMNode, cropNode: CropNode, crop_image: CropNode, frameNode: FrameNode, extract_frame: FrameNode };

const edgeTypes = {
  deletable: DeletableEdge,
};

function Flow() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode } = useWorkflowStore();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { screenToFlowPosition } = useReactFlow();

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const isValidConnection = useCallback(
    (connection: Connection | Edge) => {
      const sourceNode = nodes.find((n) => n.id === connection.source);
      const targetNode = nodes.find((n) => n.id === connection.target);

      if (!sourceNode || !targetNode) return false;
      if (sourceNode.id === targetNode.id) return false;

      const sourceType = sourceNode.type || "";
      const targetType = targetNode.type || "";
      const targetHandle = connection.targetHandle;

      const isTextSource = ["textNode", "text", "llmNode", "llm"].includes(sourceType);
      const isImageSource = ["imageNode", "upload_image", "cropNode", "crop_image", "frameNode", "extract_frame"].includes(sourceType);
      const isVideoSource = ["videoNode", "upload_video"].includes(sourceType);

      if (["llmNode", "llm"].includes(targetType)) {
        if (targetHandle === "system_prompt" || targetHandle === "user_message") return isTextSource;
        if (targetHandle === "images") return isImageSource || isVideoSource;
      }

      if (["cropNode", "crop_image"].includes(targetType)) {
        if (targetHandle === "image_url") return isImageSource;
        return isTextSource; // coordinates like x, y, width, height must be text
      }

      if (["frameNode", "extract_frame"].includes(targetType)) {
        return isVideoSource;
      }

      return true;
    },
    [nodes]
  );

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      addNode(type, position);
    },
    [screenToFlowPosition, addNode]
  );

  return (
    <div className="w-full h-full bg-krea-bg" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onDragOver={onDragOver}
        onDrop={onDrop}
        isValidConnection={isValidConnection}
        deleteKeyCode={["Backspace", "Delete"]}
        fitView
      >
        <Controls showInteractive={false} />
        <MiniMap 
          nodeColor={(n) => {
            if (n.type === 'llmNode') return '#8b5cf6';
            return '#333';
          }}
          maskColor="#111"
          style={{ backgroundColor: '#0a0a0a', border: '1px solid #232323' }}
        />
        <Background variant={BackgroundVariant.Dots} gap={32} size={1} color="rgba(255,255,255,0.25)" />
      </ReactFlow>
    </div>
  );
}

export default function WorkflowCanvas() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}
