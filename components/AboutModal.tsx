import React, { useState } from 'react';
import { X, MessageCircle, Link, Mail, Check } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleWechatClick = () => {
    navigator.clipboard.writeText('XiaoYu_R1999');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-md rounded-2xl border-2 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] animate-in zoom-in-95 duration-300 overflow-hidden">
        
        {/* Header Cover */}
        <div className="h-32 bg-pink-100 border-b-2 border-black relative overflow-hidden">
             {/* Decorative pattern */}
             <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#ec4899 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
             <button 
                onClick={onClose}
                className="absolute top-3 right-3 p-1.5 bg-white border-2 border-black rounded-lg hover:bg-gray-100 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 z-10"
             >
                 <X size={18} />
             </button>
        </div>

        {/* Profile Content */}
        <div className="px-6 pb-8 text-center relative">
            {/* Avatar - Updated to reference style image */}
            <div className="w-32 h-32 mx-auto -mt-16 bg-white rounded-2xl border-2 border-black p-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="w-full h-full rounded-xl overflow-hidden bg-gray-100">
                    <img 
                      src="https://images.unsplash.com/photo-1601288496920-b6154fe3626a?q=80&w=400&auto=format&fit=crop" 
                      alt="小渝児" 
                      className="w-full h-full object-cover" 
                    />
                </div>
            </div>

            <h2 className="mt-4 text-2xl font-black text-black">小渝児</h2>
            <p className="text-sm font-bold text-gray-500 mb-4 bg-gray-100 inline-block px-3 py-1 rounded-full border border-black/10">全栈开发者 & AI 探索者</p>

            <div className="bg-blue-50 border-2 border-black rounded-xl p-4 text-left mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
                <p className="text-sm text-gray-700 leading-relaxed font-medium">
                    👋 嗨！我是小渝児。
                    <br/><br/>
                    致力于为您筛选全球最好用、最前沿的 AI 工具。我相信 AI 能够改变我们的工作方式，希望这个小小的工具箱能成为你效率提升的助推器。
                    <br/><br/>
                    如有建议或合作意向，欢迎通过下方方式联系我！
                </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <a 
                   href="tencent://message/?uin=307779523&Site=XiaoYuEr&Menu=yes"
                   className="flex items-center justify-center gap-2 p-3 bg-white border-2 border-black rounded-xl hover:bg-blue-50 hover:shadow-[3px_3px_0px_0px_rgba(59,130,246,0.3)] transition-all group"
                >
                    <div className="bg-blue-100 p-1.5 rounded-full border border-black group-hover:scale-110 transition-transform">
                        <MessageCircle size={16} className="text-blue-600" />
                    </div>
                    <div className="text-left">
                        <span className="block text-[10px] text-gray-500 font-bold">QQ 联系</span>
                        <span className="block text-xs font-black">307779523</span>
                    </div>
                </a>

                <button 
                   onClick={handleWechatClick}
                   className="flex items-center justify-center gap-2 p-3 bg-white border-2 border-black rounded-xl hover:bg-green-50 hover:shadow-[3px_3px_0px_0px_rgba(34,197,94,0.3)] transition-all group relative overflow-hidden"
                >
                    {copied ? (
                        <div className="absolute inset-0 bg-green-500 flex items-center justify-center text-white font-bold animate-in fade-in">
                            <Check size={18} className="mr-1" /> 已复制!
                        </div>
                    ) : null}
                    
                    <div className="bg-green-100 p-1.5 rounded-full border border-black group-hover:scale-110 transition-transform">
                        <MessageCircle size={16} className="text-green-600" />
                    </div>
                    <div className="text-left">
                        <span className="block text-[10px] text-gray-500 font-bold">微信联系</span>
                        <span className="block text-xs font-black">XiaoYu_R1999</span>
                    </div>
                </button>
            </div>
            
            <div className="mt-6 pt-4 border-t-2 border-dashed border-gray-300">
                <p className="text-xs text-gray-400 font-bold">Make with ❤️ by XiaoYuEr</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AboutModal;