import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Theme } from "@radix-ui/themes";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./Context/AuthContext.jsx";
import { ReportProvider } from "./Context/ReportContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Theme>
      <AuthProvider>
        <ReportProvider>
          <App />
        </ReportProvider>
      </AuthProvider>
    </Theme>
  </StrictMode>,
);
