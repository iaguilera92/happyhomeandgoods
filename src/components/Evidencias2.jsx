import React, { useRef, useState, useEffect } from 'react';
import { Box, Typography, CardMedia, useTheme, useMediaQuery, keyframes } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from "react-intersection-observer";

const scrollLeft = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;
const letterVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
        opacity: 1,
        x: 0,
        transition: { delay: 0.4 + i * 0.04 }, // puedes ajustar el tiempo
    }),
};
const textoAnimado = "Nuestros trabajos";


const SeccionDestacada = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const videosRef = useRef([]);
    const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true, rootMargin: '0px 0px -30% 0px' });
    const [hasAnimated, setHasAnimated] = useState(false);


    //EVITAR ANIMACIÓN DUPLICADA
    useEffect(() => {
        if (inView && !hasAnimated) {
            setHasAnimated(true);
        }
    }, [inView, hasAnimated]);

    const handleVideoClick = (e) => {
        const video = e.target;
        if (video.requestFullscreen) video.requestFullscreen();
        else if (video.webkitEnterFullscreen) video.webkitEnterFullscreen();
        else if (video.webkitRequestFullscreen) video.webkitRequestFullscreen();
        else if (video.msRequestFullscreen) video.msRequestFullscreen();

        if (video.paused) video.play();
    };

    useEffect(() => {
        if (inView && !hasAnimated) {
            setHasAnimated(true);
        }
    }, [inView, hasAnimated]);
    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                height: isMobile ? '100vh' : '600px',
                overflow: 'hidden',
            }}
        >
            {/* Fondo animado */}
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 0,
                    backgroundImage: "url('/fondo-6.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed',
                    transform: 'scaleX(-1)', // refleja horizontalmente
                    transformOrigin: 'center', // asegura que el reflejo sea centrado
                }}
            />

            {/* Contenido */}
            <Box
                sx={{
                    position: 'relative',
                    display: 'flex',
                    width: '100%',
                    height: '100%',
                    zIndex: 2,
                }}
            >
                {/* Panel blanco con título y videos */}
                <Box
                    ref={ref}
                    sx={{
                        width: '45%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        px: 2,
                        py: 3,
                        gap: 2,
                        overflowY: 'auto',
                    }}
                    style={{ backgroundColor: 'white', color: 'black' }}
                >

                    <Box>
                        <Typography
                            variant="h4"
                            gutterBottom
                            component="div"
                            sx={{
                                fontFamily: "'Montserrat', Helvetica, Arial, sans-serif",
                                fontSize: { xs: "1.5rem", md: "2rem" },
                                paddingLeft: { xs: "100px", md: "30px" },
                                paddingRight: { xs: "100px", md: "30px" },
                                letterSpacing: "3px",
                                my: 0,
                                display: "flex",
                                flexWrap: "wrap",
                                alignItems: "center",
                                position: "relative",
                                zIndex: 1,
                                backgroundColor: "transparent",
                            }}
                            style={{ color: 'black' }}
                        >
                            <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                animate={inView || hasAnimated ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                                transition={{ delay: 0.3 }}
                                style={{
                                    color: "#8B4513",
                                    fontWeight: "bold",
                                    marginRight: "1px",
                                    marginTop: "-4px",
                                    fontSize: "0.9em",
                                    lineHeight: 1,
                                    display: "inline-block",
                                    transform: "translateY(2px)"
                                }}
                            >
                                |
                            </motion.span>

                            {textoAnimado.split("").map((char, i) => (
                                <motion.span
                                    key={i}
                                    custom={i}
                                    variants={letterVariants}
                                    initial="hidden"
                                    animate={inView || hasAnimated ? "visible" : "hidden"}
                                    style={{
                                        display: "inline-block",
                                        whiteSpace: "pre",
                                    }}
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </Typography>

                        {/* Texto "En construcción..." solo letras */}
                        <Box
                            ref={ref}
                            sx={{
                                mt: 2,
                                ml: 7,
                                alignSelf: 'flex-end',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'relative',
                                width: '100%',
                                maxWidth: '265px',
                                aspectRatio: '9 / 16',
                            }}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                                transition={{ duration: 1.5, ease: 'easeOut' }}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: '#FFA500', // naranja vivo
                                        fontWeight: 700,
                                        textAlign: 'center',
                                        px: 2,
                                    }}
                                >
                                    Under construction...
                                </Typography>
                            </motion.div>
                        </Box>

                    </Box>

                </Box>

                {/* Imagen mongodb.svg al lado derecho */}
                <Box
                    sx={{
                        width: 'auto',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: 'transparent',
                        marginLeft: 0,
                    }}
                >
                    <Box
                        component="img"
                        src="/mongodb.svg"
                        alt="mongodb"
                        sx={{
                            height: '100%',
                            objectFit: 'contain',
                            display: 'block',
                        }}
                    />
                </Box>
            </Box>
        </Box >
    );
};

export default SeccionDestacada;
