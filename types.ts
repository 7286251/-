import React from 'react';

export interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  tags: string[];
  featured?: boolean;
  pricing?: 'Free' | 'Freemium' | 'Paid';
  rating?: number;
  image?: string; // Support for uploaded image/icon URL
  video?: string; // Support for uploaded video URL
  prompt?: string; // New: Support for AI prompts
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export type ThemeStyle = 'default' | 'sketch' | 'soft' | 'glass' | 'neo' | 'retro' | 'cyber' | 'inflated' | 'cny' | 'cartoon' | 'minimal' | 'luminous-border' | 'luminous-gradient' | 'luminous-soft' | 'luminous-tech';

export interface ThemeConfig {
  id: string;
  style: ThemeStyle;
  primaryColor: string;
  secondaryColor: string;
  bgColor: string;
  name: string;
  categoryName: string; // Used for the Switcher
  // New customization fields
  customTextColor?: string;
  customBorderRadius?: number;
}