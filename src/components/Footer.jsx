import { Box, Container, Typography, Link, SvgIcon, Divider } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { useNavigate } from "react-router-dom";

const FacebookIcon = (props) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path d="M22 12c0-5.522-4.478-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.898V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
  </SvgIcon>
);

const quickLinks = [
  { label: "Inicio", path: "/" },
  { label: "Nosotros", path: "/nosotros" },
  { label: "Contacto", path: "/contacto" },
  { label: "Administración", path: "/administracion" },
];

const Footer = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ background: "#f7f4ee", borderTop: "1px solid rgba(0,0,0,0.07)", pt: { xs: 4, sm: 5 }, pb: 3 }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1.2fr 1fr 1fr" },
            gap: { xs: 3, md: 4 },
          }}
        >
          {/* Columna 1: Logo + descripción + redes */}
          <Box
            sx={{
              border: "1px solid rgba(0,0,0,0.08)",
              borderRadius: 3,
              p: 2.5,
              background: "#fff",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, mb: 1.2 }}>
              <Box component="img" src="/logo.png" alt="Logo" sx={{ height: 48, objectFit: "contain" }} />
              <Box>
                <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: "0.95rem", color: "#0c2a20", lineHeight: 1.1 }}>
                  Happy Home & Goods
                </Typography>
                <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.72rem", color: "#6b8a7a" }}>
                  Tu tienda de confianza
                </Typography>
              </Box>
            </Box>

            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.82rem", color: "#5a7068", lineHeight: 1.7, mb: 2, maxWidth: 260 }}>
              Productos para el hogar con delivery en Santiago. Compra fácil por WhatsApp o redes sociales.
            </Typography>

            <Box sx={{ display: "flex", gap: 1.2 }}>
              {[
                { href: "https://www.instagram.com/happyhomeandgoods?utm_source=qr&igsh=MXhpNzc1Mndhc2FrYQ==", icon: <InstagramIcon sx={{ fontSize: 18 }} />, bg: "linear-gradient(45deg, #cf198c, #f41242)" },
                { href: "https://www.facebook.com/profile.php?id=61590585666188&name=xhp_nt__fb__action__open_user", icon: <FacebookIcon sx={{ fontSize: 18 }} />, bg: "#1877F2" },
                { href: "https://wa.me/56957581093", icon: <WhatsAppIcon sx={{ fontSize: 18 }} />, bg: "#25D366" },
              ].map((s, i) => (
                <Box
                  key={i}
                  component="a"
                  href={s.href}
                  target="_blank"
                  rel="noopener"
                  sx={{
                    width: 34, height: 34, borderRadius: "10px",
                    background: s.bg,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff",
                    transition: "transform 0.15s ease, opacity 0.15s ease",
                    "&:hover": { transform: "translateY(-2px)", opacity: 0.88 },
                  }}
                >
                  {s.icon}
                </Box>
              ))}
            </Box>
          </Box>

          {/* Columna 2: Contacto */}
          <Box
            sx={{
              border: "1px solid rgba(0,0,0,0.08)",
              borderRadius: 3,
              p: 2.5,
              background: "#fff",
            }}
          >
            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: "0.82rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#0c2a20", mb: 2 }}>
              Contacto
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.6 }}>
              {[
                {
                  icon: <WhatsAppIcon sx={{ fontSize: 18, color: "#25D366" }} />,
                  label: "WHATSAPP",
                  value: "+569 5758 1093",
                  href: "https://wa.me/56957581093",
                },
                {
                  icon: <EmailRoundedIcon sx={{ fontSize: 18, color: "#1B83CC" }} />,
                  label: "EMAIL",
                  value: "happyhomeandgoods@gmail.com",
                  href: "https://mail.google.com/mail/?view=cm&to=happyhomeandgoods@gmail.com",
                },
                {
                  icon: <LocationOnRoundedIcon sx={{ fontSize: 18, color: "#c0392b" }} />,
                  label: "UBICACIÓN",
                  value: "Santiago, Chile",
                  href: null,
                },
              ].map((c, i) => (
                <Box key={i} sx={{ display: "flex", alignItems: "flex-start", gap: 1.2 }}>
                  <Box sx={{ width: 32, height: 32, borderRadius: "8px", bgcolor: "rgba(0,0,0,0.05)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {c.icon}
                  </Box>
                  <Box>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "0.62rem", letterSpacing: "0.12em", color: "#8aaa9a", textTransform: "uppercase" }}>
                      {c.label}
                    </Typography>
                    {c.href ? (
                      <Link href={c.href} target="_blank" rel="noopener" underline="hover" sx={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.8rem", color: "#0c2a20", fontWeight: 600 }}>
                        {c.value}
                      </Link>
                    ) : (
                      <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.8rem", color: "#0c2a20", fontWeight: 600 }}>
                        {c.value}
                      </Typography>
                    )}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Columna 3: Quick links */}
          <Box
            sx={{
              border: "1px solid rgba(0,0,0,0.08)",
              borderRadius: 3,
              p: 2.5,
              background: "#fff",
            }}
          >
            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: "0.82rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#0c2a20", mb: 2 }}>
              Enlaces rápidos
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
              {quickLinks.map((l) => (
                <Box
                  key={l.label}
                  onClick={() => navigate(l.path)}
                  sx={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    px: 1.5, py: 1, borderRadius: 2,
                    cursor: "pointer",
                    transition: "background 0.15s ease",
                    "&:hover": { background: "rgba(1,116,88,0.07)" },
                  }}
                >
                  <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.85rem", fontWeight: 600, color: "#0c2a20" }}>
                    {l.label}
                  </Typography>
                  <ArrowForwardIosRoundedIcon sx={{ fontSize: 11, color: "#8aaa9a" }} />
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        <Divider sx={{ mt: { xs: 4, sm: 5 }, mb: 2, borderColor: "rgba(0,0,0,0.07)" }} />

        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: "center", justifyContent: "space-between", gap: 0.5 }}>
          <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "#0c2a20" }}>
            @happyhomeandgoods 2026
          </Typography>
          <Typography
            onClick={() => window.open("http://plataformas-web.cl", "_blank")}
            sx={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.75rem", color: "#8aaa9a", cursor: "pointer", textDecoration: "underline" }}
          >
            Diseñado por www.plataformas-web.cl
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
