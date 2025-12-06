import React, { useState, useMemo, useEffect } from 'react';
import { X, Palette, Layout, Box, PenTool, Sparkles, Moon, Sun, Monitor, Gift, Video, Zap, Settings, Type, Move } from 'lucide-react';
import { ThemeStyle, ThemeConfig } from '../types';

interface ThemeSwitcherProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: ThemeConfig;
  onThemeChange: (theme: ThemeConfig) => void;
  onOpenVideoUpload: () => void;
}

// Define the Categories
const THEME_CATEGORIES = [
  { id: 'luminous', name: '流光特效 (Luminous)', icon: <Zap size={18} className="text-yellow-500" /> },
  { id: 'default', name: '经典默认 (Classic)', icon: <Layout size={18} /> },
  { id: 'sketch', name: '手绘风格 (Sketch)', icon: <PenTool size={18} /> },
  { id: 'inflated', name: '3D膨胀 (Inflated)', icon: <Box size={18} /> },
  { id: 'neo', name: '新粗野 (Neo-Brutal)', icon: <Sun size={18} /> },
  { id: 'soft', name: '新拟态 (Neumorphism)', icon: <Moon size={18} /> },
  { id: 'glass', name: '磨砂玻璃 (Glass)', icon: <Sparkles size={18} /> },
  { id: 'cny', name: '新年气氛 (Festive)', icon: <Gift size={18} /> },
  { id: 'cartoon', name: '动态卡通 (Cartoon)', icon: <Sparkles size={18} /> },
  { id: 'cyber', name: '赛博朋克 (Cyber)', icon: <Monitor size={18} /> },
  { id: 'minimal', name: '极简主义 (Minimal)', icon: <Layout size={18} /> },
];

const BASE_PALETTES = [
    { name: '活力黄', p: '#facc15', s: '#3b82f6', b: '#f8fafc' },
    { name: '樱花粉', p: '#f472b6', s: '#ec4899', b: '#fdf2f8' },
    { name: '薄荷绿', p: '#34d399', s: '#059669', b: '#ecfdf5' },
    { name: '天空蓝', p: '#60a5fa', s: '#2563eb', b: '#eff6ff' },
    { name: '极夜黑', p: '#ffffff', s: '#9ca3af', b: '#111827' },
    { name: '日落橙', p: '#fb923c', s: '#ea580c', b: '#fff7ed' },
    { name: '丁香紫', p: '#c084fc', s: '#9333ea', b: '#faf5ff' },
    { name: '复古灰', p: '#94a3b8', s: '#475569', b: '#f1f5f9' },
    { name: '青柠黄', p: '#a3e635', s: '#65a30d', b: '#f7fee7' },
    { name: '热烈红', p: '#f87171', s: '#dc2626', b: '#fef2f2' },
    { name: '宝石蓝', p: '#3b82f6', s: '#1d4ed8', b: '#eff6ff' },
    { name: '翡翠绿', p: '#10b981', s: '#047857', b: '#ecfdf5' },
    { name: '珊瑚红', p: '#fb7185', s: '#e11d48', b: '#fff1f2' },
    { name: '紫罗兰', p: '#8b5cf6', s: '#6d28d9', b: '#f5f3ff' },
    { name: '琥珀金', p: '#f59e0b', s: '#b45309', b: '#fffbeb' },
    { name: '青色',   p: '#06b6d4', s: '#0891b2', b: '#ecfeff' },
    { name: '玫瑰',   p: '#e11d48', s: '#be123c', b: '#fff1f2' },
    { name: '石板灰', p: '#64748b', s: '#334155', b: '#f8fafc' },
    { name: '墨绿',   p: '#065f46', s: '#064e3b', b: '#f0fdfa' },
    { name: '酒红',   p: '#9f1239', s: '#881337', b: '#fff1f2' },
    { name: '深蓝',   p: '#1e3a8a', s: '#172554', b: '#eff6ff' },
    { name: '巧克力', p: '#78350f', s: '#451a03', b: '#fffbeb' },
    { name: '橄榄',   p: '#65a30d', s: '#3f6212', b: '#f7fee7' },
    { name: '紫红',   p: '#c026d3', s: '#a21caf', b: '#fdf4ff' },
    { name: '桃红',   p: '#db2777', s: '#be185d', b: '#fdf2f8' },
    { name: '海蓝',   p: '#0ea5e9', s: '#0284c7', b: '#f0f9ff' },
    { name: '草绿',   p: '#22c55e', s: '#16a34a', b: '#f0fdf4' },
    { name: '深紫',   p: '#5b21b6', s: '#4c1d95', b: '#f5f3ff' },
    { name: '灰蓝',   p: '#475569', s: '#334155', b: '#f8fafc' },
    { name: '纯白',   p: '#000000', s: '#333333', b: '#ffffff' },
];

const LUMINOUS_PALETTES = [
    { name: '赛博霓虹', p: '#00ff41', s: '#fcee0a', b: '#050505' },
    { name: '梦幻极光', p: '#a855f7', s: '#3b82f6', b: '#0f172a' },
    { name: '镭射日落', p: '#f472b6', s: '#fb923c', b: '#2a0a18' },
    { name: '量子蓝',   p: '#22d3ee', s: '#3b82f6', b: '#020617' },
    { name: '酸性绿',   p: '#bef264', s: '#84cc16', b: '#1a2e05' },
    { name: '等离子紫', p: '#d8b4fe', s: '#c084fc', b: '#1e1b4b' },
    { name: '深红核心', p: '#fb7185', s: '#e11d48', b: '#25080e' },
    { name: '冰川白',   p: '#e0f2fe', s: '#7dd3fc', b: '#082f49' },
];

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ 
  isOpen, 
  onClose, 
  currentTheme, 
  onThemeChange,
  onOpenVideoUpload 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('luminous');
  const [showSettings, setShowSettings] = useState(false);
  
  // Custom Settings State
  const [customTextColor, setCustomTextColor] = useState(currentTheme.customTextColor || '#0f172a');
  const [customRadius, setCustomRadius] = useState(currentTheme.customBorderRadius || 12);

  // Marquee State
  const [marqueeText, setMarqueeText] = useState('');

  // Update Settings when theme changes externally
  useEffect(() => {
    setCustomTextColor(currentTheme.customTextColor || '#0f172a');
    setCustomRadius(currentTheme.customBorderRadius !== undefined ? currentTheme.customBorderRadius : 12);
  }, [currentTheme]);

  // Clock & Greeting Logic
  useEffect(() => {
    const updateTimeAndGreeting = () => {
      const now = new Date();
      // Format: 2025/12/6 星期六
      const datePart = now.toLocaleDateString('zh-CN', { year: 'numeric', month: 'numeric', day: 'numeric', weekday: 'long' }).replace(/年|月/g, '/').replace('日', '');
      const timePart = now.toLocaleTimeString('zh-CN', { hour12: false, hour: '2-digit', minute: '2-digit' });
      
      const hour = now.getHours();
      let period = '';
      let message = '';
      
      if (hour >= 5 && hour < 9) {
          period = "早晨";
          message = "新的一天开始了，请保持最好的心情迎接新的一天。记得吃早餐哟，上班路上注意安全";
      } else if (hour >= 9 && hour < 12) {
          period = "上午";
          message = "工作再忙也要记得喝水，保持高效状态";
      } else if (hour >= 12 && hour < 14) {
          period = "中午";
          message = "午餐时间到了，休息一下，补充能量再出发";
      } else if (hour >= 14 && hour < 18) {
          period = "下午";
          message = "在这个充满创意的时刻，用 AI 激发无限灵感吧";
      } else if (hour >= 18 && hour < 22) {
          period = "晚上";
          message = "准备下班了，注意回家的路上车辆过往";
      } else {
          period = "深夜";
          message = "夜深了，早点休息，明天会更好";
      }

      // Final format: 2025/12/6 星期六 晚上的18:51准备下班了，注意回家的路上车辆过往
      setMarqueeText(`${datePart} ${period}的${timePart} ${message}`);
    };

    updateTimeAndGreeting();
    const interval = setInterval(updateTimeAndGreeting, 10000); // Update every 10s
    return () => clearInterval(interval);
  }, []);

  const handleSettingsSave = () => {
      onThemeChange({
          ...currentTheme,
          customTextColor: customTextColor,
          customBorderRadius: customRadius
      });
  };

  const displayedThemes = useMemo(() => {
    const categoryInfo = THEME_CATEGORIES.find(c => c.id === selectedCategory);
    if (!categoryInfo) return [];

    if (selectedCategory === 'luminous') {
        const styles: ThemeStyle[] = ['luminous-border', 'luminous-gradient', 'luminous-soft', 'luminous-tech'];
        const styleNames = ['流光边框', '磨砂渐变', '柔光霓虹', '未来科技'];
        
        const generated: ThemeConfig[] = [];
        styles.forEach((style, styleIdx) => {
            LUMINOUS_PALETTES.forEach((palette, colorIdx) => {
                generated.push({
                    style: style,
                    name: `${styleNames[styleIdx]} - ${palette.name}`,
                    categoryName: categoryInfo.name,
                    primaryColor: palette.p,
                    secondaryColor: palette.s,
                    bgColor: palette.b,
                    id: `lum-${style}-${colorIdx}`,
                    customTextColor: customTextColor, // Preserve custom settings
                    customBorderRadius: customRadius
                });
            });
        });
        return generated;
    }

    return BASE_PALETTES.map((palette, index) => ({
      style: selectedCategory as ThemeStyle,
      name: `${palette.name}`,
      categoryName: categoryInfo.name,
      primaryColor: palette.p,
      secondaryColor: palette.s,
      bgColor: palette.b,
      id: `${selectedCategory}-${index}`,
      customTextColor: customTextColor, // Preserve custom settings
      customBorderRadius: customRadius
    }));
  }, [selectedCategory, customTextColor, customRadius]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop - Clicking here closes the modal */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
      
      {/* Modal Content - Clicking here STOPS propagation to backdrop, preventing close */}
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="relative bg-white w-full max-w-5xl rounded-2xl border-2 border-black shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden h-[85vh] flex flex-col animate-in zoom-in-95 duration-200"
      >
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b-2 border-black bg-gradient-to-r from-yellow-300 via-pink-300 to-blue-300 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-black text-white p-2 rounded-lg">
                <Palette size={20} />
            </div>
            <div>
                <h2 className="text-xl font-black text-black leading-none">随心主题工坊</h2>
                <p className="text-xs font-bold text-gray-700 mt-1">300+ 款独家设计风格，点击即时应用</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
             <button 
                onClick={() => {
                   onClose(); // Close Workshop
                   onOpenVideoUpload(); // Open Custom Video Upload
                }}
                className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white border-2 border-black rounded-lg text-xs font-bold hover:bg-black hover:text-white transition-colors"
             >
                <Video size={14} />
                自定义上传视频
             </button>
             
             {/* Settings Toggle */}
             <button 
                onClick={() => setShowSettings(!showSettings)}
                className={`p-2 rounded-full border-2 border-black transition-colors ${showSettings ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'}`}
             >
                 <Settings size={20} />
             </button>

             <button onClick={onClose} className="p-2 bg-white rounded-full border-2 border-black hover:bg-black hover:text-white transition-colors">
               <X size={20} />
             </button>
          </div>
        </div>

        {/* Settings Panel (Collapsible) */}
        {showSettings && (
            <div className="bg-gray-100 border-b-2 border-black p-4 flex flex-col md:flex-row gap-6 animate-in slide-in-from-top-2 flex-shrink-0">
                <div className="flex-1">
                    <label className="flex items-center gap-2 text-sm font-bold mb-2">
                        <Type size={16} /> 全局文字颜色
                    </label>
                    <div className="flex items-center gap-2">
                        <input 
                            type="color" 
                            value={customTextColor}
                            onChange={(e) => {
                                setCustomTextColor(e.target.value);
                                handleSettingsSave(); // Apply immediately roughly
                            }}
                            className="h-10 w-20 border-2 border-black rounded cursor-pointer p-0.5 bg-white"
                        />
                        <span className="text-xs font-mono">{customTextColor}</span>
                    </div>
                </div>
                <div className="flex-1">
                    <label className="flex items-center gap-2 text-sm font-bold mb-2">
                        <Move size={16} /> 边框圆角 (Radius)
                    </label>
                    <div className="flex items-center gap-2">
                        <input 
                            type="range" 
                            min="0" 
                            max="50" 
                            value={customRadius}
                            onChange={(e) => {
                                setCustomRadius(Number(e.target.value));
                                handleSettingsSave();
                            }}
                            className="w-full accent-black"
                        />
                        <span className="text-xs font-mono w-12 text-right">{customRadius}px</span>
                    </div>
                </div>
                <div className="flex items-end">
                    <button 
                        onClick={() => {
                            setCustomTextColor('#0f172a');
                            setCustomRadius(12);
                            handleSettingsSave();
                        }}
                        className="px-4 py-2 text-xs font-bold text-red-600 bg-white border-2 border-red-200 rounded hover:bg-red-50 hover:border-red-400"
                    >
                        重置默认
                    </button>
                </div>
            </div>
        )}

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-48 bg-gray-50 border-r-2 border-black flex flex-col overflow-y-auto flex-shrink-0">
            <div className="p-3 space-y-2">
                {THEME_CATEGORIES.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all duration-200 text-left ${
                            selectedCategory === cat.id 
                            ? 'bg-black text-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] translate-x-1' 
                            : 'bg-white text-gray-700 border-transparent hover:border-gray-300 hover:bg-gray-100'
                        }`}
                    >
                        {cat.icon}
                        <span className="text-xs font-bold">{cat.name}</span>
                    </button>
                ))}
            </div>
          </div>

          {/* Theme Grid */}
          <div className="flex-1 overflow-y-auto p-6 bg-gray-100">
            <div className="mb-4">
                 <h3 className="text-lg font-black text-gray-800 flex items-center gap-2">
                    {THEME_CATEGORIES.find(c => c.id === selectedCategory)?.icon}
                    {THEME_CATEGORIES.find(c => c.id === selectedCategory)?.name}
                 </h3>
                 <p className="text-sm text-gray-500">点击任意主题即可实时应用</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {displayedThemes.map((theme) => (
                    <button
                        key={theme.id}
                        onClick={() => {
                            onThemeChange({
                                ...theme,
                                customTextColor: customTextColor,
                                customBorderRadius: customRadius
                            });
                            // FIX: Automatically close the modal after selecting a theme
                            onClose();
                        }}
                        className="group relative flex flex-col rounded-xl overflow-hidden border-2 border-transparent hover:border-black hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 bg-white"
                        style={{ borderRadius: `${customRadius}px` }}
                    >
                        {/* Preview Box */}
                        <div 
                            className="h-24 w-full flex items-center justify-center relative overflow-hidden"
                            style={{ backgroundColor: theme.bgColor }}
                        >
                            <div className="w-16 h-16 shadow-sm flex items-center justify-center transform group-hover:scale-110 transition-transform"
                                 style={{ 
                                     backgroundColor: theme.bgColor === '#111827' || theme.bgColor === '#050505' || theme.bgColor === '#020617' ? '#1f2937' : '#ffffff',
                                     border: `2px solid ${theme.primaryColor}`,
                                     borderRadius: `${customRadius}px`
                                 }}
                            >
                                <div className="w-8 h-8 rounded-full" style={{ backgroundColor: theme.secondaryColor }}></div>
                            </div>
                            
                            {theme.style === 'sketch' && <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIi8+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMwMDAiLz4KPC9zdmc+')]"></div>}
                            {theme.style === 'glass' && <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]"></div>}
                            
                            {theme.style === 'luminous-border' && (
                                <div className="absolute inset-0 border-[4px] border-transparent" style={{borderImage: `linear-gradient(to right, ${theme.primaryColor}, ${theme.secondaryColor}) 1`}}></div>
                            )}
                            {theme.style === 'luminous-gradient' && (
                                <div className="absolute inset-0 opacity-50" style={{background: `linear-gradient(45deg, ${theme.primaryColor}, transparent)`}}></div>
                            )}
                        </div>
                        
                        {/* Label */}
                        <div className="p-2 bg-white border-t border-gray-100 flex justify-between items-center w-full">
                            <span className="text-xs font-bold text-gray-800 truncate pr-2" style={{ color: customTextColor }}>{theme.name}</span>
                            <div className="flex gap-1 flex-shrink-0">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.primaryColor }}></div>
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.secondaryColor }}></div>
                            </div>
                        </div>

                        {/* Active Indicator */}
                        {currentTheme.style === theme.style && currentTheme.primaryColor === theme.primaryColor && (
                            <div className="absolute top-2 right-2 bg-black text-white p-1 rounded-full shadow-lg">
                                <Sparkles size={12} />
                            </div>
                        )}
                    </button>
                ))}
            </div>
          </div>
        </div>

        {/* Footer info with Smart Marquee */}
        <div className="p-0 bg-black text-white border-t-2 border-black flex items-center overflow-hidden h-10 relative flex-shrink-0">
            <div className="absolute inset-0 flex items-center whitespace-nowrap animate-marquee">
                {[1, 2, 3].map(i => (
                    <span key={i} className="mx-8 flex items-center gap-2">
                        <span className="font-bold text-sm tracking-wide">{marqueeText}</span>
                    </span>
                ))}
            </div>

            {/* Mobile Action Button overlaid */}
             <button 
                onClick={() => {
                   onClose();
                   onOpenVideoUpload();
                }}
                className="md:hidden absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 px-3 py-1 bg-white text-black border-2 border-white rounded-lg text-xs font-bold z-10 hover:bg-gray-200"
             >
                <Video size={12} />
                上传视频
             </button>
        </div>
        
        {/* Style for marquee */}
        <style dangerouslySetInnerHTML={{__html: `
            .animate-marquee {
                animation: marquee 25s linear infinite;
            }
            @keyframes marquee {
                from { transform: translateX(100%); }
                to { transform: translateX(-100%); }
            }
        `}} />
      </div>
    </div>
  );
};

export default ThemeSwitcher;