import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Snackbar, Box, Alert, useTheme, useMediaQuery, Grid, IconButton, Typography, Skeleton } from '@mui/material';
import './css/Catalogo.css';
import { motion } from 'framer-motion';
import Productos from './Productos';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Virtual } from 'swiper/modules';
import LockRoundedIcon from '@mui/icons-material/LockRounded';

const staticProducts = [
  {
    IdProducto: 4998,
    NombreProducto: 'TEE BOX - BLUE STARTER',
    Valor: 100,
    ConDescuento: false,
    Stock: 10,
    ImageUrl: 'tee-box-blue-starter.avif',
    VideoUrl: '',
    UrlCompra: 'tee-box-blue-starter.avif',
    Nivel: 'Starter',
    Tag: 'Blue Starter',
    Popularidad: 96,
    Featured: 1,
  },
  {
    IdProducto: 5026,
    NombreProducto: 'TEE BOX - GREEN CHAMPION',
    Valor: 100,
    ConDescuento: false,
    Stock: 8,
    ImageUrl: '/teebox-green-champion.avif',
    VideoUrl: '',
    UrlCompra: 'teebox-green-champion.avif',
    Nivel: 'Champion',
    Tag: 'Green Champion',
    Popularidad: 91,
    Featured: 2,
  },
  {
    IdProducto: 5024,
    NombreProducto: 'TEE BOX - ORANGE COMPETITOR',
    Valor: 100,
    ConDescuento: false,
    Stock: 7,
    ImageUrl: '/tee-box-orange-competitor.avif',
    VideoUrl: '',
    UrlCompra: 'tee-box-orange-competitor.avif',
    Nivel: 'Competitor',
    Tag: 'Orange Competitor',
    Popularidad: 88,
    Featured: 3,
  },
  {
    IdProducto: 5022,
    NombreProducto: 'TEE BOX - TOMATO STRIKER',
    Valor: 100,
    ConDescuento: false,
    Stock: 5,
    ImageUrl: '/tee-box-tomato-striker.avif',
    VideoUrl: '',
    UrlCompra: 'tee-box-tomato-striker.avif',
    Nivel: 'Striker',
    Tag: 'Tomato Striker',
    Popularidad: 84,
    Featured: 4,
  },
  {
    IdProducto: 5020,
    NombreProducto: 'TEE BOX - YELLOW BUILDER',
    Valor: 100,
    ConDescuento: false,
    Stock: 6,
    ImageUrl: 'https://golfincolors.com/wp-content/uploads/2025/12/ChatGPT-Image-Dec-25-2025-at-12_34_29-PM-300x300.png',
    VideoUrl: '',
    UrlCompra: 'https://golfincolors.com/product/tee-box-yellow-builder/',
    Nivel: 'Builder',
    Tag: 'Yellow Builder',
    Popularidad: 82,
    Featured: 5,
  },
];

const Catalogo = () => {
  const [productos, setProductos] = useState([]);
  const location = useLocation();
  const [snackbar, setSnackbar] = useState({ open: false, type: 'success', message: '' });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const FormatearPesos = (valor) => `$${valor.toLocaleString('es-CL')}`;
  const CalcularValorOld = (valor) => FormatearPesos(valor + 5);
  const [productoActivo, setProductoActivo] = useState({});
  const [showArrow, setShowArrow] = useState({});
  const [animarFlecha, setAnimarFlecha] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [entered, setEntered] = useState(false);
  const NAV_FADE_MS = 1000;
  const swiperRefs = useRef({});
  const fechaActual = new Date().toLocaleDateString('es-CL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  useEffect(() => {
    const productosOrdenados = [...staticProducts];
    setProductos(productosOrdenados);

    const imagenes = productosOrdenados.map((p) => p.ImageUrl);
    let cargadas = 0;

    if (imagenes.length === 0) {
      setTimeout(() => setIsLoaded(true), 700);
      return;
    }

    const verificarCarga = () => {
      cargadas++;
      if (cargadas === imagenes.length) {
        setTimeout(() => setIsLoaded(true), 800);
      }
    };

    imagenes.forEach((src) => {
      const img = new Image();
      img.onload = verificarCarga;
      img.onerror = verificarCarga;
      img.src = src;
    });
  }, []);

  useEffect(() => {
    if (location.state?.snackbar) {
      setSnackbar(location.state.snackbar);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const filteredSorted = useMemo(() => [...productos], [productos]);
  const shopHighlight = staticProducts[0];

  const chunkProductos = (arr, size) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) chunks.push(arr.slice(i, i + size));
    return chunks;
  };

  const grupos = chunkProductos(filteredSorted, 3);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setProductoActivo((prev) => ({ ...prev, 0: prev?.[0] === 0 ? null : 0 }));
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setAnimarFlecha(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (isLoaded) setEntered(true);
  }, [isLoaded]);

  return (
    <Box key={isLoaded ? 'loaded' : 'loading'}>
      {isLoaded ? (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: entered ? 1 : 0, y: 0 }}
          transition={{ duration: NAV_FADE_MS / 1000, ease: [0.22, 1, 0.36, 1] }}
          className="route-fade"
          style={{ minHeight: '100vh' }}
        >
          <Container
            maxWidth={false}
            disableGutters
            sx={{
              overflowX: 'hidden',
              minHeight: '100vh',
              width: '100%',
              pt: 11,
              pb: 14,
              px: 1.2,
              position: 'relative',
              backgroundColor: '#f7f4ed',
              '& > *': { position: 'relative', zIndex: 1 },
            }}
          >
            {isMobile ? (
              grupos.map((grupo, grupoIndex) => (
                <Box key={`swiper-container-${grupoIndex}`} sx={{ position: 'relative', py: 0 }}>
                  {grupoIndex === 1 && (
                    <Box
                      sx={{
                        width: '100vw',
                        ml: 'calc(50% - 50vw)',
                        mr: 'calc(50% - 50vw)',
                        mb: 1.1,
                        mt: 0.2,
                        borderRadius: 0,
                        overflow: 'hidden',
                        border: 'none',
                        background: 'linear-gradient(130deg, #0f3a2d 0%, #1f6a55 100%)',
                        boxShadow: 'none',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'stretch', minHeight: 118 }}>
                        <Box sx={{ flex: 1, p: 1.25, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Box
                            component="a"
                            href={shopHighlight.UrlCompra}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              textDecoration: 'none',
                              bgcolor: 'transparent',
                              color: '#ffffff',
                              fontWeight: 900,
                              letterSpacing: '0.01em',
                              fontSize: '0.95rem',
                              px: 2.2,
                              py: 0.95,
                              borderRadius: 0,
                              border: '2px solid rgba(255,255,255,0.95)',
                              boxShadow: 'none',
                            }}
                          >
                            Shop now
                          </Box>
                        </Box>
                        <Box
                          component="img"
                          src="/tee-box-blue-starter.png"
                          alt={shopHighlight.NombreProducto}
                          sx={{
                            width: '44%',
                            maxWidth: 180,
                            objectFit: 'contain',
                            objectPosition: 'center',
                            borderLeft: 'none',
                            backgroundColor: 'transparent',
                          }}
                        />
                      </Box>
                    </Box>
                  )}

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 0, mb: 0, position: 'relative', zIndex: 20, height: 30 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 1 }}>
                      <Box component="img" loading="lazy" decoding="async" src="cine.png" alt="Reels icon" sx={{ width: 16, height: 16, alignSelf: 'center', mt: 0 }} />
                      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', color: '#1f3c33', fontFamily: '"Segoe UI", sans-serif', lineHeight: 1.2 }}>
                        <Box sx={{ fontWeight: 'bold', fontSize: '0.85rem' }}>{grupoIndex === 0 ? 'Explore catalog' : 'More active products'}</Box>
                        {grupoIndex === 0 && (
                          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.4, ease: 'easeOut' }}>
                            <Box sx={{ fontWeight: 400, fontSize: '0.75rem', opacity: 0.9 }}>
                              Last stock update <Box component="span" sx={{ fontWeight: 'bold' }}>{fechaActual}</Box>
                            </Box>
                          </motion.div>
                        )}
                      </Box>
                    </Box>

                    <Box sx={{ width: 40, textAlign: 'right' }}>
                      {showArrow[grupoIndex] !== false ? (
                        animarFlecha ? (
                          <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: 1, ease: 'easeInOut' }}>
                            <IconButton onClick={() => swiperRefs.current[grupoIndex]?.slideNext()} sx={{ color: '#1f3c33', boxShadow: 'none', padding: 0.5, '&:hover': { backgroundColor: 'rgba(0,0,0,0.08)' } }}>
                              <ArrowForwardIcon fontSize="large" sx={{ fontSize: '24px' }} />
                            </IconButton>
                          </motion.div>
                        ) : (
                          <IconButton onClick={() => swiperRefs.current[grupoIndex]?.slideNext()} sx={{ color: '#1f3c33', boxShadow: 'none', padding: 0.5, '&:hover': { backgroundColor: 'rgba(0,0,0,0.08)' } }}>
                            <ArrowForwardIcon fontSize="large" sx={{ fontSize: '24px' }} />
                          </IconButton>
                        )
                      ) : <Box sx={{ width: 40 }} />}
                    </Box>
                  </Box>

                  <Swiper
                    modules={[Virtual]}
                    watchSlidesProgress
                    onSwiper={(swiper) => (swiperRefs.current[grupoIndex] = swiper)}
                    spaceBetween={12}
                    slidesPerView={'auto'}
                    centeredSlides={false}
                    touchRatio={1.2}
                    threshold={5}
                    style={{ padding: '16px 4px', overflow: 'visible' }}
                    onSlideChange={(swiper) => setShowArrow((prev) => ({ ...prev, [grupoIndex]: !swiper.isEnd }))}
                  >
                    {grupo.map((producto, index) => {
                      const productoIndexGlobal = index + grupoIndex * 5;
                      const isGirado = productoActivo[grupoIndex] === index;
                      return (
                        <SwiperSlide key={producto.IdProducto} style={{ width: '45vw', maxWidth: '200px', scrollSnapAlign: 'start', overflow: 'visible' }}>
                          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Productos
                              index={productoIndexGlobal}
                              producto={producto}
                              girado={isGirado}
                              onGirar={() => setProductoActivo((prevState) => ({ ...prevState, [grupoIndex]: prevState[grupoIndex] === index ? null : index }))}
                              FormatearPesos={FormatearPesos}
                              CalcularValorOld={CalcularValorOld}
                            />
                          </Box>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </Box>
              ))
            ) : (
              <>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0 }}>
                      <Box sx={{ fontWeight: 'bold', fontSize: '1rem', color: '#1f3c33', ml: 1 }}>Product catalog</Box>
                      <Box sx={{ width: 40, textAlign: 'right' }}>
                        {showArrow.desktop !== false ? (
                          animarFlecha ? (
                            <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: 1, ease: 'easeInOut' }}>
                              <IconButton onClick={() => swiperRefs.current.desktop?.slideNext()} sx={{ color: '#1f3c33', boxShadow: 'none', padding: 0.5, '&:hover': { backgroundColor: 'rgba(0,0,0,0.08)' } }}>
                                <ArrowForwardIcon fontSize="large" sx={{ fontSize: '24px' }} />
                              </IconButton>
                            </motion.div>
                          ) : (
                            <IconButton onClick={() => swiperRefs.current.desktop?.slideNext()} sx={{ color: '#1f3c33', boxShadow: 'none', padding: 0.5, '&:hover': { backgroundColor: 'rgba(0,0,0,0.08)' } }}>
                              <ArrowForwardIcon fontSize="large" sx={{ fontSize: '24px' }} />
                            </IconButton>
                          )
                        ) : <Box sx={{ width: 40 }} />}
                      </Box>
                    </Box>

                    <Swiper modules={[Virtual]} slidesPerView={1} spaceBetween={20} onSwiper={(swiper) => (swiperRefs.current.desktop = swiper)} style={{ padding: '10px' }}>
                      {chunkProductos(filteredSorted, 8).map((grupo, grupoIndex) => (
                        <SwiperSlide key={`desktop-slide-${grupoIndex}`}>
                          <Grid container spacing={2}>
                            {Array.from({ length: 9 }).map((_, slotIndex) => {
                              const producto = grupo[slotIndex];
                              return (
                                <Grid item xs={12} sm={4} key={producto ? producto.IdProducto : `empty-${slotIndex}`} sx={{ display: 'flex', justifyContent: 'center' }}>
                                  {producto ? (
                                    <Box sx={{ width: { xs: '45vw', md: '32vw' }, maxWidth: { xs: '220px', md: '240px' }, display: 'flex', justifyContent: 'center' }}>
                                      <Productos
                                        index={slotIndex}
                                        producto={producto}
                                        girado={productoActivo === slotIndex}
                                        onGirar={() => setProductoActivo(productoActivo === slotIndex ? null : slotIndex)}
                                        FormatearPesos={FormatearPesos}
                                        CalcularValorOld={CalcularValorOld}
                                      />
                                    </Box>
                                  ) : (
                                    <Box sx={{ width: { xs: '45vw', md: '12vw' }, maxWidth: { xs: '200px', md: '220px' } }} />
                                  )}
                                </Grid>
                              );
                            })}
                          </Grid>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box component="img" src="catalogo-img.png" alt="Catálogo" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </Grid>
                </Grid>
              </>
            )}
            <Box
              sx={{
                width: '100vw',
                ml: 'calc(50% - 50vw)',
                mr: 'calc(50% - 50vw)',
                mt: { xs: 1.6, sm: 2.4 },
                background: '#ffffff',
                borderTop: '1px solid rgba(31,60,51,0.18)',
                borderBottom: '1px solid rgba(31,60,51,0.18)',
                py: 1.1,
                overflow: 'hidden',
              }}
            >
              <Typography sx={{ color: '#183a30', fontWeight: 800, fontSize: { xs: '0.72rem', sm: '0.8rem' }, mb: 0.7, letterSpacing: '0.02em', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, textTransform: 'uppercase' }}>
                <LockRoundedIcon sx={{ fontSize: { xs: 13, sm: 15 }, color: '#183a30' }} />
                Secure Payments
              </Typography>
              <Box sx={{ overflow: 'hidden', px: 0.5 }}>
                <motion.div
                  animate={{ x: ['0%', '-50%'] }}
                  transition={{ duration: 18, ease: 'linear', repeat: Infinity }}
                  style={{ display: 'flex', width: 'max-content' }}
                >
                  {[0, 1].map((copyIndex) => (
                    <Box key={copyIndex} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {[
                        { src: '/paypal.png', alt: 'PayPal' },
                        { src: '/mastercard.webp', alt: 'MasterCard' },
                        { src: '/visa.avif', alt: 'Visa' },
                        { src: '/american-express.png', alt: 'American Express' },
                        { src: '/google-pay.png', alt: 'Google Pay' },
                        { src: '/apple-pay.png', alt: 'Apple Pay' },
                      ].map((brand) => (
                        <Box
                          key={`${copyIndex}-${brand.alt}`}
                          component="img"
                          src={brand.src}
                          alt={brand.alt}
                          loading="lazy"
                          decoding="async"
                          sx={{
                            width: brand.alt.includes('Google Pay') ? { xs: 50, sm: 74 } : { xs: 58, sm: 84 },
                            height: brand.alt.includes('Google Pay') ? { xs: 31, sm: 41 } : { xs: 31, sm: 41 },
                            objectFit: 'contain',
                            bgcolor: 'transparent',
                            p: 0.35,
                            border: '1px solid rgba(31,60,51,0.14)',
                          }}
                        />
                      ))}
                    </Box>
                  ))}
                </motion.div>
              </Box>
            </Box>

            <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
              <Alert severity={snackbar.type} onClose={() => setSnackbar({ ...snackbar, open: false })} sx={{ width: '100%', maxWidth: 360 }}>
                {snackbar.message}
              </Alert>
            </Snackbar>
          </Container>
        </motion.div>
      ) : (
        <Container
          maxWidth={false}
          disableGutters
          sx={{
            minHeight: '100vh',
            pt: 10,
            pb: 14,
            px: 1.2,
            backgroundColor: '#f7f4ed',
          }}
        >
          <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
            <Grid container spacing={2}>
              {Array.from({ length: 6 }).map((_, i) => (
                <Grid item xs={12} sm={6} md={4} key={`s-${i}`}>
                  <Box sx={{ p: 1.2, borderRadius: 2, border: '1px solid rgba(24,58,48,0.16)', backgroundColor: '#fffaf0' }}>
                    <Skeleton variant="rectangular" height={170} sx={{ borderRadius: 1.5, mb: 1, bgcolor: 'rgba(24,58,48,0.08)' }} />
                    <Skeleton variant="text" width="90%" sx={{ bgcolor: 'rgba(24,58,48,0.12)' }} />
                    <Skeleton variant="text" width="50%" sx={{ mb: 1.2, bgcolor: 'rgba(24,58,48,0.12)' }} />
                    <Skeleton variant="rounded" height={30} sx={{ bgcolor: 'rgba(24,58,48,0.14)' }} />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      )}
    </Box>
  );
};

export default Catalogo;













