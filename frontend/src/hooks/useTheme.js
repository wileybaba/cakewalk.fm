import { useState, useEffect } from "react";
import * as themes from "../themes";

export function useTheme() {
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? JSON.parse(savedTheme) : themes.spaceTheme;
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  return { theme, themes, setTheme };
}
