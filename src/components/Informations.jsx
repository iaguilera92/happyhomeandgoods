import React, { useState } from "react";
import { Box, Typography, Container, Grid, ListItem, ListItemIcon, ListItemText, useMediaQuery, useTheme, Snackbar, Alert } from "@mui/material";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { EmojiEvents } from "@mui/icons-material";
import "./css/Informations.css";
import ContactoForm from "./ContactoForm";

const journeySteps = [
  {
    text: "Discover the Game",
    desc: "Children are introduced to the basic elements of golf in a playful, approachable way.",
    hideLine: false,
    tone: "#1B83CC",
  },
  {
    text: "Build The Foundations",
    desc: "Through guided activities and early skill development.",
    hideLine: false,
    tone: "#FDBB2F",
  },
  {
    text: "Experience the Game of Golf",
    desc: "Children explore the environment of golf.",
    hideLine: false,
    tone: "#FF471F",
  },
  {
    text: "Understand How to Play",
    desc: "They are introduced to simple rules and etiquette.",
    hideLine: false,
    tone: "#FF6A00",
  },
  {
    text: "Step into Structured Training",
    desc: "They transition into academy-style learning.",
    hideLine: true,
    tone: "#017458",
  },
];

// Our Impact section hidden for now.

function Informations() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: false });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });

  return (
    <Box
      className="informations-section"
      sx={{
        position: "relative",
        zIndex: 10,
        backgroundImage: "url(fondo-3.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        py: isMobile ? 8 : 3,
        pt: { xs: 1.5, md: 1 },
        marginTop: "0",
        marginBottom: "-20px",
        color: "white",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          bgcolor: "rgba(0,0,0,0.5)",
          zIndex: 1,
        },
      }}
    >
      <Container
        sx={{
          textAlign: "center",
          color: "white",
          maxWidth: "1400px !important",
          paddingLeft: isMobile ? "0" : "24px",
          paddingRight: isMobile ? "0" : "24px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <Box sx={{ position: "relative", textAlign: "center", mb: 2 }} ref={ref}>
          <Box
            sx={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #1B83CC, #017458)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1.5px solid rgba(255,255,255,0.9)",
              mx: "auto",
              mb: 0.5,
              boxShadow: "0 4px 12px rgba(0,0,0,0.35)",
              position: "relative",
              zIndex: 2,
            }}
          >
              <motion.div
              initial={{ rotate: 0, scale: 0.85 }}
              animate={inView ? { rotate: 1080, scale: 1 } : { rotate: 0, scale: 0.85 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}
            >
              <EmojiEvents sx={{ fontSize: 18, color: "white" }} />
            </motion.div>
          </Box>

          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <Typography
              variant="h3"
              gutterBottom
              sx={{
                fontFamily: "'Montserrat', Helvetica, Arial, sans-serif !important",
                fontSize: { xs: "1.5rem", md: "2rem" },
                paddingLeft: { xs: "40px", md: "30px" },
                paddingRight: { xs: "40px", md: "30px" },
                letterSpacing: "3px",
                my: 0,
                display: "inline-block",
                position: "relative",
                zIndex: 1,
                color: "white",
              }}
            >
              How the Journey Works
            </Typography>
          </motion.div>

          <motion.hr
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
            style={{
              position: "absolute",
              top: isMobile ? "calc(80% - 30px)" : "calc(100% - 30px)",
              left: "5%",
              width: "90%",
              border: "1px solid white",
              zIndex: 0,
              background: "white",
              clipPath: "polygon(0% 0%, 0% 0%, 15% 100%, 0% 100%, 0% 0%, 100% 0%, 85% 100%, 100% 100%, 100% 0%)",
            }}
          />
        </Box>

        <Grid container spacing={3} sx={{ mt: 2 }} alignItems={isDesktop ? "stretch" : "flex-start"}>
          <Grid item xs={12} md={7}>
            {journeySteps.map((item, index) => {
              const { ref: itemRef, inView: itemInView } = useInView({ threshold: 0.43, triggerOnce: true });

              return (
                <motion.div
                  key={`animated-${index}`}
                  ref={itemRef}
                  initial={{ opacity: 0, y: 20 }}
                  animate={itemInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 * index, duration: 0.5 }}
                >
                  <ListItem
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      zIndex: 2,
                      py: 0.2,
                      mb: item.hideLine ? 0 : 0.2,
                      paddingLeft: isMobile ? "0" : "16px",
                      paddingRight: isMobile ? "0" : "16px",
                    }}
                  >
                    <ListItemIcon sx={{ zIndex: 2, minWidth: { xs: 78, md: 90 } }}>
                      <Box sx={{ position: "relative", width: 70, height: 92, display: "flex", justifyContent: "center" }}>
                        {!item.hideLine && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={itemInView ? { height: 52 } : { height: 0 }}
                            transition={{ delay: 0.2 * index, duration: 1, ease: "easeInOut" }}
                            style={{
                              position: "absolute",
                              top: "58px",
                              left: "50%",
                              transform: "translateX(-50%)",
                              width: "2px",
                              backgroundImage: "linear-gradient(white 40%, rgba(255,255,255,0) 0%)",
                              backgroundPosition: "left",
                              backgroundSize: "2px 6px",
                              backgroundRepeat: "repeat-y",
                              zIndex: 1,
                              opacity: 0.5,
                            }}
                          />
                        )}

                        <Box
                          sx={{
                            width: 60,
                            height: 60,
                            borderRadius: "50%",
                            border: "2px solid white",
                            display: "grid",
                            placeItems: "center",
                            background: item.tone,
                            boxShadow: "0 6px 14px rgba(0,0,0,0.25)",
                            position: "relative",
                            zIndex: 2,
                          }}
                        >
                          <motion.div
                            animate={{ scale: [1, 1.34], opacity: [0.62, 0] }}
                            transition={{ duration: 1.15, repeat: Infinity, ease: "easeOut", delay: index * 0.14, repeatDelay: 0.05 }}
                            style={{
                              position: "absolute",
                              inset: -4,
                              borderRadius: "50%",
                              border: "2.2px solid rgba(255,255,255,0.95)",
                              pointerEvents: "none",
                            }}
                          />
                          <Typography
                            sx={{
                              color: "white",
                              fontWeight: 900,
                              fontSize: isMobile ? "1.35rem" : "1.5rem",
                              lineHeight: 1,
                              textShadow: "0 2px 6px rgba(0,0,0,0.35)",
                            }}
                          >
                            {index + 1}
                          </Typography>
                        </Box>
                      </Box>
                    </ListItemIcon>

                    <ListItemText
                      sx={{
                        fontFamily: "'Montserrat', Helvetica, Arial, sans-serif !important",
                        "& .MuiListItemText-primary": {
                          fontSize: isMobile ? "0.99rem" : "1.2rem",
                          color: "white",
                          fontWeight: 700,
                        },
                        "& .MuiListItemText-secondary": {
                          color: "rgba(255,255,255,0.8)",
                        },
                      }}
                      primary={item.text}
                      secondary={item.desc}
                    />
                  </ListItem>
                </motion.div>
              );
            })}
          </Grid>

          {/* Desktop-only: Contact form lives here */}
          {isDesktop && (
            <Grid item xs={12} md={5} sx={{ display: "flex", justifyContent: "center", alignItems: "stretch" }}>
              <Box sx={{ width: "100%", maxWidth: 520, mx: "auto", height: "100%", display: "flex", flexDirection: "column" }}>
                <Box sx={{ flex: 1, display: "flex" }}>
                  <ContactoForm setSnackbar={setSnackbar} fullHeight={true} variant="nav" title="Contact Us" messageRows={5} />
                </Box>
              </Box>
            </Grid>
          )}

          {/* Our Impact section hidden for now */}
        </Grid>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          sx={{ zIndex: 1400 }}
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
    </Box>
  );
}

export default Informations;
