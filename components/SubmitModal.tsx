import React, { useState, useRef, useEffect } from 'react';
import { X, Upload, Check, FolderPlus, Video, Globe, FileVideo } from 'lucide-react';
import { Category, Tool } from '../types';

interface SubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (tool: Tool) => void;
  categories: Category[];
  onAddCategory: (category: Category) => void;
  initialTab?: 'tool' | 'video'; // Added prop
}

const SubmitModal: React.FC<SubmitModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  categories,
  onAddCategory,
  initialTab = 'tool'
}) => {
  const [activeTab, setActiveTab] = useState<'tool' | 'video'>('tool');
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    category: 'chat',
    description: '',
    tags: '',
  });
  
  // Update active tab when modal opens or initialTab changes
  useEffect(() => {
     if (isOpen) {
         setActiveTab(initialTab);
     }
  }, [isOpen, initialTab]);

  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [customCategoryName, setCustomCategoryName] = useState('');

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          const videoUrl = URL.createObjectURL(file);
          setVideoPreview(videoUrl);
      }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === 'custom_new') {
      setIsCustomCategory(true);
      setFormData({ ...formData, category: '' });
    } else {
      setIsCustomCategory(false);
      setFormData({ ...formData, category: val });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let finalCategoryId = formData.category;

    if (isCustomCategory && customCategoryName.trim()) {
      const newId = `cat_${Date.now()}`;
      const newCategory: Category = {
        id: newId,
        name: customCategoryName.trim(),
        icon: <FolderPlus size={20} />
      };
      onAddCategory(newCategory);
      finalCategoryId = newId;
    } else if (isCustomCategory && !customCategoryName.trim()) {
       alert("请输入自定义分类名称");
       return;
    }

    const newTool: Tool = {
      id: Date.now().toString(),
      name: formData.name,
      url: formData.url || '#',
      category: finalCategoryId,
      description: formData.description,
      tags: formData.tags.split(/[,，]/).map(t => t.trim()).filter(Boolean),
      featured: false,
      pricing: 'Free',
      rating: 5.0,
      image: imagePreview || undefined,
      video: activeTab === 'video' && videoPreview ? videoPreview : undefined,
    };

    onSubmit(newTool);
    onClose();
    
    setFormData({ name: '', url: '', category: 'chat', description: '', tags: '' });
    setCustomCategoryName('');
    setIsCustomCategory(false);
    setImagePreview(null);
    setVideoPreview(null);
    setActiveTab('tool');
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-lg rounded-xl border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-in zoom-in-95 duration-200 overflow-hidden max-h-[90vh] flex flex-col">
        
        <div className="flex items-center justify-between p-4 border-b-2 border-black bg-yellow-300">
          <h2 className="text-xl font-black text-black">
              {activeTab === 'tool' ? '提交新工具' : '发布视频教程'}
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-white/50 rounded-lg transition-colors border-2 border-transparent hover:border-black">
            <X size={20} />
          </button>
        </div>

        <div className="flex border-b-2 border-black">
            <button 
                type="button"
                onClick={() => setActiveTab('tool')}
                className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${activeTab === 'tool' ? 'bg-white text-black' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
            >
                <Globe size={16} /> 提交工具
            </button>
            <div className="w-[2px] bg-black"></div>
            <button 
                type="button"
                onClick={() => setActiveTab('video')}
                className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${activeTab === 'video' ? 'bg-white text-black' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
            >
                <Video size={16} /> 独立视频上传
            </button>
        </div>

        <div className="overflow-y-auto p-6 space-y-4">
          <form id="submit-form" onSubmit={handleSubmit} className="space-y-4">
            
            {activeTab === 'tool' ? (
                <div className="flex items-center gap-4">
                    <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="w-20 h-20 rounded-lg border-2 border-dashed border-black bg-gray-50 hover:bg-gray-100 flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-colors"
                    >
                        {imagePreview ? (
                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                            <>
                                <Upload size={20} className="text-gray-400 mb-1" />
                                <span className="text-[10px] font-bold text-gray-400">上传图标</span>
                            </>
                        )}
                    </div>
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleImageChange} 
                        accept="image/*" 
                        className="hidden" 
                    />
                    <div className="flex-1">
                        <p className="text-sm font-bold text-black mb-1">工具图标</p>
                        <p className="text-xs text-gray-500">支持 JPG, PNG. 建议尺寸 128x128.</p>
                    </div>
                </div>
            ) : (
                <div className="space-y-3 p-4 bg-gray-50 border-2 border-dashed border-black rounded-xl">
                     <div className="flex items-center justify-between mb-2">
                         <span className="font-bold text-black flex items-center gap-2"><FileVideo size={16}/> 视频文件</span>
                         {videoPreview && <span className="text-xs text-green-600 font-bold">已选择</span>}
                     </div>
                    <div 
                        onClick={() => videoInputRef.current?.click()}
                        className="w-full h-48 rounded-lg bg-black/5 hover:bg-black/10 flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-colors relative border border-gray-300"
                    >
                        {videoPreview ? (
                            <video src={videoPreview} controls className="w-full h-full object-contain" />
                        ) : (
                            <>
                                <div className="p-3 bg-white rounded-full shadow-md mb-2">
                                    <Video size={24} className="text-blue-500" />
                                </div>
                                <span className="text-sm font-bold text-gray-600">点击选择视频文件</span>
                                <span className="text-xs text-gray-400 mt-1">支持 MP4, WebM (最大 50MB)</span>
                            </>
                        )}
                    </div>
                    <input 
                        type="file" 
                        ref={videoInputRef} 
                        onChange={handleVideoChange} 
                        accept="video/*" 
                        className="hidden" 
                    />
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-bold text-black mb-1">{activeTab === 'tool' ? '工具名称' : '教程标题'}</label>
                    <input 
                        required
                        type="text" 
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full p-2 text-sm border-2 border-black rounded-lg bg-gray-50 focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none transition-shadow"
                        placeholder={activeTab === 'tool' ? "例如: ChatGPT" : "例如: 5分钟学会 AI 绘画"}
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-black mb-1">所属分类</label>
                    <select 
                        value={isCustomCategory ? 'custom_new' : formData.category}
                        onChange={handleCategoryChange}
                        className="w-full p-2 text-sm border-2 border-black rounded-lg bg-gray-50 focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none transition-shadow"
                    >
                        {categories.filter(c => c.id !== 'all').map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                        <option value="custom_new" className="font-bold text-blue-600">+ 新增自定义分类...</option>
                    </select>
                </div>
            </div>

            {isCustomCategory && (
               <div className="bg-blue-50 border-2 border-blue-200 p-3 rounded-lg animate-in slide-in-from-top-2">
                   <label className="block text-sm font-bold text-blue-800 mb-1">新分类名称</label>
                   <input 
                       required
                       type="text"
                       value={customCategoryName}
                       onChange={e => setCustomCategoryName(e.target.value)}
                       className="w-full p-2 text-sm border-2 border-blue-300 rounded-lg bg-white focus:outline-none focus:border-blue-500"
                       placeholder="例如: AI 视频教程"
                       autoFocus
                   />
               </div>
            )}

            <div>
                <label className="block text-sm font-bold text-black mb-1">
                    {activeTab === 'tool' ? '官方网址 (URL)' : '相关链接 (可选)'}
                </label>
                <input 
                    required={activeTab === 'tool'}
                    type="url" 
                    value={formData.url}
                    onChange={e => setFormData({...formData, url: e.target.value})}
                    className="w-full p-2 text-sm border-2 border-black rounded-lg bg-gray-50 focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none transition-shadow"
                    placeholder="https://example.com"
                />
            </div>

            <div>
                <label className="block text-sm font-bold text-black mb-1">
                    {activeTab === 'tool' ? '工具简介' : '教程简介'}
                </label>
                <textarea 
                    required
                    rows={3}
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    className="w-full p-2 text-sm border-2 border-black rounded-lg bg-gray-50 focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none transition-shadow resize-none"
                    placeholder="简要描述..."
                />
            </div>

            <div>
                <label className="block text-sm font-bold text-black mb-1">标签 (用逗号分隔)</label>
                <input 
                    type="text" 
                    value={formData.tags}
                    onChange={e => setFormData({...formData, tags: e.target.value})}
                    className="w-full p-2 text-sm border-2 border-black rounded-lg bg-gray-50 focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none transition-shadow"
                    placeholder="免费, 教程, 视频..."
                />
            </div>
          </form>
        </div>

        <div className="p-4 border-t-2 border-black bg-gray-50 flex justify-end gap-3">
            <button 
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-bold text-gray-600 hover:text-black border-2 border-transparent hover:border-black rounded-lg transition-all"
            >
                取消
            </button>
            <button 
                type="submit"
                form="submit-form"
                className="px-6 py-2 text-sm font-bold text-white bg-black border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(100,100,100,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all flex items-center gap-2"
            >
                <Check size={16} /> {activeTab === 'tool' ? '提交收录' : '立即发布'}
            </button>
        </div>
      </div>
    </div>
  );
};

export default SubmitModal;