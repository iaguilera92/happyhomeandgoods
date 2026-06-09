import { Box, Typography, Grid, Container, useTheme, useMediaQuery, Card, CardContent, Collapse, Dialog, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Nosotros = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [scrollY, setScrollY] = useState(0);
  const [activeFounder, setActiveFounder] = useState(null);
  const [dialogFounder, setDialogFounder] = useState(null);

  const letterVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.4 + i * 0.1 },
    }),
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    if (isMobile) {
      const handleScroll = () => setScrollY(window.scrollY);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isMobile]);


  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        minHeight: '100vh',
        width: '100%',
        pt: 0,
        px: 0,
        pb: 3.5,
        position: 'relative',
        overflow: 'hidden',
        // ?? Fondo pasto golf
        backgroundColor: "#f8f6f1",
        backgroundSize: "420px 420px",
        backgroundRepeat: "repeat",
        backgroundAttachment: "scroll",
        backgroundPosition: "top left",
      }}
    >
      {/* ── Banner ── */}
      <Box
        sx={{
          position: "relative",
          minHeight: { xs: 220, sm: 260, md: 300 },
          backgroundImage: "url(/fondo-about-us.avif)",
          backgroundSize: "cover",
          backgroundPosition: { xs: "center 85%", md: "center 85%" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, rgba(1,80,60,0.78) 0%, rgba(0,25,15,0.58) 100%)",
            zIndex: 1,
          },
        }}
      >
        <Container
          sx={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            pt: { xs: 11, sm: 10, md: 12 },
            pb: { xs: 4, sm: 4.5 },
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            <Typography
              sx={{
                fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.6rem" },
                fontWeight: 900,
                fontFamily: "'Poppins', sans-serif",
                color: "#ffffff",
                letterSpacing: "0.06em",
                textShadow: "0 3px 18px rgba(0,0,0,0.5)",
                lineHeight: 1.1,
                textTransform: "uppercase",
                mb: { xs: 1, sm: 1.4 },
              }}
            >
              About Us
            </Typography>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.38 }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1.5,
                mx: "auto",
              }}
            >
              <Box sx={{ width: { xs: 28, sm: 42 }, height: 1.5, borderRadius: 99, background: "rgba(255,255,255,0.55)" }} />
              <Typography
                sx={{
                  fontSize: { xs: "0.78rem", sm: "1rem" },
                  color: "rgba(255,255,255,0.85)",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 400,
                  textShadow: "0 2px 8px rgba(0,0,0,0.4)",
                  letterSpacing: "0.04em",
                  whiteSpace: { xs: "nowrap", sm: "normal" },
                }}
              >
                Meet the team behind Golf in Colors
              </Typography>
              <Box sx={{ width: { xs: 28, sm: 42 }, height: 1.5, borderRadius: 99, background: "rgba(255,255,255,0.55)" }} />
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Primera fila — Our Story */}
      <Box
        sx={{
          maxWidth: "1100px",
          mx: "auto",
          mt: { xs: 5, sm: 6 },
          px: { xs: 2.5, sm: 4, md: 6 },
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: { xs: 4, md: 7 },
            alignItems: "center",
          }}
        >
          {/* Columna izquierda: texto */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Box>
              {/* Heading */}
              <Typography
                sx={{
                  fontSize: { xs: "1.6rem", sm: "1.9rem", md: "2.2rem" },
                  fontWeight: 900,
                  fontFamily: "'Poppins', sans-serif",
                  color: "#0c2a1e",
                  lineHeight: 1.15,
                  mb: 2.5,
                  display: "inline-block",
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: -8,
                    left: 0,
                    width: "100%",
                    height: 3,
                    borderRadius: 99,
                    background: "linear-gradient(90deg, #017458 0%, rgba(1,116,88,0.2) 100%)",
                  },
                }}
              >
                Where It All Began
              </Typography>

              {/* Paragraphs */}
              {[
                "Golf in Colors was founded by two partners who have experienced every stage of the game, from youth golf to high-level competition. Along the way, they noticed a challenging reality: many children are introduced to golf, but only a few continue, compete, or make it a lasting part of their lives.",
                "Golf in Colors aims to make those early experiences more engaging, positive, and meaningful by combining creativity, storytelling, and simple skill development — connecting what children learn on the course with meaningful moments at home.",
                "By linking learning on and off the course, Golf in Colors helps children build confidence, develop essential life skills, and create a genuine and lasting connection with the game.",
              ].map((text, i) => (
                <Typography
                  key={i}
                  sx={{
                    fontSize: { xs: "0.88rem", sm: "0.95rem" },
                    color: "#3d5a4f",
                    lineHeight: 1.8,
                    mb: i < 2 ? 1.6 : 0,
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  {text}
                </Typography>
              ))}
            </Box>
          </motion.div>

          {/* Columna derecha: logo en círculo */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          >
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Box
                sx={{
                  width: { xs: 220, sm: 280, md: 340 },
                  height: { xs: 220, sm: 280, md: 340 },
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, rgba(1,116,88,0.07) 0%, rgba(1,116,88,0.16) 100%)",
                  border: "2px solid rgba(1,116,88,0.14)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 24px 60px rgba(1,116,88,0.13)",
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    inset: -10,
                    borderRadius: "50%",
                    border: "1px dashed rgba(1,116,88,0.18)",
                  },
                }}
              >
                <Box
                  component="img"
                  src="/logo.png"
                  alt="Happy Home & Goods"
                  sx={{ width: "82%", height: "auto" }}
                />
              </Box>
            </Box>
          </motion.div>
        </Box>
      </Box>

      <Box
        sx={{
          width: '100vw',
          position: 'relative',
          mt: 4,
          mb: 4,
          py: { xs: 2.6, md: 3.2 },
          backgroundImage: 'url(/fondo-5.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: isMobile ? `center ${scrollY * 0.3}px` : 'center',
          backgroundAttachment: isMobile ? 'scroll' : 'fixed',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(120deg, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.28) 100%)',
            zIndex: 1,
          },
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            width: '100%',
            px: 2,
            position: 'relative',
            zIndex: 2,
          }}
        >
          <Typography
            variant={isMobile ? "h6" : "h4"}
            fontWeight={600}
            sx={{
              color: '#ffffff',
              textShadow: '2px 2px 8px rgba(0,0,0,0.8)',
              textAlign: 'center',
              letterSpacing: '0.02em',
            }}
          >
            We inspire and teach <span style={{ color: '#FDBB2F' }}>Golf</span>
          </Typography>
        </Container>
      </Box>

      {/* ── Purpose / Mission / Vision ── */}
      <Box sx={{ maxWidth: "1100px", mx: "auto", mt: { xs: 5, sm: 6 }, px: { xs: 2.5, sm: 4, md: 6 } }}>

        {/* Purpose — full width dark */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <Box
            sx={{
              borderRadius: 3,
              background: "linear-gradient(135deg, #0c2a1e 0%, #017458 100%)",
              px: { xs: 3, sm: 5 },
              py: { xs: 3.5, sm: 4.5 },
              mb: { xs: 2.5, sm: 3 },
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
              <Box sx={{ width: 28, height: 3, borderRadius: 99, background: "#FDBB2F" }} />
              <Typography sx={{ fontSize: "0.9rem", fontWeight: 700, color: "#FDBB2F", letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "'Poppins', sans-serif" }}>
                Purpose
              </Typography>
            </Box>

            <Typography
              sx={{
                fontSize: { xs: "1.05rem", sm: "1.3rem" },
                fontWeight: 700,
                color: "#ffffff",
                fontFamily: "'Poppins', sans-serif",
                lineHeight: 1.55,
                mb: 2,
              }}
            >
              Helping children fall in love with golf from an early age — in a way that feels fun, natural, and meaningful.
            </Typography>

            {[
              "We believe that a passion for golf is not built only on the driving range or the putting green. It grows through experiences, shared moments, and emotional connections — both on the course and beyond it.",
              "These shared experiences extend what children learn in lessons, and turn every step of the journey into an opportunity to connect and enjoy the game together.",
            ].map((t, i) => (
              <Typography key={i} sx={{ fontSize: { xs: "0.85rem", sm: "0.92rem" }, color: "rgba(255,255,255,0.76)", lineHeight: 1.8, mb: i === 0 ? 1.4 : 0, fontFamily: "'Poppins', sans-serif" }}>
                {t}
              </Typography>
            ))}
          </Box>
        </motion.div>

        {/* Mission + Vision — 2 columnas */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: { xs: 2, sm: 2.5 },
          }}
        >
          {[
            {
              label: "Mission",
              accent: "#1B83CC",
              letter: "M",
              text: "At Golf in Colors, our mission is to inspire children to discover golf in a fun, creative, and meaningful way. We support parents and coaches with tools, learning materials, and experiences designed to make the game engaging, natural, and emotionally positive for young players. Through this approach, we aim to create environments where curiosity, joy, and motivation encourage children to continue exploring and enjoying the game.",
            },
            {
              label: "Vision",
              accent: "#FF6A00",
              letter: "V",
              text: "Our vision is to help shape a new generation of golfers who grow up seeing the game as more than a sport — an experience that sparks imagination, builds confidence, and strengthens family bonds. We aspire to become a global reference in children's golf by creating a community where learning the game extends beyond the course, turning golf into a joyful journey that children and families can share for a lifetime.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.12 }}
              style={{ height: "100%" }}
            >
              <Box
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  background: "#ffffff",
                  border: "1px solid rgba(10,38,30,0.07)",
                  borderTop: `4px solid ${item.accent}`,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.07)",
                  px: { xs: 2.5, sm: 3 },
                  py: { xs: 2.5, sm: 3 },
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Typography
                  sx={{
                    position: "absolute",
                    bottom: -20,
                    right: 10,
                    fontSize: "7rem",
                    fontWeight: 900,
                    color: `${item.accent}08`,
                    lineHeight: 1,
                    fontFamily: "'Poppins', sans-serif",
                    userSelect: "none",
                    pointerEvents: "none",
                  }}
                >{item.letter}</Typography>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.8 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: "50%", background: item.accent, flexShrink: 0 }} />
                  <Typography sx={{ fontSize: "0.9rem", fontWeight: 700, color: item.accent, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "'Poppins', sans-serif" }}>
                    {item.label}
                  </Typography>
                </Box>

                <Typography
                  sx={{
                    fontSize: { xs: "0.87rem", sm: "0.93rem" },
                    color: "#3d5a4f",
                    lineHeight: 1.82,
                    fontFamily: "'Poppins', sans-serif",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {item.text}
                </Typography>
              </Box>
            </motion.div>
          ))}
        </Box>
      </Box>
      {/* Seccion Founders */}
      <Box maxWidth="1200px" mx="auto" mt={6} mb={3} textAlign="center" px={{ xs: 2.5, sm: 0 }}>
        <Typography
          sx={{
            fontSize: { xs: "1.6rem", sm: "1.9rem", md: "2.2rem" },
            fontWeight: 900,
            fontFamily: "'Poppins', sans-serif",
            color: "#0c2a1e",
            lineHeight: 1.15,
            mb: 3,
            display: "inline-block",
            position: "relative",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: -8,
              left: 0,
              width: "100%",
              height: 3,
              borderRadius: 99,
              background: "linear-gradient(90deg, #017458 0%, rgba(1,116,88,0.2) 100%)",
            },
          }}
        >
          Co-Founders
        </Typography>
        {/* Cards */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: { xs: 2.5, sm: 4 },
            maxWidth: 720,
            mx: "auto",
            mt: 1.5,
          }}
        >
          {[
            { key: "anika", img: "anika.jpeg", name: "Anika Veintemilla", role: "Co-Founder & CEO", objPos: "center bottom" },
            { key: "sergio", img: "sergio.jpeg", name: "Sergio Murtinho", role: "Co-Founder", objPos: "center 30%" },
          ].map((coach, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.14 }}
            >
              <Box
                onClick={() => isMobile ? setDialogFounder(coach.key) : setActiveFounder((prev) => (prev === coach.key ? null : coach.key))}
                sx={{
                  cursor: "pointer",
                  borderRadius: 3,
                  overflow: "hidden",
                  border: activeFounder === coach.key
                    ? "2px solid #FDBB2F"
                    : "2px solid transparent",
                  boxShadow: activeFounder === coach.key
                    ? "0 0 0 3px rgba(253,187,47,0.22), 0 16px 36px rgba(0,0,0,0.14)"
                    : "0 8px 28px rgba(0,0,0,0.1)",
                  transition: "all 0.3s ease",
                  background: "#ffffff",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 18px 40px rgba(0,0,0,0.14)",
                  },
                }}
              >
                {/* Card = imagen completa con overlay abajo */}
                <Box sx={{ position: "relative", width: "100%", aspectRatio: { xs: "1/1", sm: "3/4" }, overflow: "hidden" }}>
                  <Box
                    component="img"
                    src={`/${coach.img}`}
                    alt={coach.name}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: coach.objPos,
                      transition: "transform 0.4s ease",
                      "&:hover": { transform: "scale(1.04)" },
                    }}
                  />

                  {/* Gradient overlay */}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "55%",
                      background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.1) 70%, transparent 100%)",
                    }}
                  />

                  {/* Info superpuesta */}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      px: { xs: 2, sm: 2.2 },
                      py: { xs: 1.8, sm: 2 },
                      textAlign: "left",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 800,
                        fontSize: { xs: "1rem", sm: "1.06rem" },
                        color: "#ffffff",
                        fontFamily: "'Poppins', sans-serif",
                        textShadow: "0 1px 6px rgba(0,0,0,0.5)",
                        mb: 0.2,
                      }}
                    >
                      {coach.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.73rem",
                        color: "rgba(255,255,255,0.8)",
                        fontWeight: 500,
                        letterSpacing: "0.03em",
                        fontFamily: "'Poppins', sans-serif",
                        mb: 1.2,
                      }}
                    >
                      {coach.role} · Golf in Colors
                    </Typography>

                    <Box
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 0.5,
                        px: 1.2,
                        py: 0.38,
                        borderRadius: 99,
                        border: "1px solid rgba(255,255,255,0.5)",
                        background: activeFounder === coach.key ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.1)",
                        backdropFilter: "blur(4px)",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <Typography sx={{ fontSize: "0.73rem", fontWeight: 700, color: "#ffffff", fontFamily: "'Poppins', sans-serif" }}>
                        {activeFounder === coach.key ? "Close" : "Read more"}
                      </Typography>
                      <KeyboardArrowDownIcon
                        sx={{
                          fontSize: 15,
                          color: "#ffffff",
                          transform: activeFounder === coach.key ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform 0.22s ease",
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </motion.div>
          ))}
        </Box>

        {/* Bio expandida */}
        <Collapse in={Boolean(activeFounder)} timeout={350} unmountOnExit>
          <Box
            sx={{
              maxWidth: 720,
              mx: "auto",
              mt: 2,
              borderRadius: 3,
              background: "#ffffff",
              border: "1px solid rgba(1,116,88,0.12)",
              borderLeft: "4px solid #017458",
              px: { xs: 2.5, sm: 3.5 },
              py: { xs: 2, sm: 2.5 },
              textAlign: "left",
              boxShadow: "0 8px 24px rgba(0,0,0,0.07)",
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "1rem", sm: "1.1rem" },
                fontWeight: 800,
                color: "#017458",
                fontFamily: "'Poppins', sans-serif",
                mb: 0.3,
              }}
            >
              {activeFounder === "anika" ? "Anika Veintemilla" : "Sergio Murtinho"}
            </Typography>
            <Typography
              sx={{
                fontSize: "0.75rem",
                color: "#5a8a7a",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                fontFamily: "'Poppins', sans-serif",
                mb: 2,
              }}
            >
              {activeFounder === "anika" ? "Co-Founder & CEO" : "Co-Founder"}
            </Typography>

            {activeFounder === "anika" ? (
              <>
                {[
                  "Anika Veintemilla has a lifelong connection to the game of golf, built through years of competitive play and international representation. A former collegiate golfer, she competed for four years at Baylor University and one year at Florida International University (FIU) and represented the Ecuadorian Golf Federation in numerous international competitions, including South American Championships, The British Amateur, and the U.S. Mid-Amateur Championship. She also represented Ecuador at the Pan American Games (2023) and the World Amateur Team Championship (2016).",
                  "During her junior career, Anika became the first and only Ecuadorian to qualify for the U.S. Girls' Junior Championship, and later the only Ecuadorian to receive an exemption into the U.S. Mid-Amateur Championship, both prestigious amateur events.",
                  "She is currently Ecuador's top-ranked women's amateur golfer and reached a career-high world ranking of 430 in the World Amateur Golf Ranking (WAGR).",
                  "In 2024, she began volunteering at a golf academy, where she discovered her passion for inspiring the next generation to develop a love for the game. As co-founder of Golf in Colors, she is dedicated to helping children discover golf through creativity, positive learning experiences, and meaningful family moments.",
                ].map((t, i, arr) => (
                  <Typography key={i} variant="body2" sx={{ color: "#3d5a4f", lineHeight: 1.8, mb: i < arr.length - 1 ? 1.1 : 0, fontFamily: "'Poppins', sans-serif" }}>{t}</Typography>
                ))}
              </>
            ) : (
              <>
                {[
                  "Sergio Murtinho has dedicated much of his life to the game of golf as a player, coach, and manager. Through years of competitive play and coaching experience, he has developed a deep understanding of the game and a passion for helping others improve while truly enjoying the sport.",
                  "Throughout his career, Sergio has worked extensively with junior golfers, focusing on creating positive and supportive learning environments where young players can build confidence, develop their skills, and enjoy the process of learning the game. His coaching style is enthusiastic, creative, and full of energy, driven by a genuine desire to contribute to the growth and development of golf worldwide.",
                  "As the father of young athletes, Sergio also understands firsthand the importance of creating meaningful sports experiences for children and families. This personal perspective has helped shape his approach to coaching and youth development.",
                  "Sergio's passion for golf also led him to develop a project in his home country of Ecuador, helping create greater public access to the game and encouraging many young players to take their first steps in golf.",
                  "As Co-Founder of Golf in Colors, Sergio is committed to helping children discover the game in a way that inspires curiosity, builds confidence, and fosters a lifelong love for golf.",
                ].map((t, i, arr) => (
                  <Typography key={i} variant="body2" sx={{ color: "#3d5a4f", lineHeight: 1.8, mb: i < arr.length - 1 ? 1.1 : 0, fontFamily: "'Poppins', sans-serif" }}>{t}</Typography>
                ))}
              </>
            )}
          </Box>
        </Collapse>
      </Box>

      {/* ── Dialog mobile ── */}
      <Dialog
        open={Boolean(dialogFounder)}
        onClose={() => setDialogFounder(null)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: 3,
            mx: 2,
            maxHeight: "85vh",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        {dialogFounder && (
          <>
            {/* Header */}
            <Box sx={{ px: 2.5, pt: 2.5, pb: 1.5, borderBottom: "1px solid rgba(1,116,88,0.12)", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
              <Box>
                <Typography sx={{ fontWeight: 800, fontSize: "1.08rem", color: "#0c2a1e", fontFamily: "'Poppins', sans-serif", mb: 0.3 }}>
                  {dialogFounder === "anika" ? "Anika Veintemilla" : "Sergio Murtinho"}
                </Typography>
                <Typography sx={{ fontSize: "0.74rem", color: "#017458", fontWeight: 600, fontFamily: "'Poppins', sans-serif" }}>
                  {dialogFounder === "anika" ? "Co-Founder & CEO" : "Co-Founder"} · Golf in Colors
                </Typography>
              </Box>
              <IconButton onClick={() => setDialogFounder(null)} sx={{ color: "#5a8a7a", p: 0.5, mt: -0.3 }}>
                <CloseIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Box>

            {/* Bio */}
            <DialogContent sx={{ px: 2.5, pt: 2, pb: 3, overflowY: "auto" }}>
              {(dialogFounder === "anika" ? [
                "Anika Veintemilla has a lifelong connection to the game of golf, built through years of competitive play and international representation. A former collegiate golfer, she competed for four years at Baylor University and one year at Florida International University (FIU) and represented the Ecuadorian Golf Federation in numerous international competitions, including South American Championships, The British Amateur, and the U.S. Mid-Amateur Championship. She also represented Ecuador at the Pan American Games (2023) and the World Amateur Team Championship (2016).",
                "During her junior career, Anika became the first and only Ecuadorian to qualify for the U.S. Girls' Junior Championship, and later the only Ecuadorian to receive an exemption into the U.S. Mid-Amateur Championship, both prestigious amateur events.",
                "She is currently Ecuador's top-ranked women's amateur golfer and reached a career-high world ranking of 430 in the World Amateur Golf Ranking (WAGR).",
                "In 2024, she began volunteering at a golf academy, where she discovered her passion for inspiring the next generation to develop a love for the game. As co-founder of Golf in Colors, she is dedicated to helping children discover golf through creativity, positive learning experiences, and meaningful family moments.",
              ] : [
                "Sergio Murtinho has dedicated much of his life to the game of golf as a player, coach, and manager. Through years of competitive play and coaching experience, he has developed a deep understanding of the game and a passion for helping others improve while truly enjoying the sport.",
                "Throughout his career, Sergio has worked extensively with junior golfers, focusing on creating positive and supportive learning environments where young players can build confidence, develop their skills, and enjoy the process of learning the game. His coaching style is enthusiastic, creative, and full of energy, driven by a genuine desire to contribute to the growth and development of golf worldwide.",
                "As the father of young athletes, Sergio also understands firsthand the importance of creating meaningful sports experiences for children and families. This personal perspective has helped shape his approach to coaching and youth development.",
                "Sergio's passion for golf also led him to develop a project in his home country of Ecuador, helping create greater public access to the game and encouraging many young players to take their first steps in golf.",
                "As Co-Founder of Golf in Colors, Sergio is committed to helping children discover the game in a way that inspires curiosity, builds confidence, and fosters a lifelong love for golf.",
              ]).map((t, i, arr) => (
                <Typography key={i} variant="body2" sx={{ color: "#3d5a4f", lineHeight: 1.8, mb: i < arr.length - 1 ? 1.2 : 0, fontFamily: "'Poppins', sans-serif", fontSize: "0.9rem" }}>{t}</Typography>
              ))}
            </DialogContent>
          </>
        )}
      </Dialog>

    </Container>
  );
};

export default Nosotros;






















































