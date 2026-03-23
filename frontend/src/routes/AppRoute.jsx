import { Routes, Route } from "react-router-dom";
import NoFound from "../pages/NoFound/NoFound";
import HomePage from "../pages/Home";
import LostPage from "../pages/LostPage";
import LostPageForm from "../pages/LostPageForm";
import FoundPage from "../pages/FoundPage";
import ReportDetails from "../pages/ReportDetailsPage";
import FoundPageForm from "../pages/FoundPageForm";
import SignUp from "../pages/SignUp";
export default function AppRoute() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/lost-item" element={<LostPage />} />
      <Route path="/lost-item-form" element={<LostPageForm />} />
      <Route path="/found-item" element={<FoundPage />} />
      <Route path="/found-item-form" element={<FoundPageForm />} />
      <Route path="/lostItem/:id" element={<ReportDetails />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="*" element={<NoFound />} />
    </Routes>
  );
}
