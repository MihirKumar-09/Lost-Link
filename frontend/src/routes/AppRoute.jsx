import { Routes, Route } from "react-router-dom";
import NoFound from "../pages/NoFound/NoFound";
import HomePage from "../pages/Home";
import LostPage from "../pages/LostPage";
import LostPageForm from "../pages/LostPageForm";
import FoundPage from "../pages/FoundPage";
import ReportDetails from "../pages/ReportDetailsPage";
import FoundPageForm from "../pages/FoundPageForm";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import ProfilePage from "../pages/ProfilePage";
import AllReportPage from "../pages/AllReportPage";
import NotificationPage from "../pages/NotificationsPage";
import MessagePage from "../pages/MessagesPage";

// Protected Route;
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
export default function AppRoute() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/lost-item" element={<LostPage />} />
      <Route path="/found-item" element={<FoundPage />} />
      <Route path="/lostItem/:id" element={<ReportDetails />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/reports/:type" element={<AllReportPage />} />
      <Route path="*" element={<NoFound />} />

      {/* Protected Route */}
      <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/lost-item-form" element={<LostPageForm />} />
        <Route path="/found-item-form" element={<FoundPageForm />} />
        <Route path="/notifications" element={<NotificationPage />} />
        <Route path="/messages" element={<MessagePage />} />
      </Route>
    </Routes>
  );
}
