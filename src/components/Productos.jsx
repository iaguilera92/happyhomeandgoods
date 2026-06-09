import React, { useRef, useEffect, useState } from 'react';
import { Box, Card, Typography, Button, Stack } from '@mui/material';
import { motion } from 'framer-motion';

const Productos = ({ producto, girado, onGirar, FormatearPesos, onVisualizarMobile }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const botonWhatsappRef = useRef(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    if (girado && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  }, [girado]);

  const handleFullScreen = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (!videoRef.current) return;
    const video = videoRef.current;

    if (isMobile) {
      if (video.webkitEnterFullscreen) {
        video.webkitEnterFullscreen();
        video.currentTime = 0;
        video.play();
      } else if (video.requestFullscreen) {
        video.requestFullscreen();
        video.currentTime = 0;
        video.play();
      }
      return;
    }

    if (!containerRef.current) return;
    const container = containerRef.current;

    const afterFullscreen = () => {
      const clickEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window,
      });
      video.dispatchEvent(clickEvent);

      video.currentTime = 0;
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn('No se pudo reproducir el video:', error);
        });
      }

      document.removeEventListener('fullscreenchange', afterFullscreen);
      document.removeEventListener('webkitfullscreenchange', afterFullscreen);
    };

    document.addEventListener('fullscreenchange', afterFullscreen);
    document.addEventListener('webkitfullscreenchange', afterFullscreen);

    container.requestFullscreen?.() ||
      container.webkitRequestFullscreen?.() ||
      container.mozRequestFullScreen?.() ||
      container.msRequestFullscreen?.();
  };

  useEffect(() => {
    const contenedor = containerRef.current;
    const botonWhatsapp = botonWhatsappRef.current;

    const mostrarBoton = () => {
      if (botonWhatsapp) botonWhatsapp.style.display = 'block';
    };
    const ocultarBoton = () => {
      if (botonWhatsapp) botonWhatsapp.style.display = 'none';
    };

    const fullscreenChangeHandler = () => {
      if (
        document.fullscreenElement === contenedor ||
        document.webkitFullscreenElement === contenedor
      ) {
        mostrarBoton();
      } else {
        ocultarBoton();
      }
    };

    document.addEventListener('fullscreenchange', fullscreenChangeHandler);
    document.addEventListener('webkitfullscreenchange', fullscreenChangeHandler);

    return () => {
      document.removeEventListener('fullscreenchange', fullscreenChangeHandler);
      document.removeEventListener('webkitfullscreenchange', fullscreenChangeHandler);
    };
  }, [producto.IdProducto]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (girado) {
      video.currentTime = 0;
      setTimeout(() => {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => console.warn('Error al reproducir:', err));
        }
      }, 100);
    } else {
      video.pause();
    }
  }, [girado]);

  return (
    <Box
      className="productos-card"
      sx={{
        width: '100%',
        height: { xs: 220, sm: 260 },
        mx: 'auto',
        position: 'relative',
        overflow: 'visible',
      }}
    >
      <Box
        onClick={() => {
          if (producto.Stock > 0) onGirar();
        }}
        sx={{
          width: '100%',
          height: '100%',
          perspective: 1200,
          cursor: 'pointer',
          position: 'relative',
        }}
      >
        <motion.div
          animate={{ rotateY: girado ? 180 : 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          style={{
            willChange: 'transform',
            width: '100%',
            height: '100%',
            position: 'relative',
            transformStyle: 'preserve-3d',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              zIndex: 2,
              transform: 'rotateY(0deg)',
              borderRadius: 3,
              overflow: 'hidden',
              boxShadow: 4,
              border: '2px solid white',
            }}
          >
            <Card sx={{ width: '100%', height: '100%', position: 'relative' }}>
              <Box
                sx={{
                  position: 'absolute',
                  top: 3,
                  right: 3,
                  zIndex: 2,
                  width: 25,
                  height: 25,
                  borderRadius: '50%',
                  bgcolor:
                    producto.Stock >= 10
                      ? '#4CAF50'
                      : producto.Stock > 0
                        ? '#FFA000'
                        : '#F44336',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid white',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                  pointerEvents: 'none',
                }}
              >
                {producto.Stock}
              </Box>

              <Box
                component="img"
                decode="async"
                loading="lazy"
                src={producto.ImageUrl}
                alt={producto.NombreProducto}
                onLoad={() => setIsImageLoaded(true)}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  filter:
                    producto.Stock === 0
                      ? 'grayscale(100%) brightness(0.5)'
                      : isImageLoaded
                        ? 'none'
                        : 'blur(12px) brightness(0.7)',
                  transition: 'filter 0.6s ease',
                }}
              />

              {producto.Stock === 0 && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    bgcolor: 'rgba(0, 0, 0, 0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 3,
                    pointerEvents: 'none',
                    textAlign: 'center',
                    px: 2,
                  }}
                >
                  <Typography
                    sx={{
                      color: 'white',
                      fontSize: '1rem',
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {'Reponiendo stock.\nDisponible pronto...'}
                  </Typography>
                </Box>
              )}

              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  zIndex: 2,
                  p: { xs: 0.7, sm: 1 },
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.08), rgba(0,0,0,0.84))',
                  color: 'white',
                  pointerEvents: girado ? 'none' : 'auto',
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: '0.63rem', sm: '0.7rem' },
                    lineHeight: 1.1,
                    mb: 0.45,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    textTransform: 'uppercase',
                  }}
                >
                  {producto.NombreProducto}
                </Typography>

                <Stack direction="row" alignItems="center" spacing={0.3} sx={{ width: '100%' }}>
                  <Button
                    variant="outlined"
                    sx={{
                      flex: 0.75,
                      minWidth: 56,
                      fontSize: { xs: '0.5rem', sm: '0.62rem' },
                      borderRadius: '8px',
                      py: { xs: 0.15, sm: 0.28 },
                      borderColor: '#FFF',
                      color: '#FFF',
                      textTransform: 'none',
                      boxShadow: 'none',
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      const destino = producto.UrlCompra || producto.LinkAmazon || producto.LinkCompra;
                      if (destino) {
                        window.open(destino, '_blank');
                        return;
                      }
                      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
                      if (isMobile && onVisualizarMobile) {
                        onVisualizarMobile(producto);
                        return;
                      }
                      handleFullScreen();
                    }}
                  >
                    Detalles
                  </Button>

                  <Box
                    sx={{
                      flex: 1,
                      minWidth: 54,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      lineHeight: 1,
                    }}
                  >
                    <Typography
                      fontWeight="bold"
                      sx={{
                        fontFamily: '"RC Type Cond", Arial, sans-serif',
                        fontSize: { xs: '0.78rem', sm: '0.9rem' },
                        color: producto.Stock === 0 ? '#FF5252' : producto.ConDescuento ? '#00e676' : '#FFFFFF',
                        textAlign: 'center',
                      }}
                    >
                      {producto.Stock === 0 ? 'Agotado' : `${FormatearPesos(producto.Valor)}`}
                    </Typography>
                    {producto.ConDescuento && (
                      <Typography
                        sx={{
                          fontSize: { xs: '0.6rem', sm: '0.65rem' },
                          color: '#ccc',
                          textDecoration: 'line-through',
                        }}
                      >
                        {FormatearPesos(producto.Valor + 5)}
                      </Typography>
                    )}
                  </Box>

                  <Button
                    variant="contained"
                    disabled={producto.Stock === 0}
                    sx={{
                      flex: 1.1,
                      minWidth: 56,
                      fontSize: { xs: '0.52rem', sm: '0.63rem' },
                      borderRadius: '8px',
                      py: { xs: 0.15, sm: 0.28 },
                      bgcolor: '#ffe082',
                      color: '#1a1a1a',
                      textTransform: 'none',
                      boxShadow: producto.Stock === 0 ? 'none' : '0 0 10px rgba(255, 213, 74, 0.6)',
                      opacity: producto.Stock === 0 ? 0.4 : 1,
                      cursor: producto.Stock === 0 ? 'not-allowed' : 'pointer',
                      '&:hover': {
                        bgcolor: producto.Stock === 0 ? '#ffe082' : '#ffd54f',
                        transform: producto.Stock === 0 ? 'none' : 'scale(1.04)',
                        boxShadow: producto.Stock === 0 ? 'none' : '0 0 16px rgba(255, 193, 7, 0.85)',
                      },
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (producto.Stock === 0) return;
                      const destino = producto.UrlCompra || producto.LinkAmazon || producto.LinkCompra;
                      if (destino) {
                        window.open(destino, '_blank');
                        return;
                      }
                      const mensaje = `Me interesó el ${producto.NombreProducto}, ¿sigue disponible?`;
                      const telefono = '56948898681';
                      const urlWhatsapp = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
                      window.open(urlWhatsapp, '_blank');
                    }}
                  >
                    Comprar
                  </Button>
                </Stack>
              </Box>
            </Card>
          </Box>

          <Box
            ref={containerRef}
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              zIndex: 1,
              borderRadius: 3,
              overflow: 'hidden',
              boxShadow: 4,
              border: '2px solid white',
            }}
          >
            <Card sx={{ width: '100%', height: '100%', position: 'relative' }}>
              {girado && (
                <Box
                  component="video"
                  ref={videoRef}
                  src={producto.VideoUrl}
                  poster={producto.ImageUrl}
                  muted
                  playsInline
                  preload={girado ? 'auto' : 'none'}
                  decode="async"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 60%',
                    backgroundColor: 'black',
                    borderRadius: 0,
                    zIndex: 2,
                  }}
                  onEnded={() => {
                    onGirar();
                  }}
                />
              )}

              <Button
                ref={botonWhatsappRef}
                variant="contained"
                sx={{
                  position: 'absolute',
                  bottom: 20,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  bgcolor: '#25D366',
                  color: '#FFFFFF',
                  textTransform: 'none',
                  fontSize: '1rem',
                  borderRadius: '20px',
                  px: 3,
                  py: 1,
                  zIndex: 9999,
                  display: 'none',
                  boxShadow: '0px 4px 10px rgba(0,0,0,0.3)',
                  '@media (max-width: 600px)': {
                    fontSize: '0.95rem',
                    px: 2,
                    py: 0.8,
                  },
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  const destino = producto.UrlCompra || producto.LinkAmazon || producto.LinkCompra;
                  if (destino) {
                    window.open(destino, '_blank');
                    return;
                  }
                  const mensaje = `Me interesó el ${producto.NombreProducto}, ¿sigue disponible?`;
                  const telefono = '56948898681';
                  const urlWhatsapp = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
                  window.open(urlWhatsapp, '_blank');
                }}
              >
                Me interesa
              </Button>
            </Card>
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
};

export default Productos;
