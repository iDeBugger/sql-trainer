import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Header } from "./Header";

export default {
  title: "Blocks/Header",
  component: Header,
  argTypes: {
    onLanguageSelect: {},
    onThemeButtonClick: {},
    onSupportMeClick: {},
  },
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args, context) => (
  <Header
    selectedLanguage={context.globals.lang}
    onLanguageSelect={args.onLanguageSelect}
    onThemeButtonClick={args.onThemeButtonClick}
    selectedTheme={context.globals.theme}
  />
);

export const Default = Template.bind({});
Default.args = {};
