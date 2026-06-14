"use client";

import type { ButtonHTMLAttributes } from "react";
import { useSyncExternalStore } from "react";

const storageKey = "crescent-theme";
const themeChangeEvent = "crescent:theme-change";
const mediaQuery = "(prefers-color-scheme: dark)";

function resolveSystemTheme() {
  return window.matchMedia(mediaQuery).matches ? "dark" : "light";
}

function applyTheme(theme: "light" | "dark") {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

function subscribe(onStoreChange: () => void) {
  const systemTheme = window.matchMedia(mediaQuery);
  const handleSystemChange = () => {
    if (window.localStorage.getItem(storageKey)) {
      return;
    }

    applyTheme(resolveSystemTheme());
    onStoreChange();
  };

  window.addEventListener(themeChangeEvent, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  systemTheme.addEventListener("change", handleSystemChange);

  return () => {
    window.removeEventListener(themeChangeEvent, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
    systemTheme.removeEventListener("change", handleSystemChange);
  };
}

function getSnapshot() {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function getServerSnapshot() {
  return "light";
}

type ThemeToggleProps = Pick<ButtonHTMLAttributes<HTMLButtonElement>, "className">;

export function ThemeToggle({ className }: ThemeToggleProps) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    window.localStorage.setItem(storageKey, nextTheme);
    window.dispatchEvent(new Event(themeChangeEvent));
  }

  return (
    <button
      type="button"
      className={className ? `theme-toggle ${className}` : "theme-toggle"}
      onClick={toggleTheme}
      aria-pressed={theme === "dark"}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span className="theme-toggle__thumb" aria-hidden="true">
        <span className="theme-toggle__icon-wrap">
          <svg viewBox="0 0 24 24" className="theme-toggle__icon theme-toggle__icon--sun" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M12 3.75v1.8" strokeLinecap="round" />
            <path d="M12 18.45v1.8" strokeLinecap="round" />
            <path d="M5.64 5.64l1.27 1.27" strokeLinecap="round" />
            <path d="M17.09 17.09l1.27 1.27" strokeLinecap="round" />
            <path d="M3.75 12h1.8" strokeLinecap="round" />
            <path d="M18.45 12h1.8" strokeLinecap="round" />
            <path d="M5.64 18.36l1.27-1.27" strokeLinecap="round" />
            <path d="M17.09 6.91l1.27-1.27" strokeLinecap="round" />
            <circle cx="12" cy="12" r="3.8" />
          </svg>
          <svg viewBox="0 0 24 24" className="theme-toggle__icon theme-toggle__icon--moon" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path
              d="M20.25 14.05A8.25 8.25 0 0 1 9.95 3.75a8.25 8.25 0 1 0 10.3 10.3Z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </span>
    </button>
  );
}
