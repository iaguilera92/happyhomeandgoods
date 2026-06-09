import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const palette = [
  "#7EC8F2",
  "#1B83CC",
  "#1FAF8B",
  "#2EA44F",
  "#A3D65C",
  "#FFD166",
  "#F4A261",
  "#F28B30",
  "#EF7D57",
  "#EF476F",
  "#C77DFF",
  "#8D6E63",
];
const brushSize = 18;
const coverageThreshold = 0.95;

const getRandomImage = (imageSources) => {
  if (!imageSources.length) return "";
  const randomIndex = Math.floor(Math.random() * imageSources.length);
  return imageSources[randomIndex];
};

const drawStrokeSegment = (context, fromPoint, toPoint, color, size) => {
  context.strokeStyle = color;
  context.lineWidth = size;
  context.lineCap = "round";
  context.lineJoin = "round";
  context.beginPath();
  context.moveTo(fromPoint.x, fromPoint.y);
  context.lineTo(toPoint.x, toPoint.y);
  context.stroke();
};

const drawCoverageSegment = (context, fromPoint, toPoint, size) => {
  context.strokeStyle = "rgba(255,255,255,1)";
  context.lineWidth = size;
  context.lineCap = "round";
  context.lineJoin = "round";
  context.beginPath();
  context.moveTo(fromPoint.x, fromPoint.y);
  context.lineTo(toPoint.x, toPoint.y);
  context.stroke();
};

export default function ColoringBook({ open, onClose, onNextGame, imageSrc, imageSources = [], title = "Coloring Book" }) {
  const imageSourcesKey = imageSources.join("|");
  const availableImages = useMemo(
    () => (imageSources.length ? imageSources : [imageSrc].filter(Boolean)),
    [imageSourcesKey, imageSrc]
  );
  const [activeImage, setActiveImage] = useState(() => availableImages[0] || "");
  const [activeColor, setActiveColor] = useState(palette[0]);
  const [visibleHowToSteps, setVisibleHowToSteps] = useState(0);
  const [solved, setSolved] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [showColorPreview, setShowColorPreview] = useState(true);
  const [previewCycle, setPreviewCycle] = useState(0);
  const boardRef = useRef(null);
  const canvasRef = useRef(null);
  const dragStateRef = useRef(null);
  const imageElementRef = useRef(null);
  const strokesRef = useRef([]);
  const howToTimersRef = useRef([]);
  const coverageCanvasRef = useRef(null);
  const previewTimerRef = useRef(null);

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

  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    const board = boardRef.current;
    if (!canvas || !board) return;

    const context = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const { width, height } = board.getBoundingClientRect();

    canvas.width = Math.max(1, Math.round(width * dpr));
    canvas.height = Math.max(1, Math.round(height * dpr));
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    context.setTransform(1, 0, 0, 1, 0, 0);
    context.scale(dpr, dpr);
    context.clearRect(0, 0, width, height);

    strokesRef.current.forEach((stroke) => {
      for (let index = 1; index < stroke.points.length; index += 1) {
        drawStrokeSegment(context, stroke.points[index - 1], stroke.points[index], stroke.color, stroke.size);
      }

      if (stroke.points.length === 1) {
        context.fillStyle = stroke.color;
        context.beginPath();
        context.arc(stroke.points[0].x, stroke.points[0].y, stroke.size / 2, 0, Math.PI * 2);
        context.fill();
      }
    });
  };

  const resetCoverage = () => {
    const coverageCanvas = document.createElement("canvas");
    coverageCanvas.width = 180;
    coverageCanvas.height = 180;
    coverageCanvasRef.current = coverageCanvas;
    const coverageContext = coverageCanvas.getContext("2d");
    coverageContext.clearRect(0, 0, coverageCanvas.width, coverageCanvas.height);
  };

  const getPointFromEvent = (event) => {
    const board = boardRef.current;
    if (!board) return null;
    const rect = board.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      width: rect.width,
      height: rect.height,
    };
  };

  const markCoveragePoint = (point) => {
    const coverageCanvas = coverageCanvasRef.current;
    if (!coverageCanvas || !point) return;

    const context = coverageCanvas.getContext("2d");
    const coveragePoint = {
      x: (point.x / point.width) * coverageCanvas.width,
      y: (point.y / point.height) * coverageCanvas.height,
    };

    context.fillStyle = "rgba(255,255,255,1)";
    context.beginPath();
    context.arc(coveragePoint.x, coveragePoint.y, 8, 0, Math.PI * 2);
    context.fill();
  };

  const markCoverageSegment = (fromPoint, toPoint) => {
    const coverageCanvas = coverageCanvasRef.current;
    if (!coverageCanvas || !fromPoint || !toPoint) return;

    const context = coverageCanvas.getContext("2d");
    const normalizedFrom = {
      x: (fromPoint.x / fromPoint.width) * coverageCanvas.width,
      y: (fromPoint.y / fromPoint.height) * coverageCanvas.height,
    };
    const normalizedTo = {
      x: (toPoint.x / toPoint.width) * coverageCanvas.width,
      y: (toPoint.y / toPoint.height) * coverageCanvas.height,
    };

    drawCoverageSegment(context, normalizedFrom, normalizedTo, 16);
  };

  const getCoverageRatio = () => {
    const coverageCanvas = coverageCanvasRef.current;
    if (!coverageCanvas) return 0;

    const context = coverageCanvas.getContext("2d");
    const { data } = context.getImageData(0, 0, coverageCanvas.width, coverageCanvas.height);
    let filledPixels = 0;

    for (let index = 3; index < data.length; index += 4) {
      if (data[index] > 0) {
        filledPixels += 1;
      }
    }

    return filledPixels / (coverageCanvas.width * coverageCanvas.height);
  };

  const buildPreviewImage = () => {
    const board = boardRef.current;
    const image = imageElementRef.current;
    const paintCanvas = canvasRef.current;
    if (!board || !image || !paintCanvas) return "";

    const { width, height } = board.getBoundingClientRect();
    const exportCanvas = document.createElement("canvas");
    exportCanvas.width = Math.max(1, Math.round(width));
    exportCanvas.height = Math.max(1, Math.round(height));
    const exportContext = exportCanvas.getContext("2d");

    exportContext.fillStyle = "#ffffff";
    exportContext.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
    exportContext.filter = "grayscale(1) brightness(1.1) contrast(0.96)";
    exportContext.drawImage(image, 0, 0, exportCanvas.width, exportCanvas.height);
    exportContext.filter = "none";
    exportContext.globalAlpha = 0.92;
    exportContext.drawImage(paintCanvas, 0, 0, exportCanvas.width, exportCanvas.height);

    return exportCanvas.toDataURL("image/png");
  };

  const resetBoard = (nextImage = getRandomImage(availableImages)) => {
    strokesRef.current = [];
    dragStateRef.current = null;
    setSolved(false);
    setPreviewImage("");
    setActiveColor(palette[0]);
    setActiveImage(nextImage);
    setShowColorPreview(true);
    setPreviewCycle((current) => current + 1);
    startHowToSequence();
    resetCoverage();

    window.setTimeout(() => {
      redrawCanvas();
    }, 30);
  };

  useLayoutEffect(() => {
    if (!open) return;
    resetBoard(getRandomImage(availableImages));
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;

    window.clearTimeout(previewTimerRef.current);
    previewTimerRef.current = window.setTimeout(() => {
      setShowColorPreview(false);
    }, 2000);

    return () => {
      window.clearTimeout(previewTimerRef.current);
    };
  }, [open, activeImage, previewCycle]);

  useEffect(() => {
    const handleResize = () => {
      redrawCanvas();
    };

    if (!open) return undefined;

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [open, activeImage]);

  useEffect(() => () => {
    howToTimersRef.current.forEach((timer) => window.clearTimeout(timer));
    window.clearTimeout(previewTimerRef.current);
  }, []);

  useEffect(() => {
    if (!open || !activeImage) return undefined;

    const image = new window.Image();
    image.crossOrigin = "anonymous";
    image.src = activeImage;
    image.onload = () => {
      imageElementRef.current = image;
      redrawCanvas();
    };

    return undefined;
  }, [open, activeImage]);

  if (!open) return null;

  const handlePointerDown = (event) => {
    if (solved) return;
    const point = getPointFromEvent(event);
    if (!point) return;

    event.preventDefault();
    event.currentTarget.setPointerCapture?.(event.pointerId);

    const stroke = {
      color: activeColor,
      size: brushSize,
      points: [point],
    };

    strokesRef.current.push(stroke);
    dragStateRef.current = stroke;
    markCoveragePoint(point);
    redrawCanvas();
  };

  const handlePointerMove = (event) => {
    if (!dragStateRef.current || solved) return;
    const point = getPointFromEvent(event);
    if (!point) return;

    const activeStroke = dragStateRef.current;
    const previousPoint = activeStroke.points[activeStroke.points.length - 1];
    activeStroke.points.push(point);
    markCoverageSegment(previousPoint, point);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    drawStrokeSegment(context, previousPoint, point, activeStroke.color, activeStroke.size);
  };

  const handlePointerUp = () => {
    if (!dragStateRef.current || solved) return;
    dragStateRef.current = null;

    const coverageRatio = getCoverageRatio();
    if (coverageRatio >= coverageThreshold && strokesRef.current.length >= 3) {
      setPreviewImage(buildPreviewImage());
      setSolved(true);
    }
  };

  const howToItems = [
    {
      step: "1",
      text: "Pick\na color",
      circleBg: "linear-gradient(135deg, #1B83CC 0%, #0f6dae 100%)",
      shadow: "0 12px 20px rgba(27,131,204,0.24)",
    },
    {
      step: "2",
      text: "Drag to\npaint",
      circleBg: "linear-gradient(135deg, #2ea44f 0%, #24883f 100%)",
      shadow: "0 12px 20px rgba(46,164,79,0.24)",
    },
    {
      step: "3",
      text: "Fill the\npicture",
      circleBg: "linear-gradient(135deg, #f28b30 0%, #e07215 100%)",
      shadow: "0 12px 20px rgba(242,139,48,0.24)",
    },
  ];

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
          minHeight: { xs: "auto", md: 700 },
          maxHeight: { xs: "88vh", md: 700 },
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
          <Typography sx={{ fontWeight: 900, fontSize: { xs: "1.15rem", sm: "1.4rem" } }}>
            {title}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Button
              onClick={() => resetBoard()}
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
              Reset
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
                  animation: "coloringCloseSpin 0.75s ease-out 1",
                  transformOrigin: "center",
                  "@keyframes coloringCloseSpin": {
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
            }}
          >
            <Box
              ref={boardRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              sx={{
                position: "relative",
                width: "100%",
                height: { xs: 272, sm: 420, md: 500 },
                borderRadius: 2.5,
                overflow: "hidden",
                background: showColorPreview
                  ? "linear-gradient(180deg, #87d8ff 0%, #bfeeff 42%, #ffffff 100%)"
                  : "#ffffff",
                touchAction: "none",
                cursor: solved ? "default" : "crosshair",
              }}
            >
              <Box
                component="img"
                src={activeImage}
                alt="Coloring page"
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "block",
                  objectFit: "cover",
                  objectPosition: "center",
                  filter: showColorPreview ? "none" : "grayscale(1) brightness(1.12) contrast(0.96)",
                  userSelect: "none",
                  WebkitUserSelect: "none",
                  pointerEvents: "none",
                  transition: "filter 420ms ease",
                }}
              />
              <Box
                component="canvas"
                ref={canvasRef}
                sx={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  pointerEvents: "none",
                }}
              />
            </Box>
          </Box>

          <Stack spacing={{ xs: 1, sm: 2 }} sx={{ alignSelf: "start" }}>
            <Box
              sx={{
                p: { xs: 1.1, sm: 2 },
                borderRadius: 3,
                backgroundColor: "#ffffff",
                border: "1px solid rgba(13,43,69,0.12)",
                boxShadow: "0 10px 18px rgba(13,43,69,0.08)",
              }}
            >
              <Typography sx={{ color: "#123a57", fontWeight: 900, fontSize: { xs: "0.92rem", sm: "1.1rem" }, mb: 0.8 }}>
                Choose a color
              </Typography>
              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(6, minmax(0, 1fr))", gap: { xs: 0.55, sm: 1.1 } }}>
                {palette.map((color) => (
                  <Box
                    key={color}
                    component="button"
                    type="button"
                    onClick={() => setActiveColor(color)}
                    sx={{
                      width: "100%",
                      aspectRatio: "1 / 1",
                      borderRadius: "50%",
                      border: activeColor === color ? "4px solid #123a57" : "3px solid rgba(18,58,87,0.14)",
                      backgroundColor: color,
                      cursor: "pointer",
                      boxShadow: activeColor === color ? "0 10px 18px rgba(18,58,87,0.18)" : "0 6px 12px rgba(0,0,0,0.08)",
                      transition: "transform 0.18s ease, box-shadow 0.18s ease",
                      "&:hover": {
                        transform: "scale(1.04)",
                      },
                    }}
                  />
                ))}
              </Box>
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
                  Beautiful work. Your page is full of color now.
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
                                animation: "coloringDots 1.2s ease-in-out infinite",
                                animationDelay: `${dotIndex * 0.18}s`,
                                "@keyframes coloringDots": {
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
                animation: "coloringCelebrateIn 520ms cubic-bezier(0.2, 0.8, 0.2, 1)",
                transformOrigin: "center center",
                "@keyframes coloringCelebrateIn": {
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
                Coloring Completed
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
                      animation: "coloringClapEmojiBounce 0.95s ease-in-out infinite",
                      animationDelay: `${index * 0.1}s`,
                      filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.12))",
                      "@keyframes coloringClapEmojiBounce": {
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
                    content: '\"\"',
                    position: "absolute",
                    top: -20,
                    left: "-35%",
                    width: "42%",
                    height: "140%",
                    background:
                      "linear-gradient(115deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.18) 35%, rgba(255,255,255,0.72) 50%, rgba(255,255,255,0.18) 65%, rgba(255,255,255,0) 100%)",
                    transform: "rotate(12deg)",
                    animation: "coloringShine 2.8s ease-in-out infinite",
                    pointerEvents: "none",
                  },
                  "@keyframes coloringShine": {
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
                  src={previewImage || activeImage}
                  alt="Completed coloring page"
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
                  onClick={() => resetBoard()}
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
    </Box>
  );
}
