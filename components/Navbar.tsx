import React, { useState, useEffect } from 'react';
import { Search, Menu, Zap, Clock, Palette } from 'lucide-react';

interface NavbarProps {
  onSearch: (query: string) => void;
  onMenuClick: () => void;
  onOpenAbout: () => void;
  onOpenTheme: () => void;
}

const PHRASES = [
  "小渝児工具箱",
  "收录全球 AI 工具",
  "提升十倍工作效率",
  "激发您的无限创意",
  "精选 AI 绘画神器",
  "智能写作办公助手",
  "探索人工智能未来",
  "免费好用 AI 资源",
  "视频生成黑科技",
  "编程开发辅助利器",
  "汇聚国产大模型",
  "实时更新 AI 资讯",
  "一站式 AI 导航",
  "让 AI 为你打工",
  "发现更多可能性",
  "简单易用 AI 指南",
  "深度学习与应用",
  "创意设计灵感库",
  "您的私人 AI 顾问",
  "开启智能新时代"
];

const Navbar: React.FC<NavbarProps> = ({ onSearch, onMenuClick, onOpenAbout, onOpenTheme }) => {
  const [searchValue, setSearchValue] = useState('');
  
  // Typewriter State
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  
  // Clock State
  const [timeString, setTimeString] = useState('');

  // Typewriter Effect
  useEffect(() => {
    const handleType = () => {
      const currentPhrase = PHRASES[phraseIndex];
      
      if (isDeleting) {
        setText(currentPhrase.substring(0, text.length - 1));
        setTypingSpeed(50); // Deleting speed
      } else {
        setText(currentPhrase.substring(0, text.length + 1));
        setTypingSpeed(150); // Typing speed
      }

      if (!isDeleting && text === currentPhrase) {
        // Finished typing phrase
        setTimeout(() => setIsDeleting(true), 2000); // Pause at end
      } else if (isDeleting && text === '') {
        // Finished deleting
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, phraseIndex, typingSpeed]);

  // Real-time Clock Effect
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const str = now.toLocaleString('zh-CN', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: false
      });
      setTimeString(str);
    };
    
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchValue(val);
    onSearch(val);
  };

  return (
    // Added mt-12 to account for the fixed ApiControlPanel height (h-12)
    <nav className="fixed top-12 z-50 w-full bg-[var(--card-bg)] backdrop-blur-md border-b-2 border-[var(--border-color)] transition-all theme-shadow">
      <div className="px-4 py-3 lg:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start gap-4 min-w-0">
            <button 
              onClick={onMenuClick}
              className="inline-flex items-center p-2 text-[var(--text-color)] rounded-lg lg:hidden hover:bg-yellow-200 border-2 border-transparent hover:border-[var(--border-color)] transition-all flex-shrink-0"
            >
              <Menu size={24} />
            </button>
            <a href="#" className="flex items-center gap-3 group min-w-0">
              <div className="w-10 h-10 bg-yellow-400 theme-border theme-shadow flex items-center justify-center group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:shadow-none transition-all flex-shrink-0">
                <Zap className="text-black" size={22} fill="white" />
              </div>
              
              <div className="flex flex-col min-w-0">
                 <div className="flex items-center">
                    {/* Fixed width container to prevent layout shift */}
                    <div className="w-[280px] hidden md:block">
                      <h1 className="text-xl md:text-2xl font-black tracking-tight whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                          {text}
                          <span className="animate-cursor ml-0.5 border-r-2 border-[var(--text-color)] h-6 inline-block align-middle">&nbsp;</span>
                      </h1>
                    </div>
                    {/* Mobile title (static) */}
                    <h1 className="text-xl font-black tracking-tight md:hidden bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                        小渝児工具箱
                    </h1>
                 </div>
              </div>
            </a>

            {/* Static Clock (Fixed) */}
            <div className="hidden xl:flex items-center px-3 py-1 bg-[var(--bg-color)] theme-border ml-4">
               <Clock size={14} className="mr-2 text-gray-700" />
               <span className="text-xs font-bold font-mono text-gray-800">
                  {timeString}
               </span>
            </div>
          </div>
          
          <div className="flex-1 max-w-xl mx-8 hidden md:block">
            <div className="relative w-full group">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <Search className="w-5 h-5 text-gray-500" />
              </div>
              <input 
                type="text" 
                className="block w-full p-2.5 ps-10 text-sm text-[var(--text-color)] theme-border bg-[var(--bg-color)] focus:ring-0 transition-all placeholder-gray-500 input-glow" 
                placeholder="搜索 AI 工具..." 
                value={searchValue}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={onOpenTheme}
                className="flex items-center gap-1 font-bold text-sm theme-border bg-white text-black px-3 py-1.5 hover:bg-pink-200 transition-colors"
              >
                <Palette size={16} />
                <span className="hidden sm:inline">随心换肤</span>
              </button>
              <button 
                onClick={onOpenAbout}
                className="font-bold text-sm border-2 border-transparent hover:border-[var(--border-color)] hover:bg-yellow-300 px-3 py-1.5 rounded-lg transition-all text-[var(--text-color)]"
              >
                关于我们
              </button>
          </div>
        </div>
        
        {/* Mobile Search Bar */}
        <div className="mt-4 md:hidden">
            <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <Search className="w-4 h-4 text-gray-500" />
              </div>
              <input 
                type="text" 
                className="block w-full p-2.5 ps-10 text-sm text-[var(--text-color)] theme-border bg-[var(--bg-color)] focus:ring-0 transition-all input-glow" 
                placeholder="搜索工具..." 
                value={searchValue}
                onChange={handleSearchChange}
              />
            </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
