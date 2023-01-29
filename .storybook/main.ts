import { StorybookViteConfig } from "@storybook/builder-vite";
import { mergeConfig } from "vite";
import svgr from "vite-plugin-svgr";

const config: StorybookViteConfig = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-vite",
  },
  features: {
    storyStoreV7: true,
  },
  async viteFinal(config, _options) {
    return mergeConfig(config, {
      plugins: [
        svgr({
          svgrOptions: {
            icon: true,
            dimensions: false,
            svgProps: {
              width: "100%",
              height: "100%",
            },
          },
        }),
      ],
    });
  },
};

export default config;
