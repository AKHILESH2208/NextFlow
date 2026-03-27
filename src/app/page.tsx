import Link from 'next/link';
import { Sparkles, ArrowRight, Wand2, Layers, Cpu, Play, Search, ChevronLeft, ChevronRight, Menu, Image as ImageIcon, LayoutGrid, MonitorPlay, Crop, Aperture } from 'lucide-react';
import { SignInButton, Show, UserButton } from "@clerk/nextjs";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0E0E0E] text-white flex overflow-x-hidden font-sans">
      
      {/* Krea Style App Left Sidebar */}
      <aside className="w-[60px] flex-col items-center py-4 border-r border-[#222] bg-[#0E0E0E] hidden md:flex z-50 fixed h-full left-0 top-0">
        <Link href="/" className="w-8 h-8 rounded-lg bg-white flex items-center justify-center mb-8 shadow-sm">
           <Layers className="w-5 h-5 text-black" />
        </Link>
        <div className="flex flex-col gap-6 text-white w-full items-center">
            <Link href="/" className="p-2 rounded-xl bg-white/10 text-white"><LayoutGrid size={22} strokeWidth={1.5} /></Link>
            <Link href="/canvas" className="p-2 hover:bg-white/5 rounded-xl transition-colors" title="Image"><ImageIcon size={22} strokeWidth={1.5} className="text-white/60" /></Link>
            <Link href="/canvas" className="p-2 hover:bg-white/5 rounded-xl transition-colors" title="Video"><MonitorPlay size={22} strokeWidth={1.5} className="text-white/60" /></Link>
            <Link href="/canvas" className="p-2 hover:bg-white/5 rounded-xl transition-colors" title="Crop"><Crop size={22} strokeWidth={1.5} className="text-white/60" /></Link>
            <Link href="/canvas" className="p-2 hover:bg-white/5 rounded-xl transition-colors" title="Capture"><Aperture size={22} strokeWidth={1.5} className="text-white/60" /></Link>
        </div>
      </aside>

      <main className="flex-1 w-full flex flex-col md:pl-[60px] min-h-screen bg-[#0E0E0E]">
        
        {/* Top Header - Auth & Options */}
        <header className="flex justify-end p-4 items-center h-16 shrink-0 border-b border-transparent">
           <div className="flex items-center gap-4 text-sm font-medium">
             <Show when="signed-in">
               <UserButton />
             </Show>
             <Show when="signed-out">
               <SignInButton mode="modal">
                 <button className="text-white/60 hover:text-white transition-colors">Log in</button>
               </SignInButton>
               <SignInButton mode="modal" fallbackRedirectUrl="/projects">
                 <button className="bg-white text-black px-4 py-1.5 rounded-full hover:bg-white/90 transition-colors font-medium">Sign up</button>
               </SignInButton>
             </Show>
           </div>
        </header>

        <div className="flex-1 w-full mx-auto px-6 md:px-12 pb-24 flex flex-col gap-12 max-w-[1400px]">
            
            {/* Hero Big Card (Dark Blue Gradient) */}
            <div className="w-full rounded-3xl bg-gradient-to-br from-[#0c1833] via-[#090b16] to-[#0a0a0a] p-12 md:p-24 flex flex-col items-center justify-center text-center relative overflow-hidden mt-6">
                <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-8 relative z-10">Start by generating a free image</h1>
                <div className="flex items-center gap-4 relative z-10">
                    <Link href="/canvas" className="bg-white text-black px-6 py-3 rounded-full font-medium text-sm flex items-center gap-2 hover:scale-[1.02] transition-transform">
                        Generate Image <ArrowRight size={16} />
                    </Link>
                    <Link href="/canvas" className="bg-white/10 text-white px-6 py-3 rounded-full font-medium text-sm flex items-center gap-2 hover:bg-white/20 transition-colors border border-white/10">
                        Generate Video <ArrowRight size={16} />
                    </Link>
                </div>
            </div>

            {/* Video Cards Grid (4 panels) */}
            <div className="relative mt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
                  {/* Card 1 */}
                  <Link href="/canvas" className="group cursor-pointer flex flex-col gap-3">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#151515] border border-white/5 transition-all">
                        <div className="absolute -top-3 -left-3 bg-blue-600 rounded-lg px-4 py-2 text-xs font-medium flex items-center gap-2 z-20 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="w-2 h-2 rounded-full bg-white"></span> Click here to open the image tool
                        </div>
                        <video src="https://s.krea.ai/01%20-%20Image%20Tool_Edited_2.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover transform scale-100" />
                    </div>
                    <h3 className="text-[15px] font-medium text-white/90">Generate Image</h3>
                  </Link>

                  {/* Card 2 */}
                  <Link href="/canvas" className="group cursor-pointer flex flex-col gap-3">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#151515] border border-white/5 transition-all">
                        <video src="https://s.krea.ai/02%20-%20Video%20Tool_Edited_2.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover transform scale-100" />
                    </div>
                    <h3 className="text-[15px] font-medium text-white/90">Generate Video</h3>
                  </Link>

                  {/* Card 3 */}
                  <Link href="/canvas" className="group cursor-pointer flex flex-col gap-3">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#151515] border border-white/5 transition-all">
                        <video src="https://s.krea.ai/03%20-%20Enhancer_Edited_2.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover transform scale-100 grayscale" />
                    </div>
                    <h3 className="text-[15px] font-medium text-white/90">Upscale & Enhance</h3>
                  </Link>

                  {/* Card 4 */}
                  <Link href="/canvas" className="group cursor-pointer flex flex-col gap-3">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#151515] border border-white/5 transition-all">
                        <video src="https://s.krea.ai/04%20-%20Realtime_1.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover transform scale-100" />
                    </div>
                    <h3 className="text-[15px] font-medium text-white/90">Realtime</h3>
                  </Link>
                  
              </div>
            </div>

            {/* Try Max Banner */}
            <div className="w-full rounded-3xl bg-[#111] border border-white/5 p-10 flex flex-col md:flex-row items-center justify-between overflow-hidden relative mt-8">
                <div className="flex flex-col gap-3 relative z-10 w-full md:w-1/3">
                   <p className="font-medium text-[15px] text-white/90">Upscale images & videos to <span className="text-white/50">22K</span></p>
                   <p className="font-medium text-[15px] text-white/90">Lora fine-tuning</p>
                   <p className="font-medium text-[15px] text-white/90">Access all 150+ models</p>
                   <p className="font-medium text-[15px] text-white/90">Ultra fast & no throttling</p>
                </div>
                <div className="flex items-center gap-4 relative z-10 w-full md:w-1/3 justify-center py-6 md:py-0">
                   <span className="text-6xl font-bold tracking-tight">Try</span>
                   <span className="text-6xl font-bold tracking-tight text-blue-400 drop-shadow-[0_0_15px_rgba(96,165,250,0.4)]">Max</span>
                </div>
                {/* Images/Icons graphic on the right mocked with color blocks */}
                <div className="w-full md:w-1/3 flex items-center justify-end relative z-10">
                  <div className="flex -space-x-8">
                     <div className="w-24 h-24 bg-[#145bf8] rounded-3xl transform -rotate-[15deg] border border-white/20 shadow-2xl flex items-center justify-center"><Layers size={32} className="text-white"/></div>
                     <div className="w-24 h-24 bg-[#1a1a1a] rounded-3xl transform -rotate-[5deg] border border-white/20 shadow-2xl z-10 flex items-center justify-center"><Sparkles size={32} className="text-white"/></div>
                     <div className="w-24 h-24 bg-[#eab308] rounded-3xl transform rotate-[5deg] border border-white/20 shadow-2xl z-20 flex items-center justify-center"><div className="w-8 h-8 rounded-full bg-red-500 opacity-80 mix-blend-multiply"></div><div className="w-8 h-8 rounded-full bg-blue-500 opacity-80 mix-blend-multiply -ml-4"></div></div>
                  </div>
                </div>
            </div>

            {/* Explore image models */}
            <div className="flex flex-col gap-6 mt-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-[22px] font-medium flex items-center gap-3">Explore image models <span className="p-1.5 rounded-full bg-white/5 text-white/50 hover:bg-white/10 cursor-pointer"><Search size={16}/></span></h2>
                    <div className="flex gap-2">
                      <button className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 transition-colors"><ChevronLeft size={18}/></button>
                      <button className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 transition-colors"><ChevronRight size={18}/></button>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {/* Model Card 1 */}
                    <div className="rounded-2xl bg-[#151515] border border-white/5 overflow-hidden flex flex-col h-[320px] relative group cursor-pointer">
                        <div className="h-full w-full relative">
                           <img src="https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover transition-opacity" alt="model" />
                        </div>
                        <div className="absolute top-4 left-4 bg-white/90 text-black text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                            <span className="w-3 h-3 block border border-black rounded-sm"></span> Featured
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                            <h3 className="text-xl font-medium tracking-tight mb-2">Nano Banana Pro</h3>
                            <p className="text-[13px] text-white/60 leading-relaxed mb-4 line-clamp-2">Smartest model. World's best prompt adherence. Best model for complex tasks and image editing.</p>
                            <div className="flex justify-between items-center text-sm text-white/50 font-medium">
                                <span className="flex text-white"><Wand2 size={14} className="mr-1"/> </span>
                                <span>~100 🔗</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <hr className="border-[#222] my-10" />
            
            {/* Multi-column Footer */}
            <footer className="grid grid-cols-2 md:grid-cols-5 gap-8 text-[13px] pt-4 pb-12 w-full text-white/60 font-medium">
                <div className="flex flex-col gap-4">
                   <h4 className="text-white font-semibold mb-1">Krea</h4>
                   <Link href="#" className="hover:text-white transition-colors">Log In</Link>
                </div>
            </footer>
        </div>
      </main>
    </div>
  );
}
