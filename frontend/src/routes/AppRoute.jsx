import { Routes, Route } from "react-router-dom";
import NoFound from "../pages/NoFound/NoFound";
import HomePage from "../pages/Home";
import LostPage from "../pages/LostPage";
import FoundPage from "../pages/FoundPage";
export default function AppRoute() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/lost-item" element={<LostPage />} />
      <Route path="/found-item" element={<FoundPage />} />
      <Route path="*" element={<NoFound />} />
    </Routes>
  );
}
