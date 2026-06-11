import React, { useEffect, useState, useRef, lazy, Suspense } from "react";
import { CssBaseline, Box, IconButton, useMediaQuery, Snackbar, Alert } from "@mui/material";
import theme from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import "@fontsource/poppins";
import { WhatsApp as WhatsAppIcon, ArrowUpward as ArrowUpwardIcon, ShoppingCart as ShoppingCartIcon } from "@mui/icons-material";
import { Badge } from "@mui/material";
import { useLocation, Outlet } from "react-router-dom";
import Cargando from './components/Cargando';
import { AnimatePresence, motion } from 'framer-motion';
import "./components/css/App.css";
import { initGoogleAnalytics, trackPageView } from "./helpers/HelperAnalytics.js"; //GOOGLE ANALYTICS
import DialogInicio from "./components/DialogInicio";
import CartDialog from "./components/CartDialog";
import FlyToCart from "./components/FlyToCart";
import { useCart } from "./context/CartContext";

const Informations = lazy(() => import("./components/Informations"));
const InformationsMobile = lazy(() => import("./components/InformationsMobile"));
const Contacto = lazy(() => import("./components/Contacto"));
const Evidencias = lazy(() => import("./components/Evidencias"));
const Evidencias2 = lazy(() => import("./components/Evidencias2"));
const Footer = lazy(() => import("./components/Footer"));
const Navbar = lazy(() => import("./components/Navbar"));

function App() {
  const [showArrow, setShowArrow] = useState(false);
  const [openBubble, setOpenBubble] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartBounce, setCartBounce] = useState(0);
  const { conteo, flyAnim } = useCart();

  useEffect(() => {
    if (!flyAnim) return;
    const t = setTimeout(() => {
      setCartBounce((k) => k + 1);
    }, 650);
    return () => clearTimeout(t);
  }, [flyAnim]);

  useEffect(() => {
    if (conteo === 0) setCartBounce(0);
  }, [conteo]);
  const contactoRef = useRef(null);
  const scrollToRef = (ref, offset = -80) =>
    ref?.current &&
    window.scrollTo({
      top:
        ref.current.getBoundingClientRect().top +
        window.scrollY +
        offset,
      behavior: "smooth",
    });
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const informationsRef = useRef(null);
  const location = useLocation();
  const [videoReady, setVideoReady] = useState(false);
  const [showApp, setShowApp] = useState(false);
  const [snackbarVersion, setSnackbarVersion] = useState({ open: false, version: "", });
  const triggerInformations = (value) => setShouldAnimateInformations(value);
  const [isRouteFallbackVisible, setIsRouteFallbackVisible] = useState(false);
  useEffect(() => {
    const handleRouteFallback = (event) => {
      setIsRouteFallbackVisible(Boolean(event?.detail?.visible));
    };

    window.addEventListener("route-fallback-visibility", handleRouteFallback);
    return () => window.removeEventListener("route-fallback-visibility", handleRouteFallback);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const clearClientCaches = async () => {
      try {
        if ("caches" in window) {
          const cacheNames = await caches.keys();
          await Promise.all(cacheNames.map((name) => caches.delete(name)));
        }

        if ("serviceWorker" in navigator) {
          const registrations = await navigator.serviceWorker.getRegistrations();
          await Promise.all(registrations.map((registration) => registration.unregister()));
        }
      } catch (error) {
        console.warn("Error clearing client cache:", error);
      }
    };

    const checkVersion = async () => {
      try {
        const response = await fetch(`/version.json?t=${Date.now()}`, {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        });

        if (!response.ok) return;

        const data = await response.json();
        const nextVersion = data?.version;
        if (!nextVersion || cancelled) return;

        const currentVersion = localStorage.getItem("app-version");

        if (!currentVersion) {
          localStorage.setItem("app-version", nextVersion);
          return;
        }

        if (currentVersion !== nextVersion) {
          setSnackbarVersion({ open: true, version: nextVersion });
          await clearClientCaches();
          localStorage.setItem("app-version", nextVersion);

          window.setTimeout(() => {
            window.location.replace(`/?v=${encodeURIComponent(nextVersion)}`);
          }, 900);
        }
      } catch (error) {
        console.warn("Error checking app version:", error);
      }
    };

    checkVersion();
    const intervalId = window.setInterval(checkVersion, 60000);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
    };
  }, []);
  //GOOGLE ANALYTICS
  useEffect(() => {
    initGoogleAnalytics(); // solo una vez
  }, []);

  useEffect(() => {
    trackPageView(location.pathname + location.search); // en cada cambio de ruta
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setShowArrow(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpenBubble(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (openBubble) {
      const timer = setTimeout(() => {
        setOpenBubble(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [openBubble]);

  const scrollToTop = () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleUserInteraction = () => {
    setHasInteracted(true);
  };

  //location.pathname
  useEffect(() => {
    if (location.pathname === "/") {
      // Ejecutar lÃƒÆ’Ã‚Â³gica cuando se vuelva a la ruta de inicio
    }
  }, [location.pathname]);

  // ? CARGANDO
  useEffect(() => {

    if (["/dashboard", "/administracion"].includes(location.pathname)) {
      setShowApp(true);
      return;
    }

    let minListo = false;

    const requiereVideo = ["/", "/inicio", ""].includes(location.pathname);

    const minTimeout = setTimeout(() => {
      minListo = true;
      if (!requiereVideo || videoReady) {
        setShowApp(true);
      }
    }, 2500); // mÃƒÆ’Ã‚Â­nimo visible

    const maxTimeout = setTimeout(() => {
      setShowApp(true); // fuerza mostrar app
    }, 4000); // mÃƒÆ’Ã‚Â¡ximo espera

    return () => {
      clearTimeout(minTimeout);
      clearTimeout(maxTimeout);
    };
  }, [videoReady, location.pathname]);

  const openCategoryFeatures = () => {
    const section = document.getElementById("category-features-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  //LIBERAR CARGANDO
  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;

    if (!showApp) {
      body.classList.add("no-scroll");
      html.classList.add("no-scroll");
    } else {
      body.classList.remove("no-scroll");
      html.classList.remove("no-scroll");
    }

    return () => {
      body.classList.remove("no-scroll");
      html.classList.remove("no-scroll");
    };
  }, [showApp]);

  // Notify components when the initial loader is gone.
  useEffect(() => {
    if (!showApp) return;
    document.documentElement.dataset.appReady = "1";
    window.dispatchEvent(new Event("app:ready"));
  }, [showApp]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Pantalla de carga */}
      <AnimatePresence>
        {!showApp && location.pathname !== "/dashboard" && location.pathname !== "/administracion" && location.pathname !== "/configurar-productos" && location.pathname !== "/configurar-trabajos" && (
          <>
            <motion.div key="cargando" initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 9999, }}>
              <Cargando />
            </motion.div>

            {/* Snackbar como overlay global */}
            <Snackbar open={snackbarVersion.open} autoHideDuration={1400} anchorOrigin={{ vertical: "top", horizontal: "center" }} sx={{ zIndex: 20000 }}>
              <Alert
                severity="info"
                icon={false}
                sx={{
                  width: "100%",
                  fontSize: "0.9rem",
                  boxShadow: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center", // ? centra horizontalmente el contenido
                  justifyContent: "center",
                  textAlign: "center",  // ? centra el texto
                }}
              >
                <Box>
                  🚀 Nueva versión disponible: {snackbarVersion.version}
                  <br />
                  🔄 Actualizando...
                </Box>
              </Alert>
            </Snackbar>

          </>
        )}
      </AnimatePresence>

      {/* Contenido principal, oculto mientras se carga */}
      <Box sx={{ visibility: showApp ? "visible" : "hidden", pointerEvents: showApp ? "auto" : "none", overflowX: 'hidden' }}>
        {/* Navbar solo si no estÃƒÆ’Ã‚Â¡s en /administracion */}
        {location.pathname !== "/administracion" && (
          <div className="app-chrome">
            <Suspense fallback={null}>
              <Navbar contactoRef={contactoRef} informationsRef={informationsRef} videoReady={videoReady} />
            </Suspense>
          </div>
        )}

        {/* TransiciÃƒÆ’Ã‚Â³n entre pÃƒÆ’Ã‚Â¡ginas */}
        <Box sx={{ position: "relative" }}>
          <Outlet context={{ showApp, informationsRef, openDialogInicio: openCategoryFeatures }} />        </Box>
        {/* Secciones visibles solo en la pÃƒÆ’Ã‚Â¡gina de inicio */}
        {["/", ""].includes(location.pathname) && (
          <Suspense fallback={null}>
            <Box ref={contactoRef}>
              <Contacto />
            </Box>
          </Suspense>
        )}

        {/* Footer (excepto en administraciÃƒÆ’Ã‚Â³n) */}
        {!isRouteFallbackVisible && location.pathname !== "/administracion" && location.pathname !== "/dashboard" && location.pathname !== "/configurar-productos" && location.pathname !== "/configurar-trabajos" && (
          <div className="app-chrome">
            <Footer />
          </div>
        )}
        {/* Botón Carrito */}
        <AnimatePresence>
        {!isRouteFallbackVisible && conteo > 0 && location.pathname !== "/administracion" && location.pathname !== "/dashboard" && location.pathname !== "/configurar-productos" && location.pathname !== "/configurar-trabajos" && (
          <Box sx={{ position: "fixed", bottom: "20px", left: "20px", zIndex: 100 }}>
            {/* Anillo de pulsación */}
            <motion.div
              animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(99,179,237,0.5), rgba(21,101,192,0.2))",
                pointerEvents: "none",
              }}
            />
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0, transition: { duration: 0.4, ease: "easeInOut" } }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
            <motion.div
              key={cartBounce}
              animate={cartBounce > 1 ? { scale: [1, 1.35, 0.9, 1.1, 1] } : { scale: 1 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
            >
              <IconButton
                onClick={() => setCartOpen(true)}
                sx={{
                  width: 62, height: 62,
                  background: "linear-gradient(135deg, #1e88e5, #1565c0, #0d47a1)",
                  color: "#FFF",
                  borderRadius: "50%",
                  boxShadow: "0 4px 20px rgba(21,101,192,0.7), 0 0 0 3px rgba(99,179,237,0.3)",
                  position: "relative",
                  "&:hover": {
                    background: "linear-gradient(135deg, #42a5f5, #1e88e5, #1565c0)",
                    boxShadow: "0 6px 28px rgba(21,101,192,0.85), 0 0 0 4px rgba(99,179,237,0.4)",
                    transform: "scale(1.08)",
                  },
                  transition: "all 0.25s ease",
                }}
              >
                <Badge
                  badgeContent={conteo}
                  max={99}
                  sx={{
                    "& .MuiBadge-badge": {
                      background: "linear-gradient(135deg, #ff6b6b, #e53935)",
                      color: "white",
                      fontWeight: 800,
                      fontSize: "0.7rem",
                      minWidth: 20,
                      height: 20,
                      borderRadius: "10px",
                      boxShadow: "0 2px 6px rgba(229,57,53,0.6)",
                    },
                  }}
                >
                  <ShoppingCartIcon sx={{ fontSize: 28 }} />
                </Badge>
              </IconButton>
            </motion.div>
            </motion.div>
          </Box>
        )}
        </AnimatePresence>

        {/* Botón WhatsApp */}
        {!isRouteFallbackVisible && location.pathname !== "/administracion" && location.pathname !== "/dashboard" && location.pathname !== "/configurar-productos" && location.pathname !== "/configurar-trabajos" && (
          <Box sx={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 100, transition: "bottom 0.3s ease", }}>
            <IconButton onClick={() => { window.open("https://api.whatsapp.com/send?phone=56957581093", "_blank"); setHasInteracted(true); }} sx={{
              width: 60, height: 60, backgroundColor: "#25d366", color: "#FFF", borderRadius: "50%", boxShadow: "2px 2px 3px #999", "&:hover": { backgroundColor: "#1ebe5d" }, zIndex: 101
            }}>
              <WhatsAppIcon sx={{ fontSize: 30 }} />
            </IconButton>

            {/* Burbuja de mensaje */}
            {openBubble && (
              <Box
                sx={{
                  position: "fixed",
                  bottom: 90,
                  right: 20,
                  backgroundColor: "#fff",
                  color: "#000",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                  borderRadius: "20px",
                  padding: "8px 16px",
                  fontFamily: "Poppins, sans-serif",
                  zIndex: 102,
                  opacity: openBubble ? 1 : 0,
                  transform: openBubble ? "translateX(0)" : "translateX(100%)",
                  transition: "transform 0.5s ease, opacity 0.5s ease",
                }}
                onClick={() => setOpenBubble(false)}
              >
                WhatsApp us!
              </Box>
            )}
          </Box>
        )}

        {/* BotÃƒÆ’Ã‚Â³n scroll arriba */}
        {showArrow && (
          <IconButton onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            sx={{
              position: "fixed",
              bottom: "100px",
              right: "20px",
              backgroundColor: "#fff",
              color: "#000",
              borderRadius: "50%",
              padding: "10px",
              boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
              zIndex: 101,
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.1)",
                backgroundColor: "#000",
                color: "#fff",
              },
            }}
          >
            <ArrowUpwardIcon sx={{ fontSize: 30 }} />
          </IconButton>
        )}
      </Box>
      <DialogInicio
        open={false}
        onClose={() => { }}
        onSelect={() => { }}
      />
      <CartDialog open={cartOpen} onClose={() => setCartOpen(false)} />
      <FlyToCart />
    </ThemeProvider>
  );
}

export default App;





















