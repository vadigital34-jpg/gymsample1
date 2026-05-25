import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Dumbbell, Sparkles, AlertCircle, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ChatMessage } from "../types";

const SUGGESTIONS = [
  "Which membership is best?",
  "Tell me about trainer Marcus",
  "How to design a fat loss plan",
  "What is the Elite Absolute protocol?",
  "Book a free orientation"
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Welcome, high achiever. I am **KRONOS**, your elite AI fitness concierge. I can plan your workout routine, design calorie macros, or guide you through our premium membership clubs. What results are you pursuing today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  // Dismiss notification indicator after first open
  useEffect(() => {
    if (isOpen) {
      setShowNotification(false);
    }
  }, [isOpen]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = { role: "user", content: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);
    setApiError(null);

    const updatedMessages = [...messages, userMsg];

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to communicate with our AI engine.");
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
    } catch (err: any) {
      console.error("Chat error:", err);
      setApiError(err.message || "Unable to reach KRONOS AI.");
      // Graceful fallback response injection
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "*(Offline Protocol Restored)* I apologize, high achiever. Connection to my secondary neural processing nodes is limited. However, you can secure access by completing an entry application, or checking out our training schedules on the portal!"
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        <AnimatePresence>
          {showNotification && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 10 }}
              className="bg-zinc-950 border border-rose-900 text-rose-100 text-xs px-3 py-2 rounded-lg shadow-xl mb-3 max-w-xs relative text-right flex items-center gap-2"
            >
              <div className="w-2 h-2 rounded-full bg-rose-600 animate-ping absolute -top-1 -right-1" />
              <Sparkles className="w-4 h-4 text-rose-500 shrink-0" />
              <span>Ask KRONOS Elite Coach AI Anything</span>
              <button onClick={() => setShowNotification(false)} className="hover:text-rose-400 font-bold ml-1">
                <X className="w-3 h-3" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative bg-zinc-950 border border-rose-600 p-4 rounded-full text-rose-600 hover:text-rose-100 hover:bg-rose-900/40 shadow-2xl transition-all duration-300 md:animate-glow hover:animate-none cursor-pointer flex items-center justify-center group"
          style={{ boxShadow: "0 0 20px rgba(225, 29, 72, 0.4)" }}
          id="btn-chatbot-toggle"
        >
          {isOpen ? <X className="w-6 h-6 animate-spin-once" /> : <MessageSquare className="w-6 h-6 group-hover:rotate-12 transition-transform" />}
        </motion.button>
      </div>

      {/* AI Chat Window Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-24 right-5 sm:right-6 w-[92vw] sm:w-[450px] h-[600px] z-50 rounded-2xl flex flex-col overflow-hidden border border-zinc-800 shadow-2xl bg-zinc-950/95 backdrop-blur-xl"
            id="window-chatbot"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-zinc-950 to-zinc-900 p-4 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2-5 bg-rose-950/50 border border-rose-600/50 rounded-lg text-rose-500 animate-pulse">
                  <Dumbbell className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-semibold tracking-wide text-rose-100 flex items-center gap-1.5 text-sm sm:text-base">
                    KRONOS AI SYSTEM
                    <span className="text-[10px] uppercase font-mono tracking-widest bg-rose-600/20 text-rose-400 px-1.5 py-0.5 rounded">
                      ELITE COACH
                    </span>
                  </h3>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-ping" />
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Active Core</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-zinc-500 hover:text-rose-400 hover:rotate-90 transition-transform p-1 rounded-full hover:bg-zinc-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Error Notification banner */}
            {apiError && (
              <div className="bg-rose-950/40 border-b border-rose-900 p-2 text-xs text-rose-200 flex items-center gap-2 justify-between">
                <div className="flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span>Limited connectivity: falling back to secure protocol.</span>
                </div>
                <button 
                  onClick={() => handleSendMessage("Try connecting again")} 
                  className="text-rose-400 hover:underline flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" /> Retry
                </button>
              </div>
            )}

            {/* Messages body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-sm scrollbar-thin scrollbar-thumb-zinc-800">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 border tracking-wide leading-relaxed shadow-md ${
                      msg.role === "user"
                        ? "bg-rose-900/10 border-rose-800/20 text-rose-50 font-medium rounded-tr-none"
                        : "bg-zinc-900/80 border-zinc-800 text-zinc-100 rounded-tl-none font-light"
                    }`}
                  >
                    <div className="whitespace-pre-line">
                      {/* Very basic markdown check for bold styling */}
                      {msg.content.split("**").map((text, i) => 
                        i % 2 === 1 ? <strong key={i} className="text-rose-400 font-semibold">{text}</strong> : text
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-zinc-900/80 border border-zinc-800 text-zinc-300 rounded-2xl rounded-tl-none px-4 py-3 shadow-md flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-bounce" />
                    <span className="text-xs font-mono tracking-widest uppercase text-zinc-500 ml-1">Calibrating load...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions Chips */}
            <div className="px-4 py-2 border-t border-zinc-900 bg-zinc-950/80 flex gap-2 overflow-x-auto scrollbar-none shrink-0 scroll-smooth">
              {SUGGESTIONS.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(s)}
                  className="bg-zinc-900 hover:bg-rose-950/30 hover:border-rose-900/50 text-zinc-400 hover:text-rose-300 px-3 py-1.5 rounded-full border border-zinc-800 text-xs whitespace-nowrap transition-all duration-300 shrink-0 cursor-pointer"
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Chat Input form footer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(input);
              }}
              className="p-3 border-t border-zinc-800 bg-zinc-950 flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Inquire about workouts, diets, pricing..."
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-100 text-sm focus:outline-none focus:border-rose-600 focus:ring-1 focus:ring-rose-600 transition-all font-sans"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-rose-600 hover:bg-rose-700 disabled:bg-zinc-900 disabled:border-zinc-800 disabled:text-zinc-600 hover:shadow-[0_0_15px_rgba(225,29,72,0.5)] border border-rose-500/10 text-white rounded-xl px-4 py-2.5 flex items-center justify-center transition-all cursor-pointer grow-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
