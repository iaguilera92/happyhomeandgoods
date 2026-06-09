import { useEffect, useMemo, useRef, useState } from "react";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const matchItems = [
  { id: "club", label: "Golf club", imageSrc: "/palo-golf.png", color: "#1B83CC" },
  { id: "ball", label: "Golf ball", imageSrc: "/golf-ball.png", color: "#2EA44F" },
  { id: "bag", label: "Golf bag", imageSrc: "/bolso-golf.png", color: "#F28B30" },
  { id: "cart", label: "Golf cart", imageSrc: "/golf-cart.png", color: "#EF476F" },
];

const howToItems = [
  {
    step: "1",
    text: "Pick\na card",
    circleBg: "linear-gradient(135deg, #1B83CC 0%, #0f6dae 100%)",
    shadow: "0 12px 20px rgba(27,131,204,0.24)",
  },
  {
    step: "2",
    text: "Drag to\na slot",
    circleBg: "linear-gradient(135deg, #2ea44f 0%, #24883f 100%)",
    shadow: "0 12px 20px rgba(46,164,79,0.24)",
  },
  {
    step: "3",
    text: "Match all\n4 items",
    circleBg: "linear-gradient(135deg, #f28b30 0%, #e07215 100%)",
    shadow: "0 12px 20px rgba(242,139,48,0.24)",
  },
];

const shuffleItems = (items) => {
  const next = [...items];
  for (let index = next.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [next[index], next[swapIndex]] = [next[swapIndex], next[index]];
  }
  return next;
};

export default function Match({ open, onClose, title = "Match Game" }) {
  const [availableCards, setAvailableCards] = useState(() => shuffleItems(matchItems));
  const [placements, setPlacements] = useState({});
  const [activeCardId, setActiveCardId] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  const [visibleHowToSteps, setVisibleHowToSteps] = useState(0);
  const [dragPointer, setDragPointer] = useState(null);
  const dragFrameRef = useRef(null);
  const latestDragPointerRef = useRef(null);
  const dragStateRef = useRef(null);
  const howToTimersRef = useRef([]);

  const activeCard = useMemo(
    () => matchItems.find((item) => item.id === activeCardId) || null,
    [activeCardId]
  );

  const startHowToSequence = () => {
    howToTimersRef.current.forEach((timer) => window.clearTimeout(timer));
    howToTimersRef.current = [];
    setVisibleHowToSteps(0);

    [1, 2, 3].forEach((step, index) => {
      const timer = window.setTimeout(() => {
        setVisibleHowToSteps(step);
      }, 180 + index * 260);
      howToTimersRef.current.push(timer);
    });
  };

  const resetGame = () => {
    setAvailableCards(shuffleItems(matchItems));
    setPlacements({});
    setActiveCardId(null);
    setShowHelp(false);
    setDragPointer(null);
    dragStateRef.current = null;
    latestDragPointerRef.current = null;
    if (dragFrameRef.current) {
      window.cancelAnimationFrame(dragFrameRef.current);
      dragFrameRef.current = null;
    }
    startHowToSequence();
  };

  useEffect(() => {
    if (!open) return;
    resetGame();
  }, [open]);

  useEffect(() => () => {
    howToTimersRef.current.forEach((timer) => window.clearTimeout(timer));
    if (dragFrameRef.current) {
      window.cancelAnimationFrame(dragFrameRef.current);
    }
  }, []);

  useEffect(() => {
    if (activeCardId === null) return undefined;

    const handlePointerMove = (event) => {
      latestDragPointerRef.current = { x: event.clientX, y: event.clientY };

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
      setActiveCardId(null);
      latestDragPointerRef.current = null;

      if (dragFrameRef.current) {
        window.cancelAnimationFrame(dragFrameRef.current);
        dragFrameRef.current = null;
      }

      if (!activeDrag) return;

      const dropTarget = document.elementFromPoint(event.clientX, event.clientY)?.closest?.("[data-match-slot]");
      if (!dropTarget) return;

      const slotId = dropTarget.getAttribute("data-match-slot");
      if (!slotId) return;

      let wasPlaced = false;
      setPlacements((current) => {
        if (current[slotId]) return current;
        wasPlaced = true;
        return { ...current, [slotId]: activeDrag.id };
      });

      if (wasPlaced) {
        setAvailableCards((current) => current.filter((item) => item.id !== activeDrag.id));
      }
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [activeCardId]);

  if (!open) return null;

  const placedCount = Object.keys(placements).length;
  const correctCount = matchItems.filter((item) => placements[item.id] === item.id).length;
  const isComplete = placedCount === matchItems.length;
  const passedMatchGame = correctCount >= 2;
  const visibleCards = [...availableCards, ...Array.from({ length: Math.max(0, matchItems.length - availableCards.length) }, (_, index) => ({
    id: `placeholder-${index}`,
    isPlaceholder: true,
  }))];

  const handleCardPointerDown = (event, item) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture?.(event.pointerId);
    dragStateRef.current = item;
    setActiveCardId(item.id);
    setDragPointer({ x: event.clientX, y: event.clientY });
  };

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
      }}
    >
      <Paper
        elevation={0}
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: { xs: "100%", md: 1180 },
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
            py: { xs: 1.1, sm: 2, md: 1.8 },
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            background: "linear-gradient(135deg, #1B83CC 0%, #0f6dae 100%)",
            color: "#fff",
          }}
        >
          <Typography sx={{ fontWeight: 900, fontSize: { xs: "1.15rem", sm: "1.4rem", md: "1.7rem" } }}>
            {title}
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center">
            <Button
              onPointerDown={() => setShowHelp(true)}
              onPointerUp={() => setShowHelp(false)}
              onPointerLeave={() => setShowHelp(false)}
              onPointerCancel={() => setShowHelp(false)}
              sx={{
                minWidth: 0,
                px: 1.35,
                height: { xs: 38, sm: 42 },
                borderRadius: 99,
                color: "#fff",
                fontWeight: 800,
                textTransform: "none",
                border: "1px solid rgba(255,255,255,0.5)",
                backgroundColor: showHelp ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.14)",
              }}
            >
              Help
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
                  animation: "matchCloseSpin 0.75s ease-out 1",
                  transformOrigin: "center",
                  "@keyframes matchCloseSpin": {
                    "0%": { transform: "rotate(0deg)" },
                    "82%": { transform: "rotate(720deg)" },
                    "100%": { transform: "rotate(720deg)" },
                  },
                }}
              />
            </Button>
          </Stack>
        </Box>

        <Box
          sx={{
            p: { xs: 0.9, sm: 2.2, md: 2.2 },
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.28fr) minmax(300px, 0.72fr)" },
            gap: { xs: 0.9, sm: 2.2, md: 3.5 },
            alignItems: "start",
            height: "100%",
            alignContent: "start",
            overflowY: "auto",
          }}
        >
          <Stack spacing={{ xs: 0.9, sm: 1.4, md: 1.15 }}>
            <Box
              sx={{
                width: "100%",
                maxWidth: { xs: "100%", md: 690 },
                mx: "auto",
                p: { xs: "5px", sm: "6px", md: "6px" },
                borderRadius: 3,
                background: "linear-gradient(180deg, rgba(151,200,255,0.98) 0%, rgba(92,153,230,0.98) 100%)",
                boxShadow: "0 12px 24px rgba(0,0,0,0.16)",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#ffffff",
                  borderRadius: 2.5,
                  p: { xs: 0.95, sm: 1.5, md: 1.45 },
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                  gap: { xs: 0.8, sm: 1.1, md: 1.1 },
                }}
              >
                {matchItems.map((item) => {
                  const placedCardId = placements[item.id];
                  const placedCard = matchItems.find((card) => card.id === placedCardId) || null;
                  const isFilled = Boolean(placedCard);

                  return (
                    <Box
                      key={item.id}
                      data-match-slot={item.id}
                      sx={{
                        p: { xs: 1.2, sm: 1.5, md: 1.45 },
                        minHeight: { xs: 104, sm: 136, md: 142 },
                        borderRadius: 2.2,
                        border: isFilled ? "2px solid rgba(23,63,96,0.16)" : "2px dashed rgba(122,138,153,0.45)",
                        background: isFilled
                          ? "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(240,247,252,0.98) 100%)"
                          : "linear-gradient(180deg, rgba(244,246,248,0.98) 0%, rgba(229,233,237,0.98) 100%)",
                        boxShadow: isFilled
                          ? "0 10px 18px rgba(13,43,69,0.08)"
                          : "inset 0 0 0 1px rgba(255,255,255,0.52)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 1,
                        textAlign: "center",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {placedCard?.imageSrc ? (
                        <Box
                          component="img"
                          src={placedCard.imageSrc}
                          alt={placedCard.label}
                          sx={{
                            width: { xs: 54, sm: 56, md: 58 },
                            height: { xs: 54, sm: 56, md: 58 },
                            objectFit: "contain",
                            opacity: 1,
                            filter: "none",
                            transition: "opacity 0.18s ease",
                          }}
                        />
                      ) : placedCard ? (
                        <placedCard.Icon
                          sx={{
                            fontSize: { xs: 36, sm: 42, md: 44 },
                            color: placedCard.color,
                            transition: "color 0.18s ease",
                          }}
                        />
                      ) : item.imageSrc ? (
                        <Box
                          component="img"
                          src={item.imageSrc}
                          alt={item.label}
                          sx={{
                            width: { xs: 54, sm: 56, md: 58 },
                            height: { xs: 54, sm: 56, md: 58 },
                            objectFit: "contain",
                            opacity: showHelp ? 0.22 : 0,
                            filter: "grayscale(1) brightness(0.72)",
                            transition: "opacity 0.18s ease",
                          }}
                        />
                      ) : (
                        <item.Icon
                          sx={{
                            fontSize: { xs: 36, sm: 42, md: 44 },
                            color: showHelp ? "rgba(96,110,122,0.35)" : "transparent",
                            transition: "color 0.18s ease",
                          }}
                        />
                      )}
                      <Typography sx={{ color: isFilled ? "#173f60" : "#6b7a86", fontWeight: 800, fontSize: { xs: "0.82rem", sm: "0.92rem", md: "0.94rem" } }}>
                        {item.label}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            </Box>

            <Box
              sx={{
                width: "100%",
                maxWidth: { xs: "100%", md: 690 },
                mx: "auto",
                p: { xs: "5px", sm: "6px", md: "6px" },
                height: { xs: 236, sm: 308, md: 288 },
                minHeight: { xs: 236, sm: 308, md: 288 },
                maxHeight: { xs: 236, sm: 308, md: 288 },
                flex: "0 0 auto",
                borderRadius: 3,
                background: "linear-gradient(180deg, rgba(151,200,255,0.98) 0%, rgba(92,153,230,0.98) 100%)",
                boxShadow: "0 12px 24px rgba(0,0,0,0.16)",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#ffffff",
                  borderRadius: 2.5,
                  p: { xs: 0.9, sm: 1.5, md: 1.2 },
                  height: "100%",
                  minHeight: "100%",
                  maxHeight: "100%",
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                  gridTemplateRows: "repeat(2, minmax(0, 1fr))",
                  gap: { xs: 0.8, sm: 1.1, md: 0.95 },
                }}
              >
                {visibleCards.map((item) => {
                  if (item.isPlaceholder) {
                    return (
                      <Box
                        key={item.id}
                        sx={{
                          p: { xs: 0.8, sm: 1.25 },
                          height: "100%",
                          borderRadius: 2.2,
                          border: "2px dashed rgba(27,131,204,0.1)",
                          background: "linear-gradient(180deg, rgba(248,251,255,0.82) 0%, rgba(239,247,252,0.82) 100%)",
                          opacity: 0.45,
                        }}
                      />
                    );
                  }

                  const isDragging = activeCardId === item.id;
                  return (
                    <Box
                      key={item.id}
                      component="button"
                      type="button"
                      onPointerDown={(event) => handleCardPointerDown(event, item)}
                        sx={{
                        p: { xs: 0.8, sm: 1.25, md: 1.05 },
                        height: "100%",
                        borderRadius: 2.2,
                        border: isDragging ? `3px solid ${item.color}` : "2px solid rgba(27,131,204,0.14)",
                        background: "linear-gradient(180deg, rgba(245,250,255,0.98) 0%, rgba(230,243,252,0.98) 100%)",
                        opacity: isDragging ? 0.3 : 1,
                        boxShadow: isDragging
                          ? `0 10px 18px ${item.color}44`
                          : "0 6px 14px rgba(13,43,69,0.08)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "grab",
                        transition: "transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease, opacity 0.18s ease",
                        touchAction: "none",
                        userSelect: "none",
                        WebkitUserSelect: "none",
                        "&:hover": {
                          transform: "scale(1.02)",
                        },
                      }}
                    >
                      {item.imageSrc ? (
                        <Box
                          component="img"
                          src={item.imageSrc}
                          alt={item.label}
                          sx={{
                            width: { xs: 72, sm: 74, md: 66 },
                            height: { xs: 72, sm: 74, md: 66 },
                            maxWidth: "100%",
                            maxHeight: "100%",
                            objectFit: "contain",
                          }}
                        />
                      ) : (
                        <item.Icon sx={{ fontSize: { xs: 38, sm: 46, md: 42 }, color: item.color }} />
                      )}
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Stack>

          <Stack spacing={{ xs: 1.2, sm: 2 }} sx={{ alignSelf: "start", height: "auto" }}>
            <Box
              sx={{
                p: { xs: 1.1, sm: 1.8, md: 1.35 },
                minHeight: { xs: 74, sm: 90, md: 88 },
                borderRadius: 3,
                background: "linear-gradient(180deg, rgba(232,245,255,0.96) 0%, rgba(210,235,252,0.96) 100%)",
                border: "1px solid rgba(27,131,204,0.22)",
              }}
            >
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                  gap: { xs: 0.6, sm: 1.2, md: 1.05 },
                  alignItems: "start",
                }}
              >
                {howToItems.map((item, index, items) => (
                  <Box
                    key={item.step}
                    sx={{
                      position: "relative",
                      textAlign: "center",
                      minHeight: { xs: 82, sm: 104, md: 104 },
                      px: { xs: 0.3, sm: 0.5, md: 0.45 },
                      opacity: visibleHowToSteps >= Number(item.step) ? 1 : 0,
                      transform:
                        visibleHowToSteps >= Number(item.step) ? "translateY(0) scale(1)" : "translateY(12px) scale(0.94)",
                      transition: "opacity 280ms ease, transform 320ms ease",
                    }}
                  >
                    <Box
                      sx={{
                        width: { xs: 50, sm: 58, md: 58 },
                        height: { xs: 50, sm: 58, md: 58 },
                        mx: "auto",
                        mb: { xs: 0.55, sm: 0.9, md: 0.75 },
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 900,
                        fontSize: { xs: "1.08rem", sm: "1.25rem", md: "1.2rem" },
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
                        fontSize: { xs: "0.72rem", sm: "0.9rem", md: "0.88rem" },
                        fontWeight: 700,
                        maxWidth: { xs: 110, md: 112 },
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
                          top: { xs: 17, sm: 21, md: 20 },
                          right: { xs: "-12px", sm: "-16px", md: "-14px" },
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
                              width: { xs: 5, sm: 6, md: 6 },
                              height: { xs: 5, sm: 6, md: 6 },
                              borderRadius: "50%",
                              backgroundColor: "#1B83CC",
                              opacity: 0.35,
                              animation: "matchDots 1.2s ease-in-out infinite",
                              animationDelay: `${dotIndex * 0.18}s`,
                              "@keyframes matchDots": {
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
            </Box>

          </Stack>
        </Box>

        {isComplete && (
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
                animation: "matchCelebrateIn 520ms cubic-bezier(0.2, 0.8, 0.2, 1)",
                transformOrigin: "center center",
                "@keyframes matchCelebrateIn": {
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
              <Typography
                sx={{
                  color: passedMatchGame ? "#1B83CC" : "#264b68",
                  fontWeight: 900,
                  letterSpacing: "0.04em",
                  lineHeight: 0.92,
                  fontSize: { xs: "1.65rem", sm: "3rem", md: "3.5rem" },
                  textTransform: "uppercase",
                  textShadow: passedMatchGame ? "0 10px 24px rgba(27,131,204,0.16)" : "0 10px 24px rgba(38,75,104,0.12)",
                }}
              >
                {passedMatchGame ? "Congratulations" : "Keep Trying"}
              </Typography>

              {passedMatchGame && (
                <>
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
                    Match Completed
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: { xs: 0.45, sm: 0.8 }, flexWrap: "wrap" }}>
                    {Array.from({ length: 6 }, (_, index) => (
                      <Typography
                        key={`clap-emoji-${index}`}
                        sx={{
                          fontSize: { xs: "1.8rem", sm: "2.4rem" },
                          lineHeight: 1,
                          animation: "matchClapEmojiBounce 0.95s ease-in-out infinite",
                          animationDelay: `${index * 0.1}s`,
                          filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.12))",
                          "@keyframes matchClapEmojiBounce": {
                            "0%, 100%": { transform: "translateY(0) scale(1)" },
                            "50%": { transform: "translateY(-8px) scale(1.12)" },
                          },
                        }}
                      >
                        {"\uD83D\uDC4F"}
                      </Typography>
                    ))}
                  </Box>
                </>
              )}

              <Box
                sx={{
                  px: { xs: 2.4, sm: 3 },
                  py: { xs: 1.8, sm: 2.1 },
                  borderRadius: 3,
                  background: passedMatchGame
                    ? "linear-gradient(135deg, #f8d778 0%, #d9a441 45%, #f7e4a4 100%)"
                    : "linear-gradient(135deg, #d7ecff 0%, #a8d5fb 45%, #e6f5ff 100%)",
                  boxShadow: passedMatchGame
                    ? "0 18px 34px rgba(217,164,65,0.28)"
                    : "0 18px 34px rgba(27,131,204,0.16)",
                  color: "#173f60",
                }}
              >
                <Typography sx={{ fontWeight: 900, fontSize: { xs: "1.25rem", sm: "1.6rem" }, mb: 0.3 }}>
                  You got {correctCount} of {matchItems.length} correct!
                </Typography>
                <Typography sx={{ fontWeight: 700, fontSize: { xs: "0.95rem", sm: "1.02rem" } }}>
                  {passedMatchGame
                    ? correctCount === matchItems.length
                      ? "Amazing job, you found every correct match."
                      : "Nice work! You found enough correct matches."
                    : "You are very close. Try again and see if you can get at least 2 right."}
                </Typography>
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
                  onClick={resetGame}
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
                  Try Again
                </Button>

                {passedMatchGame && (
                  <Button
                    onClick={onClose}
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
                    Done
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        )}
      </Paper>

      {dragPointer && activeCard && (
        <Box
          sx={{
            position: "fixed",
            left: dragPointer.x,
            top: dragPointer.y,
            width: { xs: 110, sm: 130 },
            minHeight: { xs: 90, sm: 104 },
            borderRadius: 2,
            border: `3px solid ${activeCard.color}`,
            background: "linear-gradient(180deg, rgba(245,250,255,0.98) 0%, rgba(230,243,252,0.98) 100%)",
            boxShadow: "0 16px 28px rgba(0,0,0,0.28)",
            transform: "translate(-50%, -50%) rotate(2deg)",
            pointerEvents: "none",
            zIndex: 1500,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 0.8,
            p: 1,
          }}
        >
          {activeCard.imageSrc ? (
            <Box
              component="img"
              src={activeCard.imageSrc}
              alt={activeCard.label}
              sx={{
                width: { xs: 58, sm: 56 },
                height: { xs: 58, sm: 56 },
                objectFit: "contain",
              }}
            />
          ) : (
            <activeCard.Icon sx={{ fontSize: { xs: 34, sm: 40 }, color: activeCard.color }} />
          )}
          <Typography sx={{ color: "#173f60", fontWeight: 800, fontSize: { xs: "0.75rem", sm: "0.84rem" }, textAlign: "center" }}>
            {activeCard.label}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
