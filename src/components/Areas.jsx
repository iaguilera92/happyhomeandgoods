import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import SentimentVerySatisfiedRoundedIcon from "@mui/icons-material/SentimentVerySatisfiedRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import RouteRoundedIcon from "@mui/icons-material/RouteRounded";
import { motion } from "framer-motion";

const pasos = [
  {
    step: 1,
    icon: <WhatsAppIcon sx={{ fontSize: 32, color: "#fff" }} />,
    color: "#25D366",
    glow: "rgba(37,211,102,0.25)",
    title: "Nos contactas",
    description: "Escríbenos por WhatsApp o redes sociales. Cuéntanos qué producto buscas y te respondemos de inmediato.",
  },
  {
    step: 2,
    icon: <CheckCircleRoundedIcon sx={{ fontSize: 32, color: "#fff" }} />,
    color: "#1B83CC",
    glow: "rgba(27,131,204,0.25)",
    title: "Confirmamos tu pedido",
    description: "Verificamos disponibilidad, acordamos el precio y coordinamos la forma de pago de manera simple y segura.",
  },
  {
    step: 3,
    icon: <LocalShippingRoundedIcon sx={{ fontSize: 32, color: "#fff" }} />,
    color: "#FF6A00",
    glow: "rgba(255,106,0,0.25)",
    title: "Preparamos y despachamos",
    description: "Preparamos tu pedido y lo enviamos a domicilio en Santiago. Coordina tu delivery de forma simple y rápida.",
  },
  {
    step: 4,
    icon: <SentimentVerySatisfiedRoundedIcon sx={{ fontSize: 32, color: "#fff" }} />,
    color: "#017458",
    glow: "rgba(1,116,88,0.25)",
    title: "¡Disfruta tu compra!",
    description: "Recibes tu producto en perfectas condiciones. Tu satisfacción es nuestra prioridad en cada entrega.",
  },
];

function Areas() {
  const wsp = "https://wa.me/56948898681";

  return (
    <Box
      sx={{
        position: "relative",
        background: "#f7f4ee",
        pt: { xs: 2, sm: 3 },
        pb: { xs: 3, sm: 4 },
      }}
    >
      <Container sx={{ maxWidth: { xs: "980px !important", md: "1100px !important" } }}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Título */}
          <Box sx={{ textAlign: "center", mb: { xs: 3, sm: 4 } }}>
            {/* Ícono */}
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: { xs: 52, sm: 62 },
                height: { xs: 52, sm: 62 },
                borderRadius: "18px",
                background: "linear-gradient(135deg, #0c2a20 0%, #017458 100%)",
                boxShadow: "0 8px 24px rgba(1,116,88,0.28)",
                mb: 1.8,
              }}
            >
              <RouteRoundedIcon sx={{ fontSize: { xs: 28, sm: 34 }, color: "#fff" }} />
            </Box>

            {/* Etiqueta */}
            <Box sx={{ mb: 1 }}>
              <Box
                component="span"
                sx={{
                  display: "inline-block",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  fontSize: { xs: "0.7rem", sm: "0.78rem" },
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#017458",
                  bgcolor: "rgba(1,116,88,0.08)",
                  px: 1.5,
                  py: 0.4,
                  borderRadius: 99,
                }}
              >
                Tu pedido en 4 pasos
              </Box>
            </Box>

            <Typography
              sx={{
                mt: 0.8,
                color: "#4f6760",
                fontSize: { xs: "0.88rem", sm: "0.98rem" },
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              De tu mensaje a tu puerta en pocos pasos
            </Typography>
          </Box>

          {/* Cards */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr 1fr", md: "1fr 28px 1fr 28px 1fr 28px 1fr" },
              gap: { xs: 1.5, sm: 2 },
              alignItems: "stretch",
            }}
          >
            {pasos.map((paso, i) => {
              const isLast = i === pasos.length - 1;
              return (
              <React.Fragment key={paso.step}>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1, ease: "easeOut" }}
                style={{ height: "100%" }}
              >
                <Box
                  sx={{
                    position: "relative",
                    borderRadius: 4,
                    background: isLast
                      ? "linear-gradient(135deg, #a06200 0%, #e8970a 25%, #ffd000 50%, #e8970a 75%, #a06200 100%)"
                      : "#ffffff",
                    overflow: isLast ? "hidden" : "visible",
                    "@keyframes goldShine": {
                      "0%":   { left: "-80%" },
                      "60%":  { left: "130%" },
                      "100%": { left: "130%" },
                    },
                    ...(isLast && {
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: "-30%",
                        left: "-80%",
                        width: "55%",
                        height: "160%",
                        background: "linear-gradient(110deg, rgba(255,255,255,0) 0%, rgba(255,255,220,0.82) 50%, rgba(255,255,255,0) 100%)",
                        transform: "skewX(-14deg)",
                        animation: "goldShine 2.2s ease-in-out infinite",
                        pointerEvents: "none",
                        zIndex: 2,
                      },
                    }),
                    border: isLast ? "none" : "1px solid rgba(10,38,30,0.07)",
                    boxShadow: isLast
                      ? "0 12px 36px rgba(196,146,0,0.35)"
                      : "0 8px 28px rgba(0,0,0,0.06)",
                    px: { xs: 1.8, sm: 2.2 },
                    py: { xs: 2.2, sm: 2.8 },
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5,
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: isLast
                        ? "0 20px 44px rgba(196,146,0,0.45)"
                        : `0 16px 36px rgba(0,0,0,0.1), 0 0 0 2px ${paso.color}22`,
                    },
                  }}
                >
                  {/* Badge en paso 4 */}
                  {isLast && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 10,
                        right: 12,
                        background: "rgba(255,255,255,0.25)",
                        fontSize: "1.1rem",
                        lineHeight: 1,
                        px: 0.8,
                        py: 0.4,
                        borderRadius: 99,
                        zIndex: 3,
                      }}
                    >
                      🎉
                    </Box>
                  )}

                  {/* Número step */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 12,
                      right: 14,
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 900,
                      fontSize: "2.2rem",
                      color: isLast ? "rgba(255,255,255,0.08)" : "rgba(10,38,30,0.06)",
                      lineHeight: 1,
                      userSelect: "none",
                    }}
                  >
                    {paso.step}
                  </Box>

                  {/* Ícono */}
                  <Box
                    sx={{
                      width: 58,
                      height: 58,
                      borderRadius: "16px",
                      background: isLast
                        ? "rgba(255,255,255,0.18)"
                        : `linear-gradient(135deg, ${paso.color} 0%, ${paso.color}cc 100%)`,
                      boxShadow: isLast
                        ? "0 8px 20px rgba(0,0,0,0.15)"
                        : `0 8px 20px ${paso.glow}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {paso.icon}
                  </Box>

                  {/* Texto */}
                  <Box>
                    <Typography
                      sx={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 800,
                        fontSize: { xs: "0.92rem", sm: "1rem" },
                        color: isLast ? "#ffffff" : "#0c2a20",
                        lineHeight: 1.2,
                        mb: 0.7,
                      }}
                    >
                      {paso.title}
                    </Typography>
                    <Typography
                      sx={{
                        color: isLast ? "rgba(255,255,255,0.75)" : "#5a7068",
                        fontSize: { xs: "0.8rem", sm: "0.85rem" },
                        lineHeight: 1.6,
                        fontFamily: "'Poppins', sans-serif",
                      }}
                    >
                      {paso.description}
                    </Typography>
                  </Box>

                  {/* Línea inferior (solo cards 1-3) */}
                  {!isLast && (
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 3,
                        borderRadius: "0 0 16px 16px",
                        background: `linear-gradient(90deg, ${paso.color}, ${paso.color}66)`,
                      }}
                    />
                  )}
                </Box>
              </motion.div>

              {/* Flecha entre cards — solo desktop */}
              {i < pasos.length - 1 && (
                <Box
                  key={`arrow-${i}`}
                  sx={{
                    display: { xs: "none", md: "flex" },
                    alignItems: "center",
                    justifyContent: "center",
                    alignSelf: "center",
                  }}
                >
                  <ArrowForwardRoundedIcon
                    sx={{ color: pasos[i].color, fontSize: 22, opacity: 0.5 }}
                  />
                </Box>
              )}
              </React.Fragment>
              );
            })}
          </Box>


          {/* CTA */}
          <Box
            sx={{
              mt: { xs: 3, sm: 4 },
              py: { xs: 3, sm: 3.5 },
              px: { xs: 2, sm: 4 },
              borderRadius: 4,
              background: "linear-gradient(135deg, #0c2a20 0%, #017458 100%)",
              textAlign: "center",
              boxShadow: "0 12px 32px rgba(1,116,88,0.25)",
            }}
          >
            <Typography
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: { xs: "1.05rem", sm: "1.35rem" },
                color: "#ffffff",
                mb: { xs: 1.8, sm: 2.2 },
              }}
            >
              ¿Listo para hacer tu pedido?
            </Typography>
            <Button
              component="a"
              href={wsp}
              target="_blank"
              rel="noopener"
              variant="contained"
              startIcon={<WhatsAppIcon />}
              sx={{
                background: "#25D366",
                color: "#fff",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 800,
                fontSize: { xs: "0.9rem", sm: "1rem" },
                px: { xs: 3.5, sm: 5 },
                py: { xs: 1.2, sm: 1.5 },
                borderRadius: 99,
                textTransform: "none",
                boxShadow: "0 4px 18px rgba(37,211,102,0.4)",
                "&:hover": {
                  background: "#1ebe5a",
                  boxShadow: "0 6px 22px rgba(37,211,102,0.55)",
                },
              }}
            >
              Escríbenos por WhatsApp
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}

export default Areas;
