import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Button, Card, CardContent, Snackbar, Alert, Dialog, AppBar, Toolbar, Paper,
  Box, Grid, TextField, IconButton, Collapse, FormControlLabel, Checkbox, useMediaQuery, useTheme,
  Select, MenuItem, InputLabel, FormControl
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import UpdateIcon from '@mui/icons-material/Update';
import RestoreIcon from '@mui/icons-material/Restore';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import { cargarProductos } from '../../helpers/HelperProductos';
import { DialogEliminarProducto, DialogRestaurarProductos } from './DialogosProductos';
import MenuInferior from '../configuraciones/MenuInferior';

const ConfigurarProductos = () => {
  const [productos, setProductos] = useState([]);
  const [selected, setSelected] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(null);
  const [productoAEliminar, setProductoAEliminar] = useState(null);
  const [restaurarOpen, setRestaurarOpen] = useState(false);
  const [eliminando, setEliminando] = useState(false);
  const [restaurando, setRestaurando] = useState(false);
  const [actualizando, setActualizando] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const [dialogEditarOpen, setDialogEditarOpen] = useState(false);
  const [previewImagen, setPreviewImagen] = useState(null);
  const functionsBaseUrl = window.location.hostname === 'localhost' ? 'http://localhost:8888' : '';
  const [subiendoImagen, setSubiendoImagen] = useState(false);
  const [imagenActualizada, setImagenActualizada] = useState(false);
  const [productoGuardado, setProductoGuardado] = useState(false);
  const [subiendoVideo, setSubiendoVideo] = useState(false);
  const [videoActualizado, setVideoActualizado] = useState(false);
  const [previewVideo, setPreviewVideo] = useState(null);
  const [modoFormulario, setModoFormulario] = useState('editar'); // 'nuevo' | 'editar'

  const productoVacio = {
    IdProducto:    '',
    NombreProducto:'',
    Descripcion:   '',
    Categoria:     '',
    Valor:         '',
    ValorOriginal: '',
    Stock:         '',
    Activo:        true,
    Destacado:     false,
    ConDescuento:  false,
    Orden:         '',
    ImageUrl:      '',
    VideoUrl:      '',
  };

  const [nuevoProducto, setNuevoProducto] = useState(productoVacio);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const cardSize = isMobile ? "300px" : "340px";

  useEffect(() => {
    recargarProductos();
  }, []);

  const recargarProductos = async () => {
    const data = await cargarProductos();
    const ordenados = [...data].sort((a, b) => String(a.IdProducto).localeCompare(String(b.IdProducto)));
    setProductos(ordenados);
  };

  const handleEditar = (index) => {
    setModoFormulario('editar');
    setSelected(index);
    setPreviewImagen(null);
    setPreviewVideo(null);
    setNuevoProducto({ ...productos[index] });
    setDialogEditarOpen(true);
  };

  const handleCancelar = () => {
    setPreviewImagen(null);
    setPreviewVideo(null);
    setSelected(null);
    setMostrarFormulario(null);
    setDialogEditarOpen(false);
    // Resetear modo después de que el dialog termine de cerrarse
    setTimeout(() => setModoFormulario('editar'), 300);
  };

  useEffect(() => {
    if (dialogEditarOpen) {
      setImagenActualizada(false);
    }
  }, [dialogEditarOpen]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNuevoProducto((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleGuardar = async () => {
    if (!nuevoProducto.NombreProducto || !nuevoProducto.Valor || isNaN(nuevoProducto.Valor)) {
      setSnackbar({ open: true, message: 'Por favor completa los campos obligatorios.' });
      return;
    }

    // Solo un producto puede ser destacado a la vez
    if (nuevoProducto.Destacado) {
      const otroDestacado = productos.find(
        (p) => p.Destacado && Number(p.IdProducto) !== Number(nuevoProducto.IdProducto)
      );
      if (otroDestacado) {
        setSnackbar({ open: true, message: `Ya existe un producto destacado: "${otroDestacado.NombreProducto}". Quitale el destacado primero.` });
        return;
      }
    }

    const MAX = 1_000_000;
    const camposNumericos = [
      { campo: 'Valor',         label: 'Precio'          },
      { campo: 'ValorOriginal', label: 'Precio original' },
      { campo: 'Stock',         label: 'Stock'           },
      { campo: 'Orden',         label: 'Orden'           },
    ];
    for (const { campo, label } of camposNumericos) {
      const val = Number(nuevoProducto[campo]);
      if (val > MAX) {
        setSnackbar({ open: true, message: `${label} no puede superar 1.000.000` });
        return;
      }
    }

    const url = `${functionsBaseUrl}/.netlify/functions/actualizarProducto`;
    setActualizando(true);

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ producto: nuevoProducto }),
      });

      await res.json();

      setSnackbar({
        open: true,
        message:
          modoFormulario === 'nuevo'
            ? 'Producto creado correctamente 🎉'
            : 'Producto actualizado correctamente ✏️',
      });

      await recargarProductos();
      handleCancelar();
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: 'Error al guardar producto' });
    } finally {
      setActualizando(false);
    }
  };

  const handleEliminar = (producto) => {
    setProductoAEliminar(producto);
  };

  const confirmarEliminar = async () => {
    if (productoAEliminar === null) return;
    setEliminando(true);
    try {
      const producto = productoAEliminar;
      const url = `${window.location.hostname === 'localhost' ? 'http://localhost:8888' : ''}/.netlify/functions/eliminarProducto`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ IdProducto: producto.IdProducto })
      });
      const result = await res.json();
      setSnackbar({ open: true, message: result.message || 'Producto eliminado.' });
      await recargarProductos();
    } catch (err) {
      console.error('Error al eliminar producto:', err);
      setSnackbar({ open: true, message: 'Error al eliminar producto' });
    } finally {
      setProductoAEliminar(null);
      setEliminando(false);
    }
  };

  const confirmarRestaurar = async () => {
    setRestaurando(true);
    try {
      const url = `${window.location.hostname === 'localhost' ? 'http://localhost:8888' : ''}/.netlify/functions/restaurarProductos`;
      const res = await fetch(url, { method: 'POST' });
      const result = await res.json();
      setSnackbar({ open: true, message: result.message || 'Productos restaurados' });
      await recargarProductos();
    } catch (err) {
      console.error('Error al restaurar productos:', err);
      setSnackbar({ open: true, message: 'Error al restaurar productos' });
    } finally {
      setRestaurarOpen(false);
      setRestaurando(false);
    }
  };

  const obtenerSiguienteIdProducto = () => {
    if (!productos.length) return 1;
    const maxId = Math.max(
      ...productos
        .map(p => Number(p.IdProducto))
        .filter(id => !Number.isNaN(id))
    );
    return maxId + 1;
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        minHeight: '100vh',
        width: '100vw',
        overflowX: 'hidden',
        py: 1,
        px: 0,
        pb: 2,
        backgroundImage: 'url(/fondo-administracion.webp)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
      }}
    >
      <Box sx={{ pt: 10, px: { xs: 2, md: 4 }, pb: 12 }}>

        {/* HEADER */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2.5}
          sx={{
            background: 'rgba(0,0,0,0.35)',
            backdropFilter: 'blur(12px)',
            borderRadius: 3,
            px: 2,
            py: 1.5,
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <Box>
            <Typography
              sx={{
                color: 'white',
                fontWeight: 800,
                fontSize: { xs: '1rem', sm: '1.3rem' },
                fontFamily: "'Poppins', sans-serif",
                lineHeight: 1.2,
              }}
            >
              Catalogo
            </Typography>
            <Typography
              sx={{
                color: 'rgba(255,255,255,0.55)',
                fontSize: '0.72rem',
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              {productos.length} producto{productos.length !== 1 ? 's' : ''}
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<AddIcon sx={{ fontSize: '1rem !important' }} />}
            onClick={() => {
              const nextId = obtenerSiguienteIdProducto();
              setModoFormulario('nuevo');
              setSelected(null);
              setNuevoProducto({ ...productoVacio, IdProducto: nextId });
              setDialogEditarOpen(true);
            }}
            sx={{
              fontSize: '0.78rem',
              fontWeight: 700,
              fontFamily: "'Poppins', sans-serif",
              backgroundColor: 'rgba(255,255,255,0.15)',
              color: 'white',
              borderRadius: '30px',
              px: 2,
              py: 0.8,
              textTransform: 'none',
              border: '1px solid rgba(255,255,255,0.25)',
              backdropFilter: 'blur(8px)',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.28)',
              },
            }}
          >
            Agregar
          </Button>
        </Box>

        {/* GRID DE PRODUCTOS */}
        <Grid container spacing={1.5}>
          <AnimatePresence>
            {productos.map((producto, idx) => (
              <Grid item xs={4} sm={3} md={1.5} lg={1.5} key={producto.IdProducto || idx}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35, delay: idx * 0.03, ease: 'easeOut' }}
                  style={{ height: '100%' }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      aspectRatio: '3 / 4',
                      borderRadius: 2.5,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.35)',
                      '&:hover .card-actions': { opacity: 1 },
                      '&:hover .card-img': { transform: 'scale(1.06)' },
                    }}
                  >
                    {/* IMAGEN */}
                    <Box
                      className="card-img"
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `url(${producto.ImageUrl}?v=${producto.IdProducto}-${producto.Valor})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        transition: 'transform 0.4s ease',
                      }}
                    />

                    {/* GRADIENTE INFERIOR */}
                    <Box
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%)',
                      }}
                    />

                    {/* BADGE DESCUENTO */}
                    {producto.ConDescuento && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 8,
                          left: 8,
                          backgroundColor: '#E95420',
                          color: 'white',
                          fontSize: '0.6rem',
                          fontWeight: 700,
                          fontFamily: "'Poppins', sans-serif",
                          px: 0.8,
                          py: 0.3,
                          borderRadius: 1,
                          letterSpacing: '0.04em',
                        }}
                      >
                        OFERTA
                      </Box>
                    )}

                    {/* INFO INFERIOR */}
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        p: 1,
                      }}
                    >
                      <Typography
                        noWrap
                        sx={{
                          color: 'white',
                          fontWeight: 700,
                          fontSize: { xs: '0.65rem', sm: '0.75rem' },
                          fontFamily: "'Poppins', sans-serif",
                          lineHeight: 1.2,
                        }}
                      >
                        {producto.NombreProducto}
                      </Typography>
                      <Typography
                        sx={{
                          color: '#FFD166',
                          fontWeight: 600,
                          fontSize: { xs: '0.6rem', sm: '0.7rem' },
                          fontFamily: "'Poppins', sans-serif",
                        }}
                      >
                        ${producto.Valor}
                      </Typography>
                      <Typography
                        sx={{
                          color: 'rgba(255,255,255,0.55)',
                          fontSize: { xs: '0.55rem', sm: '0.62rem' },
                          fontFamily: "'Poppins', sans-serif",
                        }}
                      >
                        Stock: {producto.Stock}
                      </Typography>
                    </Box>

                    {/* BOTONES — aparecen al hover */}
                    <Box
                      className="card-actions"
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 0.6,
                        opacity: 0,
                        transition: 'opacity 0.25s ease',
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={() => handleEditar(idx)}
                        sx={{
                          backgroundColor: 'white',
                          color: '#222',
                          width: 28,
                          height: 28,
                          '&:hover': { backgroundColor: '#f0f0f0' },
                        }}
                      >
                        <EditIcon sx={{ fontSize: 14 }} />
                      </IconButton>

                      <IconButton
                        size="small"
                        onClick={() => handleEliminar(producto)}
                        sx={{
                          backgroundColor: '#e53935',
                          color: 'white',
                          width: 28,
                          height: 28,
                          '&:hover': { backgroundColor: '#b71c1c' },
                        }}
                      >
                        <DeleteIcon sx={{ fontSize: 14 }} />
                      </IconButton>
                    </Box>

                    {/* FORMULARIO INLINE (DESKTOP) */}
                    <Collapse in={mostrarFormulario === idx} timeout={400} unmountOnExit>
                      <Box sx={{ p: 2, backgroundColor: '#fff', color: '#000' }}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <TextField fullWidth label="Nombre" name="NombreProducto" value={nuevoProducto.NombreProducto} onChange={handleInputChange} />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField fullWidth label="Precio" name="Valor" type="number" value={nuevoProducto.Valor} onChange={handleInputChange} />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField fullWidth label="Stock" name="Stock" type="number" value={nuevoProducto.Stock} onChange={handleInputChange} />
                          </Grid>
                          <Grid item xs={12}>
                            <FormControlLabel
                              control={<Checkbox checked={nuevoProducto.ConDescuento} onChange={handleInputChange} name="ConDescuento" />}
                              label="Con descuento"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField fullWidth label="Descripcion" name="Descripcion" value={nuevoProducto.Descripcion} onChange={handleInputChange} />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField fullWidth label="Imagen URL" name="ImageUrl" value={nuevoProducto.ImageUrl} onChange={handleInputChange} />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField fullWidth label="Video URL" name="VideoUrl" value={nuevoProducto.VideoUrl} onChange={handleInputChange} />
                          </Grid>
                          <Grid item xs={12}>
                            <Box display="flex" gap={1}>
                              <Button variant="contained" onClick={handleGuardar} disabled={actualizando} fullWidth startIcon={<UpdateIcon />}>
                                Guardar
                              </Button>
                              <Button variant="outlined" onClick={handleCancelar} fullWidth>
                                Cancelar
                              </Button>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </Collapse>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </AnimatePresence>
        </Grid>

        {/* DIALOG EDITAR / NUEVO */}
        <Dialog
          fullScreen={isMobile}
          open={dialogEditarOpen}
          onClose={handleCancelar}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: !isMobile ? {
              borderRadius: 3,
              overflow: 'hidden',
            } : {}
          }}
        >
          {/* HEADER */}
          <Box
            sx={{
              background: modoFormulario === 'nuevo'
              ? 'linear-gradient(135deg, #1a3a2a, #2d6a4f, #40916c)'
              : 'linear-gradient(135deg, #1a2a3a, #2d4a6a, #3a6b9e)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 2,
              py: 1.5,
            }}
          >
            <Typography sx={{ fontWeight: 700, color: 'white', fontSize: '1rem', fontFamily: "'Poppins', sans-serif" }}>
              {modoFormulario === 'nuevo' ? 'Nuevo Producto' : 'Editar Producto'}
            </Typography>
            <motion.div
              key={dialogEditarOpen ? 'open' : 'closed'}
              animate={{ rotate: [0, 360, 720, 1080] }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <IconButton onClick={handleCancelar} sx={{ color: 'white' }}>
                <CloseIcon />
              </IconButton>
            </motion.div>
          </Box>

          <Box sx={{ p: isMobile ? 1.5 : 2, backgroundColor: '#f7f5f6', ...(isMobile ? { minHeight: '100%' } : {}) }}>

            {/* Layout: 1 col mobile / 2 col desktop */}
            <Box sx={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 2 }}>

              {/* ── COLUMNA IZQUIERDA: campos de texto ── */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>

                <TextField
                  fullWidth size="small" label="Nombre" name="NombreProducto"
                  value={nuevoProducto.NombreProducto} onChange={handleInputChange}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, backgroundColor: '#fff' } }}
                />

                <FormControl fullWidth size="small">
                  <InputLabel>Categoría</InputLabel>
                  <Select
                    name="Categoria" value={nuevoProducto.Categoria} label="Categoría"
                    onChange={handleInputChange}
                    sx={{ borderRadius: 2, backgroundColor: '#fff' }}
                  >
                    <MenuItem value="Cocina">Cocina</MenuItem>
                    <MenuItem value="Limpieza">Limpieza</MenuItem>
                    <MenuItem value="Accesorios">Accesorios</MenuItem>
                    <MenuItem value="Seguridad">Seguridad</MenuItem>
                  </Select>
                </FormControl>

                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
                  <TextField
                    size="small" label="Precio" name="Valor" type="number"
                    value={nuevoProducto.Valor} onChange={handleInputChange}
                    inputProps={{ min: 0, max: 1000000 }}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, backgroundColor: '#fff' } }}
                  />
                  <TextField
                    size="small" label="Precio original" name="ValorOriginal" type="number"
                    value={nuevoProducto.ValorOriginal} onChange={handleInputChange}
                    inputProps={{ min: 0, max: 1000000 }}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, backgroundColor: '#fff' } }}
                  />
                </Box>

                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
                  <TextField
                    size="small" label="Stock" name="Stock" type="number"
                    value={nuevoProducto.Stock} onChange={handleInputChange}
                    inputProps={{ min: 0, max: 1000000 }}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, backgroundColor: '#fff' } }}
                  />
                  <TextField
                    size="small" label="Orden" name="Orden" type="number"
                    value={nuevoProducto.Orden} onChange={handleInputChange}
                    inputProps={{ min: 0, max: 1000000 }}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, backgroundColor: '#fff' } }}
                  />
                </Box>

                <TextField
                  fullWidth size="small" multiline minRows={2} label="Descripción"
                  name="Descripcion" value={nuevoProducto.Descripcion} onChange={handleInputChange}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, backgroundColor: '#fff' } }}
                />

                {/* Checkboxes en fila compacta */}
                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', ml: -0.5 }}>
                  {[
                    { name: 'Activo',       label: 'Activo'       },
                    { name: 'Destacado',    label: 'Destacado'    },
                    { name: 'ConDescuento', label: 'Con descuento'},
                  ].map(({ name, label }) => (
                    <FormControlLabel
                      key={name}
                      control={
                        <Checkbox
                          size="small"
                          checked={!!nuevoProducto[name]}
                          onChange={handleInputChange}
                          name={name}
                          sx={{ color: '#7b4b5a', '&.Mui-checked': { color: '#5a2e3b' }, p: 0.5 }}
                        />
                      }
                      label={<Typography sx={{ fontSize: '0.78rem' }}>{label}</Typography>}
                      sx={{ mx: 0.5 }}
                    />
                  ))}
                </Box>
              </Box>

              {/* ── COLUMNA DERECHA: imagen + video ── */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>

                {/* IMAGEN */}
                <Box
                  component="label"
                  sx={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    aspectRatio: '4/3', borderRadius: 2.5, overflow: 'hidden',
                    border: '2px dashed #c9b0b8', cursor: 'pointer', position: 'relative',
                    backgroundColor: '#fff',
                    backgroundImage: previewImagen || nuevoProducto.ImageUrl
                      ? `url(${previewImagen || nuevoProducto.ImageUrl})`
                      : 'none',
                    backgroundSize: 'cover', backgroundPosition: 'center',
                    transition: 'border-color 0.2s',
                    '&:hover': { borderColor: '#7b4b5a' },
                  }}
                >
                  {!previewImagen && !nuevoProducto.ImageUrl && (
                    <Box sx={{ textAlign: 'center', color: '#aaa' }}>
                      <Typography sx={{ fontSize: '2rem', lineHeight: 1 }}>📷</Typography>
                      <Typography sx={{ fontSize: '0.72rem', mt: 0.5 }}>Subir imagen</Typography>
                    </Box>
                  )}
                  <input type="file" hidden accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files[0];
                      if (!file) return;
                      const previewUrl = URL.createObjectURL(file);
                      setPreviewImagen(previewUrl);
                      setSubiendoImagen(true);
                      const reader = new FileReader();
                      reader.onloadend = async () => {
                        try {
                          const base64 = reader.result.split(',')[1];
                          const res = await fetch(`${functionsBaseUrl}/.netlify/functions/subirImagenProducto`, {
                            method: 'POST', headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ fileBase64: base64, contentType: file.type, productoId: nuevoProducto.IdProducto }),
                          });
                          if (!res.ok) throw new Error('Error al subir imagen');
                          const { url } = await res.json();
                          setNuevoProducto((prev) => ({ ...prev, ImageUrl: `${url}?v=${Date.now()}` }));
                          setSubiendoImagen(false);
                          setImagenActualizada(true);
                          setTimeout(() => setImagenActualizada(false), 2000);
                        } catch (err) {
                          console.error(err);
                          setSnackbar({ open: true, message: 'Error al subir la imagen' });
                          setPreviewImagen(null);
                          setSubiendoImagen(false);
                        } finally { URL.revokeObjectURL(previewUrl); }
                      };
                      reader.readAsDataURL(file);
                    }}
                  />
                  <AnimatePresence>
                    {subiendoImagen && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography sx={{ color: 'white', fontWeight: 600, fontSize: '0.8rem', background: 'rgba(0,0,0,0.4)', px: 1.5, py: 0.8, borderRadius: 2 }}>
                          Subiendo...
                        </Typography>
                      </motion.div>
                    )}
                    {imagenActualizada && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(46,125,50,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography sx={{ color: 'white', fontWeight: 700, fontSize: '0.8rem', background: 'rgba(0,0,0,0.35)', px: 1.5, py: 0.8, borderRadius: 2 }}>
                          ✅ Imagen lista
                        </Typography>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Box>

                {/* VIDEO */}
                <Box
                  component="label"
                  sx={{
                    borderRadius: 2, overflow: 'hidden', cursor: 'pointer', position: 'relative',
                    border: '2px dashed #c9b0b8', backgroundColor: '#fff',
                    minHeight: 60, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    '&:hover': { borderColor: '#7b4b5a' },
                  }}
                >
                  {(previewVideo || nuevoProducto.VideoUrl) ? (
                    <video src={previewVideo || nuevoProducto.VideoUrl} controls style={{ width: '100%', maxHeight: 120, display: 'block' }} />
                  ) : (
                    <Box sx={{ textAlign: 'center', color: '#aaa', py: 1 }}>
                      <Typography sx={{ fontSize: '1.6rem', lineHeight: 1 }}>🎬</Typography>
                      <Typography sx={{ fontSize: '0.72rem', mt: 0.5 }}>Subir video</Typography>
                    </Box>
                  )}
                  <input type="file" hidden accept="video/mp4,video/webm,video/quicktime"
                    onChange={async (e) => {
                      const file = e.target.files[0];
                      if (!file) return;
                      const previewUrl = URL.createObjectURL(file);
                      setPreviewVideo(previewUrl);
                      setSubiendoVideo(true);
                      const reader = new FileReader();
                      reader.onloadend = async () => {
                        try {
                          const base64 = reader.result.split(',')[1];
                          const res = await fetch(`${functionsBaseUrl}/.netlify/functions/subirVideoProducto`, {
                            method: 'POST', headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ fileBase64: base64, contentType: file.type, productoId: nuevoProducto.IdProducto }),
                          });
                          if (!res.ok) throw new Error('Error al subir video');
                          const { url } = await res.json();
                          setNuevoProducto((prev) => ({ ...prev, VideoUrl: url }));
                          setSubiendoVideo(false);
                          setVideoActualizado(true);
                          setTimeout(() => setVideoActualizado(false), 2500);
                        } catch (err) {
                          console.error(err);
                          setSnackbar({ open: true, message: 'Error al subir el video' });
                          setPreviewVideo(null);
                          setSubiendoVideo(false);
                        } finally { URL.revokeObjectURL(previewUrl); }
                      };
                      reader.readAsDataURL(file);
                    }}
                  />
                  <AnimatePresence>
                    {subiendoVideo && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography sx={{ color: 'white', fontWeight: 600, fontSize: '0.8rem', background: 'rgba(0,0,0,0.4)', px: 1.5, py: 0.8, borderRadius: 2 }}>
                          Subiendo video...
                        </Typography>
                      </motion.div>
                    )}
                    {videoActualizado && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(46,125,50,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography sx={{ color: 'white', fontWeight: 700, fontSize: '0.8rem', background: 'rgba(0,0,0,0.35)', px: 1.5, py: 0.8, borderRadius: 2 }}>
                          ✅ Video listo
                        </Typography>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Box>
              </Box>
            </Box>

            {/* BOTONES */}
            <Box display="flex" gap={1} mt={2}>
              <Button
                variant="contained" fullWidth startIcon={<UpdateIcon />}
                onClick={handleGuardar} disabled={actualizando}
                sx={{ backgroundColor: '#2d6a4f', borderRadius: 3, textTransform: 'none', fontWeight: 600, '&:hover': { backgroundColor: '#1a3a2a' } }}
              >
                {actualizando ? 'Guardando...' : 'Guardar'}
              </Button>
              <Button
                variant="outlined" fullWidth onClick={handleCancelar}
                sx={{ borderRadius: 3, textTransform: 'none', borderColor: '#e0e0e0', color: '#888', backgroundColor: '#f5f5f5', '&:hover': { backgroundColor: '#ffebee', borderColor: '#e53935', color: '#e53935' }, transition: 'all 0.2s ease' }}
              >
                Cancelar
              </Button>
            </Box>

          </Box>
        </Dialog>


        <DialogEliminarProducto
          open={productoAEliminar !== null}
          producto={productoAEliminar}
          eliminando={eliminando}
          onClose={() => !eliminando && setProductoAEliminar(null)}
          onConfirm={confirmarEliminar}
        />

        <DialogRestaurarProductos
          open={restaurarOpen}
          restaurando={restaurando}
          onClose={() => !restaurando && setRestaurarOpen(false)}
          onConfirm={confirmarRestaurar}
        />

        <MenuInferior cardSize={cardSize} modo="configurar-productos" />

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert severity="success" sx={{ width: '100%' }}>{snackbar.message}</Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default ConfigurarProductos;
