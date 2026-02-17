
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, Loader2 } from 'lucide-react';
import { getGeminiResponse } from '@/services/geminiService';
import { Message } from '@/types/types';

const Assistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Olá! Sou o assistente inteligente da GoTracker. Como posso ajudar você hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    const botResponse = await getGeminiResponse(userMsg);
    
    setMessages(prev => [...prev, { role: 'assistant', content: botResponse }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[320px] md:w-[380px] h-[500px] bg-white dark:bg-[#0B122E] border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-slate-50 to-white dark:from-[#0B122E] dark:to-[#1a254d] border-b border-slate-200 dark:border-white/10 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-[#F48120] p-2 rounded-lg">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-[#0B122E] dark:text-white font-bold text-sm transition-colors">GoTracker AI</h3>
                <span className="text-[10px] text-green-500 dark:text-green-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 dark:bg-green-400 animate-pulse"></span>
                  Online
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 dark:text-white/40 hover:text-[#0B122E] dark:hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-grow p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-white/10 bg-slate-50/50 dark:bg-transparent transition-colors">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  m.role === 'user' 
                    ? 'bg-[#F48120] text-white rounded-tr-none shadow-md shadow-orange-900/10' 
                    : 'bg-white dark:bg-white/5 text-slate-700 dark:text-white/80 rounded-tl-none border border-slate-200 dark:border-white/5 shadow-sm'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-white/5 p-3 rounded-2xl rounded-tl-none border border-slate-200 dark:border-white/5">
                  <Loader2 className="w-4 h-4 text-[#F48120] animate-spin" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02]">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Pergunte algo..."
                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-3 pl-4 pr-12 text-[#0B122E] dark:text-white text-sm focus:outline-none focus:border-[#F48120]/50 placeholder:text-slate-400 dark:placeholder:text-white/20 transition-all"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="absolute right-2 top-1.5 p-2 text-[#F48120] hover:text-[#d96e1a] transition-colors disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#F48120] rounded-full flex items-center justify-center text-white shadow-xl shadow-orange-900/30 dark:shadow-orange-900/40 transform hover:scale-110 active:scale-95 transition-all duration-300 relative group"
      >
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-slate-50 dark:border-[#0B122E] rounded-full"></span>
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>
    </div>
  );
};

export default Assistant;
