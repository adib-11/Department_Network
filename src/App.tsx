import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import GetStarted from "./components/GetStarted";
import Home from "./components/home";
import UserProfile from "./components/profile/UserProfile";
import AuthContainer from "./components/auth/AuthContainer";
import ChatLayout from "./components/chat/ChatLayout";
import ForumLayout from "./components/forums/ForumLayout";
import EventsLayout from "./components/events/EventsLayout";
import AcademicLayout from "./components/academic/AcademicLayout";
import MainLayout from "./components/layout/MainLayout";
import SettingsLayout from "./components/settings/SettingsLayout";
import HelpLayout from "./components/help/HelpLayout";
import { useAuth } from "./lib/auth";
import ThemeToggle from "./components/auth/ThemeToggle";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ThemeToggle />
      <Routes>
        <Route
          path="/"
          element={
            !isAuthenticated ? <GetStarted /> : <Navigate to="/home" replace />
          }
        />
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <AuthContainer />
            ) : (
              <Navigate to="/home" replace />
            )
          }
        />

        <Route element={<MainLayout />}>
          <Route
            path="/home"
            element={
              isAuthenticated ? <Home /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/profile"
            element={
              isAuthenticated ? (
                <UserProfile />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/messages"
            element={
              isAuthenticated ? (
                <ChatLayout />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/forums"
            element={
              isAuthenticated ? (
                <ForumLayout />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/events"
            element={
              isAuthenticated ? (
                <EventsLayout />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/academic"
            element={
              isAuthenticated ? (
                <AcademicLayout />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/settings"
            element={
              isAuthenticated ? (
                <SettingsLayout />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/help"
            element={
              isAuthenticated ? (
                <HelpLayout />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
