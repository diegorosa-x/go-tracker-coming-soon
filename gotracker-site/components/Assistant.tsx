import React, { useState, useRef, useEffect, useMemo } from "react";
import { MessageSquare, Send, X, Bot } from "lucide-react";
import { getChatResponse } from "@/services/chatService";
import { Message } from "@/types/types";
import { AnimatePresence, motion, Variants } from "framer-motion";

/** Animations */
const panelVariants: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.98, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.25, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: 18,
    scale: 0.98,
    filter: "blur(6px)",
    transition: { duration: 0.18, ease: "easeIn" },
  },
};

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const messageVariants: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.18, ease: "easeOut" },
  },
};

const buttonVariants: Variants = {
  idle: { scale: 1 },
  hover: { scale: 1.08 },
  tap: { scale: 0.95 },
};

/** Typing dots */
const TypingDots: React.FC = () => (
  <div className="flex items-center gap-1.5">
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        className="w-2 h-2 rounded-full bg-[#F48120]"
        initial={{ opacity: 0.4, y: 0 }}
        animate={{ opacity: [0.4, 1, 0.4], y: [0, -3, 0] }}
        transition={{
          duration: 0.9,
          repeat: Infinity,
          delay: i * 0.12,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

/** Hook: typewriter */
function useTypewriter(text: string, enabled: boolean, speed = 14) {
  const [out, setOut] = useState(enabled ? "" : text);

  useEffect(() => {
    if (!enabled) {
      setOut(text);
      return;
    }

    setOut("");
    let i = 0;
    const id = window.setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) window.clearInterval(id);
    }, speed);

    return () => window.clearInterval(id);
  }, [text, enabled, speed]);

  return out;
}

/** Component for a single message */
const ChatBubble: React.FC<{
  message: Message;
  isLastAssistant: boolean;
}> = ({ message, isLastAssistant }) => {
  const isUser = message.role === "user";
  const typed = useTypewriter(message.content, isLastAssistant && !isUser, 45);

  return (
    <motion.div
      variants={messageVariants}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[85%] p-3 rounded-2xl text-sm ${
          isUser
            ? "bg-[#F48120] text-white rounded-tr-none shadow-md shadow-orange-900/10"
            : "bg-white dark:bg-white/5 text-slate-700 dark:text-white/80 rounded-tl-none border border-slate-200 dark:border-white/5 shadow-sm"
        }`}
      >
        {/* typewriter only on last assistant bubble */}
        {isLastAssistant && !isUser ? typed : message.content}
      </div>
    </motion.div>
  );
};

const Assistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Olá! Sou o assistente inteligente da GoTracker. Como posso ajudar você hoje?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showTyping, setShowTyping] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  // ✅ evita warning de timeout pendurado / múltiplos timeouts
  const replyTimeoutRef = useRef<number | null>(null);
  useEffect(() => {
    return () => {
      if (replyTimeoutRef.current) {
        window.clearTimeout(replyTimeoutRef.current);
        replyTimeoutRef.current = null;
      }
    };
  }, []);

  const lastAssistantIndex = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === "assistant") return i;
    }
    return -1;
  }, [messages]);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isOpen, showTyping]);

  const MIN_TYPING_MS = 2000;

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    // limpa timeout anterior (se usuário mandar várias mensagens rápido)
    if (replyTimeoutRef.current) {
      window.clearTimeout(replyTimeoutRef.current);
      replyTimeoutRef.current = null;
    }

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setIsLoading(true);
    setShowTyping(true);

    const start = Date.now();

    try {
      const botResponse = await getChatResponse(text);

      const elapsed = Date.now() - start;
      const wait = Math.max(0, MIN_TYPING_MS - elapsed);

      replyTimeoutRef.current = window.setTimeout(() => {
        setShowTyping(false);
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: botResponse },
        ]);
        setIsLoading(false);
        replyTimeoutRef.current = null;
      }, wait);
    } catch (err) {
      console.log("err", err)
      setShowTyping(false);
      setIsLoading(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Ops! Não consegui responder agora. Tenta de novo?",
        },
      ]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="panel"
            variants={panelVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="mb-4 w-[320px] md:w-[380px] h-[500px] bg-white dark:bg-[#0B122E] border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-slate-50 to-white dark:from-[#0B122E] dark:to-[#1a254d] border-b border-slate-200 dark:border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 260 }}
                  className="bg-[#F48120] p-2 rounded-lg"
                >
                  <Bot className="w-5 h-5 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-[#0B122E] dark:text-white font-bold text-sm">
                    GoTracker AI
                  </h3>
                  <span className="text-[10px] text-green-500 dark:text-green-400 flex items-center gap-1">
                    <motion.span
                      className="w-1.5 h-1.5 rounded-full bg-green-500 dark:bg-green-400"
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                    />
                    Online
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 dark:text-white/40 hover:text-[#0B122E] dark:hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 min-h-0">
              <div
                ref={scrollRef}
                className="h-full p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-white/10 bg-slate-50/50 dark:bg-transparent transition-colors"
              >
                <motion.div
                  variants={listVariants}
                  initial="hidden"
                  animate="show"
                  className="space-y-4"
                >
                  <AnimatePresence initial={false}>
                    {messages.map((m, i) => (
                      <ChatBubble
                        key={`${m.role}-${i}-${m.content.slice(0, 10)}`}
                        message={m}
                        isLastAssistant={i === lastAssistantIndex}
                      />
                    ))}
                  </AnimatePresence>

                  <AnimatePresence>
                    {showTyping && (
                      <motion.div
                        key="typing"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="flex justify-start"
                      >
                        <div className="bg-white dark:bg-white/5 p-3 rounded-2xl rounded-tl-none border border-slate-200 dark:border-white/5 shadow-sm">
                          <TypingDots />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="relative"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Pergunte algo..."
                  className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-3 pl-4 pr-12 text-[#0B122E] dark:text-white text-sm focus:outline-none focus:border-[#F48120]/50 placeholder:text-slate-400 dark:placeholder:text-white/20 transition-all"
                />

                <motion.button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="absolute right-2 top-1.5 p-2 text-[#F48120] hover:text-[#d96e1a] transition-colors disabled:opacity-50"
                  aria-label="Enviar mensagem"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        variants={buttonVariants}
        initial="idle"
        whileHover="hover"
        whileTap="tap"
        transition={{ type: "spring", stiffness: 260 }}
        className="w-14 h-14 bg-[#F48120] rounded-full flex items-center justify-center text-white shadow-xl shadow-orange-900/30 dark:shadow-orange-900/40 relative group"
      >
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full bg-[#F48120]/40"
          animate={{ scale: [1, 1.25, 1], opacity: [0.25, 0, 0.25] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />

        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-slate-50 dark:border-[#0B122E] rounded-full z-10" />

        <motion.span
          key={isOpen ? "close" : "open"}
          initial={{ rotate: -20, opacity: 0, scale: 0.9 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="relative z-10"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        </motion.span>
      </motion.button>
    </div>
  );
};

export default Assistant;
