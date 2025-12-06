import React, { useState, useEffect } from 'react';
import { Server, CheckCircle2, XCircle, AlertCircle, Activity, Key, Cpu } from 'lucide-react';
import { validateApiConnection, configureGenAI } from '../services/geminiService';

interface ApiControlPanelProps {
  onHeightChange?: (height: number) => void;
}

const MODELS = [
  { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash (推荐)' },
  { id: 'gemini-2.5-flash-lite-latest', name: 'Gemini 2.5 Lite' },
  { id: 'gemini-3-pro-preview', name: 'Gemini 3.0 Pro' },
  { id: 'veo-3.1-generate-preview', name: 'Veo 3.1 Video (High Quality)' },
  { id: 'veo-3.1-fast-generate-preview', name: 'Veo 3.1 Video (Fast)' },
];

const ApiControlPanel: React.FC<ApiControlPanelProps> = () => {
  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState('gemini-2.5-flash');
  const [status, setStatus] = useState<'idle' | 'checking' | 'valid' | 'invalid'>('idle');
  const [isExpanded, setIsExpanded] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    const storedKey = localStorage.getItem('custom_api_key');
    const storedModel = localStorage.getItem('custom_model');
    
    if (storedKey) setApiKey(storedKey);
    if (storedModel && MODELS.some(m => m.id === storedModel)) setModel(storedModel);
    
    if (storedKey) {
        // Trigger initial validation
        validateKey(storedKey, storedModel || 'gemini-2.5-flash');
    }
  }, []);

  const validateKey = async (key: string, modelId: string) => {
    if (!key) {
        setStatus('idle');
        return;
    }

    setStatus('checking');
    
    // Auto-detect basics
    if (!key.startsWith('AIza')) {
        // Simple client-side check for Google keys, though not strictly required, good for UX
        // We allow it to pass through to actual validation just in case format changes, 
        // but maybe warn user? Let's just do real validation.
    }

    const isValid = await validateApiConnection(key, modelId);
    
    if (isValid) {
        setStatus('valid');
        configureGenAI(key, modelId);
        localStorage.setItem('custom_api_key', key);
        localStorage.setItem('custom_model', modelId);
    } else {
        setStatus('invalid');
    }
  };

  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setApiKey(val);
    
    // Debounce validation
    const timer = setTimeout(() => {
        if (val.length > 10) validateKey(val, model);
    }, 1000);
    return () => clearTimeout(timer);
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setModel(val);
    if (apiKey) validateKey(apiKey, val);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-black text-white border-b-2 border-white/20 shadow-xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 h-12 flex items-center justify-between text-xs md:text-sm font-mono">
        
        {/* Left: Branding & Status */}
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-yellow-400">
                <Server size={16} />
                <span className="font-bold tracking-wider uppercase hidden sm:inline">Core System</span>
            </div>
            
            <div className="h-6 w-[1px] bg-white/20"></div>

            <div className="flex items-center gap-2">
                <span className={`flex h-2.5 w-2.5 rounded-full ${
                    status === 'checking' ? 'bg-yellow-400 animate-pulse' :
                    status === 'valid' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]' :
                    status === 'invalid' ? 'bg-red-500' : 'bg-gray-500'
                }`}></span>
                <span className="font-bold">
                    {status === 'idle' && '未连接'}
                    {status === 'checking' && '检测中...'}
                    {status === 'valid' && '系统就绪'}
                    {status === 'invalid' && '连接失败'}
                </span>
            </div>
        </div>

        {/* Center: Input & Selector */}
        <div className="flex-1 max-w-2xl mx-4 flex items-center gap-2">
            <div className="relative flex-1 group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none text-gray-500">
                    <Key size={12} />
                </div>
                <input 
                    type="password" 
                    value={apiKey}
                    onChange={handleKeyChange}
                    placeholder="输入 Gemini API Key (AIza...)"
                    className="w-full bg-gray-900 border border-gray-700 rounded text-gray-300 pl-8 pr-2 py-1 focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400 transition-all text-xs"
                />
            </div>
            
            <div className="relative w-32 md:w-48">
                 <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none text-gray-500">
                    <Cpu size={12} />
                </div>
                <select 
                    value={model} 
                    onChange={handleModelChange}
                    className="w-full bg-gray-900 border border-gray-700 rounded text-gray-300 pl-8 pr-2 py-1 focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400 text-xs appearance-none cursor-pointer hover:bg-gray-800 transition-colors"
                >
                    {MODELS.map(m => (
                        <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                </select>
            </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
             {status === 'valid' ? (
                <div className="flex items-center gap-1 text-green-400 animate-in fade-in">
                    <Activity size={14} className="animate-bounce" />
                    <span className="hidden sm:inline">Online</span>
                </div>
             ) : (
                <button 
                    onClick={() => validateKey(apiKey, model)}
                    className="px-3 py-1 bg-yellow-400 text-black font-bold rounded hover:bg-yellow-300 transition-colors disabled:opacity-50"
                    disabled={status === 'checking' || !apiKey}
                >
                    检测
                </button>
             )}
        </div>
      </div>
    </div>
  );
};

export default ApiControlPanel;