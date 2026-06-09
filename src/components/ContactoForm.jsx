import React, { useState, useEffect } from "react";
import {
    TextField,
    Button,
    Box,
    Grid,
    Typography,
    useMediaQuery,
    useTheme,
    FormControlLabel,
    Checkbox
} from "@mui/material";
import { useInView } from "react-intersection-observer";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const MotionBox = motion.create(Box);

const ContactoForm = ({ setSnackbar, fullHeight = false, variant = "nav", title, messageRows = 3 }) => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({});
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [enviarCopia, setEnviarCopia] = useState(false);
    const [emailCopia, setEmailCopia] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const isNav = variant === "nav";

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!name.trim()) newErrors.name = true;
        if (!phone.trim()) newErrors.phone = true;
        if (!message.trim()) newErrors.message = true;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setSnackbar({
                open: true,
                message: "Please complete all fields.",
                type: "error"
            });
            return;
        }

        setErrors({});
        setIsSubmitting(true);

        const templateParams = {
            nombre: name,
            telefono: phone,
            mensaje: message,
            email: "happyhomeandgoods@gmail.com",
        };

        if (enviarCopia && emailCopia.trim()) {
            templateParams.cc = emailCopia;
        }

        emailjs
            .send(
                "service_m14zwjc",
                "template_btvbspa",
                templateParams,
                "JyLlgoS1y1Jk2BQRN"
            )
            .then(() => {
                setSnackbar({
                    open: true,
                    message: "Message sent successfully!",
                    type: "success"
                });
                setName("");
                setPhone("");
                setMessage("");
                setEmailCopia("");
                setIsSubmitting(false);
            })
            .catch((error) => {
                console.error("Error sending email:", error);
                setSnackbar({
                    open: true,
                    message: "There was an error sending the message.",
                    type: "error"
                });
                setIsSubmitting(false);
            });
    };

    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
    const [startAnimation, setStartAnimation] = useState(false);

    useEffect(() => {
        if (inView) {
            const timer = setTimeout(() => {
                setStartAnimation(true);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [inView]);

    return (
        <Box sx={{ height: fullHeight ? "100%" : "auto" }}>
            <Box
                ref={ref}
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    mt: 0,
                    backgroundColor: isNav ? "transparent" : "#0F4C5C",
                    backgroundImage: isNav
                        ? "linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 40%, rgba(0,0,0,0) 100%), linear-gradient(135deg, #0b111a 0%, #0c1a2a 45%, #0a2239 100%)"
                        : "none",
                    padding: "20px",
                    borderRadius: 5,
                    boxShadow: isNav
                        ? "0 18px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.16), inset 0 -10px 30px rgba(0,0,0,0.35)"
                        : "0px 8px 16px rgba(0, 0, 0, 0.18)",
                    border: isNav ? "1px solid rgba(255,255,255,0.12)" : "1px solid #1F6F7A",
                    backdropFilter: isNav ? "blur(14px)" : "none",
                    height: fullHeight ? "100%" : "auto",
                    minHeight: fullHeight ? 395 : "auto",
                    justifyContent: "center",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                        boxShadow: isNav
                            ? "0 22px 46px rgba(0,0,0,0.62), inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -10px 30px rgba(0,0,0,0.35)"
                            : "0px 12px 22px rgba(0, 0, 0, 0.28)"
                    }
                }}
            >
                {title ? (
                    <Typography
                        sx={{
                            fontWeight: 900,
                            fontSize: "1.05rem",
                            letterSpacing: "0.06em",
                            textTransform: "uppercase",
                            color: "rgba(255,255,255,0.92)",
                            textAlign: "left",
                            mb: -0.5,
                            textShadow: "0 2px 8px rgba(0,0,0,0.55)",
                        }}
                    >
                        {title}
                    </Typography>
                ) : null}
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="First / Last Name"
                            variant="outlined"
                            fullWidth
                            value={name}
                            onChange={(e) => {
                                const input = e.target.value;
                                const soloTexto = input.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
                                setName(soloTexto);
                            }}
                            error={Boolean(errors.name)}
                            sx={{
                                backgroundColor: isNav ? "rgba(255,255,255,0.06)" : "#123F4A",
                                borderRadius: 2,
                                input: { color: "#E6EDF3", fontSize: "0.9rem" },
                                label: { color: errors.name ? "#ff4d4f" : "#E6EDF3" },
                                fieldset: {
                                    borderColor: errors.name ? "#ff4d4f" : (isNav ? "rgba(255,255,255,0.18)" : "#30363D")
                                },
                                "&:hover fieldset": {
                                    borderColor: errors.name ? "#ff4d4f" : (isNav ? "rgba(255,255,255,0.35)" : "#58A6FF")
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: errors.name ? "#ff4d4f" : (isNav ? "#7FD6FF" : "#58A6FF")
                                },
                                opacity: isSubmitting ? 0.6 : 1,
                                pointerEvents: isSubmitting ? "none" : "auto"
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1.5,
                                width: "100%",
                                flexWrap: { xs: "wrap", md: "nowrap" }
                            }}
                        >
                            <TextField
                                label="Phone"
                                variant="outlined"
                                fullWidth
                                disabled={isSubmitting}
                                InputProps={{
                                    style: {
                                        color: "#888",
                                        cursor: "not-allowed"
                                    }
                                }}
                                value={phone}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^\+?\d*$/.test(value) && value.length <= 12) {
                                        setPhone(value);
                                    }
                                }}
                                inputProps={{ maxLength: 12 }}
                                error={Boolean(errors.phone)}
                                sx={{
                                    opacity: isSubmitting ? 0.6 : 1,
                                    pointerEvents: isSubmitting ? "none" : "auto",
                                    backgroundColor: isNav ? "rgba(255,255,255,0.06)" : "#123F4A",
                                    borderRadius: 2,
                                    input: { color: "#E6EDF3", fontSize: "0.9rem" },
                                    label: { color: errors.phone ? "#ff4d4f" : "#E6EDF3" },
                                    fieldset: {
                                        borderColor: errors.phone ? "#ff4d4f" : (isNav ? "rgba(255,255,255,0.18)" : "#30363D")
                                    },
                                    "&:hover fieldset": {
                                        borderColor: errors.phone ? "#ff4d4f" : (isNav ? "rgba(255,255,255,0.35)" : "#58A6FF")
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: errors.phone ? "#ff4d4f" : (isNav ? "#7FD6FF" : "#58A6FF")
                                    },
                                    flex: 1
                                }}
                            />

                            {!enviarCopia ? (
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={enviarCopia}
                                            onChange={(e) => setEnviarCopia(e.target.checked)}
                                            size="small"
                                            sx={{
                                                color: "#58A6FF",
                                                "&.Mui-checked": { color: "#58A6FF" },
                                                p: 0.25
                                            }}
                                        />
                                    }
                                    label={
                                        <Typography sx={{ fontSize: "0.7rem", color: "#E6EDF3", whiteSpace: "nowrap" }}>
                                            Copy email
                                        </Typography>
                                    }
                                    sx={{
                                        ml: 0,
                                        mr: 0,
                                        whiteSpace: "nowrap",
                                        minWidth: "fit-content"
                                    }}
                                />
                            ) : (
                                <TextField
                                    label="Email"
                                    variant="outlined"
                                    disabled={isSubmitting}
                                    InputProps={{
                                        style: {
                                            color: "#888",
                                            cursor: "not-allowed"
                                        }
                                    }}
                                    fullWidth={false}
                                    value={emailCopia}
                                    onChange={(e) => setEmailCopia(e.target.value)}
                                    error={Boolean(!emailCopia.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) && emailCopia.length > 0}
                                    sx={{
                                        width: { xs: "100%", md: "220px" },
                                        backgroundColor: isNav ? "rgba(255,255,255,0.06)" : "#123F4A",
                                        borderRadius: 2,
                                        input: {
                                            color: "#E6EDF3",
                                            fontSize: "0.9rem",
                                            fontFamily: '"Segoe UI", sans-serif'
                                        },
                                        label: {
                                            color:
                                                !emailCopia.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) && emailCopia.length > 0
                                                    ? "#ff4d4f"
                                                    : "#E6EDF3",
                                            fontSize: "0.9rem",
                                            fontFamily: '"Segoe UI", sans-serif'
                                        },
                                        fieldset: {
                                            borderColor:
                                                !emailCopia.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) && emailCopia.length > 0
                                                    ? "#ff4d4f"
                                                    : (isNav ? "rgba(255,255,255,0.18)" : "#30363D")
                                        },
                                        "&:hover fieldset": {
                                            borderColor:
                                                !emailCopia.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) && emailCopia.length > 0
                                                    ? "#ff4d4f"
                                                    : (isNav ? "rgba(255,255,255,0.35)" : "#58A6FF")
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor:
                                                !emailCopia.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) && emailCopia.length > 0
                                                    ? "#ff4d4f"
                                                    : (isNav ? "#7FD6FF" : "#58A6FF")
                                        },
                                        opacity: isSubmitting ? 0.6 : 1,
                                        pointerEvents: isSubmitting ? "none" : "auto"
                                    }}
                                />
                            )}
                        </Box>
                    </Grid>


                    <Grid item xs={12}>
                        <TextField
                            label="Message"
                            variant="outlined"
                            disabled={isSubmitting}
                            InputProps={{
                                style: {
                                    color: "#888",
                                    cursor: "not-allowed"
                                }
                            }}
                            fullWidth
                            multiline
                            rows={messageRows}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            error={Boolean(errors.message)}
                            sx={{
                                backgroundColor: isNav ? "rgba(255,255,255,0.06)" : "#123F4A",
                                borderRadius: 2,
                                textarea: { color: "#E6EDF3", fontSize: "0.9rem" },
                                label: { color: errors.message ? "#ff4d4f" : "#E6EDF3" },
                                fieldset: {
                                    borderColor: errors.message ? "#ff4d4f" : (isNav ? "rgba(255,255,255,0.18)" : "#30363D")
                                },
                                "&:hover fieldset": {
                                    borderColor: errors.message ? "#ff4d4f" : (isNav ? "rgba(255,255,255,0.35)" : "#58A6FF")
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: errors.message ? "#ff4d4f" : (isNav ? "#7FD6FF" : "#58A6FF")
                                },
                                opacity: isSubmitting ? 0.6 : 1,
                                pointerEvents: isSubmitting ? "none" : "auto"
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            disabled={isSubmitting}
                            sx={{
                                mt: 2,
                                fontSize: "1rem",
                                fontWeight: "bold",
                                padding: "10px",
                                borderRadius: 3,
                                textTransform: "none",
                                backgroundColor: isNav ? "transparent" : "var(--darkreader-background-c4211a, #9d1a15)",
                                backgroundImage: isNav
                                    ? "linear-gradient(135deg, rgba(127,214,255,0.95) 0%, rgba(44,149,227,0.95) 48%, rgba(26,169,122,0.95) 100%)"
                                    : "none",
                                color: "#fff",
                                opacity: isSubmitting ? 0.6 : 1,
                                cursor: isSubmitting ? "not-allowed" : "pointer",
                                border: isNav ? "1px solid rgba(255,255,255,0.22)" : "none",
                                boxShadow: isNav
                                    ? "0 14px 28px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.22)"
                                    : "0px 4px 8px rgba(0, 0, 0, 0.3)",
                                minHeight: 48,
                                "&:hover": {
                                    backgroundColor: isNav ? "transparent" : "var(--darkreader-background-b62821, #92201a)",
                                    backgroundImage: isNav
                                        ? "linear-gradient(135deg, rgba(140,224,255,0.98) 0%, rgba(55,165,245,0.98) 48%, rgba(30,190,140,0.98) 100%)"
                                        : "none",
                                    boxShadow: isNav
                                        ? "0 18px 34px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.24)"
                                        : "0px 6px 12px rgba(0, 0, 0, 0.4)"
                                }
                            }}
                        >
                            {isSubmitting ? "Sending..." : "Contact"}
                        </Button>
                    </Grid>
                </Grid>
            </Box>

            <Box sx={{ mt: 2, px: 1 }}>
                <MotionBox
                    initial={{ opacity: 0, y: 50 }}
                    animate={startAnimation ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        height: 0,
                        minHeight: 0,
                        opacity: 0,
                        overflow: "hidden",
                        pointerEvents: "none",
                    }}
                    aria-hidden="true"
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Box
                                sx={{
                                    backgroundImage: `linear-gradient(180deg, #ffe9e9 22.77%, #f6c9c9), linear-gradient(180deg, hsla(0, 100%, 96%, 0) 30%, #f5c8c8 87.1%)`,
                                    backgroundBlendMode: "normal",
                                    backgroundSize: "cover",
                                    borderRadius: "16px",
                                    overflow: "hidden",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                    gap: 0,
                                    p: 2,
                                    textAlign: "left"
                                }}
                            >
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <img
                                        src="soporte-tecnico-1.png"
                                        alt="Customer Service"
                                        loading="lazy"
                                        style={{
                                            marginLeft: 4,
                                            width: "30px",
                                            objectFit: "contain",
                                            borderRadius: 0,
                                            alignSelf: "center",
                                        }}
                                    />

                                    <Typography
                                        sx={{
                                            fontFamily: "'Poppins', 'Roboto', 'Segoe UI', sans-serif",
                                            fontWeight: 700,
                                            fontSize: { xs: "1.1rem", sm: "1.1rem", md: "1.2rem" },
                                            color: "#1f4f4f",
                                            textShadow: "0px 0px 2px rgba(0,0,0,0.3)",
                                            letterSpacing: "1px",
                                            ml: 0.5,
                                            lineHeight: 1.2,
                                        }}
                                    >
                                        Customer Service
                                    </Typography>
                                </Box>

                                <Box sx={{ textAlign: "left", alignItems: "flex-start" }}>
                                    <Typography
                                        variant="body1"
                                        sx={{ fontSize: "0.9rem", mb: 1, color: "#000", marginLeft: 1 }}
                                    >
                                        Get in touch with one of our advisors for assistance.
                                    </Typography>
                                    <Button
                                        href="tel:6002000202"
                                        size="small"
                                        variant="text"
                                        sx={{
                                            fontSize: "0.85rem",
                                            fontWeight: "bold",
                                            color: "#e1251b",
                                            textTransform: "none",
                                            "&:hover": {
                                                textDecoration: "underline",
                                                background: "transparent"
                                            },
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: 0.5
                                        }}
                                    >
                                        <SupportAgentIcon sx={{ fontSize: 18 }} />
                                        Contact now
                                        <ArrowForwardIcon sx={{ fontSize: 16 }} />
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Box
                                sx={{
                                    backgroundImage: `linear-gradient(180deg, hsla(155, 100%, 96%, 0) 30%, #d1f5e4 87.1%), linear-gradient(180deg, #b2f5dc 22.77%, #25d366)`,
                                    backgroundBlendMode: "normal",
                                    backgroundSize: "cover",
                                    borderRadius: "16px",
                                    overflow: "hidden",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                    gap: 0,
                                    p: 2,
                                    textAlign: "left"
                                }}
                            >
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <img
                                        src="whatsapp-logo-icon.webp"
                                        alt="whatsapp"
                                        loading="lazy"
                                        style={{
                                            marginLeft: 4,
                                            width: "30px",
                                            objectFit: "contain",
                                            borderRadius: 0,
                                            alignSelf: "center",
                                        }}
                                    />

                                    <Typography
                                        sx={{
                                            fontFamily: "'Poppins', 'Roboto', 'Segoe UI', sans-serif",
                                            fontWeight: 700,
                                            fontSize: { xs: "1.1rem", sm: "1.1rem", md: "1.2rem" },
                                            color: "#1f4f4f",
                                            textShadow: "0px 0px 2px rgba(0,0,0,0.3)",
                                            letterSpacing: "1px",
                                            ml: 0.5,
                                            lineHeight: 1.2,
                                        }}
                                    >
                                        WhatsApp
                                    </Typography>
                                </Box>

                                <Box>
                                    <Typography
                                        variant="body1"
                                        sx={{ fontSize: "0.9rem", mb: 1, marginLeft: 1 }}
                                    >
                                        Escríbenos directamente por WhatsApp para resolver tus dudas.
                                    </Typography>
                                    <Button
                                        href="https://api.whatsapp.com/send?phone=15617975986"
                                        target="_blank"
                                        size="small"
                                        variant="text"
                                        sx={{
                                            fontSize: "0.85rem",
                                            fontWeight: "bold",
                                            color: "#128C7E",
                                            textTransform: "none",
                                            "&:hover": {
                                                textDecoration: "underline",
                                                background: "transparent"
                                            },
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: 0.5
                                        }}
                                    >
                                        <WhatsAppIcon sx={{ fontSize: 18 }} />
                                        Chat now
                                        <ArrowForwardIcon sx={{ fontSize: 16 }} />
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </MotionBox>
            </Box>
        </Box>
    );
};

export default ContactoForm;

