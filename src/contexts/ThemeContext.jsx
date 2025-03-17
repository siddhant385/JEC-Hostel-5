import { createContext, useContext, useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/material";

// Create Theme Context
const ThemeContext = createContext();

// Hook to use the theme
export function useThemeContext() {
  return useContext(ThemeContext);
}

// Provider Component
export const ThemeProviderComponent = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Define Dark Hacker Theme and Sweet Light Theme
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#00ff00" : "#ff69b4", // Neon Green (Hacker) | Soft Pink (Light Mode)
      },
      background: {
        default: darkMode ? "#000000" : "#fff3e6", // Black for hacker, Peach for sweet
        paper: darkMode ? "#121212" : "#ffffff",
      },
      text: {
        primary: darkMode ? "#00ff00" : "#333333", // Green text in dark mode
        secondary: darkMode ? "#ff0000" : "#555555", // Red in hacker mode
      },
    },
    typography: {
      fontFamily: "Courier New, monospace",
      h1: { fontFamily: "Anonymous Pro, monospace" },
      h2: { fontFamily: "Anonymous Pro, monospace" },
      button: { fontFamily: "Anonymous Pro, monospace", fontWeight: 700 },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: darkMode ? "rgba(0, 0, 0, 0.9)" : "rgba(255, 235, 205, 0.9)",
            backdropFilter: "blur(10px)",
          },
        },
      },
    },
  });

  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            minHeight: "100vh",
            transition: "background 0.5s ease-in-out",
            background: darkMode
              ? "linear-gradient(to right, #434343, #000000)" // Dark Hacker Theme
              : "linear-gradient(135deg, #ffecd2, #fcb69f)", // Sweet Light Theme
          }}
        >
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
