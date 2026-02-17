
import React from 'react';

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export enum LayoutSection {
  HERO = 'hero',
  FEATURES = 'features',
  FOOTER = 'footer'
}
