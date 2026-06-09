import { Box, Button, Container, Typography } from "@mui/material";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import { useEffect } from "react";

export default function Coaches() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        pt: { xs: 8, sm: 15 },
        pb: 8,
        backgroundColor: "#f8f6f1",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            textAlign: "center",
            color: "#0d2b45",
            mb: { xs: 3.5, sm: 5 },
          }}
        >
          <Typography
            component="h1"
            sx={{
              textAlign: "center",
              pt: { xs: 6, sm: 8 },
              mb: { xs: 2.5, sm: 4 },
              lineHeight: 1.1,
            }}
          >
            <Box
              component="span"
              sx={{
                display: "block",
                color: "#2b3a45",
                fontSize: { xs: "1.4rem", sm: "1.7rem", md: "1.9rem" },
                fontWeight: 600,
                letterSpacing: "0.03em",
              }}
            >
              CREATING
            </Box>

            <Box
              component="span"
              sx={{
                display: "block",
                color: "#2b3a45",
                fontSize: { xs: "1.4rem", sm: "1.7rem", md: "1.9rem" },
                fontWeight: 600,
                letterSpacing: "0.03em",
              }}
            >
              A COLORFUL
            </Box>

            <Box
              component="span"
              sx={{
                display: "block",
                color: "#2b3a45",
                fontSize: { xs: "1.4rem", sm: "1.7rem", md: "1.9rem" },
                fontWeight: 600,
                letterSpacing: "0.03em",
              }}
            >
              PATH FOR FUTURE
            </Box>

            <Box
              component="span"
              sx={{
                display: "block",
                color: "#2b3a45",
                fontSize: { xs: "1.4rem", sm: "1.7rem", md: "1.9rem" },
                fontWeight: 600,
                lineHeight: 1,
                textShadow: "none",
              }}
            >
              GOLFERS
            </Box>
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "1rem", sm: "1.1rem" },
              color: "#35536a",
              textShadow: "none",
            }}
          >
            "Let's Make the First Swing a Fun One!"
          </Typography>
        </Box>

        <Box
          sx={{
            p: { xs: 2.2, sm: 3 },
            borderRadius: 3.2,
            color: "#0d2b45",
            position: "relative",
            overflow: "hidden",
            border: "1px solid rgba(13,43,69,0.12)",
            background: "linear-gradient(165deg, #ffffff 0%, #f4f9ff 100%)",
            boxShadow: "0 14px 28px rgba(13,43,69,0.12)",
            "&::before": {
              content: '""',
              position: "absolute",
              top: -44,
              right: -44,
              width: 130,
              height: 130,
              borderRadius: "50%",
              background: "rgba(27,131,204,0.08)",
            },
          }}
        >
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              background: "linear-gradient(135deg, #1B83CC 0%, #1169a8 100%)",
              border: "1px solid rgba(27,131,204,0.28)",
              boxShadow: "0 6px 14px rgba(27,131,204,0.24)",
              mb: 1.4,
              mx: "auto",
            }}
          >
            <AutoAwesomeRoundedIcon sx={{ fontSize: 24 }} />
          </Box>

          <Typography
            sx={{
              textAlign: "center",
              color: "#2b3a45",
              fontSize: { xs: "1.4rem", sm: "1.7rem", md: "1.9rem" },
              fontWeight: 600,
              letterSpacing: "0.03em",
              mb: 1.6,
            }}
          >
            OUR SYSTEM
          </Typography>

          <Typography sx={{ color: "#2b3a45", fontSize: { xs: "1rem", sm: "1.15rem" }, lineHeight: 1.6, mb: 1.25 }}>
            Golf In Colors is a creative, family-centered learning system designed to motivate kids to learn golf through play, movement, and connection.
          </Typography>

          <Typography sx={{ color: "#2b3a45", fontSize: { xs: "1rem", sm: "1.15rem" }, lineHeight: 1.6, mb: 1.25 }}>
            Our approach combines playful programs like Tee Box, where kids learn golf step by step through games and stories, and Star Path, which integrates physical activity and goal-based challenges to keep children active and motivated.
          </Typography>

          <Typography sx={{ color: "#2b3a45", fontSize: { xs: "1rem", sm: "1.15rem" }, lineHeight: 1.6, mb: 1.25 }}>
            Learning is reinforced with interactive activities that extend the experience beyond the course and into the home.
          </Typography>

          <Typography sx={{ color: "#2b3a45", fontSize: { xs: "1rem", sm: "1.15rem" }, lineHeight: 1.6, mb: 1.25 }}>
            At the heart of our system are clear roles for parents, kids, and coaches, working together as a team to create a fun, supportive, and effective learning environment.
          </Typography>

          <Typography sx={{ color: "#2b3a45", fontSize: { xs: "1rem", sm: "1.15rem" }, lineHeight: 1.6 }}>
            This is more than golf lessons, it's a system that helps families grow together through the game.
          </Typography>

        </Box>

        <Box
          sx={{
            mt: { xs: 2.2, sm: 2.8 },
            p: { xs: 2.2, sm: 3 },
            borderRadius: 3.2,
            color: "#0d2b45",
            border: "1px solid rgba(13,43,69,0.12)",
            background: "linear-gradient(165deg, #ffffff 0%, #f4fbf6 100%)",
            boxShadow: "0 14px 28px rgba(13,43,69,0.12)",
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              color: "#0c2a44",
              fontSize: { xs: "1.3rem", sm: "1.6rem" },
              fontWeight: 600,
              letterSpacing: "0.03em",
              mb: 1.6,
            }}
          >
            ROLES
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 1.4,
            }}
          >
            <Box
              sx={{
                p: { xs: 1.4, sm: 1.6 },
                borderRadius: 2.4,
                backgroundColor: "#ffffff",
                border: "1px solid rgba(11,143,99,0.16)",
              }}
            >
              <Typography sx={{ fontWeight: 800, fontSize: { xs: "1rem", sm: "1.1rem" }, mb: 0.6 }}>
                Role for Kids
              </Typography>
              <Typography sx={{ color: "#35536a", fontSize: { xs: "0.92rem", sm: "0.98rem" }, lineHeight: 1.55 }}>
                Kids explore golf through stories, movement, and playful challenges that build confidence and make every lesson exciting.
              </Typography>
            </Box>

            <Box
              sx={{
                p: { xs: 1.4, sm: 1.6 },
                borderRadius: 2.4,
                backgroundColor: "#ffffff",
                border: "1px solid rgba(11,143,99,0.16)",
              }}
            >
              <Typography sx={{ fontWeight: 800, fontSize: { xs: "1rem", sm: "1.1rem" }, mb: 0.6 }}>
                Role for Adults
              </Typography>
              <Typography sx={{ color: "#35536a", fontSize: { xs: "0.92rem", sm: "0.98rem" }, lineHeight: 1.55 }}>
                Adults guide, motivate, and support each stage, helping children stay consistent while turning golf into a shared family journey.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
