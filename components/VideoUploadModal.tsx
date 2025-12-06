import React, { useRef } from 'react';
import { X, Upload, Video } from 'lucide-react';

interface VideoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (videoUrl: string) => void;
}

const VideoUploadModal: React.FC<VideoUploadModalProps> = ({ 
  isOpen, 
  onClose, 
  onUpload 
}) => {
  const videoInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          const videoUrl = URL.createObjectURL(file);
          // Auto apply and close
          onUpload(videoUrl);
          onClose();
      }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-md rounded-2xl border-2 border-black shadow-[8px_8px_0px_0px_rgba(255,255,255,0.5)] animate-in zoom-in-95 duration-200 overflow-hidden flex flex-col">
        
        <div className="flex items-center justify-between p-4 border-b-2 border-black bg-purple-400">
          <h2 className="text-xl font-black text-white flex items-center gap-2">
              <Video size={24} className="text-white" /> 上传背景视频
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors text-white">
            <X size={20} />
          </button>
        </div>

        <div className="p-8 flex flex-col items-center justify-center space-y-6">
            <div 
                className="w-full h-40 rounded-xl border-4 border-dashed border-purple-300 bg-purple-50 hover:bg-purple-100 hover:border-purple-500 cursor-pointer flex flex-col items-center justify-center transition-all group"
                onClick={() => videoInputRef.current?.click()}
            >
                <div className="p-4 bg-white rounded-full border-2 border-purple-200 shadow-sm group-hover:scale-110 transition-transform mb-3">
                    <Upload size={32} className="text-purple-600" />
                </div>
                <p className="font-bold text-purple-900">点击选择视频文件</p>
                <p className="text-xs text-purple-600 mt-1">支持 MP4, WebM (无大小限制)</p>
            </div>
            
            <input 
                type="file" 
                ref={videoInputRef} 
                onChange={handleVideoChange} 
                accept="video/*" 
                className="hidden" 
            />

            <div className="text-center space-y-1">
                 <p className="text-xs font-bold text-gray-500">上传后将自动应用为网站全屏背景</p>
                 <p className="text-[10px] text-gray-400">仅在当前会话有效</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default VideoUploadModal;