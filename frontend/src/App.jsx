import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import NoFound from "./pages/NoFound/NoFound";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="*" element={<NoFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
