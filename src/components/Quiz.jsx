import { useEffect, useState } from "react";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const questionThemes = [
  {
    baseBackground: "linear-gradient(135deg, #e7f5ff 0%, #d6eeff 100%)",
    baseBorder: "rgba(27,131,204,0.16)",
    activeBorder: "rgba(27,131,204,0.48)",
    badgeBackground: "rgba(27,131,204,0.12)",
    badgeColor: "#1B83CC",
  },
  {
    baseBackground: "linear-gradient(135deg, #e8f8ec 0%, #d5f2dc 100%)",
    baseBorder: "rgba(46,164,79,0.16)",
    activeBorder: "rgba(46,164,79,0.42)",
    badgeBackground: "rgba(46,164,79,0.12)",
    badgeColor: "#2EA44F",
  },
  {
    baseBackground: "linear-gradient(135deg, #fff1e0 0%, #ffe2c2 100%)",
    baseBorder: "rgba(242,139,48,0.16)",
    activeBorder: "rgba(242,139,48,0.42)",
    badgeBackground: "rgba(242,139,48,0.14)",
    badgeColor: "#F28B30",
  },
  {
    baseBackground: "linear-gradient(135deg, #ffe9ef 0%, #ffd8e4 100%)",
    baseBorder: "rgba(239,71,111,0.16)",
    activeBorder: "rgba(239,71,111,0.42)",
    badgeBackground: "rgba(239,71,111,0.12)",
    badgeColor: "#EF476F",
  },
];

const questions = [
  {
    question: "What do we use to hit the golf ball?",
    answers: ["A golf club", "A tennis racket", "A baseball bat", "A hockey stick"],
    correctIndex: 0,
  },
  {
    question: "What is the hole called where the ball should go?",
    answers: ["The basket", "The cup", "The goal box", "The tunnel"],
    correctIndex: 1,
  },
  {
    question: "Before you swing, what should you do first?",
    answers: ["Look around and stay safe", "Run fast", "Jump in place", "Close your eyes"],
    correctIndex: 0,
  },
  {
    question: "What color is the grass on a golf course?",
    answers: ["Green", "Purple", "Black", "Orange"],
    correctIndex: 0,
  },
];

export default function Quiz({ open, onClose, title = "Golf Quiz" }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [answerResults, setAnswerResults] = useState([]);
  const [feedback, setFeedback] = useState(null);

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setAnswerResults([]);
    setFeedback(null);
  };

  useEffect(() => {
    if (!open) return;
    resetQuiz();
  }, [open]);

  if (!open) return null;

  const isComplete = selectedAnswers.length === questions.length;
  const score = selectedAnswers.reduce((total, answerIndex, index) => (
    answerIndex === questions[index].correctIndex ? total + 1 : total
  ), 0);
  const passedQuiz = score >= 2;

  const activeQuestion = questions[currentQuestion];

  const handleAnswer = (answerIndex) => {
    const nextAnswers = [...selectedAnswers];
    nextAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(nextAnswers);
    const isCorrect = answerIndex === questions[currentQuestion].correctIndex;
    const nextResults = [...answerResults];
    nextResults[currentQuestion] = isCorrect;
    setAnswerResults(nextResults);
    setFeedback(
      isCorrect
        ? { title: "Well done!", text: "You got it right!" }
        : { title: "Keep going!", text: "Nice try, you can do the next one!" }
    );

    window.setTimeout(() => {
      setFeedback(null);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
      }
    }, 2000);
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
          maxWidth: { xs: "100%", md: 1120 },
          minHeight: { xs: "auto", md: 680 },
          maxHeight: { xs: "88vh", md: 740 },
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
            py: { xs: 1.1, sm: 2, md: 2.25 },
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            background: "linear-gradient(135deg, #1B83CC 0%, #0f6dae 100%)",
            color: "#fff",
          }}
        >
          <Typography sx={{ fontWeight: 900, fontSize: { xs: "1.15rem", sm: "1.4rem", md: "1.65rem" } }}>
            {title}
          </Typography>

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
                animation: "quizCloseSpin 0.75s ease-out 1",
                transformOrigin: "center",
                "@keyframes quizCloseSpin": {
                  "0%": { transform: "rotate(0deg)" },
                  "82%": { transform: "rotate(720deg)" },
                  "100%": { transform: "rotate(720deg)" },
                },
              }}
            />
          </Button>
        </Box>

        <Box
          sx={{
            p: { xs: 0.9, sm: 2.2, md: 3 },
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.22fr) minmax(300px, 0.78fr)" },
            gap: { xs: 0.9, sm: 2.2, md: 3.5 },
            alignItems: "start",
            height: "100%",
            alignContent: "start",
            overflowY: "auto",
          }}
        >
          <Box
              sx={{
                width: "100%",
              maxWidth: { xs: "100%", md: 700 },
              mx: "auto",
              p: "6px",
              borderRadius: 3,
              background: "linear-gradient(180deg, rgba(151,200,255,0.98) 0%, rgba(92,153,230,0.98) 100%)",
              boxShadow: "0 12px 24px rgba(0,0,0,0.16)",
              position: "relative",
            }}
          >
            <Box
              sx={{
              backgroundColor: "#ffffff",
              borderRadius: 2.5,
                p: { xs: 1.35, sm: 2.6, md: 3.1 },
                minHeight: { xs: 255, sm: 360 },
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    px: 1.25,
                    py: 0.35,
                    borderRadius: 99,
                    backgroundColor: "rgba(27,131,204,0.1)",
                    color: "#1B83CC",
                    fontWeight: 900,
                    fontSize: { xs: "0.72rem", sm: "0.86rem", md: "0.92rem" },
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    mb: 1,
                  }}
                >
                  Question {currentQuestion + 1} of {questions.length}
                </Typography>

                <Typography
                  sx={{
                    color: "#173f60",
                    fontWeight: 900,
                    fontSize: { xs: "1.02rem", sm: "1.55rem", md: "1.8rem" },
                    lineHeight: { xs: 1.22, md: 1.18 },
                    mb: 1.35,
                  }}
                >
                  {activeQuestion.question}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "repeat(2, minmax(0, 1fr))", sm: "1fr" },
                  gap: { xs: 0.8, sm: 1.1 },
                }}
              >
                {activeQuestion.answers.map((answer, answerIndex) => {
                  const selectedAnswerIndex = selectedAnswers[currentQuestion];
                  const hasAnsweredCurrent = selectedAnswerIndex !== undefined;
                  const isCorrectAnswer = answerIndex === activeQuestion.correctIndex;
                  const isWrongSelected = hasAnsweredCurrent && selectedAnswerIndex === answerIndex && !isCorrectAnswer;
                  const isCorrectSelected = hasAnsweredCurrent && isCorrectAnswer;

                  return (
                    <Button
                      key={answer}
                      onClick={() => handleAnswer(answerIndex)}
                      sx={{
                        justifyContent: "flex-start",
                        textTransform: "none",
                        textAlign: "left",
                        px: { xs: 1.05, sm: 1.8 },
                        py: { xs: 0.9, sm: 1.15, md: 1.25 },
                        minHeight: { xs: 58, sm: "auto", md: 72 },
                        alignItems: "flex-start",
                        borderRadius: 2.2,
                        color: isCorrectSelected || isWrongSelected ? "#ffffff" : "#173f60",
                        background: isCorrectSelected
                          ? "linear-gradient(135deg, #2ea44f 0%, #24883f 100%)"
                          : isWrongSelected
                            ? "linear-gradient(135deg, #ef6b5f 0%, #d94c3f 100%)"
                          : "linear-gradient(180deg, rgba(245,250,255,0.98) 0%, rgba(230,243,252,0.98) 100%)",
                        border: isCorrectSelected
                          ? "1px solid rgba(36,136,63,0.9)"
                          : isWrongSelected
                            ? "1px solid rgba(217,76,63,0.88)"
                          : "1px solid rgba(27,131,204,0.16)",
                        boxShadow: isCorrectSelected
                          ? "0 10px 18px rgba(46,164,79,0.2)"
                          : isWrongSelected
                            ? "0 10px 18px rgba(217,76,63,0.18)"
                          : "0 6px 14px rgba(13,43,69,0.06)",
                        fontWeight: 800,
                        fontSize: { xs: "0.8rem", sm: "1rem", md: "1.08rem" },
                        lineHeight: { xs: 1.24, md: 1.28 },
                        "&:hover": {
                          background: isCorrectSelected
                            ? "linear-gradient(135deg, #289445 0%, #1f7938 100%)"
                            : isWrongSelected
                              ? "linear-gradient(135deg, #e05b4f 0%, #ca4337 100%)"
                            : "linear-gradient(180deg, rgba(239,247,255,0.98) 0%, rgba(221,239,252,0.98) 100%)",
                        },
                      }}
                    >
                      {answer}
                    </Button>
                  );
                })}
              </Box>
            </Box>

            {feedback && !isComplete && (
              <Box
                sx={{
                  position: "absolute",
                  inset: 6,
                  zIndex: 4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  px: { xs: 2, sm: 4 },
                  background: "rgba(235,247,255,0.78)",
                  backdropFilter: "blur(4px)",
                  borderRadius: 2.5,
                }}
              >
                <Box
                  sx={{
                    textAlign: "center",
                    px: { xs: 2.8, sm: 3.4 },
                    py: { xs: 2.3, sm: 2.8 },
                    minWidth: { xs: 240, sm: 290 },
                    borderRadius: 3,
                    background:
                      feedback.title === "Well done!"
                        ? "linear-gradient(135deg, rgba(215,247,223,0.98) 0%, rgba(180,238,195,0.98) 100%)"
                        : "linear-gradient(135deg, rgba(232,245,255,0.98) 0%, rgba(210,235,252,0.98) 100%)",
                    border:
                      feedback.title === "Well done!"
                        ? "1px solid rgba(46,164,79,0.24)"
                        : "1px solid rgba(27,131,204,0.18)",
                    boxShadow: "0 16px 28px rgba(13,43,69,0.12)",
                    animation: "quizFeedbackIn 280ms ease-out",
                    "@keyframes quizFeedbackIn": {
                      "0%": { opacity: 0, transform: "translateY(10px) scale(0.96)" },
                      "100%": { opacity: 1, transform: "translateY(0) scale(1)" },
                    },
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "center", gap: 0.5, mb: 0.7 }}>
                    {feedback.title === "Well done!" ? (
                      Array.from({ length: 4 }).map((_, index) => (
                        <Typography
                          key={index}
                          sx={{
                            fontSize: { xs: "1.5rem", sm: "1.9rem" },
                            lineHeight: 1,
                            animation: "quizMiniClap 0.9s ease-in-out infinite",
                            animationDelay: `${index * 0.08}s`,
                            "@keyframes quizMiniClap": {
                              "0%, 100%": { transform: "translateY(0) scale(1)" },
                              "50%": { transform: "translateY(-5px) scale(1.08)" },
                            },
                          }}
                        >
                          {"\uD83D\uDC4F"}
                        </Typography>
                      ))
                    ) : (
                      <Typography sx={{ fontSize: { xs: "1.6rem", sm: "2rem" }, lineHeight: 1 }}>
                        {"\u2728"}
                      </Typography>
                    )}
                  </Box>
                  <Typography sx={{ color: "#173f60", fontWeight: 900, fontSize: { xs: "1.15rem", sm: "1.35rem" }, mb: 0.25 }}>
                    {feedback.title}
                  </Typography>
                  <Typography sx={{ color: "#4b6780", fontWeight: 700, fontSize: { xs: "0.92rem", sm: "1rem" } }}>
                    {feedback.text}
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>

            <Stack spacing={{ xs: 1.1, sm: 2 }} sx={{ alignSelf: "start" }}>
              <Box
                sx={{
                  p: { xs: 1.1, sm: 2 },
                borderRadius: 3.2,
                background:
                  "linear-gradient(180deg, rgba(240,248,255,0.98) 0%, rgba(224,241,252,0.98) 100%)",
                border: "1px solid rgba(27,131,204,0.14)",
                boxShadow: "0 12px 20px rgba(13,43,69,0.08)",
              }}
            >
              <Typography sx={{ color: "#123a57", fontWeight: 900, fontSize: { xs: "0.92rem", sm: "1.1rem", md: "1.2rem" }, mb: 0.5 }}>
                Progress
              </Typography>
              <Typography sx={{ color: "#4b6780", fontWeight: 700, fontSize: { xs: "0.72rem", sm: "0.88rem", md: "0.95rem" }, mb: 0.8 }}>
                Keep going, one question at a time.
              </Typography>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "1fr" },
                  gap: { xs: 0.75, sm: 1 },
                }}
              >
                {questions.map((item, index) => {
                  const answered = selectedAnswers[index] !== undefined;
                  const isCurrent = currentQuestion === index && !isComplete;
                  const isCorrect = answerResults[index] === true;
                  const isWrong = answerResults[index] === false;
                  const theme = questionThemes[index % questionThemes.length];
                  return (
                    <Box
                      key={item.question}
                      sx={{
                        p: { xs: 0.55, sm: 1.1 },
                        borderRadius: 2.2,
                        border: isCurrent
                          ? `2px solid ${theme.activeBorder}`
                          : isCorrect
                            ? "1px solid rgba(46,164,79,0.24)"
                            : isWrong
                              ? "1px solid rgba(242,139,48,0.24)"
                              : `1px solid ${theme.baseBorder}`,
                        background: isCorrect
                          ? "linear-gradient(135deg, rgba(215,247,223,0.98) 0%, rgba(180,238,195,0.98) 100%)"
                          : isWrong
                            ? "linear-gradient(135deg, rgba(255,238,214,0.98) 0%, rgba(255,223,171,0.98) 100%)"
                            : !answered && !isCurrent
                              ? "linear-gradient(135deg, rgba(205,218,228,0.92) 0%, rgba(186,200,212,0.92) 100%)"
                            : theme.baseBackground,
                        boxShadow: isCurrent
                          ? "0 10px 18px rgba(13,43,69,0.1)"
                          : "0 6px 12px rgba(13,43,69,0.05)",
                        opacity: !answered && !isCurrent ? 0.68 : 1,
                        textAlign: "left",
                        transition: "all 0.2s ease",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 0.75,
                        minHeight: { xs: 44, sm: "auto", md: 74 },
                      }}
                    >
                      <Box
                        sx={{
                          width: { xs: 22, sm: 32 },
                          height: { xs: 22, sm: 32 },
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 900,
                          fontSize: { xs: "0.62rem", sm: "0.86rem", md: "0.92rem" },
                          flexShrink: 0,
                          color: isCorrect || isWrong ? "#ffffff" : !answered && !isCurrent ? "#5d7284" : "#173f60",
                          backgroundColor: isCorrect
                            ? "#2ea44f"
                            : isWrong
                              ? "#f28b30"
                              : isCurrent
                                ? "rgba(255,255,255,0.9)"
                                : !answered && !isCurrent
                                  ? "rgba(255,255,255,0.82)"
                                  : theme.badgeBackground,
                          border: isCurrent
                            ? `2px solid ${theme.badgeColor}`
                            : !answered && !isCurrent
                              ? "2px solid rgba(27,131,204,0.32)"
                              : "none",
                          animation: !answered ? "quizMysteryPulse 1.8s ease-in-out infinite" : "none",
                          "@keyframes quizMysteryPulse": {
                            "0%, 100%": {
                              transform: "scale(1)",
                              boxShadow: "0 0 0 0 rgba(27,131,204,0)",
                            },
                            "50%": {
                              transform: "scale(1.08)",
                              boxShadow: "0 0 0 6px rgba(27,131,204,0.1)",
                            },
                          },
                        }}
                      >
                        {answered ? index + 1 : "?"}
                      </Box>
                      <Box sx={{ minWidth: 0, flex: 1 }}>
                        <Typography
                          sx={{
                          color: !answered && !isCurrent ? "#5d7284" : "#173f60",
                          fontWeight: 800,
                            fontSize: { xs: "0.58rem", sm: "0.86rem", md: "0.95rem" },
                            lineHeight: 1.1,
                          }}
                        >
                          {isCorrect
                            ? "Well done!"
                            : isWrong
                              ? "Keep trying!"
                              : isCurrent
                                ? "Will you get it right?"
                                : "Mystery card"}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
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
                animation: "quizCelebrateIn 520ms cubic-bezier(0.2, 0.8, 0.2, 1)",
                transformOrigin: "center center",
                "@keyframes quizCelebrateIn": {
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
                  color: passedQuiz ? "#1B83CC" : "#264b68",
                  fontWeight: 900,
                  letterSpacing: "0.04em",
                  lineHeight: 0.92,
                  fontSize: { xs: "1.65rem", sm: "3rem", md: "3.5rem" },
                  textTransform: "uppercase",
                  textShadow: passedQuiz ? "0 10px 24px rgba(27,131,204,0.16)" : "0 10px 24px rgba(38,75,104,0.12)",
                }}
              >
                {passedQuiz ? "Congratulations" : "Keep Trying"}
              </Typography>

              {passedQuiz && (
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
                    Quiz Completed
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: { xs: 0.45, sm: 0.8 }, flexWrap: "wrap" }}>
                    {Array.from({ length: 6 }, (_, index) => (
                      <Typography
                        key={`clap-emoji-${index}`}
                        sx={{
                          fontSize: { xs: "1.8rem", sm: "2.4rem" },
                          lineHeight: 1,
                          animation: "quizClapEmojiBounce 0.95s ease-in-out infinite",
                          animationDelay: `${index * 0.1}s`,
                          filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.12))",
                          "@keyframes quizClapEmojiBounce": {
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
                  background: passedQuiz
                    ? "linear-gradient(135deg, #f8d778 0%, #d9a441 45%, #f7e4a4 100%)"
                    : "linear-gradient(135deg, #d7ecff 0%, #a8d5fb 45%, #e6f5ff 100%)",
                  boxShadow: passedQuiz
                    ? "0 18px 34px rgba(217,164,65,0.28)"
                    : "0 18px 34px rgba(27,131,204,0.16)",
                  color: "#173f60",
                }}
              >
                <Typography sx={{ fontWeight: 900, fontSize: { xs: "1.25rem", sm: "1.6rem" }, mb: 0.3 }}>
                  You got {score} / {questions.length}
                </Typography>
                <Typography sx={{ fontWeight: 700, fontSize: { xs: "0.95rem", sm: "1.02rem" } }}>
                  {passedQuiz
                    ? score === questions.length
                      ? "Amazing job, golf star!"
                      : "Nice work! You got enough right answers."
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
                  onClick={resetQuiz}
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

                {passedQuiz && (
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
    </Box>
  );
}
