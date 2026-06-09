import { Box, Button, Collapse, Container, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import TeamSection from "./TeamSection";
import Informations from "./Informations";

export default function Parents() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [faqOpen, setFaqOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const faqs = [
    {
      q: "What benefits does golf offer my child?",
      a: "Golf helps develop coordination, balance, and focus. It also teaches discipline, respect, and how to follow rules, while supporting cognitive growth and building confidence.",
    },
    {
      q: "What should my role be during lessons?",
      a: "Support and observe. Let the coach guide the session while you encourage your child and reinforce a positive experience.",
    },
  ];

  return (
    <>
      {/* BANNER */}
      <Box
        sx={{
          position: "relative",
          minHeight: { xs: 230, sm: 260, md: 300 },
          overflow: "hidden",
          backgroundImage: "url(/fondo-banner.avif)",
          backgroundSize: "cover",
          backgroundPosition: "center 75%",
        }}
      >
        {/* Overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, rgba(5,25,15,0.72) 0%, rgba(10,40,60,0.58) 100%)",
          }}
        />
        {/* Contenido */}
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: { xs: 0.8, sm: 1.4 },
            px: { xs: 2, sm: 3 },
            pt: { xs: 14, sm: 12, md: 15 },
            pb: { xs: 4.5, sm: 3 },
          }}
        >
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}>
            <Box
              sx={{
                px: 1.6,
                py: 0.5,
                borderRadius: 99,
                border: "1px solid rgba(255,255,255,0.35)",
                background: "rgba(255,255,255,0.12)",
                backdropFilter: "blur(6px)",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  fontSize: { xs: "0.72rem", sm: "0.8rem" },
                  color: "#ffffff",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                For Parents
              </Typography>
            </Box>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: "easeOut", delay: 0.28 }} style={{ marginTop: "14px" }}>
            <Typography
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 900,
                fontSize: { xs: "1.05rem", sm: "1.6rem", md: "2rem" },
                color: "#ffffff",
                textAlign: "center",
                lineHeight: 1.15,
                textShadow: "0 3px 16px rgba(0,0,0,0.45)",
                letterSpacing: "0.02em",
                whiteSpace: { xs: "normal", sm: "nowrap" },
              }}
            >
              YOUR CHILD&apos;S GOLF JOURNEY<Box component="span" sx={{ display: { xs: "block", sm: "inline" } }}> STARTS WITH YOU</Box>
            </Typography>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut", delay: 0.48 }}>
            <Typography
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 400,
                fontSize: { xs: "0.88rem", sm: "1.05rem" },
                color: "rgba(255,255,255,0.82)",
                textAlign: "center",
                maxWidth: 520,
                whiteSpace: { xs: "nowrap", sm: "normal" },
                fontSize: { xs: "0.7rem", sm: "1.05rem" },
                textShadow: "0 2px 8px rgba(0,0,0,0.35)",
              }}
            >
              Be part of your child&apos;s golf journey — every step of the way
            </Typography>
          </motion.div>
        </Box>
      </Box>

      {/* 1. YOUR CHILD'S GOLF JOURNEY STARTS WITH YOU + FIRST AT HOME  |  2. A WINNING TEAM */}
      <Box
        sx={{
          pt: { xs: 2, sm: 2.5 },
          pb: 0,
          backgroundColor: "rgb(248 246 241)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: { xs: "scroll", md: "fixed" },
        }}
      >
        <Container maxWidth="lg">

          {/* FIRST AT HOME — 3 columns */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.12 }}
          >
            <Box
              sx={{
                mt: { xs: 2, sm: 2.8 },
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
                gap: { xs: 2, sm: 2.5 },
                alignItems: "stretch",
              }}
            >
              {/* Col 1 — texto */}
              <Box
                sx={{
                  p: { xs: 2.2, sm: 2.8 },
                  borderRadius: 3,
                  border: "1px solid rgba(13,43,69,0.10)",
                  background: "#ffffff",
                  boxShadow: "0 8px 24px rgba(13,43,69,0.07)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.4,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 900,
                    fontSize: { xs: "1.1rem", sm: "1.18rem" },
                    color: "#1B83CC",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    borderBottom: "2px solid #1B83CC",
                    pb: 0.8,
                  }}
                >
                  First At Home
                </Typography>
                {[
                  "As a parent, you play one of the most important roles in your child's journey. Your support, encouragement, and presence help create a positive environment where they can grow, explore, and truly enjoy the game. Being there for them, celebrating their progress and guiding them toward the right opportunities, makes all the difference.",
                  "Choosing the right coach is a key part of this experience. A great coach helps create connection, confidence, and excitement for learning, allowing your child to feel motivated and engaged.",
                  "When there is open communication between you, your child, and the coach, the experience becomes even more meaningful, creating a strong foundation for growth, enjoyment, and long-term development in the game.",
                ].map((txt, i) => (
                  <Typography key={i} sx={{ color: "#27475f", fontSize: { xs: "0.92rem", sm: "0.97rem" }, lineHeight: 1.75 }}>
                    {txt}
                  </Typography>
                ))}
              </Box>

              {/* Col 2 — imagen */}
              <Box
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                  minHeight: { xs: 220, sm: 280, md: "100%" },
                  backgroundImage: "url(/nino-parents.avif)",
                  backgroundSize: "cover",
                  backgroundPosition: { xs: "center 30%", md: "center" },
                  boxShadow: "0 8px 24px rgba(13,43,69,0.12)",
                }}
              />

              {/* Col 3 — Let Us Show You the Way */}
              <Box
                sx={{
                  p: { xs: 2.2, sm: 2.8 },
                  borderRadius: 3,
                  border: "1px solid rgba(13,43,69,0.10)",
                  background: "#ffffff",
                  boxShadow: "0 8px 24px rgba(13,43,69,0.07)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.4,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 900,
                    fontSize: { xs: "1.1rem", sm: "1.18rem" },
                    color: "#1B83CC",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    borderBottom: "2px solid #1B83CC",
                    pb: 0.8,
                  }}
                >
                  Let Us Show You the Way
                </Typography>
                {[
                  "Golf in Colors provides parents with a clear framework to understand their role in their child's development, allowing them to support without creating pressure or confusion. It offers a structured environment where progress is visible and consistent, giving parents confidence in the process and in the decisions they are making.",
                  "By connecting what happens at the academy with experiences at home, it turns golf into a shared activity, creating meaningful moments between children and their families. This approach brings clarity, trust, and involvement to each stage of the journey, while allowing parents to feel part of a positive and guided experience.",
                ].map((txt, i) => (
                  <Typography key={i} sx={{ color: "#27475f", fontSize: { xs: "0.92rem", sm: "0.97rem" }, lineHeight: 1.75 }}>
                    {txt}
                  </Typography>
                ))}
              </Box>
            </Box>
          </motion.div>

          {/* Understanding the Roles — full width */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.12 }}
          >
            <Box
              sx={{
                mt: { xs: 2.2, sm: 3 },
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: "0 14px 34px rgba(0,0,0,0.14)",
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1.6fr" },
              }}
            >
              {/* Imagen fondo */}
              <Box
                sx={{
                  position: "relative",
                  minHeight: { xs: 180, sm: 220, md: "100%" },
                  backgroundImage: "url(/PATTERN.avif)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <Box sx={{ position: "absolute", inset: 0, background: "rgba(5,30,20,0.65)" }} />
                <Box
                  sx={{
                    position: "relative",
                    zIndex: 1,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: { xs: "center", md: "flex-start" },
                    px: { xs: 3, sm: 4 },
                    py: { xs: 3.5, sm: 4 },
                    gap: 1.2,
                  }}
                >
                  <Box
                    sx={{
                      px: 1.4,
                      py: 0.5,
                      borderRadius: 99,
                      background: "rgba(255,255,255,0.18)",
                      border: "1px solid rgba(255,255,255,0.32)",
                      color: "#ffffff",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      fontSize: "0.72rem",
                      width: "fit-content",
                    }}
                  >
                    Roles in sync
                  </Box>
                  <Typography
                    sx={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 900,
                      color: "#ffffff",
                      fontSize: { xs: "1.5rem", sm: "1.85rem" },
                      lineHeight: 1.1,
                      textShadow: "0 3px 14px rgba(0,0,0,0.5)",
                    }}
                  >
                    Understanding<br />the Roles
                  </Typography>
                </Box>
              </Box>

              {/* Texto */}
              <Box
                sx={{
                  background: "#0d2e1e",
                  px: { xs: 2.8, sm: 4.2 },
                  py: { xs: 3, sm: 4.5 },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: 2.2,
                }}
              >
                <Typography sx={{ color: "rgba(255,255,255,0.90)", fontSize: { xs: "0.92rem", sm: "0.98rem" }, lineHeight: 1.82 }}>
                  Clear roles are essential because they create structure, consistency, and trust throughout a child&apos;s learning experience. When each person understands their responsibility — the parent providing emotional support, the coach guiding the learning process, and the child exploring and growing — everything becomes more aligned and effective. This clarity eliminates confusion, reduces unnecessary pressure, and creates a positive environment where the child feels safe, motivated, and confident. With everyone working in the same direction, the learning process becomes more natural, progress becomes consistent, and the overall experience becomes something both the child and the family can truly enjoy.
                </Typography>
              </Box>
            </Box>
          </motion.div>

          {/* Flechas conector */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: { xs: "8%", sm: "14%" }, pt: { xs: 4, sm: 5 }, pb: 0 }}>
            <Box component="img" src="/flecha.png" alt="" sx={{ width: { xs: 45, sm: 100 }, opacity: 0.85, transform: "scaleY(-1) rotate(-50deg)" }} />
            <Box component="img" src="/flecha.png" alt="" sx={{ width: { xs: 45, sm: 100 }, opacity: 0.85, transform: "scaleX(-1) rotate(-50deg)" }} />
          </Box>

          {/* 2. A WINNING TEAM */}
          <Box sx={{ mt: { xs: -4, sm: -9 }, mb: 0 }}>
            <TeamSection />
          </Box>
        </Container>
      </Box>

      {/* 3. How the Journey Works (Informations) */}
      <Informations />

      {/* 4. ROLES  |  5. FAQ's */}
      <Box
        sx={{
          pt: { xs: 7, sm: 7 },
          pb: { xs: 3, sm: 3.5 },
          backgroundColor: "rgb(248 246 241)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: { xs: "scroll", md: "fixed" },
        }}
      >
        <Container maxWidth="lg">
          {/* FAQ's */}
          <motion.div
            initial={{ opacity: 0, x: 90 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <Box>
              <Box
                role="button"
                tabIndex={0}
                onClick={() => setFaqOpen((prev) => !prev)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setFaqOpen((prev) => !prev);
                  }
                }}
                sx={{
                  p: { xs: 2, sm: 2.3 },
                  borderRadius: 3,
                  border: faqOpen ? "1.8px solid rgba(11,143,99,0.28)" : "1px solid rgba(13,43,69,0.12)",
                  background: faqOpen
                    ? "linear-gradient(165deg, #ffffff 0%, #f3fff9 100%)"
                    : "linear-gradient(165deg, #ffffff 0%, #f7fff9 100%)",
                  boxShadow: faqOpen
                    ? "0 16px 30px rgba(11,143,99,0.14)"
                    : "0 12px 24px rgba(13,43,69,0.12)",
                  color: "#0d2b45",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: -34,
                    right: -34,
                    width: 110,
                    height: 110,
                    borderRadius: "50%",
                    background: faqOpen ? "rgba(11,143,99,0.14)" : "rgba(27,131,204,0.08)",
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, position: "relative", zIndex: 1 }}>
                  <Box
                    sx={{
                      width: 34,
                      height: 34,
                      borderRadius: "50%",
                      display: "grid",
                      placeItems: "center",
                      background: "#1B83CC",
                      color: "#fff",
                      boxShadow: "0 8px 16px rgba(27,131,204,0.25)",
                    }}
                  >
                    <HelpOutlineRoundedIcon sx={{ fontSize: 20 }} />
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 900,
                        fontSize: { xs: "1.15rem", sm: "1.35rem" },
                        lineHeight: 1.05,
                        color: "#0c2a44",
                      }}
                    >
                      FAQ&apos;s
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: { xs: "0.82rem", sm: "0.9rem" },
                        color: "#4a6478",
                        mt: 0.25,
                      }}
                    >
                      Common questions from parents
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", color: "#2b3a45", position: "relative", zIndex: 1 }}>
                  {faqOpen ? <CloseIcon sx={{ fontSize: 20 }} /> : <KeyboardArrowDownIcon sx={{ fontSize: 24 }} />}
                </Box>
              </Box>

              <Collapse in={faqOpen} timeout={700}>
                <Grid container spacing={isMobile ? 1.6 : 2.2} sx={{ mt: 0.1 }}>
                  {faqs.map((item) => (
                    <Grid item xs={12} md={6} key={item.q}>
                      <Box
                        sx={{
                          p: { xs: 2, sm: 2.3 },
                          borderRadius: 2.8,
                          border: "1px solid rgba(13,43,69,0.12)",
                          background: "linear-gradient(165deg, #ffffff 0%, #f8fffb 100%)",
                          boxShadow: "0 12px 24px rgba(13,43,69,0.1)",
                          height: "100%",
                          position: "relative",
                          overflow: "hidden",
                          "&::before": {
                            content: '""',
                            position: "absolute",
                            inset: 0,
                            pointerEvents: "none",
                            background: "linear-gradient(180deg, rgba(11,143,99,0.04) 0%, rgba(255,255,255,0) 46%)",
                          },
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 900,
                            color: "#0c2a44",
                            fontSize: { xs: "1.02rem", sm: "1.12rem" },
                            lineHeight: 1.2,
                            mb: 0.8,
                            position: "relative",
                            zIndex: 1,
                          }}
                        >
                          {item.q}
                        </Typography>
                        <Typography
                          sx={{
                            color: "#4a6478",
                            fontSize: { xs: "0.92rem", sm: "0.98rem" },
                            lineHeight: 1.62,
                            position: "relative",
                            zIndex: 1,
                          }}
                        >
                          {item.a}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Collapse>
            </Box>
          </motion.div>

          {/* Hidden section */}
          <motion.div
            initial={{ opacity: 0, x: -90 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
            style={{ display: "none" }}
          >
            <Box
              sx={{
                mt: { xs: 3, sm: 4 },
                p: { xs: 2, sm: 3 },
                borderRadius: 3,
                border: "1px solid rgba(13,43,69,0.12)",
                background: "linear-gradient(165deg, #ffffff 0%, #f4f9ff 100%)",
                boxShadow: "0 14px 28px rgba(13,43,69,0.12)",
              }}
            >
              <Grid
                container
                spacing={2.2}
                alignItems="center"
                sx={{
                  borderLeft: { xs: "4px solid #1B83CC", sm: "6px solid #1B83CC" },
                  pl: { xs: 1.1, sm: 1.4 },
                }}
              >
                <Grid item xs={12} md={7}>
                  <Typography
                    sx={{
                      color: "#0c2a44",
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 900,
                      fontSize: { xs: "1.35rem", sm: "1.85rem" },
                      lineHeight: 1.15,
                      mb: 1.2,
                    }}
                  >
                    A complete learning system for families
                  </Typography>

                  <Typography
                    sx={{
                      color: "#27475f",
                      fontSize: { xs: "0.95rem", sm: "1rem" },
                      lineHeight: 1.6,
                    }}
                  >
                    Golf In Colors offers a structured learning system made up of playful programs and tools designed to support both kids and parents throughout the learning journey. Each program has a clear purpose, helping children learn golf step by step while parents understand how to guide, motivate, and support their progress at every stage.
                  </Typography>

                  <Button
                    variant="contained"
                    sx={{
                      mt: 1.7,
                      textTransform: "none",
                      fontWeight: 700,
                      borderRadius: 99,
                      px: 2.4,
                      py: 0.8,
                      background: "linear-gradient(135deg, #1B83CC 0%, #1169a8 100%)",
                      boxShadow: "0 8px 16px rgba(27,131,204,0.28)",
                      "&:hover": { background: "linear-gradient(135deg, #1679bb 0%, #0f5f96 100%)" },
                    }}
                  >
                    Read More
                  </Button>
                </Grid>

                <Grid item xs={12} md={5}>
                  <Box
                    component="img"
                    src="/parents-2.jpeg"
                    alt="Family Learning System"
                    sx={{
                      width: "100%",
                      borderRadius: 2.4,
                      border: "2px solid rgba(13,43,69,0.14)",
                      boxShadow: "0 10px 20px rgba(13,43,69,0.16)",
                      objectFit: "cover",
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </>
  );
}
