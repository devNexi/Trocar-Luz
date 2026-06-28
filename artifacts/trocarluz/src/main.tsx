import { createRoot } from "react-dom/client";
import App from "./App";
import { LenisProvider } from "./components/lenis-provider";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <LenisProvider>
    <App />
  </LenisProvider>
);
