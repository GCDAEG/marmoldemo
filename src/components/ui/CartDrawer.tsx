"use client";
import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, X, Trash2, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, removeFromCart, totalPrice, clearCart } = useCart();
  const WHATSAPP_NUMBER = "5493446123456";

  const handleCheckout = () => {
    if (cart.length === 0) return;

    const productList = cart
      .map((item) => `• ${item.title} - $${item.price}`)
      .join("\n");

    const message = `*NUEVO PEDIDO - MARUKIS* 🧉\n\nHola! Me gustaría encargar la siguiente selección:\n\n${productList}\n\n*TOTAL ESTIMADO:* $${totalPrice.toLocaleString("es-AR")}\n\n_Por favor, confírmenme disponibilidad para coordinar el pago y retiro._`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  return (
    <>
      {/* BOTÓN DISPARADOR */}
      <button
        onClick={() => setIsOpen(true)}
        className="group relative flex items-center justify-center p-2 text-foreground/70 hover:text-primary transition-colors"
      >
        <ShoppingBag className="size-6" strokeWidth={2} />
        <AnimatePresence>
          {cart.length > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute top-0 right-0 size-4 bg-primary text-[9px] text-background flex items-center justify-center rounded-full font-bold shadow-sm border-2 border-background"
            >
              {cart.length}
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* DRAWER DESPLEGABLE */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Fondo oscuro traslúcido */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-120 bg-black/40 backdrop-blur-sm min-h-screen min-w-screen"
            />

            {/* Panel lateral */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 h-screen w-full max-w-md z-130 bg-background shadow-2xl flex flex-col"
            >
              {/* HEADER DEL DRAWER */}
              <div className="p-6 border-b border-border flex items-center justify-between bg-white/50">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">
                    Tu Selección
                  </span>
                  <h2 className="text-xl font-serif font-bold text-foreground">
                    Caja de Alfajores
                  </h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-border/40 rounded-full transition-colors text-foreground"
                >
                  <X className="size-6" />
                </button>
              </div>

              {/* LISTA DE PRODUCTOS */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center gap-4 text-foreground/20">
                    <ShoppingBag
                      className="size-16 opacity-50"
                      strokeWidth={1.5}
                    />
                    <p className="text-sm font-bold uppercase tracking-widest text-foreground/40">
                      Tu caja está vacía
                    </p>
                  </div>
                ) : (
                  cart.map((item, index) => (
                    <motion.div
                      key={`${item.id}-${index}`}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-between items-center p-4 border border-border rounded-(--radius-custom) bg-white shadow-sm group"
                    >
                      <div className="flex flex-col gap-1">
                        <span className="text-[9px] font-bold text-primary uppercase tracking-widest">
                          {item.category}
                        </span>
                        <h4 className="text-sm font-bold text-foreground">
                          {item.title}
                        </h4>
                        <span className="text-xs font-semibold text-foreground/50">
                          ${Number(item.price).toLocaleString("es-AR")}
                        </span>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-foreground/20 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                        title="Quitar producto"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </motion.div>
                  ))
                )}
              </div>

              {/* FOOTER DEL DRAWER */}
              {cart.length > 0 && (
                <div className="p-6 bg-white border-t border-border space-y-5 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)]">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-foreground/50">
                      Total a Pagar
                    </span>
                    <span className="text-2xl font-black text-foreground">
                      ${totalPrice.toLocaleString("es-AR")}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <Button
                      onClick={handleCheckout}
                      className="w-full h-14 bg-foreground text-background rounded-(--radius-custom) font-bold uppercase text-xs tracking-widest flex items-center justify-center gap-3 hover:bg-foreground/90 transition-all shadow-md transform active:scale-[0.98]"
                    >
                      Enviar Pedido
                      <MessageCircle className="size-4" />
                    </Button>

                    <button
                      onClick={clearCart}
                      className="w-full py-2 text-[10px] uppercase tracking-widest font-bold text-foreground/30 hover:text-red-500 transition-colors"
                    >
                      Vaciar caja
                    </button>
                  </div>

                  <p className="text-[10px] text-center text-foreground/40 font-medium leading-relaxed px-2">
                    Al enviar el pedido, te contactaremos por WhatsApp para
                    coordinar el pago, disponibilidad y retiro en nuestro local
                    en Gualeguaychú.
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
