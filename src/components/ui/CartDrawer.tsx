"use client";
import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { X, Trash2, Calculator, Plus, Minus, Check, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site/siteConfig";

export const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showWSModal, setShowWSModal] = useState(false);
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();
  const { brand } = siteConfig;
  const WHATSAPP_NUMBER = "5493446000000";

  const generateWSMessage = () => {
    const productList = cart
      .map(
        (item) =>
          `- ${item.quantity} m² de ${item.title} ($${(Number(item.price) * item.quantity).toLocaleString("es-AR")})`,
      )
      .join("\n");

    return `*NUEVA SOLICITUD DE PRESUPUESTO* 📏\n\nHola, me gustaría cotizar el siguiente material para mi obra:\n\n${productList}\n\n*TOTAL APROX: $${totalPrice.toLocaleString("es-AR")}*\n\nPor favor, confírmenme disponibilidad para avanzar con las medidas exactas.`;
  };

  const handleFinalSend = () => {
    const message = generateWSMessage();
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
    setShowWSModal(false);
    setIsOpen(false);
  };

  return (
    <>
      {/* TRIGGER BUTTON - Botón para abrir el cotizador */}
      <button
        onClick={() => setIsOpen(true)}
        className="group relative flex items-center justify-center p-2 text-slate-600 hover:text-primary transition-colors bg-blue-50 rounded-lg hover:bg-blue-100"
      >
        <Calculator className="size-5" strokeWidth={2.5} />
        <AnimatePresence>
          {cart.length > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 size-5 bg-primary text-[10px] text-white flex items-center justify-center rounded-full font-bold shadow-sm"
            >
              {cart.reduce((acc, item) => acc + item.quantity, 0)}
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* DRAWER AND MODAL */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[120] bg-slate-900/50 backdrop-blur-sm min-h-screen"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
              className="fixed top-0 right-0 h-screen w-full max-w-md z-[130] bg-white shadow-2xl flex flex-col border-l border-gray-100"
            >
              {/* HEADER */}
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-slate-50">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                    Presupuesto Actual
                  </span>
                  <h2 className="text-xl font-black text-slate-900">
                    Tu Cotización
                  </h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 bg-white border border-gray-200 hover:bg-gray-100 rounded-lg transition-colors text-slate-500"
                >
                  <X className="size-5" />
                </button>
              </div>

              {/* LISTA DE MATERIALES */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-white">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400">
                    <div className="size-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                      <Calculator className="size-8 opacity-50" />
                    </div>
                    <p className="text-xs font-bold uppercase tracking-widest text-center">
                      No agregaste <br /> materiales todavía
                    </p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      className="flex gap-4 p-4 border border-gray-100 rounded-xl bg-white shadow-sm"
                    >
                      <div className="flex-1">
                        <span className="text-[9px] font-bold text-primary uppercase tracking-widest block mb-1">
                          {item.category}
                        </span>
                        <h4 className="text-sm font-black leading-tight text-slate-900 mb-1">
                          {item.title}
                        </h4>
                        <p className="text-xs font-bold text-gray-500">
                          ${Number(item.price).toLocaleString("es-AR")}{" "}
                          <span className="text-[10px] font-medium text-gray-400">
                            / m²
                          </span>
                        </p>
                      </div>

                      {/* CONTROLES DE CANTIDAD (Metros cuadrados) */}
                      <div className="flex flex-col items-end justify-between gap-2">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="size-4" />
                        </button>
                        <div className="flex items-center gap-2 bg-slate-50 rounded-lg p-1 border border-gray-100">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="p-1 hover:bg-white hover:shadow-sm rounded-md transition-all disabled:opacity-30 text-slate-600"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="size-3" />
                          </button>
                          <span className="text-xs font-black w-6 text-center text-slate-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="p-1 hover:bg-white hover:shadow-sm rounded-md transition-all text-slate-600"
                          >
                            <Plus className="size-3" />
                          </button>
                        </div>
                        <div className="text-[10px] text-gray-500 mt-1">
                          Subtotal:{" "}
                          <span className="font-black text-slate-900">
                            $
                            {(
                              item.quantity * Number(item.price)
                            ).toLocaleString("es-AR")}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* FOOTER DEL DRAWER */}
              {cart.length > 0 && (
                <div className="p-6 bg-slate-50 border-t border-gray-100 space-y-4">
                  <div className="flex justify-between items-end px-1 mb-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
                      Total Estimado
                    </span>
                    <span className="text-2xl font-black text-primary">
                      ${totalPrice.toLocaleString("es-AR")}
                    </span>
                  </div>
                  <Button
                    onClick={() => setShowWSModal(true)}
                    className="w-full h-14 bg-[#0f172a] hover:bg-slate-800 text-white rounded-xl font-bold uppercase text-[10px] tracking-widest flex items-center justify-center gap-3 transition-all shadow-lg active:scale-95"
                  >
                    Enviar a Cotizar
                    <Send className="size-4" />
                  </Button>
                </div>
              )}
            </motion.div>
          </>
        )}

        {/* WHATSAPP SIMULATOR MODAL */}
        {showWSModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm h-screen"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-[#e5ddd5] w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl border border-white/20"
            >
              {/* WhatsApp Header */}
              <div className="bg-[#075e54] p-4 text-white flex items-center gap-3">
                <div className="size-10 bg-white/20 rounded-full flex items-center justify-center text-xl font-black">
                  {brand.name ? brand.name.charAt(0) : "M"}
                </div>
                <div>
                  <h3 className="font-bold text-sm">
                    {brand.name || "Mármoles y Granitos"}
                  </h3>
                  <p className="text-[10px] opacity-80">en línea</p>
                </div>
              </div>

              {/* Chat Body */}
              <div className="p-5 space-y-4 min-h-[220px] flex flex-col justify-end bg-[url('https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg')] bg-cover">
                <div className="bg-white p-3 rounded-xl rounded-tl-none shadow-sm max-w-[85%] self-start text-xs leading-relaxed text-slate-800 font-medium">
                  Hola! 👋 ¿En qué te podemos ayudar? Contanos sobre tu obra.
                </div>
                <div className="bg-[#dcf8c6] p-3 rounded-xl rounded-tr-none shadow-sm max-w-[90%] self-end text-xs whitespace-pre-wrap leading-relaxed relative text-slate-900 font-medium">
                  {generateWSMessage()}
                  <span className="block text-[9px] text-right opacity-60 mt-1.5 font-bold">
                    {new Date().toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 bg-white flex gap-3 border-t border-gray-100">
                <button
                  onClick={() => setShowWSModal(false)}
                  className="flex-1 py-3 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-slate-900 hover:bg-gray-50 rounded-xl transition-colors border border-transparent hover:border-gray-200"
                >
                  Volver
                </button>
                <button
                  onClick={handleFinalSend}
                  className="flex-[2] py-3 bg-[#25d366] text-white rounded-xl font-bold uppercase tracking-widest text-xs shadow-md hover:bg-[#20bd5a] transition-colors flex items-center justify-center gap-2 active:scale-95"
                >
                  <Check className="size-4" strokeWidth={3} /> Enviar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
