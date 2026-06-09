import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Snackbar,
  Alert,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ContactoForm from "./ContactoForm";

function Contacto() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return null;

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "error", // "error", "success", etc.
  });

  return (
    <Container
      sx={{
        maxWidth: "none !important",
        marginLeft: 0,
        // Sin padding-top (el usuario lo pidió explícito)
        pt: 0,
        paddingTop: "0px !important",
        pb: { xs: 2, sm: 3 },
        position: "relative",
        overflow: "hidden",
        background: "#f7f4ee",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 520,
          mx: "auto",
          mt: 0,
          px: { xs: 2, sm: 0 },
        }}
      >
        <Typography
          variant="h4"
          align="left"
          gutterBottom
          sx={{
            color: "#355f5b",
            fontFamily: "'Montserrat', Helvetica, Arial, sans-serif !important",
            lineHeight: 1.2,
            mb: 2,
          }}
        >
          Contact Us
        </Typography>

        <ContactoForm setSnackbar={setSnackbar} fullHeight={false} />
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        sx={{ zIndex: 1400 }} // Material UI usa 1300 para modales por defecto
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.type}
          sx={{
            width: "100%",
            maxWidth: 360,
            fontSize: "0.9rem",
            boxShadow: 3,
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Contacto;
