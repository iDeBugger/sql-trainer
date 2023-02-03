import React from "react";
import { useEffect } from "react";

export const DEFAULT_THEME = "light";

export const withCenteredFullscreenLayout = (Story, context) => {
  const { layout } = context.parameters;

  const isFullscreenLayout = layout === "fullscreen";
  const layoutCenterClass = isFullscreenLayout ? "flex justify-center" : "";

  return (
    <div className={layoutCenterClass}>
      <Story />
    </div>
  );
};
