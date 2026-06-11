import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";

export default function FlyToCart() {
  const { flyAnim, clearFlyAnim } = useCart();
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (!flyAnim) return;
    setActive(flyAnim);
    const t = setTimeout(() => {
      setActive(null);
      clearFlyAnim();
    }, 700);
    return () => clearTimeout(t);
  }, [flyAnim]);

  // destino: botón carrito fijo bottom:20 left:20, centro = left:51, bottom:51
  const toX = 51;
  const toY = typeof window !== "undefined" ? window.innerHeight - 51 : 600;

  return createPortal(
    <AnimatePresence>
      {active && (
        <motion.div
          key={active.id}
          initial={{
            x: active.from.x - 28,
            y: active.from.y - 28,
            scale: 1,
            opacity: 1,
            borderRadius: "8px",
          }}
          animate={{
            x: toX - 28,
            y: toY - 28,
            scale: 0.15,
            opacity: 0.7,
            borderRadius: "50%",
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: 56,
            height: 56,
            pointerEvents: "none",
            zIndex: 9999,
            overflow: "hidden",
            boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
          }}
        >
          <img
            src={active.imgUrl || "/carrito.png"}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
