import { useState, useEffect } from "react";
import { AppBar, Toolbar, Button, IconButton, Drawer, Typography, ListItem, ListItemButton, ListItemText, Container, Box, useTheme, useMediaQuery, Dialog, DialogTitle, DialogContent, SvgIcon } from "@mui/material";
import { WhatsApp as WhatsAppIcon, Home, Mail, Close } from "@mui/icons-material"; // Agregamos Close para la "X"
import InstagramIcon from "@mui/icons-material/Instagram";
import { motion, AnimatePresence } from "framer-motion";
import SchoolIcon from "@mui/icons-material/School";
import { keyframes } from "@emotion/react";
import ViewListIcon from '@mui/icons-material/ViewList';
import GroupsIcon from '@mui/icons-material/Groups';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import "@fontsource/poppins";
import { useNavigate } from "react-router-dom";
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import CloseIcon from "@mui/icons-material/Close";
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
import { useLocation } from 'react-router-dom';
import Tooltip from "@mui/material/Tooltip";
import SettingsSuggestRoundedIcon from "@mui/icons-material/SettingsSuggestRounded";

const TikTokIcon = (props) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.24h-3.45v13.21a2.89 2.89 0 1 1-2.89-3 2.9 2.9 0 0 1 .72.09V9.23a6.34 6.34 0 0 0-.72-.04A6.34 6.34 0 1 0 15.82 15V8.36a8.2 8.2 0 0 0 4.77 1.53V6.69z" />
  </SvgIcon>
);


const socialData = {
  Instagram: { href: "https://www.instagram.com/happyhomeandgoods?utm_source=qr&igsh=MXhpNzc1Mndhc2FrYQ==", Icon: InstagramIcon, bgColor: "linear-gradient(45deg, #cf198c, #f41242)", hoverColor: "#cf198c" },
  TikTok: { href: "#", Icon: TikTokIcon, bgColor: "linear-gradient(45deg, #111111, #25F4EE)", hoverColor: "#25F4EE" }
};

const shrinkCircle = keyframes`0%{transform:scale(1);opacity:1;}100%{transform:scale(0);opacity:0;}`;
const expandIcon = keyframes`0%{transform:scale(1);opacity:1;}100%{transform:scale(1.5);opacity:1;}`;
const rotateTwice = keyframes`from{transform:rotate(0deg);}to{transform:rotate(720deg);}`;

const menuItemVariants = {
  hidden: { x: 60, opacity: 0 },
  visible: (i) => ({ x: 0, opacity: 1, transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" } }),
};

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const bienvenidaVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.2 } },
  exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, x: 40, transition: { duration: 0.3 } },
};



const SocialButton = ({ href, Icon, bgColor, hoverStyles }) => (
  <Box component="a" href={href} target="_blank" rel="noopener" sx={{
    width: 42, height: 42, borderRadius: "50%", position: "relative", display: "flex",
    alignItems: "center", justifyContent: "center", overflow: "hidden",
    "&:hover .circle": { animation: `${shrinkCircle} 300ms forwards` },
    "&:hover .icon": { animation: `${expandIcon} 300ms forwards`, ...hoverStyles },
  }}>
    <Box className="circle" sx={{
      position: "absolute", width: "100%", height: "100%", borderRadius: "50%",
      background: bgColor, transition: "transform 300ms ease-out",
    }} />
    <Icon className="icon" sx={{
      color: "white", fontSize: 26, position: "absolute",
      transition: "color 300ms ease-in, transform 300ms ease-in",
    }} />
  </Box>
);

const menuItems = [
  { name: "Inicio", icon: <Home /> },
  { name: "Nosotros", icon: <GroupsIcon /> },
  { name: "Contacto", icon: <Mail /> },
];

function Navbar({ contactoRef, informationsRef, videoReady }) {
  const [open, setOpen] = useState(false), [isScrolled, setIsScrolled] = useState(false), [openPDF, setOpenPDF] = useState(false);
  const theme = useTheme(), isMobile = useMediaQuery(theme.breakpoints.down('sm')), navigate = useNavigate();
  const pdfSrc = `/plataformasweb-pdf.pdf#zoom=${isMobile ? 100 : 60}`;
  const location = useLocation();
  const isHome = location.pathname === "/" || location.pathname === "";
  const hasBanner = isHome || location.pathname === "/parents" || location.pathname === "/nosotros";
  const navActive = isScrolled;
  const mostrarAnimacion = videoReady || (location.pathname !== '/' && location.pathname !== '');
  const [animacionMostrada, setAnimacionMostrada] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const maxScroll = 80; // hasta donde se desvanece
  const opacity = Math.max(0, 1 - scrollY / maxScroll);
  const translateY = Math.min(scrollY, maxScroll);
  const [mostrarAdmin, setMostrarAdmin] = useState(false);
  const [titulo, setTitulo] = useState("🚚 Delivery en Santiago");
  const [mostrarTexto, setMostrarTexto] = useState(true);
  const [cartOut, setCartOut] = useState(false);
  const [appReady, setAppReady] = useState(() => document.documentElement.dataset.appReady === "1");

  useEffect(() => {
    // ? cada vez que cambia la ruta, forzamos a mostrar el banner y el logo
    setAnimacionMostrada(true);
    setTitulo("🚚 Delivery en Santiago");
  }, [location.pathname]);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const handleOpenPDF = () => isMobile ? window.open("/plataformasweb-pdf.pdf", "_blank") : setOpenPDF(true);
  const handleClosePDF = () => setOpenPDF(false);

  const goToCatalogo = () => {
    if (location.pathname === "/catalogo") {
      document.body.classList.remove("nav-white");
      scrollToTop();
      return;
    }

    // muestra blanco inmediato
    document.body.classList.add("nav-white");

    requestAnimationFrame(() => {
      navigate("/catalogo", { replace: true });
    });
  };

  const handleClick = (item) => {
    setOpen(false);

    const actions = {
      Contacto: () => {
        if (location.pathname === "/") {
          contactoRef.current?.scrollIntoView({ behavior: "smooth" });
        } else {
          navigate("/", { state: { scrollTo: "contacto" } });
        }
      },
      Inicio: () =>
        location.pathname !== "/" ? navigate("/") : scrollToTop(),
      "Catálogo": goToCatalogo,
      Nosotros: () => navigate("/nosotros"),
    };

    actions[item.name]?.();
  };


  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const LogoInicio = () => (navigate("/"), scrollToTop());

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const flag = sessionStorage.getItem("mostrarAdmin");
    if (flag === "1") {
      setMostrarAdmin(true);
    }
  }, []);

  useEffect(() => {
    if (appReady) return;
    const handler = () => setAppReady(true);
    window.addEventListener("app:ready", handler);
    return () => window.removeEventListener("app:ready", handler);
  }, [appReady]);

  // Camión sale a los 2s tras appReady, transición a los 5.5s, ciclo total ~11s
  useEffect(() => {
    if (!appReady) return;
    let cartTimer = setTimeout(() => setCartOut(true), 2000);
    const intervalo = setInterval(() => {
      setCartOut(false);
      setMostrarTexto((prev) => {
        const next = !prev;
        if (next) {
          cartTimer = setTimeout(() => setCartOut(true), 2000);
        }
        return next;
      });
    }, 5500);
    return () => { clearInterval(intervalo); clearTimeout(cartTimer); };
  }, [appReady]);

  const drawerMenuItems = [
    ...menuItems.filter((item) => item.name !== "Shop"),
    ...menuItems.filter((item) => item.name === "Shop"),
  ];

  const Hamburger = ({ color, active }) => (
    <Box
      sx={{
        width: 50,
        height: 50,
        borderRadius: "16px",
        border: active ? "1px solid rgba(255,255,255,0.16)" : "1px solid rgba(255,255,255,0.0)",
        background: active ? "linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 100%)" : "transparent",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "6px",
        cursor: "pointer",
        transition: "all 0.3s ease",
        boxShadow: active ? "0 10px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.18)" : "none",
        "&:hover": {
          background: active ? "linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.06) 100%)" : "transparent",
        },
        "& span": {
          width: 22,
          height: 2,
          background: color,
          display: "block",
          borderRadius: 2,
        },
      }}
    >
      <Box component="span" />
      <Box component="span" />
      <Box component="span" />
    </Box>
  );

  return (
    <>

      {/* Banner rotativo */}
      {!["/dashboard", "/administracion", "/configurar-productos", "/configurar-trabajos"].includes(location.pathname) && <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1200,
          background: mostrarTexto
            ? "linear-gradient(90deg, #b71c1c 0%, #c62828 50%, #b71c1c 100%)"
            : "linear-gradient(90deg, #1b5e20 0%, #25D366 50%, #1b5e20 100%)",
          height: "30px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          transition: "background 0.6s ease",
          cursor: mostrarTexto ? "default" : "pointer",
        }}
        onClick={() => !mostrarTexto && window.open("https://wa.me/56948898681", "_blank")}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={mostrarTexto ? "envios" : "wsp"}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.35 }}
          >
            <Typography
              sx={{
                color: "#ffffff",
                fontWeight: 800,
                fontSize: { xs: "0.72rem", sm: "0.82rem" },
                fontFamily: "'Poppins', sans-serif",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 0.6,
              }}
            >
              {mostrarTexto ? (
                <>
                  <motion.span
                    animate={cartOut
                      ? { x: -320, opacity: 0 }
                      : { x: 0, opacity: 1 }}
                    transition={cartOut
                      ? { duration: 3.5, ease: [0.4, 0, 1, 1] }
                      : { duration: 0.4, ease: "easeOut" }}
                    style={{ display: "inline-block", fontSize: "1.2rem", verticalAlign: "middle", marginBottom: "2px" }}
                  >
                    🚚
                  </motion.span>
                  {" ENVÍOS GRATIS"}
                </>
              ) : (
                <><WhatsAppIcon sx={{ fontSize: "1rem", mb: "2px" }} /> HÁBLANOS YA!</>
              )}
            </Typography>
          </motion.div>
        </AnimatePresence>
      </Box>}

      <Box
        sx={{
          position: "fixed",
          left: "50%",
          transform: "translateX(-50%)",
          width: "90%",
          maxWidth: "900px",
          zIndex: 1100,
          borderRadius: "40px",
          overflow: "hidden",
          transition: 'margin-top 0.2s ease',
          marginTop: ["/dashboard", "/administracion", "/configurar-productos", "/configurar-trabajos"].includes(location.pathname) ? "8px" : "46px",
        }}
      >
        <AppBar
          position="relative"
          sx={{
            height: "70px",
            justifyContent: "center",
            backgroundImage: "none",
            backgroundColor: navActive ? "rgba(0,0,0,0.55)" : "transparent",
            backdropFilter: navActive ? "blur(16px)" : "none",
            boxShadow: navActive
              ? "0 8px 32px rgba(0,0,0,0.35)"
              : "none",
            border: navActive ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(255,255,255,0)",
            transition: "all 0.3s ease",
            borderRadius: "40px",
            overflow: "hidden",
          }}
        >
          <Container>
            <Toolbar sx={{ minHeight: "70px !important", px: { xs: 1, sm: 2 } }}>
              <Box
                sx={{
                  position: "absolute",
                  left: { xs: "50%", md: "calc(15% + 0%)" },
                  transform: "translateX(-50%)",
                  display: "flex",
                  justifyContent: { xs: "center", md: "flex-start" },
                }}
              >
                <AnimatePresence mode="wait">
                  {(mostrarAnimacion || animacionMostrada) && (
                    <motion.div
                      key={(mostrarAnimacion ? "mostrar" : "forzado")}
                      initial={{ x: -200, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 1,
                        delay: mostrarAnimacion ? 1 : 0, // delay segun si fue forzado o no
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <motion.img
                        src="/logo.png"
                        alt="Logo"
                        onClick={LogoInicio}
                        initial={{ opacity: 0, x: -200 }}
                        animate={{
                          opacity: 1,
                          x: 0,
                          scale: scrollY > 50 ? 0.7 : 1,
                          y: scrollY > 50 ? -4 : 0,
                        }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        style={{
                          height: "55px",
                          marginTop: "10px",
                          cursor: "pointer",

                        }}
                      />

                    </motion.div>
                  )}
                </AnimatePresence>



              </Box>

              <Box sx={{ flexGrow: 1 }} />

              <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
                {menuItems.map((item, index) => {
                  const isShop = item.name === "Shop";
                  const button = (
                    <Button
                      key={item.name}
                      component={motion.button}
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      variants={menuItemVariants}
                      disabled={item.disabled}
                      onClick={() => !item.disabled && handleClick(item)}
                      sx={{
                        color: isShop ? "black" : "white",
                        fontFamily: "Poppins, sans-serif",
                        padding: isShop ? "10px 18px" : "10px 14px",

                        textDecoration: item.disabled ? "line-through" : "none",

                        background: isShop
                          ? "linear-gradient(160deg, #FFE082 0%, #FFC43D 38%, #FFB300 62%, #E68A00 100%)"
                          : "transparent",

                        border: isShop ? "2px solid rgba(255, 230, 120, 0.95)" : "none",
                        borderRadius: isShop ? "999px" : "8px",

                        boxShadow: isShop
                          ? "0 0 18px rgba(255, 195, 45, 0.72), 0 8px 20px rgba(120, 72, 0, 0.42), inset 0 2px 6px rgba(255,255,255,0.35), inset 0 -7px 12px rgba(130,80,0,0.28)"
                          : "none",

                        textShadow: isShop ? "0 1px 2px rgba(0,0,0,0.45)" : "none",
                        cursor: item.disabled ? "not-allowed" : "pointer",

                        "&.Mui-disabled": {
                          color: "white",
                          WebkitTextFillColor: "white", // necesario en algunos navegadores
                          opacity: 0.7,
                          textDecoration: "line-through",
                        },

                        "&:hover": {
                          background: item.disabled
                            ? "transparent"
                            : isShop
                              ? "linear-gradient(160deg, #FFE79A 0%, #FFC94F 35%, #FFB623 62%, #F58B00 100%)"
                              : "rgba(255, 255, 255, 0.1)",
                          transform: isShop ? "scale(1.03)" : "none",
                        },
                      }}
                    >
                      {item.name}
                    </Button>
                  );

                  return item.disabled ? (
                    <Tooltip key={item.name} title="Próximamente">
                      <span>{button}</span>
                    </Tooltip>
                  ) : (
                    button
                  );
                })}
              </Box>

              <IconButton color="inherit" edge="end" onClick={() => setOpen(!open)} sx={{ display: { xs: "block", md: "none" } }}>
                <motion.div
                  initial={{ x: 200, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  <Hamburger color="#fff" active={navActive} />
                </motion.div>
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>

      {/* Menu movil */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          "& .MuiDrawer-paper": {
            display: "flex",
            flexDirection: "column",
            height: "100dvh",
            width: { xs: "80vw", sm: "60vw", md: "50vw" },
            maxWidth: "700px",
            minWidth: "300px",

            // ?? Fondo pasto golf
            backgroundColor: "rgba(255,255,255,0.22)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            color: "white",

            // ? Profundidad
            boxShadow: "0 10px 28px rgba(0, 0, 0, 0.28)",

            // ?? Borde sutil verde
            borderLeft: "1px solid rgba(255,255,255,0.38)",

            p: 0,
          },
        }}
      >


        <Box sx={{ overflowY: 'auto', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", p: 0.5 }}>
            <IconButton
              aria-label="Abrir menu"
              onClick={() => setOpen(false)}
              sx={{
                animation: open ? `${rotateTwice} 1s ease-in-out` : "none",
              }}
            >
              <Close sx={{ fontSize: 32, color: "#163024" }} />
            </IconButton>
          </Box>


          {/* ?? Menu navegacion */}
          <AnimatePresence mode="wait">
            {open && (
              <motion.ul
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={listVariants}
                style={{ listStyle: "none", padding: 0, margin: 0, width: "100%" }}
              >
                {drawerMenuItems.map((item, index) => {
                  const content = (
                    <ListItem
                      key={item.name}
                      component={motion.li}
                      variants={itemVariants}
                      disablePadding
                      sx={{
                        opacity: item.disabled ? 0.45 : 1,
                        cursor: item.disabled ? "not-allowed" : "pointer",
                      }}
                    >
                      <ListItemButton
                        disabled={item.disabled}
                        onClick={() => !item.disabled && handleClick(item)}
                        sx={{
                          px: 2,
                          py: 0.7,
                          borderBottom: "1px solid rgba(22,48,36,0.16)",
                          borderTop: index === 0 ? "1px solid rgba(22,48,36,0.2)" : "none",

                          ...(item.name === "Shop" && {
                            fontWeight: 800,
                            borderRadius: 2,
                            mx: 1,
                            my: 0.5,
                            position: "relative",
                            overflow: "hidden",
                            color: "#fff",
                            textShadow: "0 1px 2px rgba(0,0,0,0.45)",
                            border: "2px solid rgba(255, 230, 120, 0.95)",

                            background:
                              "linear-gradient(160deg, #FFE082 0%, #FFC43D 38%, #FFB300 62%, #E68A00 100%)",

                            boxShadow:
                              "0 0 18px rgba(255, 195, 45, 0.72), 0 8px 20px rgba(120, 72, 0, 0.42), inset 0 2px 6px rgba(255,255,255,0.35), inset 0 -7px 12px rgba(130,80,0,0.28)",

                            "&::before": {
                              content: '""',
                              position: "absolute",
                              top: -28,
                              left: -60,
                              width: 64,
                              height: "165%",
                              background:
                                "linear-gradient(110deg, rgba(255,255,255,0) 0%, rgba(255,247,210,0.75) 52%, rgba(255,255,255,0) 100%)",
                              transform: "skewX(-12deg)",
                              animation: "goldSweep 3.1s cubic-bezier(.4,0,.2,1) infinite",
                            },

                            "&::after": {
                              content: '""',
                              position: "absolute",
                              inset: 0,
                              borderRadius: "inherit",
                              background:
                                "radial-gradient(circle at 22% 25%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 44%)",
                              animation: "goldPulse 2.4s ease-in-out infinite",
                              pointerEvents: "none",
                            },

                            "&:hover": {
                              transform: "scale(1.04)",
                              filter: "brightness(1.1)",
                              background:
                                "linear-gradient(160deg, #FFE79A 0%, #FFC94F 35%, #FFB623 62%, #F58B00 100%)",
                              boxShadow:
                                "0 0 26px rgba(255, 210, 85, 0.92), 0 10px 24px rgba(120,72,0,0.54)",
                            },
                          }),

                          "&:hover": {
                            backgroundColor:
                              item.name === "Shop"
                                ? undefined
                                : item.disabled
                                  ? "transparent"
                                  : "rgba(22,48,36,0.06)",
                          },

                          "@keyframes goldSweep": {
                            "0%": { left: "-70%", opacity: 0 },
                            "28%": { opacity: 0.85 },
                            "55%": { opacity: 0.55 },
                            "100%": { left: "135%", opacity: 0 },
                          },

                          "@keyframes goldPulse": {
                            "0%": { opacity: 0.3 },
                            "50%": { opacity: 0.58 },
                            "100%": { opacity: 0.3 },
                          },
                        }}
                      >
                        <ListItemText
                          primary={
                            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                              <Box
                                sx={{
                                  color: item.disabled
                                    ? "rgba(255,255,255,0.45)"
                                    : item.name === "Shop"
                                      ? "white"
                                      : "white",
                                  fontSize: "1.7rem",
                                  marginBottom: "-5px",
                                }}
                              >
                                {item.icon}
                              </Box>

                              <Box sx={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                                <span
                                  style={{
                                    color: item.disabled
                                      ? "rgba(255,255,255,0.55)"
                                      : item.name === "Shop"
                                        ? "white"
                                        : "white",

                                    fontWeight: item.name === "Shop" ? "700" : "700",
                                    fontSize: "1.07rem",
                                  }}
                                >
                                  {item.name}
                                </span>

                                {item.disabled && (
                                  <span
                                    style={{
                                      color: "rgba(22,48,36,0.5)",
                                      fontSize: "0.8rem",
                                      fontWeight: "400",
                                    }}
                                  >
                                    (Próximamente)
                                  </span>
                                )}
                              </Box>
                            </Box>
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                  );

                  return item.disabled ? (
                    <Tooltip key={item.name} title="Próximamente">
                      <span>{content}</span>
                    </Tooltip>
                  ) : (
                    content
                  );
                })}


              </motion.ul>
            )}
          </AnimatePresence>

          {/* ?? Espacio flexible para empujar bienvenida y redes al fondo */}
          <Box sx={{ flexGrow: 1 }} />

          {/* ?? Tarjeta bienvenida */}
          <AnimatePresence mode="wait">
            {open && (
              <motion.div
                variants={bienvenidaVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Box
                  sx={{
                    borderRadius: 3,
                    px: 2.5,
                    py: 2.2,
                    mx: 2,
                    mb: 0,
                    color: "white",
                    backdropFilter: "blur(8px)",
                    background: `
      radial-gradient(
        circle at top left,
        rgba(255, 255, 255, 0.08),
        transparent 70%
      ),
      linear-gradient(
        135deg,
        rgba(0, 0, 0, 0.62),
        rgba(0, 0, 0, 0.48)
      )
    `,
                    border: "1px solid rgba(255,255,255,0.24)",
                    boxShadow: "0 8px 18px rgba(0,0,0,0.28)",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, mb: 1.4 }}>
                    <Box
                      component="img"
                      src="/logo.png"
                      alt="Bienvenidos"
                      sx={{
                        width: 44,
                        height: 44,
                        objectFit: "contain",
                        borderRadius: 2,
                        flexShrink: 0,
                      }}
                    />
                    <Box>
                      <Typography
                        sx={{
                          fontFamily: 'Poppins, sans-serif',
                          fontWeight: 700,
                          fontSize: "0.9rem",
                          letterSpacing: 0.3,
                          lineHeight: 1.2,
                        }}
                      >
                        Happy Home & Goods
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: 'Poppins, sans-serif',
                          fontSize: "0.72rem",
                          opacity: 0.65,
                          lineHeight: 1.3,
                          mt: 0.3,
                        }}
                      >
                        Tu tienda de confianza
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      borderTop: "1px solid rgba(255,255,255,0.12)",
                      pt: 1.4,
                      mb: 1.6,
                    }}
                  >
                    <Typography
                      sx={{
                        opacity: 0.8,
                        fontSize: "0.82rem",
                        fontFamily: 'Poppins, sans-serif',
                        lineHeight: 1.5,
                      }}
                    >
                      🚚 Delivery en Santiago
                    </Typography>
                    <Typography
                      sx={{
                        opacity: 0.8,
                        fontSize: "0.82rem",
                        fontFamily: 'Poppins, sans-serif',
                        lineHeight: 1.5,
                      }}
                    >
                      🚚 Solo Delivery
                    </Typography>
                  </Box>

                  <Button
                    variant="text"
                    size="small"
                    endIcon={
                      <ArrowForwardIosRoundedIcon
                        sx={{
                          fontSize: 13,
                          transition: 'transform 0.3s ease',
                        }}
                      />
                    }
                    onClick={() => {
                      if (informationsRef?.current) {
                        const offset = -80;
                        const y = informationsRef.current.getBoundingClientRect().top + window.scrollY + offset;
                        window.scrollTo({ top: y, behavior: 'smooth' });
                        setOpen(false);
                      }
                    }}
                    sx={{
                      minHeight: 'unset',
                      color: "rgba(255,255,255,0.9)",
                      fontWeight: 600,
                      fontSize: "0.78rem",
                      textTransform: "none",
                      fontFamily: 'Poppins, sans-serif',
                      pl: 0,
                      py: 0,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 0.5,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        color: "white",
                        textDecoration: "underline",
                        backgroundColor: "transparent",
                        "& .MuiSvgIcon-root": {
                          transform: "translateX(3px)",
                        },
                      },
                    }}
                  >
                    Ver catálogo
                  </Button>

                </Box>
              </motion.div>

            )}
          </AnimatePresence>
          {/* Administration */}
          {open && (
            <motion.div
              variants={bienvenidaVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Box
                onClick={() => navigate("/administracion")}
                sx={{
                  background: `
          radial-gradient(circle at top left, rgba(255, 255, 255, 0.08), transparent 70%),
          linear-gradient(135deg, rgba(0, 0, 0, 0.62), rgba(0, 0, 0, 0.48))
        `,
                  borderRadius: 3,
                  px: 2,
                  py: 2,
                  mx: 2,
                  mt: 1,
                  color: "white",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.24)",
                  boxShadow: "0 8px 18px rgba(0,0,0,0.28)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  maxHeight: 45,
                  "&:hover": {
                    transform: "translateY(-1px)",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.32)",
                  },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 600,
                    fontSize: "1rem",
                    letterSpacing: 0.5,
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 0.6,
                  }}
                >
                  <>
                    <SettingsSuggestRoundedIcon sx={{ fontSize: 18 }} />
                    Administración
                  </>
                </Typography>
              </Box>
            </motion.div>
          )}

          {/* Redes sociales al final del menu movil */}
          <AnimatePresence mode="wait">
            {open && (
              <>
                {/* Redes sociales animadas */}

                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: 0.12,
                        delayChildren: 0.3,
                      },
                    },
                  }}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "24px",
                    marginBottom: isMobile ? 0 : 90,
                    padding: "20px 0",
                  }}
                >
                  {["Instagram", "TikTok"].map((social) => {
                    const info = socialData[social];

                    return (
                      <motion.div
                        key={social}
                        variants={{
                          hidden: { opacity: 0, x: 40 },
                          visible: {
                            opacity: 1,
                            x: 0,
                            transition: { duration: 0.5, ease: "easeOut" },
                          },
                          exit: { opacity: 0, x: 30, transition: { duration: 0.3 } },
                        }}
                      >
                        <SocialButton
                          href={info.href}
                          Icon={info.Icon}
                          bgColor={info.bgColor}
                          hoverStyles={{
                            color: info.hoverColor,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }}
                        />
                      </motion.div>
                    );
                  })}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </Box>
      </Drawer >
      {/* PDF */}
      <Dialog
        open={openPDF}
        onClose={handleClosePDF}
        fullWidth
        maxWidth="lg"
        PaperProps={{
          sx: {
            backgroundColor: "#f5f7fa",
            color: "#1a1a1a",
            borderRadius: 3,
            boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
            overflow: "hidden",
          }
        }}
        BackdropProps={{
          sx: {
            backgroundColor: "rgba(0,0,0,0.7)"
          }
        }}
        disableScrollLock
      >

        <DialogTitle
          sx={{
            fontWeight: 600,
            fontSize: "1.25rem",
            px: 3,
            py: 2.5,
            borderBottom: "1px solid rgba(0,0,0,0.1)",
            position: "relative",
            background: `linear-gradient(135deg, #e0f2ff 0%, #ffffff 100%)`,
            color: "#1a237e",
          }}
        >
          Presentacion rosmiya - PDF
          <IconButton aria-label="close" onClick={handleClosePDF} sx={{ position: "absolute", right: 12, top: 12, color: "#1a237e" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 0 }}>
          <Box sx={{ height: { xs: "75vh", sm: "80vh", md: "85vh" }, width: "100%", backgroundColor: "#000", }}>

            <iframe src={pdfSrc} title="Presentacion Plataformas web" width="100%" height="100%" style={{ border: 'none' }} />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Navbar;









































