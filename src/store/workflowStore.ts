import { create } from 'zustand';
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
} from '@xyflow/react';
import { v4 as uuidv4 } from 'uuid';

export type LogEntry = {
  id: string;
  runId: string;
  runType: 'Full Workflow' | 'Single Node' | 'Selected Nodes';
  runTimestamp: number;
  nodeId: string;
  nodeType: string;
  status: 'running' | 'success' | 'error';
  timestamp: number;
  output?: string;
  error?: string;
  duration?: number;
};

export type WorkflowState = {
  workflowId: string | null;
  setWorkflowId: (id: string | null) => void;
 
  nodes: Node[];
  edges: Edge[];
  history: LogEntry[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  addNode: (type: string, position?: { x: number; y: number }) => void;
  updateNodeData: (id: string, data: any) => void;
  getConnectedIncomingEdges: (nodeId: string) => Edge[];
  getNode: (id: string) => Node | undefined;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  deleteNode: (id: string) => void;
  deleteEdge: (id: string) => void;
  addHistoryEntry: (entry: LogEntry) => void;
  updateHistoryEntry: (id: string, updates: Partial<LogEntry>) => void;
  clearHistory: () => void;
};

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  workflowId: null,
  setWorkflowId: (id) => set({ workflowId: id }),
 
  nodes: [],
  edges: [],
  history: [],
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection: Connection) => {
    const { nodes, edges } = get();
    
    // 1. DAG Cycle Check
    const isCycle = (sourceId: string, targetId: string): boolean => {
      if (sourceId === targetId) return true;
      const connectedTargets = edges
        .filter((e) => e.source === targetId)
        .map((e) => e.target);
      return connectedTargets.some((id) => isCycle(sourceId, id));
    };

    if (isCycle(connection.source, connection.target)) {
      alert("Cycle detected! Circular loops are not allowed.");
      return;
    }

    // 2. Type-Safe connections
    const sourceNode = nodes.find((n) => n.id === connection.source);
    const targetNode = nodes.find((n) => n.id === connection.target);

    if (sourceNode && targetNode) {
      const sourceType = sourceNode.type;
      const targetHandle = connection.targetHandle;

      // Group node types by output data type
      const isTextOutput = sourceType === 'textNode' || sourceType === 'llmNode';
      const isImageOutput = sourceType === 'imageNode' || sourceType === 'cropNode' || sourceType === 'frameNode';
      const isVideoOutput = sourceType === 'videoNode';

      // Type validation per target handle
      if (targetHandle === 'system_prompt' || targetHandle === 'user_message') {
        if (!isTextOutput && sourceType !== 'text') {
           alert("Warning: This input expects text data.");
           return;
        }
      }

      if (targetHandle === 'images') {
        if (!isImageOutput && sourceType !== 'image') {
           alert("Warning: This input expects an image.");
           return;
        }
      }

      if (targetHandle === 'image_url') {
        if (!isImageOutput && sourceType !== 'image') {
           alert("Error: Crop expects an image URL.");
           return;
        }
      }

      if (targetHandle === 'video_url') {
        if (!isVideoOutput && sourceType !== 'video') {
           alert("Error: Frame extraction expects a video URL.");
           return;
        }
      }

      // Prevent multiple incoming connections to the same handle unless it allows arrays (like 'images')
      if (targetHandle !== 'images') {
        const existingIncoming = edges.find(
          (e) => e.target === connection.target && e.targetHandle === connection.targetHandle
        );
        if (existingIncoming) {
          alert("This handle already has an incoming connection.");
          return;
        }
      }
    }

    set({
      edges: addEdge(
        {
          ...connection,
          type: 'deletable', // Use our custom edge
          animated: true,
          style: { stroke: '#a78bfa', strokeWidth: 2 },
        },
        get().edges
      ),
    });
  },
  addNode: (type: string, position = { x: 250, y: 250 }) => {
    const newNode: Node = {
      id: `${type}-${uuidv4()}`,
      type,
      position,
      data: { label: `${type} node` },
    };
    set({ nodes: [...get().nodes, newNode] });
  },
  updateNodeData: (id: string, newData: any) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === id) {
          return { ...node, data: { ...node.data, ...newData } };
        }
        return node;
      }),
    });
  },
  getNode: (id: string) => {
    return get().nodes.find(n => n.id === id);
  },
  getConnectedIncomingEdges: (nodeId: string) => {
    return get().edges.filter(e => e.target === nodeId);
  },
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  deleteNode: (id: string) => {
    set({
      nodes: get().nodes.filter((node) => node.id !== id),
      edges: get().edges.filter((edge) => edge.source !== id && edge.target !== id),
    });
  },
  deleteEdge: (id: string) => {
    set({
      edges: get().edges.filter((edge) => edge.id !== id),
    });
  },
  addHistoryEntry: (entry) => {
    set({ history: [entry, ...get().history] });
  },
  updateHistoryEntry: (id, updates) => {
    set({
      history: get().history.map(item => 
        item.id === id ? { ...item, ...updates } : item
      )
    });
  },
  clearHistory: () => {
    set({ history: [] });
  }
}));
