import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Loader2, Sparkles } from 'lucide-react';
import { Message, Tool } from '../types';
import { getToolRecommendations } from '../services/geminiService';

interface AIConsultantProps {
  tools: Tool[];
}

const AIConsultant: React.FC<AIConsultantProps> = ({ tools }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: '你好！我是小渝児，你的 AI 助手。有什么可以帮你的吗？' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const responseText = await getToolRecommendations(userMsg, tools);

    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 z-40 bg-black text-white p-4 rounded-full shadow-[4px_4px_0px_0px_rgba(255,200,0,1)] border-2 border-white hover:scale-110 transition-transform flex items-center justify-center ${isOpen ? 'hidden' : 'flex'}`}
        aria-label="Open AI Assistant"
      >
        <MessageCircle size={32} />
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[90vw] max-w-[380px] h-[550px] flex flex-col bg-white border-2 border-black rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)] overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300">
          {/* Header */}
          <div className="bg-yellow-400 p-4 border-b-2 border-black flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-white border-2 border-black p-1.5 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <Bot className="text-black" size={20} />
              </div>
              <div>
                <h3 className="font-black text-black text-base">AI 选品顾问</h3>
                <div className="flex items-center gap-1">
                    <Sparkles size={10} className="text-black" />
                    <p className="text-black/80 text-xs font-bold">小渝児为您服务</p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-black hover:bg-white/50 rounded p-1 transition-colors border-2 border-transparent hover:border-black"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 scroll-smooth">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`
                    max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed font-medium border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]
                    ${msg.role === 'user' 
                      ? 'bg-blue-500 text-white rounded-br-none' 
                      : 'bg-white text-black rounded-bl-none'}
                  `}
                >
                  {/* Simple Markdown-like parsing for bold text */}
                  {msg.text.split('**').map((part, i) => 
                    i % 2 === 1 ? <strong key={i} className="font-black underline decoration-yellow-400 decoration-2">{part}</strong> : part
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border-2 border-black rounded-2xl rounded-bl-none px-4 py-3 flex items-center gap-2">
                  <span className="text-xs font-bold">思考中</span>
                  <Loader2 className="animate-spin text-black" size={14} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t-2 border-black">
            <div className="relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="想要找什么工具？..."
                className="w-full bg-gray-100 border-2 border-black text-black rounded-xl pl-4 pr-12 py-3 text-sm focus:ring-0 focus:bg-white transition-colors resize-none h-[54px] scrollbar-hide placeholder-gray-500 font-medium"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Send size={16} />
              </button>
            </div>
            <div className="text-center mt-2">
                <span className="text-[10px] text-gray-400 font-medium">
                    AI 可能会犯错，请以实际体验为准。
                </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIConsultant;