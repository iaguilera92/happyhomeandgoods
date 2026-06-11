import { useState } from "react";
import {
  Dialog, DialogContent, Box, Typography, IconButton,
  TextField, Button, Divider, useMediaQuery, useTheme,
  Badge, Snackbar, Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID  = "service_svy0a4s";
const EMAILJS_TEMPLATE_ID = "template_fntyt8e";
const EMAILJS_PUBLIC_KEY  = "3PclcpNdWkYu3yrkL";

const TELEFONO = "56957581093";

const errorFieldStyle = {
  "& .MuiFilledInput-root": {
    borderRadius: 1.5,
    backgroundColor: "rgba(239,83,80,0.12)",
    border: "1.5px solid #ef5350",
    "&:hover": { backgroundColor: "rgba(239,83,80,0.18)" },
    "&.Mui-focused": { border: "1.5px solid #ef5350" },
    "&:before": { borderBottom: "none" },
    "&:after": { borderBottom: "none" },
    "&:hover:before": { borderBottom: "none" },
  },
};

const activeFieldStyle = {
  "& .MuiFilledInput-root": {
    borderRadius: 1.5,
    backgroundColor: "rgba(255,255,255,0.18)",
    border: "1px solid rgba(255,255,255,0.25)",
    "&:hover": { backgroundColor: "rgba(255,255,255,0.24)", border: "1px solid rgba(255,255,255,0.45)" },
    "&.Mui-focused": { backgroundColor: "rgba(255,255,255,0.24)", border: "1px solid #ffe082" },
    "&:before": { borderBottom: "none" },
    "&:after": { borderBottom: "none" },
    "&:hover:before": { borderBottom: "none" },
  },
};

const FormatearPesos = (valor) =>
  new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", minimumFractionDigits: 0 }).format(valor);

export default function CartDialog({ open, onClose }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { items, eliminarDelCarrito, vaciarCarrito, total } = useCart();

  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [errors, setErrors] = useState({ nombre: false, direccion: false });
  const [snackbar, setSnackbar] = useState({ open: false, type: "success", message: "" });
  const [closeKey, setCloseKey] = useState(0);

  const handleClose = () => {
    setCloseKey((k) => k + 1);
    setTimeout(onClose, 100);
  };

  const [enviando, setEnviando] = useState(false);

  const handleComprar = async () => {
    const newErrors = { nombre: !nombre.trim(), direccion: !direccion.trim() };
    setErrors(newErrors);
    if (newErrors.nombre || newErrors.direccion) return;

    const lineas = items.map((i) => {
      const subtot = i.Pack > 0 ? i.Valor * (i.cantidad / i.Pack) : i.Valor * i.cantidad;
      const qty    = i.Pack > 0 ? `${i.Pack} x` : `x${i.cantidad}`;
      return `• ${i.NombreProducto} ${qty} = ${FormatearPesos(subtot)}`;
    }).join("\n");

    const mensaje =
      `*Pedido Happy Home & Goods*\n\n` +
      `*Nombre:* ${nombre}\n` +
      `*Dirección:* ${direccion}\n` +
      `*Región:* Metropolitana, Santiago de Chile\n\n` +
      `*Productos:*\n${lineas}\n\n` +
      `*Total: ${FormatearPesos(total)}*`;

    window.open(`https://wa.me/${TELEFONO}?text=${encodeURIComponent(mensaje)}`, "_blank");

    const lineasHtml = items.map((i) => `
      <tr style="border-bottom:1px solid #f0e0d0;">
        <td style="padding:10px 12px; vertical-align:middle;">
          ${i.ImageUrl ? `<img src="${i.ImageUrl}" alt="${i.NombreProducto}" width="48" height="48" style="border-radius:8px;object-fit:cover;vertical-align:middle;margin-right:10px;border:1px solid #ddd;" />` : ""}
          <span style="vertical-align:middle;font-size:12px;">${i.NombreProducto}</span>
        </td>
        <td style="padding:10px 12px;text-align:center;font-size:12px;">${i.Pack > 0 ? `${i.Pack} x` : i.cantidad}</td>
        <td style="padding:10px 12px;text-align:right;font-size:12px;">${i.Pack > 0 ? FormatearPesos(i.Valor * (i.cantidad / i.Pack)) : FormatearPesos(i.Valor * i.cantidad)}</td>
      </tr>
    `).join("");

    setEnviando(true);
    try {
      const res = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          nombre,
          direccion,
          region: "Metropolitana, Santiago de Chile",
          productos_html: lineasHtml,
          total: FormatearPesos(total),
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      console.log("✅ EmailJS:", res.status, res.text);
    } catch (err) {
      console.error("❌ EmailJS error:", err);
      setSnackbar({ open: true, type: "error", message: `Error al enviar correo: ${err?.text || err?.message || JSON.stringify(err)}` });
    } finally {
      setEnviando(false);
    }

    vaciarCarrito();
    setNombre("");
    setDireccion("");
    handleClose();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen={isMobile}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: isMobile ? 0 : 4,
            background: "linear-gradient(145deg, #0f0f0f, #1a1a2e, #16213e)",
            color: "white",
            overflow: "hidden",
            maxHeight: isMobile ? "100%" : "90vh",
          },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #1565c0, #0d47a1, #7b1fa2)",
            px: 3,
            py: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Badge
              badgeContent={items.reduce((a, i) => a + i.cantidad, 0)}
              max={99}
              sx={{
                "& .MuiBadge-badge": {
                  background: "linear-gradient(135deg, #ff6b6b, #e53935)",
                  color: "white", fontWeight: 800, fontSize: "0.65rem",
                  minWidth: 18, height: 18, borderRadius: "9px",
                  boxShadow: "0 2px 6px rgba(229,57,53,0.6)",
                },
              }}
            >
              <ShoppingCartIcon sx={{ color: "#fff", fontSize: 28 }} />
            </Badge>
            <Typography fontWeight={700} fontSize="1.15rem" color="white">
              Tu Carrito
            </Typography>
          </Box>

          <motion.div
            key={closeKey}
            animate={{ rotate: closeKey > 0 ? [0, 360, 720, 1080] : 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <IconButton onClick={handleClose} sx={{ color: "white" }}>
              <CloseIcon />
            </IconButton>
          </motion.div>
        </Box>

        <DialogContent sx={{ p: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <Box sx={{ flex: 1, overflowY: "auto", px: 2.5, pt: 2, pb: 1 }}>

            {/* Productos */}
            {items.length === 0 ? (
              <Box sx={{ textAlign: "center", py: 6, opacity: 0.5 }}>
                <ShoppingCartIcon sx={{ fontSize: 60, mb: 1 }} />
                <Typography>Tu carrito está vacío</Typography>
              </Box>
            ) : (
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.IdProducto}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        mb: 1.5,
                        p: 1.2,
                        borderRadius: 2,
                        bgcolor: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      <Box
                        component="img"
                        src={item.ImageUrl || "/placeholder.png"}
                        alt={item.NombreProducto}
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: 1.5,
                          objectFit: "cover",
                          flexShrink: 0,
                          border: "1px solid rgba(255,255,255,0.15)",
                        }}
                      />
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                          fontSize="0.82rem"
                          fontWeight={600}
                          noWrap
                          sx={{ color: "white" }}
                        >
                          {item.NombreProducto}
                        </Typography>
                        <Typography fontSize="0.75rem" sx={{ color: "#ffe082", fontWeight: 700 }}>
                          {item.Pack > 0
                            ? `${item.Pack} x ${FormatearPesos(item.Valor)}`
                            : `${FormatearPesos(item.Valor)} × ${item.cantidad}`}
                        </Typography>
                        <Typography fontSize="0.72rem" sx={{ color: "rgba(255,255,255,0.45)" }}>
                          = {item.Pack > 0
                            ? FormatearPesos(item.Valor * (item.cantidad / item.Pack))
                            : FormatearPesos(item.Valor * item.cantidad)}
                        </Typography>
                      </Box>
                      <IconButton
                        size="small"
                        onClick={() => {
                          if (items.length === 1) {
                            onClose();
                            setTimeout(() => eliminarDelCarrito(item.IdProducto), 300);
                            return;
                          }
                          eliminarDelCarrito(item.IdProducto);
                        }}
                        sx={{ color: "#ef5350", "&:hover": { color: "#c62828" } }}
                      >
                        <DeleteOutlineIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}

            {items.length > 0 && (
              <>
                <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", my: 1.5 }} />
                <Box sx={{ display: "flex", justifyContent: "space-between", px: 0.5, mb: 2 }}>
                  <Typography fontSize="0.9rem" sx={{ color: "rgba(255,255,255,0.6)" }}>Total</Typography>
                  <Typography fontSize="1rem" fontWeight={800} sx={{ color: "#ffe082" }}>
                    {FormatearPesos(total)}
                  </Typography>
                </Box>

                <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", mb: 2 }} />

                {/* Formulario */}
                <Typography fontSize="0.85rem" fontWeight={600} sx={{ color: "rgba(255,255,255,0.7)", mb: 1.5, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                  Datos de entrega
                </Typography>

                <motion.div
                  animate={errors.nombre ? { x: [-6, 6, -4, 4, 0] } : { x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                <TextField
                  fullWidth
                  label="Nombre y Apellido"
                  value={nombre}
                  onChange={(e) => { setNombre(e.target.value); if (e.target.value.trim()) setErrors(p => ({ ...p, nombre: false })); }}
                  variant="filled"
                  size="small"
                  sx={errors.nombre ? errorFieldStyle : activeFieldStyle}
                  InputProps={{ style: { color: "white", backgroundColor: errors.nombre ? "rgba(239,83,80,0.12)" : "rgba(255,255,255,0.18)" } }}
                  InputLabelProps={{ style: { color: errors.nombre ? "#ef5350" : "rgba(255,255,255,0.75)" } }}
                />
                </motion.div>

                <motion.div
                  animate={errors.direccion ? { x: [-6, 6, -4, 4, 0] } : { x: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ marginTop: 12 }}
                >
                <TextField
                  fullWidth
                  label="Dirección"
                  value={direccion}
                  onChange={(e) => { setDireccion(e.target.value); if (e.target.value.trim()) setErrors(p => ({ ...p, direccion: false })); }}
                  variant="filled"
                  size="small"
                  sx={{ ...activeFieldStyle, mt: 1.5 }}
                  InputProps={{ style: { color: "white", backgroundColor: errors.direccion ? "rgba(239,83,80,0.12)" : "rgba(255,255,255,0.18)" } }}
                  InputLabelProps={{ style: { color: errors.direccion ? "#ef5350" : "rgba(255,255,255,0.75)" } }}
                  sx={errors.direccion ? errorFieldStyle : activeFieldStyle}
                />
                </motion.div>

                <TextField
                  fullWidth
                  label="Región"
                  value="Metropolitana — Santiago de Chile"
                  variant="filled"
                  size="small"
                  InputProps={{
                    readOnly: true,
                    style: { color: "#ffffff", backgroundColor: "rgba(255,255,255,0.06)" },
                  }}
                  InputLabelProps={{ style: { color: "rgba(255,255,255,0.55)" } }}
                  sx={{
                    ...fieldStyle, mt: 1.5,
                    "& .MuiInputBase-input": { color: "#ffffff !important", WebkitTextFillColor: "#ffffff !important" },
                  }}
                />

                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleComprar}
                  sx={{
                    mt: 2.5,
                    mb: 1,
                    py: 1.4,
                    borderRadius: 2,
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    background: "linear-gradient(135deg, #25D366, #128C7E)",
                    color: "white",
                    textTransform: "none",
                    boxShadow: "0 4px 20px rgba(37,211,102,0.4)",
                    "&:hover": {
                      background: "linear-gradient(135deg, #1ebe5d, #0d7a6e)",
                      boxShadow: "0 6px 24px rgba(37,211,102,0.55)",
                    },
                  }}
                >
                  {enviando ? "Enviando..." : "Comprar 🛒"}
                </Button>
              </>
            )}
          </Box>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((p) => ({ ...p, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.type} sx={{ borderRadius: 2 }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

const fieldStyle = {
  "& .MuiFilledInput-root": {
    borderRadius: 1.5,
    "&:before": { borderBottomColor: "rgba(255,255,255,0.2)" },
    "&:hover:before": { borderBottomColor: "rgba(255,255,255,0.4)" },
    "&:after": { borderBottomColor: "#ffe082" },
  },
};
