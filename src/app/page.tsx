import Sidebar from "@/components/Sidebar";
"use client";
import { useRef, useState } from "react";
import Link from 'next/link';
import { 
  Sparkles, ArrowRight, Wand2, Layers, Cpu, Play, Search, ChevronLeft, ChevronRight, Menu, 
  Image as ImageIcon, LayoutGrid, MonitorPlay, Crop, Aperture,
  Home, GitMerge, FolderOpen, Video, Moon, Brush, PenTool, Mic, ScanFace, Box, Film, MoreHorizontal, PanelLeftClose, Pickaxe, User
} from 'lucide-react';
import { SignInButton, Show, UserButton, useUser } from "@clerk/nextjs";

export default function LandingPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showMoreTools, setShowMoreTools] = useState(false);
  const { user } = useUser();
  
  const imageScrollRef = useRef<HTMLDivElement>(null);
  const scrollImage = (dir: "left" | "right") => {
    if (imageScrollRef.current) {
      const scrollAmount = window.innerWidth > 768 ? 400 : 250;
      imageScrollRef.current.scrollBy({ left: dir === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };
  const videoScrollRef = useRef<HTMLDivElement>(null);
  const scrollVideo = (dir: "left" | "right") => {
    if (videoScrollRef.current) {
      const scrollAmount = window.innerWidth > 768 ? 400 : 250;
      videoScrollRef.current.scrollBy({ left: dir === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  return (
    
    <div className="min-h-screen bg-[#0E0E0E] text-white flex overflow-x-hidden font-sans">
      <Sidebar onStateChange={setIsSidebarOpen} />
      

      <main className={`flex-1 w-full flex flex-col min-h-screen bg-[#0E0E0E] transition-all duration-300 ${isSidebarOpen ? 'md:pl-[240px]' : 'md:pl-[68px]'}`}>
        
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

            {/* Try image models */}
            <div className="flex flex-col gap-6 mt-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-[22px] font-medium flex items-center gap-3">
                      Try image models <span className="p-1.5 rounded-full bg-white/5 text-white/50 hover:bg-white/10 cursor-pointer"><Search size={16}/></span>
                    </h2>
                    <div className="flex gap-2">
                      <button onClick={() => scrollImage("left")} className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 z-10 flex items-center justify-center text-white/90 hover:text-white transition-colors cursor-pointer"><ChevronLeft size={18}/></button>
                      <button onClick={() => scrollImage("right")} className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 z-10 flex items-center justify-center text-white/90 hover:text-white transition-colors cursor-pointer"><ChevronRight size={18}/></button>
                    </div>
                </div>
                
                <div ref={imageScrollRef} className="flex overflow-x-auto snap-x snap-mandatory gap-5 pb-4 hide-scrollbar scroll-smooth">
                    {/* Nano Banana Pro */}
                    <div className="shrink-0 w-full md:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] snap-start rounded-2xl bg-[#151515] border border-white/5 overflow-hidden flex flex-col h-[280px] relative group cursor-pointer">
                        <div className="h-full w-full relative">
                           <img src="https://www.krea.ai/api/img?f=webp&i=https%3A%2F%2Fs.krea.ai%2Fan_swirled_gradient_pastel_blue_neon_green_cream_and_pink_coloured_porsche_911_2025_model_facing_si_d54w117r2ortc7hednj3_0.jpeg&s=1024" className="w-full h-full object-cover transition-opacity" alt="Nano Banana Pro" />
                        </div>
                        <div className="absolute top-4 left-4 bg-white/90 text-black text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                            <span className="w-3 h-3 block border border-black rounded-sm"></span> Featured
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                            <h3 className="text-xl font-medium tracking-tight mb-2">Nano Banana Pro</h3>
                            <p className="text-[13px] text-white/60 leading-relaxed mb-4 line-clamp-2">Latest flagship image model with stunning adherence.</p>
                            <div className="flex justify-between items-center text-sm text-white/50 font-medium">
                                <span className="flex text-white">⚡️⚡️⚡️ &nbsp;&nbsp; 💎💎💎</span>
                                <span>~300 🛞</span>
                            </div>
                        </div>
                    </div>

                    {/* Nano Banana 2 */}
                    <div className="shrink-0 w-full md:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] snap-start rounded-2xl bg-[#151515] border border-white/5 overflow-hidden flex flex-col h-[280px] relative group cursor-pointer">
                        <div className="h-full w-full relative">
                           <img src="https://www.krea.ai/api/img?f=webp&i=https%3A%2F%2Fs.krea.ai%2Fnano_banana_2_example_2.jpg&s=1024" className="w-full h-full object-cover transition-opacity" alt="Nano Banana 2" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                            <h3 className="text-xl font-medium tracking-tight mb-2">Nano Banana 2</h3>
                            <p className="text-[13px] text-white/60 leading-relaxed mb-4 line-clamp-2">Prior frontier model, incredibly reliable.</p>
                            <div className="flex justify-between items-center text-sm text-white/50 font-medium">
                                <span className="flex text-white">⚡️⚡️⚡️ &nbsp;&nbsp; 💎💎</span>
                                <span>~150 🛞</span>
                            </div>
                        </div>
                    </div>

                    {/* Recraft v4 */}
                    <div className="shrink-0 w-full md:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] snap-start rounded-2xl bg-[#151515] border border-white/5 overflow-hidden flex flex-col h-[280px] relative group cursor-pointer">
                        <div className="h-full w-full relative">
                           <img src="https://www.krea.ai/api/img?f=webp&i=https%3A%2F%2Fs.krea.ai%2Frecraft_v4_example_1.jpg&s=1024" className="w-full h-full object-cover transition-opacity" alt="Recraft v4" />
                        </div>
                        <div className="absolute top-4 left-4 bg-white/90 text-black text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                            New
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                            <h3 className="text-xl font-medium tracking-tight mb-2">Recraft v4</h3>
                            <p className="text-[13px] text-white/60 leading-relaxed mb-4 line-clamp-2">Exceptional vectors, logos, and illustration rendering.</p>
                            <div className="flex justify-between items-center text-sm text-white/50 font-medium">
                                <span className="flex text-white">⚡️⚡️ &nbsp;&nbsp; 💎💎💎</span>
                                <span>~400 🛞</span>
                            </div>
                        </div>
                    </div>

                    {/* Z image */}
                    <div className="shrink-0 w-full md:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] snap-start rounded-2xl bg-[#151515] border border-white/5 overflow-hidden flex flex-col h-[280px] relative group cursor-pointer">
                        <div className="h-full w-full relative">
                           <img src="https://www.krea.ai/api/img?f=webp&i=https%3A%2F%2Fs.krea.ai%2Fmany_small_red_jellyfish_in_bright_purple_water_o1a1we7ecl9tp49ogh2g_1.png&s=1024" className="w-full h-full object-cover transition-opacity" alt="Z image" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                            <h3 className="text-xl font-medium tracking-tight mb-2">Z Image</h3>
                            <p className="text-[13px] text-white/60 leading-relaxed mb-4 line-clamp-2">Highly expressive and artistic generations.</p>
                            <div className="flex justify-between items-center text-sm text-white/50 font-medium">
                                <span className="flex text-white">⚡️⚡️⚡️ &nbsp;&nbsp; 💎💎💎</span>
                                <span>~350 🛞</span>
                            </div>
                        </div>
                    </div>

                    {/* Flux 2 */}
                    <div className="shrink-0 w-full md:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] snap-start rounded-2xl bg-[#151515] border border-white/5 overflow-hidden flex flex-col h-[280px] relative group cursor-pointer">
                        <div className="h-full w-full relative">
                           <img src="https://www.krea.ai/api/img?f=webp&i=https%3A%2F%2Fs.krea.ai%2Fa_purple_squid_with_large_tentacles_swimming_in_dark_water_wavy_oceans_action_shot__sicgn9vna1e6ddkosqa6_0.png&s=1024" className="w-full h-full object-cover transition-opacity" alt="Flux 2" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                            <h3 className="text-xl font-medium tracking-tight mb-2">Flux 2</h3>
                            <p className="text-[13px] text-white/60 leading-relaxed mb-4 line-clamp-2">The open source king, amazing photorealism.</p>
                            <div className="flex justify-between items-center text-sm text-white/50 font-medium">
                                <span className="flex text-white">⚡️⚡️⚡️ &nbsp;&nbsp; 💎💎💎</span>
                                <span>~300 🛞</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Speeddream 5 Lite */}
                    <div className="shrink-0 w-full md:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] snap-start rounded-2xl bg-[#151515] border border-white/5 overflow-hidden flex flex-col h-[280px] relative group cursor-pointer">
                        <div className="h-full w-full relative">
                           <img src="https://www.krea.ai/api/img?f=webp&i=https%3A%2F%2Fs.krea.ai%2Fseedream_5_lite_a_photo_of_the_eiffel_tower_slightly_warped_made_of_green_jelly_blue_skies_real_photo_ky586qrs4z5irvrk5427_0.jpeg&s=1024" className="w-full h-full object-cover transition-opacity" alt="Speeddream 5 Lite" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                            <h3 className="text-xl font-medium tracking-tight mb-2">Speeddream 5 Lite</h3>
                            <p className="text-[13px] text-white/60 leading-relaxed mb-4 line-clamp-2">Ultra-fast inference under 1 second.</p>
                            <div className="flex justify-between items-center text-sm text-white/50 font-medium">
                                <span className="flex text-white">⚡️⚡️⚡️⚡️ &nbsp;&nbsp; 💎</span>
                                <span>~50 🛞</span>
                            </div>
                        </div>
                    </div>

                    {/* Flux 2 Max */}
                    <div className="shrink-0 w-full md:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] snap-start rounded-2xl bg-[#151515] border border-white/5 overflow-hidden flex flex-col h-[280px] relative group cursor-pointer">
                        <div className="h-full w-full relative">
                           <img src="https://www.krea.ai/api/img?f=webp&i=https%3A%2F%2Fs.krea.ai%2Fa_group_of_ballerinas_wearing_same_white_dresses_dancing_in_order_shot_from_above_concrete_smooth_f_0qg9vnwqygg8f9fugdef_0.png&s=1024" className="w-full h-full object-cover transition-opacity" alt="Flux 2 Max" />
                        </div>
                         <div className="absolute top-4 left-4 bg-white/90 text-black text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                            Beta
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                            <h3 className="text-xl font-medium tracking-tight mb-2">Flux 2 Max</h3>
                            <p className="text-[13px] text-white/60 leading-relaxed mb-4 line-clamp-2">Heavy parameter version of Flux 2.</p>
                            <div className="flex justify-between items-center text-sm text-white/50 font-medium">
                                <span className="flex text-white">⚡️ &nbsp;&nbsp; 💎💎💎</span>
                                <span>~600 🛞</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Try video models */}
            <div className="flex flex-col gap-6 mt-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-[22px] font-medium flex items-center gap-3">
                      Try video models <span className="p-1.5 rounded-full bg-white/5 text-white/50 hover:bg-white/10 cursor-pointer"><Search size={16}/></span>
                    </h2>
                    <div className="flex gap-2">
                      <button onClick={() => scrollVideo("left")} className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 transition-colors cursor-pointer z-10"><ChevronLeft size={18}/></button>
                      <button onClick={() => scrollVideo("right")} className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 transition-colors cursor-pointer z-10"><ChevronRight size={18}/></button>
                    </div>
                </div>
                
                <div ref={videoScrollRef} className="flex overflow-x-auto snap-x snap-mandatory gap-5 pb-4 hide-scrollbar scroll-smooth">
                    {/* Kling 2.6 */}
                    <div className="shrink-0 w-full md:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] snap-start rounded-2xl bg-[#151515] border border-white/5 overflow-hidden flex flex-col h-[280px] relative group cursor-pointer">
                        <div className="h-full w-full relative">
                           <video src="https://s.krea.ai/pov_shot_of_a_bee_flying_over_the_kitchen_worktop_there_is_many_items_there_cinematic_feel_w69u9excjtiwnse3bzav_1.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover transition-opacity" />
                        </div>
                        <div className="absolute top-4 left-4 bg-white/90 text-black text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                            <span className="w-3 h-3 block border border-black rounded-sm"></span> Featured
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                            <h3 className="text-xl font-medium tracking-tight mb-2">Kling 2.6</h3>
                            <p className="text-[13px] text-white/60 leading-relaxed mb-4 line-clamp-2">Frontier model from Kling with native audio. Highest quality at a moderate price point.</p>
                            <div className="flex justify-between items-center text-sm text-white/50 font-medium">
                                <span className="flex text-white">⚡️⚡️⚡️ &nbsp;&nbsp; 💎💎💎</span>
                                <span>~300 🛞</span>
                            </div>
                        </div>
                    </div>

                    {/* Runway Gen-4.5 */}
                    <div className="shrink-0 w-full md:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] snap-start rounded-2xl bg-[#151515] border border-white/5 overflow-hidden flex flex-col h-[280px] relative group cursor-pointer">
                        <div className="h-full w-full relative">
                           <video src="https://s.krea.ai/runway_4_5_a_man_painting_in_his_garage_mute_tones_high_quality_shot_lhq1400enwde6mjt38z9_1_1.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover transition-opacity" />
                        </div>
                        <div className="absolute top-4 left-4 bg-white/90 text-black text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                            New
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                            <h3 className="text-xl font-medium tracking-tight mb-2">Runway Gen-4.5</h3>
                            <p className="text-[13px] text-white/60 leading-relaxed mb-4 line-clamp-2">Latest frontier model from Runway with native text-to-video.</p>
                            <div className="flex justify-between items-center text-sm text-white/50 font-medium">
                                <span className="flex text-white">⚡️⚡️⚡️ &nbsp;&nbsp; 💎💎💎</span>
                                <span>~500 🛞</span>
                            </div>
                        </div>
                    </div>

                    {/* Vidu Q3 */}
                    <div className="shrink-0 w-full md:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] snap-start rounded-2xl bg-[#151515] border border-white/5 overflow-hidden flex flex-col h-[280px] relative group cursor-pointer">
                        <div className="h-full w-full relative">
                           <video src="https://s.krea.ai/vidu_q3_action_scene_of_a_anime_cartoon_of_a_sword_fight_gjlxhx0trurlhwfc49fz_1_1.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover transition-opacity" />
                        </div>
                        <div className="absolute top-4 left-4 bg-white/90 text-black text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                            New
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                            <h3 className="text-xl font-medium tracking-tight mb-2">Vidu Q3</h3>
                            <p className="text-[13px] text-white/60 leading-relaxed mb-4 line-clamp-2">New model excelling at anime.</p>
                            <div className="flex justify-between items-center text-sm text-white/50 font-medium">
                                <span className="flex text-white">⚡️⚡️⚡️ &nbsp;&nbsp; 💎💎💎</span>
                                <span>~600 🛞</span>
                            </div>
                        </div>
                    </div>

                    {/* LTX-2 */}
                    <div className="shrink-0 w-full md:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] snap-start rounded-2xl bg-[#151515] border border-white/5 overflow-hidden flex flex-col h-[280px] relative group cursor-pointer">
                        <div className="h-full w-full relative">
                           <video src="https://s.krea.ai/ltx_2_a_man_riding_his_bike_down_a_street_fast_action_cinematic_shot_nxpp0v2etedgmb79yy1h_1.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover transition-opacity" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                            <h3 className="text-xl font-medium tracking-tight mb-2">LTX-2</h3>
                            <p className="text-[13px] text-white/60 leading-relaxed mb-4 line-clamp-2">Best quality Open Source model.</p>
                            <div className="flex justify-between items-center text-sm text-white/50 font-medium">
                                <span className="flex text-white">⚡️⚡️⚡️ &nbsp;&nbsp; 💎💎💎</span>
                                <span>~350 🛞</span>
                            </div>
                        </div>
                    </div>

                    {/* Kling o3 */}
                    <div className="shrink-0 w-full md:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] snap-start rounded-2xl bg-[#151515] border border-white/5 overflow-hidden flex flex-col h-[280px] relative group cursor-pointer">
                        <div className="h-full w-full relative">
                           <video src="https://s.krea.ai/kling_o3_a_pov_shot_of_someone_snowboarding_and_a_dinosaur_attacks_him_slight_blue_tint_cinematic_feel_actio_yow0bfi1gdjoqxkyjbaz_1_1.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover transition-opacity" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                            <h3 className="text-xl font-medium tracking-tight mb-2">Kling o3</h3>
                            <p className="text-[13px] text-white/60 leading-relaxed mb-4 line-clamp-2">Prior frontier model from Kling, offering great reliability.</p>
                            <div className="flex justify-between items-center text-sm text-white/50 font-medium">
                                <span className="flex text-white">⚡️⚡️⚡️ &nbsp;&nbsp; 💎💎💎</span>
                                <span>~250 🛞</span>
                            </div>
                        </div>
                    </div>

                    {/* Kling 3.0 */}
                    <div className="shrink-0 w-full md:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] snap-start rounded-2xl bg-[#151515] border border-white/5 overflow-hidden flex flex-col h-[280px] relative group cursor-pointer">
                        <div className="h-full w-full relative">
                           <video src="https://s.krea.ai/kling_3_pov_shot_of_an_egle_flying_and_swering_through_toronto_streets_green_lasers_explosions_fire_many_pe_tyuedb8mtdtmbqzhuu38_1_1.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover transition-opacity" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                            <h3 className="text-xl font-medium tracking-tight mb-2">Kling 3.0</h3>
                            <p className="text-[13px] text-white/60 leading-relaxed mb-4 line-clamp-2">Legacy frontier model.</p>
                            <div className="flex justify-between items-center text-sm text-white/50 font-medium">
                                <span className="flex text-white">⚡️⚡️⚡️ &nbsp;&nbsp; 💎💎💎</span>
                                <span>~200 🛞</span>
                            </div>
                        </div>
                    </div>

                    {/* Grok Imagine */}
                    <div className="shrink-0 w-full md:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] snap-start rounded-2xl bg-[#151515] border border-white/5 overflow-hidden flex flex-col h-[280px] relative group cursor-pointer">
                        <div className="h-full w-full relative">
                           <video src="https://s.krea.ai/grok_imagine_cinematic_action_shot_a_paper_boat_floating_in_a_bath_tub_animation_style_f6lyqlytkht4aow5d0m6_1_1.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover transition-opacity" />
                        </div>
                         <div className="absolute top-4 left-4 bg-white/90 text-black text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                            Beta
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                            <h3 className="text-xl font-medium tracking-tight mb-2">Grok Imagine</h3>
                            <p className="text-[13px] text-white/60 leading-relaxed mb-4 line-clamp-2">Highly capable model excelling in realism.</p>
                            <div className="flex justify-between items-center text-sm text-white/50 font-medium">
                                <span className="flex text-white">⚡️⚡️⚡️ &nbsp;&nbsp; 💎💎💎</span>
                                <span>~450 🛞</span>
                            </div>
                        </div>
                    </div>

                    {/* Haulio 02 */}
                    <div className="shrink-0 w-full md:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] snap-start rounded-2xl bg-[#151515] border border-white/5 overflow-hidden flex flex-col h-[280px] relative group cursor-pointer">
                        <div className="h-full w-full relative">
                           <video src="https://s.krea.ai/go_pro_footage_of_someone_airgliding_through_the_mountains_shaky_camera_footage_9vwgicmzc6c84mmvqcg3_1.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover transition-opacity" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                            <h3 className="text-xl font-medium tracking-tight mb-2">Haulio 02</h3>
                            <p className="text-[13px] text-white/60 leading-relaxed mb-4 line-clamp-2">High fidelity experimental video generation model.</p>
                            <div className="flex justify-between items-center text-sm text-white/50 font-medium">
                                <span className="flex text-white">⚡️⚡️⚡️ &nbsp;&nbsp; 💎💎💎</span>
                                <span>~700 🛞</span>
                            </div>
                        </div>
                    </div>

                    {/* Seedance Pro */}
                    <div className="shrink-0 w-full md:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] snap-start rounded-2xl bg-[#151515] border border-white/5 overflow-hidden flex flex-col h-[280px] relative group cursor-pointer">
                        <div className="h-full w-full relative">
                           <video src="https://s.krea.ai/a_grassy_surface_clear_skies_rocky_desert_millions_of_red_poppy_flowers_slowly_grow_out_of_the_gras_olhwf3pgw7ag734bk8yt_1.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover transition-opacity" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                            <h3 className="text-xl font-medium tracking-tight mb-2">Seedance Pro</h3>
                            <p className="text-[13px] text-white/60 leading-relaxed mb-4 line-clamp-2">Advanced motion and dynamic movement model.</p>
                            <div className="flex justify-between items-center text-sm text-white/50 font-medium">
                                <span className="flex text-white">⚡️⚡️⚡️ &nbsp;&nbsp; 💎💎💎</span>
                                <span>~650 🛞</span>
                            </div>
                        </div>
                    </div>
                    {/* Kling o1 */}
                    <div className="shrink-0 w-full md:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] snap-start rounded-2xl bg-[#151515] border border-white/5 overflow-hidden flex flex-col h-[280px] relative group cursor-pointer">
                        <div className="h-full w-full relative">
                           <video src="https://s.krea.ai/replace_the_dragon_for_a_giant_ufo_and_the_background_is_snowy_mountain_landscape_remove_the_buildi_rhlsbmuqnjfnlkf4z3hu_1.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover transition-opacity" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                            <h3 className="text-xl font-medium tracking-tight mb-2">Kling o1</h3>
                            <p className="text-[13px] text-white/60 leading-relaxed mb-4 line-clamp-2">Brand new frontier model from Kling with exceptional fidelity.</p>
                            <div className="flex justify-between items-center text-sm text-white/50 font-medium">
                                <span className="flex text-white">⚡️⚡️⚡️ &nbsp;&nbsp; 💎💎💎</span>
                                <span>~300 🛞</span>
                            </div>
                        </div>
                    </div>

                    {/* Kling 2.5 */}
                    <div className="shrink-0 w-full md:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] snap-start rounded-2xl bg-[#151515] border border-white/5 overflow-hidden flex flex-col h-[280px] relative group cursor-pointer">
                        <div className="h-full w-full relative">
                           <video src="https://s.krea.ai/two_silver_foil_robots_are_break_dancing_in_the_middle_of_night_club_shaky_camera_footage_day_time_ymqgxshdwxdufu0ns1yt_1.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover transition-opacity" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                            <h3 className="text-xl font-medium tracking-tight mb-2">Kling 2.5</h3>
                            <p className="text-[13px] text-white/60 leading-relaxed mb-4 line-clamp-2">Fast and consistent model suitable for quick generations.</p>
                            <div className="flex justify-between items-center text-sm text-white/50 font-medium">
                                <span className="flex text-white">⚡️⚡️⚡️ &nbsp;&nbsp; 💎💎</span>
                                <span>~250 🛞</span>
                            </div>
                        </div>
                    </div>

                    {/* Wan 2.6 */}
                    <div className="shrink-0 w-full md:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] snap-start rounded-2xl bg-[#151515] border border-white/5 overflow-hidden flex flex-col h-[280px] relative group cursor-pointer">
                        <div className="h-full w-full relative">
                           <video src="https://s.krea.ai/a_weird_mythical_human_goblin_creature_is_running_through_the_forrest_finding_a_shiny_gold_coin_cin_fbkhsviy41c84giqlgbl_1.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover transition-opacity" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                            <h3 className="text-xl font-medium tracking-tight mb-2">Wan 2.6</h3>
                            <p className="text-[13px] text-white/60 leading-relaxed mb-4 line-clamp-2">Fantasy and surrealism video generation.</p>
                            <div className="flex justify-between items-center text-sm text-white/50 font-medium">
                                <span className="flex text-white">⚡️⚡️ &nbsp;&nbsp; 💎💎💎</span>
                                <span>~400 🛞</span>
                            </div>
                        </div>
                    </div>

                    {/* Sora 2 */}
                    <div className="shrink-0 w-full md:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] snap-start rounded-2xl bg-[#151515] border border-white/5 overflow-hidden flex flex-col h-[280px] relative group cursor-pointer">
                        <div className="h-full w-full relative">
                           <video src="https://s.krea.ai/a_man_reporting_the_news_in_front_of_a_burning_building_g7ljkjx96r2i5yk0kwet_1.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover transition-opacity" />
                        </div>
                        <div className="absolute top-4 left-4 bg-white/90 text-black text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                            New
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                            <h3 className="text-xl font-medium tracking-tight mb-2">Sora 2</h3>
                            <p className="text-[13px] text-white/60 leading-relaxed mb-4 line-clamp-2">Incredible coherent world generation capabilities.</p>
                            <div className="flex justify-between items-center text-sm text-white/50 font-medium">
                                <span className="flex text-white">⚡️⚡️⚡️ &nbsp;&nbsp; 💎💎💎</span>
                                <span>~800 🛞</span>
                            </div>
                        </div>
                    </div>

                    {/* Haulio 2.3 */}
                    <div className="shrink-0 w-full md:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] snap-start rounded-2xl bg-[#151515] border border-white/5 overflow-hidden flex flex-col h-[280px] relative group cursor-pointer">
                        <div className="h-full w-full relative">
                           <video src="https://s.krea.ai/a_ship_sailing_through_rough_waters_grey_skies__6im2iykak1byx9txite7_1.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover transition-opacity" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                            <h3 className="text-xl font-medium tracking-tight mb-2">Haulio 2.3</h3>
                            <p className="text-[13px] text-white/60 leading-relaxed mb-4 line-clamp-2">Latest iteration focusing on nature and physics simulations.</p>
                            <div className="flex justify-between items-center text-sm text-white/50 font-medium">
                                <span className="flex text-white">⚡️⚡️⚡️ &nbsp;&nbsp; 💎💎💎</span>
                                <span>~650 🛞</span>
                            </div>
                        </div>
                    </div>

                    {/* Vedo 3.1 Fast */}
                    <div className="shrink-0 w-full md:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] snap-start rounded-2xl bg-[#151515] border border-white/5 overflow-hidden flex flex-col h-[280px] relative group cursor-pointer">
                        <div className="h-full w-full relative">
                           <video src="https://s.krea.ai/organic_fluid_gradient_imagery_of_liquid_shapes_extreme_close_up__ivvyw8ulxa8huf8vuk0i_1.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover transition-opacity" />
                        </div>
                        <div className="absolute top-4 left-4 bg-white/90 text-black text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                            <span className="w-3 h-3 block border border-black rounded-sm"></span> Fast
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                            <h3 className="text-xl font-medium tracking-tight mb-2">Vedo 3.1 Fast</h3>
                            <p className="text-[13px] text-white/60 leading-relaxed mb-4 line-clamp-2">Hyper-speed version of Vedo 3 for lower latency generations.</p>
                            <div className="flex justify-between items-center text-sm text-white/50 font-medium">
                                <span className="flex text-white">⚡️⚡️⚡️⚡️ &nbsp;&nbsp; 💎</span>
                                <span>~200 🛞</span>
                            </div>
                        </div>
                    </div>

                    {/* Vidu Q2 */}
                    <div className="shrink-0 w-full md:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] snap-start rounded-2xl bg-[#151515] border border-white/5 overflow-hidden flex flex-col h-[280px] relative group cursor-pointer">
                        <div className="h-full w-full relative">
                           <video src="https://s.krea.ai/timelapse_video_of_eiffel_tower_from_sunset_to_sunrise_m0iyh6w0xxyn25atul0t_1.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover transition-opacity" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                            <h3 className="text-xl font-medium tracking-tight mb-2">Vidu Q2</h3>
                            <p className="text-[13px] text-white/60 leading-relaxed mb-4 line-clamp-2">Reliable everyday dynamic generations.</p>
                            <div className="flex justify-between items-center text-sm text-white/50 font-medium">
                                <span className="flex text-white">⚡️⚡️ &nbsp;&nbsp; 💎💎</span>
                                <span>~450 🛞</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            
            {/* Play with node apps */}
            <div className="flex flex-col gap-6 mt-12">
                <div className="flex items-center justify-between">
                    <h2 className="text-[22px] font-medium flex items-center gap-3">
                      Play with node apps
                    </h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {/* Card 1 */}
                    <div className="rounded-2xl bg-[#151515] border border-white/5 overflow-hidden flex flex-col h-[340px] relative group cursor-pointer">
                        <div className="h-full w-full relative">
                           <img src="https://www.krea.ai/api/img?f=webp&i=https%3A%2F%2Fs.krea.ai%2FnodeAppCard_1n.png" className="w-full h-full object-cover transition-opacity" alt="CCTV Selfies" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6">
                            <div className="transform transition-transform duration-300 group-hover:-translate-y-12">
                                <h3 className="text-xl font-medium tracking-tight mb-1">CCTV Selfies</h3>
                                <p className="text-[14px] text-white/70 line-clamp-1">Put your face and outfit into ...</p>
                            </div>
                            <div className="absolute bottom-6 left-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                <button className="bg-white text-black px-6 py-2 rounded-full font-medium text-[15px]">Try it</button>
                            </div>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="rounded-2xl bg-[#151515] border border-white/5 overflow-hidden flex flex-col h-[340px] relative group cursor-pointer">
                        <div className="h-full w-full relative">
                           <img src="https://www.krea.ai/api/img?f=webp&i=https%3A%2F%2Fs.krea.ai%2FnodeAppCard_2n.png" className="w-full h-full object-cover transition-opacity" alt="Animorph yourself" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6">
                            <div className="transform transition-transform duration-300 group-hover:-translate-y-12">
                                <h3 className="text-xl font-medium tracking-tight mb-1">Animorph yourself</h3>
                                <p className="text-[14px] text-white/70 line-clamp-1">How would you look like mor...</p>
                            </div>
                            <div className="absolute bottom-6 left-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                <button className="bg-white text-black px-6 py-2 rounded-full font-medium text-[15px]">Try it</button>
                            </div>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="rounded-2xl bg-[#151515] border border-white/5 overflow-hidden flex flex-col h-[340px] relative group cursor-pointer">
                        <div className="h-full w-full relative">
                           <img src="https://www.krea.ai/api/img?f=webp&i=https%3A%2F%2Fs.krea.ai%2FnodeAppCard_3n.png" className="w-full h-full object-cover transition-opacity" alt="Digicam Snapshots" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6">
                            <div className="transform transition-transform duration-300 group-hover:-translate-y-12">
                                <h3 className="text-xl font-medium tracking-tight mb-1">Digicam Snapshots</h3>
                                <p className="text-[14px] text-white/70 line-clamp-1">Show your best outfits on a ...</p>
                            </div>
                            <div className="absolute bottom-6 left-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                <button className="bg-white text-black px-6 py-2 rounded-full font-medium text-[15px]">Try it</button>
                            </div>
                        </div>
                    </div>

                    {/* Card 4 */}
                    <div className="rounded-2xl bg-[#151515] border border-white/5 overflow-hidden flex flex-col h-[340px] relative group cursor-pointer">
                        <div className="h-full w-full relative">
                           <img src="https://www.krea.ai/api/img?f=webp&i=https%3A%2F%2Fs.krea.ai%2FnodeAppCard_4n.png" className="w-full h-full object-cover transition-opacity" alt="Truck Ad" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6">
                            <div className="transform transition-transform duration-300 group-hover:-translate-y-12">
                                <h3 className="text-xl font-medium tracking-tight mb-1">Truck Ad</h3>
                                <p className="text-[14px] text-white/70 line-clamp-1">Place your product on a virt...</p>
                            </div>
                            <div className="absolute bottom-6 left-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                <button className="bg-white text-black px-6 py-2 rounded-full font-medium text-[15px]">Try it</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            
            {/* Release notes */}
            <div className="flex flex-col gap-8 mt-16 mb-10 w-full max-w-7xl mx-auto">
                <div className="flex items-center justify-between">
                    <h2 className="text-[22px] font-medium flex items-center gap-3">
                      Release notes
                    </h2>
                    <button className="bg-white/10 hover:bg-white/20 text-white/90 text-sm px-4 py-2 rounded-full transition-colors font-medium">
                        View all
                    </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 mt-6">
                    {/* Note 1 */}
                    <div className="flex grid grid-cols-5 gap-8 group cursor-pointer">
                        <div className="col-span-2 rounded-xl overflow-hidden aspect-video relative bg-[#151515] border border-white/5">
                            <img src="https://www.krea.ai/api/img?f=webp&i=https%3A%2F%2Fs.krea.ai%2Fblogs%2Fannotations.webp" className="w-full h-full object-cover transition-opacity group-hover:opacity-90" alt="Annotations in Nextflow Edit" />
                        </div>
                        <div className="col-span-3 flex flex-col justify-center">
                            <h3 className="text-xl font-medium tracking-tight mb-2 text-white/95">Annotations in Nextflow Edit</h3>
                            <p className="text-[14px] leading-relaxed text-white/60 mb-5 line-clamp-2">Mark up multiple regions, write a separate prompt for each one, and generate all the changes in a single...</p>
                            <span className="text-[13px] text-white/40 font-medium">Mar 26, 2026</span>
                        </div>
                    </div>

                    {/* Note 2 */}
                    <div className="flex grid grid-cols-5 gap-8 group cursor-pointer">
                        <div className="col-span-2 rounded-xl overflow-hidden aspect-video relative bg-[#151515] border border-white/5">
                            <img src="https://www.krea.ai/api/img?f=webp&i=https%3A%2F%2Fs.krea.ai%2Fblogs%2Fagent.webp" className="w-full h-full object-cover transition-opacity group-hover:opacity-90" alt="The Node Agent" />
                        </div>
                        <div className="col-span-3 flex flex-col justify-center">
                            <h3 className="text-xl font-medium tracking-tight mb-2 text-white/95">The Node Agent</h3>
                            <p className="text-[14px] leading-relaxed text-white/60 mb-5 line-clamp-2">An AI agent that builds and runs creative workflows from a single sentence.</p>
                            <span className="text-[13px] text-white/40 font-medium">Mar 18, 2026</span>
                        </div>
                    </div>

                    {/* Note 3 */}
                    <div className="flex grid grid-cols-5 gap-8 group cursor-pointer">
                        <div className="col-span-2 rounded-xl overflow-hidden aspect-video relative bg-[#151515] border border-white/5">
                            <img src="https://www.krea.ai/api/img?f=webp&i=https%3A%2F%2Fs.krea.ai%2Fnews_new_edit_light.webp" className="w-full h-full object-cover transition-opacity group-hover:opacity-90" alt="A New, More Powerful Nextflow Edit" />
                        </div>
                        <div className="col-span-3 flex flex-col justify-center">
                            <h3 className="text-xl font-medium tracking-tight mb-2 text-white/95">A New, More Powerful Nextflow Edit</h3>
                            <p className="text-[14px] leading-relaxed text-white/60 mb-5 line-clamp-2">Change specific regions, render new perspectives, adjust lighting, apply color palettes, and more. A rebuilt...</p>
                            <span className="text-[13px] text-white/40 font-medium">Mar 9, 2026</span>
                        </div>
                    </div>

                    {/* Note 4 */}
                    <div className="flex grid grid-cols-5 gap-8 group cursor-pointer">
                        <div className="col-span-2 rounded-xl overflow-hidden aspect-video relative bg-[#151515] border border-white/5">
                            <img src="https://www.krea.ai/api/img?f=webp&i=https%3A%2F%2Fs.krea.ai%2Fnews_anything_into_prompt_1.webp" className="w-full h-full object-cover transition-opacity group-hover:opacity-90" alt="Turn Any Image Into a Prompt" />
                        </div>
                        <div className="col-span-3 flex flex-col justify-center">
                            <h3 className="text-xl font-medium tracking-tight mb-2 text-white/95">Turn Any Image Into a Prompt</h3>
                            <p className="text-[14px] leading-relaxed text-white/60 mb-5 line-clamp-2">Drop any image into Nextflow and get a detailed, generation-ready prompt in seconds. AI vision analyzes style,...</p>
                            <span className="text-[13px] text-white/40 font-medium">Mar 5, 2026</span>
                        </div>
                    </div>
                </div>
            </div>

            
            <hr className="border-[#222] my-10" />
            
            {/* Multi-column Footer */}
            <footer className="w-full max-w-6xl mx-auto text-white/60 text-[14px] mt-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-24 pt-4 pb-12 w-full place-content-center">
                    <div className="flex flex-col gap-4">
                       <h4 className="text-white font-medium mb-1">NextFlow</h4>
                       <Link href="#" className="hover:text-white transition-colors">Log In</Link>
                       <Link href="#" className="hover:text-white transition-colors">Pricing</Link>
                       <Link href="#" className="hover:text-white transition-colors">Plans</Link>
                       <Link href="#" className="hover:text-white transition-colors">NextFlow Teams</Link>
                       <Link href="#" className="hover:text-white transition-colors">NextFlow Enterprise</Link>
                       <Link href="#" className="hover:text-white transition-colors">Gallery</Link>
                       <Link href="#" className="hover:text-white transition-colors">NextFlow for Architecture</Link>
                    </div>

                    <div className="flex flex-col gap-4">
                       <h4 className="text-white font-medium mb-1">Products</h4>
                       <Link href="#" className="hover:text-white transition-colors">Image</Link>
                       <Link href="#" className="hover:text-white transition-colors">Video</Link>
                       <Link href="#" className="hover:text-white transition-colors">Enhancer</Link>
                       <Link href="#" className="hover:text-white transition-colors">Realtime</Link>
                       <Link href="#" className="hover:text-white transition-colors">Edit</Link>
                       <Link href="#" className="hover:text-white transition-colors">Chat</Link>
                       <Link href="#" className="hover:text-white transition-colors">Stage</Link>
                       <Link href="#" className="hover:text-white transition-colors">Animator</Link>
                       <Link href="#" className="hover:text-white transition-colors">Train</Link>
                    </div>

                    <div className="flex flex-col gap-4">
                       <h4 className="text-white font-medium mb-1">Resources</h4>
                       <Link href="#" className="hover:text-white transition-colors">Pricing</Link>
                       <Link href="#" className="hover:text-white transition-colors">Careers</Link>
                       <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                       <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                       <Link href="#" className="hover:text-white transition-colors">Documentation</Link>
                       <Link href="#" className="hover:text-white transition-colors">Models</Link>
                    </div>

                    <div className="flex flex-col gap-4">
                       <h4 className="text-white font-medium mb-1">About</h4>
                       <Link href="#" className="hover:text-white transition-colors">Blog</Link>
                       <Link href="#" className="hover:text-white transition-colors">Discord</Link>
                       <Link href="#" className="hover:text-white transition-colors">Articles</Link>
                    </div>
                </div>

                <hr className="border-[#222] my-4" />

                <div className="flex flex-col md:flex-row items-center justify-between py-6 gap-4">
                    <p className="text-[13px]">© 2026 NextFlow</p>
                    <div className="flex items-center gap-4 hidden md:flex">
                        <svg className="w-4 h-4 cursor-pointer hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M22 6.5h-4.5V2h-3v4.5H10V2H7v4.5H2.5v3H7v5H2.5v3H7V22h3v-4.5h4.5V22h3v-4.5H22v-3h-4.5v-5H22v-3zm-7.5 8h-4.5v-5h4.5v5z"/></svg>
                        <svg className="w-3.5 h-3.5 cursor-pointer hover:text-white transition-colors" fill="currentColor" viewBox="0 0 1200 1227"><path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"/></svg>
                        <svg className="w-4 h-4 cursor-pointer hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        <svg className="w-4 h-4 cursor-pointer hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                    </div>
                </div>
            </footer>
        </div>
      </main>
    </div>
  );
}
