import { useRef, useState, useEffect } from "react";
import { Box, Typography, Container, IconButton, Dialog, DialogContent, Button, useMediaQuery, useTheme } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import PetsRoundedIcon from "@mui/icons-material/PetsRounded";
import BathroomRoundedIcon from "@mui/icons-material/BathroomRounded";
import RiceBowlRoundedIcon from "@mui/icons-material/RiceBowlRounded";
import CleaningServicesRoundedIcon from "@mui/icons-material/CleaningServicesRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import { cargarProductos } from "../helpers/HelperProductos";
import { useCart } from "../context/CartContext";

const WSP = "56957581093";

const formatPrecio = (v) => `$${Number(v).toLocaleString("es-CL")}`;

// Mapa de categorías — debe coincidir exactamente con las opciones del admin
const CATEGORIAS_CONFIG = {
  "Cocina":      { color: "#d97706", icon: <RiceBowlRoundedIcon />,            grad: "linear-gradient(135deg, #b45309 0%, #f59e0b 100%)", img: "/cocina.png"    },
  "Limpieza":    { color: "#017458", icon: <CleaningServicesRoundedIcon />,    grad: "linear-gradient(135deg, #015a43 0%, #017458 100%)", img: "/limpieza.png"  },
  "Accesorios":  { color: "#c0392b", icon: <AutoAwesomeRoundedIcon />,         grad: "linear-gradient(135deg, #c0392b 0%, #e74c3c 100%)", img: "/accesorios.png"},
  "Seguridad":   { color: "#1B83CC", icon: <SecurityRoundedIcon />,            grad: "linear-gradient(135deg, #0d6eaf 0%, #1B83CC 100%)", img: "/seguridad.png" },
  "Mascotas":    { color: "#7B5EA7", icon: <PetsRoundedIcon />,                grad: "linear-gradient(135deg, #5c3d8a 0%, #7B5EA7 100%)", img: "/mascotas.png"  },
};

function ProductCard({ producto, onVerDetalle }) {
  const { agregarAlCarrito } = useCart();
  const [pressed, setPressed] = useState(false);

  const handleAgregar = (e) => {
    e.stopPropagation();
    if (producto.Stock === 0) return;
    setPressed(true);
    setTimeout(() => setPressed(false), 350);
    agregarAlCarrito(producto, e.currentTarget.closest("[data-card]")?.getBoundingClientRect() ?? e.currentTarget.getBoundingClientRect());
  };

  return (
    <motion.div
      animate={pressed ? { scale: [1, 0.93, 1.03, 1] } : { scale: 1 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      data-card
      style={{ borderRadius: 12, overflow: "hidden" }}
    >
    <Box
      onClick={() => onVerDetalle?.(producto)}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: "0 6px 20px rgba(0,0,0,0.10)",
        background: "#fff",
        position: "relative",
        height: { xs: 230, sm: 270 },
        cursor: "pointer",
        transition: "box-shadow 0.2s ease",
        "&:hover": { boxShadow: "0 10px 28px rgba(0,0,0,0.15)" },
      }}
    >
      <Box
        component="img"
        src={producto.ImageUrl}
        alt={producto.NombreProducto}
        sx={{
          width: "100%", height: "100%", display: "block",
          objectFit: (producto.ImagenZoom || 1) < 1 ? "contain" : "cover",
          objectPosition: producto.ImagenPosicion || "50% 50%",
          transform: (producto.ImagenZoom || 1) > 1 ? `scale(${producto.ImagenZoom})` : "none",
          transformOrigin: producto.ImagenPosicion || "50% 50%",
        }}
      />

      <Box
        sx={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          background: "linear-gradient(0deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.0) 100%)",
          px: 1.4, pt: 3, pb: 1.2,
        }}
      >
        <Typography sx={{ color: "#fff", fontWeight: 800, fontSize: { xs: "0.78rem", sm: "0.88rem" }, fontFamily: "'Poppins', sans-serif", lineHeight: 1.2, mb: 0.3, textTransform: "uppercase", letterSpacing: "0.02em", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {producto.NombreProducto}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box>
            {producto.ConDescuento && producto.ValorOriginal > 0 && (
              <Typography sx={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Poppins', sans-serif", fontSize: "0.72rem", textDecoration: "line-through", lineHeight: 1 }}>
                {formatPrecio(producto.ValorOriginal)}
              </Typography>
            )}
            <Typography sx={{ color: "#FFD54F", fontWeight: 900, fontSize: { xs: "1rem", sm: "1.1rem" }, fontFamily: "'Poppins', sans-serif" }}>
              {producto.Pack > 0 ? `${producto.Pack} x ${formatPrecio(producto.Valor)}` : formatPrecio(producto.Valor)}
            </Typography>
          </Box>

          <Box
            component={motion.div}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.08 }}
            onClick={handleAgregar}
            sx={{
              cursor: producto.Stock > 0 ? "pointer" : "not-allowed",
              opacity: producto.Stock > 0 ? 1 : 0.4,
              width: 34, height: 34,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <Box component="img" src="/carrito.png" alt="agregar al carrito" sx={{ width: 34, height: 34, objectFit: "contain" }} />
          </Box>
        </Box>
      </Box>

      {/* Badges */}
      {producto.ConDescuento && (
        <Box sx={{ position: "absolute", top: 10, left: 10, bgcolor: "#FF6A00", color: "#fff", fontSize: "0.6rem", fontWeight: 800, px: 1, py: 0.3, borderRadius: 1, letterSpacing: "0.04em", textTransform: "uppercase" }}>
          Oferta
        </Box>
      )}
      {!producto.ConDescuento && producto.Stock <= 3 && producto.Stock > 0 && (
        <Box sx={{ position: "absolute", top: 10, left: 10, bgcolor: "#e53935", color: "#fff", fontSize: "0.6rem", fontWeight: 800, px: 1, py: 0.3, borderRadius: 1, letterSpacing: "0.04em", textTransform: "uppercase" }}>
          Últimas unidades
        </Box>
      )}
    </Box>
    </motion.div>
  );
}

function CategoriaDialog({ categoria, productos, onClose, onVerDetalle }) {
  if (!categoria) return null;
  const productosFiltrados = productos.filter(
    (p) => p.Activo && p.Categoria?.toLowerCase() === categoria.label?.toLowerCase()
  );

  return (
    <Dialog
      open={Boolean(categoria)}
      onClose={onClose}
      fullWidth
      maxWidth="lg"
      PaperProps={{
        sx: {
          borderRadius: { xs: 0, sm: 3 },
          m: { xs: 0, sm: 3 },
          width: { xs: "100%", sm: "calc(100% - 48px)" },
          maxHeight: { xs: "100dvh", sm: "90vh" },
          height: { xs: "100dvh", sm: "auto" },
          display: "flex", flexDirection: "column", overflow: "hidden",
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: { xs: 2, sm: 3 }, py: { xs: 1.8, sm: 2 }, borderBottom: "1px solid rgba(0,0,0,0.07)", bgcolor: "#fff", flexShrink: 0 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
          <Box sx={{ width: 36, height: 36, borderRadius: "10px", bgcolor: `${categoria.color}18`, display: "flex", alignItems: "center", justifyContent: "center", color: categoria.color }}>
            {categoria.icon}
          </Box>
          <Typography sx={{ fontWeight: 900, fontSize: { xs: "1.1rem", sm: "1.4rem" }, fontFamily: "'Poppins', sans-serif", color: "#0c2a20" }}>
            {categoria.label}
          </Typography>
          <Typography sx={{ fontSize: "0.78rem", color: "#888", fontFamily: "'Poppins', sans-serif", ml: 0.5 }}>
            {productosFiltrados.length} producto{productosFiltrados.length !== 1 ? "s" : ""}
          </Typography>
        </Box>
        <IconButton onClick={onClose} sx={{ color: "#555", "&:hover": { bgcolor: "#f0f0f0" } }}>
          <CloseRoundedIcon />
        </IconButton>
      </Box>

      <DialogContent sx={{ p: { xs: 1.5, sm: 2.5 }, overflowY: "auto" }}>
        {productosFiltrados.length === 0 ? (
          <Box sx={{ py: 6, textAlign: "center" }}>
            <Typography sx={{ color: "#aaa", fontFamily: "'Poppins', sans-serif" }}>No hay productos en esta categoría</Typography>
          </Box>
        ) : (
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(3, 1fr)", md: "repeat(4, 1fr)", lg: "repeat(5, 1fr)" }, gap: { xs: 1.2, sm: 1.8 } }}>
            {productosFiltrados.map((p) => (
              <ProductCard key={p.IdProducto} producto={p} onVerDetalle={onVerDetalle} />
            ))}
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}

// Carrusel de una categoría
function CarruselCategoria({ label, color, icon, productos, swiperRef, onVerDetalle }) {
  const items = productos.filter((p) => p.Activo && p.Categoria?.toLowerCase() === label.toLowerCase());
  if (items.length === 0) return null;

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: "easeOut" }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: { xs: 1.5, sm: 2 }, px: 0.5, mt: { xs: 2, sm: 2.5 } }}>
        <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}>
          <Box sx={{ width: 30, height: 30, borderRadius: "8px", bgcolor: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center", color }}>
            {icon}
          </Box>
          <Typography sx={{ fontWeight: 900, fontSize: { xs: "1.15rem", sm: "1.5rem" }, fontFamily: "'Poppins', sans-serif", color: "#0c2a20", letterSpacing: "0.01em", lineHeight: 1.1 }}>
            {label}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 0.8 }}>
          <IconButton size="small" onClick={() => swiperRef.current?.slidePrev()} sx={{ bgcolor: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", "&:hover": { bgcolor: "#f0f0f0" } }}>
            <ArrowBackIosNewRoundedIcon sx={{ fontSize: 16 }} />
          </IconButton>
          <IconButton size="small" onClick={() => swiperRef.current?.slideNext()} sx={{ bgcolor: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", "&:hover": { bgcolor: "#f0f0f0" } }}>
            <ArrowForwardIosRoundedIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>
      </Box>
      <Swiper onSwiper={(s) => (swiperRef.current = s)} spaceBetween={12} slidesPerView="auto" style={{ paddingBottom: "8px" }}>
        {items.map((p) => (
          <SwiperSlide key={p.IdProducto} style={{ width: "180px" }}>
            <ProductCard producto={p} onVerDetalle={onVerDetalle} />
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
}

function ProductoDialog({ producto, onClose }) {
  const [slide, setSlide] = useState(0);

  useEffect(() => { setSlide(0); }, [producto?.IdProducto]);

  if (!producto) return null;
  const tieneVideo = Boolean(producto.VideoUrl?.trim());
  const slides = tieneVideo ? ["video", "imagen"] : ["imagen"];
  const precioWsp = producto.Pack > 0 ? `${producto.Pack} x ${formatPrecio(producto.Valor)}` : formatPrecio(producto.Valor);
  const wspMsg = encodeURIComponent(`Hola! Me interesa ${producto.NombreProducto} por ${precioWsp}, ¿sigue disponible?`);

  return (
    <Dialog
      open
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      disableScrollLock
      PaperProps={{
        sx: {
          borderRadius: 4,
          overflow: "hidden",
          bgcolor: "#fff",
          m: { xs: 1.5, sm: 3 },
          boxShadow: "0 24px 60px rgba(0,0,0,0.18)",
        },
      }}
    >
      <Box sx={{ position: "relative" }}>

        {/* Botón cerrar */}
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            position: "absolute", top: 10, right: 10, zIndex: 10,
            bgcolor: "rgba(255,255,255,0.85)", backdropFilter: "blur(6px)",
            color: "#444", boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
            "&:hover": { bgcolor: "#fff", color: "#111" },
          }}
        >
          <CloseRoundedIcon sx={{ fontSize: 18 }} />
        </IconButton>

        {/* Flechas */}
        {tieneVideo && (
          <>
            {[
              { dir: "left", icon: <ArrowBackIosNewRoundedIcon sx={{ fontSize: 16 }} />, action: () => setSlide((s) => (s - 1 + slides.length) % slides.length) },
              { dir: "right", icon: <ArrowForwardIosRoundedIcon sx={{ fontSize: 16 }} />, action: () => setSlide((s) => (s + 1) % slides.length) },
            ].map(({ dir, icon, action }) => (
              <IconButton
                key={dir}
                onClick={action}
                size="small"
                sx={{
                  position: "absolute", [dir]: 10, top: "50%", transform: "translateY(-50%)", zIndex: 10,
                  bgcolor: "rgba(255,255,255,0.85)", backdropFilter: "blur(6px)",
                  color: "#444", boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                  "&:hover": { bgcolor: "#fff", color: "#111" },
                }}
              >
                {icon}
              </IconButton>
            ))}
          </>
        )}

        {/* Media */}
        <Box sx={{ bgcolor: "#f7f7f7", minHeight: 280, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
          <motion.div
            key={slide}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            {slides[slide] === "video" ? (
              <Box component="video" src={producto.VideoUrl} autoPlay muted loop playsInline
                sx={{ width: "100%", display: "block", maxHeight: "58vh", objectFit: "contain" }}
              />
            ) : (
              <Box component="img" src={producto.ImageUrl} alt={producto.NombreProducto}
                sx={{ width: "100%", display: "block", maxHeight: "58vh", objectFit: "contain" }}
              />
            )}
          </motion.div>
        </Box>

        {/* Dots */}
        {tieneVideo && (
          <Box sx={{ display: "flex", justifyContent: "center", gap: 0.6, pt: 1.2, pb: 0.2 }}>
            {slides.map((_, i) => (
              <Box key={i} onClick={() => setSlide(i)} sx={{
                width: slide === i ? 18 : 6, height: 6, borderRadius: 3,
                bgcolor: slide === i ? "#c9783c" : "rgba(0,0,0,0.15)",
                cursor: "pointer", transition: "all 0.25s ease",
              }} />
            ))}
          </Box>
        )}

        {/* Info */}
        <Box sx={{ px: 2.5, pt: tieneVideo ? 1.2 : 2, pb: 2.5 }}>
          {producto.Categoria && (
            <Typography sx={{ fontSize: "0.65rem", fontWeight: 700, color: "#c9783c", textTransform: "uppercase", letterSpacing: "0.1em", mb: 0.5, fontFamily: "'Poppins', sans-serif" }}>
              {producto.Categoria}
            </Typography>
          )}
          <Typography sx={{ color: "#111", fontWeight: 800, fontSize: "1.05rem", fontFamily: "'Poppins', sans-serif", lineHeight: 1.25, mb: 0.5 }}>
            {producto.NombreProducto}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.2 }}>
            <Typography sx={{ color: "#c9783c", fontWeight: 900, fontSize: "1.2rem", fontFamily: "'Poppins', sans-serif" }}>
              {producto.Pack > 0 ? `${producto.Pack} x ${formatPrecio(producto.Valor)}` : formatPrecio(producto.Valor)}
            </Typography>
            {producto.ConDescuento && producto.ValorOriginal > 0 && (
              <Typography sx={{ color: "#bbb", fontWeight: 500, fontSize: "0.82rem", textDecoration: "line-through", fontFamily: "'Poppins', sans-serif" }}>
                {formatPrecio(producto.ValorOriginal)}
              </Typography>
            )}
          </Box>

          <Typography sx={{
            color: producto.Descripcion?.trim() ? "#555" : "#ccc",
            fontSize: "0.78rem", fontFamily: "'Poppins', sans-serif",
            lineHeight: 1.6, mb: 2,
            fontStyle: producto.Descripcion?.trim() ? "normal" : "italic",
          }}>
            {producto.Descripcion?.trim() || "Sin descripción"}
          </Typography>

          <Button
            component="a"
            href={`https://wa.me/${WSP}?text=${wspMsg}`}
            target="_blank" rel="noopener noreferrer"
            variant="contained" fullWidth
            sx={{
              position: "relative", overflow: "hidden",
              background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #2edc6f 0%, #0fa070 100%)",
                boxShadow: "0 8px 28px rgba(37,211,102,0.55)",
                transform: "translateY(-1px)",
              },
              borderRadius: 2.5, textTransform: "none", fontWeight: 800,
              fontSize: "0.95rem", py: 1.4, letterSpacing: "0.02em",
              boxShadow: "0 4px 18px rgba(37,211,102,0.4)",
              transition: "all 0.2s ease",
              "&::after": {
                content: '""',
                position: "absolute",
                top: 0, left: "-100%",
                width: "60%", height: "100%",
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                animation: "btnShine 2.8s infinite",
              },
              "@keyframes btnShine": {
                "0%":   { left: "-100%" },
                "60%":  { left: "200%" },
                "100%": { left: "200%" },
              },
            }}
          >
            Comprar
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}

function Features() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [categoriaAbierta, setCategoriaAbierta] = useState(null);
  const [productoAbierto, setProductoAbierto] = useState(null);
  const [indexDestacado, setIndexDestacado] = useState(0);

  const swiperCocina     = useRef(null);
  const swiperLimpieza   = useRef(null);
  const swiperAccesorios = useRef(null);
  const swiperSeguridad  = useRef(null);
  const swiperMascotas   = useRef(null);

  useEffect(() => {
    cargarProductos().then((data) => {
      setProductos(data);
      setCargando(false);
    });
  }, []);

  const productosActivos = productos.filter((p) => p.Activo);
  const productosDestacados = productosActivos.filter((p) => p.Destacado);

  useEffect(() => {
    if (productosDestacados.length <= 1) return;
    const id = setInterval(() => setIndexDestacado((i) => (i + 1) % productosDestacados.length), 4000);
    return () => clearInterval(id);
  }, [productosDestacados.length]);

  const productoDestacado = productosDestacados[indexDestacado % Math.max(productosDestacados.length, 1)] ?? null;

  // Ocultar sección completa si no hay productos
  if (!cargando && productosActivos.length === 0) return null;

  // Categorías para mostrar (solo las que tienen productos activos)
  const categoriasConProductos = Object.entries(CATEGORIAS_CONFIG).filter(([label]) =>
    productosActivos.some((p) => p.Categoria?.toLowerCase() === label.toLowerCase())
  );

  return (
    <Box sx={{ background: "#f7f4ee", pt: { xs: 2, sm: 3 }, pb: { xs: 1.5, sm: 2 } }}>
      <Container sx={{ maxWidth: { xs: "900px !important", md: "1220px !important" } }}>

        {/* ── Categorías — siempre 4, ajustadas al ancho ── */}
        <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: "easeOut" }}>
          <Box sx={{ mb: { xs: 2, sm: 2.5 }, px: 0.5 }}>
            <Box sx={{ textAlign: "center", mb: { xs: 2, sm: 2.5 } }}>
              <Typography sx={{ fontWeight: 900, fontSize: { xs: "1.15rem", sm: "1.5rem" }, fontFamily: "'Poppins', sans-serif", color: "#0c2a20", letterSpacing: "0.08em", textTransform: "uppercase", display: "inline-block" }}>
                &nbsp;✦&nbsp; Categorías &nbsp;✦&nbsp;
              </Typography>
            </Box>
            <Box sx={{
              display: { xs: "flex", sm: "grid" },
              flexWrap: "wrap",
              justifyContent: "center",
              gridTemplateColumns: { sm: "repeat(5, 1fr)" },
              gap: { xs: 1, sm: 1.5 },
              "& > *": { width: { xs: "calc(33.33% - 6px)", sm: "unset" } },
            }}>
              {Object.entries(CATEGORIAS_CONFIG).map(([label, cfg], i) => (
                <motion.div key={label} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.07 }}>
                  <Box
                    onClick={() => setCategoriaAbierta({ label, ...cfg })}
                    sx={{ position: "relative", borderRadius: { xs: 2.5, sm: 3 }, overflow: "hidden", height: { xs: 80, sm: 110, md: 130 }, cursor: "pointer", boxShadow: "0 4px 14px rgba(0,0,0,0.12)", transition: "transform 0.2s ease, box-shadow 0.2s ease", "&:hover": { transform: "translateY(-4px) scale(1.02)", boxShadow: "0 10px 24px rgba(0,0,0,0.2)" }, "&:hover .cat-overlay": { opacity: 0.55 } }}
                    className="cat-card"
                  >
                    <Box sx={{ position: "absolute", inset: 0, background: cfg.grad }} />
                    <Box component="img" src={cfg.img} alt={label} onError={(e) => { e.target.style.display = "none"; }}
                      sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease", ".cat-card:hover &": { transform: "scale(1.12)" } }}
                    />
                    <Box className="cat-overlay" sx={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)", transition: "opacity 0.2s ease" }} />
                    <Box sx={{ position: "relative", zIndex: 1, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 0.5, px: 0.5 }}>
                      <Box sx={{ color: "#fff", display: "flex", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.4))", "& svg": { fontSize: { xs: 22, sm: 28 } } }}>
                        {cfg.icon}
                      </Box>
                      <Typography sx={{ color: "#fff", fontWeight: 800, fontSize: { xs: "0.65rem", sm: "0.78rem" }, fontFamily: "'Poppins', sans-serif", textAlign: "center", lineHeight: 1.2, textShadow: "0 2px 6px rgba(0,0,0,0.5)" }}>
                        {label}
                      </Typography>
                    </Box>
                  </Box>
                </motion.div>
              ))}
            </Box>
          </Box>
        </motion.div>

        {/* ── Carruseles ── */}
        <CarruselCategoria label="Accesorios" color="#c0392b" icon={<AutoAwesomeRoundedIcon sx={{ fontSize: 18 }} />} productos={productosActivos} swiperRef={swiperAccesorios} onVerDetalle={setProductoAbierto} />
        <CarruselCategoria label="Cocina"     color="#d97706" icon={<RiceBowlRoundedIcon sx={{ fontSize: 18 }} />}    productos={productosActivos} swiperRef={swiperCocina}     onVerDetalle={setProductoAbierto} />

        {/* ── Banner destacado ── */}
        {productoDestacado && (
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, ease: "easeOut" }}>
            <Box sx={{ width: "100vw", ml: "calc(50% - 50vw)", mr: "calc(50% - 50vw)", mt: { xs: 2, sm: 2.5 }, mb: 0, overflow: "hidden", position: "relative", background: "linear-gradient(135deg, #5c1f00 0%, #a03800 40%, #d45c00 70%, #ff8c00 100%)" }}>

              <Box sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr 1fr", sm: "1fr 1fr 1fr 1fr" },
                alignItems: "center",
                minHeight: { xs: 160, sm: 200 },
              }}>

                {/* Col 1 — vacío (solo sm+) */}
                <Box sx={{ display: { xs: "none", sm: "block" } }} />

                {/* Botón centrado */}
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Box component="a"
                    href={`https://wa.me/${WSP}?text=${encodeURIComponent(`Hola! Me interesa el ${productoDestacado.NombreProducto} por ${productoDestacado.Pack > 0 ? `${productoDestacado.Pack} x ${formatPrecio(productoDestacado.Valor)}` : formatPrecio(productoDestacado.Valor)}, ¿sigue disponible?`)}`}
                    target="_blank" rel="noopener noreferrer"
                    sx={{ textDecoration: "none", color: "#fff", fontFamily: "'Poppins', sans-serif", fontWeight: 900, fontSize: { xs: "0.72rem", sm: "1rem" }, letterSpacing: "0.04em", px: { xs: 1.8, sm: 3 }, py: { xs: 0.8, sm: 1.1 }, border: "2px solid rgba(255,255,255,0.95)", whiteSpace: "nowrap", transition: "background 0.18s ease", "&:hover": { background: "rgba(255,255,255,0.15)" } }}>
                    Comprar ahora
                  </Box>
                </Box>

                {/* Imagen animada */}
                <Box sx={{ display: "flex", alignItems: { xs: "center", sm: "flex-end" }, justifyContent: "center", height: "100%" }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={productoDestacado.IdProducto}
                      initial={{ opacity: 0, scale: 0.88, y: 18 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 1.06, y: -14 }}
                      transition={{ duration: 0.55, ease: "easeInOut" }}
                      style={{ display: "block" }}
                    >
                      <Box component="img"
                        src={productoDestacado.ImageUrl}
                        alt={productoDestacado.NombreProducto}
                        sx={{ maxHeight: { xs: 148, sm: 192 }, maxWidth: "100%", objectFit: "contain", objectPosition: "center bottom", display: "block" }}
                      />
                    </motion.div>
                  </AnimatePresence>
                </Box>

                {/* Col 4 — vacío (solo sm+) */}
                <Box sx={{ display: { xs: "none", sm: "block" } }} />

              </Box>
            </Box>

            {/* Dots fuera del banner */}
            {productosDestacados.length > 1 && (
              <Box sx={{ display: "flex", justifyContent: "center", gap: 0.8, pt: 1 }}>
                {productosDestacados.map((_, i) => (
                  <Box key={i} onClick={() => setIndexDestacado(i)} sx={{
                    width: i === indexDestacado ? 18 : 7, height: 7, borderRadius: 4,
                    bgcolor: i === indexDestacado ? "#a03800" : "rgba(0,0,0,0.18)",
                    cursor: "pointer", transition: "all 0.3s ease",
                  }} />
                ))}
              </Box>
            )}
          </motion.div>
        )}

        <CarruselCategoria label="Limpieza"  color="#017458" icon={<CleaningServicesRoundedIcon sx={{ fontSize: 18 }} />} productos={productosActivos} swiperRef={swiperLimpieza}  onVerDetalle={setProductoAbierto} />
        <CarruselCategoria label="Seguridad" color="#1B83CC" icon={<SecurityRoundedIcon sx={{ fontSize: 18 }} />} productos={productosActivos} swiperRef={swiperSeguridad} onVerDetalle={setProductoAbierto} />

        {/* ── Banner video ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <Box sx={{ position: "relative", height: { xs: 110, sm: 150, md: 180 }, borderRadius: { xs: 3, sm: 4 }, overflow: "hidden", boxShadow: "0 12px 28px rgba(0,0,0,0.12)", mt: { xs: 2, sm: 2.5 } }}>
            <Box component="video" src="/video-oficial.mp4" autoPlay muted loop playsInline sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center", filter: "saturate(1.05) contrast(1.02)", transform: { xs: "scale(1.35)", sm: "scale(1)" }, transformOrigin: "center center" }} />
            <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(2,14,10,0.15) 0%, rgba(2,14,10,0.55) 100%)" }} />
            <Box sx={{ position: "relative", zIndex: 1, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", px: { xs: 2.2, sm: 4 }, py: 0, textAlign: "center", gap: 1 }}>
              <Typography sx={{ color: "#FFD54F", fontWeight: 700, fontFamily: "'Poppins', sans-serif", fontSize: { xs: "0.78rem", sm: "0.95rem" }, letterSpacing: { xs: "0.05em", sm: "0.18em" }, textTransform: "uppercase", textShadow: "0 2px 8px rgba(0,0,0,0.4)", whiteSpace: "nowrap" }}>
                Santiago · Delivery
              </Typography>
              <Typography sx={{ color: "#ffffff", fontWeight: 900, fontFamily: "'Poppins', sans-serif", fontSize: { xs: "1.25rem", sm: "1.7rem", md: "2rem" }, lineHeight: 1.15, letterSpacing: "0.01em", textShadow: "0 6px 18px rgba(0,0,0,0.4)", whiteSpace: "nowrap" }}>
                "Todo lo que necesitas, aquí"
              </Typography>
            </Box>
          </Box>
        </motion.div>

        <CarruselCategoria label="Mascotas"  color="#7B5EA7" icon={<PetsRoundedIcon sx={{ fontSize: 18 }} />}    productos={productosActivos} swiperRef={swiperMascotas}  onVerDetalle={setProductoAbierto} />

      </Container>

      <CategoriaDialog
        categoria={categoriaAbierta}
        productos={productos}
        onClose={() => setCategoriaAbierta(null)}
        onVerDetalle={setProductoAbierto}
      />

      <ProductoDialog producto={productoAbierto} onClose={() => setProductoAbierto(null)} />
    </Box>
  );
}

export default Features;
