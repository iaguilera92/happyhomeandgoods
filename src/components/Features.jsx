import { useRef, useState } from "react";
import { Box, Typography, Container, IconButton } from "@mui/material";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import PetsRoundedIcon from "@mui/icons-material/PetsRounded";
import BathroomRoundedIcon from "@mui/icons-material/BathroomRounded";
import RiceBowlRoundedIcon from "@mui/icons-material/RiceBowlRounded";
import CleaningServicesRoundedIcon from "@mui/icons-material/CleaningServicesRounded";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";

const WSP = "56948898681";

const productos = [
  { id: 1, nombre: "Producto 1", precio: 9990, stock: 5, imagen: "/productos/producto-1.webp" },
  { id: 2, nombre: "Producto 2", precio: 14990, stock: 3, imagen: "/productos/producto-2.webp" },
  { id: 3, nombre: "Producto 3", precio: 7990, stock: 8, imagen: "/productos/producto-3.webp" },
  { id: 4, nombre: "Producto 4", precio: 12990, stock: 2, imagen: "/productos/producto-4.webp" },
  { id: 5, nombre: "Producto 5", precio: 19990, stock: 6, imagen: "/productos/producto-5.webp" },
  { id: 6, nombre: "Producto 6", precio: 8990, stock: 4, imagen: "/productos/producto-6.webp" },
  { id: 7, nombre: "Producto 7", precio: 11990, stock: 7, imagen: "/productos/producto-7.webp" },
];

const formatPrecio = (v) => `$${v.toLocaleString("es-CL")}`;

function ProductCard({ producto }) {
  const handleWsp = (e) => {
    e.stopPropagation();
    const msg = `Hola! Me interesa el ${producto.nombre}, ¿sigue disponible?`;
    window.open(`https://wa.me/${WSP}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <Box
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: "0 6px 20px rgba(0,0,0,0.10)",
        background: "#fff",
        position: "relative",
        height: { xs: 230, sm: 270 },
        cursor: "pointer",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 10px 28px rgba(0,0,0,0.15)",
        },
      }}
    >
      <Box
        component="img"
        src={producto.imagen}
        alt={producto.nombre}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />

      {/* Overlay gradiente inferior */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background: "linear-gradient(0deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.0) 100%)",
          px: 1.4,
          pt: 3,
          pb: 1.2,
        }}
      >
        <Typography
          sx={{
            color: "#fff",
            fontWeight: 800,
            fontSize: { xs: "0.78rem", sm: "0.88rem" },
            fontFamily: "'Poppins', sans-serif",
            lineHeight: 1.2,
            mb: 0.3,
            textTransform: "uppercase",
            letterSpacing: "0.02em",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {producto.nombre}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography
            sx={{
              color: "#FFD54F",
              fontWeight: 900,
              fontSize: { xs: "1rem", sm: "1.1rem" },
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            {formatPrecio(producto.precio)}
          </Typography>

          <Box
            component={motion.div}
            whileTap={{ scale: 0.92 }}
            onClick={handleWsp}
            sx={{
              bgcolor: "#25D366",
              borderRadius: "50%",
              width: 34,
              height: 34,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 3px 10px rgba(37,211,102,0.45)",
              cursor: "pointer",
            }}
          >
            <WhatsAppIcon sx={{ color: "#fff", fontSize: 20 }} />
          </Box>
        </Box>
      </Box>

      {/* Badge stock bajo */}
      {producto.stock <= 3 && (
        <Box
          sx={{
            position: "absolute",
            top: 10,
            left: 10,
            bgcolor: "#FF6A00",
            color: "#fff",
            fontSize: "0.65rem",
            fontWeight: 800,
            px: 1,
            py: 0.3,
            borderRadius: 1,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          Últimas unidades
        </Box>
      )}
    </Box>
  );
}

const destacado = {
  imagen: "/destacado.webp",
};

function Features() {
  const swiperRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];

  return (
    <Box sx={{ background: "#f7f4ee", pt: { xs: 2, sm: 3 }, pb: { xs: 1.5, sm: 2 } }}>
      <Container sx={{ maxWidth: { xs: "900px !important", md: "1220px !important" } }}>

        {/* ── Categorías ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Box sx={{ mb: { xs: 2, sm: 2.5 }, px: 0.5 }}>
            <Box sx={{ textAlign: "center", mb: { xs: 2, sm: 2.5 } }}>
              <Typography
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: "1.15rem", sm: "1.5rem" },
                  fontFamily: "'Poppins', sans-serif",
                  color: "#0c2a20",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  position: "relative",
                  display: "inline-block",
                  "&::before": {
                    content: '"✦"',
                    fontSize: "0.6em",
                    verticalAlign: "middle",
                    mr: 1,
                    color: "#c49200",
                  },
                  "&::after": {
                    content: '"✦"',
                    fontSize: "0.6em",
                    verticalAlign: "middle",
                    ml: 1,
                    color: "#c49200",
                  },
                }}
              >
                &nbsp;✦&nbsp; Categorías &nbsp;✦&nbsp;
              </Typography>
            </Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "repeat(5, 1fr)", sm: "repeat(5, 1fr)" },
                gap: { xs: 1, sm: 1.5 },
              }}
            >
              {[
                { label: "Decoración", icon: <AutoAwesomeRoundedIcon sx={{ fontSize: { xs: 22, sm: 28 } }} />, grad: "linear-gradient(135deg, #c0392b 0%, #e74c3c 100%)", img: "/categorias/decoracion.webp" },
                { label: "Mascotas",   icon: <PetsRoundedIcon sx={{ fontSize: { xs: 22, sm: 28 } }} />,         grad: "linear-gradient(135deg, #7b2d8b 0%, #a855f7 100%)", img: "/categorias/mascotas.webp" },
                { label: "Baño",       icon: <BathroomRoundedIcon sx={{ fontSize: { xs: 22, sm: 28 } }} />,     grad: "linear-gradient(135deg, #0d6eaf 0%, #1B83CC 100%)", img: "/categorias/bano.webp" },
                { label: "Cocina",     icon: <RiceBowlRoundedIcon sx={{ fontSize: { xs: 22, sm: 28 } }} />,     grad: "linear-gradient(135deg, #b45309 0%, #f59e0b 100%)", img: "/categorias/cocina.webp" },
                { label: "Limpieza",   icon: <CleaningServicesRoundedIcon sx={{ fontSize: { xs: 22, sm: 28 } }} />, grad: "linear-gradient(135deg, #015a43 0%, #017458 100%)", img: "/categorias/limpieza.webp" },
              ].map((cat, i) => (
                <motion.div
                  key={cat.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.07 }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      borderRadius: { xs: 2.5, sm: 3 },
                      overflow: "hidden",
                      height: { xs: 80, sm: 110, md: 130 },
                      cursor: "pointer",
                      boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
                      transition: "transform 0.2s ease, box-shadow 0.2s ease",
                      "&:hover": {
                        transform: "translateY(-4px) scale(1.02)",
                        boxShadow: "0 10px 24px rgba(0,0,0,0.2)",
                      },
                      "&:hover .cat-overlay": { opacity: 0.55 },
                    }}
                  >
                    {/* Imagen de fondo o gradiente */}
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        background: cat.grad,
                      }}
                    />
                    <Box
                      component="img"
                      src={cat.img}
                      alt={cat.label}
                      onError={(e) => { e.target.style.display = "none"; }}
                      sx={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    {/* Overlay oscuro */}
                    <Box
                      className="cat-overlay"
                      sx={{
                        position: "absolute",
                        inset: 0,
                        background: "rgba(0,0,0,0.35)",
                        transition: "opacity 0.2s ease",
                      }}
                    />
                    {/* Contenido */}
                    <Box
                      sx={{
                        position: "relative",
                        zIndex: 1,
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 0.5,
                        px: 0.5,
                      }}
                    >
                      <Box sx={{ color: "#fff", display: "flex", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.4))" }}>
                        {cat.icon}
                      </Box>
                      <Typography
                        sx={{
                          color: "#fff",
                          fontWeight: 800,
                          fontSize: { xs: "0.65rem", sm: "0.78rem" },
                          fontFamily: "'Poppins', sans-serif",
                          textAlign: "center",
                          lineHeight: 1.2,
                          textShadow: "0 2px 6px rgba(0,0,0,0.5)",
                          letterSpacing: "0.01em",
                        }}
                      >
                        {cat.label}
                      </Typography>
                    </Box>
                  </Box>
                </motion.div>
              ))}
            </Box>
          </Box>
        </motion.div>

        {/* ── Carruseles por categoría (antes del video) ── */}
        {[
          { label: "Decoración", icon: <AutoAwesomeRoundedIcon sx={{ fontSize: 18 }} />, color: "#c0392b" },
          { label: "Mascotas",   icon: <PetsRoundedIcon sx={{ fontSize: 18 }} />,         color: "#8e44ad" },
        ].map((cat, i) => (
          <motion.div
            key={cat.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: { xs: 1.5, sm: 2 }, px: 0.5, mt: i === 0 ? 0 : { xs: 2, sm: 2.5 } }}>
              <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}>
                <Box sx={{ width: 30, height: 30, borderRadius: "8px", bgcolor: `${cat.color}18`, display: "flex", alignItems: "center", justifyContent: "center", color: cat.color }}>
                  {cat.icon}
                </Box>
                <Typography sx={{ fontWeight: 900, fontSize: { xs: "1.15rem", sm: "1.5rem" }, fontFamily: "'Poppins', sans-serif", color: "#0c2a20", letterSpacing: "0.01em", lineHeight: 1.1 }}>
                  {cat.label}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 0.8 }}>
                <IconButton size="small" onClick={() => swiperRefs[i].current?.slidePrev()} sx={{ bgcolor: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", "&:hover": { bgcolor: "#f0f0f0" } }}>
                  <ArrowBackIosNewRoundedIcon sx={{ fontSize: 16 }} />
                </IconButton>
                <IconButton size="small" onClick={() => swiperRefs[i].current?.slideNext()} sx={{ bgcolor: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", "&:hover": { bgcolor: "#f0f0f0" } }}>
                  <ArrowForwardIosRoundedIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </Box>
            </Box>
            <Swiper onSwiper={(s) => (swiperRefs[i].current = s)} spaceBetween={12} slidesPerView={"auto"} style={{ paddingBottom: "8px" }}>
              {productos.map((p) => (
                <SwiperSlide key={`${cat.label}-${p.id}`} style={{ width: "180px" }}>
                  <ProductCard producto={p} />
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        ))}

        {/* ── Banner destacado ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <Box
            sx={{
              width: "100vw",
              ml: "calc(50% - 50vw)",
              mr: "calc(50% - 50vw)",
              mt: { xs: 2, sm: 2.5 },
              mb: 0,
              overflow: "hidden",
              background: "linear-gradient(135deg, #5c1f00 0%, #a03800 40%, #d45c00 70%, #ff8c00 100%)",
            }}
          >
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: { xs: 160, sm: 200 } }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", pr: { xs: 3, sm: 10 }, pl: { xs: 2, sm: 2 }, py: { xs: 2.5, sm: 4 } }}>
                <Box component="a" href={`https://wa.me/${WSP}`} target="_blank" rel="noopener noreferrer"
                  sx={{ textDecoration: "none", color: "#ffffff", fontFamily: "'Poppins', sans-serif", fontWeight: 900, fontSize: { xs: "0.88rem", sm: "1rem" }, letterSpacing: "0.04em", px: { xs: 2.2, sm: 3 }, py: { xs: 0.9, sm: 1.1 }, border: "2px solid rgba(255,255,255,0.95)", borderRadius: 0, transition: "background 0.18s ease", "&:hover": { background: "rgba(255,255,255,0.15)" } }}>
                  Comprar ahora
                </Box>
              </Box>
              <Box sx={{ display: "flex", alignItems: "flex-end", justifyContent: "flex-start", pl: { xs: 3, sm: 10 } }}>
                <Box component="img" src="/tee-box-blue-starter.avif" alt="Producto destacado"
                  sx={{ height: { xs: 140, sm: 185 }, maxWidth: "100%", objectFit: "contain", objectPosition: "center bottom", display: "block" }} />
              </Box>
            </Box>
          </Box>
        </motion.div>

        {/* ── Carruseles por categoría (después del video) ── */}
        {[
          { label: "Baño",     icon: <BathroomRoundedIcon sx={{ fontSize: 18 }} />,          color: "#1B83CC", idx: 2 },
          { label: "Cocina",   icon: <RiceBowlRoundedIcon sx={{ fontSize: 18 }} />,           color: "#d97706", idx: 3 },
        ].map((cat) => (
          <motion.div key={cat.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: "easeOut" }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: { xs: 1.5, sm: 2 }, px: 0.5, mt: { xs: 2, sm: 2.5 } }}>
              <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}>
                <Box sx={{ width: 30, height: 30, borderRadius: "8px", bgcolor: `${cat.color}18`, display: "flex", alignItems: "center", justifyContent: "center", color: cat.color }}>
                  {cat.icon}
                </Box>
                <Typography sx={{ fontWeight: 900, fontSize: { xs: "1.15rem", sm: "1.5rem" }, fontFamily: "'Poppins', sans-serif", color: "#0c2a20", letterSpacing: "0.01em", lineHeight: 1.1 }}>
                  {cat.label}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 0.8 }}>
                <IconButton size="small" onClick={() => swiperRefs[cat.idx].current?.slidePrev()} sx={{ bgcolor: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", "&:hover": { bgcolor: "#f0f0f0" } }}>
                  <ArrowBackIosNewRoundedIcon sx={{ fontSize: 16 }} />
                </IconButton>
                <IconButton size="small" onClick={() => swiperRefs[cat.idx].current?.slideNext()} sx={{ bgcolor: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", "&:hover": { bgcolor: "#f0f0f0" } }}>
                  <ArrowForwardIosRoundedIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </Box>
            </Box>
            <Swiper onSwiper={(s) => (swiperRefs[cat.idx].current = s)} spaceBetween={12} slidesPerView={"auto"} style={{ paddingBottom: "8px" }}>
              {productos.map((p) => (
                <SwiperSlide key={`${cat.label}-${p.id}`} style={{ width: "180px" }}>
                  <ProductCard producto={p} />
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        ))}

        {/* ── Banner video ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <Box sx={{ position: "relative", height: { xs: 110, sm: 150, md: 180 }, borderRadius: { xs: 3, sm: 4 }, overflow: "hidden", boxShadow: "0 12px 28px rgba(0,0,0,0.12)", mt: { xs: 2, sm: 2.5 } }}>
            <Box component="video" src="/video-inicio.mp4" autoPlay muted loop playsInline sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center", filter: "saturate(1.05) contrast(1.02)" }} />
            <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(2,14,10,0.15) 0%, rgba(2,14,10,0.55) 100%)" }} />
            <Box sx={{ position: "relative", zIndex: 1, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", px: { xs: 2.2, sm: 4 }, py: 0, textAlign: "center", gap: 1 }}>
              <Typography sx={{ color: "#FFD54F", fontWeight: 700, fontFamily: "'Poppins', sans-serif", fontSize: { xs: "0.78rem", sm: "0.95rem" }, letterSpacing: "0.18em", textTransform: "uppercase", textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>
                Santiago · Delivery · Entrega presencial
              </Typography>
              <Typography sx={{ color: "#ffffff", fontWeight: 900, fontFamily: "'Poppins', sans-serif", fontSize: { xs: "1.25rem", sm: "1.7rem", md: "2rem" }, lineHeight: 1.15, letterSpacing: "0.01em", textShadow: "0 6px 18px rgba(0,0,0,0.4)", whiteSpace: "nowrap" }}>
                "Todo lo que necesitas, aquí"
              </Typography>
            </Box>
          </Box>
        </motion.div>

        {/* ── Limpieza ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: "easeOut" }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: { xs: 1.5, sm: 2 }, px: 0.5, mt: { xs: 2, sm: 2.5 } }}>
            <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}>
              <Box sx={{ width: 30, height: 30, borderRadius: "8px", bgcolor: "#01745818", display: "flex", alignItems: "center", justifyContent: "center", color: "#017458" }}>
                <CleaningServicesRoundedIcon sx={{ fontSize: 18 }} />
              </Box>
              <Typography sx={{ fontWeight: 900, fontSize: { xs: "1.15rem", sm: "1.5rem" }, fontFamily: "'Poppins', sans-serif", color: "#0c2a20", letterSpacing: "0.01em", lineHeight: 1.1 }}>
                Limpieza
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 0.8 }}>
              <IconButton size="small" onClick={() => swiperRefs[4].current?.slidePrev()} sx={{ bgcolor: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", "&:hover": { bgcolor: "#f0f0f0" } }}>
                <ArrowBackIosNewRoundedIcon sx={{ fontSize: 16 }} />
              </IconButton>
              <IconButton size="small" onClick={() => swiperRefs[4].current?.slideNext()} sx={{ bgcolor: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", "&:hover": { bgcolor: "#f0f0f0" } }}>
                <ArrowForwardIosRoundedIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Box>
          </Box>
          <Swiper onSwiper={(s) => (swiperRefs[4].current = s)} spaceBetween={12} slidesPerView={"auto"} style={{ paddingBottom: "8px" }}>
            {productos.map((p) => (
              <SwiperSlide key={`limpieza-${p.id}`} style={{ width: "180px" }}>
                <ProductCard producto={p} />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

      </Container>
    </Box>
  );
}

export default Features;
