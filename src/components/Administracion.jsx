import React, { useState, useEffect, useRef } from "react";
import {
  Box, Link, TextField, Button, Typography, Paper, InputAdornment,
  IconButton, useMediaQuery, Alert, useTheme, Checkbox, FormControlLabel
} from "@mui/material";
import { Visibility, VisibilityOff, EmailRounded, LockRounded, InventoryRounded, TuneRounded, LocalShippingRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { validarCredenciales } from "../helpers/HelperUsuarios";
import Fade from "@mui/material/Fade";
import "./css/Administracion.css";
import CircularProgress from '@mui/material/CircularProgress';
import { motion } from 'framer-motion';

const MotionPaper = motion(Paper);

const inputSx = {
  mb: 0.5,
  '& .MuiOutlinedInput-root': {
    borderRadius: 2,
    backgroundColor: '#f6faf8',
    transition: 'background 0.2s',
    '& fieldset': { borderColor: 'rgba(0,0,0,0.1)' },
    '&:hover fieldset': { borderColor: '#8aaa9a' },
    '&.Mui-focused fieldset': { borderColor: '#2d6a4f', borderWidth: '1.5px' },
  },
  '& .MuiInputLabel-root': {
    color: '#7a9a8a',
    fontSize: '0.9rem',
    '&.Mui-focused': { color: '#2d6a4f' },
  },
  '& .MuiInputBase-input': {
    color: '#0c2a20',
    fontSize: '0.92rem',
  },
};

const inputMobileSx = {
  mb: 0.5,
  '& .MuiOutlinedInput-root': {
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.07)',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.22)' },
    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.45)' },
    '&.Mui-focused fieldset': { borderColor: 'rgba(200,140,210,0.9)', borderWidth: '1.5px' },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255,255,255,0.55)',
    fontSize: '0.9rem',
    '&.Mui-focused': { color: 'rgba(200,140,210,1)' },
  },
  '& .MuiInputBase-input': {
    color: '#fff',
    fontSize: '0.92rem',
  },
};

const Administracion = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recordarme, setRecordarme] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, type: "success", message: "" });
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const emailRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const textToType = useRef("Iniciar sesión");
  const [logoAnimacion, setLogoAnimacion] = useState("idle");
  const logoTimeoutRef = useRef(null);
  const [estadoMensaje, setEstadoMensaje] = useState("idle");
  const [logoBase, setLogoBase] = useState("/user.png");

  const showSnackbar = (type, message) => {
    setSnackbar({ open: true, type, message });
    setTimeout(() => setSnackbar(prev => ({ ...prev, open: false })), 4000);
  };

  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  const getLogoAnimado = () => {
    if (logoAnimacion === "error") return logoBase.replace(".png", "-enojada.webp");
    return logoBase;
  };

  const handleSubmit = async (e) => {
    if (logoAnimacion === "error" || isSubmitting) return;
    e.preventDefault();
    setIsSubmitting(true);

    const usuarioValido = await validarCredenciales(email, password);

    if (usuarioValido) {
      setLogoAnimacion("success");
      sessionStorage.setItem("credenciales", JSON.stringify({ email, password }));
      if (recordarme) {
        localStorage.setItem("credenciales", JSON.stringify({ email, password }));
      } else {
        localStorage.removeItem("credenciales");
      }
      sessionStorage.setItem("snackbar", JSON.stringify({
        open: true, type: "success",
        message: `Bienvenido ${usuarioValido.nombre} 😎`
      }));
      sessionStorage.setItem("usuario", JSON.stringify(usuarioValido));
      setTimeout(() => navigate("/configurar-productos", { replace: true }), 1500);
    } else {
      setLogoAnimacion("error");
      setTimeout(() => {
        setLogoAnimacion("idle");
        setIsSubmitting(false);
      }, 800);
      showSnackbar("error", "Usuario o contraseña incorrectos");
    }
  };

  useEffect(() => {
    return () => { if (logoTimeoutRef.current) clearTimeout(logoTimeoutRef.current); };
  }, []);

  useEffect(() => {
    const logos = ["/user.png"];
    setLogoBase(logos[Math.floor(Math.random() * logos.length)]);
    logos.forEach((logo) => {
      const angry = new Image();
      angry.src = logo.replace(".webp", "-enojada.webp");
    });
    window.scrollTo({ top: 0, behavior: "auto" });
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "auto"; };
  }, []);

  useEffect(() => {
    let i = 0;
    const text = textToType.current;
    const typeNext = () => {
      if (i < text.length) {
        setTypedText(text.slice(0, i + 1));
        i++;
        setTimeout(typeNext, 100);
      } else {
        setShowCursor(false);
      }
    };
    typeNext();
    return () => { i = text.length; };
  }, []);

  useEffect(() => {
    const creds = JSON.parse(localStorage.getItem("credenciales"));
    if (creds) {
      setEmail(creds.email);
      setPassword(creds.password);
      setRecordarme(true);
      if (creds.email?.toLowerCase() === "msanchez") {
        sessionStorage.setItem("mostrarAdmin", "1");
      }
    }
  }, []);

  const isError   = logoAnimacion === "error";
  const isSuccess = logoAnimacion === "success";

  return (
    <Box sx={{ height: "100vh", width: "100vw", display: "flex", overflow: "hidden" }}>

      {/* ── PANEL IZQUIERDO (solo desktop) ── */}
      {!isMobile && (
        <Box sx={{
          width: "48%", flexShrink: 0, position: "relative",
          overflow: "hidden", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", px: 6,
        }}>
          {/* Fondo */}
          <Box sx={{ position: "absolute", inset: 0, backgroundImage: "url(/fondo-administracion.webp)", backgroundSize: "cover", backgroundPosition: "center" }} />
          {/* Overlay */}
          <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(40,8,30,0.6) 0%, rgba(20,4,15,0.4) 100%)" }} />

          {/* Círculos decorativos */}
          <Box sx={{ position: "absolute", width: 420, height: 420, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.07)", top: -130, left: -130 }} />
          <Box sx={{ position: "absolute", width: 260, height: 260, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.05)", bottom: -70, right: -60 }} />
          <Box sx={{ position: "absolute", width: 110, height: 110, borderRadius: "50%", background: "rgba(255,255,255,0.03)", bottom: 130, left: 40 }} />

          {/* Separador derecho */}
          <Box sx={{
            position: "absolute", right: 0, top: "10%", bottom: "10%", width: "1px",
            background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.15) 40%, rgba(255,255,255,0.15) 60%, transparent)",
          }} />

          {/* Contenido animado */}
          <Box sx={{ position: "relative", zIndex: 1, textAlign: "center" }}>
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
              <Box component="img" src="/logo.png" alt="Happy Home & Goods"
                sx={{ width: 88, height: 88, objectFit: "contain", mb: 2.5, filter: "drop-shadow(0 4px 20px rgba(0,0,0,0.5))" }} />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}>
              <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: "2rem", color: "#fff", lineHeight: 1.15, mb: 1, textShadow: "0 2px 16px rgba(0,0,0,0.6)" }}>
                Happy Home<br />&amp; Goods
              </Typography>
              <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, maxWidth: 240, mx: "auto", mb: 3.5 }}>
                Panel de administración
              </Typography>
            </motion.div>

            {/* Feature chips */}
            {[
              { icon: <InventoryRounded sx={{ fontSize: 15 }} />, label: "Gestión de productos" },
              { icon: <LocalShippingRounded sx={{ fontSize: 15 }} />, label: "Control de pedidos" },
              { icon: <TuneRounded sx={{ fontSize: 15 }} />, label: "Configuraciones" },
            ].map((chip, i) => (
              <motion.div
                key={chip.label}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.28 + i * 0.1, ease: "easeOut" }}
              >
                <Box sx={{
                  display: "inline-flex", alignItems: "center", gap: 1,
                  px: 2, py: 0.9, mb: 1.2, borderRadius: 3,
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  backdropFilter: "blur(6px)",
                  width: "100%", maxWidth: 230,
                }}>
                  <Box sx={{ color: "rgba(255,255,255,0.6)", display: "flex" }}>{chip.icon}</Box>
                  <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>
                    {chip.label}
                  </Typography>
                </Box>
              </motion.div>
            ))}

            {/* Dots */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.5 }}>
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1, mt: 3 }}>
                <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "rgba(255,255,255,0.2)" }} />
                <Box sx={{ width: 22, height: 6, borderRadius: 3, bgcolor: "rgba(255,255,255,0.55)" }} />
                <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "rgba(255,255,255,0.2)" }} />
              </Box>
            </motion.div>
          </Box>
        </Box>
      )}

      {/* ── PANEL DERECHO (formulario) ── */}
      <Box sx={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        px: isMobile ? 2.5 : 5,
        // Mobile: usa el mismo fondo morado
        ...(isMobile && {
          backgroundImage: "url(/fondo-administracion.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }),
        ...(!isMobile && {
          background: "linear-gradient(145deg, #2a0a26 0%, #3d1238 60%, #4a1a45 100%)",
        }),
      }}>
        {/* Overlay mobile */}
        {isMobile && (
          <Box sx={{ position: "absolute", inset: 0, background: "rgba(12,2,10,0.55)" }} />
        )}

        <MotionPaper
          elevation={isMobile ? 0 : 3}
          initial={{ opacity: 0, y: 24 }}
          animate={{
            opacity: 1,
            y: 0,
            background: isError
              ? "linear-gradient(145deg, #5c0000, #8b0000, #d32f2f)"
              : isSuccess
                ? "linear-gradient(145deg, #0a2e0c, #1b4d1e, #2e7d32)"
                : isMobile
                  ? "linear-gradient(145deg, #1c0616, #240818, #1c0616)"
                  : "linear-gradient(145deg, #ffffff, #fafafa, #ffffff)",
          }}
          transition={{ duration: isError ? 0.35 : 0.75, ease: "easeInOut" }}
          sx={{
            position: "relative",
            zIndex: 1,
            overflow: "hidden",
            width: "100%",
            maxWidth: 400,
            borderRadius: 4,
            backdropFilter: isMobile ? "blur(24px)" : "none",
            border: isMobile ? "1px solid rgba(255,255,255,0.18)" : "none",
            p: isMobile ? 3.5 : 4,
            minHeight: 420,
            boxShadow: isError
              ? "0 8px 40px rgba(180,0,0,0.45)"
              : isMobile
                ? "0 12px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06) inset"
                : "0 8px 40px rgba(0,0,0,0.1)",
          }}
        >
          {/* Avatar normal (se difumina en éxito) */}
          <Box sx={{
            opacity: isSuccess ? 0 : 1,
            transition: "opacity 0.3s ease",
            display: "flex", flexDirection: "column", alignItems: "center", mb: 3,
          }}>
              <Box sx={{
                width: 76, height: 76, borderRadius: "50%", padding: "3px", mb: 2,
                background: isError
                  ? "radial-gradient(circle at 30% 30%, #ff8a80, #e53935, #b71c1c)"
                  : "linear-gradient(135deg, #60195e, #8b2e87, #a040a0)",
                transition: "background 0.4s ease",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Box sx={{
                  width: "100%", height: "100%", borderRadius: "50%",
                  bgcolor: isError ? "#3b0000" : "#1a0418",
                  overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "background-color 0.4s ease",
                }}>
                  <motion.img
                    src={getLogoAnimado()}
                    alt="User"
                    style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%", transformOrigin: "center center" }}
                    animate={
                      logoAnimacion === "error"
                        ? { x: [-6, 6, -5, 5, -2, 2, 0] }
                        : { rotate: 0, x: 0 }
                    }
                    transition={{ duration: logoAnimacion === "error" ? 0.5 : 1.2, ease: "easeInOut", repeat: 0 }}
                  />
                </Box>
              </Box>

              <Typography sx={{
                fontFamily: "monospace", fontWeight: 700, fontSize: "1.25rem",
                color: (isMobile || isError) ? "#fff" : "#0c2a20",
                minHeight: "1.5em", letterSpacing: "0.01em", transition: "color 0.35s ease",
              }}>
                {estadoMensaje === "cargando" ? <DotsAnimation /> :
                 estadoMensaje === "error" ? "Usuario incorrecto" : (
                   <>
                     {typedText}
                     {showCursor && <span style={{ display: "inline-block", fontWeight: "bold", transform: "scaleX(1.8)" }}>|</span>}
                   </>
                 )}
              </Typography>
              <Typography sx={{
                fontSize: "0.78rem",
                color: (isMobile || isError) ? "rgba(255,255,255,0.5)" : "#8aaa9a",
                mt: 0.3, transition: "color 0.35s ease",
              }}>
                Panel de administración
              </Typography>
            </Box>

          {/* Check centrado absoluto en éxito */}
          {isSuccess && (
            <Box sx={{
              position: "absolute", inset: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1.55, opacity: 1 }}
                transition={{ type: "spring", stiffness: 160, damping: 16, delay: 0.35 }}
              >
                <Box sx={{
                  width: 76, height: 76, borderRadius: "50%", padding: "3px",
                  background: "linear-gradient(135deg, #1b5e20, #2e7d32, #43a047)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Box sx={{
                    width: "100%", height: "100%", borderRadius: "50%",
                    bgcolor: "#0a2e0c",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <motion.svg
                      viewBox="0 0 24 24" fill="none"
                      stroke="white" strokeWidth="2.5"
                      strokeLinecap="round" strokeLinejoin="round"
                      style={{ width: 40, height: 40 }}
                    >
                      <motion.path
                        d="M5 13l4 4L19 7"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.45, ease: "easeOut", delay: 0.2 }}
                      />
                    </motion.svg>
                  </Box>
                </Box>
              </motion.div>
            </Box>
          )}

          {/* Formulario — siempre en el DOM para preservar altura del card */}
          <Box component="form" onSubmit={handleSubmit}
            sx={{ opacity: isSuccess ? 0 : 1, pointerEvents: isSuccess ? "none" : "auto", transition: "opacity 0.25s ease" }}
          >
            <TextField
              inputRef={emailRef}
              fullWidth
              variant="outlined"
              label="Usuario o correo"
              size="small"
              margin="dense"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailRounded sx={{ fontSize: 18, color: isMobile ? "rgba(255,255,255,0.35)" : "#a0bfb0" }} />
                  </InputAdornment>
                ),
              }}
              sx={isMobile ? inputMobileSx : inputSx}
            />

            <TextField
              fullWidth
              type={showPassword ? "text" : "password"}
              variant="outlined"
              label="Contraseña"
              size="small"
              margin="dense"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockRounded sx={{ fontSize: 18, color: isMobile ? "rgba(255,255,255,0.35)" : "#a0bfb0" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword} edge="end" size="small"
                      sx={{ color: isMobile ? "rgba(255,255,255,0.5)" : "#8aaa9a" }}>
                      {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={isMobile ? inputMobileSx : inputSx}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={recordarme}
                  onChange={(e) => setRecordarme(e.target.checked)}
                  size="small"
                  sx={{
                    color: isMobile ? "rgba(255,255,255,0.3)" : "#bbb",
                    '&.Mui-checked': { color: isMobile ? "rgba(255,255,255,0.8)" : "#60195e" },
                  }}
                />
              }
              label={
                <Typography sx={{ fontSize: "0.8rem", color: (isMobile || isError) ? "rgba(255,255,255,0.55)" : "#8aaa9a" }}>
                  Recordarme
                </Typography>
              }
              sx={{ mt: 0.5, mb: 1.5 }}
            />

            <motion.div
              initial={false}
              animate={{ scale: isSubmitting ? 0.98 : 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isSubmitting}
                sx={{
                  py: 1.3,
                  borderRadius: 2,
                  background: isError
                    ? "linear-gradient(135deg, #c62828, #e53935)"
                    : "linear-gradient(135deg, #60195e, #8b2e87)",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "0.92rem",
                  textTransform: "none",
                  letterSpacing: "0.02em",
                  boxShadow: isError
                    ? "0 4px 16px rgba(229,57,53,0.35)"
                    : "0 4px 20px rgba(96,25,94,0.4)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: "linear-gradient(135deg, #4a1248, #7a2678)",
                    boxShadow: "0 6px 24px rgba(96,25,94,0.5)",
                  },
                  "&.Mui-disabled": {
                    background: isMobile ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
                    color: isMobile ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.25)",
                  },
                }}
              >
                {isSubmitting
                  ? <CircularProgress size={22} sx={{ color: "#fff" }} />
                  : "Ingresar"}
              </Button>
            </motion.div>

            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Link
                component="button"
                type="button"
                onClick={() => {
                  sessionStorage.removeItem("credenciales");
                  localStorage.removeItem("credenciales");
                  navigate("/");
                }}
                underline="hover"
                sx={{
                  color: (isMobile || isError) ? "rgba(255,255,255,0.4)" : "#aaa",
                  fontSize: "0.82rem",
                  transition: "color 0.35s ease",
                  "&:hover": { color: (isMobile || isError) ? "rgba(255,255,255,0.8)" : "#60195e" },
                }}
              >
                ← Volver al inicio
              </Link>
            </Box>
          </Box>
        </MotionPaper>
      </Box>

      {/* Snackbar */}
      <Fade in={snackbar.open} timeout={{ enter: 400, exit: 400 }} unmountOnExit>
        <Box sx={{
          position: "fixed", bottom: 40, left: "50%", transform: "translateX(-50%)",
          width: "90%", maxWidth: 380, zIndex: 9999,
        }}>
          <Alert
            severity={snackbar.type}
            onClose={() => setSnackbar(p => ({ ...p, open: false }))}
            sx={{ borderRadius: 2, boxShadow: 3 }}
          >
            {snackbar.message}
          </Alert>
        </Box>
      </Fade>
    </Box>
  );
};

const DotsAnimation = () => {
  const [dots, setDots] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length < 3 ? prev + "." : ""));
    }, 500);
    return () => clearInterval(interval);
  }, []);
  return <span style={{ fontWeight: "bold" }}>Cargando{dots}</span>;
};

export default Administracion;
