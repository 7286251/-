import React from 'react';
import { 
  MessageSquare, 
  Image as ImageIcon, 
  Video, 
  Code, 
  Briefcase, 
  Bot,
  Layout,
  Palette,
  Headphones,
  Search,
  Server,
  BookOpen,
  Type
} from 'lucide-react';
import { Category, Tool } from './types';

export const CATEGORIES: Category[] = [
  { id: 'all', name: '全部工具', icon: <Layout size={20} /> },
  { id: 'text-effect', name: 'AI 字效', icon: <Type size={20} /> },
  { id: 'tutorial', name: 'AI 教程', icon: <BookOpen size={20} /> },
  { id: 'chat', name: 'AI 聊天助手', icon: <MessageSquare size={20} /> },
  { id: 'image', name: 'AI 图像工具', icon: <ImageIcon size={20} /> },
  { id: 'video', name: 'AI 视频工具', icon: <Video size={20} /> },
  { id: 'office', name: 'AI 办公工具', icon: <Briefcase size={20} /> },
  { id: 'agent', name: 'AI 智能体', icon: <Bot size={20} /> },
  { id: 'coding', name: 'AI 编程工具', icon: <Code size={20} /> },
  { id: 'deployment', name: 'AI 部署工具', icon: <Server size={20} /> },
  { id: 'audio', name: 'AI 音频音乐', icon: <Headphones size={20} /> },
  { id: 'design', name: 'AI 设计工具', icon: <Palette size={20} /> },
  { id: 'search', name: 'AI 搜索引擎', icon: <Search size={20} /> },
];

const CURATED_TOOLS: Tool[] = [
  // --- AI 字效 (Text Effects) ---
  {
    id: 'txt1',
    name: '流体金属 (Liquid Metal)',
    description: '即梦 4.1 模型生成的液态金属质感文字，光泽度极高，适合科幻主题。',
    url: 'https://jimeng.jianying.com',
    category: 'text-effect',
    tags: ['即梦4.1', '金属', '3D'],
    pricing: 'Free',
    image: 'https://images.unsplash.com/photo-1622542796254-5b9c46a3d2bf?q=80&w=600&auto=format&fit=crop',
    rating: 4.9,
    prompt: '3D typography "METAL", liquid chrome material, melting dripping metal, high gloss reflection, studio lighting, silver and mercury textures, 8k resolution, Jimeng 4.1 style'
  },
  {
    id: 'txt2',
    name: '毛绒萌宠 (Furry Soft)',
    description: '真实毛发触感文字，仿佛由毛绒玩具拼接而成，可爱风格。',
    url: 'https://jimeng.jianying.com',
    category: 'text-effect',
    tags: ['即梦4.1', '毛绒', '可爱'],
    pricing: 'Free',
    image: 'https://images.unsplash.com/photo-1560851691-ebb64887c711?q=80&w=600&auto=format&fit=crop',
    rating: 5.0,
    prompt: 'Soft furry typography "CUTE", plush toy texture, vibrant pastel colors, realistic fur detail, cozy lighting, 3d render, fluffy material, Jimeng 4.1'
  },
  {
    id: 'txt3',
    name: '赛博霓虹 (Cyber Neon)',
    description: '高对比度霓虹灯管效果，即梦 4.1 模型擅长的夜景光影渲染。',
    url: 'https://jimeng.jianying.com',
    category: 'text-effect',
    tags: ['即梦4.1', '霓虹', '发光'],
    pricing: 'Free',
    image: 'https://images.unsplash.com/photo-1555353540-64580b51c258?q=80&w=600&auto=format&fit=crop',
    rating: 4.8,
    prompt: 'Neon light sign text "CYBER", glowing tubes, wet rainy street reflection background, dark cyberpunk atmosphere, pink and blue lighting, realistic glass tube texture'
  },
  {
    id: 'txt4',
    name: '美味烘焙 (Bakery)',
    description: '诱人的面包、奶油材质文字，表面撒有糖霜，令人垂涎。',
    url: '#',
    category: 'text-effect',
    tags: ['即梦4.1', '食物', '创意'],
    pricing: 'Free',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop',
    rating: 4.7,
    prompt: 'Typography made of fresh baked bread, golden crust, dusted with flour, warm bakery lighting, steam rising, delicious food texture, 8k photorealistic'
  },
  {
    id: 'txt5',
    name: '蒸汽波故障 (Glitch)',
    description: '复古未来主义风格，Glitch 故障艺术文字特效，色彩分离。',
    url: '#',
    category: 'text-effect',
    tags: ['即梦4.1', '故障', '艺术'],
    pricing: 'Free',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop',
    prompt: 'Glitch art text "ERROR", datamoshing effect, RGB split, digital distortion, VHS tape aesthetic, vaporwave colors, retro computer screen pixelation'
  },
  {
    id: 'txt6',
    name: '玻璃水晶 (Crystal Glass)',
    description: '通透的折射与焦散效果，即梦 4.1 物理渲染级表现。',
    url: '#',
    category: 'text-effect',
    tags: ['即梦4.1', '玻璃', '通透'],
    pricing: 'Free',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1520697830682-bbb6e85e2b0b?q=80&w=600&auto=format&fit=crop',
    prompt: 'Transparent crystal typography "GLASS", refractive glass material, chromatic aberration, caustics, bright studio lighting, diamond facets, pristine clear 8k'
  },
  
  // --- AI 教程 (Tutorials) ---
  {
    id: 'tut1',
    name: 'Stable Diffusion 新手全攻略',
    description: '从零开始安装到精通 ControlNet，最详细的本地部署绘画教程。',
    url: 'https://www.bilibili.com/',
    category: 'tutorial',
    tags: ['SD', '入门', '绘画'],
    pricing: 'Free',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'tut2',
    name: 'Midjourney 提示词 (Prompt) 秘籍',
    description: '掌握光影、构图与风格词，让你的 MJ 出图质量提升 10 倍。',
    url: '#',
    category: 'tutorial',
    tags: ['MJ', 'Prompt', '进阶'],
    pricing: 'Free',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'tut3',
    name: 'ChatGPT 高效提问的 10 个技巧',
    description: '学会结构化提示词 (Structured Prompting)，让 AI 精准理解你的需求。',
    url: '#',
    category: 'tutorial',
    tags: ['ChatGPT', '提问技巧'],
    pricing: 'Free',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1664575602276-acd073f104c1?q=80&w=600&auto=format&fit=crop'
  },
  
  // --- Chat ---
  { id: 'chat1', name: 'ChatGPT (OpenAI)', description: '全球最知名的 AI 对话助手，基于 GPT-4 模型。', url: 'https://chat.openai.com', category: 'chat', tags: ['GPT-4', '对话', '官方'], pricing: 'Freemium', rating: 5.0 },
  { id: 'chat2', name: 'Claude 3.5 Sonnet', description: 'Anthropic 出品，拥有超强逻辑推理和代码能力的 AI。', url: 'https://claude.ai', category: 'chat', tags: ['逻辑', '代码', '长文本'], pricing: 'Freemium', rating: 4.9 },
  { id: 'chat3', name: 'Google Gemini', description: '谷歌最强多模态大模型，深度集成 Google 生态。', url: 'https://gemini.google.com', category: 'chat', tags: ['谷歌', '多模态'], pricing: 'Freemium', rating: 4.8 },
  { id: 'chat4', name: 'Kimi 智能助手', description: '月之暗面科技推出的超长无损记忆智能助手，擅长长文总结。', url: 'https://kimi.moonshot.cn', category: 'chat', tags: ['国产', '长文本', '免费'], pricing: 'Free', rating: 4.9 },
  { id: 'chat5', name: '文心一言', description: '百度推出的知识增强大语言模型。', url: 'https://yiyan.baidu.com', category: 'chat', tags: ['百度', '国产'], pricing: 'Freemium', rating: 4.5 },
  { id: 'chat6', name: '通义千问', description: '阿里推出的超大规模预训练模型。', url: 'https://tongyi.aliyun.com', category: 'chat', tags: ['阿里', '国产'], pricing: 'Free', rating: 4.6 },
  { id: 'chat7', name: 'Perplexity AI', description: '基于 AI 的实时搜索引擎，提供带引用的答案。', url: 'https://www.perplexity.ai', category: 'chat', tags: ['搜索', '引用'], pricing: 'Freemium', rating: 4.9 },
  { id: 'chat8', name: 'Poe', description: 'Quora 推出的 AI 聚合平台，可使用多种模型。', url: 'https://poe.com', category: 'chat', tags: ['聚合', '多模型'], pricing: 'Freemium', rating: 4.7 },

  // --- Image ---
  { id: 'img1', name: 'Midjourney', description: '艺术感最强的 AI 绘画工具，需在 Discord 使用。', url: 'https://midjourney.com', category: 'image', tags: ['绘画', '艺术'], pricing: 'Paid', rating: 4.9 },
  { id: 'img2', name: 'Stable Diffusion WebUI', description: '开源强大的本地部署 AI 绘画工具，控制力极强。', url: 'https://github.com/AUTOMATIC1111/stable-diffusion-webui', category: 'image', tags: ['开源', '本地'], pricing: 'Free', rating: 5.0 },
  { id: 'img3', name: 'DALL·E 3', description: 'OpenAI 出品，语义理解能力极强的绘图模型。', url: 'https://openai.com/dall-e-3', category: 'image', tags: ['OpenAI', '简单'], pricing: 'Paid', rating: 4.7 },
  { id: 'img4', name: 'Leonardo.ai', description: '专为游戏资产和艺术设计打造的绘图平台。', url: 'https://leonardo.ai', category: 'image', tags: ['游戏', '资产'], pricing: 'Freemium', rating: 4.8 },
  { id: 'img5', name: 'LiblibAI (哩布哩布)', description: '国内最大的 AI 绘画模型分享与在线运行平台。', url: 'https://www.liblib.art', category: 'image', tags: ['国产', '模型站'], pricing: 'Free', rating: 4.8 },
  { id: 'img6', name: 'Civitai', description: '全球最大的 Stable Diffusion 模型社区。', url: 'https://civitai.com', category: 'image', tags: ['模型', '社区'], pricing: 'Free', rating: 4.9 },
  { id: 'img7', name: 'Fooocus', description: '基于 SDXL 的极简绘图工具，类似 Midjourney 的体验。', url: 'https://github.com/lllyasviel/Fooocus', category: 'image', tags: ['开源', 'SDXL'], pricing: 'Free', rating: 4.8 },

  // --- Video ---
  { id: 'vid1', name: 'Runway Gen-3', description: '好莱坞级别的 AI 视频生成工具，支持高度可控。', url: 'https://runwayml.com', category: 'video', tags: ['视频生成', '电影'], pricing: 'Paid', rating: 4.8 },
  { id: 'vid2', name: 'Pika Labs', description: '擅长动画风格的视频生成工具，Discord 社区活跃。', url: 'https://pika.art', category: 'video', tags: ['动画', '生成'], pricing: 'Freemium', rating: 4.7 },
  { id: 'vid3', name: 'Sora (OpenAI)', description: 'OpenAI 发布的惊艳世界的文生视频模型（待开放）。', url: 'https://openai.com/sora', category: 'video', tags: ['最强', '待发布'], pricing: 'Paid', rating: 5.0 },
  { id: 'vid4', name: 'HeyGen', description: '数字人视频生成神器，口型同步效果极佳。', url: 'https://www.heygen.com', category: 'video', tags: ['数字人', '口型'], pricing: 'Paid', rating: 4.8 },
  { id: 'vid5', name: 'Luma Dream Machine', description: 'Luma AI 推出的高质量视频生成模型。', url: 'https://lumalabs.ai/dream-machine', category: 'video', tags: ['3D', '生成'], pricing: 'Free', rating: 4.7 },
  { id: 'vid6', name: 'Kling (可灵)', description: '快手推出的视频生成大模型，效果逼真。', url: 'https://kling.kuaishou.com', category: 'video', tags: ['国产', '快手'], pricing: 'Freemium', rating: 4.8 },
  { id: 'vid7', name: 'Vidu', description: '生数科技推出的国产视频大模型。', url: 'https://www.vidu.studio', category: 'video', tags: ['国产', '长视频'], pricing: 'Freemium', rating: 4.6 },

  // --- Coding ---
  { id: 'cod1', name: 'GitHub Copilot', description: '最流行的 AI 编程助手，自动补全代码。', url: 'https://github.com/features/copilot', category: 'coding', tags: ['编程', '补全'], pricing: 'Paid', rating: 4.9 },
  { id: 'cod2', name: 'Cursor', description: '基于 VS Code 修改的 AI 原生编辑器，集成 Copilot++。', url: 'https://cursor.sh', category: 'coding', tags: ['IDE', '编辑器'], pricing: 'Freemium', rating: 4.9 },
  { id: 'cod3', name: 'Codeium', description: '免费且强大的编程助手，支持多种 IDE。', url: 'https://codeium.com', category: 'coding', tags: ['免费', '插件'], pricing: 'Free', rating: 4.7 },
  { id: 'cod4', name: 'Devin', description: '首个全自主 AI 软件工程师。', url: 'https://www.cognition-labs.com/devin', category: 'coding', tags: ['Agent', '自主'], pricing: 'Paid', rating: 4.8 },

  // --- Audio ---
  { id: 'aud1', name: 'Suno', description: '现象级 AI 音乐生成器，一键生成完整歌曲。', url: 'https://suno.com', category: 'audio', tags: ['音乐', '歌曲'], pricing: 'Freemium', rating: 4.8 },
  { id: 'aud2', name: 'Udio', description: '高质量音乐生成，音质和结构表现出色。', url: 'https://www.udio.com', category: 'audio', tags: ['音乐', '高质量'], pricing: 'Free', rating: 4.8 },
  { id: 'aud3', name: 'ElevenLabs', description: '最逼真的 AI 语音合成 (TTS) 工具。', url: 'https://elevenlabs.io', category: 'audio', tags: ['TTS', '配音'], pricing: 'Freemium', rating: 4.9 },

  // --- Office ---
  { id: 'off1', name: 'Gamma', description: 'AI 生成 PPT 和网页，设计美观，排版自动。', url: 'https://gamma.app', category: 'office', tags: ['PPT', '排版'], pricing: 'Freemium', rating: 4.8 },
  { id: 'off2', name: 'Notion AI', description: '集成在 Notion 中的写作和整理助手。', url: 'https://www.notion.so/product/ai', category: 'office', tags: ['笔记', '写作'], pricing: 'Paid', rating: 4.7 },
  { id: 'off3', name: 'Beautiful.ai', description: '智能设计幻灯片工具。', url: 'https://www.beautiful.ai', category: 'office', tags: ['PPT', '设计'], pricing: 'Paid', rating: 4.6 },

  // --- Agent ---
  { id: 'agt1', name: 'Coze (扣子)', description: '字节跳动推出的 AI Bot 开发平台，无需代码。', url: 'https://www.coze.cn', category: 'agent', tags: ['Bot', '开发'], pricing: 'Free', rating: 4.8 },
  { id: 'agt2', name: 'Dify', description: '开源的 LLM 应用开发平台。', url: 'https://dify.ai', category: 'agent', tags: ['开源', '开发'], pricing: 'Free', rating: 4.7 },
  { id: 'agt3', name: 'GPTs', description: 'OpenAI 的自定义智能体商店。', url: 'https://chat.openai.com/gpts', category: 'agent', tags: ['Store', 'OpenAI'], pricing: 'Paid', rating: 4.6 },
];

// Generator to simulate 500+ tools for the requested "volume"
const generateFillerTools = (): Tool[] => {
    const filler: Tool[] = [];
    const baseNames = ['AI Helper', 'Smart Bot', 'CodeGen', 'ImageMaster', 'VideoPro', 'AudioWave', 'DesignMate', 'DataSense'];
    const cats = CATEGORIES.map(c => c.id).filter(id => id !== 'all');
    
    for (let i = 0; i < 450; i++) {
        const cat = cats[Math.floor(Math.random() * cats.length)];
        const nameBase = baseNames[Math.floor(Math.random() * baseNames.length)];
        filler.push({
            id: `filler-${i}`,
            name: `${nameBase} ${Math.floor(Math.random() * 1000)}`,
            description: `这是一个自动生成的示例工具 #${i + 1}，用于展示工具箱的容量。实际收录时将替换为真实数据。`,
            url: '#',
            category: cat,
            tags: ['AI', '示例', '工具'],
            pricing: Math.random() > 0.5 ? 'Free' : 'Freemium',
            rating: Number((4 + Math.random()).toFixed(1))
        });
    }
    return filler;
};

export const TOOLS: Tool[] = [...CURATED_TOOLS, ...generateFillerTools()];