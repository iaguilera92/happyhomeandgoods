import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import BarChartIcon from "@mui/icons-material/BarChart";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import { useLocation, useNavigate } from 'react-router-dom';

const opciones = [
    { ruta: "/dashboard",           icono: BarChartIcon,      texto: "Visitas"   },
    { ruta: "/configurar-productos", icono: ViewCarouselIcon,  texto: "Catálogo"  },
];

const MenuInferior = ({ cardSize }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const goWithCleanCache = async (rutaDestino) => {
        try {
            const cacheNames = await caches.keys();
            await Promise.all(cacheNames.map(name => caches.delete(name)));
            if ("serviceWorker" in navigator) {
                const registrations = await navigator.serviceWorker.getRegistrations();
                for (const registration of registrations) await registration.unregister();
            }
            navigate(rutaDestino);
        } catch {
            navigate(rutaDestino);
        }
    };

    return (
        <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
            style={{
                position: "fixed",
                bottom: 6,
                left: 0,
                width: "100%",
                display: "flex",
                justifyContent: "center",
                zIndex: 100,
                pointerEvents: "none",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    px: 2,
                    py: 1.2,
                    borderRadius: "60px",
                    background: "rgba(10, 10, 10, 0.72)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
                    pointerEvents: "auto",
                }}
            >
                {opciones.map(({ ruta, icono: Icono, texto }) => {
                    const activo = location.pathname.startsWith(ruta);
                    return (
                        <motion.div
                            key={ruta}
                            whileTap={{ scale: 0.93 }}
                            onClick={() => goWithCleanCache(ruta)}
                            style={{ cursor: "pointer" }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    px: 2.5,
                                    py: 0.8,
                                    borderRadius: "40px",
                                    background: activo ? "rgba(255,255,255,0.12)" : "transparent",
                                    transition: "background 0.25s ease",
                                    "&:hover": {
                                        background: activo ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.06)",
                                    },
                                    minWidth: 80,
                                }}
                            >
                                <Icono
                                    sx={{
                                        fontSize: 24,
                                        color: activo ? "#ffffff" : "rgba(255,255,255,0.45)",
                                        transition: "color 0.25s ease",
                                        mb: 0.3,
                                    }}
                                />
                                <Typography
                                    sx={{
                                        fontSize: "0.68rem",
                                        fontWeight: activo ? 700 : 400,
                                        color: activo ? "#ffffff" : "rgba(255,255,255,0.45)",
                                        fontFamily: "'Poppins', sans-serif",
                                        letterSpacing: "0.02em",
                                        transition: "all 0.25s ease",
                                    }}
                                >
                                    {texto}
                                </Typography>
                                {activo && (
                                    <motion.div
                                        layoutId="pill-indicator"
                                        style={{
                                            position: "absolute",
                                            bottom: -2,
                                            width: 4,
                                            height: 4,
                                            borderRadius: "50%",
                                            background: "#ffffff",
                                        }}
                                    />
                                )}
                            </Box>
                        </motion.div>
                    );
                })}
            </Box>
        </motion.div>
    );
};

export default MenuInferior;
