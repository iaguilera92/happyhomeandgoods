import { createContext, useContext, useState, useCallback } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [flyAnim, setFlyAnim] = useState(null); // { from: {x,y}, imgUrl }

  const agregarAlCarrito = (producto, fromRect = null) => {
    const pack = producto.Pack > 1 ? producto.Pack : 1;
    setItems((prev) => {
      const existe = prev.find((i) => i.IdProducto === producto.IdProducto);
      if (existe) {
        if (existe.cantidad >= producto.Stock) return prev;
        return prev.map((i) =>
          i.IdProducto === producto.IdProducto
            ? { ...i, cantidad: i.cantidad + pack }
            : i
        );
      }
      if (producto.Stock < 1) return prev;
      return [...prev, { ...producto, cantidad: pack }];
    });

    if (fromRect) {
      setFlyAnim({
        id: Date.now(),
        from: {
          x: fromRect.left + fromRect.width / 2,
          y: fromRect.top + fromRect.height / 2,
        },
        imgUrl: producto.ImageUrl,
      });
    }
  };

  const clearFlyAnim = useCallback(() => setFlyAnim(null), []);

  const eliminarDelCarrito = (id) => {
    setItems((prev) => prev.filter((i) => i.IdProducto !== id));
  };

  const vaciarCarrito = () => setItems([]);

  const subtotalItem = (i) => i.Pack > 0 ? i.Valor * (i.cantidad / i.Pack) : i.Valor * i.cantidad;
  const total = items.reduce((acc, i) => acc + subtotalItem(i), 0);
  const conteo = items.reduce((acc, i) => acc + i.cantidad, 0);

  return (
    <CartContext.Provider value={{ items, agregarAlCarrito, eliminarDelCarrito, vaciarCarrito, total, conteo, flyAnim, clearFlyAnim }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
