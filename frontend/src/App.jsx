import { BrowserRouter } from "react-router-dom";
import AppRoute from "./routes/AppRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <BrowserRouter>
        <AppRoute />
      </BrowserRouter>

      <ToastContainer position="top-center" autoClose={2000} theme="colored" />
    </>
  );
}

export default App;
