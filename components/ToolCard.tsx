import React, { useState, useRef } from 'react';
import { ExternalLink, Star, PlayCircle, Volume2, VolumeX, Copy, Type } from 'lucide-react';
import { Tool } from '../types';

interface ToolCardProps {
  tool: Tool;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [showPrompt, setShowPrompt] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const copyPrompt = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (tool.prompt) {
          navigator.clipboard.writeText(tool.prompt);
          alert("提示词已复制！");
      }
  }

  // Determine if this is a "Visual Heavy" card (Text Effects / Tutorials with images)
  const isVisualHeavy = tool.category === 'text-effect' || tool.category === 'tutorial';

  return (
    <div className="flex flex-col h-full bg-[var(--card-bg)] theme-border overflow-hidden theme-shadow transition-all duration-200 group relative hover:-translate-y-1">
      
      {/* Visual Header Section */}
      <div className={`relative ${isVisualHeavy ? 'h-48' : 'p-5 flex-grow'}`}>
        {isVisualHeavy ? (
            <div className="w-full h-full relative group/media overflow-hidden">
                {tool.image ? (
                    <img 
                        src={tool.image} 
                        alt={tool.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/media:scale-110" 
                    />
                ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <Type size={40} className="text-gray-400" />
                    </div>
                )}
                
                {/* Visual Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                
                <div className="absolute bottom-0 left-0 p-4 text-white w-full">
                     <h3 className="text-lg font-bold leading-tight truncate drop-shadow-md">
                        {tool.name}
                     </h3>
                     {tool.rating && (
                         <div className="flex items-center text-yellow-400 mt-1">
                            <Star size={12} fill="currentColor" />
                            <span className="text-xs font-bold ml-1">{tool.rating}</span>
                         </div>
                     )}
                </div>

                {tool.prompt && (
                    <button 
                        onClick={() => setShowPrompt(!showPrompt)}
                        className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-lg backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
                        title="查看 Prompt"
                    >
                        <Type size={14} />
                    </button>
                )}
            </div>
        ) : (
             <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3 w-full">
                 {tool.video ? (
                    <div className="w-full relative group/video">
                        <div className="w-full h-48 rounded-lg overflow-hidden relative bg-transparent flex items-center justify-center">
                             <video 
                                ref={videoRef}
                                src={tool.video} 
                                autoPlay
                                loop
                                muted={isMuted}
                                playsInline
                                className="w-full h-full object-contain bg-transparent" 
                                poster={tool.image} 
                            />
                            <div className="absolute top-2 right-2 z-20">
                                <button 
                                    onClick={toggleMute}
                                    className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70 backdrop-blur-sm transition-all transform hover:scale-110"
                                    title={isMuted ? "开启声音" : "静音"}
                                >
                                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                                </button>
                            </div>
                        </div>
                    </div>
                 ) : (
                     <div className="w-12 h-12 flex-shrink-0 rounded-lg bg-[var(--bg-color)] theme-border flex items-center justify-center overflow-hidden group-hover:bg-yellow-300 transition-colors">
                       {tool.image ? (
                         <img src={tool.image} alt={tool.name} className="w-full h-full object-cover" />
                       ) : (
                         <span className="text-xl font-black text-[var(--text-color)]">
                           {tool.name.substring(0, 1)}
                         </span>
                       )}
                     </div>
                 )}
                 
                 {!tool.video && (
                     <div className="flex-1 min-w-0">
                       <h3 className="text-lg font-bold text-[var(--text-color)] leading-tight truncate group-hover:text-blue-600 transition-colors">
                         {tool.name}
                       </h3>
                       <div className="flex items-center gap-2 mt-1">
                         {tool.rating && (
                           <div className="flex items-center text-yellow-500">
                             <Star size={14} fill="currentColor" />
                             <span className="text-xs font-bold text-[var(--text-color)] ml-1 pt-0.5">{tool.rating}</span>
                           </div>
                         )}
                         <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border border-[var(--border-color)] flex-shrink-0 ${
                           tool.pricing === 'Free' ? 'bg-green-100 text-green-800' :
                           tool.pricing === 'Paid' ? 'bg-red-100 text-red-800' :
                           'bg-blue-100 text-blue-800'
                         }`}>
                           {tool.pricing === 'Free' ? '免费' : tool.pricing === 'Paid' ? '付费' : '免费试用'}
                         </span>
                       </div>
                     </div>
                 )}
              </div>
            </div>
        )}

        {/* Prompt Overlay */}
        {showPrompt && tool.prompt && (
            <div className="absolute inset-0 z-30 bg-black/90 p-4 text-white flex flex-col animate-in fade-in zoom-in-95 duration-200">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-yellow-400">Prompt / 提示词</span>
                    <button onClick={(e) => {e.stopPropagation(); setShowPrompt(false);}}><Type size={16}/></button>
                </div>
                <p className="text-xs leading-relaxed text-gray-300 overflow-y-auto flex-1 font-mono">
                    {tool.prompt}
                </p>
                <button 
                    onClick={copyPrompt}
                    className="mt-3 w-full py-2 bg-white text-black text-xs font-bold rounded flex items-center justify-center gap-2 hover:bg-gray-200"
                >
                    <Copy size={12} /> 复制提示词
                </button>
            </div>
        )}
      </div>

      <div className="p-4 flex-grow flex flex-col">
        {!isVisualHeavy && tool.video && (
           <div className="mb-3 mt-0">
               <h3 className="text-lg font-bold text-[var(--text-color)] leading-tight truncate group-hover:text-blue-600 transition-colors">
                 {tool.name}
               </h3>
               <div className="flex items-center gap-2 mt-1">
                 <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-[var(--border-color)] bg-purple-100 text-purple-800 flex items-center gap-1">
                    <PlayCircle size={10} /> 视频教程
                 </span>
               </div>
           </div>
        )}
        
        <p className="text-gray-600 text-sm line-clamp-2 mb-4 font-medium leading-relaxed">
          {tool.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {tool.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-xs font-bold px-2 py-1 rounded bg-[var(--bg-color)] text-gray-600 border border-[var(--border-color)]">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div className="px-5 py-3 border-t-2 border-[var(--border-color)] bg-[var(--bg-color)] flex justify-between items-center">
         <span className="text-xs text-gray-500 font-bold tracking-wide uppercase truncate max-w-[50%]">
           {tool.category}
         </span>
         <a 
           href={tool.url} 
           target="_blank" 
           rel="noopener noreferrer"
           className="inline-flex items-center justify-center text-xs font-bold text-[var(--text-color)] bg-[var(--card-bg)] hover:bg-black hover:text-white theme-border px-3 py-1.5 transition-all"
         >
           访问 <ExternalLink size={12} className="ml-1" />
         </a>
      </div>
    </div>
  );
};

export default ToolCard;