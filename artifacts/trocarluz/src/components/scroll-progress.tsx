import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (el.scrollTop / total) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      aria-hidden="true"
      role="presentation"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 200,
        height: "3px",
        width: `${progress}%`,
        backgroundColor: "var(--lime)",
        transition: "width 60ms linear",
        pointerEvents: "none",
      }}
      className="scroll-progress-bar"
    />
  );
}
