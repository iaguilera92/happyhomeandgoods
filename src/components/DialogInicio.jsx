import React, { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogTitle,
  Button,
  Box,
  useTheme,
  useMediaQuery,
  IconButton,
  Typography,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const stagger = {
  hidden: { opacity: 0, y: 14 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, delay: 0.08 * i },
  }),
};

export default function DialogSelector({ open, onClose, onSelect }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [rememberChoice, setRememberChoice] = useState(true);
  const [isSelecting, setIsSelecting] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (open) {
      setSelected(null);
      setIsSelecting(false);
      setMouseOffset({ x: 0, y: 0 });
    }
  }, [open]);

  const options = useMemo(
    () => [
      {
        label: "For Kids",
        value: "kids",
        toneA: "#1aa97a",
        toneB: "#0b7f59",
        icon: <SportsEsportsIcon sx={{ fontSize: 22 }} />,
        description: "Stories, videos, games.",
      },
      {
        label: "Parents",
        value: "parents",
        toneA: "#2c95e3",
        toneB: "#0f6fb8",
        icon: <FamilyRestroomIcon sx={{ fontSize: 22 }} />,
        description: "Support your child at home.",
      },
      {
        label: "Coaches",
        value: "coaches",
        toneA: "#f08b32",
        toneB: "#cf6710",
        icon: <EmojiEventsIcon sx={{ fontSize: 22 }} />,
        description: "Teach with confidence.",
      },
    ],
    []
  );

  const playClick = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.value = 620;
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch {
      // ignore audio failures silently
    }
  };

  const routeByCategory = {
    kids: "/kids",
    parents: "/parents",
    coaches: "/coaches",
  };

  const handleSelect = (option) => {
    if (isSelecting) return;
    playClick();
    setSelected(option.value);
    setIsSelecting(true);

    const payload = { value: option.value, remember: rememberChoice };
    if (onSelect) onSelect(payload);

    if (!rememberChoice) {
      localStorage.removeItem("user_category");
      localStorage.removeItem("remember_category_choice");
      sessionStorage.setItem("user_category", option.value);
    } else {
      localStorage.setItem("user_category", option.value);
      localStorage.setItem("remember_category_choice", "1");
    }

    const nextRoute = routeByCategory[option.value];
    setTimeout(() => {
      if (nextRoute) navigate(nextRoute);
    }, 260);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={false}
      BackdropProps={{
        sx: {
          background:
            "radial-gradient(circle at 50% 30%, rgba(255,255,255,0.07) 0%, rgba(0,0,0,0.86) 58%)",
          backdropFilter: "blur(4px)",
        },
      }}
      PaperProps={{
        component: motion.div,
        sx: {
          width: { xs: "95%", sm: 700 },
          minHeight: { xs: "43%", sm: 415 },
          borderRadius: 3,
          pt: { xs: 6, sm: 5 }, // ?? espacio reservado para la X
          pb: { xs: 2.1, sm: 3.5 },
          px: { xs: 2.1, sm: 3.5 },
          background: "linear-gradient(135deg, #d6f5d0 0%, #8fd39a 58%, #e9fff2 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "visible",
        },
      }}
    >

      {/* BOTÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œN CERRAR */}
      <IconButton
        aria-label="Close category dialog"
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 16, // ?? antes 10
          right: 16,
          color: "black",
          zIndex: 10,
          width: 40,
          height: 40,
          "&:hover": { backgroundColor: "rgba(255,255,255,.15)" },
        }}
      >
        <CloseRoundedIcon
          sx={{
            fontSize: 28,
            animation: open ? "spinTwiceIcon 0.6s ease-in-out" : "none",
            transformOrigin: "center",
          }}
        />
      </IconButton>

      <motion.div
        custom={1}
        variants={stagger}
        initial="hidden"
        animate="visible"
        style={{ width: "100%" }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: 900,
            fontSize: { xs: "1.02rem", sm: "1.6rem" },
            fontFamily: "'Poppins', sans-serif",
            mb: 2.4,
            mt: 1.5, // ?? espacio para la X
            color: "#0d2b45",
            letterSpacing: "0.03em",
            lineHeight: 1.1,
            px: 3,
            py: 1,
            borderRadius: 99,
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.82) 0%, rgba(232,247,255,0.74) 100%)",
            border: "1px solid rgba(13,43,69,0.12)",
            boxShadow: "0 8px 16px rgba(13,43,69,0.12)",
          }}
        >
          {"Select your Category ⛳"}
        </DialogTitle>
      </motion.div>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mt: 1,
        }}
      >
        {options.map((option, index) => (
          <motion.div key={option.value} custom={3 + index} variants={stagger} initial="hidden" animate="visible" whileTap={{ scale: 0.985 }}>
            <Button
              fullWidth
              aria-label={`Select ${option.label}`}
              onClick={() => handleSelect(option)}
              sx={{
                textTransform: "none",
                py: isMobile ? 1.25 : 1.45,
                px: isMobile ? 1.2 : 1.5,
                borderRadius: 99,
                position: "relative",
                overflow: "hidden",
                justifyContent: "flex-start",
                gap: 1.1,
                color: "#fff",
                border: selected === option.value
                  ? "2px solid rgba(255,255,255,0.95)"
                  : "1px solid rgba(255,255,255,0.45)",
                background: `linear-gradient(120deg, ${option.toneA} 0%, ${option.toneB} 100%)`,
                boxShadow: selected === option.value
                  ? "0 0 0 2px rgba(255,255,255,0.26), 0 7px 14px rgba(0,0,0,0.2)"
                  : "0 4px 10px rgba(0,0,0,0.16)",
                transition: "all 0.2s ease",
                "&:hover": {
                  transform: "translateY(-1px)",
                },
                "&:focus-visible": {
                  outline: "3px solid rgba(255,255,255,0.88)",
                  outlineOffset: 2,
                },
              }}
            >
              <Box
                sx={{
                  minWidth: 40,
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  color: option.toneB,
                  backgroundColor: "rgba(255,255,255,0.92)",
                  boxShadow: "inset 0 -2px 4px rgba(0,0,0,0.1)",
                  zIndex: 1,
                }}
              >
                {option.icon}
              </Box>

              <Box sx={{ flex: 1, textAlign: "left", zIndex: 1 }}>
                <Typography sx={{ fontWeight: 800, fontSize: isMobile ? "1rem" : "1.08rem", lineHeight: 1.12 }}>
                  {option.label}
                </Typography>
                <Typography sx={{ mt: 0.15, fontSize: isMobile ? "0.73rem" : "0.78rem", color: "rgba(255,255,255,0.9)" }}>
                  {option.description}
                </Typography>
              </Box>

              <Box
                sx={{
                  minWidth: 30,
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  backgroundColor: "rgba(255,255,255,0.2)",
                  border: "1px solid rgba(255,255,255,0.4)",
                  zIndex: 1,
                }}
              >
                {selected === option.value ? (
                  <CheckCircleRoundedIcon sx={{ fontSize: 18, color: "#fff" }} />
                ) : (
                  <motion.span style={{ display: "grid", placeItems: "center" }} animate={{ scale: [1, 1.14, 1] }} transition={{ duration: 1.05, repeat: Infinity, ease: "easeInOut" }}><ArrowForwardRoundedIcon sx={{ fontSize: 17, color: "#fff" }} /></motion.span>
                )}
              </Box>
            </Button>
          </motion.div>
        ))}
      </Box>


      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 110 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42, ease: "easeOut", delay: 0.08 }}
        sx={{
          position: "absolute",
          bottom: { xs: -80, sm: -90 },
          left: 0,
          right: 0,
          width: { xs: "72%", sm: 300 },
          mx: "auto",
          zIndex: 5,
        }}
      >
        <Button
          fullWidth
          onClick={() => {
            playClick();
            onClose?.();
            navigate("/catalogo");
          }}
          aria-label="Open Shop"
          sx={{
            fontWeight: 800,
            textTransform: "none",
            py: 1.25,
            borderRadius: 99,
            fontSize: { xs: "1.05rem", sm: "1.15rem" },
            position: "relative",
            overflow: "hidden",
            color: "#fff",
            textShadow: "0 1px 2px rgba(0,0,0,0.45)",
            border: "2px solid rgba(255, 230, 120, 0.95)",
            background:
              "linear-gradient(160deg, #FFE082 0%, #FFC43D 38%, #FFB300 62%, #E68A00 100%)",
            boxShadow:
              "0 0 18px rgba(255, 195, 45, 0.72), 0 8px 20px rgba(120, 72, 0, 0.42), inset 0 2px 6px rgba(255,255,255,0.35), inset 0 -7px 12px rgba(130,80,0,0.28)",
            backdropFilter: "blur(6px)",
            animation: "none",
            transition:
              "transform 0.24s, box-shadow 0.24s, filter 0.24s, background 0.24s",
                "&:hover": {
              transform: "scale(1.05)",
              filter: "brightness(1.1)",
              background:
                "linear-gradient(160deg, #FFE79A 0%, #FFC94F 35%, #FFB623 62%, #F58B00 100%)",
              boxShadow:
                "0 0 26px rgba(255, 210, 85, 0.92), 0 10px 24px rgba(120,72,0,0.54), inset 0 2px 7px rgba(255,255,255,0.42), inset 0 -7px 12px rgba(130,80,0,0.32)",
            },

            "&:active": {
              transform: "translateY(1px) scale(0.99)",
              boxShadow:
                "0 0 16px rgba(255, 190, 50, 0.75), 0 5px 12px rgba(120,72,0,0.4), inset 0 1px 5px rgba(255,255,255,0.3), inset 0 -5px 10px rgba(130,80,0,0.35)",
            },

            "&:focus-visible": {
              outline: "3px solid rgba(255,255,255,0.85)",
              outlineOffset: 2,
            },

            "@media (max-width: 420px)": {
              letterSpacing: "0.01em",
            },
          }}
        >
          <StorefrontRoundedIcon sx={{ mr: 1, fontSize: { xs: 22, sm: 20 } }} />
          Shop
        </Button>
      </Box>
    </Dialog>
  );
}

























