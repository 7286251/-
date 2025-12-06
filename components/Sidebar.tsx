import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Category } from '../types';

interface SidebarProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
  isOpen: boolean;
  onCloseMobile: () => void;
  onOpenSubmit: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  categories,
  selectedCategory, 
  onSelectCategory, 
  isOpen, 
  onCloseMobile,
  onOpenSubmit
}) => {
  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onCloseMobile}
        style={{ top: '3rem' }} // Account for top bar
      />

      {/* Sidebar Content */}
      <aside 
        className={`
          fixed left-0 z-40 w-64 h-[calc(100vh-3rem)] pb-4 
          transition-transform duration-300 bg-[var(--card-bg)] border-r-2 border-[var(--border-color)]
          lg:translate-x-0 lg:block
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{ top: '3rem' }}
      >
        <div className="h-full px-4 overflow-y-auto flex flex-col pt-24">
          <ul className="space-y-3 font-medium flex-1">
            {categories.map((category) => (
              <li key={category.id}>
                <button
                  onClick={() => {
                    onSelectCategory(category.id);
                    onCloseMobile();
                  }}
                  className={`
                    relative flex items-center justify-between w-full p-3 rounded-lg transition-all duration-200 group
                    ${selectedCategory === category.id 
                      ? 'border-animated shadow-lg' 
                      : 'border-2 border-transparent hover:bg-[var(--bg-color)] hover:border-[var(--border-color)]'}
                  `}
                >
                  <div className="flex items-center min-w-0 z-10 relative">
                    <span className={`transition-colors duration-200 flex-shrink-0 mr-3 ${selectedCategory === category.id ? 'text-black' : 'text-gray-500 group-hover:text-black'}`}>
                        {category.icon}
                    </span>
                    {/* Dynamic Text Effect */}
                    <span className={`font-bold truncate text-base ${selectedCategory === category.id ? 'text-shimmer' : 'text-gray-600 group-hover:text-black'}`}>
                        {category.name}
                    </span>
                  </div>
                  {selectedCategory === category.id && (
                      <ChevronRight size={16} className="text-black flex-shrink-0 z-10" />
                  )}
                </button>
              </li>
            ))}
          </ul>
          
          <div className="mt-6 px-1 mb-6">
             <div className="p-4 rounded-xl border-2 border-black bg-blue-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden group">
               <div className="relative z-10">
                   <h4 className="font-bold text-black mb-1">提交收录</h4>
                   <p className="text-xs text-gray-600 mb-3 font-medium">发现好用的 AI 工具？欢迎提交给我们。</p>
                   <button 
                     onClick={onOpenSubmit}
                     className="w-full py-2 px-3 bg-white border-2 border-black text-black text-xs font-bold rounded-lg hover:bg-blue-500 hover:text-white transition-colors"
                   >
                     + 立即提交
                   </button>
               </div>
               <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-blue-200 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
             </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;