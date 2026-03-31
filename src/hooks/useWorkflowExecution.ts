import { useWorkflowStore } from '@/store/workflowStore';
import { Node } from '@xyflow/react';
import { v4 as uuidv4 } from 'uuid';

export function useWorkflowExecution() {
  const nodes = useWorkflowStore(s => s.nodes);
  const edges = useWorkflowStore(s => s.edges);
  const updateNodeData = useWorkflowStore(s => s.updateNodeData);
  const addHistoryEntry = useWorkflowStore(s => s.addHistoryEntry);
  const updateHistoryEntry = useWorkflowStore(s => s.updateHistoryEntry);

  const executeFullWorkflow = async () => {
    const runId = uuidv4();
    const runTimestamp = Date.now();
    const runType = 'Full Workflow';
    const executionResults: Record<string, any> = {};
    const executionPromises: Record<string, Promise<any> | undefined> = {};
    const visiting = new Set<string>();

    const executeNodeWithDeps = async (nodeId: string): Promise<any> => {
      // Return cached promise if already running/completed, ensures single execution
      const cachedPromise = executionPromises[nodeId];
      if (cachedPromise) {
        return cachedPromise;
      }

      // Cycle detection preventing infinite loop execution
      if (visiting.has(nodeId)) {
        throw new Error(`Execution cycle detected at node: ${nodeId}`);
      }
      visiting.add(nodeId);

      const node = nodes.find(n => n.id === nodeId);
      if (!node) {
        visiting.delete(nodeId);
        return null;
      }

      // Create the execution promise structure mapping dependencies natively
      const promise = (async () => {
        const incomingEdges = edges.filter(e => e.target === nodeId);
        
        // Wait for all immediate dependencies first
        // Optimization: true recursive execution natively waits for direct parallel paths efficiently!
        if (incomingEdges.length > 0) {
          const depPromises = incomingEdges.map(e => executeNodeWithDeps(e.source));
          await Promise.all(depPromises);
        }

        updateNodeData(nodeId, { isGenerating: true });
        
        const historyId = uuidv4();
        addHistoryEntry({
          id: historyId,
          runId,
          runType,
          runTimestamp,
          nodeId: node.id,
          nodeType: node.type || 'unknown',
          status: 'running',
          timestamp: Date.now()
        } as any);
        
        try {
          const result = await executeNode(node, executionResults);
          executionResults[nodeId] = result;
          
          if (result && result.output) {
            updateNodeData(nodeId, { output: result.output });
          }
          
          updateHistoryEntry(historyId, { 
            status: 'success', 
            output: typeof result.output === 'string' ? result.output : JSON.stringify(result.output) 
          });
          
          return result;
        } catch(e: any) {
          console.error("Node execution failed", nodeId, e);
          updateHistoryEntry(historyId, { status: 'error', error: e.message || 'Execution failed' });
          throw e;
        } finally {
          updateNodeData(nodeId, { isGenerating: false });
          visiting.delete(nodeId); // Free from current path stack traversal
        }
      })();

      executionPromises[nodeId] = promise;
      return promise;
    };

    try {
      // Mapping across map forces isolated disconnected branches to execute 
      await Promise.all(nodes.map(n => executeNodeWithDeps(n.id)));
    } catch (err) {
      console.error("Workflow Execution aborting due to error:", err);
    }
  };

  const executeNode = async (node: Node, previousResults: Record<string, any>) => {
    const incomingEdges = edges.filter(e => e.target === node.id);
    
    const getInputValue = (handleId: string, manualValue: any) => {
      const edge = incomingEdges.find(e => e.targetHandle === handleId);
      if (edge) {
         const sourceNode = nodes.find(n => n.id === edge.source);
         if (sourceNode?.type === 'textNode') return sourceNode.data.text;
         if (sourceNode?.type === 'imageNode') return sourceNode.data.url;
         if (sourceNode?.type === 'videoNode') return sourceNode.data.url;
         return previousResults[edge.source]?.output || sourceNode?.data?.output;
      }
      return manualValue;
    };

    if (node.type === 'llmNode') {
      const system_prompt = getInputValue('system_prompt', node.data.systemPrompt);
      const user_message = getInputValue('user_message', node.data.userMessage);
      
      const imageEdges = incomingEdges.filter(e => e.targetHandle === 'images');
      const images: string[] = [];
      for (const e of imageEdges) {
         const sourceNode = nodes.find(n => n.id === e.source);
         if ((sourceNode?.type === 'imageNode' || sourceNode?.type === 'videoNode') && typeof sourceNode.data.url === 'string') {
             images.push(sourceNode.data.url);
         }
         else if (typeof previousResults[e.source]?.output === 'string') {
             images.push(previousResults[e.source].output);
         }
      }

      const res = await fetch('/api/run-llm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ systemPrompt: system_prompt, userMessage: user_message, images, model: node.data.model })
      });
      const data = await res.json();
      
      let finalOutput = data.text;
      if (data.id) {
        while (true) {
          const pollRes = await fetch(`/api/run-status?id=${data.id}`, { cache: 'no-store' });
          const pollData = await pollRes.json();
          if (pollData.status === 'COMPLETED') {
            finalOutput = pollData.output?.text;
            break;
          }
          if (pollData.status === 'FAILED' || pollData.status === 'CRASHED' || pollData.status === 'CANCELED') {
            throw new Error('LLM task failed or crashed');
          }
          await new Promise(r => setTimeout(r, 1000));
        }
      }
      
      return { output: finalOutput };
    }

    if (node.type === 'cropNode') {
       const url = getInputValue('image_url', node.data.image_url);
       const res = await fetch('/api/run-crop', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ 
            imageUrl: url,
            x: getInputValue('x_percent', node.data.x_percent),
            y: getInputValue('y_percent', node.data.y_percent),
            width: getInputValue('width_percent', node.data.width_percent),
            height: getInputValue('height_percent', node.data.height_percent),
         })
       });
       const data = await res.json();
       
       let finalOutput = data.url;
       if (data.id) {
         while (true) {
           const pollRes = await fetch(`/api/run-status?id=${data.id}`, { cache: 'no-store' });
           const pollData = await pollRes.json();
           if (pollData.status === 'COMPLETED') {
             finalOutput = pollData.output?.url;
             break;
           }
           if (pollData.status === 'FAILED' || pollData.status === 'CRASHED' || pollData.status === 'CANCELED') {
             throw new Error('Crop task failed or crashed');
           }
           await new Promise(r => setTimeout(r, 1000));
         }
       }
       
       return { output: finalOutput }; 
    }

    if (node.type === 'frameNode') {
       const url = getInputValue('video_url', node.data.video_url);
       const res = await fetch('/api/run-frame', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ 
            videoUrl: url,
            timestamp: getInputValue('timestamp', node.data.timestamp)
         })
       });
       const data = await res.json();
       
       let finalOutput = data.url;
       if (data.id) {
         while (true) {
           const pollRes = await fetch(`/api/run-status?id=${data.id}`, { cache: 'no-store' });
           const pollData = await pollRes.json();
           if (pollData.status === 'COMPLETED') {
             finalOutput = pollData.output?.url;
             break;
           }
           if (pollData.status === 'FAILED' || pollData.status === 'CRASHED' || pollData.status === 'CANCELED') {
             throw new Error('Frame task failed or crashed');
           }
           await new Promise(r => setTimeout(r, 1000));
         }
       }
       
       return { output: finalOutput }; 
    }

    if (node.type === 'textNode') return { output: node.data.text };
    if (node.type === 'imageNode') return { output: node.data.url };
    if (node.type === 'videoNode') return { output: node.data.url };

    return {};
  };

  const executeSingleNode = async (nodeId: string) => {
    const runId = uuidv4();
    const runTimestamp = Date.now();
    const runType = 'Single Node';
    const executionResults: Record<string, any> = {};
    const executionPromises: Record<string, Promise<any> | undefined> = {};
    const visiting = new Set<string>();

    const executeNodeWithDeps = async (id: string): Promise<any> => {
      const cachedPromise = executionPromises[id];
      if (cachedPromise) return cachedPromise;

      if (visiting.has(id)) throw new Error(`Execution cycle detected at node: ${id}`);
      visiting.add(id);

      const node = nodes.find(n => n.id === id);
      if (!node) { visiting.delete(id); return null; }

      const promise = (async () => {
        const incomingEdges = edges.filter(e => e.target === id);
        if (incomingEdges.length > 0) {
          await Promise.all(incomingEdges.map(e => executeNodeWithDeps(e.source)));
        }

        updateNodeData(id, { isGenerating: true });
        const historyId = uuidv4();
        addHistoryEntry({ id: historyId, runId, runType, runTimestamp, nodeId: node.id, nodeType: node.type || 'unknown', status: 'running', timestamp: Date.now() });
        
        try {
          const result = await executeNode(node, executionResults);
          executionResults[id] = result;
          if (result && result.output) updateNodeData(id, { output: result.output });
          updateHistoryEntry(historyId, { status: 'success', output: typeof result?.output === 'string' ? result.output : JSON.stringify(result?.output) });
          return result;
        } catch(e: any) {
          console.error("Node execution failed", id, e);
          updateHistoryEntry(historyId, { status: 'error', error: e.message || 'Execution failed' });
          throw e;
        } finally {
          updateNodeData(id, { isGenerating: false });
          visiting.delete(id);
        }
      })();

      executionPromises[id] = promise;
      return promise;
    };

    try {
      await executeNodeWithDeps(nodeId);
    } catch (err) {
      console.error("Single Node execution aborting due to error:", err);
    }
  };

  return { executeFullWorkflow, executeSingleNode };
}
