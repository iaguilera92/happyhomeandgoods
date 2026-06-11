import { Box, Typography, Container, useTheme, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Nosotros = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    if (isMobile) {
      const handleScroll = () => setScrollY(window.scrollY);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isMobile]);

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        minHeight: '100vh',
        width: '100%',
        pt: 0,
        px: 0,
        pb: 3.5,
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: "#f8f6f1",
        backgroundSize: "420px 420px",
        backgroundRepeat: "repeat",
        backgroundAttachment: "scroll",
        backgroundPosition: "top left",
      }}
    >
      {/* ── Banner ── */}
      <Box
        sx={{
          position: "relative",
          minHeight: { xs: 220, sm: 260, md: 300 },
          backgroundImage: "url(/fondo-nosotros.avif)",
          backgroundSize: "cover",
          backgroundPosition: { xs: "center 100%", md: "center 70%" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 100%)",
            zIndex: 1,
          },
        }}
      >
        <Container
          sx={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            pt: { xs: 11, sm: 10, md: 12 },
            pb: { xs: 4, sm: 4.5 },
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            <Typography
              sx={{
                fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.6rem" },
                fontWeight: 900,
                fontFamily: "'Poppins', sans-serif",
                color: "#ffffff",
                letterSpacing: "0.06em",
                textShadow: "0 3px 18px rgba(0,0,0,0.5)",
                lineHeight: 1.1,
                textTransform: "uppercase",
                mb: { xs: 1, sm: 1.4 },
              }}
            >
              Nosotros
            </Typography>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.38 }}
          >
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1.5, mx: "auto" }}>
              <Box sx={{ width: { xs: 28, sm: 42 }, height: 1.5, borderRadius: 99, background: "rgba(255,255,255,0.55)" }} />
              <Typography
                sx={{
                  fontSize: { xs: "0.78rem", sm: "1rem" },
                  color: "rgba(255,255,255,0.85)",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 400,
                  textShadow: "0 2px 8px rgba(0,0,0,0.4)",
                  letterSpacing: "0.04em",
                  whiteSpace: { xs: "nowrap", sm: "normal" },
                }}
              >
                10 años llevando lo mejor para tu hogar
              </Typography>
              <Box sx={{ width: { xs: 28, sm: 42 }, height: 1.5, borderRadius: 99, background: "rgba(255,255,255,0.55)" }} />
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* ── Nuestra Historia ── */}
      <Box sx={{ maxWidth: "1100px", mx: "auto", mt: { xs: 5, sm: 6 }, px: { xs: 2.5, sm: 4, md: 6 } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: { xs: 4, md: 7 },
            alignItems: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: { xs: "1.6rem", sm: "1.9rem", md: "2.2rem" },
                  fontWeight: 900,
                  fontFamily: "'Poppins', sans-serif",
                  color: "#0c2a1e",
                  lineHeight: 1.15,
                  mb: 2.5,
                  display: "inline-block",
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: -8,
                    left: 0,
                    width: "100%",
                    height: 3,
                    borderRadius: 99,
                    background: "linear-gradient(90deg, #017458 0%, rgba(1,116,88,0.2) 100%)",
                  },
                }}
              >
                Nuestra historia
              </Typography>

              {[
                "Hace más de 10 años comenzamos con una idea simple: acercar productos de calidad para el hogar a las familias de Santiago, sin complicaciones. Lo que empezó como un pequeño emprendimiento creció gracias a la confianza de cientos de clientes que nos eligen cada día.",
                "Trabajamos para que encontrar lo que necesitas sea fácil y rápido. Nos contactas por WhatsApp o redes sociales, confirmamos tu pedido y te lo hacemos llegar a domicilio en Santiago.",
                "Cada entrega es un compromiso: productos en perfectas condiciones, atención cercana y la satisfacción de saber que estás comprando con alguien en quien puedes confiar.",
              ].map((text, i) => (
                <Typography
                  key={i}
                  sx={{
                    fontSize: { xs: "0.88rem", sm: "0.95rem" },
                    color: "#3d5a4f",
                    lineHeight: 1.8,
                    mb: i < 2 ? 1.6 : 0,
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  {text}
                </Typography>
              ))}
            </Box>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          >
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Box
                sx={{
                  width: { xs: 220, sm: 280, md: 340 },
                  height: { xs: 220, sm: 280, md: 340 },
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, rgba(1,116,88,0.07) 0%, rgba(1,116,88,0.16) 100%)",
                  border: "2px solid rgba(1,116,88,0.14)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 24px 60px rgba(1,116,88,0.13)",
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    inset: -10,
                    borderRadius: "50%",
                    border: "1px dashed rgba(1,116,88,0.18)",
                  },
                }}
              >
                <Box component="img" src="/logo.png" alt="Happy Home & Goods" sx={{ width: "82%", height: "auto" }} />
              </Box>
            </Box>
          </motion.div>
        </Box>
      </Box>

      {/* ── Banner intermedio ── */}
      <Box
        sx={{
          width: '100vw',
          position: 'relative',
          mt: 4,
          mb: 4,
          py: { xs: 2.6, md: 3.2 },
          backgroundImage: 'url(/fondo-telefono.webp)',
          backgroundSize: 'cover',
          backgroundPosition: isMobile ? `center ${scrollY * 0.3}px` : 'center',
          backgroundAttachment: isMobile ? 'scroll' : 'fixed',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(120deg, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.28) 100%)',
            zIndex: 1,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ width: '100%', px: 2, position: 'relative', zIndex: 2 }}>
          <Typography
            variant={isMobile ? "h6" : "h4"}
            fontWeight={600}
            sx={{ color: '#ffffff', textShadow: '2px 2px 8px rgba(0,0,0,0.8)', textAlign: 'center', letterSpacing: '0.02em' }}
          >
            Delivery en <span style={{ color: '#FDBB2F' }}>Santiago</span>
          </Typography>
        </Container>
      </Box>

      {/* ── Propósito / Misión / Visión ── */}
      <Box sx={{ maxWidth: "1100px", mx: "auto", mt: { xs: 5, sm: 6 }, px: { xs: 2.5, sm: 4, md: 6 }, pb: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <Box
            sx={{
              borderRadius: 3,
              background: "linear-gradient(135deg, #0c2a1e 0%, #017458 100%)",
              px: { xs: 3, sm: 5 },
              py: { xs: 3.5, sm: 4.5 },
              mb: { xs: 2.5, sm: 3 },
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
              <Box sx={{ width: 28, height: 3, borderRadius: 99, background: "#FDBB2F" }} />
              <Typography sx={{ fontSize: "0.9rem", fontWeight: 700, color: "#FDBB2F", letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "'Poppins', sans-serif" }}>
                Propósito
              </Typography>
            </Box>
            <Typography
              sx={{ fontSize: { xs: "1.05rem", sm: "1.3rem" }, fontWeight: 700, color: "#ffffff", fontFamily: "'Poppins', sans-serif", lineHeight: 1.55, mb: 2 }}
            >
              Llevar lo mejor para tu hogar de forma simple, rápida y con la calidez de quien te atiende de verdad.
            </Typography>
            {[
              "Creemos que comprar no debería ser complicado. Por eso nuestro proceso es directo: nos escribes, coordinamos y te despachamos. Sin formularios, sin esperas innecesarias.",
              "Con más de 10 años en el rubro, hemos aprendido que la confianza se construye entrega a entrega, y eso es exactamente lo que hacemos cada día con cada cliente.",
            ].map((t, i) => (
              <Typography key={i} sx={{ fontSize: { xs: "0.85rem", sm: "0.92rem" }, color: "rgba(255,255,255,0.76)", lineHeight: 1.8, mb: i === 0 ? 1.4 : 0, fontFamily: "'Poppins', sans-serif" }}>
                {t}
              </Typography>
            ))}
          </Box>
        </motion.div>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: { xs: 2, sm: 2.5 } }}>
          {[
            {
              label: "Misión", accent: "#1B83CC", letter: "M",
              text: "Nuestra misión es conectar a las familias de Santiago con productos de calidad para el hogar, a través de un servicio de compra simple, cercano y confiable. Atendemos por WhatsApp y redes sociales, coordinamos cada pedido de forma personalizada y despachamos a domicilio en Santiago — todo pensado para que tu experiencia sea cómoda y sin complicaciones.",
            },
            {
              label: "Visión", accent: "#FF6A00", letter: "V",
              text: "Nuestra visión es ser el referente de confianza en venta de productos para el hogar en Santiago, reconocidos por la calidad de nuestra atención y la rapidez de nuestras entregas. Queremos que cada familia que nos elija sienta que tiene a alguien cercano con quien contar — un negocio que cuida cada detalle y pone la satisfacción del cliente por encima de todo.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.12 }}
              style={{ height: "100%" }}
            >
              <Box
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  background: "#ffffff",
                  border: "1px solid rgba(10,38,30,0.07)",
                  borderTop: `4px solid ${item.accent}`,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.07)",
                  px: { xs: 2.5, sm: 3 },
                  py: { xs: 2.5, sm: 3 },
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Typography sx={{ position: "absolute", bottom: -20, right: 10, fontSize: "7rem", fontWeight: 900, color: `${item.accent}08`, lineHeight: 1, fontFamily: "'Poppins', sans-serif", userSelect: "none", pointerEvents: "none" }}>
                  {item.letter}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.8 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: "50%", background: item.accent, flexShrink: 0 }} />
                  <Typography sx={{ fontSize: "0.9rem", fontWeight: 700, color: item.accent, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "'Poppins', sans-serif" }}>
                    {item.label}
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: { xs: "0.87rem", sm: "0.93rem" }, color: "#3d5a4f", lineHeight: 1.82, fontFamily: "'Poppins', sans-serif", position: "relative", zIndex: 1 }}>
                  {item.text}
                </Typography>
              </Box>
            </motion.div>
          ))}
        </Box>
      </Box>

    </Container>
  );
};

export default Nosotros;
