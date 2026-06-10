// src/router.jsx
import { lazy, Suspense, useEffect } from "react";
import { createBrowserRouter, Navigate, useOutletContext } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";
import App from "./App";

const Servicios = lazy(() => import("./components/Servicios"));
const Nosotros = lazy(() => import("./components/Nosotros"));
const Contacto = lazy(() => import("./components/Contacto"));
const Administracion = lazy(() => import("./components/Administracion"));
const Home = lazy(() => import("./components/Home"));
const Dashboard = lazy(() => import("./components/Dashboard"));
const Parents = lazy(() => import("./components/Parents"));
const Coaches = lazy(() => import("./components/Coaches"));
const ConfigurarProductos = lazy(() => import("./components/configuraciones/ConfigurarProductos"));
const ConfigurarTrabajos = lazy(() => import("./components/configuraciones/ConfigurarTrabajos"));

function RouteFallbackContent() {
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("route-fallback-visibility", {
        detail: { visible: true },
      })
    );

    return () => {
      window.dispatchEvent(
        new CustomEvent("route-fallback-visibility", {
          detail: { visible: false },
        })
      );
    };
  }, []);

  return (
    <Box
      sx={{
        minHeight: "65vh",
        display: "grid",
        placeItems: "center",
        px: 2,
        background: "linear-gradient(180deg, rgba(245,250,255,0.95) 0%, rgba(236,245,255,0.9) 100%)",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <CircularProgress size={40} sx={{ color: "#1B83CC", mb: 1.5 }} />
        <Typography sx={{ fontWeight: 700, color: "#0d2b45" }}>Cargando...</Typography>
      </Box>
    </Box>
  );
}

const RouteFallback = () => <RouteFallbackContent />;

const withSuspense = (Component) => (
  <Suspense fallback={<RouteFallback />}>
    <Component />
  </Suspense>
);

const isAuthenticated = () => {
  const credsLocal = localStorage.getItem("credenciales");
  const credsSession = sessionStorage.getItem("credenciales");
  return credsLocal !== null || credsSession !== null;
};

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/administracion" replace />;
};

function HomeWrapper() {
  const { informationsRef, setVideoReady } = useOutletContext();
  return (
    <Suspense fallback={<RouteFallback />}>
      <Home informationsRef={informationsRef} setVideoReady={setVideoReady} />
    </Suspense>
  );
}

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        { path: "", element: <HomeWrapper /> },
        { path: "servicios", element: withSuspense(Servicios) },
        { path: "nosotros", element: withSuspense(Nosotros) },
        { path: "contacto", element: withSuspense(Contacto) },
        { path: "administracion", element: withSuspense(Administracion) },
        { path: "dashboard", element: withSuspense(Dashboard) },
        { path: "parents", element: withSuspense(Parents) },
        { path: "coaches", element: withSuspense(Coaches) },
        {
          path: "configurar-productos",
          element: (
            <ProtectedRoute>
              {withSuspense(ConfigurarProductos)}
            </ProtectedRoute>
          ),
        },
        {
          path: "configurar-trabajos",
          element: (
            <ProtectedRoute>
              {withSuspense(ConfigurarTrabajos)}
            </ProtectedRoute>
          ),
        },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
    },
  }
);

export default router;
