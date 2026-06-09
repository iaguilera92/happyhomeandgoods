import { Box, Button, Grid, Typography, useMediaQuery } from "@mui/material";
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import { motion } from "framer-motion";

export default function LibroFull({
  bookOpen,
  isMobile,
  useMobileBookLayout,
  isPortrait,
  shouldShowRotateOverlay,
  storyPage,
  storyBookPages,
  currentRightPageImage,
  nextRightPageImage,
  isPageTurning,
  pageContentVisible,
  turnId,
  flipDirection,
  handlePageTurn,
}) {
  const isIphoneSELike = useMediaQuery(
    "((max-width: 430px) and (max-height: 760px)) or ((max-width: 760px) and (max-height: 430px))"
  );
  const mobileTurnDuration = 1.35;
  const desktopTurnDuration = 2;
  const turnDuration = isMobile ? mobileTurnDuration : desktopTurnDuration;
  const useLiteMobileBook = isMobile;
  const activePage = storyBookPages[storyPage] || {};
  const showRightText = useMobileBookLayout && Boolean(activePage.imageText);
  const leftPageFontSize = isIphoneSELike
    ? "0.8rem"
    : isPortrait
      ? "1.08rem"
      : "1.02rem";
  const leftPageLineHeight = !isMobile ? 1.78 : isIphoneSELike ? 1.48 : 1.6;
  const isFirstMobileSpread = showRightText && storyPage === 0;
  const isSecondMobileSpread = showRightText && storyPage === 1;
  const isThirdMobileSpread = showRightText && storyPage === 2;
  const isFourthMobileSpread = showRightText && storyPage === 3;
  const isFifthMobileSpread = showRightText && storyPage === 4;
  const isSixthMobileSpread = showRightText && storyPage === 5;
  const isSeventhMobileSpread = showRightText && storyPage === 6;
  const isEighthMobileSpread = showRightText && storyPage === 7;
  const isNinthMobileSpread = showRightText && storyPage === 8;
  const isTenthMobileSpread = showRightText && storyPage === 9;

  return (
    <>
      {bookOpen && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 0,
            px: 0.5,
            mt: { xs: isPortrait ? 4.1 : 1.6, sm: 1.1 },
          }}
        >
          <Typography
            sx={{
              fontWeight: 900,
              color: "#ffffff",
              textShadow: "0 2px 8px rgba(0,0,0,0.28)",
              fontSize: { xs: "0.86rem", sm: "0.95rem" },
            }}
          >
            {"My Story Book "}{storyPage + 1}/{storyBookPages.length}
          </Typography>
        </Box>
      )}

      {isMobile && (
        <Box sx={{ display: "none" }}>
          <Box component="img" src={currentRightPageImage} alt="" />
          {nextRightPageImage && <Box component="img" src={nextRightPageImage} alt="" />}
        </Box>
      )}

      <Box
        sx={{
          width: "100%",
          borderRadius: 3.4,
          p: bookOpen ? { xs: 1, sm: 1.4 } : { xs: 0.8, sm: 1 },
          border: "1px solid rgba(111,68,31,0.45)",
          background: "linear-gradient(180deg, #f7d99a 0%, #d89e56 52%, #b66b32 100%)",
          boxShadow: bookOpen
            ? isMobile
              ? "0 8px 14px rgba(0,0,0,0.16), inset 0 1px 0 rgba(255,255,255,0.28)"
              : "0 22px 38px rgba(0,0,0,0.34), inset 0 1px 0 rgba(255,255,255,0.45), inset 0 -10px 18px rgba(110,62,22,0.24)"
            : "0 14px 24px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.35)",
          position: "relative",
          overflow: "visible",
          transformStyle: useLiteMobileBook ? "flat" : "preserve-3d",
          transform: isMobile
            ? "none"
            : bookOpen
              ? "perspective(1800px) rotateX(8deg) rotateY(-2deg)"
              : "perspective(1200px) rotateX(4deg)",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 12,
            bottom: 12,
            left: 10,
            right: 10,
            borderRadius: 24,
            background:
              "linear-gradient(180deg, rgba(243,232,214,0.92) 0%, rgba(229,210,184,0.92) 100%)",
            boxShadow: isMobile ? "0 8px 12px rgba(51,28,10,0.08)" : "0 16px 26px rgba(51,28,10,0.16)",
            transform: "translateY(6px)",
            zIndex: -2,
            pointerEvents: "none",
          },
          "&::after": {
            content: '""',
            position: "absolute",
            left: "50%",
            top: 10,
            bottom: 10,
            width: bookOpen ? 34 : 18,
            transform: "translateX(-50%)",
            borderRadius: 999,
            background:
              "linear-gradient(90deg, rgba(58,28,10,0.05) 0%, rgba(58,28,10,0.22) 50%, rgba(58,28,10,0.05) 100%)",
            pointerEvents: "none",
            zIndex: 1,
          },
        }}
      >
        <Grid
          container
          spacing={0}
          alignItems="stretch"
          sx={{ width: "100%", m: 0, position: "relative", perspective: "1200px", zIndex: 2 }}
        >
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: { xs: 16, sm: 20 },
              transform: "translateX(-50%)",
              borderRadius: 99,
              background: "linear-gradient(90deg, #2a1005 0%, #4c2310 50%, #2a1005 100%)",
              boxShadow:
                "inset 2px 0 4px rgba(255,255,255,0.1), inset -2px 0 5px rgba(0,0,0,0.24), 0 0 12px rgba(42,17,5,0.18)",
              zIndex: 4,
              display: useLiteMobileBook ? "none" : "block",
              "&::before": {
                content: '""',
                position: "absolute",
                inset: 2,
                borderRadius: "inherit",
                background: "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0.04) 100%)",
              },
              "&::after": {
                content: '""',
                position: "absolute",
                top: 0,
                bottom: 0,
                left: "50%",
                width: 2,
                transform: "translateX(-50%)",
                background: "rgba(255,255,255,0.12)",
              },
            }}
          />
          <Grid item xs={6} sx={{ pr: { xs: 0.5, sm: 0.6 } }}>
            <Box
              sx={{
                height: bookOpen ? { xs: isPortrait ? "56vh" : "48vh", sm: "70vh" } : { xs: 180, sm: 220 },
                borderRadius: 2.2,
                py: { xs: 1.9, sm: 2.1 },
                px: { xs: 1.15, sm: 4.9, md: 5.4 },
                background: "linear-gradient(180deg, #fffdf8 0%, #fbf4e8 100%)",
                border: "1px solid rgba(148,111,73,0.3)",
                position: "relative",
                overflow: "hidden",
                boxShadow:
                  isMobile
                    ? "inset 0 0 0 1px rgba(255,255,255,0.28), 0 4px 8px rgba(45,26,11,0.07)"
                    : "inset 0 0 0 1px rgba(255,255,255,0.42), inset -10px 0 12px rgba(177,137,94,0.08), 0 10px 18px rgba(45,26,11,0.12)",
                transform: isMobile ? "none" : "perspective(1200px) rotateY(14deg) skewY(-1deg)",
                transformOrigin: "right center",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  right: -2,
                  width: 18,
                  background:
                    "repeating-linear-gradient(180deg, rgba(255,251,244,0.98) 0 2px, rgba(234,220,196,0.96) 2px 4px, rgba(196,165,126,0.42) 4px 5px)",
                  pointerEvents: "none",
                  display: useLiteMobileBook ? "none" : "block",
                },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: 8,
                  bottom: 8,
                  left: 8,
                  right: 8,
                  borderRadius: 18,
                  background:
                    "radial-gradient(circle at 50% 52%, rgba(255,255,255,0) 48%, rgba(176,138,98,0.08) 100%)",
                  pointerEvents: "none",
                },
              }}
            >
              <motion.div
                key={`page-content-${storyPage}`}
                initial={{ opacity: 0, y: 10, scale: 0.992 }}
                animate={{
                  opacity: pageContentVisible ? 1 : 0,
                  y: pageContentVisible ? 0 : 8,
                  scale: pageContentVisible ? 1 : 0.992,
                }}
                transition={{ duration: pageContentVisible ? 0.5 : 1, ease: [0.2, 0.72, 0.18, 1], delay: 0 }}
                style={{
                  position: "relative",
                  zIndex: 2,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                {storyPage === 0 && (
                  <>
                    <Typography
                      sx={{
                        fontWeight: 900,
                        color: "#0f4b75",
                        fontSize: bookOpen
                          ? {
                              xs: isIphoneSELike
                                ? isPortrait
                                  ? "0.82rem"
                                  : "0.78rem"
                                : isPortrait
                                  ? "0.9rem"
                                  : "0.86rem",
                              sm: "1.5rem",
                            }
                          : { xs: "1rem", sm: "1.1rem" },
                        mb: 0.35,
                        width: "100%",
                        textAlign: "center",
                        maxWidth: { sm: "72%" },
                        mx: "auto",
                        lineHeight: { sm: 1.12 },
                      }}
                    >
                      {activePage.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 800,
                        color: "#1f4f82",
                        fontSize: bookOpen
                          ? {
                              xs: isIphoneSELike
                                ? isPortrait
                                  ? "0.7rem"
                                  : "0.68rem"
                                : isPortrait
                                  ? "0.76rem"
                                  : "0.72rem",
                              sm: "1.88rem",
                            }
                          : { xs: "0.86rem", sm: "0.92rem" },
                        mb: 0.8,
                        width: "100%",
                        textAlign: "center",
                      }}
                    >
                      {activePage.subtitle}
                    </Typography>
                  </>
                )}
                <Typography
                  sx={{
                    color: "#31546f",
                    lineHeight: bookOpen ? leftPageLineHeight : 1.55,
                    fontSize: bookOpen ? leftPageFontSize : "0.82rem",
                    width: "100%",
                    maxWidth: bookOpen ? { xs: "100%", sm: !useMobileBookLayout ? "78%" : "100%", md: "78%" } : "100%",
                    mx: "auto",
                    textAlign: "center",
                  }}
                >
                  {activePage.text}
                </Typography>
              </motion.div>
            </Box>
          </Grid>
          <Grid item xs={6} sx={{ pl: { xs: 0.5, sm: 0.6 } }}>
            <Box
              sx={{
                height: bookOpen ? { xs: isPortrait ? "56vh" : "48vh", sm: "70vh" } : { xs: 180, sm: 220 },
                borderRadius: 2.2,
                background: "linear-gradient(180deg, #fffdf8 0%, #fbf4e8 100%)",
                border: "1px solid rgba(148,111,73,0.3)",
                overflow: "hidden",
                pointerEvents: shouldShowRotateOverlay ? "none" : "auto",
                position: "relative",
                p: { xs: 0.25, sm: 1.35 },
                boxShadow:
                  isMobile
                    ? "inset 0 0 0 1px rgba(255,255,255,0.28), 0 4px 8px rgba(45,26,11,0.07)"
                    : "inset 0 0 0 1px rgba(255,255,255,0.42), inset 10px 0 12px rgba(177,137,94,0.08), 0 10px 18px rgba(45,26,11,0.12)",
                transform: isMobile ? "none" : "perspective(1200px) rotateY(-14deg) skewY(1deg)",
                transformOrigin: "left center",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: -2,
                  width: 18,
                  background:
                    "repeating-linear-gradient(180deg, rgba(255,251,244,0.98) 0 2px, rgba(234,220,196,0.96) 2px 4px, rgba(196,165,126,0.42) 4px 5px)",
                  pointerEvents: "none",
                  display: useLiteMobileBook ? "none" : "block",
                },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: 8,
                  bottom: 8,
                  left: 8,
                  right: 8,
                  borderRadius: 18,
                  background:
                    "radial-gradient(circle at 50% 52%, rgba(255,255,255,0) 48%, rgba(176,138,98,0.08) 100%)",
                  pointerEvents: "none",
                },
              }}
            >
              {showRightText ? (
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: 0.1,
                  }}
                >
                  <motion.div
                    key={`page-right-text-${storyPage}`}
                    initial={{ opacity: 0, y: 8, scale: 0.992 }}
                    animate={{
                      opacity: pageContentVisible ? 1 : 0,
                      y: pageContentVisible ? 0 : 8,
                      scale: pageContentVisible ? 1 : 0.992,
                    }}
                    transition={{ duration: pageContentVisible ? 0.5 : 1, ease: [0.2, 0.72, 0.18, 1], delay: 0 }}
                    style={{
                      minHeight: 0,
                      flex: isFirstMobileSpread
                        ? isIphoneSELike ? "0 0 40%" : "0 0 34%"
                        : isSecondMobileSpread
                          ? isIphoneSELike ? "0 0 44%" : "0 0 36%"
                          : isThirdMobileSpread
                            ? isIphoneSELike ? "0 0 44%" : "0 0 36%"
                            : isFourthMobileSpread
                              ? isIphoneSELike ? "0 0 38%" : "0 0 32%"
                              : isFifthMobileSpread
                                ? isIphoneSELike ? "0 0 48%" : "0 0 48%"
                                : isSixthMobileSpread
                                  ? isIphoneSELike ? "0 0 44%" : "0 0 40%"
                                  : isEighthMobileSpread
                                    ? isIphoneSELike ? "0 0 44%" : "0 0 40%"
                                    : isSeventhMobileSpread
                                      ? isIphoneSELike ? "0 0 44%" : "0 0 40%"
                                      : isNinthMobileSpread || isTenthMobileSpread
                                        ? isIphoneSELike ? "0 0 44%" : "0 0 40%"
                              : isIphoneSELike ? "0 0 72%" : "0 0 66%",
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      position: "relative",
                      zIndex: 2,
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#31546f",
                        lineHeight: isIphoneSELike ? 1.38 : 1.52,
                        fontSize: isFirstMobileSpread
                          ? isIphoneSELike
                            ? isPortrait
                              ? "0.7rem"
                              : "0.7rem"
                            : isPortrait
                              ? "0.98rem"
                              : "0.88rem"
                          : isThirdMobileSpread
                            ? isIphoneSELike
                              ? isPortrait
                                ? "0.64rem"
                                : "0.64rem"
                              : isPortrait
                                ? "0.92rem"
                                : "0.82rem"
                          : isEighthMobileSpread
                            ? isIphoneSELike
                              ? isPortrait
                                ? "0.58rem"
                                : "0.58rem"
                              : isPortrait
                                ? "0.84rem"
                                : "0.76rem"
                          : isNinthMobileSpread
                            ? isIphoneSELike
                              ? isPortrait
                                ? "0.62rem"
                                : "0.62rem"
                              : isPortrait
                                ? "0.88rem"
                                : "0.8rem"
                          : isIphoneSELike
                            ? isPortrait
                              ? "0.7rem"
                              : "0.7rem"
                          : isPortrait
                            ? "1.02rem"
                            : "0.9rem",
                        width: "100%",
                        textAlign: "center",
                        pt: isFirstMobileSpread
                          ? isIphoneSELike ? 0.75 : 1.22
                          : isSecondMobileSpread || isThirdMobileSpread
                            ? isIphoneSELike ? 0.78 : 1.05
                            : isFourthMobileSpread
                                ? isIphoneSELike ? 0.72 : 0.82
                                : isFifthMobileSpread
                                  ? isIphoneSELike ? 0.98 : 1.14
                                  : isSixthMobileSpread
                                    ? isIphoneSELike ? 0.88 : 1
                                    : isEighthMobileSpread
                                      ? isIphoneSELike ? 1 : 1.12
                                      : isSeventhMobileSpread
                                        ? isIphoneSELike ? 0.88 : 1
                                        : isNinthMobileSpread || isTenthMobileSpread
                                          ? isIphoneSELike ? 0.88 : 1
                                : isIphoneSELike ? 0.82 : 1.24,
                        px: isFirstMobileSpread
                          ? isIphoneSELike ? 0.8 : 0.8
                          : isSecondMobileSpread || isThirdMobileSpread
                            ? isIphoneSELike ? 0.48 : 0.75
                            : isFourthMobileSpread
                                ? isIphoneSELike ? 0.52 : 0.72
                                : isFifthMobileSpread
                                  ? isIphoneSELike ? 0.56 : 0.68
                                  : isSixthMobileSpread
                                    ? isIphoneSELike ? 0.56 : 0.7
                                    : isEighthMobileSpread
                                      ? isIphoneSELike ? 0.64 : 0.78
                                      : isSeventhMobileSpread
                                        ? isIphoneSELike ? 0.56 : 0.7
                                        : isNinthMobileSpread || isTenthMobileSpread
                                          ? isIphoneSELike ? 0.56 : 0.7
                                : isIphoneSELike ? 0.45 : 0.65,
                      }}
                    >
                      {activePage.imageText}
                    </Typography>
                  </motion.div>

                  <Box
                    sx={{
                      minHeight: 0,
                      flex: isFirstMobileSpread
                        ? isIphoneSELike ? "1 1 60%" : "1 1 70%"
                        : isSecondMobileSpread
                          ? isIphoneSELike ? "1 1 36%" : "1 1 56%"
                          : isThirdMobileSpread
                            ? isIphoneSELike ? "1 1 56%" : "1 1 64%"
                          : isFourthMobileSpread
                              ? isIphoneSELike ? "1 1 62%" : "1 1 68%"
                            : isFifthMobileSpread
                              ? isIphoneSELike ? "1 1 52%" : "1 1 52%"
                            : isSixthMobileSpread
                              ? isIphoneSELike ? "1 1 56%" : "1 1 60%"
                            : isEighthMobileSpread
                              ? isIphoneSELike ? "1 1 56%" : "1 1 60%"
                            : isSeventhMobileSpread
                              ? isIphoneSELike ? "1 1 56%" : "1 1 60%"
                            : isNinthMobileSpread || isTenthMobileSpread
                              ? isIphoneSELike ? "1 1 56%" : "1 1 60%"
                            : isIphoneSELike ? "1 1 28%" : "1 1 34%",
                      pt: isFirstMobileSpread
                        ? (isIphoneSELike ? 0.12 : 0.22)
                        : isSecondMobileSpread
                          ? isIphoneSELike ? 0.34 : 0.12
                          : isThirdMobileSpread
                            ? isIphoneSELike ? 0.18 : 0.1
                          : isFourthMobileSpread
                              ? 0
                            : isFifthMobileSpread
                              ? isIphoneSELike ? 0.22 : 0.18
                            : isSixthMobileSpread
                              ? isIphoneSELike ? 0.12 : 0.08
                            : isEighthMobileSpread
                              ? isIphoneSELike ? 0.2 : 0.14
                            : isSeventhMobileSpread
                              ? isIphoneSELike ? 0.12 : 0.08
                            : isNinthMobileSpread || isTenthMobileSpread
                              ? isIphoneSELike ? 0.18 : 0.12
                              : isIphoneSELike ? 0.1 : 0.2,
                    }}
                  >
                    <motion.img
                      key={`page-image-${storyPage}`}
                      src={currentRightPageImage}
                      alt={`Story illustration ${storyPage + 1}`}
                      initial={{ opacity: 0, scale: 0.992 }}
                      animate={{
                        opacity: pageContentVisible ? 1 : 0,
                        scale: pageContentVisible ? 1 : 0.992,
                      }}
                      transition={{ duration: pageContentVisible ? 0.5 : 1, ease: [0.2, 0.72, 0.18, 1], delay: 0 }}
                      style={{
                        width:
                          isSecondMobileSpread && !isIphoneSELike
                            ? "88%"
                            : "100%",
                        height:
                          isSecondMobileSpread && !isIphoneSELike
                            ? "88%"
                            : "100%",
                        objectFit: "contain",
                        objectPosition:
                          isFirstMobileSpread || isSecondMobileSpread || isThirdMobileSpread
                            || isFourthMobileSpread
                            || isFifthMobileSpread
                            || isSixthMobileSpread
                          || isSeventhMobileSpread
                          || isEighthMobileSpread
                          || isNinthMobileSpread
                          || isTenthMobileSpread
                          ? "center center"
                          : "center bottom",
                        display: "block",
                        margin:
                          isSecondMobileSpread && !isIphoneSELike
                            ? "10px auto 0"
                            : "0",
                      }}
                    />
                  </Box>
                </Box>
              ) : (
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <motion.img
                    key={`page-image-${storyPage}`}
                    src={currentRightPageImage}
                    alt={`Story illustration ${storyPage + 1}`}
                    initial={{ opacity: 0, scale: 0.992 }}
                    animate={{
                      opacity: pageContentVisible ? 1 : 0,
                      scale: pageContentVisible ? 1 : 0.992,
                    }}
                    transition={{ duration: pageContentVisible ? 0.5 : 1, ease: [0.2, 0.72, 0.18, 1], delay: 0 }}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      objectPosition: "center",
                      display: "block",
                    }}
                  />
                </Box>
              )}
            </Box>
          </Grid>
          {isPageTurning && !useLiteMobileBook && (
            <>
              <motion.div
                key={`page-shadow-${turnId}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: isMobile ? [0, 0.05, 0.12, 0.05, 0] : [0, 0.06, 0.16, 0.24, 0.14, 0] }}
                transition={{ duration: turnDuration, ease: [0.18, 0.72, 0.22, 1] }}
                style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  zIndex: 5,
                  background:
                    "linear-gradient(90deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0) 65%, rgba(0,0,0,0.08) 100%)",
                }}
              />

              <motion.div
                key={`page-flip-${turnId}`}
                initial={{ rotateY: 0, x: "0%", opacity: 0.985, scaleX: 1 }}
                animate={{
                  rotateY: flipDirection > 0 ? -180 : 180,
                  x: flipDirection > 0 ? "-100%" : "100%",
                  opacity: isMobile ? [0.985, 0.99, 0.94, 0.86] : [0.985, 0.995, 0.98, 0.92, 0.84],
                  scaleX: isMobile ? [1, 0.994, 1.006, 1] : [1, 0.992, 0.985, 1.015, 1],
                }}
                transition={{ duration: turnDuration, ease: [0.18, 0.72, 0.22, 1] }}
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: flipDirection > 0 ? "50%" : "0%",
                  width: "50%",
                  transformOrigin: flipDirection > 0 ? "left center" : "right center",
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  pointerEvents: "none",
                  zIndex: 6,
                  background:
                    flipDirection > 0
                      ? "linear-gradient(90deg, rgba(255,251,245,0.99) 0%, rgba(247,232,206,0.96) 32%, rgba(232,201,160,0.92) 68%, rgba(206,168,122,0.86) 100%)"
                      : "linear-gradient(270deg, rgba(255,251,245,0.99) 0%, rgba(247,232,206,0.96) 32%, rgba(232,201,160,0.92) 68%, rgba(206,168,122,0.86) 100%)",
                  boxShadow: isMobile
                    ? flipDirection > 0
                      ? "-14px 0 20px rgba(0,0,0,0.16)"
                      : "14px 0 20px rgba(0,0,0,0.16)"
                    : flipDirection > 0
                      ? "-28px 0 40px rgba(0,0,0,0.28)"
                      : "28px 0 40px rgba(0,0,0,0.28)",
                  borderRadius: flipDirection > 0 ? "0 12px 12px 0" : "12px 0 0 12px",
                  willChange: "transform, opacity",
                }}
              />
            </>
          )}
        </Grid>
      </Box>

      {isPageTurning && useLiteMobileBook && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 7,
            pointerEvents: "none",
            background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.08) 48%, rgba(0,0,0,0.06) 100%)",
            animation: "mobilePageSweep 1.35s ease-in-out 1",
            "@keyframes mobilePageSweep": {
              "0%": { opacity: 0, transform: "translateX(-4%)" },
              "20%": { opacity: 0.22 },
              "70%": { opacity: 0.14 },
              "100%": { opacity: 0, transform: "translateX(4%)" },
            },
          }}
        />
      )}

      {bookOpen && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            px: { xs: 1.1, sm: 0.8 },
            mt: 0,
            position: bookOpen && isMobile ? "absolute" : "relative",
            left: bookOpen && isMobile ? 0 : "auto",
            right: bookOpen && isMobile ? 0 : "auto",
            bottom: bookOpen && isMobile ? (isPortrait ? 24 : 18) : "auto",
            zIndex: 9,
          }}
        >
          <Button
            size="small"
            onClick={() => handlePageTurn(-1)}
            disabled={storyPage === 0 || isPageTurning}
            sx={{
              minWidth: { xs: isPortrait ? 46 : 42, sm: 54 },
              p: { xs: isPortrait ? 0.35 : 0.24, sm: 0.55 },
              borderRadius: 99,
              color: "#173d5d",
              fontWeight: 900,
              border: "1px solid rgba(255,255,255,0.6)",
              backgroundColor: "rgba(255,255,255,0.42)",
              backdropFilter: "blur(5px)",
              boxShadow: "0 8px 18px rgba(16,47,74,0.16)",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.56)",
                borderColor: "rgba(255,255,255,0.82)",
              },
              "&.Mui-disabled": {
                color: "rgba(23,61,93,0.38)",
                borderColor: "rgba(255,255,255,0.26)",
                backgroundColor: "rgba(255,255,255,0.18)",
                boxShadow: "none",
              },
            }}
          >
            <NavigateBeforeRoundedIcon sx={{ fontSize: { xs: isPortrait ? 26 : 24, sm: 30 } }} />
          </Button>
          <Button
            size="small"
            onClick={() => handlePageTurn(1)}
            disabled={storyPage === storyBookPages.length - 1 || isPageTurning}
            sx={{
              minWidth: { xs: isPortrait ? 46 : 42, sm: 54 },
              p: { xs: isPortrait ? 0.35 : 0.24, sm: 0.55 },
              borderRadius: 99,
              color: "#173d5d",
              fontWeight: 900,
              border: "1px solid rgba(255,255,255,0.6)",
              backgroundColor: "rgba(255,255,255,0.42)",
              backdropFilter: "blur(5px)",
              boxShadow: "0 8px 18px rgba(16,47,74,0.16)",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.56)",
                borderColor: "rgba(255,255,255,0.82)",
              },
              "&.Mui-disabled": {
                color: "rgba(23,61,93,0.38)",
                borderColor: "rgba(255,255,255,0.26)",
                backgroundColor: "rgba(255,255,255,0.18)",
                boxShadow: "none",
              },
            }}
          >
            <NavigateNextRoundedIcon sx={{ fontSize: { xs: isPortrait ? 26 : 24, sm: 30 } }} />
          </Button>
        </Box>
      )}
    </>
  );
}
