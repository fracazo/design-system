import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { GettingStartedPage } from "./getting-started";
import "./studio.css";

function ThemeSync() {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = (dark: boolean) => document.documentElement.classList.toggle("dark", dark);
    apply(mq.matches);
    const onChange = (event: MediaQueryListEvent) => apply(event.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return null;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeSync />
    <GettingStartedPage />
  </StrictMode>,
);
