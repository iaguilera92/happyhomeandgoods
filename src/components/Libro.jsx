import { Box, Button, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ScreenRotationAltIcon from "@mui/icons-material/ScreenRotationAlt";

const storyBookPageSpread = [
  {
    title: "INTRO:",
    subtitle: "Why golf?",
    desktopText:
      "Hugo and Lisa had a love story that felt like it came straight from a fairy tale. They were high school sweethearts, voted prom king and queen, and always dreamed of building a happy life together. They got married when they were young, and ten years later, their family expanded with the birth of two wonderful children, Max and Sophie.",
    text: "Hugo and Lisa had a love story that felt like it came straight from a fairy tale. They were high school sweethearts, voted prom king and queen, and always dreamed of building a happy life together.",
    imageText:
      "They got married when they were young, and ten years later, their family expanded with the birth of two wonderful children, Max and Sophie.",
    mobileText:
      "Hugo and Lisa had a love story that felt like it came straight from a fairy tale. They were high school sweethearts, voted prom king and queen, and always dreamed of building a happy life together.",
    mobileImageText:
      "They got married when they were young, and ten years later, their family expanded with the birth of two wonderful children, Max and Sophie.",
  },
  {
    title: "",
    subtitle: "",
    desktopText:
      "Hugo moved to the United States from Colombia when he was a boy. He loved his family deeply and worked tirelessly in the construction business. Lisa grew up in Virginia and worked from home while taking care of Max and Sophie. She filled their house with love, warmth, and happy moments together.",
    text: "Hugo moved to the United States from Colombia when he was a boy. He loved his family deeply and worked tirelessly in the construction business.",
    imageText:
      "Day after day, he poured his energy into building houses and buildings, determined to make them strong and safe.",
    mobileText:
      "Hugo moved to the United States from Colombia when he was a boy. He loved his family deeply and worked tirelessly in the construction business.",
    mobileImageText:
      "Lisa grew up in Virginia and worked from home while taking care of Max and Sophie. She filled their house with love, warmth, and happy moments together.",
  },
  {
    title: "",
    subtitle: "",
    desktopText:
      "At the age of six, Max was a curious child. He loved learning new things and could spend hours reading books and asking big questions about the world. In school, he was one of the top students, consistently earning good grades and winning several academic awards for his outstanding performance.",
    text: "At the age of six, Max was a curious child. He loved learning new things and could spend hours reading books and asking big questions about the world.",
    imageText:
      "In school, he was one of the top students, consistently earning good grades and winning several academic awards for his outstanding performance.",
    mobileText:
      "At the age of six, Max was a curious child. He loved learning new things and could spend hours reading books and asking big questions about the world.",
    mobileImageText:
      "In school, he was one of the top students, consistently earning good grades and winning several academic awards for his outstanding performance.",
  },
  {
    title: "",
    subtitle: "",
    desktopText:
      "However, despite being very smart, Max sometimes struggled to connect with other kids. He was shy and often found it difficult to start conversations or join games during recess. Even though he loved learning, deep inside he wished he could laugh, play, and make friends as easily as his little sister, Sophie.",
    text: "However, despite being very smart, Max sometimes struggled to connect with other kids. He was shy and often found it difficult to start conversations or join games during recess.",
    imageText:
      "Even though he loved learning, deep inside he wished he could laugh, play, and make friends as easily as his little sister, Sophie.",
    mobileText:
      "However, despite being very smart, Max sometimes struggled to connect with other kids. He was shy and often found it difficult to start conversations or join games during recess.",
    mobileImageText:
      "Even though he loved learning, deep inside he wished he could laugh, play, and make friends as easily as his little sister, Sophie.",
  },
  {
    title: "",
    subtitle: "",
    desktopText:
      "His parents believed that sports could help Max build confidence, express himself, and connect with other kids, so they signed him up for almost every sport they could find. But despite their efforts, nothing truly captured his interest. Sophie, on the other hand, was naturally outgoing, full of energy, and seemed to shine in every activity she tried, although school did not come as easily to her as it did to Max.",
    text: "His parents believed that sports could help Max build confidence, express himself, and connect with other kids, so they signed him up for almost every sport they could find.",
    imageText:
      "But despite their efforts, nothing truly captured his interest. Sophie, on the other hand, was naturally outgoing, full of energy, and seemed to shine in every activity she tried, although school did not come as easily to her as it did to Max.",
    mobileText:
      "His parents believed that sports could help Max build confidence, express himself, and connect with other kids, so they signed him up for almost every sport they could find.",
    mobileImageText:
      "But despite their efforts, nothing truly captured his interest. Sophie, on the other hand, was naturally outgoing, full of energy, and seemed to shine in every activity she tried, although school did not come as easily to her as it did to Max.",
  },
  {
    title: "",
    subtitle: "",
    desktopText:
      "Then, one day, Hugo took Max to 'Take Your Kid to Work Day.' Max was thrilled to see what his dad did every day. Hugo was working on a new house, but as they arrived, Max's eyes drifted past the wooden frames and stacks of bricks. Just beyond the site stretched a wide, green golf course. Max watched in awe as players swung their clubs, sending tiny white balls soaring through the sky.",
    text: "Then, one day, Hugo took Max to 'Take Your Kid to Work Day.' Max was thrilled to see what his dad did every day.",
    imageText:
      "Hugo was working on a new house, but as they arrived, Max's eyes drifted past the wooden frames and stacks of bricks. Just beyond the site stretched a wide, green golf course.",
    mobileText:
      "Then, one day, Hugo took Max to 'Take Your Kid to Work Day.' Max was thrilled to see what his dad did every day. Hugo was working on a new house, but as they arrived, Max's eyes drifted past the wooden frames and stacks of bricks. Just beyond the site stretched a wide, green golf course.",
    mobileImageText:
      "Max watched in awe as players swung their clubs, sending tiny white balls soaring through the sky.",
  },
  {
    title: "",
    subtitle: "",
    desktopText:
      "Max watched in awe as players swung their clubs, sending tiny white balls soaring through the sky. He was fascinated by their focus, the way they carried themselves, and how they could hit the ball so far with what looked like just a stick. For the first time, a sport truly caught his attention: golf.",
    text: "Max watched in awe as players swung their clubs, sending tiny white balls soaring through the sky. He was fascinated by their focus, the way they carried themselves, and how they could hit the ball so far with what looked like just a stick. For the first time, a sport truly caught his attention: golf.",
    imageText:
      "He had never seen a sport like this before. 'Dad, what are they playing?' Max asked, his eyes wide. Hugo smiled. 'That's golf, buddy.' Max tilted his head, intrigued, not just by the game, but by how the players carried themselves: their focus, their clothes, and the way they launched the ball with what seemed like just a stick.",
    mobileText:
      "Max watched in awe as players swung their clubs, sending tiny white balls soaring through the sky. He was fascinated by their focus, the way they carried themselves, and how they could hit the ball so far with what looked like just a stick. For the first time, a sport truly caught his attention: golf.",
    mobileImageText: "",
  },
  {
    title: "",
    subtitle: "",
    desktopText:
      "Then, Max noticed something even more captivating: a colorful area filled with games and targets, where children laughed and competed while two energetic coaches guided them with excitement. Fascinated by the scene, Max could not hold back his curiosity and immediately asked about the place. Hugo was surprised to see his son so interested as he explained that it was a golf academy.",
    text: "Then, Max noticed something even more captivating: a colorful area filled with games and targets. Children laughed and competed while two energetic coaches guided them with excitement.",
    imageText:
      "Fascinated by the scene, Max could not hold back his curiosity and immediately asked about the place. Hugo was surprised to see his son so interested as he explained that it was a golf academy.",
    mobileText:
      "Then, Max noticed something even more captivating: a colorful area filled with games and targets. Children laughed and competed while two energetic coaches guided them with excitement.",
    mobileImageText:
      "Fascinated by the scene, Max could not hold back his curiosity and immediately asked about the place. Hugo was surprised to see his son so interested as he explained that it was a golf academy.",
  },
  {
    title: "",
    subtitle: "",
    desktopText:
      "Max’s mind filled with questions. What was golf? What was a golf academy? Hugo could only explain that it was a sport where you hit a ball with a club toward a small hole. Even though the answer seemed simple, something about golf stayed in Max’s mind. While his dad continued talking about work for the rest of the day, Max could only imagine himself playing golf.",
    text: "Max’s mind filled with questions. What was golf? What was a golf academy? Hugo could only explain that it was a sport where you hit a ball with a club toward a small hole.",
    imageText:
      "Even though the answer seemed simple, something about golf stayed in Max’s mind. While his dad continued talking about work for the rest of the day, Max could only imagine himself playing golf.",
    mobileText:
      "Max’s mind filled with questions. What was golf? What was a golf academy? Hugo could only explain that it was a sport where you hit a ball with a club toward a small hole.",
    mobileImageText:
      "Even though the answer seemed simple, something about golf stayed in Max’s mind. While his dad continued talking about work for the rest of the day, Max could only imagine himself playing golf.",
  },
  {
    title: "",
    subtitle: "",
    desktopText:
      "That evening, Max could not stop talking about the golf course. Instead of describing the construction site, he filled the dinner table with stories about the colorful academy and the children playing golf. Hugo and Lisa looked at each other and realized they had discovered something special. Sophie, curious and excited, immediately wanted to go too. Little did the family know, a brand-new adventure was about to begin.",
    text: "'What you're looking at is Golf in Colors, a new academy for kids ages three to eight. My son Matt is there right now, and he loves it! You should give it a try.'",
    imageText:
      "'Wow,' Hugo said. 'At that age, and they're already taking classes?' 'Absolutely,' Felix replied. 'They learn the fundamentals and build their motor skills so in the future it will be easier for them to swing properly.'",
    mobileText:
      "'What you're looking at is Golf in Colors, a new academy for kids ages three to eight. My son Matt is there right now, and he loves it! You should give it a try.'",
    mobileImageText:
      "'Wow,' Hugo said. 'At that age, and they're already taking classes?' 'Absolutely,' Felix replied. 'They learn the fundamentals and build their motor skills so in the future it will be easier for them to swing properly.'",
  },
];

export const storyBookPagesMobile = storyBookPageSpread.map((page) => ({
  title: page.title,
  subtitle: page.subtitle,
  text: page.mobileText ?? page.text,
  imageText: page.mobileImageText ?? page.imageText ?? "",
}));

export const storyBookPagesDesktop = storyBookPageSpread.map((page) => ({
  title: page.title,
  subtitle: page.subtitle,
  text: page.desktopText ?? (page.title === "INTRO:" ? [page.text, page.imageText].filter(Boolean).join(" ") : page.text),
  imageText: page.imageText,
}));

const storyPageImages = [
  "/Ilustración_1.avif",
  "/Ilustración_2.png",
  "/Ilustración_3.avif",
  "/Ilustración_4.avif",
  "/Ilustración_5.avif",
  "/Ilustración_6.avif",
  "/Ilustración_7.avif",
  "/Ilustración_8.avif",
  "/Ilustración_9.avif",
  "/Ilustración_10.avif",
];

import LibroFull from "./LibroFull";

export default function Libro({
  bookFullscreenRef,
  bookOpen,
  isMobile,
  isPortrait,
  shouldShowRotateOverlay,
  handleCloseBook,
  handleOpenBook,
  storyPage,
  storyBookPages,
  isPageTurning,
  pageContentVisible,
  turnId,
  flipDirection,
  handlePageTurn,
  useMobileBookLayout,
}) {
  const currentRightPageImage = storyPageImages[Math.min(storyPage, storyPageImages.length - 1)];
  const nextRightPageImage = storyPageImages[Math.min(storyPage + 1, storyPageImages.length - 1)];
  const showVerticalBook = shouldShowRotateOverlay;

  return (
    <Box
      ref={bookFullscreenRef}
      sx={{
        maxWidth: bookOpen ? (isMobile ? "100dvw" : "100vw") : 420,
        boxSizing: "border-box",
        width: bookOpen ? (isMobile ? "100dvw" : "100vw") : "100%",
        height: bookOpen ? (isMobile ? "100dvh" : "100vh") : "auto",
        mx: "auto",
        mb: bookOpen ? 0 : 2,
        borderRadius: bookOpen ? 0 : 4.5,
        p: bookOpen ? (isMobile ? 0 : { xs: 1.2, sm: 2.2 }) : { xs: 0.9, sm: 1.2 },
        position: bookOpen ? "fixed" : "relative",
        inset: bookOpen ? 0 : "auto",
        zIndex: bookOpen ? 1600 : "auto",
        top: bookOpen ? 0 : "auto",
        left: bookOpen ? 0 : "auto",
        overflow: "hidden",
        transform: "none",
        transformOrigin: "center center",
        background: "linear-gradient(160deg, #0d4f66 0%, #16788f 52%, #24a7a5 100%)",
        border: bookOpen ? "none" : "3px solid rgba(255,255,255,0.9)",
        boxShadow: bookOpen ? "none" : "0 16px 28px rgba(0,0,0,0.24)",
      }}
    >
      {bookOpen && (
        <Button
          onClick={handleCloseBook}
          sx={{
            position: "absolute",
            top:
              bookOpen && isMobile
                ? isPortrait
                  ? { xs: 2, sm: 6 }
                  : { xs: -26, sm: -18 }
                : { xs: 6, sm: 8 },
            bottom: "auto",
            right: { xs: 6, sm: 8 },
            left: "auto",
            minWidth: 38,
            width: 38,
            height: 38,
            borderRadius: "50%",
            color: "#fff",
            zIndex: 12,
            backgroundColor: "rgba(0,0,0,0.35)",
            border: "1px solid rgba(255,255,255,0.6)",
          }}
        >
          <CloseIcon />
        </Button>
      )}

      {shouldShowRotateOverlay && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 11,
            backgroundColor: "rgba(0,0,0,0.72)",
            backdropFilter: "blur(1.5px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: 3,
            textAlign: "center",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1.1 }}>
            <Typography
              sx={{
                color: "#fff",
                fontWeight: 800,
                fontSize: "1rem",
                lineHeight: 1.35,
                textShadow: "0 2px 8px rgba(0,0,0,0.5)",
              }}
            >
              Rotate your phone to read the book
            </Typography>
            <ScreenRotationAltIcon sx={{ color: "#ffffff", fontSize: 34, opacity: 0.95 }} />
          </Box>
        </Box>
      )}

      {!bookOpen && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 11,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            px: 2,
            background: "rgba(5,14,24,0.42)",
            backdropFilter: "blur(2.5px)",
          }}
        >
          <Typography sx={{ color: "#fff", fontWeight: 800, fontSize: { xs: "1.05rem", sm: "1.2rem" }, mb: 1.2, textShadow: "0 2px 8px rgba(0,0,0,0.45)" }}>
            Story Book Experience
          </Typography>
          <Button
            onClick={handleOpenBook}
            sx={{
              textTransform: "none",
              fontWeight: 800,
              py: 1,
              px: 3.2,
              borderRadius: 99,
              fontSize: { xs: "1rem", sm: "1.08rem" },
              color: "#fff",
              border: "2px solid rgba(145,255,238,0.92)",
              background: "linear-gradient(160deg, #1cc8b4 0%, #13a38f 45%, #0f8676 100%)",
              boxShadow: "0 0 18px rgba(33,205,188,0.55), 0 8px 18px rgba(8,78,70,0.44)",
            }}
          >
            Start
          </Button>
        </Box>
      )}

      <Box
        sx={bookOpen && isMobile ? {
          position: "absolute",
          top: shouldShowRotateOverlay ? "50%" : isPortrait ? "42%" : "20%",
          left: shouldShowRotateOverlay ? "50%" : "53%",
          width: shouldShowRotateOverlay ? "76vw" : isPortrait ? "90dvh" : "100dvh",
          height: shouldShowRotateOverlay ? "72vh" : isPortrait ? "90dvw" : "100dvw",
          transform: shouldShowRotateOverlay ? "translate(-50%, -50%)" : "translate(-50%, -50%) rotate(90deg)",
          transformOrigin: "center center",
          boxSizing: "border-box",
          mt: shouldShowRotateOverlay ? 0 : "-10px",
          p: isPortrait ? 0.65 : 1.2,
          overflow: "hidden",
          pointerEvents: shouldShowRotateOverlay ? "none" : "auto",
        } : {}}
      >
        {showVerticalBook ? (
          <Box
            sx={{
              width: "100%",
              borderRadius: 3,
              p: shouldShowRotateOverlay ? 0.8 : { xs: 0.72, sm: 0.9 },
              border: "1px solid rgba(12,75,117,0.42)",
              background: "linear-gradient(180deg, #1a6a86 0%, #0f4b75 100%)",
              boxShadow: "0 16px 26px rgba(0,0,0,0.26), inset 0 1px 0 rgba(255,255,255,0.22), inset 0 -10px 18px rgba(3,39,54,0.22)",
              position: "relative",
              overflow: "visible",
              transformStyle: "preserve-3d",
              transform: "perspective(1200px) rotateX(4deg)",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 12,
                bottom: 12,
                left: 10,
                right: 10,
                borderRadius: 18,
                background: "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 100%)",
                boxShadow: "0 12px 18px rgba(7,39,55,0.18)",
                transform: "translateY(6px)",
                zIndex: -2,
                pointerEvents: "none",
              },
              "&::after": {
                content: '""',
                position: "absolute",
                top: 10,
                bottom: 10,
                left: 10,
                width: 12,
                borderRadius: 999,
                background: "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(5,40,58,0.44) 100%)",
                pointerEvents: "none",
                zIndex: 1,
              },
            }}
          >
            <Box
              sx={{
                height: "100%",
                borderRadius: 2.2,
                overflow: "hidden",
                background: "linear-gradient(180deg, #fffdf8 0%, #f6efe3 100%)",
                border: "1px solid rgba(12,75,117,0.18)",
                position: "relative",
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.5), 0 10px 18px rgba(13,51,73,0.12)",
                display: "grid",
                placeItems: "center",
                p: 1.05,
                "&::before": {
                  content: '""',
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(90deg, rgba(0,0,0,0.08) 0%, rgba(255,255,255,0) 24%, rgba(255,255,255,0) 100%)",
                  pointerEvents: "none",
                  zIndex: 1,
                },
              }}
            >
              <Box
                component="img"
                src="/stories.png"
                alt="Story book preview"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  borderRadius: 1.25,
                }}
              />
            </Box>
          </Box>
        ) : (
          <LibroFull
            bookOpen={bookOpen}
            isMobile={isMobile}
            useMobileBookLayout={useMobileBookLayout}
            isPortrait={isPortrait}
            shouldShowRotateOverlay={shouldShowRotateOverlay}
            storyPage={storyPage}
            storyBookPages={storyBookPages}
            currentRightPageImage={currentRightPageImage}
            nextRightPageImage={nextRightPageImage}
            isPageTurning={isPageTurning}
            pageContentVisible={pageContentVisible}
            turnId={turnId}
            flipDirection={flipDirection}
            handlePageTurn={handlePageTurn}
          />
        )}
      </Box>
    </Box>
  );
}

