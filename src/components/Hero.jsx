import { useState, useEffect } from "react";
import { Container, Typography, Box, useMediaQuery, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./css/Hero.css";

function AnimatedLine({ text, delay = 0, startDelay = 0, size, color = "#ffffff", weight = 800, stroke, isMobile, isRepeat = false }) {
  const letters = text.split("");
  return (
    <Typography
      variant="h3"
      sx={{
        fontSize: size || (isMobile ? "1.1rem !important" : "2rem !important"),
        whiteSpace: "pre-line",
        textAlign: "center",
        position: "relative",
        display: "inline-block",
        lineHeight: 1,
        marginBottom: 0,
        letterSpacing: "0.02em",
        maxWidth: isMobile ? "92vw" : "none",
      }}
    >
      {letters.map((char, index) => (
        <motion.span
          key={`${char}-${index}-${text}`}
          initial={isRepeat ? { y: 0, opacity: 1 } : { y: -30, opacity: 0 }}
          animate={isRepeat ? { y: [0, -10, 0], opacity: 1 } : { y: 0, opacity: 1 }}
          transition={isRepeat
            ? { duration: 0.45, ease: "easeInOut", delay: startDelay + index * 0.035 }
            : { duration: 0.25, ease: "easeOut", delay: startDelay + delay + index * 0.03 }
          }
          style={{
            position: "relative",
            display: "inline-block",
            whiteSpace: "pre",
            color,
            fontWeight: weight,
            textShadow: "0 3px 14px rgba(0,0,0,0.45)",
            WebkitTextStroke: stroke || "0px transparent",
          }}
        >
          {char}
        </motion.span>
      ))}
    </Typography>
  );
}

function Hero({ onStartClick }) {
  const [showContent, setShowContent] = useState(false);
  const [pulse, setPulse] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setShowContent(true), 200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setPulse((p) => p + 1), 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: "360px", sm: "480px", md: "560px" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      {/* Fondo mobile */}
      {isMobile && (
        <Box
          component="img"
          src="/fondo-mobile.avif"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "120%",
            objectFit: "cover",
            objectPosition: "center bottom",
          }}
        />
      )}
      {/* Fondo desktop */}
      <Box
        sx={{
          display: { xs: "none", sm: "block" },
          position: "absolute",
          inset: 0,
          backgroundImage: "url(/fondo-principal.avif)",
          backgroundSize: "cover",
          backgroundPosition: { sm: "center -80px", md: "center -180px" },
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Overlay oscuro suave para legibilidad del texto */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.32) 100%)",
        }}
      />

      {/* Contenido */}
      {showContent && (
        <Container
          sx={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: { xs: 1.5, sm: 2 },
            pt: { xs: 6, sm: 8 },
          }}
        >
          <AnimatedLine
            key={pulse}
            text="Bienvenidos a Happy Home & Goods"
            isRepeat={pulse > 0}
            startDelay={0.2}
            size={isMobile ? "1.1rem !important" : "1.9rem !important"}
            color="#ffffff"
            weight={700}
            stroke={isMobile ? "0.4px rgba(255,255,255,0.65)" : "0.8px rgba(255,255,255,0.75)"}
            isMobile={isMobile}
          />

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.3 }}
          >
            <Typography
              sx={{
                fontSize: { xs: "0.82rem", sm: "1.1rem" },
                color: "rgba(255,255,255,0.92)",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 400,
                textShadow: "0 2px 8px rgba(0,0,0,0.4)",
                maxWidth: { xs: "82vw", sm: "520px" },
              }}
            >
              <Box component="span" sx={{ fontWeight: 700, color: "#FFD54F" }}>
                Delivery en Santiago.
              </Box>
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.55 }}
            style={{ marginTop: isMobile ? "20px" : "52px" }}
          >
            <button className="btn-3" onClick={() => navigate("/nosotros")}>
              <span>Nosotros</span>
            </button>
          </motion.div>
        </Container>
      )}
    </Box>
  );
}

export default Hero;
