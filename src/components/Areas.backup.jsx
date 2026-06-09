import React from "react";
import { Box, Container, Typography } from "@mui/material";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import SportsGolfRoundedIcon from "@mui/icons-material/SportsGolfRounded";
import PsychologyAltRoundedIcon from "@mui/icons-material/PsychologyAltRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";

const colorCards = [
  {
    title: "Blue Starter",
    description:
      "First introduction to golf through fun, creativity, motor skills, and basic safety around golf equipment.",
    icon: AutoAwesomeRoundedIcon,
    swatch: "linear-gradient(135deg, #8ec5ff 0%, #3f82e6 100%)",
    glow: "rgba(63,130,230,0.18)",
  },
  {
    title: "Yellow Builder",
    description:
      "Building golf fundamentals, confidence, coordination, and learning different areas of the game.",
    icon: GroupsRoundedIcon,
    swatch: "linear-gradient(135deg, #ffe98d 0%, #f0bf2f 100%)",
    glow: "rgba(240,191,47,0.18)",
  },
  {
    title: "Red Explorer",
    description:
      "Learning golf terms, understanding the golf course, and experiencing the game in a deeper way.",
    icon: SportsGolfRoundedIcon,
    swatch: "linear-gradient(135deg, #ff9a9a 0%, #e54848 100%)",
    glow: "rgba(229,72,72,0.18)",
  },
  {
    title: "Orange Player",
    description:
      "Learning how to play through rules, etiquette, structure, and on-course awareness.",
    icon: PsychologyAltRoundedIcon,
    swatch: "linear-gradient(135deg, #ffc58a 0%, #f48a2f 100%)",
    glow: "rgba(244,138,47,0.18)",
  },
  {
    title: "Green Champion",
    description:
      "Preparing children with the confidence, habits, and knowledge needed to join a more structured training environment.",
    icon: FavoriteRoundedIcon,
    swatch: "linear-gradient(135deg, #9be8b2 0%, #34a96f 100%)",
    glow: "rgba(52,169,111,0.18)",
  },
];

function Areas() {
  return (
    <Box
      sx={{
        position: "relative",
        zIndex: 0,
        background:
          "linear-gradient(180deg, #ffffff 0%, #f6faf7 38%, #f5f7fb 100%)",
        pt: { xs: 1.8, sm: 2.4 },
        pb: { xs: 2.5, sm: 3.5 },
      }}
    >
      <Container sx={{ maxWidth: { xs: "980px !important", md: "1180px !important" } }}>
        <Box
          sx={{
            borderRadius: { xs: 4, sm: 5 },
            border: "1px solid rgba(10,38,30,0.08)",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(245,250,247,0.96) 100%)",
            boxShadow: "0 14px 34px rgba(0,0,0,0.08)",
            px: { xs: 2.2, sm: 4 },
            py: { xs: 1.7, sm: 3.1 },
          }}
        >
          <Box
            sx={{
              display: "grid",
              placeItems: "center",
              color: "rgba(46, 125, 50, 0.92)",
              mb: 0.4,
            }}
            aria-hidden="true"
          >
            <svg viewBox="0 0 24 24" style={{ width: 28, height: 28 }}>
              <path d="M6 3v18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M7 4c6 2 8-1 11 1-3 4-5 2-11 4z" fill="currentColor" opacity="0.9" />
              <circle cx="6" cy="3" r="1" fill="currentColor" />
            </svg>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: { xs: 1, sm: 1.4 },
              mt: { xs: -0.35, sm: -0.5 },
              mb: 1,
            }}
          >
            <Box
              sx={{
                width: { xs: 34, sm: 58 },
                height: 2,
                borderRadius: 999,
                background: "rgba(46, 125, 50, 0.75)",
                flexShrink: 0,
              }}
            />
            <Typography
              sx={{
                textAlign: "center",
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 900,
              color: "rgba(46, 125, 50, 0.92)",
              fontSize: { xs: "0.92rem", sm: "1.15rem", md: "1.48rem" },
              lineHeight: 1.1,
              letterSpacing: { xs: "0.14em", sm: "0.16em", md: "0.18em" },
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
              {"THE 5 COLORS OF OUR SYSTEM"}
            </Typography>
            <Box
              sx={{
                width: { xs: 34, sm: 58 },
                height: 2,
                borderRadius: 999,
                background: "rgba(46, 125, 50, 0.75)",
                flexShrink: 0,
              }}
            />
          </Box>

          <Typography
            sx={{
              mt: 0.35,
              textAlign: "center",
              color: "#4f6760",
              fontSize: { xs: "0.98rem", sm: "1.06rem" },
              lineHeight: 1.7,
              maxWidth: "780px",
              mx: "auto",
            }}
          >
            {
              "A simple framework built around fun, progression, understanding, structure, and confidence. The final palette will be updated once the official brand colors are approved."
            }
          </Typography>

          <Box
            sx={{
              mt: { xs: 3, sm: 4 },
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, minmax(0, 1fr))",
                md: "repeat(5, minmax(0, 1fr))",
              },
              gap: { xs: 1.2, sm: 1.4 },
            }}
          >
            {colorCards.map((item) => {
              const Icon = item.icon;

              return (
                <Box
                  key={item.title}
                  sx={{
                    position: "relative",
                    borderRadius: 3,
                    border: "1px solid rgba(10,38,30,0.08)",
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(250,252,251,0.98) 100%)",
                    boxShadow: "0 12px 24px rgba(13,43,69,0.08)",
                    overflow: "hidden",
                    px: 1.8,
                    py: 2.1,
                    minHeight: { xs: 180, sm: 210, md: 238 },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    gap: 1.15,
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      inset: "auto auto -24px -24px",
                      width: 110,
                      height: 110,
                      borderRadius: "50%",
                      background: item.glow,
                      pointerEvents: "none",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 54,
                      height: 54,
                      borderRadius: "50%",
                      background: item.swatch,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#ffffff",
                      boxShadow: "0 10px 20px rgba(0,0,0,0.12)",
                      flexShrink: 0,
                    }}
                  >
                    <Icon sx={{ fontSize: 28 }} />
                  </Box>

                  <Typography
                    sx={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 900,
                      fontSize: { xs: "1.08rem", sm: "1.14rem" },
                      color: "#0c2a44",
                      lineHeight: 1.1,
                    }}
                  >
                    {item.title}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#35536a",
                      fontSize: { xs: "0.94rem", sm: "0.98rem" },
                      lineHeight: 1.6,
                    }}
                  >
                    {item.description}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Box>

        <Box
          sx={{
            mt: { xs: 2.2, sm: 3.2 },
            borderRadius: { xs: 4, sm: 5 },
            border: "1px solid rgba(10,38,30,0.08)",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(242,248,250,0.98) 100%)",
            boxShadow: "0 14px 34px rgba(0,0,0,0.08)",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1.05fr 0.95fr" },
            }}
          >
            <Box
              sx={{
                px: { xs: 2.2, sm: 3.8 },
                py: { xs: 3, sm: 4.2 },
              }}
            >
              <Typography
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 900,
                  color: "#083c2c",
                  fontSize: { xs: "1.36rem", sm: "1.72rem", md: "1.95rem" },
                  lineHeight: 1.12,
                  mb: 1.4,
                }}
              >
                {"Let Us Show You the Way"}
              </Typography>

              <Typography
                sx={{
                  color: "#35536a",
                  fontSize: { xs: "0.96rem", sm: "1.02rem" },
                  lineHeight: 1.75,
                  maxWidth: "62ch",
                }}
              >
                {"Golf in Colors provides parents with a clear framework to understand their role in their child’s development, allowing them to support without creating pressure or confusion. It offers a structured environment where progress is visible and consistent, giving parents confidence in the process and in the decisions they are making. By connecting what happens at the academy with experiences at home, it turns golf into a shared activity, creating meaningful moments between children and their families. This approach brings clarity, trust, and involvement to each stage of the journey, while allowing parents to feel part of a positive and guided experience."}
              </Typography>

              <Box
                sx={{
                  mt: 2.4,
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "repeat(3, minmax(0, 1fr))" },
                  gap: 1.2,
                }}
              >
                {[
                  "Clear guidance",
                  "Visible progress",
                  "Shared family growth",
                ].map((item, index) => (
                  <Box
                    key={item}
                    sx={{
                      borderRadius: 3,
                      px: 1.6,
                      py: 1.5,
                      background:
                        index === 0
                          ? "linear-gradient(180deg, rgba(77,211,192,0.14) 0%, rgba(77,211,192,0.06) 100%)"
                          : index === 1
                            ? "linear-gradient(180deg, rgba(27,131,204,0.14) 0%, rgba(27,131,204,0.06) 100%)"
                            : "linear-gradient(180deg, rgba(52,169,111,0.14) 0%, rgba(52,169,111,0.06) 100%)",
                      border: "1px solid rgba(10,38,30,0.08)",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 900,
                        fontFamily: "'Poppins', sans-serif",
                        color: "#0c2a44",
                        fontSize: { xs: "0.9rem", sm: "0.96rem" },
                        lineHeight: 1.2,
                      }}
                    >
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            <Box
              sx={{
                position: "relative",
                minHeight: { xs: 210, sm: 260, md: "100%" },
                background:
                  "linear-gradient(135deg, rgba(63,130,230,0.92) 0%, rgba(27,131,204,0.92) 45%, rgba(11,143,99,0.94) 100%)",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.22) 0, rgba(255,255,255,0) 26%), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.16) 0, rgba(255,255,255,0) 28%), radial-gradient(circle at 50% 80%, rgba(255,255,255,0.10) 0, rgba(255,255,255,0) 24%)",
                }}
              />
              <Box
                sx={{
                  position: "relative",
                  zIndex: 1,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  px: 3,
                  py: 4,
                  color: "#ffffff",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 900,
                    fontSize: { xs: "1.12rem", sm: "1.3rem" },
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    mb: 1.1,
                  }}
                >
                  {"A guided experience"}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "0.95rem", sm: "1rem" },
                    lineHeight: 1.7,
                    maxWidth: "28ch",
                    opacity: 0.96,
                  }}
                >
                  {"Parents can support, children can enjoy, and the academy can guide every step with clarity."}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            mt: { xs: 2.2, sm: 3.2 },
            borderRadius: { xs: 4, sm: 5 },
            border: "1px solid rgba(10,38,30,0.08)",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(247,250,252,0.98) 100%)",
            boxShadow: "0 14px 34px rgba(0,0,0,0.08)",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "0.98fr 1.02fr" },
            }}
          >
            <Box
              sx={{
                px: { xs: 2.2, sm: 3.8 },
                py: { xs: 3, sm: 4.2 },
                order: { xs: 1, md: 2 },
              }}
            >
              <Typography
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 900,
                  color: "#083c2c",
                  fontSize: { xs: "1.34rem", sm: "1.7rem", md: "1.9rem" },
                  lineHeight: 1.12,
                  mb: 1.2,
                }}
              >
                {"Understanding the Roles"}
              </Typography>

              <Typography
                sx={{
                  color: "#35536a",
                  fontSize: { xs: "0.96rem", sm: "1.02rem" },
                  lineHeight: 1.75,
                  maxWidth: "62ch",
                }}
              >
                {"Clear roles are essential because they create structure, consistency, and trust throughout a child’s learning experience. When each person understands their responsibility - the parent providing emotional support, the coach guiding the learning process, and the child exploring and growing - everything becomes more aligned and effective. This clarity eliminates confusion, reduces unnecessary pressure, and creates a positive environment where the child feels safe, motivated, and confident. With everyone working in the same direction, the learning process becomes more natural, progress becomes consistent, and the overall experience becomes something both the child and the family can truly enjoy."}
              </Typography>

              <Box
                sx={{
                  mt: 2.4,
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "repeat(3, minmax(0, 1fr))" },
                  gap: 1.2,
                }}
              >
                {[
                  "Parent support",
                  "Coach guidance",
                  "Child growth",
                ].map((item, index) => (
                  <Box
                    key={item}
                    sx={{
                      borderRadius: 3,
                      px: 1.6,
                      py: 1.5,
                      background:
                        index === 0
                          ? "linear-gradient(180deg, rgba(27,131,204,0.14) 0%, rgba(27,131,204,0.06) 100%)"
                          : index === 1
                            ? "linear-gradient(180deg, rgba(11,143,99,0.14) 0%, rgba(11,143,99,0.06) 100%)"
                            : "linear-gradient(180deg, rgba(240,191,47,0.14) 0%, rgba(240,191,47,0.06) 100%)",
                      border: "1px solid rgba(10,38,30,0.08)",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 900,
                        fontFamily: "'Poppins', sans-serif",
                        color: "#0c2a44",
                        fontSize: { xs: "0.9rem", sm: "0.96rem" },
                        lineHeight: 1.2,
                      }}
                    >
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            <Box
              sx={{
                position: "relative",
                minHeight: { xs: 230, sm: 280, md: "100%" },
                background:
                  "linear-gradient(135deg, rgba(13,43,69,0.96) 0%, rgba(27,131,204,0.94) 50%, rgba(11,143,99,0.96) 100%)",
                overflow: "hidden",
                order: { xs: 2, md: 1 },
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "radial-gradient(circle at 22% 18%, rgba(255,255,255,0.22) 0, rgba(255,255,255,0) 24%), radial-gradient(circle at 78% 24%, rgba(255,255,255,0.16) 0, rgba(255,255,255,0) 26%), radial-gradient(circle at 50% 82%, rgba(255,255,255,0.10) 0, rgba(255,255,255,0) 24%)",
                }}
              />
              <Box
                sx={{
                  position: "relative",
                  zIndex: 1,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  px: 3,
                  py: 4,
                  color: "#ffffff",
                }}
              >
                <Box
                  sx={{
                    width: 62,
                    height: 62,
                    borderRadius: "50%",
                    mb: 1.3,
                    display: "grid",
                    placeItems: "center",
                    background: "rgba(255,255,255,0.12)",
                    border: "1px solid rgba(255,255,255,0.22)",
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #ffffff 0%, #cfeeff 100%)",
                    }}
                  />
                </Box>

                <Typography
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 900,
                    fontSize: { xs: "1.12rem", sm: "1.3rem" },
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    mb: 1.1,
                  }}
                >
                  {"Trust, structure and confidence"}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "0.95rem", sm: "1rem" },
                    lineHeight: 1.7,
                    maxWidth: "30ch",
                    opacity: 0.96,
                  }}
                >
                  {"When everyone understands their role, the learning path becomes calmer, clearer, and more enjoyable."}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Areas;
