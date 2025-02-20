import { Suspense, useEffect } from "react";
import { useTheme } from "./lib/theme";
import { useRoutes, Routes, Route, Navigate, Outlet } from "react-router-dom";
import GetStarted from "./components/GetStarted";
import Home from "./components/home";
import UserProfile from "./components/profile/UserProfile";
import AuthContainer from "./components/auth/AuthContainer";
import ChatLayout from "./components/chat/ChatLayout";
import ForumLayout from "./components/forums/ForumLayout";
import CareerLayout from "./components/career/CareerLayout";
import EventsLayout from "./components/events/EventsLayout";
import AcademicLayout from "./components/academic/AcademicLayout";
import MainLayout from "./components/layout/MainLayout";
import SettingsLayout from "./components/settings/SettingsLayout";
import HelpLayout from "./components/help/HelpLayout";
import { useAuth } from "./lib/auth";
import routes from "tempo-routes";

function PrivateRoute() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

function App() {
  const { theme } = useTheme();
  const { isAuthenticated, login } = useAuth();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Suspense fallback={<p>Loading...</p>}>
      {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      <Routes>
        <Route
          path="/"
          element={!isAuthenticated ? <GetStarted /> : <Navigate to="/home" />}
        />
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <AuthContainer onLogin={handleLogin} />
            ) : (
              <Navigate to="/home" />
            )
          }
        />
        <Route path="/home" element={<PrivateRoute />}>
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="messages" element={<ChatLayout />} />
            <Route path="forums" element={<ForumLayout />} />
            <Route path="career" element={<CareerLayout />} />
            <Route path="events" element={<EventsLayout />} />
            <Route path="academic" element={<AcademicLayout />} />
            <Route path="settings" element={<SettingsLayout />} />
            <Route path="help" element={<HelpLayout />} />
          </Route>
        </Route>
        {import.meta.env.VITE_TEMPO === "true" && <Route path="/tempobook/*" />}
      </Routes>
    </Suspense>
  );
}

export default App;
