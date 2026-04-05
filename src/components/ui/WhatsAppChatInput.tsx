"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function WhatsAppChatInput() {
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const WHATSAPP_NUMBER = "1234567890"; // Tu número configurado

  const handleSend = () => {
    // if (!message.trim()) return;
    // const encoded = encodeURIComponent(message.trim());
    // window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, "_blank");
    setMessage("");
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    const input = containerRef.current?.querySelector("input");
    if (input instanceof HTMLInputElement) input.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            className="flex items-center gap-2 bg-background/95 backdrop-blur-md border border-border shadow-2xl rounded-2xl px-3 py-2 min-w-[280px] max-w-[400px]"
          >
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="¿Consultas sobre tu pedido?"
              className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-sm placeholder:text-foreground/40"
            />

            <Button
              onClick={handleSend}
              disabled={!message.trim()}
              size="icon"
              className={cn(
                "h-9 w-9 rounded-xl transition-all shrink-0",
                message.trim()
                  ? "bg-[#25D366] text-white hover:bg-[#20ba5a] shadow-lg"
                  : "bg-border text-foreground/20",
              )}
            >
              <Send className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen((v) => !v)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "h-14 w-14 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-300 border-2",
          isOpen
            ? "bg-background border-primary text-primary"
            : "bg-primary border-transparent text-background",
        )}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isOpen ? "close" : "chat"}
            initial={{ opacity: 0, rotate: -45 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 45 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <MessageCircle className="h-6 w-6" />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
