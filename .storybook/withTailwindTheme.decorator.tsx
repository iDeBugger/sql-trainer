import React from "react";
import { useEffect } from "react";

export const DEFAULT_THEME = "light";

export const withTailwindTheme = (Story, context) => {
  const { theme } = context.globals;

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-color-theme",
      theme || DEFAULT_THEME
    );
    document.body.classList.add("bg-gray-0", "dark:bg-gray-900");
  }, [theme]);

  return <Story />;
};
