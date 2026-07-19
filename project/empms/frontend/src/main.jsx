import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import AuthContext from "./context/authContext";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContext>
      <App />
    </AuthContext>
  </BrowserRouter>,
);
