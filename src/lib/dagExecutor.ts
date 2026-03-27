import { Node, Edge } from '@xyflow/react';

// Build adjacency list for execution order (DAG topological sort requirement)
export function buildAdjacencyList(nodes: Node[], edges: Edge[]) {
  const adjList: Record<string, string[]> = {};
  const inDegree: Record<string, number> = {};

  nodes.forEach((n) => {
    adjList[n.id] = [];
    inDegree[n.id] = 0;
  });

  edges.forEach((e) => {
    if (adjList[e.source] && inDegree[e.target] !== undefined) {
      adjList[e.source].push(e.target);
      inDegree[e.target]++;
    }
  });

  return { adjList, inDegree };
}
