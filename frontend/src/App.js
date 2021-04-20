import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { AuthContextProvider } from "./AuthProvider";
import { GlobalStyle } from "./components/StyledComponents";
import { Routes } from "./Routes";
import { useTheme } from "./hooks/useTheme";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import * as themes from "./themes";

const queryClient = new QueryClient();

export default function App() {
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? JSON.parse(savedTheme) : themes.spaceTheme;
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <AuthContextProvider>
          <GlobalStyle />
          <Router>
            <Routes theme={theme} setTheme={setTheme} />
          </Router>
        </AuthContextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
