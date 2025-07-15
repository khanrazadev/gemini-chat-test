import { create } from "zustand";

// get initial theme from localStorage or system
const getInitialTheme = () => {
  if (typeof localStorage !== "undefined") {
    const stored = localStorage.getItem("theme");
    if (stored) return stored;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const initialTheme = getInitialTheme();

if (typeof document !== "undefined") {
  document.documentElement.classList.toggle("dark", initialTheme === "dark");
}

export const useThemeStore = create((set) => ({
  theme: initialTheme,

  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === "light" ? "dark" : "light";
      document.documentElement.classList.toggle("dark", newTheme === "dark");
      localStorage.setItem("theme", newTheme);
      return { theme: newTheme };
    }),
}));
