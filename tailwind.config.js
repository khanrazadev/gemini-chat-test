export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        gemBg: {
          light: "#F7F8FA",
          dark: "#18191A",
        },
        gemPanel: {
          light: "#FFFFFF",
          dark: "#1E1F20",
        },
        gemText: {
          light: "#202124",
          dark: "#E8EAED",
        },
        gemBorder: {
          dark: "#2F3133",
        },
        gemOverlay: "#13131466",
        gemBubble: {
          light: "#dfe5f3",
          dark: "#333537", 
        },
      },
    },
  },
  plugins: [],
};
