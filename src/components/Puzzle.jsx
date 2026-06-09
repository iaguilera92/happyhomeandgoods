import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const puzzleSize = 3;
const solvedTiles = Array.from({ length: puzzleSize * puzzleSize }, (_, index) => index);

const shuffleTiles = () => {
  const shuffled = [...solvedTiles];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  if (shuffled.every((tile, index) => tile === index)) {
    [shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]];
  }

  return shuffled;
};

const getRandomImage = (imageSources) => {
  if (!imageSources.length) return "";
  const randomIndex = Math.floor(Math.random() * imageSources.length);
  return imageSources[randomIndex];
};

const howToItems = [
  {
    step: "1",
    text: "Pick\na piece",
    circleBg: "linear-gradient(135deg, #1B83CC 0%, #0f6dae 100%)",
    shadow: "0 12px 20px rgba(27,131,204,0.24)",
  },
  {
    step: "2",
    text: "Drop on\nanother",
    circleBg: "linear-gradient(135deg, #2ea44f 0%, #24883f 100%)",
    shadow: "0 12px 20px rgba(46,164,79,0.24)",
  },
  {
    step: "3",
    text: "Match the\nimage",
    circleBg: "linear-gradient(135deg, #f28b30 0%, #e07215 100%)",
    shadow: "0 12px 20px rgba(242,139,48,0.24)",
  },
];

export default function Puzzle({ open, onClose, onNextGame, imageSrc, imageSources = [], title = "Puzzle Challenge" }) {
  const imageSourcesKey = imageSources.join("|");
  const availableImages = useMemo(
    () => (imageSources.length ? imageSources : [imageSrc].filter(Boolean)),
    [imageSourcesKey, imageSrc]
  );
  const [tiles, setTiles] = useState(() => shuffleTiles());
  const [solved, setSolved] = useState(false);
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [dragPointer, setDragPointer] = useState(null);
  const [referenceOpen, setReferenceOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(() => availableImages[0] || "");
  const [visibleHowToSteps, setVisibleHowToSteps] = useState(0);
  const dragStateRef = useRef(null);
  const howToTimersRef = useRef([]);
  const dragFrameRef = useRef(null);
  const latestDragPointerRef = useRef(null);

  const startHowToSequence = useCallback(() => {
    howToTimersRef.current.forEach((timer) => window.clearTimeout(timer));
    howToTimersRef.current = [];
    setVisibleHowToSteps(0);

    [1, 2, 3].forEach((step, index) => {
      const timer = window.setTimeout(() => {
        setVisibleHowToSteps(step);
      }, 180 + index * 260);
      howToTimersRef.current.push(timer);
    });
  }, []);

  const resetPuzzle = useCallback(() => {
    setTiles(shuffleTiles());
    setSolved(false);
    setDraggingIndex(null);
    setDragPointer(null);
    setReferenceOpen(false);
    setActiveImage(getRandomImage(availableImages));
    startHowToSequence();
    dragStateRef.current = null;
    latestDragPointerRef.current = null;
    if (dragFrameRef.current) {
      window.cancelAnimationFrame(dragFrameRef.current);
      dragFrameRef.current = null;
    }
  }, [availableImages, startHowToSequence]);

  useLayoutEffect(() => {
    if (!open) return;
    resetPuzzle();
  }, [open, resetPuzzle]);

  useEffect(() => () => {
    howToTimersRef.current.forEach((timer) => window.clearTimeout(timer));
    if (dragFrameRef.current) {
      window.cancelAnimationFrame(dragFrameRef.current);
    }
  }, []);

  useEffect(() => {
    if (draggingIndex === null) return;

    const handlePointerMove = (event) => {
      latestDragPointerRef.current = {
        x: event.clientX,
        y: event.clientY,
      };

      if (dragFrameRef.current) return;

      dragFrameRef.current = window.requestAnimationFrame(() => {
        setDragPointer(latestDragPointerRef.current);
        dragFrameRef.current = null;
      });
    };

    const handlePointerUp = (event) => {
      const activeDrag = dragStateRef.current;
      dragStateRef.current = null;
      setDragPointer(null);
      setDraggingIndex(null);
      latestDragPointerRef.current = null;

      if (dragFrameRef.current) {
        window.cancelAnimationFrame(dragFrameRef.current);
        dragFrameRef.current = null;
      }

      if (!activeDrag || solved) return;

      const dropTarget = document.elementFromPoint(event.clientX, event.clientY)?.closest?.("[data-puzzle-index]");
      if (!dropTarget) return;

      const dropIndex = Number(dropTarget.getAttribute("data-puzzle-index"));
      if (Number.isNaN(dropIndex) || dropIndex === activeDrag.index) return;

      setTiles((currentTiles) => {
        const nextTiles = [...currentTiles];
        [nextTiles[activeDrag.index], nextTiles[dropIndex]] = [nextTiles[dropIndex], nextTiles[activeDrag.index]];
        const isSolved = nextTiles.every((tile, index) => tile === index);
        setSolved(isSolved);
        return nextTiles;
      });
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [draggingIndex, solved]);

  if (!open) return null;

  const handleShuffle = () => {
    resetPuzzle();
  };

  const handleTilePointerDown = (event, tileIndex) => {
    if (solved) return;

    event.preventDefault();
    event.currentTarget.setPointerCapture?.(event.pointerId);
    dragStateRef.current = {
      index: tileIndex,
      tileId: tiles[tileIndex],
    };
    setDraggingIndex(tileIndex);
    setDragPointer({
      x: event.clientX,
      y: event.clientY,
    });
  };

  const activeDragTileId = draggingIndex !== null ? tiles[draggingIndex] : null;

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 1400,
        backgroundColor: "rgba(9,22,38,0.72)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: { xs: 0.6, sm: 2.2, md: 3 },
        touchAction: "none",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: { xs: "100%", md: 1040 },
          minHeight: { xs: "auto", md: 720 },
          maxHeight: { xs: "88vh", md: 720 },
          borderRadius: 4,
          overflow: "hidden",
          border: "2px solid rgba(255,255,255,0.35)",
          background: "linear-gradient(180deg, #f7fcff 0%, #ebf7ff 100%)",
          boxShadow: "0 22px 40px rgba(0,0,0,0.28)",
        }}
      >
        <Box
          sx={{
            px: { xs: 1.5, sm: 3 },
            py: { xs: 1.1, sm: 2 },
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            background: "linear-gradient(135deg, #1B83CC 0%, #0f6dae 100%)",
            color: "#fff",
          }}
        >
          <Box>
            <Typography sx={{ fontWeight: 900, fontSize: { xs: "1.15rem", sm: "1.4rem" } }}>
              {title}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Button
              onClick={handleShuffle}
              sx={{
                textTransform: "none",
                fontWeight: 800,
                borderRadius: 99,
                px: { xs: 1.5, sm: 2 },
                py: { xs: 0.55, sm: 0.7 },
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.5)",
                backgroundColor: "rgba(255,255,255,0.14)",
              }}
            >
              Shuffle
            </Button>
            <Button
              onClick={onClose}
              sx={{
                minWidth: 0,
                width: { xs: 38, sm: 42 },
                height: { xs: 38, sm: 42 },
                borderRadius: "50%",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.5)",
                backgroundColor: "rgba(255,255,255,0.14)",
              }}
            >
              <CloseIcon
                sx={{
                  fontSize: 20,
                  animation: "puzzleCloseSpin 0.75s ease-out 1",
                  transformOrigin: "center",
                  "@keyframes puzzleCloseSpin": {
                    "0%": { transform: "rotate(0deg)" },
                    "82%": { transform: "rotate(720deg)" },
                    "100%": { transform: "rotate(720deg)" },
                  },
                }}
              />
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            p: { xs: 0.9, sm: 2.2, md: 3 },
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.2fr) minmax(260px, 0.8fr)" },
            gap: { xs: 0.9, sm: 2.2, md: 3 },
            alignItems: "start",
            height: "100%",
            alignContent: "start",
            overflowY: "auto",
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: { xs: "100%", md: 620 },
              mx: "auto",
              p: { xs: "5px", sm: "6px" },
              borderRadius: 3,
              background: "linear-gradient(180deg, rgba(151,200,255,0.98) 0%, rgba(92,153,230,0.98) 100%)",
              boxShadow: "0 12px 24px rgba(0,0,0,0.16)",
              animation: "puzzleBoardIn 420ms cubic-bezier(0.2, 0.8, 0.2, 1)",
              transformOrigin: "center center",
              "@keyframes puzzleBoardIn": {
                "0%": {
                  opacity: 0,
                  transform: "translateY(18px) scale(0.96)",
                },
                "100%": {
                  opacity: 1,
                  transform: "translateY(0) scale(1)",
                },
              },
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: `repeat(${puzzleSize}, minmax(0, 1fr))`,
                gap: { xs: "3px", sm: "4px" },
                backgroundColor: "#ffffff",
                p: { xs: "3px", sm: "4px" },
                borderRadius: 2.5,
              }}
            >
              {tiles.map((tileId, tileIndex) => {
                const tileColumn = tileId % puzzleSize;
                const tileRow = Math.floor(tileId / puzzleSize);
                const isDragging = draggingIndex === tileIndex;

                return (
                  <Box
                    key={`${tileId}-${tileIndex}`}
                    component="button"
                    type="button"
                    data-puzzle-index={tileIndex}
                    onPointerDown={(event) => handleTilePointerDown(event, tileIndex)}
                    sx={{
                      aspectRatio: "1 / 1",
                      border: isDragging ? "4px solid #f28b30" : "2px solid rgba(17,81,138,0.18)",
                      borderRadius: 1.8,
                      backgroundImage: `url(${activeImage})`,
                      backgroundSize: `${puzzleSize * 100}% ${puzzleSize * 100}%`,
                      backgroundPosition: `${(tileColumn / (puzzleSize - 1)) * 100}% ${(tileRow / (puzzleSize - 1)) * 100}%`,
                      backgroundRepeat: "no-repeat",
                      cursor: solved ? "default" : "grab",
                      opacity: isDragging ? 0.28 : 1,
                      boxShadow: isDragging ? "0 10px 18px rgba(242,139,48,0.28)" : "0 5px 12px rgba(0,0,0,0.12)",
                      transition: "transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease, opacity 0.18s ease",
                      touchAction: "none",
                      userSelect: "none",
                      WebkitUserSelect: "none",
                      "&:hover": {
                        transform: solved ? "none" : "scale(1.02)",
                      },
                    }}
                  />
                );
              })}
            </Box>
          </Box>

          <Stack spacing={{ xs: 1, sm: 2 }} sx={{ alignSelf: "start" }}>
            <Box
              component="button"
              type="button"
              onClick={() => setReferenceOpen((current) => !current)}
              sx={{
                p: { xs: 1.15, sm: 2 },
                width: "100%",
                minHeight: { xs: 74, sm: 94 },
                textAlign: "left",
                borderRadius: 3,
                backgroundColor: "#ffffff",
                border: "1px solid rgba(13,43,69,0.12)",
                boxShadow: "0 10px 18px rgba(13,43,69,0.08)",
                cursor: "pointer",
                transition: "transform 0.18s ease, box-shadow 0.18s ease",
                "&:hover": {
                  transform: "translateY(-1px)",
                  boxShadow: "0 14px 22px rgba(13,43,69,0.12)",
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1, mb: 0.4 }}>
                <Typography sx={{ color: "#123a57", fontWeight: 900, fontSize: { xs: "0.92rem", sm: "1.1rem" } }}>
                  Reference Image
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", color: "#1B83CC" }}>
                  {referenceOpen ? <CloseIcon sx={{ fontSize: 20 }} /> : <KeyboardArrowDownIcon sx={{ fontSize: 24 }} />}
                </Box>
              </Box>
              {referenceOpen && (
                <Box
                  component="img"
                  src={activeImage}
                  alt="Puzzle reference"
                    sx={{
                      mt: 0.4,
                      width: "100%",
                      maxHeight: { xs: 160, sm: 250 },
                      display: "block",
                      borderRadius: 2,
                      border: "2px solid rgba(17,81,138,0.14)",
                      objectFit: "contain",
                    }}
                />
              )}
            </Box>

            <Box
              sx={{
                p: { xs: 1.05, sm: 1.8 },
                minHeight: { xs: 74, sm: 90 },
                borderRadius: 3,
                background: solved
                  ? "linear-gradient(180deg, rgba(218,248,223,0.95) 0%, rgba(191,240,200,0.95) 100%)"
                  : "linear-gradient(180deg, rgba(232,245,255,0.96) 0%, rgba(210,235,252,0.96) 100%)",
                border: solved
                  ? "1px solid rgba(46,164,79,0.32)"
                  : "1px solid rgba(27,131,204,0.22)",
              }}
            >
              {solved ? (
                <Typography sx={{ color: "#264b68", lineHeight: 1.6, fontSize: { xs: "0.93rem", sm: "0.98rem" } }}>
                  Awesome work. The full picture is back together.
                </Typography>
              ) : (
                <Box
                  sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                  gap: { xs: 0.6, sm: 1.2 },
                  alignItems: "start",
                }}
              >
                  {howToItems.map((item, index, items) => (
                    <Box
                      key={item.step}
                      sx={{
                        position: "relative",
                        textAlign: "center",
                        minHeight: { xs: 82, sm: 104 },
                        px: { xs: 0.3, sm: 0.5 },
                        opacity: visibleHowToSteps >= Number(item.step) ? 1 : 0,
                        transform:
                          visibleHowToSteps >= Number(item.step) ? "translateY(0) scale(1)" : "translateY(12px) scale(0.94)",
                        transition: "opacity 280ms ease, transform 320ms ease",
                      }}
                    >
                      <Box
                        sx={{
                          width: { xs: 50, sm: 58 },
                          height: { xs: 50, sm: 58 },
                          mx: "auto",
                          mb: { xs: 0.55, sm: 0.9 },
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 900,
                          fontSize: { xs: "1.08rem", sm: "1.25rem" },
                          color: "#ffffff",
                          background: item.circleBg,
                          boxShadow: item.shadow,
                          border: "2px solid rgba(255,255,255,0.72)",
                        }}
                      >
                        {item.step}
                      </Box>
                      <Typography
                        sx={{
                          color: "#264b68",
                          lineHeight: 1.35,
                          fontSize: { xs: "0.72rem", sm: "0.9rem" },
                          fontWeight: 700,
                          maxWidth: 110,
                          mx: "auto",
                          whiteSpace: "pre-line",
                        }}
                      >
                        {item.text}
                      </Typography>

                      {index < items.length - 1 && (
                        <Box
                          aria-hidden="true"
                          sx={{
                            position: "absolute",
                            top: { xs: 17, sm: 21 },
                            right: { xs: "-12px", sm: "-16px" },
                            display: "flex",
                            alignItems: "center",
                            gap: 0.45,
                            opacity: visibleHowToSteps > Number(item.step) ? 1 : 0,
                            transform: visibleHowToSteps > Number(item.step) ? "scale(1)" : "scale(0.8)",
                            transition: "opacity 220ms ease, transform 260ms ease",
                          }}
                        >
                          {[0, 1, 2].map((dotIndex) => (
                            <Box
                              key={`${item.step}-dot-${dotIndex}`}
                              sx={{
                                width: { xs: 5, sm: 6 },
                                height: { xs: 5, sm: 6 },
                                borderRadius: "50%",
                                backgroundColor: "#1B83CC",
                                opacity: 0.35,
                                animation: "puzzleDots 1.2s ease-in-out infinite",
                                animationDelay: `${dotIndex * 0.18}s`,
                                "@keyframes puzzleDots": {
                                  "0%, 100%": { opacity: 0.28, transform: "scale(0.9)" },
                                  "50%": { opacity: 1, transform: "scale(1.25)" },
                                },
                              }}
                            />
                          ))}
                        </Box>
                      )}
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </Stack>
        </Box>

        {solved && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              zIndex: 5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              px: { xs: 2, sm: 4 },
              background:
                "radial-gradient(circle at top, rgba(255,230,176,0.72) 0%, rgba(247,252,255,0.96) 34%, rgba(235,247,255,0.98) 100%)",
            }}
          >
            <Button
              onClick={onClose}
              sx={{
                position: "absolute",
                top: { xs: 14, sm: 18 },
                right: { xs: 14, sm: 18 },
                minWidth: 0,
                width: 42,
                height: 42,
                borderRadius: "50%",
                color: "#264b68",
                backgroundColor: "rgba(255,255,255,0.84)",
                border: "1px solid rgba(18,58,87,0.12)",
                boxShadow: "0 10px 18px rgba(18,58,87,0.1)",
                fontSize: "1.1rem",
                fontWeight: 800,
                lineHeight: 1,
                zIndex: 6,
                "&:hover": {
                  backgroundColor: "#ffffff",
                },
              }}
            >
              X
            </Button>

            <Box
              sx={{
                width: "100%",
                maxWidth: 720,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 2.2,
                position: "relative",
                animation: "puzzleCelebrateIn 520ms cubic-bezier(0.2, 0.8, 0.2, 1)",
                transformOrigin: "center center",
                "@keyframes puzzleCelebrateIn": {
                  "0%": {
                    opacity: 0,
                    transform: "translateY(18px) scale(0.94)",
                  },
                  "100%": {
                    opacity: 1,
                    transform: "translateY(0) scale(1)",
                  },
                },
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: { xs: -18, sm: -28 },
                  width: { xs: 220, sm: 320 },
                  height: { xs: 220, sm: 320 },
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(255,210,92,0.34) 0%, rgba(255,210,92,0.14) 42%, rgba(255,210,92,0) 72%)",
                  filter: "blur(8px)",
                  pointerEvents: "none",
                }}
              />

              <Box
                sx={{
                  px: 1.5,
                  py: 0.45,
                  borderRadius: 99,
                  backgroundColor: "rgba(255,255,255,0.72)",
                  border: "1px solid rgba(242,139,48,0.28)",
                  color: "#e07215",
                  fontWeight: 900,
                  fontSize: { xs: "0.78rem", sm: "0.86rem" },
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  boxShadow: "0 8px 18px rgba(242,139,48,0.12)",
                }}
              >
                Puzzle Completed
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: { xs: 0.45, sm: 0.8 },
                  flexWrap: "wrap",
                }}
              >
                {Array.from({ length: 6 }, (_, index) => (
                  <Typography
                    key={`clap-emoji-${index}`}
                    sx={{
                      fontSize: { xs: "1.8rem", sm: "2.4rem" },
                      lineHeight: 1,
                      animation: "clapEmojiBounce 0.95s ease-in-out infinite",
                      animationDelay: `${index * 0.1}s`,
                      filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.12))",
                      "@keyframes clapEmojiBounce": {
                        "0%, 100%": { transform: "translateY(0) scale(1)" },
                        "50%": { transform: "translateY(-8px) scale(1.12)" },
                      },
                    }}
                  >
                    {"\uD83D\uDC4F"}
                  </Typography>
                ))}
              </Box>

              <Typography
                sx={{
                  color: "#1B83CC",
                  fontWeight: 900,
                  letterSpacing: "0.04em",
                  lineHeight: 0.92,
                  fontSize: { xs: "1.65rem", sm: "3rem", md: "3.5rem" },
                  textTransform: "uppercase",
                  textShadow: "0 10px 24px rgba(27,131,204,0.16)",
                }}
              >
                Congratulations
              </Typography>

              <Box
                sx={{
                  width: "100%",
                  maxWidth: { xs: 310, sm: 390 },
                  p: "7px",
                  borderRadius: 3,
                  background: "linear-gradient(135deg, #f8d778 0%, #d9a441 45%, #f7e4a4 100%)",
                  boxShadow: "0 18px 34px rgba(217,164,65,0.28)",
                  position: "relative",
                  overflow: "hidden",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    top: -20,
                    left: "-35%",
                    width: "42%",
                    height: "140%",
                    background:
                      "linear-gradient(115deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.18) 35%, rgba(255,255,255,0.72) 50%, rgba(255,255,255,0.18) 65%, rgba(255,255,255,0) 100%)",
                    transform: "rotate(12deg)",
                    animation: "puzzleShine 2.8s ease-in-out infinite",
                    pointerEvents: "none",
                  },
                  "@keyframes puzzleShine": {
                    "0%": {
                      left: "-45%",
                      opacity: 0,
                    },
                    "18%": {
                      opacity: 1,
                    },
                    "55%": {
                      left: "110%",
                      opacity: 0.95,
                    },
                    "100%": {
                      left: "110%",
                      opacity: 0,
                    },
                  },
                }}
              >
                <Box
                  component="img"
                  src={activeImage}
                  alt="Completed puzzle"
                  sx={{
                    width: "100%",
                    display: "block",
                    borderRadius: 2.4,
                    border: "3px solid rgba(255,255,255,0.82)",
                    boxShadow: "inset 0 0 0 1px rgba(122,84,15,0.2)",
                    position: "relative",
                    zIndex: 1,
                  }}
                />
              </Box>

              <Box
                sx={{
                  mt: 0.4,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1.1,
                  flexWrap: "wrap",
                }}
              >
                <Button
                  onClick={handleShuffle}
                  sx={{
                    textTransform: "none",
                    fontWeight: 800,
                    borderRadius: 99,
                    px: 4,
                    py: 1.25,
                    minWidth: { xs: 140, sm: 152 },
                    color: "#123a57",
                    backgroundColor: "rgba(255,255,255,0.78)",
                    border: "1px solid rgba(18,58,87,0.14)",
                    boxShadow: "0 10px 18px rgba(18,58,87,0.1)",
                    "&:hover": {
                      backgroundColor: "#ffffff",
                    },
                  }}
                >
                  Play Again
                </Button>

                <Button
                  onClick={onNextGame || onClose}
                  sx={{
                    textTransform: "none",
                    fontWeight: 800,
                    borderRadius: 99,
                    px: 4,
                    py: 1.25,
                    minWidth: { xs: 140, sm: 152 },
                    color: "#fff",
                    background: "linear-gradient(135deg, #31a36b 0%, #248954 100%)",
                    boxShadow: "0 14px 24px rgba(49,163,107,0.24)",
                    "&:hover": {
                      background: "linear-gradient(135deg, #27915d 0%, #1f7949 100%)",
                    },
                  }}
                >
                  Next Game
                </Button>
              </Box>
            </Box>
          </Box>
        )}
      </Paper>

      {dragPointer && activeDragTileId !== null && (
        <Box
          sx={{
            position: "fixed",
            left: dragPointer.x,
            top: dragPointer.y,
            width: { xs: 86, sm: 110 },
            aspectRatio: "1 / 1",
            borderRadius: 1.8,
            border: "4px solid #f28b30",
            backgroundImage: `url(${activeImage})`,
            backgroundSize: `${puzzleSize * 100}% ${puzzleSize * 100}%`,
            backgroundPosition: `${((activeDragTileId % puzzleSize) / (puzzleSize - 1)) * 100}% ${(Math.floor(activeDragTileId / puzzleSize) / (puzzleSize - 1)) * 100}%`,
            backgroundRepeat: "no-repeat",
            boxShadow: "0 16px 28px rgba(0,0,0,0.28)",
            transform: "translate(-50%, -50%) rotate(2deg)",
            pointerEvents: "none",
            zIndex: 1500,
          }}
        />
      )}
    </Box>
  );
}
