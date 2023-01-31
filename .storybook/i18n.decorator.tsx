import React from "react";
import { useEffect } from "react";

export const DEFAULT_LANG = "en";

export const i18nDecorator = (Story, context) => {
  const { lang } = context.globals;
  const { i18n } = context.loaded;

  useEffect(() => {
    i18n.changeLanguage(lang || DEFAULT_LANG);
  }, [lang]);

  return <Story />;
};
