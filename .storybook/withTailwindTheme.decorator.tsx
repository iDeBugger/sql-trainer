import React from "react";
import { useEffect } from "react";

export const DEFAULT_THEME = "light";

export const withTailwindTheme = (Story, context) => {
  const { theme } = context.globals;

  useEffect(() => {
    const htmlTag = document.documentElement;

    htmlTag.setAttribute("data-color-theme", theme || DEFAULT_THEME);
  }, [theme]);

  return (
    <div className="bg-gray-0 dark:bg-gray-900 absolute inset-0 p-4">
      <Story />
    </div>
  );
};
