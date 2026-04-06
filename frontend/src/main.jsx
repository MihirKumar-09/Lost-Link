import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Theme } from "@radix-ui/themes";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./Context/AuthContext.jsx";
import { ReportProvider } from "./Context/ReportContext.jsx";
import { SocketProvider } from "./Context/SocketContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Theme className="h-full! w-full overflow-hidden">
      <AuthProvider>
        <SocketProvider>
          <ReportProvider>
            <App />
          </ReportProvider>
        </SocketProvider>
      </AuthProvider>
    </Theme>
  </StrictMode>,
);
