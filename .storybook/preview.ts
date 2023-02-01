import "tailwindcss/tailwind.css";
import { DEFAULT_LANG, i18nDecorator } from "./i18n.decorator.js";
import {
  DEFAULT_THEME,
  withTailwindTheme,
} from "./withTailwindTheme.decorator.jsx";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    viewports: {
      mobile_small: {
        name: "Mobile (small, 320px)",
        styles: {
          width: "320px",
          minHeight: "780px",
          height: "100%",
        },
      },
      mobile_big: {
        name: "Mobile (big, 639px)",
        styles: {
          width: "639px",
          minHeight: "780px",
          height: "100%",
        },
      },
      tablet_vertical_small: {
        name: "Tablet vertical (small, 640px)",
        styles: {
          width: "640px",
          minHeight: "780px",
          height: "100%",
        },
      },
      tablet_vertical_big: {
        name: "Tablet vertical (big, 1023px)",
        styles: {
          width: "1023px",
          minHeight: "780px",
          height: "100%",
        },
      },
      table_horizontal_small: {
        name: "Tablet horizontal (small, 1024px)",
        styles: {
          width: "1024px",
          minHeight: "780px",
          height: "100%",
        },
      },
      table_horizontal_big: {
        name: "Tablet horizontal (big, 1279px)",
        styles: {
          width: "1279px",
          minHeight: "780px",
          height: "100%",
        },
      },
      desktop_1280: {
        name: "Desktop (1280px)",
        styles: {
          width: "1280px",
          minHeight: "780px",
          height: "100%",
        },
      },
      desktop_1511: {
        name: "Desktop (1511px)",
        styles: {
          width: "1511px",
          minHeight: "780px",
          height: "100%",
        },
      },
      desktop_1920: {
        name: "Desktop (1920px)",
        styles: {
          width: "1920px",
          minHeight: "780px",
          height: "100%",
        },
      },
    },
  },
};

export const loaders = [
  async () => {
    const { initI18n } = await import("../src/i18n/i18n");
    return {
      i18n: initI18n("ru"),
    };
  },
];

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Global theme for components",
    defaultValue: DEFAULT_THEME,
    showName: true,
    toolbar: {
      icon: "paintbrush",
      items: [
        { value: "light", title: "Light", left: "🌞" },
        { value: "dark", title: "Dark", left: "🌛" },
      ],
      dynamicTitle: true,
    },
  },
  lang: {
    name: "Language",
    description: "Global i18n language settings",
    defaultValue: DEFAULT_LANG,
    showName: true,
    toolbar: {
      icon: "globe",
      items: [
        { value: "en", title: "English", left: "🇺🇸" },
        { value: "ru", title: "Russian", left: "🇷🇺" },
      ],
      dynamicTitle: true,
    },
  },
};

export const decorators = [withTailwindTheme, i18nDecorator];
