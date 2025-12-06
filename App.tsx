import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ToolCard from './components/ToolCard';
import AIConsultant from './components/AIConsultant';
import SubmitModal from './components/SubmitModal';
import VideoUploadModal from './components/VideoUploadModal';
import AboutModal from './components/AboutModal';
import ApiControlPanel from './components/ApiControlPanel';
import ThemeSwitcher from './components/ThemeSwitcher';
import { TOOLS, CATEGORIES } from './constants';
import { Tool, Category, ThemeConfig } from './types';
import { X, Volume2 } from 'lucide-react';

const InfoModal = ({ isOpen, onClose, title, content }: { isOpen: boolean; onClose: () => void; title: string; content: React.ReactNode }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-2xl rounded-xl theme-border shadow-xl animate-in zoom-in-95 duration-200 overflow-hidden max-h-[85vh] flex flex-col">
         <div className="flex items-center justify-between p-4 border-b-2 border-black bg-yellow-300">
            <h2 className="text-xl font-black text-black">{title}</h2>
            <button onClick={onClose} className="p-1 hover:bg-white/50 rounded-lg transition-colors border-2 border-transparent hover:border-black">
              <X size={20} />
            </button>
         </div>
         <div className="p-6 overflow-y-auto leading-relaxed text-sm md:text-base text-black">
            {content}
         </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Dynamic State
  const [categories, setCategories] = useState<Category[]>(CATEGORIES);
  const [allTools, setAllTools] = useState<Tool[]>(TOOLS);
  
  // Modals
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isVideoUploadModalOpen, setIsVideoUploadModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [initialSubmitTab, setInitialSubmitTab] = useState<'tool' | 'video'>('tool');

  // Background Video State
  const [backgroundVideo, setBackgroundVideo] = useState<string | null>(null);

  // Marquee State
  const [marqueeText, setMarqueeText] = useState('');

  // Theme State
  const [currentTheme, setCurrentTheme] = useState<ThemeConfig>({
    id: 'default-theme',
    style: 'default',
    primaryColor: '#facc15',
    secondaryColor: '#3b82f6',
    bgColor: '#f8fafc',
    name: 'Default',
    categoryName: '经典默认 (Classic)',
    customTextColor: undefined,
    customBorderRadius: undefined
  });

  // Apply Theme Effect
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    
    // Set class for Style
    body.className = `theme-${currentTheme.style} antialiased`;
    
    // Set Variables for Color
    root.style.setProperty('--primary-color', currentTheme.primaryColor);
    root.style.setProperty('--secondary-color', currentTheme.secondaryColor);
    
    // If background video is active, we make the background transparent
    // Otherwise we use the theme color
    if (backgroundVideo) {
        root.style.setProperty('--bg-color', 'transparent');
        // Force body background to be transparent to show video
        body.style.backgroundColor = 'transparent';
    } else {
        root.style.setProperty('--bg-color', currentTheme.bgColor);
        body.style.removeProperty('background-color');
    }
    
    // Set Custom Overrides if present
    if (currentTheme.customTextColor) {
        root.style.setProperty('--text-color', currentTheme.customTextColor);
    } else {
        root.style.setProperty('--text-color', '#0f172a'); // Reset to default
    }

    if (currentTheme.customBorderRadius !== undefined) {
        root.style.setProperty('--border-radius', `${currentTheme.customBorderRadius}px`);
    } else {
        root.style.removeProperty('--border-radius');
    }
    
  }, [currentTheme, backgroundVideo]);

  // Marquee Logic
  useEffect(() => {
    const updateMarquee = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const day = now.getDate();
      const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
      const weekDay = weekDays[now.getDay()];
      const hour = now.getHours();
      const minute = now.getMinutes().toString().padStart(2, '0');
      const timeStr = `${hour}:${minute}`;

      let period = '';
      let greeting = '';

      // Time Logic
      if (hour >= 5 && hour < 9) {
          period = "早晨";
          if (hour >= 7 && hour < 8) {
             greeting = "新的一天开始了，请保持最好的心情迎接新的一天。记得吃早餐哟，上班路上注意安全";
          } else {
             greeting = "一日之计在于晨，愿你拥有元气满满的一天";
          }
      } else if (hour >= 9 && hour < 12) {
          period = "上午";
          greeting = "工作再忙也要记得喝水，保持高效状态";
      } else if (hour >= 12 && hour < 14) {
          period = "中午";
          greeting = "午餐时间到了，休息一下，补充能量再出发";
      } else if (hour >= 14 && hour < 18) {
          period = "下午";
          greeting = "在这个充满创意的时刻，用 AI 激发无限灵感吧";
      } else if (hour >= 18 && hour < 19) {
          period = "晚上";
          greeting = "准备下班了，注意回家的路上车辆过往";
      } else if (hour >= 19 && hour < 23) {
          period = "晚上";
          greeting = "结束了一天的工作，享受属于你的个人时光吧";
      } else {
          period = "深夜";
          greeting = "夜深了，早点休息，明天会更好";
      }

      setMarqueeText(`今天是${year}/${month}/${day} ${weekDay} ${period}的${timeStr}${greeting}`);
    };

    updateMarquee();
    const interval = setInterval(updateMarquee, 1000); // Update every second
    return () => clearInterval(interval);
  }, []);

  const handleAddTool = (newTool: Tool) => {
    setAllTools(prev => [newTool, ...prev]);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  const handleAddCategory = (newCategory: Category) => {
    setCategories(prev => [...prev, newCategory]);
  };

  const handleOpenVideoUpload = () => {
      setIsVideoUploadModalOpen(true);
  };

  const handleOpenSubmit = () => {
      setInitialSubmitTab('tool');
      setIsSubmitModalOpen(true);
  };

  const handleSetBackgroundVideo = (videoUrl: string) => {
      setBackgroundVideo(videoUrl);
      // NOTE: useEffect will handle setting bg color to transparent
  };

  // Helper to filter tools
  const getFilteredTools = (category: string) => {
    return allTools.filter(tool => {
      const matchesCategory = category === 'all' || tool.category === category;
      const matchesSearch = 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  };

  const displayGroups = useMemo(() => {
    if (selectedCategory !== 'all') {
      const tools = getFilteredTools(selectedCategory);
      const cat = categories.find(c => c.id === selectedCategory);
      return [{
        id: selectedCategory,
        name: cat?.name || '',
        icon: cat?.icon,
        tools: tools
      }];
    } else {
      const groups = categories
        .filter(c => c.id !== 'all')
        .map(cat => ({
          id: cat.id,
          name: cat.name,
          icon: cat.icon,
          tools: getFilteredTools(cat.id)
        }))
        .filter(group => group.tools.length > 0);
      
      return groups;
    }
  }, [selectedCategory, searchQuery, allTools, categories]);


  return (
    <div className="min-h-screen pb-24 pt-12 text-[var(--text-color)] transition-colors duration-300 relative">
      
      {/* Independent Background Video */}
      {backgroundVideo && (
        <div className="fixed inset-0 z-0 overflow-hidden">
            <video 
                key={backgroundVideo}
                src={backgroundVideo} 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover opacity-100" 
            />
            {/* Overlay to ensure text readability */}
            <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]"></div>
        </div>
      )}

      {/* Top API Panel */}
      <ApiControlPanel />

      <Navbar 
        onSearch={setSearchQuery} 
        onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        onOpenAbout={() => setIsAboutModalOpen(true)}
        onOpenTheme={() => setIsThemeOpen(true)}
      />
      
      <Sidebar 
        categories={categories}
        selectedCategory={selectedCategory} 
        onSelectCategory={setSelectedCategory}
        isOpen={isSidebarOpen}
        onCloseMobile={() => setIsSidebarOpen(false)}
        onOpenSubmit={handleOpenSubmit}
      />

      {/* Main Content Area - Z-Index 10 ensures it sits above video */}
      <div className="p-4 lg:ml-64 pt-24 min-h-screen max-w-[95vw] mx-auto relative z-10">
        {/* Banner Section - Only on Home */}
        {selectedCategory === 'all' && !searchQuery && !backgroundVideo && (
            <div className="mb-10 p-8 rounded-2xl bg-black theme-border relative overflow-hidden theme-shadow">
                <div className="absolute top-0 right-0 p-10 opacity-20">
                    <svg width="250" height="250" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
                </div>
                <div className="relative z-10 max-w-2xl">
                    <div className="inline-block px-3 py-1 bg-yellow-400 border-2 border-white rounded-full text-xs font-black mb-4 transform -rotate-2 text-black">
                        # 收录全球 500+ AI 工具
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black mb-4 text-white tracking-tight">
                        发现最实用的 <span className="text-yellow-400 underline decoration-wavy decoration-2">AI 工具</span>
                    </h1>
                    <p className="text-gray-300 text-lg mb-8 font-medium">
                        小渝児工具箱为您精选全球最新、最热的人工智能应用，助力工作效率飞跃。
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <span onClick={() => setSelectedCategory('image')} className="px-4 py-1.5 rounded-lg bg-gray-800 border border-gray-600 text-gray-300 text-sm font-bold hover:bg-white hover:text-black hover:border-white transition-all cursor-pointer">🎨 AI 绘画</span>
                        <span onClick={() => setSelectedCategory('chat')} className="px-4 py-1.5 rounded-lg bg-gray-800 border border-gray-600 text-gray-300 text-sm font-bold hover:bg-white hover:text-black hover:border-white transition-all cursor-pointer">🤖 智能助理</span>
                        <span onClick={() => setSelectedCategory('video')} className="px-4 py-1.5 rounded-lg bg-gray-800 border border-gray-600 text-gray-300 text-sm font-bold hover:bg-white hover:text-black hover:border-white transition-all cursor-pointer">🎥 视频生成</span>
                    </div>
                </div>
            </div>
        )}

        {/* Content Groups */}
        {displayGroups.length > 0 ? (
           <div className="space-y-12">
             {displayGroups.map(group => (
               <section key={group.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                 <div className="flex items-center gap-3 mb-6 border-b-2 border-[var(--border-color)] pb-2 opacity-80 backdrop-blur-sm bg-white/30 p-2 rounded-lg">
                    <div className="p-2 bg-[var(--primary-color)] theme-border theme-shadow">
                        <span className="text-black">{group.icon}</span>
                    </div>
                    <h2 className="text-2xl font-black text-[var(--text-color)]">
                        {group.name}
                    </h2>
                    <span className="ml-auto text-sm font-bold text-gray-400 bg-gray-100/80 px-3 py-1 rounded-full">
                        {group.tools.length} 个工具
                    </span>
                    <button 
                        onClick={() => setSelectedCategory(group.id)}
                        className="text-sm font-bold text-blue-600 hover:underline hidden sm:block"
                    >
                        查看更多 {">>"}
                    </button>
                 </div>

                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 min-[1800px]:grid-cols-6 gap-6">
                    {group.tools.map(tool => (
                      <ToolCard key={tool.id} tool={tool} />
                    ))}
                 </div>
               </section>
             ))}
           </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-[var(--card-bg)] theme-border rounded-2xl theme-shadow">
            <div className="w-20 h-20 bg-gray-100 rounded-full border-2 border-black flex items-center justify-center mb-6 text-gray-400">
               <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </div>
            <h3 className="text-2xl font-black text-black mb-2">未找到相关工具</h3>
            <p className="text-gray-500 max-w-md font-medium">
              抱歉，我们没有找到与 "{searchQuery}" 匹配的工具。请尝试更换关键词或分类。
            </p>
            <button 
                onClick={() => {setSearchQuery(''); setSelectedCategory('all');}}
                className="mt-8 px-6 py-2 bg-black text-white font-bold rounded-lg hover:scale-105 transition-transform"
            >
                清除筛选条件
            </button>
          </div>
        )}

        <footer className="mt-24 border-t-2 border-[var(--border-color)] pt-10 pb-6 text-center backdrop-blur-sm bg-[var(--card-bg)]/50 rounded-xl mb-4">
            <div className="flex justify-center items-center gap-2 mb-4">
                 <div className="h-2 w-2 bg-black rounded-full"></div>
                 <h2 className="text-xl font-black">小渝児工具箱</h2>
                 <div className="h-2 w-2 bg-black rounded-full"></div>
            </div>
            <p className="mb-6 text-gray-500 font-medium text-sm">
                &copy; {new Date().getFullYear()} XiaoYuEr AI Directory. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6 font-bold text-sm text-gray-600">
                <button onClick={() => setIsPrivacyOpen(true)} className="hover:text-black hover:underline decoration-2 underline-offset-4">隐私政策</button>
                <button onClick={() => setIsTermsOpen(true)} className="hover:text-black hover:underline decoration-2 underline-offset-4">服务条款</button>
                <button onClick={handleOpenSubmit} className="hover:text-black hover:underline decoration-2 underline-offset-4">提交收录</button>
                <button onClick={() => setIsAboutModalOpen(true)} className="hover:text-black hover:underline decoration-2 underline-offset-4">联系我们</button>
            </div>
        </footer>
      </div>

      <AIConsultant tools={allTools} />
      
      <SubmitModal 
        isOpen={isSubmitModalOpen} 
        onClose={() => setIsSubmitModalOpen(false)} 
        onSubmit={handleAddTool}
        categories={categories}
        onAddCategory={handleAddCategory}
        initialTab={initialSubmitTab}
      />

      <VideoUploadModal
        isOpen={isVideoUploadModalOpen}
        onClose={() => setIsVideoUploadModalOpen(false)}
        onUpload={handleSetBackgroundVideo}
      />
      
      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      />

      <ThemeSwitcher
        isOpen={isThemeOpen}
        onClose={() => setIsThemeOpen(false)}
        currentTheme={currentTheme}
        onThemeChange={setCurrentTheme}
        onOpenVideoUpload={handleOpenVideoUpload}
      />

      <InfoModal 
        isOpen={isPrivacyOpen} 
        onClose={() => setIsPrivacyOpen(false)} 
        title="隐私政策 (Privacy Policy)"
        content={
            <div className="space-y-4">
                <p><strong>生效日期：2024年5月1日</strong></p>
                <p>欢迎使用小渝児工具箱。我们非常重视您的隐私。本隐私政策说明了我们如何收集、使用和保护您的个人信息。</p>
            </div>
        }
      />

      <InfoModal 
        isOpen={isTermsOpen} 
        onClose={() => setIsTermsOpen(false)} 
        title="服务条款 (Terms of Service)"
        content={
            <div className="space-y-4">
                <p><strong>最后更新：2024年5月1日</strong></p>
                <h3 className="font-bold text-lg">1. 接受条款</h3>
                <p>访问和使用小渝児工具箱即表示您同意遵守本服务条款。</p>
            </div>
        }
      />

      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed top-24 right-4 z-[100] animate-in slide-in-from-right-10 fade-in">
           <div className="bg-green-500 text-white px-6 py-3 rounded-lg theme-border theme-shadow font-bold flex items-center gap-2">
              <span className="bg-white text-green-500 rounded-full p-0.5"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></span>
              提交成功！
           </div>
        </div>
      )}

      {/* Bottom Marquee Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-[100] bg-black text-white h-9 flex items-center overflow-hidden border-t border-gray-800 shadow-[0_-4px_10px_rgba(0,0,0,0.3)]">
         <div className="flex-shrink-0 px-3 bg-yellow-500 text-black font-black text-xs h-full flex items-center z-10">
            <Volume2 size={14} className="mr-1" />
            公告
         </div>
         <div className="animate-marquee whitespace-nowrap flex items-center gap-20 text-xs font-bold tracking-wide">
             {/* Repeat text to ensure smooth loop */}
             <span>{marqueeText}</span>
             <span>{marqueeText}</span>
             <span>{marqueeText}</span>
             <span>{marqueeText}</span>
         </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .animate-marquee {
            animation: marquee 30s linear infinite;
        }
        @keyframes marquee {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
        }
      `}} />

    </div>
  );
};

export default App;