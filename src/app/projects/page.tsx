"use client";

import { useUser, RedirectToSignIn } from "@clerk/nextjs";
import { Show } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Clock, FileDown, MoreHorizontal, ArrowLeft } from "lucide-react";

export default function ProjectsPage() {
  const { user, isLoaded } = useUser();
  const [workflows, setWorkflows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWorkflows() {
      try {
        const res = await fetch('/api/workflows');
        if (res.ok) {
          const data = await res.json();
          setWorkflows(data.workflows);
        }
      } catch (e) {
        console.error("Failed to fetch workflows", e);
      } finally {
        setLoading(false);
      }
    }

    if (isLoaded && user) {
      fetchWorkflows();
    }
  }, [isLoaded, user]);

  if (!isLoaded) return <div className="h-screen w-screen bg-krea-bg text-krea-text flex items-center justify-center">Loading...</div>;

  return (
    <div className="h-screen w-screen bg-krea-bg text-krea-text overflow-auto font-sans p-8">
      <Show when="signed-in">
        <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
                <Link href="/" className="p-2 hover:bg-[#1f1f1f] rounded-lg transition-colors text-[#888] hover:text-white">
                    <ArrowLeft size={20} />
                </Link>
                <h1 className="text-3xl font-semibold tracking-tight">My Projects</h1>
            </div>
            
            <Link href="/canvas" className="bg-krea-text hover:bg-white text-krea-bg font-medium px-4 py-2 rounded-md transition-colors flex items-center gap-2">
              <Plus size={16} />
              New Flow
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-video bg-[#1a1a1a] rounded-xl animate-pulse"></div>
              ))}
            </div>
          ) : workflows.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-20 border border-dashed border-[#333] rounded-2xl bg-[#111]">
              <div className="w-16 h-16 bg-[#1a1a1a] rounded-full flex items-center justify-center mb-4">
                <Plus size={24} className="text-[#888]" />
              </div>
              <h2 className="text-xl font-medium mb-2">No projects yet</h2>
              <p className="text-[#888] text-center max-w-sm mb-6">Create your first workflow to start generating assets and processing media.</p>
              <Link href="/canvas" className="bg-[#2a2a2a] hover:bg-[#333] border border-krea-border transition-colors px-6 py-2 rounded-lg font-medium">
                Create Project
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {workflows.map((workflow) => (
                <div key={workflow._id} className="group relative bg-[#111] hover:bg-[#161616] border border-[#222] hover:border-[#333] transition-all rounded-xl overflow-hidden shadow-sm flex flex-col">
                  {/* Thumbnail Mock */}
                  <Link href={`/canvas?id=${workflow._id}`} className="aspect-video bg-[#151515] relative p-4 flex flex-col">
                    <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:12px_12px]"></div>
                    <div className="mt-auto flex justify-between items-end relative z-10">
                       <span className="bg-black/50 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider">{workflow.nodes?.length || 0} Nodes</span>
                    </div>
                  </Link>
                  
                  <div className="p-4 border-t border-[#222] flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-medium truncate group-hover:text-white transition-colors">{workflow.name}</h3>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-1.5 text-xs text-[#666]">
                        <Clock size={12} />
                        <span>{new Date(workflow.updatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric'})}</span>
                      </div>
                      <button className="text-[#666] hover:text-white p-1 rounded transition-colors opacity-0 group-hover:opacity-100">
                        <MoreHorizontal size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Show>
      <Show when="signed-out">
        <RedirectToSignIn />
      </Show>
    </div>
  );
}
